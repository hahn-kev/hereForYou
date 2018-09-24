using System;
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
        public ITable<ImageInfo> Images => GetTable<ImageInfo>();

        public IQueryable<UserProfile> UserProfiles
        {
            get
            {
                return from user in GetTable<UserProfile>()
                    from adminRole in Roles.Where(role => role.Name == "admin").DefaultIfEmpty()
                    from userAdminRole in UserRoles.Where(userRole => userRole.RoleId == adminRole.Id && userRole.UserId == user.Id).DefaultIfEmpty()
                    from managerRole in Roles.Where(role => role.Name == "manger").DefaultIfEmpty()
                    from userManagerRole in UserRoles.Where(userRole => userRole.RoleId == adminRole.Id && userRole.UserId == user.Id).DefaultIfEmpty()
                    select new UserProfile
                    {
                        Id = user.Id,
                        Email = user.Email,
                        PhoneNumber = user.PhoneNumber,
                        RideProvider = user.RideProvider,
                        UserName = user.UserName,
                        IsAdmin = userAdminRole != null,
                        IsManager = userManagerRole != null
                    };
            }
        }

        public ITable<EditablePage> EditablePages => GetTable<EditablePage>();
        public ITable<Site> Sites => GetTable<Site>();
        public ITable<SiteExtended> SitesExteneded => GetTable<SiteExtended>();
        public ITable<SiteVisit> SiteVisits => GetTable<SiteVisit>();

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
            TryCreateTable<EditablePage>();
            TryCreateTable<Site>();
            TryCreateTable<SiteVisit>();
            TryCreateTable<ImageInfo>();

            var roles = new[] {"admin", "manager"};
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
            catch (PostgresException e) when (e.SqlState == "42P07") //already exists code I think
            {
            }
        }
    }
}