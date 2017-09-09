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
    }
}