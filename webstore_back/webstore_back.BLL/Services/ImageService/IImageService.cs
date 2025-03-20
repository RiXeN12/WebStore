using Microsoft.AspNetCore.Http;

namespace webstore_back.BLL.Services.ImageService
{
    public interface IImageService
    {
        Task<ServiceResponse> SaveImageFromFileAsync(string path, IFormFile image);
        Task<ServiceResponse> SaveImagesFromFilesAsync(string path, IFormFileCollection images);
        Task<ServiceResponse> DeleteImageAsync(string path, string imagePath);
    }
}
