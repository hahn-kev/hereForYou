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

        public void UpdateLastVisitDate(int siteId)
        {
            _connection.Sites.Where(site => site.Id == siteId)
                .Set(site => site.LastVisit,
                    () => _connection.SiteVisits
                        .Where(visit => visit.SiteId == siteId)
                        .Select(visit => Sql.Ext.Max(visit.VisitDate).ToValue())
                        .FirstOrDefault())
                .Update();
        }

        public List<SiteAgg> ListSites()
        {
            return (from site in _connection.GetTable<SiteAgg>()
                orderby site.LastVisit descending
                select new SiteAgg
                {
                    Id = site.Id,
                    LastVisit = site.LastVisit,
                    Name = site.Name,
                    Address = site.Address,
                    TeamMembers = _connection.SiteVisits.Where(visit => visit.SiteId == site.Id)
                        .Select(visit => visit.TeamMembers.JoinSql(" ")).Single(),
                    WorkerNames = _connection.SiteVisits.Where(visit => visit.SiteId == site.Id)
                        .Select(visit => visit.WorkerName.JoinSql(" ")).Single()
                }).ToList();
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