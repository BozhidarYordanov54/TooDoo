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
        public string? Description { get; set; } = string.Empty;
        public string? OwnerId { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? DeletedAt { get; set; } = null;
        public bool IsDeleted { get; set; } = false;
        public User? Owner { get; set; } = null!;
        public List<Board> Boards { get; set; } = new List<Board>();
        public List<WorkspaceMembers> Members { get; set; } = new List<WorkspaceMembers>();
    }
}