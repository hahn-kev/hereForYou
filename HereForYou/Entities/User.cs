namespace HereForYou.Entities
{
    public class User
    {
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public bool RideProvider { get; set; }
        /// <summary>
        /// Password is only used to set the password, it can not be returned from the api
        /// </summary>
        public string Password { get; set; }
    }
}