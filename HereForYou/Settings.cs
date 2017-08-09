using System;
using System.Collections.Generic;
using HereForYou.DataLayer;
using LinqToDB.Configuration;

namespace HereForYou
{
    public class Settings : ILinqToDBSettings
    {
        public string BaseUrl { get; set; } =
#if DEBUG
            "http://localhost:4201";
#else
            "http://drop.hahn-kev.com";
#endif
        public string ConnectionString { get; set; }
        public string TwilioAccountSid { get; set; }
        public string TwilioAuthToken { get; set; }
        
        public IEnumerable<IDataProviderSettings> DataProviders
        {
            get {yield break;}
        }

        public string DefaultConfiguration => "PostGreSQL";
        public string DefaultDataProvider => "MyPostGreSQLProvider";

        public IEnumerable<IConnectionStringSettings> ConnectionStrings
        {
            get
            {
                yield return new ConnectionStringSettings
                {
                    Name = "PostGreSQL",
                    ProviderName = "MyPostGreSQLProvider",
                    ConnectionString = FormatConnectionString(ConnectionString)
                };
            }
        }

        private string FormatConnectionString(string connectionString)
        {
            var uri = new Uri(connectionString);
            var db = uri.AbsolutePath.Trim('/');
            var user = uri.UserInfo.Split(':')[0];
            var passwd = uri.UserInfo.Split(':')[1];
            var port = uri.Port > 0 ? uri.Port : 5432;
            return $"Server={uri.Host};Database={db};User Id={user};Password={passwd};Port={port}";
        }
    }
    
    public class ConnectionStringSettings : IConnectionStringSettings
    {
        public string ConnectionString { get; set; }
        public string Name { get; set; }
        public string ProviderName { get; set; }
        public bool IsGlobal => false;
    }
}