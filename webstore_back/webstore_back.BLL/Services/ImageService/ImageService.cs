using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace webstore_back.BLL.Services.ImageService
{
    public class ImageService : IImageService
    {
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ImageService(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<ServiceResponse> SaveImageFromFileAsync(string path, IFormFile image)
        {
            var types = image.ContentType.Split('/');

            if (types[0] != "image")
            {
                return ServiceResponse.BadRequestResponse("Файл не є картинкою");
            }

            var root = _webHostEnvironment.ContentRootPath;
            var imageName = $"{Guid.NewGuid()}.{types[1]}";
            var filePath = Path.Combine(root, path, imageName);

            using(var stream = File.OpenWrite(filePath))
            {
                using(var imageStream = image.OpenReadStream())
                {
                    await imageStream.CopyToAsync(stream);
                }
            }

            return ServiceResponse.OkResponse("Зображення успішно збережено", imageName);
        }

        public async Task<ServiceResponse> SaveImagesFromFilesAsync(string path, IFormFileCollection images)
        {
            try
            {
                var savedImageNames = new List<string>();
                var root = _webHostEnvironment.ContentRootPath;

                foreach (var image in images)
                {
                    var type = image.ContentType.Split('/');
                    if (type[0] != "image")
                    {
                        return ServiceResponse.BadRequestResponse("Файл не є картинкою");
                    }

                    var imageName = $"{Guid.NewGuid()}.{type[1]}";
                    var filePath = Path.Combine(root, path, imageName);

                    await using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await image.CopyToAsync(stream);
                    }

                    savedImageNames.Add(imageName);
                }

                return ServiceResponse.OkResponse("Зображення успішно збережено", savedImageNames);
            }
            catch (Exception)
            {
                return ServiceResponse.BadRequestResponse("Помилка при збереженні зображень");
            }
        }
        public async Task<ServiceResponse> DeleteImageAsync(string path, string imagePath)
        {
            try
            {
                var fullOldPath = Path.Combine(_webHostEnvironment.ContentRootPath, path, imagePath);
                if (File.Exists(fullOldPath))
                {
                    File.Delete(fullOldPath);
                }

                return ServiceResponse.OkResponse("Зображення видалено.", true);
            }
            catch (Exception e)
            {
                return ServiceResponse.BadRequestResponse("Помилка при видаленні.", false);
            }
        }
    }
}
