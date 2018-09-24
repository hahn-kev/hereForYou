using LinqToDB.Identity;
using LinqToDB.Mapping;

namespace HereForYou.Entities
{
    [Table("User", IsColumnAttributeRequired = false)]
    public class IdentityUser: IdentityUser<int>, IUser
    {
        public bool RideProvider { get; set; }
        public bool ResetPassword { get; set; }
        public bool Approved { get; set; }
    }
}