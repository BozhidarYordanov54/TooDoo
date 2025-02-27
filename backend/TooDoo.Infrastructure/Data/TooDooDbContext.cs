using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TooDoo.Infrastructure.Data.Models;

namespace TooDoo.Infrastructure.Data
{
    public class TooDooDbContext : IdentityDbContext<User>
    {
        public TooDooDbContext(DbContextOptions<TooDooDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

    }
}