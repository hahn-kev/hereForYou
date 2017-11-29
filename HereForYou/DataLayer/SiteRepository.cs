using System.Linq;
using HereForYou.Entities;

namespace HereForYou.DataLayer
{
    public class SiteRepository
    {
        private readonly HereForYouConnection _connection;
        public SiteRepository(HereForYouConnection connection)
        {
             _connection = connection;
        }
        public Site GetSite(int id)
        {
            return _connection.Sites.FirstOrDefault(site => site.Id == id);
        }
        
    }
}