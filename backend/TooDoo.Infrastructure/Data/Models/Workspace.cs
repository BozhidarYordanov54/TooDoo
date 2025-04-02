using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TooDoo.Infrastructure.Data.Models
{
    public class Workspace
    {
        public Workspace()
        {
            Id = Guid.NewGuid().ToString();
        }

        [Key]
        public string Id { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        [Comment("The name of the workspace.")]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(500)]
        [Comment("A brief description of the workspace.")]
        public string? Description { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? DeletedAt { get; set; } = null;
        public bool IsDeleted { get; set; } = false;

        public string? OwnerId { get; set; } = string.Empty;
        [Required]
        [ForeignKey(nameof(OwnerId))]
        [Comment("The user who owns the workspace.")]
        public User? Owner { get; set; } = null!;
        public List<Board> Boards { get; set; } = new List<Board>();
        public List<WorkspaceMembers> Members { get; set; } = new List<WorkspaceMembers>();
    }
}