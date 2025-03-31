using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using TooDoo.Infrastructure.Data.Enums;

namespace TooDoo.Infrastructure.Data.Models
{
    public class Members
    {
        public Members()
        {
            Id = Guid.NewGuid().ToString();
        }
        public string Id { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        [Required]
        public WorkspaceRole Role { get; set; } = WorkspaceRole.Member;
        public string WorkspaceId { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? DeletedAt { get; set; } = null;

        [Required]
        [ForeignKey(nameof(UserId))]
        public User User { get; set; } = null!;

        [Required]
        [ForeignKey(nameof(WorkspaceId))]
        public Workspace Workspace { get; set; } = null!;
    }
}