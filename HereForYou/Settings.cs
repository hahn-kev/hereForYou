namespace HereForYou
{
    public class Settings
    {
        public string BaseUrl { get; set; } =
#if DEBUG
            "http://localhost:4201";
    #else
            "http://drop.hahn-kev.com";
#endif

    }
}