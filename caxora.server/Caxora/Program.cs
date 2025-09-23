using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Caxora.Data;
using Caxora.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Caxora API",
        Version = "v1",
        Description = "Professional farming platform API for agricultural management and extension services",
        Contact = new Microsoft.OpenApi.Models.OpenApiContact
        {
            Name = "Caxora Team",
            Email = "support@caxora.com",
            Url = new Uri("https://caxora.com")
        },
        License = new Microsoft.OpenApi.Models.OpenApiLicense
        {
            Name = "MIT License",
            Url = new Uri("https://opensource.org/licenses/MIT")
        }
    });

    // Add JWT Authentication to Swagger
    c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Enter 'Bearer' [space] and then your token in the text input below.",
        Name = "Authorization",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT"
    });

    c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });

    // Include XML comments for better documentation
    var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = System.IO.Path.Combine(System.AppContext.BaseDirectory, xmlFile);
    if (System.IO.File.Exists(xmlPath))
    {
        c.IncludeXmlComments(xmlPath);
    }
});

// Database
builder.Services.AddDbContext<CaxoraDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Authentication & Authorization
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = jwtSettings["SecretKey"] ?? "YourSuperSecretKeyThatIsAtLeast32CharactersLong!";

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSettings["Issuer"],
            ValidAudience = jwtSettings["Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
            ClockSkew = TimeSpan.Zero // Remove clock skew tolerance
        };

    });

builder.Services.AddAuthorization();

// Custom Services
builder.Services.AddScoped<IAuthService, AuthService>();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Ensure database is created and migrated
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<CaxoraDbContext>();
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    
    logger.LogInformation("Attempting to connect to database...");
    logger.LogInformation("Connection String: {ConnectionString}", connectionString);
    
    try
    {
        // Test connection first
        if (context.Database.CanConnect())
        {
            logger.LogInformation("✅ Database connection successful!");
        }
        else
        {
            logger.LogWarning("⚠️ Cannot connect to database, will try to create it...");
        }
        
        // Ensure database exists with current schema
        context.Database.EnsureCreated();
        logger.LogInformation("✅ Database created/verified successfully!");
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "❌ Database connection failed!");
        logger.LogError("Error details: {ErrorMessage}", ex.Message);
        
        if (ex.InnerException != null)
        {
            logger.LogError("Inner exception: {InnerMessage}", ex.InnerException.Message);
        }
        
        throw; // Re-throw to stop the application
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();

// Authentication Endpoints
app.MapPost("/api/auth/register", async (Caxora.Models.DTOs.RegisterRequestDto request, IAuthService authService) =>
{
    return await authService.RegisterAsync(request);
})
.WithName("Register")
.WithSummary("Register a new user")
.WithDescription("Creates a new user account with the provided information. Returns a JWT token upon successful registration.")
.WithOpenApi();

app.MapPost("/api/auth/login", async (Caxora.Models.DTOs.LoginRequestDto request, IAuthService authService) =>
{
    return await authService.LoginAsync(request);
})
.WithName("Login")
.WithSummary("Authenticate user")
.WithDescription("Authenticates a user with username and password. Returns a JWT token upon successful authentication.")
.WithOpenApi();

// Protected endpoint example
app.MapGet("/api/auth/me", (ClaimsPrincipal user) =>
{
    return new
    {
        Id = user.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value,
        Username = user.FindFirst(System.Security.Claims.ClaimTypes.Name)?.Value,
        Email = user.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value,
        Role = user.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value,
        FullName = user.FindFirst("fullName")?.Value
    };
})
.WithName("GetCurrentUser")
.WithSummary("Get current user profile")
.WithDescription("Returns the profile information of the currently authenticated user. Requires a valid JWT token.")
.WithOpenApi()
.RequireAuthorization();


// Health check endpoint
app.MapGet("/api/health", () => new { Status = "Healthy", Timestamp = DateTime.UtcNow })
.WithName("HealthCheck")
.WithSummary("API Health Check")
.WithDescription("Returns the current health status of the API and server timestamp.")
.WithOpenApi();

app.Run();
