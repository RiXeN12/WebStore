using AutoMapper;
using webstore_back.BLL.Services.CategoryService;
using webstore_back.DAL.Models.ProductManagement;
using webstore_back.DAL.ViewModels.ProductManagementVMs;
using webstore_back.DAL.ViewModels.ProductManagementVMs.Category;


namespace webstore_back.BLL.MappingProfiles
{
    public class CategoryMapperProfile : Profile
    {
        public CategoryMapperProfile()
        {
            CreateMap<Category, CategoryVM>().ReverseMap();
            CreateMap<Category, CreateCategoryVM>().ReverseMap();
        }
    }
}
