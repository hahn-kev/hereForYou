using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using HereForYou.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace HereForYou.Controllers
{
    ///setup using this guide: https://auth0.com/blog/asp-dot-net-core-authentication-tutorial/
    ///and this https://pioneercode.com/post/authentication-in-an-asp-dot-net-core-api-part-3-json-web-token
    [Route("api/[controller]")]
    public class AuthenticateController : Controller
    {
        public const string JwtCookieName = ".JwtAccessToken";
        private readonly JWTSettings _jwtOptions;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SecurityTokenHandler _securityTokenHandler;
        private readonly Settings _settings;

        public AuthenticateController(IOptions<JWTSettings> jwtOptions,
            SignInManager<IdentityUser> signInManager,
            UserManager<IdentityUser> userManager,
            IOptions<Settings> options)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _securityTokenHandler = new JwtSecurityTokenHandler();
            _jwtOptions = jwtOptions.Value;
            _settings = options.Value;
        }

        [Authorize(Roles = "admin")]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUser registerUser)
        {
            var user = new IdentityUser().CopyFrom(registerUser);
            user.ResetPassword = true;
            if (string.IsNullOrEmpty(user.Email))
            {
                throw new ArgumentException("user email required");
            }

            var result = await _userManager.CreateAsync(user, registerUser.Password);
            if (!result.Succeeded)
            {
                return result.Errors();
            }

            if (user.Id <= 0)
            {
                throw new ArgumentException("user id not generated error");
            }

            return Json(new {Status = "Success"});
        }

        [HttpPost("signin")]
        [AllowAnonymous]
        public async Task<IActionResult> SignIn([FromBody] Credentials credentials)
        {
            var identityUser = await _userManager.FindByNameAsync(credentials.Username);
            if (identityUser == null) throw ThrowLoginFailed();
            return await SignIn(identityUser, credentials.Password);
        }

        [HttpPost("reset")]
        [AllowAnonymous]
        public async Task<IActionResult> ResetSignIn([FromBody] CredentialsReset credentials)
        {
            var identityUser = await _userManager.FindByNameAsync(credentials.Username);
            if (identityUser == null) throw ThrowLoginFailed();
            var identityResult =
                await _userManager.ChangePasswordAsync(identityUser, credentials.Password, credentials.NewPassword);
            if (!identityResult.Succeeded)
            {
                return identityResult.Errors();
            }

            identityUser.ResetPassword = false;
            await _userManager.UpdateAsync(identityUser);
            return await JsonLoginResult(identityUser);
        }

        private async Task<IActionResult> SignIn(IdentityUser user, string password)
        {
            var signInResult = await _signInManager.CheckPasswordSignInAsync(user, password, false);
            if (signInResult.IsLockedOut)
            {
                throw new ArgumentException("Account Locked, please contact an administrator");
            }

            if (!signInResult.Succeeded)
            {
                throw ThrowLoginFailed();
            }

            return await JsonLoginResult(user);
        }

        private async Task<IActionResult> JsonLoginResult(IdentityUser user)
        {
            var claimsPrincipal = await _signInManager.CreateUserPrincipalAsync(user);
            var userProfile = new UserProfile(user) {IsAdmin = claimsPrincipal.IsInRole("admin")};
            if (user.ResetPassword)
            {
                //don't generate and return an access token if the reset password flag is set
                return Json(new Dictionary<string, object>
                {
                    {"user", userProfile}
                });
            }

            var token = GetJwtSecurityToken(user, claimsPrincipal);
            var accessTokenString = _securityTokenHandler.WriteToken(token);
            Response.Cookies.Append(JwtCookieName, accessTokenString);
            return Json(new Dictionary<string, object>
            {
                {"access_token", accessTokenString},
                {"user", userProfile}
            });
        }

        private JwtSecurityToken GetJwtSecurityToken(IdentityUser identityUser,
            ClaimsPrincipal claimsPrincipal)
        {
            return new JwtSecurityToken(
                issuer: _jwtOptions.Issuer,
                audience: _jwtOptions.Audience,
                claims: GetTokenClaims(identityUser).Union(claimsPrincipal.Claims),
                expires: DateTime.UtcNow.AddDays(7),
                signingCredentials: new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.SecretKey)),
                    SecurityAlgorithms.HmacSha256)
            );
        }

        public static readonly string IsRideProviderClaim = "isRideProvider";

        private static IEnumerable<Claim> GetTokenClaims(IdentityUser identityUser)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            if (identityUser.RideProvider)
            {
                claims.Add(new Claim(IsRideProviderClaim, "true"));
            }

            return claims;
        }

        private Exception ThrowLoginFailed()
        {
            return new ArgumentException("Invalid UserName or Password");
        }

        [HttpGet("sso")]
        [AllowAnonymous]
        public async Task<IActionResult> Sso(string sso, string sig)
        {
            if (GetHash(sso, _settings.DiscourseSsoSecret) != sig)
            {
                return Unauthorized();
            }

            var ssoBody = QueryHelpers.ParseQuery(Encoding.UTF8.GetString(Convert.FromBase64String(sso)));
            string nonce = ssoBody["nonce"];

            if (!User.Identity.IsAuthenticated)
            {
                //todo redirect to login and handel there
                throw new NotImplementedException("Please login before trying to access Discourse");
            }

            var identityUser = await _userManager.GetUserAsync(User);
            if (identityUser == null)
            {
                throw new NullReferenceException("User not found");
            }

            var queryBuilder = new QueryBuilder
            {
                {"nonce", nonce},
                {"email", identityUser.Email},
                {"external_id", identityUser.Id.ToString()},
                {"username", identityUser.UserName},
                {"name", identityUser.UserName},
                {"require_activation", (!identityUser.EmailConfirmed).ToString()},
                {"admin", User.IsInRole("admin").ToString()},
                {"moderator", identityUser.RideProvider.ToString()}
            };
            var returnPayload = queryBuilder.ToString();
            if (returnPayload[0] == '?') returnPayload = returnPayload.Substring(1);
            var encodedPayload = Convert.ToBase64String(Encoding.UTF8.GetBytes(returnPayload));
            var returnSignature = GetHash(encodedPayload, _settings.DiscourseSsoSecret);
            var returnUriBuilder = new UriBuilder(_settings.DiscourseBaseUrl)
            {
                Path = "/session/sso_login",
                Query = new QueryBuilder {{"sso", encodedPayload}, {"sig", returnSignature}}.ToString()
            };
            var returnUrl = returnUriBuilder.ToString();
            return RedirectPermanent(returnUrl);
        }

        private static string GetHash(string payload, string ssoSecret)
        {
            var keyBytes = Encoding.UTF8.GetBytes(ssoSecret);

            var hasher = new HMACSHA256(keyBytes);
            var bytes = Encoding.UTF8.GetBytes(payload);
            var hash = hasher.ComputeHash(bytes);

            var sb = new StringBuilder();
            foreach (var x in hash)
                sb.AppendFormat("{0:x2}", x);
            return sb.ToString();
        }
    }
}