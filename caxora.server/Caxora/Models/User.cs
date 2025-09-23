using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.RegularExpressions;

namespace Caxora.Models
{
    public class User
    {
        // Core Authentication Fields
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required(ErrorMessage = "Username is required")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Username must be between 3 and 100 characters")]
        [RegularExpression(@"^[a-zA-Z0-9_-]+$", ErrorMessage = "Username can only contain letters, numbers, underscores, and hyphens")]
        public string Username { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        [StringLength(255, ErrorMessage = "Email cannot exceed 255 characters")]
        public string Email { get; set; } = string.Empty;

        [Required]
        [StringLength(255)] // BCrypt hashes are typically 60 characters, but using 255 for safety
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        public UserRole Role { get; set; } = UserRole.FARMER;

        [Required]
        public bool IsActive { get; set; } = true;

        // Security Fields
        public DateTime? PasswordChangedAt { get; set; }

        // User Profile Fields (Farm Context)
        [Required(ErrorMessage = "Full name is required")]
        [StringLength(150, MinimumLength = 2, ErrorMessage = "Full name must be between 2 and 150 characters")]
        public string FullName { get; set; } = string.Empty;

        [Phone(ErrorMessage = "Invalid phone number format")]
        [StringLength(20)]
        public string? PhoneNumber { get; set; }

        [StringLength(200)]
        public string? Location { get; set; }

        [StringLength(100)]
        public string? Address { get; set; }

        [StringLength(50)]
        public string? City { get; set; }

        // Audit Fields
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? LastLoginAt { get; set; }

        // Computed Properties
        [NotMapped]
        public string FullAddress => 
            string.Join(", ", new[] { Address, City, Location }
                .Where(x => !string.IsNullOrWhiteSpace(x)));

        [NotMapped]
        public bool HasCompleteProfile => 
            !string.IsNullOrWhiteSpace(FullName) && 
            !string.IsNullOrWhiteSpace(Email) && 
            !string.IsNullOrWhiteSpace(PhoneNumber);

        // Business Logic Methods
        public void UpdateLastLogin()
        {
            LastLoginAt = DateTime.UtcNow;
            UpdatedAt = DateTime.UtcNow;
        }

        // Navigation Properties (for future use)
        // public virtual ICollection<Farm> Farms { get; set; } = new List<Farm>();
        // public virtual ICollection<UserSession> Sessions { get; set; } = new List<UserSession>();
        // public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();
    }

    public enum UserRole
    {
        FARMER = 1,
        EXTENSION_OFFICER = 2,
        AGENT = 3, // Agricultural agent
        ADMIN = 4,
        SUPER_ADMIN = 5
    }

    public enum Language
    {
        English = 1,
        Amharic = 2,
        Oromo = 3,
        Tigrinya = 4,
        Somali = 5,
        Afar = 6,
        Sidamo = 7,
        Wolaytta = 8,
        Gurage = 9,
        Hadiyya = 10
    }

    public enum UserStatus
    {
        Active = 1,
        Inactive = 2,
        Suspended = 3,
        Pending = 4,
        Deleted = 5
    }
}
