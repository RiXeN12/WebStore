using Microsoft.AspNetCore.Mvc;
using webstore_back.BLL.Services;
using webstore_back.BLL.Services.ClothingItemService;
using webstore_back.BLL.Validators.ClothingItem;
using webstore_back.DAL.ViewModels.ProductManagementVMs.ClothingItem;

namespace webstore_back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClothingItemController : BaseController
    {
        private readonly IClothingItemService _clothingItemService;
        public ClothingItemController(IClothingItemService clothingItemService)
        {
            _clothingItemService = clothingItemService;
        }
        
        [HttpGet("get-all")]
        public async Task<IActionResult> GetAllAsync()
        {
            var response = await _clothingItemService.GetAllAsync();
            return GetResult(response);
        }
        
        [HttpGet("get-by-id")]
        public async Task<IActionResult> GetByIdAsync(string id)
        {
            if (string.IsNullOrEmpty(id)) {
                return BadRequest(ServiceResponse.BadRequestResponse("Id товару не може бути порожнім"));
            }
            var response = await _clothingItemService.GetByIdAsync(id);
            if (response.Success)
            {
                return GetResult(response);
            }
            return BadRequest(ServiceResponse.BadRequestResponse("Товар не знайдено."));

        }
        
        [HttpGet("get-by-name")]
        public async Task<IActionResult> GetByNameAsync(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return BadRequest(ServiceResponse.BadRequestResponse("Ім'я товару не може бути порожнім"));
            }
            var response = await _clothingItemService.GetByNameAsync(name);
            if (response.Success)
            {
                return GetResult(response);
            }
            return BadRequest(ServiceResponse.BadRequestResponse("Товар не знайдено."));

        }
        
        [HttpGet("get-by-manufacturer-id")]
        public async Task<IActionResult> GetByManufacturerIdAsync(string manufacturerId)
        {
            if (string.IsNullOrEmpty(manufacturerId))
            {
                return BadRequest(ServiceResponse.BadRequestResponse("Id виробника не може бути порожнім"));
            }
            var response = await _clothingItemService.GetByManufacturerIdAsync(manufacturerId);
            if (response.Success)
            {
                return GetResult(response);
            }
            return BadRequest(ServiceResponse.BadRequestResponse("Товар не знайдено."));
        }
        
        [HttpGet("get-by-manufacturer-name")]
        public async Task<IActionResult> GetByManufacturerNameAsync(string manufacturerName)
        {
            if (string.IsNullOrEmpty(manufacturerName))
            {
                return BadRequest(ServiceResponse.BadRequestResponse("Ім'я виробника не може бути порожнім"));
            }
            var response = await _clothingItemService.GetByManufacturerNameAsync(manufacturerName);
            if (response.Success)
            {
                return GetResult(response);
            }
            return BadRequest(ServiceResponse.BadRequestResponse("Товар не знайдено."));
        }
        
        [HttpGet("get-by-category-id")]
        public async Task<IActionResult> GetByCategoryIdAsync(string categoryId)
        {
            if (string.IsNullOrEmpty(categoryId))
            {
                return BadRequest(ServiceResponse.BadRequestResponse("Id категорії не може бути порожнім"));
            }
            var response = await _clothingItemService.GetByCategoryIdAsync(categoryId);
            if (response.Success)
            {
                return GetResult(response);
            }
            return BadRequest(ServiceResponse.BadRequestResponse("Товар не знайдено."));
        }
        
        [HttpGet("get-by-category-name")]
        public async Task<IActionResult> GetByCategoryNameAsync(string categoryName)
        {
            if (string.IsNullOrEmpty(categoryName))
            {
                return BadRequest(ServiceResponse.BadRequestResponse("Ім'я категорії не може бути порожнім"));
            }
            var response = await _clothingItemService.GetByCategoryNameAsync(categoryName);
            if (response.Success)
            {
                return GetResult(response);
            }
            return BadRequest(ServiceResponse.BadRequestResponse("Товар не знайдено."));
        }
        
        [HttpPost("create")]
        public async Task<IActionResult> CreateClothingItemASync(CreateClothingItemVM model)
        {
            var validator = new CreateClothingItemVMValidator();
            var validateResult = await validator.ValidateAsync(model);
            if(!validateResult.IsValid)
            {
                return GetResult(ServiceResponse.BadRequestResponse(validateResult.Errors.First().ErrorMessage));
            }
            var response = await _clothingItemService.CreateProductAsync(model);
            return GetResult(response);
        }
        
        [HttpPut("update")]
        public async Task<IActionResult> UpdateClothingItemAsync(ClothingItemVM model)
        {
            var validator = new UpdateClothingItemVMValidator();
            var validateResult = await validator.ValidateAsync(model);
            if (!validateResult.IsValid)
            {
                return GetResult(ServiceResponse.BadRequestResponse(validateResult.Errors.First().ErrorMessage));
            }
            var response = await _clothingItemService.UpdateProductAsync(model);
            return GetResult(response);
        }
        
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteProductAsync(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest(ServiceResponse.BadRequestResponse("Id товару не може бути порожнім"));
            }
            var response = await _clothingItemService.DeleteProductAsync(id);
            if (response.Success)
            {
                return GetResult(response);
            }
            return BadRequest(ServiceResponse.BadRequestResponse("Товар не видалено."));
        }
        
        [HttpPut("upload-images/{productId}")]
        public async Task<IActionResult> UploadImages(
            [FromRoute] string productId,
            [FromForm] IFormFileCollection imagesFiles)
        {
            var response = await _clothingItemService.UploadImagesAsync(productId, imagesFiles);
            return GetResult(response);
        }

        [HttpPut("delete-image/{productId}")]
        public async Task<IActionResult> DeleteImage(
            [FromRoute] string productId,
            [FromQuery] string imageId)
        {
            var response = await _clothingItemService.DeleteImageAsync(productId, imageId);
            return GetResult(response);
        }
    }
}
