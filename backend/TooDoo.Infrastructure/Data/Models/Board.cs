using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TooDoo.Infrastructure.Data.Models
{
    public class Board
    {
        public Board()
        {
            Id = Guid.NewGuid().ToString();
        }        

        [Key]
        public string Id { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Name { get; set; } = string.Empty;

        public string? ImageUrl { get; set; } = string.Empty;

        public string? Description { get; set; } = string.Empty;

        public string WorkspaceId { get; set; } = string.Empty;
        [Required]
        [ForeignKey(nameof(WorkspaceId))]
        public virtual Workspace Workspace { get; set; } = null!;
    }
}