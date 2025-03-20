using AutoMapper;
using webstore_back.DAL.Models.ProductManagement;
using webstore_back.DAL.ViewModels.ProductManagementVMs;
using webstore_back.DAL.ViewModels.ProductManagementVMs.ClothingItem;
using webstore_back.DAL.ViewModels.ProductManagementVMs.Manufacturer;


namespace webstore_back.BLL.MappingProfiles
{
    public class ClothingItemMapperProfile : Profile
    {
        public ClothingItemMapperProfile()
        {
            // CreateMap<ClothingItem, ClothingItemVM>()
            //     .ForMember(dest => dest.CategoryId, opt => opt.MapFrom(src => src.Category.Name ?? ""))
            //     .ForMember(dest => dest.ManufacturerId, opt => opt.MapFrom(src => src.Manufacturer.Name ?? ""));
            CreateMap<ClothingItem, ClothingItemVM>().ReverseMap();
            CreateMap<ClothingItem, CreateClothingItemVM>().ReverseMap();
        }
    }
}
