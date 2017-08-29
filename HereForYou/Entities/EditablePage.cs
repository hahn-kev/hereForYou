using System;
using LinqToDB.Mapping;

namespace HereForYou.Entities
{
    public class EditablePage
    {
        [Identity, PrimaryKey]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public DateTime LastUpdated { get; set; }
        public string UpdatedBy { get; set; }
    }
}