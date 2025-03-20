using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using culinary_tour.Core.Entities;

namespace webstore_back.DAL.Models.ProductManagement
{
    public class ClothingItem : IEntity<string>
    {
        [Key] public required string Id { get; set; } = Guid.NewGuid().ToString();

        [MaxLength(50)] public required string Name { get; set; }

        public required double Price { get; set; }

        [MaxLength(80)] public string Description { get; set; }

        public int StockQuantity { get; set; }

        [ForeignKey("Manufacturer")] public string ManufacturerId { get; set; }
        public Manufacturer Manufacturer { get; set; }

        [ForeignKey("Category")] public string CategoryId { get; set; }
        public Category Category { get; set; }

        public List<ClothingItemImage> Images { get; private set; } = [];
    }
}