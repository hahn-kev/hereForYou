﻿using System;
using System.Linq;
using HereForYou.Controllers;
using HereForYou.DataLayer;
using HereForYou.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
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

        public void NotifyNewRide(RideRequest rideRequest, IUrlHelper url)
        {
            foreach (var user in _usersRepository.Users.Where(profile => profile.RideProvider))
            {
                SendNotification(user.PhoneNumber, FormatNewRideMessage(rideRequest, user, url));
            }
        }

        public void NotifyRideAccepted(RideRequest rideRequest, IUser acceptedBy)
        {
            NotifyRideAccepted(rideRequest, acceptedBy, _usersRepository.UserById(rideRequest.RequestedById));
        }

        public void NotifyRideAccepted(RideRequest rideRequest, IUser acceptedBy, IUser requestedBy)
        {
            SendNotification(acceptedBy.PhoneNumber, FormatAcceptedMessageToProvider(rideRequest, requestedBy));
            SendNotification(requestedBy.PhoneNumber, FormatAcceptedMessageToRequester(acceptedBy));
        }

        private void SendNotification(string phoneNumber, string message)
        {
            
#if !DEBUG
            MessageResource.Create(from: new PhoneNumber(_options.TwilioPhoneNumber),
                to: new PhoneNumber(phoneNumber),
                body: message);
#else
            Console.WriteLine(message);
#endif
        }

        private string FormatNewRideMessage(RideRequest rideRequest, IUser user, IUrlHelper url)
        {
            return $"Someone in your area would like a ride." + Environment.NewLine +
                   $"From: {rideRequest.Source}" + Environment.NewLine +
                   $"To: {rideRequest.Destination}" + Environment.NewLine +
                   $"At: {rideRequest.PickupTime:g}" + Environment.NewLine +
                   $"Accpet? {_options.BaseUrl}{url.Action("Accept", "RideRequest", new {rideRequestId = rideRequest.Id, username = user.UserName, auth = rideRequest.AuthId})}" +
                   Environment.NewLine +
                   $"Once you accept you will be sent their Username and Phone number";
        }

        private string FormatAcceptedMessageToRequester(IUser acceptedBy)
        {
            return
                $"{acceptedBy.UserName} has agreed to give you a ride, you can contact them on their number at {acceptedBy.PhoneNumber}" +
                Environment.NewLine +
                $"Please contact 1 (888)-373-7888 if you have any problems or feel unsafe";
        }

        private string FormatAcceptedMessageToProvider(RideRequest rideRequest, IUser requestedBy)
        {
            return
                $"Thank you for accepting to give {requestedBy.UserName} a ride, you can contact them on their number at {requestedBy.PhoneNumber}. " +
                $"As a reminder remeber that you're picking them up at: {rideRequest.Source} and " +
                $"taking them to: {rideRequest.Destination} at: {rideRequest.PickupTime:g}";
        }
    }
}