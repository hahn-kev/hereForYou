using System;
using System.Collections.Generic;
using System.Linq;
using HereForYou.Entities;
using LinqToDB;
using LinqToDB.Data;

namespace HereForYou.DataLayer
{
    public class RideRequestRepository
    {
        private readonly HereForYouConnection _connection;

        public RideRequestRepository(HereForYouConnection connection)
        {
            _connection = connection;
        }


        public List<RideRequest> RideRequests() => _connection.RideRequests.ToList();

        public RideRequest Add(RideRequest rideRequest)
        {
            rideRequest.Id = _connection.InsertId(rideRequest);
            return rideRequest;
        }

        public void Remove(int id)
        {
            _connection.RideRequests.Delete(request => request.Id == id);
        }

        public void Save(RideRequest rideRequest)
        {
            if (rideRequest.Id <= 0) Add(rideRequest);
            else
            {
                _connection.Update(rideRequest);
            }
        }

        public RideRequest GetById(int id)
        {
            return _connection.RideRequests.SingleOrDefault(request => request.Id == id);
        }
    }
}