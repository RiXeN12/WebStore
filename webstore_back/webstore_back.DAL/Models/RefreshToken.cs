using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using culinary_tour.Core.Entities;
using webstore_back.DAL.Models.Identity;

namespace webstore_back.DAL.Models
{
    public class RefreshToken : IEntity<string>
    {
        [Key]
        public required string Id { get; set; }
        [Required]
        [MaxLength(450)]
        public required string Token { get; set; }
        [Required]
        [MaxLength(256)]
        public required string JwtId { get; set; }
        public bool IsUsed { get; set; } = false;
        public DateTime CreateDate { get; set; }
        public DateTime ExpiredDate { get; set; }

        [ForeignKey("User")]
        public required string UserId { get; set; }
        public User? User { get; set; }
    }
}
