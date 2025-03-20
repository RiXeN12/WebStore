using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using webstore_back.DAL.Models.Identity;

namespace webstore_back.DAL.Repositories.RoleRepository
{
    public class RoleRepository : IRoleRepository
    {
        private readonly RoleManager<Role> _roleManager;

        public RoleRepository(RoleManager<Role> roleManager)
        {
            _roleManager = roleManager;
        }

        public async Task<IdentityResult> CreateAsync(Role model)
        {
            var result = await _roleManager.CreateAsync(model);
            return result;
        }

        public async Task<IdentityResult> DeleteAsync(Role model)
        {
            var result = await _roleManager.DeleteAsync(model);
            return result;
        }

        public async Task<List<Role>> GetAllAsync()
        {
            return await _roleManager.Roles.ToListAsync();
        }

        public async Task<Role?> GetAsync(Expression<Func<Role, bool>> predicate)
        {
            var role = await _roleManager.Roles.FirstOrDefaultAsync(predicate);
            return role;
        }

        public async Task<Role?> GetByIdAsync(string id)
        {
            return await GetAsync(r => r.Id == id);
        }

        public async Task<Role?> GetByNameAsync(string name)
        {
            return await GetAsync(r => r.NormalizedName == name.ToUpper());
        }

        public async Task<bool> IsUniqueNameAsync(string name)
        {
            return await GetByNameAsync(name) == null;
        }

        public async Task<IdentityResult> UpdateAsync(Role model)
        {
            var result = await _roleManager.UpdateAsync(model);
            return result;
        }
    }
}
