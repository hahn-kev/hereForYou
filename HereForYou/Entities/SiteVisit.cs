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
        public string WorkerName { get; set; }
        public bool BibleGiven { get; set; }
        public int SiteId { get; set; }

        public string TeamMembers { get; set; }
        public string Notes { get; set; }
        public bool GiftsGiven { get; set; }
        public bool LoginGiven { get; set; }
        public bool Prayer { get; set; }

        public string EnglishAbility { get; set; }
        public string Age { get; set; }
        public bool FollowUpRequired { get; set; }

        public bool DressedInappropriately { get; set; }
        public bool InadequateLighting { get; set; }
        public bool CanNotLeave { get; set; }
        public bool SleepingOnSite { get; set; }
        public bool BeingMovedAround { get; set; }
        public bool DoesntHaveDocument { get; set; }
        public bool Depressed { get; set; }
        public bool LowJobSatisfaction { get; set; }
    }
}