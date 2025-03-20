using webstore_back.DAL.Models.ProductManagement;
using webstore_back.DAL.Repositories.Common;

namespace webstore_back.DAL.Repositories.ManufacturerRepository
{
    public interface IManufacturerRepository : IRepository<Manufacturer, string>
    {
        Task<Manufacturer?> GetByNameAsync (string name);
    }
}
