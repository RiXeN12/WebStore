using webstore_back.DAL.Models.Identity;
using webstore_back.DAL.ViewModels;

namespace webstore_back.BLL.Services.JwtService
{
    public interface IJwtService
    {
        Task<ServiceResponse> GenerateTokensAsync(User user);
        Task<ServiceResponse> RefreshTokensAsync(JwtVM model);
    }
}
