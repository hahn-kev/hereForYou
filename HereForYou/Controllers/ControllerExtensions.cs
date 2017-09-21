using System;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace HereForYou.Controllers
{
    public static class ControllerExtensions
    {
        public static IActionResult Errors(this IdentityResult result)
        {
            throw new ArgumentException(string.Join(Environment.NewLine, result.Errors
                .Select(x => x.Description)));
            return new BadRequestResult();
        }
    }
}