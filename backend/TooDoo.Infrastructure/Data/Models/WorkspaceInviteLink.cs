using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TooDoo.Infrastructure.Data.Models
{
    public class WorkspaceInviteLink
    {
        public WorkspaceInviteLink()
        {
            Id = Guid.NewGuid().ToString();
            CreatedAt = DateTime.UtcNow;
        }

        [Key]
        public string Id { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Link { get; set; } = string.Empty;

        [Required]
        [Comment("The date and time when the invite link was created.")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Comment("The date and time when the invite link expires.")]
        public DateTime? ExpiresAt { get; set; }

        [Comment("The number of times the invite link has been used.")]
        public int Count { get; set; } = 0;

        [Comment("The workspace for which the link is valid.")]
        public string WorkspaceId { get; set; } = string.Empty;
        [Required]
        [ForeignKey(nameof(WorkspaceId))]
        public virtual Workspace Workspace { get; set; } = null!;
    }
}