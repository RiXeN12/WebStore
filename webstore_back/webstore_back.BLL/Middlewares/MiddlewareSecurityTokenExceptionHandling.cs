using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using System.Text.Json;
using webstore_back.BLL.Services;

namespace webstore_back.BLL.Middlewares
{
    public class MiddlewareSecurityTokenExceptionHandling
    {
        private readonly RequestDelegate _next;

        public MiddlewareSecurityTokenExceptionHandling(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (SecurityTokenException ex)
            {
                var response = new ServiceResponse
                {
                    Message = ex.Message,
                    Success = false,
                    Payload = null,
                    StatusCode = System.Net.HttpStatusCode.UpgradeRequired
                };
                context.Response.StatusCode = StatusCodes.Status426UpgradeRequired;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(JsonSerializer.Serialize(response));
            }
        }
    }
}
