using System.Collections.Generic;
using HereForYou.Entities;
using Microsoft.AspNetCore.Mvc;

namespace HereForYou.Controllers
{
    [Route("api/[controller]")]
    public class RideRequestController : Controller
    {
        private static readonly List<RideRequest> _rideRequests = new List<RideRequest>();

        [HttpGet]
        public IEnumerable<RideRequest> Get()
        {
            return _rideRequests;
        }

        [HttpPut]
        public RideRequest Put([FromBody] RideRequest rideRequest)
        {
            _rideRequests.Add(rideRequest);
            return rideRequest;
        }
    }
}