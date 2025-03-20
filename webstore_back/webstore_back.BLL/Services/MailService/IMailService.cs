using MimeKit;
using webstore_back.DAL.Models.Identity;

namespace webstore_back.BLL.Services.MailService
{
    public interface IMailService
    {
        Task SendEmailAsync(string to, string subject, string text, bool isHtml = false);
        Task SendEmailAsync(IEnumerable<string> to, string subject, string message, bool isHtml = false);
        Task SendEmailAsync(MimeMessage message);
        Task SendConfirmEmailAsync(User user, string token);
    }
}
