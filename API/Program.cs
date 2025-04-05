using API.Extensions;
using API.Middleware;
using Application;
using Infrastructure.Identity;
using Infrastructure.Logging;
using Infrastructure.Payment;
using Infrastructure.Persistence;
using Infrastructure.Seeds;
using Infrastructure.Storage;
using Microsoft.EntityFrameworkCore;
using NLog.Web;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAPIServices(builder.Configuration);
builder.Services.AddPersistenceServices(builder.Configuration);
builder.Services.AddApplicationServices();
builder.Services.AddStorageServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);
builder.Services.AddPaymentServices(builder.Configuration);
builder.Services.AddLoggingServices();

builder.Logging.ClearProviders();
builder.Host.UseNLog();

var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    await services.GetRequiredService<DataContext>().Database.MigrateAsync();
    await Categories.SeedAsync(services.GetRequiredService<DataContext>());
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseMiddleware<ErrorHandlingMiddleware>();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseHttpsRedirection();
app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

//app.MapFallbackToController("Index", "Fallback");
app.MapFallbackToFile("index.html");

await app.RunAsync();
