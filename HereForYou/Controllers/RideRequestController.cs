using System;
using System.Collections.Generic;
using HereForYou.DataLayer;
using HereForYou.Entities;
using HereForYou.Services;
using LinqToDB;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HereForYou.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class RideRequestController : Controller
    {
        private readonly RideRequestRepository _rideRequestRepository;
        private readonly NotifyRideService _notifyRideService;
        private readonly UsersRepository _usersRepository;

        public RideRequestController(RideRequestRepository rideRequestRepository, NotifyRideService notifyRideService, UsersRepository usersRepository)
        {
            _rideRequestRepository = rideRequestRepository;
            _notifyRideService = notifyRideService;
            _usersRepository = usersRepository;
        }

        [HttpGet]
        public IEnumerable<RideRequest> ListRides()
        {
            return _rideRequestRepository.RideRequests();
        }

        [HttpPut]
        public RideRequest Put([FromBody] RideRequest rideRequest)
        {
            rideRequest =_rideRequestRepository.Add(rideRequest);
            _notifyRideService.Notify(rideRequest);
            return rideRequest;
        }

        [HttpGet("accept/{id}")]
        public IActionResult Accept(string user, int id)
        {
            if (string.IsNullOrEmpty(user) || _usersRepository.UserByName(user) == null)
            {
                throw new ArgumentException("user not specified");
            }
            var rideRequest = _rideRequestRepository.GetById(id);
            if (rideRequest == null) throw new NullReferenceException("No ride found matching ID");
            rideRequest.AcceptedBy = user;
            _rideRequestRepository.Save(rideRequest);
            return Redirect("~/ride-share");
        }
    }
}