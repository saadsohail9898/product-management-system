using FluentValidation.AspNetCore;
using FluentValidation;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using UrwaveProductApi.Data;
using UrwaveProductApi.Middleware;
using NLog;
using NLog.Web;

public class Program
{
    public static void Main(string[] args)
    {
        var logger = LogManager.Setup()
                             .LoadConfigurationFromAppSettings()
                             .GetCurrentClassLogger();
        try
        {
            logger.Debug("init main");
            var builder = WebApplication.CreateBuilder(args);

            builder.Logging.ClearProviders();
            builder.Host.UseNLog();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:4200")
                              .AllowAnyHeader()
                              .AllowAnyMethod();
                    });
            });

            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
            builder.Services.AddControllers();
            builder.Services.AddFluentValidationAutoValidation();
            builder.Services.AddValidatorsFromAssemblyContaining<ProductValidator>();
            builder.Services.AddValidatorsFromAssemblyContaining<UpdateProductValidator>();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("AllowSpecificOrigin");
            app.UseExceptionHandler(appBuilder =>
            {
                appBuilder.Run(async context =>
                {
                    context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                    context.Response.ContentType = "application/json";
                    var exceptionHandlerPathFeature = context.Features.Get<IExceptionHandlerPathFeature>();
                    if (exceptionHandlerPathFeature != null)
                    {
                        logger.Error(exceptionHandlerPathFeature.Error, "An unexpected error occurred.");
                        var error = new { Message = "An unexpected error occurred.", Details = exceptionHandlerPathFeature.Error.Message };
                        var errorJson = JsonSerializer.Serialize(error);
                        await context.Response.WriteAsync(errorJson);
                    }
                });
            });

            app.UseMiddleware<ErrorHandlingMiddleware>();
            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.Run();
        }
        catch (Exception ex)
        {
            logger.Error(ex, "Stopped program because of exception");
            throw;
        }
        finally
        {
            LogManager.Shutdown();
        }
    }
}