using System;
using System.Collections.Generic;
using System.Linq;
using HereForYou.Entities;

namespace HereForYou.DataLayer
{
    public class UsersRepository
    {
        private HereForYouConnection _hereForYouConnection;

        public UsersRepository(HereForYouConnection hereForYouConnection)
        {
            _hereForYouConnection = hereForYouConnection;
        }

        public List<User> Users() => _hereForYouConnection.Users.ToList();

        public User UserByName(string name) =>
            _hereForYouConnection.Users.FirstOrDefault(user => user.UserName.Equals(name, StringComparison.CurrentCultureIgnoreCase));

    }
}