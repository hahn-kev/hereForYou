using System;
using System.Linq;
using HereForYou.Entities;
using LinqToDB;

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
        public void Save(Site site)
        {
            if (site.Id <= 0) Add(site);
            else
            {
               _connection.Update(site); 
             }
        }

        private Site Add(Site site)
        {
            site.Id = _connection.InsertId(site);
            return site;
        }
    }   
}