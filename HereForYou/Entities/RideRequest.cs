using System;

namespace HereForYou.Entities
{
    public class RideRequest
    {
        public int Id { get; set; }
        public string Source { get; set; }
        public string Destination { get; set; }
        public DateTime CreatedTime { get; set; }
        public bool Completed { get; set; }
    }
}