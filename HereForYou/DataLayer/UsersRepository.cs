using System;
using System.Collections.Generic;
using System.Linq;
using HereForYou.Entities;
using LinqToDB;

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

        public void DeleteUser(int id)
        {
            using (var dataConnectionTransaction = _hereForYouConnection.BeginTransaction())
            {
                _hereForYouConnection.UserClaims.Where(claim => claim.UserId == id).Delete();
                _hereForYouConnection.UserLogins.Where(login => login.UserId == id).Delete();
                _hereForYouConnection.UserRoles.Where(role => role.UserId == id).Delete();
                _hereForYouConnection.UserTokens.Where(token => token.UserId == id).Delete();
                _hereForYouConnection.Users.Where(user => user.Id == id).Delete();
                dataConnectionTransaction.Commit();
            }
        }
    }
}