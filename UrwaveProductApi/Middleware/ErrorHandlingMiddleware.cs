using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;
using System.Text.Json;

namespace UrwaveProductApi.Middleware
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorHandlingMiddleware> _logger;

        public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
                _logger.LogDebug(" ********** New Request ********** ");
            }
            catch (Exception ex)
            {
                // Log additional context information
                _logger.LogError(ex,
                    "An unexpected error occurred. Request Path: {Path}, Method: {Method}, Query: {Query}",
                    httpContext.Request.Path,
                    httpContext.Request.Method,
                    httpContext.Request.QueryString);

                await HandleExceptionAsync(httpContext, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;

            var error = new
            {
                Message = "An unexpected error occurred.",
                Details = exception.Message,
                Path = context.Request.Path,
                Method = context.Request.Method
            };

            var errorJson = JsonSerializer.Serialize(error);
            return context.Response.WriteAsync(errorJson);
        }
    }
}