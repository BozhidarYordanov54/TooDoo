using System.ComponentModel.DataAnnotations;

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
    }
}