using System;
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
    
}