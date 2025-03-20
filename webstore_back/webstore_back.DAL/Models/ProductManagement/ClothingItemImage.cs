using System.ComponentModel.DataAnnotations.Schema;
using culinary_tour.Core.Entities;

namespace webstore_back.DAL.Models.ProductManagement;

public class ClothingItemImage : IEntity<string>
{
    public string Id { get; set; } = Guid.NewGuid().ToString();

    [ForeignKey("ClothingItem")] public string ClothingItemId { get; set; }
    public string FilePath { get; set; }
}