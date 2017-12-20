using System;
using System.Collections.Generic;
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

        public SiteExtended GetSite(int id)
        {
            return _connection.SitesExteneded.FirstOrDefault(site => site.Id == id);
        }

        public void Save(Site site)
        {
            if (site.Id <= 0) Add(site);
            else
            {
                _connection.Update(site);
            }
        }

        public List<Site> ListSites()
        {
            return _connection.Sites.ToList();
        }

        private Site Add(Site site)
        {
            site.Id = _connection.InsertId(site);
            return site;
        }

        public void Delete(int id)
        {
            _connection.SiteVisits.Delete(visit => visit.SiteId == id);
            int deletedsites = _connection.Sites.Delete(site => site.Id == id);
            if (deletedsites == 0)
            {
                throw new Exception("No sites deleted");
            }

            if (deletedsites > 1)
            {
                throw new Exception(deletedsites + " sites have been deleted");
            }
        }
    }
}