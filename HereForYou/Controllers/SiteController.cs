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
        public SiteController(SiteRepository siteRepository)
        {
            _siteRepository = siteRepository;
        }

        [HttpGet]
        public IActionResult Sites()
        {
            return Json ("Templeton");
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            if (id == 0){
                return Json ("Site number invalid");
            }
           return Json (_siteRepository.GetSite(id));
            
        }
        [HttpPut]
        public IActionResult Save([FromBody] Site site)
        {
            _siteRepository.Save(site);
            return Json(site);
        }
    } 
}