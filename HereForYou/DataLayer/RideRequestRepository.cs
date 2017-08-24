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


        public IQueryable<RideRequest> RideRequests() => _connection.RideRequests;

        public IQueryable<RideRequest> RidesByRider(int riderId)
        {
            return _connection.RideRequests.Where(request => request.RequestedById == riderId);
        }

        public IQueryable<RideRequest> RidesByProvider(int providerId)
        {
            return _connection.RideRequests.Where(request => request.AcceptedById == providerId);
        }

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

        public IQueryable<RideRequestUsers> RidesWithUsernames()
        {
            return from r in _connection.RideRequests
                join driver in _connection.Users on r.AcceptedById equals driver.Id
                join rider in _connection.Users on r.RequestedById equals rider.Id
                select new RideRequestUsers
                {
                    Id = r.Id,
                    Source = r.Source,
                    Destination = r.Destination,
                    PickupTime = r.PickupTime,
                    AcceptedById = r.AcceptedById,
                    RequestedById = r.RequestedById,
                    AuthId = r.AuthId,
                    AcceptedByUser = driver.UserName,
                    RequestedByUser = rider.UserName
                };
        }
    }
}