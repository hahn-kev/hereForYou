﻿using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace HereForYou.Controllers
{
    [Route("api/[controller]")]
    public class SettingsController : Controller
    {
        private readonly Settings _settings;

        public SettingsController(IOptions<Settings> settings)
        {
            _settings = settings.Value;
        }

        [HttpGet]
        public IActionResult Settings()
        {
            return Json(new
            {
                _settings.DiscourseBaseUrl
            });
        }

        [HttpGet("setLanguage/{culture}")]
        public IActionResult SetLanguage(string culture)
        {
            Response.Cookies.Append(CookieRequestCultureProvider.DefaultCookieName,
                CookieRequestCultureProvider.MakeCookieValue(new RequestCulture(culture)),
                new CookieOptions {Expires = DateTimeOffset.UtcNow.AddYears(1)});
            return LocalRedirect("/");
        }
    }
}