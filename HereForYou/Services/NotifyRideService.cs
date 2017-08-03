using System;
using System.Linq;
using HereForYou.Controllers;
using HereForYou.DataLayer;
using HereForYou.Entities;
using Microsoft.Extensions.Options;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace HereForYou.Services
{
    public class NotifyRideService
    {
        private readonly UsersRepository _usersRepository;
        private readonly Settings _options;

        public NotifyRideService(UsersRepository usersRepository, IOptions<Settings> options)
        {
            _usersRepository = usersRepository;
            _options = options.Value;
        }

        public void Notify(RideRequest rideRequest)
        {
            NotifyUser(rideRequest, _usersRepository.Users().First());
//            foreach (var user in _usersRepository.Users())
//            {
//                NotifyUser(rideRequest, user);
//            }
        }

        private void NotifyUser(RideRequest rideRequest, User user)
        {
            string message = FormatMessage(rideRequest, user);
//#if !DEBUG
//            MessageResource.Create(from: new PhoneNumber("805-538-2428"),
//                to: new PhoneNumber(user.PhoneNumber),
//                body: message);
//#else
            Console.Write(message);
//#endif
        }

        private string FormatMessage(RideRequest rideRequest, User user)
        {
            return $"Someone in your area would like a ride." + Environment.NewLine +
                   $"From: {rideRequest.Source}" + Environment.NewLine +
                   $"To: {rideRequest.Destination}" + Environment.NewLine +
                   $"At: {rideRequest.CreatedTime.ToLocalTime():g}" + Environment.NewLine +
                   $"Accpet? {_options.BaseUrl}/api/riderequest/{nameof(RideRequestController.Accept)}/{rideRequest.Id}?user={user.Name}";
        }
    }
}