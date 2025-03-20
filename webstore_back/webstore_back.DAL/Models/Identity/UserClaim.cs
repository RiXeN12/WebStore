using Microsoft.AspNetCore.Identity;

namespace webstore_back.DAL.Models.Identity
{
    public class UserClaim : IdentityUserClaim<string>
    {
        public virtual User User { get; set; }
    }
}
