using System.ComponentModel.DataAnnotations.Schema;

namespace TooDoo.Infrastructure.Data.Models
{
    public class WorkspaceMembers
    {
        public string MemberId { get; set; } = string.Empty;
        [ForeignKey(nameof(MemberId))]
        public Member Member { get; set; } = null!;

        public string WorkspaceId { get; set; } = string.Empty;
        [ForeignKey(nameof(WorkspaceId))]
        public Workspace Workspace { get; set; } = null!;
    }
}