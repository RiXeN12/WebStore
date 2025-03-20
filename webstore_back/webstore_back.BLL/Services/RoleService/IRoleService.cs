using webstore_back.BLL.Services;
using webstore_back.DAL.ViewModels;

namespace webstore_back.BLL.Services.RoleService
{
    public interface IRoleService
    {
        Task<ServiceResponse> GetAllAsync();
        Task<ServiceResponse> GetByIdAsync(string id);
        Task<ServiceResponse> GetByNameAsync(string name);
        Task<ServiceResponse> DeleteAsync(string id);
        Task<ServiceResponse> CreateAsync(RoleVM model);
        Task<ServiceResponse> UpdateAsync(RoleVM model);
    }
}
