using HereForYou.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

namespace HereForYou.Controllers
{
    public class GlobalExceptionHandler : IExceptionFilter
    {
        private readonly ILogger _logger;

        public GlobalExceptionHandler(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<GlobalExceptionHandler>();
        }

        public void OnException(ExceptionContext context)
        {
            context.Result = new ObjectResult(new ErrorResponse {Message = context.Exception.Message})
            {
                StatusCode = 500,
                DeclaredType = typeof(ErrorResponse)
            };
            string userName = context.HttpContext.User.Identity.Name ?? "anonymous";
            _logger.LogError(0, context.Exception, "Request to {0} by {1}", context.HttpContext.Request.Path, userName);
        }
    }
}