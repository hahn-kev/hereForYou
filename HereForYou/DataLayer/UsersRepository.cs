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

        public IQueryable<UserProfile> Users => _hereForYouConnection.UserProfiles;

        public UserProfile UserByName(string name)
        {
            if (string.IsNullOrEmpty(name)) return null;
            return Users.FirstOrDefault(user =>
                user.UserName == name);
        }

        public UserProfile UserById(int id) => Users.FirstOrDefault(user => user.Id == id);
    }
}