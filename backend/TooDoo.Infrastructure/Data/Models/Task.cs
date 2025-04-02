using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TooDoo.Infrastructure.Data.Enums;
using TaskStatus = TooDoo.Infrastructure.Data.Enums.TaskStatus;
using static TooDoo.Infrastructure.Data.Constants.DbConstants.TaskConstants;

namespace TooDoo.Infrastructure.Data.Models
{
    public class Task
    {
        public Task()
        {
            Id = Guid.NewGuid().ToString();
        }

        [Key]
        public string Id { get; set; } = string.Empty;

        [Required]
        [MaxLength(TitleMaxLength)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(DescriptionMaxLength)]
        public string Description { get; set; } = string.Empty;

        [Required]
        [DataType(DataType.Date)]
        public DateTime DueDate { get; set; }

        [Required]
        public TaskStatus Status { get; set; } = TaskStatus.TooDoo;

        [Required]
        public TaskPriority Priority { get; set; } = TaskPriority.Low;

        //? Statistic properties to be set by the system
        public bool IsCompleted { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? CompletedAt { get; set; } = null;

        public string UserId { get; set; } = string.Empty;
        [Required]
        [ForeignKey(nameof(UserId))]
        public User User { get; set; } = null!;

        public string? AssignedTo { get; set; }
        [ForeignKey(nameof(AssignedTo))]
        public User? AssignedUser { get; set; } = null!;

        public string BoardId { get; set; } = string.Empty;
        [Required]
        [ForeignKey(nameof(BoardId))]
        public Board Board { get; set; } = null!;
    }
}