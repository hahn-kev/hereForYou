using System.Diagnostics;
using System.IO;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using HereForYou.DataLayer;
using HereForYou.Entities;
using HereForYou.Services;
using LinqToDB.Data;
using LinqToDB.Identity;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Twilio;

namespace HereForYou
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            // Set up configuration sources.
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

            Configuration = builder.Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddOptions();
            services.Configure<Settings>(Configuration);
            services.Configure<JWTSettings>(Configuration.GetSection("JWTSettings"));

            services.AddIdentity<User, IdentityRole<int>>(options =>
                {
                    // avoid redirecting REST clients on 401
                    options.Cookies.ApplicationCookie.Events = new CookieAuthenticationEvents
                    {
                        OnRedirectToLogin = ctx =>
                        {
                            ctx.Response.StatusCode = (int) HttpStatusCode.Unauthorized;
                            return Task.FromResult(0);
                        }
                    };
                    options.SignIn.RequireConfirmedEmail = false;
                    options.SignIn.RequireConfirmedPhoneNumber = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequireDigit = false;
                    options.Password.RequireLowercase = false;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequiredLength = 8;
                })
                .AddLinqToDBStores<int>(new DefaultConnectionFactory());

            services.AddMvc();
            services.AddResponseCaching();
            services.AddAuthorization(options =>
            {
//                options.AddPolicy("test");
            });
            services.AddScoped<RideRequestRepository>();
            services.AddScoped<UsersRepository>();
            services.AddScoped<NotifyRideService>();
            services.AddScoped<EmailService>();
            services.AddScoped<HereForYouConnection>();
        }

        public IConfigurationRoot Configuration { get; set; }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });
            app.Use(async (context, next) =>
            {
                await next();
                if (context.Response.StatusCode == 404 &&
                    !Path.HasExtension(context.Request.Path.Value) &&
                    !context.Request.Path.Value.StartsWith("/api/"))
                {
                    context.Request.Path = "/index.html";
                    await next();
                }
            });
            app.UseStaticFiles();
            app.UseResponseCaching();
            app.UseIdentity();
            var jwtSettings = app.ApplicationServices.GetService<IOptions<JWTSettings>>().Value;
            //setup using this guide: https://auth0.com/blog/asp-dot-net-core-authentication-tutorial/
            app.UseJwtBearerAuthentication(new JwtBearerOptions
            {
                TokenValidationParameters =  new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSettings.SecretKey)),
                    
                    ValidateIssuer = true,
                    ValidIssuer = jwtSettings.Issuer,
                    
                    ValidateAudience = true,
                    ValidAudience = jwtSettings.Audience,
                    
                },
                SecurityTokenValidators = { }
            });
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AutomaticAuthenticate = false,
                AutomaticChallenge = false,
            });
            app.UseMvc();
            
            var settings = app.ApplicationServices.GetService<IOptions<Settings>>().Value;
            DataConnection.AddDataProvider(new MyPostgreSQLDataProvider("MyPostGreSQLProvider"));
            DataConnection.DefaultSettings = settings;
            TwilioClient.Init(settings.TwilioAccountSid, settings.TwilioAuthToken);
                
            using (var scope = app.ApplicationServices.CreateScope())
            {
                var hereForYouConnection = scope.ServiceProvider.GetService<HereForYouConnection>();
                if (env.IsDevelopment())
                {
                    DataConnection.TurnTraceSwitchOn();
                    DataConnection.WriteTraceLine = (message, category) => Debug.WriteLine(message, category);
                    hereForYouConnection.Setup().Wait();
                }
            }
        }
    }
}