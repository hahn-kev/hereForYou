using System;
using System.Collections.Generic;
using System.Linq;
using HereForYou.Entities;

namespace HereForYou.DataLayer
{
    public class UsersRepository
    {
        private static readonly List<User> _users = new List<User>
        {
            new User {Name = "Tim", PhoneNumber = "8052860614"},
            new User {Name = "Timitha", PhoneNumber = "8052860614"}
        };

        public List<User> Users() => _users;

        public User UserByName(string name) =>
            _users.FirstOrDefault(user => user.Name.Equals(name, StringComparison.CurrentCultureIgnoreCase));

        public User Add(User user)
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