using System;
using System.Collections.Generic;
using System.Linq;
using HereForYou.Entities;
using Microsoft.AspNetCore.Mvc;

namespace HereForYou.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private static readonly List<User> _users = new List<User>
        {
            new User {Name = "Tim", PhoneNumber = "123"},
            new User {Name = "Timitha", PhoneNumber = "456"}
        };

        public UserController()
        {
        }

        [HttpGet]
        public IEnumerable<User> Get()
        {
            return _users;
        }

//
//        public User Get(string name)
//        {
//            return _users.FirstOrDefault(user => user.Name.Equals(name, StringComparison.CurrentCultureIgnoreCase));
//        }
        [HttpPut]
        public User Put([FromBody] User user)
        {
            var saved = false;
            for (var i = 0; i < _users.Count; i++)
            {
                var eachUser = _users[i];
                if (!eachUser.Name.Equals(user.Name, StringComparison.CurrentCultureIgnoreCase)) continue;
                saved = true;
                _users[i] = user;
                break;
            }
            if (!saved) _users.Add(user);
            return user;
        }
    }
}