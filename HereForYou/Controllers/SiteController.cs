using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using HereForYou.Entities;
using System;
using HereForYou.DataLayer;
using HereForYou.Services;

namespace HereForYou.Controllers
{
    [Authorize(Policy = "siteEditor")]
    [Route("api/[controller]")]
    public class SiteController : Controller
    {
        private SiteService _siteService;

        public SiteController(SiteService siteService)
        {
            _siteService = siteService;
        }


        [HttpGet]
        public IActionResult Sites()
        {
            return Json(_siteService.ListSites());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            if (id == 0)
            {
                throw new Exception("Site number invalid");
            }

            SiteExtended site = _siteService.GetSite(id);
            return Json(site);
        }

        [HttpPut]
        public IActionResult Save([FromBody] Site site)
        {
            _siteService.Save(site);
            return Json(site);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _siteService.DeleteSite(id);
            return Ok();
        }

        [HttpPut("visit")]
        public IActionResult Save([FromBody] SiteVisit visit)
        {
            _siteService.Save(visit);
            return Json(visit);
        }

        [HttpDelete("visit/{id}")]
        public IActionResult DeleteVisit(int id)
        {
            _siteService.DeleteVisit(id);
            return Ok();
        }
    }
}