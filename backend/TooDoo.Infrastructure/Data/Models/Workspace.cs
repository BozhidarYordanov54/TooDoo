namespace TooDoo.Infrastructure.Data.Models
{
    public class Workspace
    {
        public Workspace()
        {
            Id = Guid.NewGuid().ToString();
        }

        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string? ImageUrl { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public string? OwnerId { get; set; } = string.Empty;
        public User? Owner { get; set; } = null!;
    }
}