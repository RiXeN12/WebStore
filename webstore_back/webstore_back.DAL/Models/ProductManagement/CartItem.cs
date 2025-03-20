using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using culinary_tour.Core.Entities;
using webstore_back.DAL.Models.Identity;

namespace webstore_back.DAL.Models.ProductManagement
{
    public class CartItem : IEntity<string>
    {
        [Key]
        public required string Id { get; set; } = Guid.NewGuid().ToString();
        public required int Quantity { get; set; }
        public bool IsFinished { get; private set; } = false;

        [ForeignKey("User")]
        public string UserId { get; set; }
        public User User { get; set; }

        [ForeignKey("Product")]
        public string ClothingItemId { get; set; }
        public ClothingItem ClothingItem { get; set; }

        [ForeignKey("Order")]
        public string OrderId { get; set; }
        public Order Order { get; set; }
        
        public string Size { get; set; }
    }
}
