using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace HereForYou.Controllers
{
    public static class ControllerExtensions
    {
        public static JsonResult Errors(this IdentityResult result)
        {
            var items = result.Errors
                .Select(x => x.Description)
                .ToArray();
            return new JsonResult(items) {StatusCode = 500};
        }
    }
}