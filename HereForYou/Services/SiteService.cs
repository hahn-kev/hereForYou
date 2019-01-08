using System.Collections.Generic;
using System.Linq;
using HereForYou.DataLayer;
using HereForYou.Entities;

namespace HereForYou.Services
{
    public class SiteService
    {
        private readonly SiteRepository _siteRepository;
        private readonly SiteVisitRepository _visitRepository;

        public SiteService(SiteRepository siteRepository, SiteVisitRepository visitRepository)
        {
            _siteRepository = siteRepository;
            _visitRepository = visitRepository;
        }

        public List<SiteAgg> ListSites()
        {
            return _siteRepository.ListSites();
        }

        public SiteExtended GetSite(int id)
        {
            var site = _siteRepository.GetSite(id);
            site.Visits = GetSiteVisits(id);
            return site;
        }

        public List<SiteVisit> GetSiteVisits(int siteId)
        {
            return _visitRepository.SiteVisits.Where(visit => visit.SiteId == siteId).ToList();
        }

        public void Save(SiteVisit visit)
        {
            _visitRepository.Save(visit);
            UpdateLastVisitDate(visit.SiteId);
        }

        public void Save(Site site)
        {
            _siteRepository.Save(site);
        }

        public void UpdateLastVisitDate(int siteId)
        {
            _siteRepository.UpdateLastVisitDate(siteId);
        }

        public void DeleteSite(int id)
        {
            _siteRepository.Delete(id);
        }

        public void DeleteVisit(int id)
        {
            var siteId = _visitRepository.GetVisitSiteId(id);
            _visitRepository.Delete(id);
            UpdateLastVisitDate(siteId);
        }
    }
}