using AutoMapper;
using webstore_back.DAL.Models.Identity;
using webstore_back.DAL.ViewModels;

namespace webstore_back.BLL.MappingProfiles
{
    public class UserMapperProfile : Profile
    {
        public UserMapperProfile() 
        {
            // User -> UserVM
            CreateMap<User, UserVM>()
                .ForMember(dest => dest.Role, opt => opt.MapFrom(
                    src => src.UserRoles.Count > 0 ? src.UserRoles.First().Role.Name : "no role"))
                .ForMember(dest => dest.Image, opt => opt.MapFrom(src => string.IsNullOrEmpty(src.Image) ? "avatar.png" : src.Image));

            // CreateUserVM -> User
            CreateMap<CreateUserVM, User>()
                .ForMember(dest => dest.Id, opt => opt.Ignore());
            
            // UpdateUserVM -> User
            CreateMap<UpdateUserVM, User>().ReverseMap();
        }
    }
}
