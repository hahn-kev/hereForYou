using System;
using System.Collections.Generic;
using System.Linq;
using HereForYou.Entities;

namespace HereForYou.DataLayer
{
    public class RideRequestRepository
    {
        private static readonly List<RideRequest> _rideRequests = new List<RideRequest>()
        {
            new RideRequest()
            {
                CreatedTime = DateTime.Now.AddHours(1),
                Destination = "somewhere",
                Source = "somewhere else",
                Id = 1
            }
        };

        public List<RideRequest> RideRequests() => _rideRequests;

        public RideRequest Add(RideRequest rideRequest)
        {
            _rideRequests.Add(rideRequest);
            rideRequest.Id = _rideRequests.Count;
            return rideRequest;
        }

        public void Save(RideRequest rideRequest)
        {
            if (rideRequest.Id <= 0) Add(rideRequest);
            else
            {
                for (var i = 0; i < _rideRequests.Count; i++)
                {
                    var request = _rideRequests[i];
                    if (rideRequest.Id != request.Id) continue;
                    _rideRequests[i] = rideRequest;
                    break;
                }
            }
        }

        public RideRequest GetById(int id)
        {
            return _rideRequests.FirstOrDefault(request => request.Id == id);
        }
    }
}