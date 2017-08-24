using System.Collections.Generic;
using LinqToDB.Mapping;

namespace HereForYou.Entities
{
    [Table("User", IsColumnAttributeRequired = false)]
    public class UserProfile: IUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string PhoneNumber { get; set; }
        public bool RideProvider { get; set; }
    }

    public interface IUser
    {
        int Id { get; set; }
        string UserName { get; set; }
        string PhoneNumber { get; set; }
        bool RideProvider { get; set; }
    }
}