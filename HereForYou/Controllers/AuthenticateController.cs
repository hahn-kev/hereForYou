﻿using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using HereForYou.Entities;
using JWT;
using JWT.Algorithms;
using JWT.Serializers;
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
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly SecurityTokenHandler _securityTokenHandler;

        public AuthenticateController(IOptions<JWTSettings> options, SignInManager<User> signInManager,
            UserManager<User> userManager)
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
            var user = new User
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
                return new JsonResult("Account Locked");
            }
            if (!signInResult.Succeeded)
            {
                return new JsonResult("Sign in failed");
            }
            var user = await _userManager.FindByNameAsync(credentials.Username);
            var token = await GetJwtSecurityToken(user);
            return new JsonResult(new Dictionary<string, object>
            {
                {"access_token", _securityTokenHandler.WriteToken(token)},
                {"user", user}
            });
        }

        private async Task<JwtSecurityToken> GetJwtSecurityToken(User user)
        {
            var claimsPrincipal = await _signInManager.CreateUserPrincipalAsync(user);

            return new JwtSecurityToken(
                issuer: _options.Issuer,
                audience: _options.Audience,
                claims: GetTokenClaims(user).Union(claimsPrincipal.Claims),
                expires: DateTime.UtcNow.AddDays(7),
                signingCredentials: new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.SecretKey)), SecurityAlgorithms.HmacSha256)
            );
        }

        private static IEnumerable<Claim> GetTokenClaims(User user)
        {
            return new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName)
            };
        }
    }
}