using System.ComponentModel.DataAnnotations;

namespace UrwaveProductApi.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public required string Name { get; set; }

        [Required, MaxLength(500)]
        public required string Description { get; set; }

        [Required, Range(0.01, double.MaxValue)]
        public decimal Price { get; set; }

        public string? ImageUrl { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }
}
