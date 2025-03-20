using Microsoft.EntityFrameworkCore;
using webstore_back.DAL.Data;
using webstore_back.DAL.Models.ProductManagement;
using webstore_back.DAL.Repositories.Common;

namespace webstore_back.DAL.Repositories.CategoryRepository
{
    public class CategoryRepository : Repository<Category, string>, ICategoryRepository
    {

        public CategoryRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }

        public async Task<Category?> GetByNameAsync(string name)
        {
            return await _appDbContext.Categories.FirstOrDefaultAsync(c => c.Name == name);
        }
    }
}