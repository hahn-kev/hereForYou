using System;
using System.Collections.Generic;
using System.Linq;
using HereForYou.DataLayer;
using HereForYou.Entities;
using LinqToDB;
using Microsoft.AspNetCore.Mvc;

namespace HereForYou.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly UsersRepository _usersRepository;

        public UserController(UsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
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
    }
}