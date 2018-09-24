using LinqToDB.Mapping;

namespace HereForYou.Entities
{
    public class RegisterUser: IUser
    {
        public int Id { get; set; }
        public string Password { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public bool RideProvider { get; set; }
        public bool ResetPassword { get; set; }
        public bool Approved { get; set; }
    }

    public class SignupUser : IUser
    {
        public int Id { get; set; }
        public string Password { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public bool RideProvider
        {
            get => false;
            set { }
        }

        public bool ResetPassword { get; set; }
        public bool Approved
        {
            get => false;
            set { }
        }
        public string Captcha { get; set; }
    }
}