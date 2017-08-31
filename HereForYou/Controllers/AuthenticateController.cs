using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using HereForYou.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace HereForYou.Controllers
{
    ///setup using this guide: https://auth0.com/blog/asp-dot-net-core-authentication-tutorial/
    ///and this https://pioneercode.com/post/authentication-in-an-asp-dot-net-core-api-part-3-json-web-token
    [Route("api/[controller]")]
    public class AuthenticateController : Controller
    {
        private readonly JWTSettings _options;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SecurityTokenHandler _securityTokenHandler;

        public AuthenticateController(IOptions<JWTSettings> options, SignInManager<IdentityUser> signInManager,
            UserManager<IdentityUser> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _securityTokenHandler = new JwtSecurityTokenHandler();
            _options = options.Value;
        }

        [Authorize(Roles = "admin")]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUser registerUser)
        {
            var user = new IdentityUser
            {
                UserName = registerUser.UserName,
                PhoneNumber = registerUser.PhoneNumber,
                RideProvider = registerUser.RideProvider
            };
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
            Response.Cookies.Delete(".AspNetCore.Identity.Application");
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
            var user = await _userManager.FindByNameAsync(credentials.Username);
            var token = await GetJwtSecurityToken(user);
            return new JsonResult(new Dictionary<string, object>
            {
                {"access_token", _securityTokenHandler.WriteToken(token)},
                {"user", user}
            });
        }

        private async Task<JwtSecurityToken> GetJwtSecurityToken(IdentityUser identityUser)
        {
            var claimsPrincipal = await _signInManager.CreateUserPrincipalAsync(identityUser);

            return new JwtSecurityToken(
                issuer: _options.Issuer,
                audience: _options.Audience,
                claims: GetTokenClaims(identityUser).Union(claimsPrincipal.Claims),
                expires: DateTime.UtcNow.AddDays(7),
                signingCredentials: new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.SecretKey)), SecurityAlgorithms.HmacSha256)
            );
        }

        private static IEnumerable<Claim> GetTokenClaims(IdentityUser identityUser)
        {
            return new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, identityUser.UserName)
            };
        }
    }
}