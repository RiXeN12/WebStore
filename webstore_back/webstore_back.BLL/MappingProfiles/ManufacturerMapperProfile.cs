using AutoMapper;
using webstore_back.BLL.Services.ManufacturerService;
using webstore_back.DAL.Models.Identity;
using webstore_back.DAL.Models.ProductManagement;
using webstore_back.DAL.ViewModels;
using webstore_back.DAL.ViewModels.ProductManagementVMs;
using webstore_back.DAL.ViewModels.ProductManagementVMs.Manufacturer;


namespace webstore_back.BLL.MappingProfiles
{
    public class ManufacturerMapperProfile : Profile
    {
        public ManufacturerMapperProfile() 
        {
            CreateMap<Manufacturer, ManufacturerVM>().ReverseMap();
            CreateMap<Manufacturer, CreateManufacturerVM>().ReverseMap();
        }
    }
}
