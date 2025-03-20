using AutoMapper;
using webstore_back.DAL.Models.Identity;
using webstore_back.DAL.ViewModels;

namespace webstore_back.BLL.MappingProfiles
{
    public class RoleMapperProfile : Profile
    {
        public RoleMapperProfile() 
        {
            // Role -> RoleVM
            CreateMap<Role, RoleVM>();

            // RoleVM -> Role
            CreateMap<RoleVM, Role>();
        }
    }
}
