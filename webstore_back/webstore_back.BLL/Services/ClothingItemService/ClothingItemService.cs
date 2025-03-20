using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using webstore_back.BLL.Services.ImageService;
using webstore_back.DAL;
using webstore_back.DAL.Models.ProductManagement;
using webstore_back.DAL.Repositories.CategoryRepository;
using webstore_back.DAL.Repositories.ClothingItemRepository;
using webstore_back.DAL.Repositories.ManufacturerRepository;
using webstore_back.DAL.ViewModels.ProductManagementVMs.ClothingItem;

namespace webstore_back.BLL.Services.ClothingItemService
{
    public class ClothingItemService : IClothingItemService
    {
        private readonly IClothingItemRepository _productRepository;
        private readonly IManufacturerRepository _manufacturerRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;
        private readonly IImageService _imageService;

        public ClothingItemService(IClothingItemRepository productRepository,
            IManufacturerRepository manufacturerRepository, ICategoryRepository categoryRepository, IMapper mapper,
            IImageService imageService)
        {
            _productRepository = productRepository;
            _manufacturerRepository = manufacturerRepository;
            _categoryRepository = categoryRepository;
            _mapper = mapper;
            _imageService = imageService;
        }

        public async Task<ServiceResponse> GetByIdAsync(string id)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product == null)
            {
                return ServiceResponse.BadRequestResponse("Товар не знайдено.");
            }

