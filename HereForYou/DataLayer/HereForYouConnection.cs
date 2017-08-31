﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using HereForYou.Entities;
using LinqToDB;
using LinqToDB.Data;
using LinqToDB.DataProvider.PostgreSQL;
using LinqToDB.Identity;
using LinqToDB.Mapping;
using LinqToDB.SqlQuery;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Npgsql;
using IdentityUser = HereForYou.Entities.IdentityUser;

namespace HereForYou.DataLayer
{
    public class HereForYouConnection : IdentityDataConnection<IdentityUser, IdentityRole<int>, int>
    {
        private readonly RoleManager<IdentityRole<int>> _roleManager;

        public HereForYouConnection(RoleManager<IdentityRole<int>> roleManager)
        {
            _roleManager = roleManager;
            
            var builder = MappingSchema.GetFluentMappingBuilder();
            builder.Entity<IdentityUser>().HasIdentity(user => user.Id);
            builder.Entity<IdentityUserClaim<int>>().HasIdentity(claim => claim.Id);
            builder.Entity<IdentityRole<int>>().HasIdentity(role => role.Id);
            builder.Entity<IdentityRoleClaim<int>>().HasIdentity(claim => claim.Id);
        }

        public ITable<RideRequest> RideRequests => GetTable<RideRequest>();

        public IQueryable<UserProfile> UserProfiles => GetTable<UserProfile>();

        public async Task Setup()
        {
#if DEBUG
            TryCreateTable<IdentityUser>();
            TryCreateTable<IdentityUserClaim<int>>();
            TryCreateTable<IdentityUserLogin<int>>();
            TryCreateTable<IdentityUserToken<int>>();
            TryCreateTable<IdentityUserRole<int>>();
            TryCreateTable<IdentityRole<int>>();
            TryCreateTable<IdentityRoleClaim<int>>();
            TryCreateTable<RideRequest>();
            
            var roles = new[]{"admin"};
            foreach (var role in roles)
            {
                if (!await _roleManager.RoleExistsAsync(role))
                {
                    await _roleManager.CreateAsync(new IdentityRole<int>(role));
                }
            }
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