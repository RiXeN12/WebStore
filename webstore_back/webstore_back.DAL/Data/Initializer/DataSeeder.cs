using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using webstore_back.DAL.Models.Identity;
using webstore_back.DAL.Models.ProductManagement;
using webstore_back.DAL.Repositories.ManufacturerRepository;

namespace webstore_back.DAL.Data.Initializer
{
    public static class DataSeeder
    {
        public static async void SeedData(this IApplicationBuilder builder)
        {
            using (var scope = builder.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
                var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<Role>>();
                var manufacturerManager = scope.ServiceProvider.GetRequiredService<IManufacturerRepository>();
                var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                await context.Database.MigrateAsync();

                if(!roleManager.Roles.Any())
                {
                    var adminRole = new Role
                    {
                        Id = Guid.NewGuid().ToString(),
                        Name = Settings.AdminRole
                    };

                    var userRole = new Role
                    {
                        Id = Guid.NewGuid().ToString(),
                        Name = Settings.UserRole
                    };

                    await roleManager.CreateAsync(adminRole);
                    await roleManager.CreateAsync(userRole);
                }

                if(!userManager.Users.Any())
                {
                    var admin = new User
                    {
                        Id = Guid.NewGuid().ToString(),
                        Email = "admin@gmail.com",
                        UserName = "admin",
                        EmailConfirmed = true,
                        FirstName = "Admin",
                        LastName = "Dashboard"
                    };

                    var user = new User
                    {
                        Id = Guid.NewGuid().ToString(),
                        Email = "user@gmail.com",
                        UserName = "user",
                        EmailConfirmed = true,
                        FirstName = "User",
                        LastName = "Dashboard"
                    };

                    await userManager.CreateAsync(admin, "qwerty");
                    await userManager.CreateAsync(user, "qwerty");

                    await userManager.AddToRoleAsync(admin, Settings.AdminRole);
                    await userManager.AddToRoleAsync(user, Settings.UserRole);
                }

                if (!(await manufacturerManager.GetAllAsync()).Any())
                {
                    var manufacturer = new Manufacturer()
                    {
                        Name = "Nike"
                    };
                    
                    await manufacturerManager.CreateAsync(manufacturer);
                }
            }
        }
    }
}
