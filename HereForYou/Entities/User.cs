using LinqToDB.Identity;

namespace HereForYou.Entities
{
    public class User: IdentityUser<int>
    {
        public bool RideProvider { get; set; }
    }
}