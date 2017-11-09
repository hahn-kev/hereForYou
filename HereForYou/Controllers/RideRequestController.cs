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
        [Authorize(Roles = "admin")]
        public IList<RideRequest> ListRides()
        {
            return _rideRequestRepository.RideRequests().ToList();
        }

        [Authorize(Roles = "admin")]
        [HttpGet("ridesWUsers")]
        public IList<RideRequestUsers> RidesWithUsernames()
        {
            return _rideRequestRepository.RidesWithUsernames().ToList();
        }

        [Authorize(Roles = "admin")]
        [HttpGet("ridesByUser/{type}/{userName}")]
        public IList<RideRequestUsers> RiddenRides(string type, string userName)
        {
            if (type == "rider")
            {
                return _rideRequestRepository.RidesWithUsernames().Where(user => user.RequestedByUser == userName).ToList();
            }
            if (type == "driver")
            {
                return _rideRequestRepository.RidesWithUsernames().Where(user => user.AcceptedByUser == userName).ToList();
            }
            return _rideRequestRepository.RidesWithUsernames().Where(user => user.AcceptedByUser == userName || user.RequestedByUser == userName).ToList();
        }

        [HttpPut]
        public RideRequest Put([FromBody] RideRequest rideRequest, int timezoneOffset)
        {
            if (rideRequest.RequestedById <= 0) throw new Exception("Requested by Id required");
            //timezone offset from browser is reverse of offset in .net
            var offsetTimeSpan = TimeSpan.FromMinutes(timezoneOffset).Negate();
            rideRequest.PickupTime = rideRequest.PickupTime.ToOffset(offsetTimeSpan);
            //todo authorize by user Id
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
            IUser identityUser;
            lock (AcceptLock)
            {
                rideRequest = _rideRequestRepository.GetById(rideRequestId);
                if (rideRequest == null) throw new NullReferenceException("No ride found matching ID");
                if (rideRequest.AuthId != authGuid) return Unauthorized();
                if (rideRequest.AcceptedById > 0) return this.ShowFrontendMessage("Ride has already been accepted by another user");
                identityUser = _usersRepository.UserByName(username);
                if (identityUser == null) throw new NullReferenceException("User not found");
                rideRequest.AcceptedById = identityUser.Id;
                _rideRequestRepository.Save(rideRequest);
            }
            _notifyRideService.NotifyRideAccepted(rideRequest, identityUser);
            return Redirect("~/home");
        }
    }
}