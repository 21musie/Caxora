using Microsoft.EntityFrameworkCore;
using Caxora.Models;

namespace Caxora.Data
{
    public class CaxoraDbContext : DbContext
    {
        public CaxoraDbContext(DbContextOptions<CaxoraDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User entity configuration
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                
                // Unique constraints
                entity.HasIndex(e => e.Username).IsUnique();
                entity.HasIndex(e => e.Email).IsUnique();
                
                // Core fields
                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(100);
                
                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(255);
                
                entity.Property(e => e.PasswordHash)
                    .IsRequired()
                    .HasMaxLength(255);
                
                entity.Property(e => e.FullName)
                    .IsRequired()
                    .HasMaxLength(150);
                
                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(20);
                
                entity.Property(e => e.Location)
                    .HasMaxLength(200);
                
                entity.Property(e => e.Address)
                    .HasMaxLength(100);
                
                entity.Property(e => e.City)
                    .HasMaxLength(50);
                
                // Audit fields
                entity.Property(e => e.CreatedAt)
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");
                
                entity.Property(e => e.UpdatedAt)
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");
                
                // Enum configurations
                entity.Property(e => e.Role)
                    .HasConversion<int>();
            });

            // Seed some initial admin user (optional)
            var adminId = Guid.NewGuid();
            var adminCreatedAt = DateTime.UtcNow;
            
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = adminId,
                    Username = "admin",
                    Email = "admin@caxora.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"), // Change this!
                    Role = UserRole.ADMIN,
                    IsActive = true,
                    FullName = "System Administrator",
                    CreatedAt = adminCreatedAt,
                    UpdatedAt = adminCreatedAt
                }
            );
        }
    }
}
