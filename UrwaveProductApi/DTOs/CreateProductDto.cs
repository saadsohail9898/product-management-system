using System.ComponentModel.DataAnnotations;

namespace UrwaveProductApi.DTOs
{
    public class CreateProductDto
    {
        [Required, MaxLength(100)]
        public string Name { get; set; }

        [Required, MaxLength(500)]
        public string Description { get; set; }

        [Required, Range(0.01, double.MaxValue)]
        public decimal Price { get; set; }
        public string? ImageUrl { get; set; }

    }
}
