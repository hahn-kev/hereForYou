using System;
using LinqToDB.Mapping;

namespace HereForYou.Entities
{
    public class RideRequest
    {
        [PrimaryKey, Identity]
        public int Id { get; set; }
        public string Source { get; set; }
        public string Destination { get; set; }
        public DateTimeOffset PickupTime { get; set; }
        public int? AcceptedById { get; set; }
        public int RequestedById { get; set; }
        public Guid AuthId { get; set; } = Guid.NewGuid();
    }

    public class RideRequestUsers : RideRequest
    {
        public string AcceptedByUser { get; set; }
        public string RequestedByUser { get; set; }
    }
}