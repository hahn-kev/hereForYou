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
        private Settings _settings;

        public AuthenticateController(IOptions<JWTSettings> jwtOptions, SignInManager<IdentityUser> signInManager,
            UserManager<IdentityUser> userManager, IOptions<Settings> options)
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
            if (string.IsNullOrEmpty(user.Email))
            {
                throw new Exception("user email required");
            }
            var result = await _userManager.CreateAsync(user, registerUser.Password);
            if (!result.Succeeded)
            {
                return result.Errors();
            }
            if (user.Id <= 0)
            {
                throw new Exception("user id not generated error");
            }

            return Accepted();
        }

        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromBody] Credentials credentials)
        {
            var signInResult =
                await _signInManager.PasswordSignInAsync(credentials.Username, credentials.Password, false, false);
            if (signInResult.IsLockedOut)
            {
                return new JsonResult(new Dictionary<string, object>
                {
                    {"status", "Account Locked, please contact an administrator"}
                }) {StatusCode = 401};
            }
            if (!signInResult.Succeeded)
            {
                return new JsonResult(new Dictionary<string, object>
                {
                    {"status", "Invalid UserName or Password"}
                }) {StatusCode = 401};
            }
            Response.Cookies.Delete(".AspNetCore.Identity.Application");
            var user = await _userManager.FindByNameAsync(credentials.Username);
            var token = await GetJwtSecurityToken(user);
            var accessTokenString = _securityTokenHandler.WriteToken(token);
            Response.Cookies.Append(JwtCookieName, accessTokenString);
            return new JsonResult(new Dictionary<string, object>
            {
                {"access_token", accessTokenString},
                {"user", new UserProfile(user)}
            });
        }

        private async Task<JwtSecurityToken> GetJwtSecurityToken(IdentityUser identityUser)
        {
            var claimsPrincipal = await _signInManager.CreateUserPrincipalAsync(identityUser);

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

        private static IEnumerable<Claim> GetTokenClaims(IdentityUser identityUser)
        {
            return new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
        }

        [HttpGet("sso")]
        public async Task<IActionResult> Sso(string sso, string sig)
        {
            if (GetHash(sso, _settings.DiscourseSsoSecret) != sig)
            {
                return Unauthorized();
            }
            var ssoBody = QueryHelpers.ParseQuery(Encoding.UTF8.GetString(Convert.FromBase64String(sso)));
            string nonce = ssoBody["nonce"];

            if (User == null)
            {
                //todo redirect to login and handel there
                throw new NotImplementedException();
            }
            var identityUser = await _userManager.GetUserAsync(User);
            var queryBuilder = new QueryBuilder
            {
                {"nonce", nonce},
                {"email", identityUser.Email},
                {"external_id", identityUser.Id.ToString()},
                {"username", identityUser.UserName},
                {"name", identityUser.UserName},
                {"require_activation", (!identityUser.EmailConfirmed).ToString()},
                {"admin", User.IsInRole("admin").ToString()}
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