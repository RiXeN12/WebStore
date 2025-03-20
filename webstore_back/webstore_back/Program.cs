using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using webstore_back.DAL.Repositories.RoleRepository;
using webstore_back.DAL.Repositories.UserRepository;
using webstore_back.DAL.Data.Initializer;
using webstore_back.DAL.Data;
using webstore_back.DAL;
using webstore_back.DAL.Models.Identity;
using webstore_back.BLL.Services.AccountService;
using webstore_back.BLL.Services.MailService;
using webstore_back.BLL.Services.JwtService;
using webstore_back.BLL.Services.RoleService;
using webstore_back.BLL.Middlewares;
using webstore_back.BLL.Services.CategoryService;
using webstore_back.BLL.Services.ClothingItemService;
using webstore_back.BLL.Services.ImageService;
using webstore_back.BLL.Services.UserService;
using webstore_back.DAL.Repositories.CategoryRepository;
using webstore_back.DAL.Repositories.ManufacturerRepository;
using webstore_back.BLL.Services.ManufacturerService;
using webstore_back.DAL.Repositories.ClothingItemRepository;
using webstore_back.DAL.Repositories.Common;

var builder = WebApplication.CreateBuilder(args);

// Add database context
builder.Services.AddDbContext<AppDbContext>(options =>
{
    // options.UseNpgsql("name=Default");
    options.UseNpgsql("name=DefaultLocal");
    // options.UseNpgsql("name=PostgreSqlUbuntu");
});

// Add CORS
var myAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myAllowSpecificOrigins, policy =>
    {
        policy.WithOrigins("http://localhost:5173")
        .AllowAnyMethod()
        .AllowAnyHeader();
    });
});
// Add identity
builder.Services.AddIdentity<User, Role>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = Settings.PasswordLength;
    options.Password.RequiredUniqueChars = 1;
})
    .AddDefaultTokenProviders()
    .AddEntityFrameworkStores<AppDbContext>();

// Add authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            RequireExpirationTime = true,
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["AuthSettings:key"])),
            ValidIssuer = builder.Configuration["AuthSettings:issuer"],
            ValidAudience = builder.Configuration["AuthSettings:audience"]
        };
    });

// Add services
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IMailService, MailService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IManufacturerService, ManufacturerService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IImageService, ImageService>();
builder.Services.AddScoped<IClothingItemService, ClothingItemService>();

// Add repositories
builder.Services.AddScoped(typeof(IRepository<,>), typeof(Repository<,>));
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();
builder.Services.AddScoped<IClothingItemRepository, ClothingItemRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IManufacturerRepository, ManufacturerRepository>();

// Add automapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(optinons =>
{
    optinons.SwaggerDoc("v1", new OpenApiInfo { Title = "NPR321", Version = "v1" });

    optinons.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Ââåä³òü JWT òîêåí"
    });

    optinons.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            //new []{ Settings.AdminRole, Settings.UserRole }
            Array.Empty<string>()
        }
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

app.UseSwagger();
app.UseSwaggerUI();

app.UseMiddleware<MiddlewareExceptionHandling>();
app.UseMiddleware<MiddlewareSecurityTokenExceptionHandling>();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors(myAllowSpecificOrigins);

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(builder.Environment.WebRootPath, "templates")),
    RequestPath = "/files"
});

if(!File.Exists(Path.Combine(builder.Environment.WebRootPath, "images")))
{
    Directory.CreateDirectory(Path.Combine(builder.Environment.WebRootPath, "images"));
}

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(builder.Environment.WebRootPath, "images")),
    RequestPath = "/images"
});

app.MapControllers();

app.SeedData();

app.Run();