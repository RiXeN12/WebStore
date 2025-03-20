using Microsoft.AspNetCore.Identity;
using System.Linq.Expressions;
using webstore_back.DAL.Models.Identity;

namespace webstore_back.DAL.Repositories.UserRepository
{
    public interface IUserRepository
    {
        Task<User?> GetByIdAsync(string id, bool includes = false);
        Task<User?> GetByEmailAsync(string email, bool includes = false);
        Task<User?> GetByUsernameAsync(string userName, bool includes = false);
        Task<User?> GetUserAsync(Expression<Func<User, bool>> predicate, bool includes = false);
        Task<bool> CheckPasswordAsync(User user, string password);
        Task<bool> IsUniqueEmailAsync(string email);
        Task<bool> IsUniqueUserNameAsync(string userName);
        Task<string> GenerateEmailConfirmationTokenAsync(User user);
        Task<IdentityResult> ConfirmEmailAsync(User user, string token);
        Task<IdentityResult> CreateAsync(User user, string password);
        IQueryable<User> GetAll();
        Task<IdentityResult> UpdateAsync(User model);
        Task<IdentityResult> DeleteAsync(User model);
        Task<IdentityResult> AddToRoleAsync(User model, string role);
    }
}
