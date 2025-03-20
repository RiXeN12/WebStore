using Microsoft.AspNetCore.Http;

namespace webstore_back.DAL.ViewModels
{
    public class UserImageVM
    {
        public string UserId { get; set; }
        public IFormFile Image { get; set; }
    }
}
