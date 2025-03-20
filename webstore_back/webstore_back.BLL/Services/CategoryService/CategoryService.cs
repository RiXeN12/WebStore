using AutoMapper;
using Microsoft.EntityFrameworkCore;
using webstore_back.DAL.Models.ProductManagement;
using webstore_back.DAL.Repositories.CategoryRepository;
using webstore_back.DAL.ViewModels.ProductManagementVMs;
using webstore_back.DAL.ViewModels.ProductManagementVMs.Category;

namespace webstore_back.BLL.Services.CategoryService
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public CategoryService(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        public async Task<ServiceResponse> GetByIdAsync(string id)
        {
            var category = await _categoryRepository.GetByIdAsync(id);
            if (category == null)
            {
                return ServiceResponse.BadRequestResponse("Категорію не знайдено", null);
            }
            return ServiceResponse.OkResponse("Категорію отримано", category);
        }

        public async Task<ServiceResponse> GetByNameAsync(string name)
        {
            var category = await _categoryRepository.GetByNameAsync(name);
            if (category == null)
            {
                return ServiceResponse.BadRequestResponse("Категорію не знайдено", null);
            }
            return ServiceResponse.OkResponse("Категорію отримано", category);
        }

        public async Task<ServiceResponse> CreateCategoryAsync(CreateCategoryVM model)
        {
            var category = _mapper.Map<Category>(model);
            
            await _categoryRepository.CreateAsync(category);
            var categoryAdded = _mapper.Map<CategoryVM>(category);
            return ServiceResponse.OkResponse("Категорію створено", categoryAdded);
        }

        public async Task<ServiceResponse> GetAllAsync()
        {
            var categories = (await _categoryRepository.GetAllAsync()).ToList();
            return ServiceResponse.OkResponse("Категорії отримано", categories);
        }

        public async Task<ServiceResponse> UpdateCategoryAsync(CategoryVM model)
        {
            if (model == null)
            {
                return ServiceResponse.BadRequestResponse("Категорію не оновлено", null);
            }
            
            var category = _mapper.Map<Category>(model);
            await _categoryRepository.UpdateAsync(category);
            var updatedCategory = _mapper.Map<CategoryVM>(category);

            return ServiceResponse.OkResponse("Категорію оновлено", updatedCategory);
        }

        public async Task<ServiceResponse> DeleteCategoryAsync(string id)
        {
            var deletedCategory = await _categoryRepository.DeleteAsync(id);
            if (deletedCategory == null)
            {
                return ServiceResponse.BadRequestResponse("Категорію не видалено", null);
            }
            return ServiceResponse.OkResponse("Категорію видалено", deletedCategory);
        }

        // public async Task<ServiceResponse> GetCategoryClothingItemsById(string id)
        // {
        //     var category = await _categoryRepository.GetCategoryClothingItemsById(id);
        //     if (category == null)
        //     {
        //         return ServiceResponse.BadRequestResponse("Категорію не знайдено", null);
        //     }
        //     return ServiceResponse.OkResponse("Категорію отримано", category);
        // }
    }
}
