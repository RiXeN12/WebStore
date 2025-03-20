using Microsoft.AspNetCore.Identity;

namespace webstore_back.DAL.Models.Identity
{
    public class UserToken : IdentityUserToken<string>
    {
        public virtual User User { get; set; }
    }
}
