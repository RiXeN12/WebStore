using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using webstore_back.DAL.Models;
using webstore_back.DAL.Models.Identity;
using webstore_back.DAL.Models.ProductManagement;

namespace webstore_back.DAL.Data
{
    public class AppDbContext : IdentityDbContext<User, Role, string, UserClaim, UserRole, UserLogin, RoleClaim, UserToken>
    {
        public AppDbContext(DbContextOptions options)
            : base(options) { }

        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<ClothingItem> ClothingItems { get; set; }
        public DbSet<Manufacturer> Manufacturers { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>(b =>
            {
                // Each User can have many UserClaims
                b.HasMany(e => e.Claims)
                    .WithOne(e => e.User)
                    .HasForeignKey(uc => uc.UserId)
                    .IsRequired();

                // Each User can have many UserLogins
                b.HasMany(e => e.Logins)
                    .WithOne(e => e.User)
                    .HasForeignKey(ul => ul.UserId)
                    .IsRequired();

                // Each User can have many UserTokens
                b.HasMany(e => e.Tokens)
                    .WithOne(e => e.User)
                    .HasForeignKey(ut => ut.UserId)
                    .IsRequired();

                // Each User can have many entries in the UserRole join table
                b.HasMany(e => e.UserRoles)
                    .WithOne(e => e.User)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            });

            builder.Entity<Role>(b =>
            {
                // Each Role can have many entries in the UserRole join table
                b.HasMany(e => e.UserRoles)
                    .WithOne(e => e.Role)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                // Each Role can have many associated RoleClaims
                b.HasMany(e => e.RoleClaims)
                    .WithOne(e => e.Role)
                    .HasForeignKey(rc => rc.RoleId)
                    .IsRequired();
            });
            
            // builder.Entity<ClothingItemImage>(ci => ci.HasOne<ClothingItem>()
            //     .WithMany(x => x.Images)
            //     .HasForeignKey(x => x.ClothingItemId)
            //     .OnDelete(DeleteBehavior.Cascade));
            
            // builder.Entity<ClothingItem>(b => b.HasMany(ci => ci.Images)
            //     .WithOne()
            //     .HasForeignKey(img => img.ClothingItemId)
            //     .OnDelete(DeleteBehavior.Cascade));
        }
    }
}
