using System;
using System.Collections.Generic;
using System.Linq;
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

        public RideRequestController(RideRequestRepository rideRequestRepository, NotifyRideService notifyRideService,
            UsersRepository usersRepository)
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
        
        [Authorize(Roles = "admin")]
        [HttpGet("ridesWUsers")]
        public IEnumerable<RideRequestUsers> RidesWithUsernames()
        {
            return _rideRequestRepository.RidesWithUsernames();
        }

        [Authorize(Roles = "admin")]
        [HttpGet("ridesByDriver/{providerId}")]
        public IEnumerable<RideRequestUsers> ProvidedRides(int providerId)
        {
            return _rideRequestRepository.RidesWithUsernames().Where(user => user.AcceptedById == providerId);
        }

        [Authorize(Roles = "admin")]
        [HttpGet("ridesByRider/{riderId}")]
        public IEnumerable<RideRequestUsers> RiddenRides(int riderId)
        {
            return _rideRequestRepository.RidesWithUsernames().Where(user => user.RequestedById == riderId);
        }


        [HttpPut]
        public RideRequest Put([FromBody] RideRequest rideRequest)
        {
            if (rideRequest.RequestedById <= 0) throw new Exception("Requested by Id required");
            rideRequest = _rideRequestRepository.Add(rideRequest);
            try
            {
                _notifyRideService.NotifyNewRide(rideRequest, Url);
            }
            catch (Exception e)
            {
                _rideRequestRepository.Remove(rideRequest.Id);
                throw;
            }
            return rideRequest;
        }

        private static readonly object AcceptLock = new object();

        [AllowAnonymous]
        [HttpGet("accept/{rideRequestId}")]
        public IActionResult Accept(string username, int rideRequestId, string auth)
        {
            if (!Guid.TryParse(auth, out Guid authGuid)) return Unauthorized();
            RideRequest rideRequest;
            User user;
            lock (AcceptLock)
            {
                rideRequest = _rideRequestRepository.GetById(rideRequestId);
                if (rideRequest == null) throw new NullReferenceException("No ride found matching ID");
                if (rideRequest.AuthId != authGuid) return Unauthorized();
                if (rideRequest.AcceptedById > 0) throw new Exception("Ride has already been accepted by another user");
                user = _usersRepository.UserByName(username);
                if (user == null) throw new NullReferenceException("User not found");
                rideRequest.AcceptedById = user.Id;
                _rideRequestRepository.Save(rideRequest);
            }
            _notifyRideService.NotifyRideAccepted(rideRequest, user);
            return Redirect("~/ride-share");
        }
    }
}