using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using culinary_tour.Core.Entities;

namespace webstore_back.DAL.Models.ProductManagement
{
    public class Category: IEntity<string>
    {
        [Key]
        public required string Id { get; set; } = Guid.NewGuid().ToString();

        [MaxLength(50)]
        public required string Name { get; set; }
        
        public string? Description { get; set; }
    }
}
