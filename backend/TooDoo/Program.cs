using TooDoo.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

builder.Services.AddApplicationDbContext(builder.Configuration);
builder.Services.AddIdentity();
builder.Services.AddApplicationServices();

builder.Services.AddControllers();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors();

app.UseHttpsRedirection();

app.MapControllers();

app.Run();

