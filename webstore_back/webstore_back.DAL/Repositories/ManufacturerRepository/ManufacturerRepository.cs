using Microsoft.EntityFrameworkCore;
using webstore_back.DAL.Data;
using webstore_back.DAL.Models.ProductManagement;
using webstore_back.DAL.Repositories.Common;

namespace webstore_back.DAL.Repositories.ManufacturerRepository
{
    public class ManufacturerRepository : Repository<Manufacturer, string>, IManufacturerRepository
    {
        public ManufacturerRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }

        public async Task<Manufacturer?> GetByNameAsync(string name)
        {
            return await _appDbContext.Manufacturers.FirstOrDefaultAsync(m => m.Name == name);
        }

        // public async Task<Manufacturer> LoadClothingAsync(Manufacturer manufacturer)
        // {
        //     await _appDbContext
        //         .Entry(manufacturer)
        //         .Collection(m => m.ClothingItems)
        //         .Query()
        //         .Include(c => c.Category)
        //         .LoadAsync();
        //
        //     return manufacturer;
        // }
    }
}