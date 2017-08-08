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
        public DateTime CreatedTime { get; set; }
        public string AcceptedBy { get; set; }
    }
}