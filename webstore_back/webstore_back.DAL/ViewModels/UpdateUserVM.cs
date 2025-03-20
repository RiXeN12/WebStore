namespace webstore_back.DAL.ViewModels;

public class UpdateUserVM
{
    public required string Id { get; set; }
    public  string? UserName { get; set; }
    public  string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Role { get; set; }
}