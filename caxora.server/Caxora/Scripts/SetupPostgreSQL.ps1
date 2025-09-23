# PostgreSQL Setup Script for Caxora
# Run this script from the Caxora project directory

Write-Host "Setting up Caxora with PostgreSQL..." -ForegroundColor Green

# Check if PostgreSQL is installed
Write-Host "Checking PostgreSQL installation..." -ForegroundColor Yellow
try {
    $pgVersion = psql --version
    Write-Host "PostgreSQL found: $pgVersion" -ForegroundColor Green
} catch {
    Write-Host "PostgreSQL not found. Please install PostgreSQL first:" -ForegroundColor Red
    Write-Host "1. Download from: https://www.postgresql.org/download/" -ForegroundColor Yellow
    Write-Host "2. Or use Docker: docker run --name postgres -e POSTGRES_PASSWORD=yourpassword -p 5432:5432 -d postgres" -ForegroundColor Yellow
    exit 1
}

# Navigate to the project directory
Set-Location "Caxora"

# Restore packages
Write-Host "Restoring NuGet packages..." -ForegroundColor Yellow
dotnet restore

# Create database (you may need to adjust the connection details)
Write-Host "Creating database 'CaxoraDb'..." -ForegroundColor Yellow
Write-Host "Note: Make sure PostgreSQL is running and update the connection string in appsettings.json" -ForegroundColor Cyan

# Add Entity Framework migration
Write-Host "Creating database migration..." -ForegroundColor Yellow
dotnet ef migrations add InitialCreate

# Update database
Write-Host "Updating database..." -ForegroundColor Yellow
dotnet ef database update

Write-Host "PostgreSQL setup completed!" -ForegroundColor Green
Write-Host "You can now run the application with: dotnet run" -ForegroundColor Cyan
Write-Host "Don't forget to update the password in appsettings.json!" -ForegroundColor Yellow
