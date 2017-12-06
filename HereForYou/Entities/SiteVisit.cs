using System;
using LinqToDB.Mapping;

namespace HereForYou.Entities
{
    [Table("SiteVisit", IsColumnAttributeRequired = false)]
    public class SiteVisit
    {
        [Identity, PrimaryKey]
        public int Id { get; set; }
        public DateTime VisitDate { get; set; }
        public string WorkerName { get; set;}
        public bool  BibleGiven { get; set;}
        public int SiteId { get; set;}
    }
}