using Microsoft.AspNetCore.Identity;

namespace webstore_back.DAL.Models.Identity
{
    public class UserLogin : IdentityUserLogin<string>
    {
        public virtual User User { get; set; }
    }
}
