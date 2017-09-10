using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HereForYou.DataLayer;
using HereForYou.Entities;
using LinqToDB;
using LinqToDB.Common;
using LinqToDB.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using IdentityUser = HereForYou.Entities.IdentityUser;

namespace HereForYou.Controllers
{
    [Authorize(Roles = "admin")]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly UsersRepository _usersRepository;
        private readonly UserManager<IdentityUser> _userManager;

        public UserController(UsersRepository usersRepository, UserManager<IdentityUser> userManager)
        {
            _usersRepository = usersRepository;
            _userManager = userManager;
        }

        [HttpGet]
        public IEnumerable<IUser> Users()
        {
            return _usersRepository.Users;
        }

        [HttpGet("{name}")]
        public UserProfile Get(string name)
        {
            return _usersRepository.UserByName(name);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] RegisterUser registerUser)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            user.CopyFrom(registerUser);
            await _userManager.UpdateAsync(user);
            if (string.IsNullOrEmpty(registerUser.Password)) return Accepted();

            await _userManager.RemovePasswordAsync(user);
            var result = await _userManager.AddPasswordAsync(user, registerUser.Password);
            if (!result.Succeeded)
            {
                return result.Errors();
            }
            return Accepted();
        }

        [HttpPut("grantadmin/{username}")]
        public async Task<IActionResult> GrantAdmin(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (user == null) throw new NullReferenceException("User not found");
            var identityResult = await _userManager.AddToRoleAsync(user, "admin");
            if (!identityResult.Succeeded) return identityResult.Errors();
            return Accepted();
        }

        [HttpPut("revokeadmin/{username}")]
        public async Task<IActionResult> RevokeAdmin(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (user == null) throw new NullReferenceException("User not found");
            var identityResult = await _userManager.RemoveFromRoleAsync(user, "admin");
            if (!identityResult.Succeeded) return identityResult.Errors();
            return Accepted();
        }

        
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            _usersRepository.Users.Where(profile => profile.Id == id).Delete();
            return Accepted();
        }
    }
}