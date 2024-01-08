using Microsoft.EntityFrameworkCore;
using PokeApp.Data;
using PokeApp.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Pokémon API", Version = "v1" });
});

builder.Services.AddScoped<PokemonService>();

builder.Services.AddDbContext<PokemonContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("PokemonContext"));
});

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(corsPolicyBuilder =>
    {
        corsPolicyBuilder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Pokémon API V1");
});

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
