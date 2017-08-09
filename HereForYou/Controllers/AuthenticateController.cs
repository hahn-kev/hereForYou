using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HereForYou.Entities;
using JWT;
using JWT.Algorithms;
using JWT.Serializers;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace HereForYou.Controllers
{
    ///setup using this guide: https://auth0.com/blog/asp-dot-net-core-authentication-tutorial/
    [Route("api/[controller]")]
    public class AuthenticateController : Controller
    {
        private readonly JWTSettings _options;
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;

        public AuthenticateController(IOptions<JWTSettings> options, SignInManager<User> signInManager,
            UserManager<User> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _options = options.Value;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUser registerUser)
        {
            var user = new User
            {
                UserName = registerUser.UserName,
                PhoneNumber = registerUser.PhoneNumber,
                RideProvider = registerUser.RideProvider
            };
            var result = await _userManager.CreateAsync(user, registerUser.Password);
            if (!result.Succeeded)
            {
                return Errors(result);
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
                return new JsonResult("Account Locked") {StatusCode = 401};
            }
            if (!signInResult.Succeeded)
            {
                return new JsonResult("Sign in failed") {StatusCode = 401};
            }
            var user = await _userManager.FindByNameAsync(credentials.Username);
            return new JsonResult(new Dictionary<string, object>
            {
                {"access_token", GetAccessToken(user.Id)},
                {"id_token", GetIdToken(user)}
            });
        }

        private JsonResult Errors(IdentityResult result)
        {
            var items = result.Errors
                .Select(x => x.Description)
                .ToArray();
            return new JsonResult(items) {StatusCode = 400};
        }

        private string GetAccessToken(int userId)
        {
            var payload = new Dictionary<string, object>
            {
                {"sub", userId},
            };
            return GetToken(payload);
        }

        private string GetIdToken(User user)
        {
            var payload = new Dictionary<string, object>
            {
                {"id", user.Id},
                {"sub", user.Email},
                {"email", user.Email},
                {"emailConfirmed", user.EmailConfirmed},
            };
            return GetToken(payload);
        }

        private string GetToken(Dictionary<string, object> payload)
        {
            var secret = _options.SecretKey;

            payload.Add("iss", _options.Issuer);
            payload.Add("aud", _options.Audience);
            payload.Add("nbf", ConvertToUnixTimestamp(DateTime.Now));
            payload.Add("iat", ConvertToUnixTimestamp(DateTime.Now));
            payload.Add("exp", ConvertToUnixTimestamp(DateTime.Now.AddDays(7)));
            //todo reuse these objects
            IJwtAlgorithm algorithm = new HMACSHA256Algorithm();
            IJsonSerializer serializer = new JsonNetSerializer();
            IBase64UrlEncoder urlEncoder = new JwtBase64UrlEncoder();
            IJwtEncoder encoder = new JwtEncoder(algorithm, serializer, urlEncoder);

            return encoder.Encode(payload, secret);
        }

        private static double ConvertToUnixTimestamp(DateTime date)
        {
            DateTime origin = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            TimeSpan diff = date.ToUniversalTime() - origin;
            return Math.Floor(diff.TotalSeconds);
        }
    }
}