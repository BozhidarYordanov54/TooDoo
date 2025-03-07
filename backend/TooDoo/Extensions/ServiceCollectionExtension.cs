using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TooDoo.Core.Contracts;
using TooDoo.Core.Services;
using TooDoo.Core.Services.Contracts;
using TooDoo.Infrastructure.Common;
using TooDoo.Infrastructure.Data;
using TooDoo.Infrastructure.Data.Models;

namespace TooDoo.Extensions
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection AddApplicationDbContext(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DefaultConnection");

            services.AddDbContext<TooDooDbContext>(options =>
            {
                options.UseSqlServer(connectionString);
            });

            return services;
        }

        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IRepository, Repository>();

            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddScoped<IUserProfileService, UserProfileService>();

            return services;
        }

        public static IServiceCollection AddIdentity(this IServiceCollection services)
        {
            services.AddIdentity<User, IdentityRole>(o => o.SignIn.RequireConfirmedAccount = false)
                .AddEntityFrameworkStores<TooDooDbContext>()
                .AddDefaultTokenProviders();

            services.AddAuthentication(o =>
            {
                o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                o.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(o =>
            {
                o.TokenValidationParameters = new TokenValidationParameters
                {
                    IssuerSigningKey = new SymmetricSecurityKey("ForTheLoveOfGodStoreAndLoadThisSecurely"u8.ToArray()),
                    ValidIssuer = "https://localhost:5058",
                    ValidAudience = "https://localhost:5058",
                    ValidateAudience = true,
                    ValidateIssuer = true,
                    ValidateIssuerSigningKey = true,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };
            });

            // services.AddSession(o => 
            // {
            //     o.IdleTimeout = TimeSpan.FromMinutes(30);
            //     o.Cookie.HttpOnly = true;
            //     o.Cookie.IsEssential = true;
            // });

            services.AddAuthorization();


            return services;
        }
    }


}