            return ServiceResponse.OkResponse("Товар отримано.", product);
        }

        public async Task<ServiceResponse> GetByNameAsync(string name)
        {
            var products = await _productRepository.GetByNameAsync(name);
            if (products == null)
            {
                return ServiceResponse.BadRequestResponse("Товар не знайдено.");
            }

            return ServiceResponse.OkResponse("Товар отримано.", products);
        }

        public async Task<ServiceResponse> GetByManufacturerIdAsync(string manufacturerId)
        {
            var products = await _productRepository.GetByManufacturerIdAsync(manufacturerId);
            if (products == null)
            {
                return ServiceResponse.BadRequestResponse("Товар не знайдено.");
            }

            return ServiceResponse.OkResponse("Товар отримано.", products);
        }

        public async Task<ServiceResponse> GetByManufacturerNameAsync(string manufacturerName)
        {
            var products = await _productRepository.GetByManufacturerNameAsync(manufacturerName);
            if (products == null)
            {
                return ServiceResponse.BadRequestResponse("Товар не знайдено.");
            }

            return ServiceResponse.OkResponse("Товар отримано.", products);
        }

        public async Task<ServiceResponse> CreateProductAsync(CreateClothingItemVM model)
        {
            var manufacturer = await _manufacturerRepository.GetByIdAsync(model.ManufacturerId);
            var category = await _categoryRepository.GetByIdAsync(model.CategoryId);

            if (category != null && manufacturer != null)
            {
                var product = _mapper.Map<ClothingItem>(model);

                if (model.ImageFile != null)
                {
                    var imageSaveResult = await _imageService.SaveImageFromFileAsync(Settings.ProductImagesPath, model.ImageFile);
                    if (!imageSaveResult.Success)
                    {
                        return ServiceResponse.BadRequestResponse("Помилка при збереженні зображення.");
                    }

                    var imageEntity = (string)imageSaveResult.Payload!;
                    product.Images.Add(new ClothingItemImage { ClothingItemId = product.Id, FilePath = imageEntity });
                }
                var createdProduct = await _productRepository.CreateAsync(product);

                return ServiceResponse.OkResponse("Товар створено", createdProduct);
            }

            return ServiceResponse.BadRequestResponse("Товар не створено");
        }

        public async Task<ServiceResponse> GetAllAsync()
        {
            var products = (await _productRepository.GetAllAsync()).ToList();
            return ServiceResponse.OkResponse("Товар отримано", products);
        }


        public async Task<ServiceResponse> DeleteProductAsync(string id)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product == null)
            {
                return ServiceResponse.BadRequestResponse("Не знайдено товару");
            }

            var deleteImageTasks = product.Images
                .Select(x => _imageService.DeleteImageAsync(Settings.ProductImagesPath, x.FilePath));

            await Task.WhenAll(deleteImageTasks);

            var deletedProduct = await _productRepository.DeleteAsync(id);
    
            return ServiceResponse.OkResponse("Товар видалено", deletedProduct);
        }


        public async Task<ServiceResponse> GetByCategoryNameAsync(string categoryName)
        {
            var products = await _productRepository.GetByCategoryNameAsync(categoryName);
            if (products != null)
            {
                return ServiceResponse.OkResponse("Отримано товар за ім'ям категорії", products);
            }

            return ServiceResponse.BadRequestResponse("Не отримано товару");
        }

        public async Task<ServiceResponse> GetByCategoryIdAsync(string categoryId)
        {
            var products = await _productRepository.GetByCategoryIdAsync(categoryId);
            if (products != null)
            {
                return ServiceResponse.OkResponse("Отримано товар за ID категорії", products);
            }

            return ServiceResponse.BadRequestResponse("Не отримано товару");
        }
        // public async Task<ServiceResponse> UpdateProductAsync(ClothingItemVM model)
        // {
        //     var isProductExist = await _productRepository.GetByIdAsync(model.Id.ToString());
        //     if (isProductExist == null)
        //     {
        //         return ServiceResponse.BadRequestResponse("Товару не знайдено");
        //     }
        //     
        //     var manufacturer = await _manufacturerRepository.GetByIdAsync(model.ManufacturerId);
        //     if (manufacturer == null)
        //     {
        //         return ServiceResponse.BadRequestResponse("Інформацію не про товар оновлено. Виробника не знайдено.");
        //     }
        //     var category = await _categoryRepository.GetByIdAsync(model.CategoryId);
        //     if (category == null)
        //     {
        //         return ServiceResponse.BadRequestResponse("Інформацію не про товар оновлено. Категорію не знайдено.");
        //
        //     }
        //     
        //     var updatedProduct = await _productRepository.UpdateProductAsync(_mapper.Map<ClothingItem>(model));
        //
        //     return ServiceResponse.OkResponse("Інформацію про товар оновлено");
        // }

        public async Task<ServiceResponse> UpdateProductAsync(ClothingItemVM model)
        {
            var existingProduct = await _productRepository.GetByIdAsync(model.Id.ToString());
            if (existingProduct == null)
            {
                return ServiceResponse.BadRequestResponse("Товар не знайдено.");
            }

            existingProduct.Name = model.Name;
            existingProduct.Price = model.Price;
            existingProduct.Description = model.Description;
            existingProduct.StockQuantity = model.StockQuantity;
            existingProduct.ManufacturerId = model.ManufacturerId;
            existingProduct.CategoryId = model.CategoryId;

            await _productRepository.UpdateAsync(existingProduct);

            return ServiceResponse.OkResponse("Товар оновлено.", existingProduct);
        }

        public async Task<ServiceResponse> UploadImagesAsync(string productId, IFormFileCollection imagesFiles)
        {
            var product = await _productRepository.GetByIdAsync(productId);
            if (product == null)
            {
                return ServiceResponse.BadRequestResponse("Товар не знайдено.");
            }

            var imageSaveResult = await _imageService.SaveImagesFromFilesAsync(Settings.ProductImagesPath, imagesFiles);
            if (!imageSaveResult.Success)
            {
                return ServiceResponse.BadRequestResponse("Помилка при збереженні зображень.");
            }

            var imagesEntities = (List<string>)imageSaveResult.Payload!;

            product.Images.AddRange(imagesEntities.Select(imageName =>
                    new ClothingItemImage
                    {
                        ClothingItemId = productId,
                        FilePath = imageName
                    })
                .ToList());

            await _productRepository.UpdateAsync(product);

            return ServiceResponse.OkResponse("Зображення завантажено.", product);
        }

        public async Task<ServiceResponse> DeleteImageAsync(string productId, string imageId)
        {
            var product = await _productRepository.GetByIdAsync(productId.ToString());
            if (product == null)
            {
                return ServiceResponse.BadRequestResponse("Товар не знайдено.");
            }

            var image = product.Images.FirstOrDefault(x => x.Id == imageId);
            if (image == null)
            {
                return ServiceResponse.BadRequestResponse("Зображення не знайдено.");
            }

            var deleteResult = await _imageService.DeleteImageAsync(Settings.ProductImagesPath, image.FilePath);
            if (!deleteResult.Success)
            {
                return ServiceResponse.BadRequestResponse("Помилка при видаленні зображення.");
            }

            if (image != null)
            {
                product.Images.Remove(image);
            }

            await _productRepository.UpdateAsync(product);

            return ServiceResponse.OkResponse("Зображення видалено.", product);
        }
    }
}