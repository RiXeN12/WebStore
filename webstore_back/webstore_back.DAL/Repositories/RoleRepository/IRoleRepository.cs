using Microsoft.AspNetCore.Identity;
using System.Linq.Expressions;
using webstore_back.DAL.Models.Identity;

namespace webstore_back.DAL.Repositories.RoleRepository
{
    public interface IRoleRepository
    {
        Task<Role?> GetAsync(Expression<Func<Role, bool>> predicate);
        Task<Role?> GetByIdAsync(string id);
        Task<Role?> GetByNameAsync(string name);
        Task<List<Role?>?> GetAllAsync();
        Task<IdentityResult> UpdateAsync(Role model);
        Task<IdentityResult> CreateAsync(Role model);
        Task<IdentityResult> DeleteAsync(Role model);
        Task<bool> IsUniqueNameAsync(string name);
    }
}
