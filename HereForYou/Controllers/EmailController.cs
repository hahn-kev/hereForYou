﻿using System;
using System.Threading.Tasks;
using HereForYou.Services;
using Microsoft.AspNetCore.Mvc;

namespace HereForYou.Controllers
{
    [Route("api/[controller]")]
    public class EmailController : Controller
    {
        private readonly EmailService _emailService;

        public EmailController(EmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost("help")]
        public async Task<IActionResult> Help(string from, string body, string phoneNumber, string type)
        {
            body = $"{from} would like help, their phone number is {phoneNumber}.{Environment.NewLine} Message Type: {type} {Environment.NewLine}Here is their request: " + Environment.NewLine + body;
            
            await _emailService.SendEmail("info@freedomcalling.org", "Help request " + from, body);
            return Accepted();
        }
        
        [HttpPost("classRequest")]
        public async Task<IActionResult> ClassRequest(string from, string location, string contact)
        {
            //todo resolve support email address
            string body = $"{from} would like an english lesson at {location}, their contact info is {contact}.";
            
//            await _emailService.SendEmail("info@freedomcalling.org", "1 on 1 Class request " + from, body);
            return Accepted();
        }
    }
}