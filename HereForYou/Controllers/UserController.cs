using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HereForYou.DataLayer;
using HereForYou.Entities;
using LinqToDB;
using LinqToDB.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace HereForYou.Controllers
{
    [Authorize(Roles = "admin")]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly UsersRepository _usersRepository;
        private readonly UserManager<User> _userManager;
        public UserController(UsersRepository usersRepository, UserManager<User> userManager)
        {
            _usersRepository = usersRepository;
            _userManager = userManager;
        }

        [HttpGet]
        public IEnumerable<User> Users()
        {
            return _usersRepository.Users();
        }

        [HttpGet("{name}")]
        public User Get(string name)
        {
            return _usersRepository.UserByName(name);
        }

//        [HttpPut]
//        public User Put([FromBody] User user)
//        {
//            return _usersRepository.Save(user);
//        }

        [HttpPut("grantadmin")]
        public async Task<IActionResult> GrantAdmin(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (user == null) throw new NullReferenceException("User not found");
            var identityResult = await _userManager.AddToRoleAsync(user, "admin");
            if (!identityResult.Succeeded) return identityResult.Errors();
            return Accepted();
        }

        [HttpPut("revokeadmin")]
        public async Task<IActionResult> RevokeAdmin(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (user == null) throw new NullReferenceException("User not found");
            var identityResult = await _userManager.RemoveFromRoleAsync(user, "admin");
            if (!identityResult.Succeeded) return identityResult.Errors();
            return Accepted();
        }
    }
}