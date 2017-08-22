using System;
using System.Threading.Tasks;
using HereForYou.Services;
using Microsoft.AspNetCore.Mvc;

namespace HereForYou.Controllers
{
    [Route("api/[controller]")]
    public class EmailController : Controller
    {
        private EmailService _emailService;

        public EmailController(EmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost("help")]
        public async Task<IActionResult> help(string from, string body)
        {
            //todo resolve support email address
            body = $"{from} would like help, here is their request: " + Environment.NewLine + body;
            
            await _emailService.SendEmail("tbd", "Help request", body);
            return Accepted();
        }
    }
}