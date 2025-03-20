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
    public class Order : IEntity<string>
    {
        [Key] public required string Id { get; set; } = Guid.NewGuid().ToString();
        public required double TotalPrice { get; set; }
        public required bool isCompleted { get; set; }

        [ForeignKey("User")] public string UserId { get; set; }
        public User User { get; set; }
    }
}