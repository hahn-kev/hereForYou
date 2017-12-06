using System;
using System.Collections.Generic;
using LinqToDB.Mapping;

namespace HereForYou.Entities
{
    [Table("Site", IsColumnAttributeRequired = false)]
    public class Site
    {
        [Identity, PrimaryKey]
        public int Id { get; set; }
        public string Name { get; set;}
        public DateTime LastVisit { get; set;}

    }
    [Table("Site", IsColumnAttributeRequired = false)]
    public class SiteExtended: Site
    {
        public List<SiteVisit> Visits {get; set;}
    }
}