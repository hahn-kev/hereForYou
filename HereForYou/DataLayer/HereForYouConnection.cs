using HereForYou.Entities;
using LinqToDB;
using LinqToDB.Data;
using Microsoft.Extensions.Options;

namespace HereForYou.DataLayer
{
    public class HereForYouConnection : DataConnection
    {
        public HereForYouConnection()
        {
        }

        public ITable<User> Users => GetTable<User>();
        public ITable<RideRequest> RideRequests => GetTable<RideRequest>();
    }
}