using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TooDoo.Infrastructure.Data.Models;
using Task = TooDoo.Infrastructure.Data.Models.Task;

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
            builder.Entity<BoardTask>()
                .HasKey(bt => new { bt.TaskId, bt.BoardId });

            base.OnModelCreating(builder);
        }

        public DbSet<Task> Tasks { get; set; } = null!;
        public DbSet<Board> Boards { get; set; } = null!;
        public DbSet<BoardTask> BoardTasks { get; set; } = null!;
        

    }
}