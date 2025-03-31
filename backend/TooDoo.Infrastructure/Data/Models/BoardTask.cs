using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TooDoo.Infrastructure.Data.Models
{
    public class BoardTask
    {
        public string TaskId { get; set; } = string.Empty;
        [Required]
        [ForeignKey(nameof(TaskId))]
        public Task Task { get; set; } = null!;
        
        public string BoardId { get; set; } = string.Empty;
        [Required]
        [ForeignKey(nameof(BoardId))]
        public Board Board { get; set; } = null!;
    }
}