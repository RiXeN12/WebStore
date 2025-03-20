using webstore_back.DAL.Models.ProductManagement;
using webstore_back.DAL.Repositories.Common;

namespace webstore_back.DAL.Repositories.ClothingItemRepository
{
    public interface IClothingItemRepository : IRepository<ClothingItem, string>
    {
        Task<List<ClothingItem?>?> GetByNameAsync(string name);
        Task<List<ClothingItem?>?> GetByManufacturerIdAsync(string manufacturerId);
        Task<List<ClothingItem?>?> GetByManufacturerNameAsync(string manufacturerName);
        Task<List<ClothingItem?>?> GetByCategoryNameAsync(string categoryName);
        Task<List<ClothingItem?>?> GetByCategoryIdAsync(string categoryId);
    }
}