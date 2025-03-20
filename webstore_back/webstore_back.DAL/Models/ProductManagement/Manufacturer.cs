using System.ComponentModel.DataAnnotations;
using culinary_tour.Core.Entities;

namespace webstore_back.DAL.Models.ProductManagement
{
    public class Manufacturer : IEntity<string>
    {
        [Key] public string Id { get; set; } = Guid.NewGuid().ToString();
        [MaxLength(50)] public required string Name { get; set; }
        //[Range(0, 10)] public int Rating { get; set; } = 0;
    }
}