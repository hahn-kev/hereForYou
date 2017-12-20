using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using HereForYou.Entities;
using System;
using HereForYou.DataLayer;

namespace HereForYou.Controllers
{
    [Authorize(Roles = "admin")]
    [Route("api/[controller]")]
    public class SiteController : Controller
    {
        private readonly SiteRepository _siteRepository;
        private readonly SiteVisitRepository _siteVisitRepository;

        public SiteController(SiteRepository siteRepository, SiteVisitRepository siteVisitRepository)
        {
            _siteRepository = siteRepository;
            _siteVisitRepository = siteVisitRepository;
        }


        [HttpGet]
        public IActionResult Sites()
        {
            return Json(_siteRepository.ListSites());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            if (id == 0)
            {
                return Json("Site number invalid");
            }

            SiteExtended site = (_siteRepository.GetSite(id));
            site.Visits = _siteVisitRepository.GetSiteVisits(id);
            return Json(site);
        }

        [HttpPut]
        public IActionResult Save([FromBody] Site site)
        {
            _siteRepository.Save(site);
            return Json(site);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _siteRepository.Delete(id);
            return Ok();
        }

        [HttpPut("visit")]
        public IActionResult Save([FromBody] SiteVisit visit)
        {
            _siteVisitRepository.Save(visit);
            return Json(visit);
        }

        [HttpDelete("visit/{id}")]
        public IActionResult DeleteVisit(int id)
        {
            _siteVisitRepository.Delete(id);
            return Ok();
        }
    }
}