using System;
using System.Collections.Generic;
using System.Linq;
using HereForYou.Entities;

namespace HereForYou.DataLayer
{
    public class UsersRepository
    {
        private readonly HereForYouConnection _hereForYouConnection;

        public UsersRepository(HereForYouConnection hereForYouConnection)
        {
            _hereForYouConnection = hereForYouConnection;
        }

        public IEnumerable<User> Users() => _hereForYouConnection.Users;

        public User UserByName(string name)
        {
            if (string.IsNullOrEmpty(name)) return null;
            return _hereForYouConnection.Users.FirstOrDefault(user =>
                user.UserName == name);
        }

        public User UserById(int id) => _hereForYouConnection.Users.FirstOrDefault(user => user.Id == id);

        public int UserIdByName(string username)
        {
            if (string.IsNullOrEmpty(username)) return 0;
            return _hereForYouConnection.Users
                .Where(user => user.UserName.Equals(username, StringComparison.CurrentCultureIgnoreCase))
                .Select(user => user.Id).FirstOrDefault();
        }
    }
}