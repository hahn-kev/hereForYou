using LinqToDB.Mapping;

namespace HereForYou.Entities
{
    public class RegisterUser
    {
        public RegisterUser(IdentityUser user)
        {
            UserName = user.UserName;
            PhoneNumber = user.PhoneNumber;
            RideProvider = user.RideProvider;
        }

        public RegisterUser()
        {
        }

        public string Password { get; set; }
        public string UserName { get; set; }
        public string PhoneNumber { get; set; }
        public bool RideProvider { get; set; }
    }
}