using Microsoft.AspNetCore.Http;
using webstore_back.DAL.Models.ProductManagement;
using webstore_back.DAL.Repositories.Common;
using webstore_back.DAL.ViewModels.ProductManagementVMs.ClothingItem;

namespace webstore_back.BLL.Services.ClothingItemService
{
    public interface IClothingItemService
    {
        Task<ServiceResponse> GetByIdAsync(string id);
        Task<ServiceResponse> GetByNameAsync(string name);
        Task<ServiceResponse> GetByManufacturerIdAsync(string manufacturerId);
        Task<ServiceResponse> GetByManufacturerNameAsync(string manufacturerName);
        Task<ServiceResponse> CreateProductAsync(CreateClothingItemVM model);
        Task<ServiceResponse> GetAllAsync();
        Task<ServiceResponse> DeleteProductAsync(string id);
        Task<ServiceResponse> GetByCategoryNameAsync(string categoryName);
        Task<ServiceResponse> GetByCategoryIdAsync(string categoryId);
        Task<ServiceResponse> UpdateProductAsync(ClothingItemVM model);
        Task<ServiceResponse> UploadImagesAsync(string productId, IFormFileCollection imagesFiles);
        Task<ServiceResponse> DeleteImageAsync(string productId, string imageId);
    }
}
