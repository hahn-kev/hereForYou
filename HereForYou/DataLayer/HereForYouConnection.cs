using System;
using System.Collections.Generic;
using System.Text;
using HereForYou.Entities;
using LinqToDB;
using LinqToDB.Data;
using LinqToDB.DataProvider.PostgreSQL;
using LinqToDB.Identity;
using LinqToDB.Mapping;
using LinqToDB.SqlQuery;
using Microsoft.Extensions.Options;
using Npgsql;

namespace HereForYou.DataLayer
{
    public class HereForYouConnection : IdentityDataConnection<User, IdentityRole<int>, int>
    {
        public HereForYouConnection()
        {
        }

        public ITable<RideRequest> RideRequests => GetTable<RideRequest>();

        public void Setup()
        {
#if DEBUG
            MappingSchema.GetFluentMappingBuilder().Entity<User>().HasIdentity(user => user.Id);
            TryCreateTable<User>();
            TryCreateTable<IdentityUserClaim<int>>();
            TryCreateTable<IdentityUserLogin<int>>();
            TryCreateTable<IdentityUserToken<int>>();
            TryCreateTable<IdentityUserRole<int>>();
            TryCreateTable<IdentityRole<int>>();
            TryCreateTable<IdentityRoleClaim<int>>();
            TryCreateTable<RideRequest>();
#endif
        }

        private void TryCreateTable<T>()
        {
            try
            {
                this.CreateTable<T>();
            }
            catch (PostgresException e) when(e.SqlState == "42P07")//already exists code I think
            {
            }
        }
    }
}