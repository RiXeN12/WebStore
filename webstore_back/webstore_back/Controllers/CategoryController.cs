using Microsoft.AspNetCore.Mvc;
using webstore_back.BLL.Services;
using webstore_back.BLL.Services.CategoryService;
using webstore_back.DAL.ViewModels.ProductManagementVMs.Category;

namespace webstore_back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : BaseController
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }
        
        [HttpGet("get-all")]
        public async Task<IActionResult> GetAllAsync()
        {
            var response = await _categoryService.GetAllAsync();
            return GetResult(response);
        }
        
        [HttpGet("get-by-id")]
        public async Task<IActionResult> GetByIdAsync(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest(ServiceResponse.BadRequestResponse("Id категорії не може бути порожнім"));
            }
            var response = await _categoryService.GetByIdAsync(id);
            if (response.Success)
            {
                return GetResult(response);
            }
            return BadRequest(ServiceResponse.BadRequestResponse("Категорію не знайдено."));
        }
        
        [HttpGet("get-by-name")]
        public async Task<IActionResult> GetByNameAsync(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return BadRequest(ServiceResponse.BadRequestResponse("Ім'я категорії не може бути порожнім"));
            }
            var response = await _categoryService.GetByNameAsync(name);
            if (response.Success)
            {
                return GetResult(response);
            }
            return BadRequest(ServiceResponse.BadRequestResponse("Категорію не знайдено."));
        }
        
        [HttpPost("create")]
        public async Task<IActionResult> CreateCategoryAsync(CreateCategoryVM model)
        {
            if (string.IsNullOrEmpty(model.Name))
            {
                return GetResult(ServiceResponse.BadRequestResponse("Name can't be empty."));
            }
            var response = await _categoryService.CreateCategoryAsync(model);
            return GetResult(response);
        }
        
        [HttpPut("update")]
        public async Task<IActionResult> UpdateCategoryAsync(CategoryVM model)
        {
            if (string.IsNullOrEmpty(model.Name))
            {
                return GetResult(ServiceResponse.BadRequestResponse("Name can't be empty."));
            }
            var response = await _categoryService.UpdateCategoryAsync(model);
            return GetResult(response);
        }
        
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteCategoryAsync(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest(ServiceResponse.BadRequestResponse("Id категорії не може бути порожнім"));
            }
            var response = await _categoryService.DeleteCategoryAsync(id);
            if (response.Success)
            {
                return GetResult(response);
            }
            return BadRequest(ServiceResponse.BadRequestResponse("Категорію не видалено."));
        }
    }
}
