using webstore_back.DAL.Models.ProductManagement;
using webstore_back.DAL.Repositories.Common;

namespace webstore_back.DAL.Repositories.CategoryRepository
{
    public interface ICategoryRepository : IRepository<Category, string>
    {
        Task<Category?> GetByNameAsync(string name);
    }
}
