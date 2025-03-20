using Microsoft.EntityFrameworkCore;
using webstore_back.DAL.Data;
using webstore_back.DAL.Models.ProductManagement;
using webstore_back.DAL.Repositories.Common;

namespace webstore_back.DAL.Repositories.ClothingItemRepository
{
    public class ClothingItemRepository : Repository<ClothingItem, string>, IClothingItemRepository
    {
        public ClothingItemRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }

        public async override Task<IEnumerable<ClothingItem>> GetAllAsync()
        {
            return _appDbContext.ClothingItems
                .Include(c => c.Images)
                .Include(c => c.Manufacturer)
                .Include(c => c.Category);
        }

        public override async Task<ClothingItem?> GetByIdAsync(string id)
        {
            return await _appDbContext.ClothingItems
                .Include(c => c.Images)
                .Include(c => c.Manufacturer)
                .Include(c => c.Category)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<List<ClothingItem>> GetByNameAsync(string name)
        {
            return await _appDbContext.ClothingItems.Include(c => c.Images).Where(p => p.Name.Contains(name)).ToListAsync();
        }

        public async Task<List<ClothingItem>> GetByManufacturerIdAsync(string manufacturerId)
        {
            return await _appDbContext.ClothingItems.Include(c => c.Images).Where(p => p.ManufacturerId == manufacturerId).ToListAsync();
        }

        public async Task<List<ClothingItem>> GetByManufacturerNameAsync(string manufacturerName)
        {
            return await _appDbContext.ClothingItems.Include(c => c.Images).Where(p => p.Manufacturer.Name.Contains(manufacturerName))
                .ToListAsync();
        }

        public async Task<ClothingItem> CreateProductAsync(ClothingItem product)
        {
            await _appDbContext.ClothingItems.AddAsync(product);
            await _appDbContext.SaveChangesAsync();
            return product;
        }

        public async Task<List<ClothingItem>> GetByCategoryNameAsync(string categoryName)
        {
            return await _appDbContext.ClothingItems.Include(c => c.Images).Where(p => p.Category.Name == categoryName).ToListAsync();
        }

        public async Task<List<ClothingItem>> GetByCategoryIdAsync(string categoryId)
        {
            return await _appDbContext.ClothingItems.Include(c => c.Images).Where(p => p.CategoryId == categoryId).ToListAsync();
        }
    }
}