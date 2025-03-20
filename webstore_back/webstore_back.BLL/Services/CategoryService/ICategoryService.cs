using webstore_back.DAL.Models.ProductManagement;
using webstore_back.DAL.ViewModels.ProductManagementVMs;
using webstore_back.DAL.ViewModels.ProductManagementVMs.Category;

namespace webstore_back.BLL.Services.CategoryService
{
    public interface ICategoryService
    {
        Task<ServiceResponse> GetByIdAsync(string id);
        Task<ServiceResponse> GetByNameAsync(string name);
        Task<ServiceResponse> CreateCategoryAsync(CreateCategoryVM model);
        Task<ServiceResponse> GetAllAsync();
        Task<ServiceResponse> UpdateCategoryAsync(CategoryVM model);
        Task<ServiceResponse> DeleteCategoryAsync(string id);
       //Task<ServiceResponse> GetCategoryClothingItemsById(string id);
    }
}
