using System.ComponentModel.DataAnnotations;

namespace Caxora.Models.DTOs
{
    /// <summary>
    /// Request model for user registration
    /// </summary>
    public class RegisterRequestDto
    {
        /// <summary>
        /// Unique username for the user account (3-100 characters, alphanumeric with underscores/hyphens)
        /// </summary>
        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string Username { get; set; } = string.Empty;

        /// <summary>
        /// Valid email address for the user account
        /// </summary>
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// User password (minimum 6 characters)
        /// </summary>
        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string Password { get; set; } = string.Empty;

        /// <summary>
        /// Full name of the user
        /// </summary>
        [Required]
        [StringLength(150)]
        public string FullName { get; set; } = string.Empty;

        /// <summary>
        /// Optional phone number for contact purposes
        /// </summary>
        [StringLength(20)]
        public string? PhoneNumber { get; set; }

        /// <summary>
        /// Optional location/region information
        /// </summary>
        [StringLength(200)]
        public string? Location { get; set; }

        /// <summary>
        /// Optional address information
        /// </summary>
        [StringLength(100)]
        public string? Address { get; set; }

        /// <summary>
        /// Optional city information
        /// </summary>
        [StringLength(50)]
        public string? City { get; set; }

        /// <summary>
        /// User role in the system (default: FARMER)
        /// </summary>
        [Required]
        public UserRole Role { get; set; } = UserRole.FARMER;
    }

    /// <summary>
    /// Request model for user authentication
    /// </summary>
    public class LoginRequestDto
    {
        /// <summary>
        /// Username for authentication
        /// </summary>
        [Required]
        public string Username { get; set; } = string.Empty;

        /// <summary>
        /// Password for authentication
        /// </summary>
        [Required]
        public string Password { get; set; } = string.Empty;
    }

    /// <summary>
    /// Response model for authentication operations
    /// </summary>
    public class AuthResponseDto
    {
        /// <summary>
        /// Indicates if the operation was successful
        /// </summary>
        public bool Success { get; set; }

        /// <summary>
        /// JWT token for authenticated requests (only present on successful login/register)
        /// </summary>
        public string Token { get; set; } = string.Empty;

        /// <summary>
        /// User profile information (only present on successful operations)
        /// </summary>
        public UserProfileDto User { get; set; } = new();

        /// <summary>
        /// Response message describing the operation result
        /// </summary>
        public string Message { get; set; } = string.Empty;
    }

    public class UserProfileDto
    {
        public Guid Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public UserRole Role { get; set; }
        public bool IsActive { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
        public string? Location { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? LastLoginAt { get; set; }
    }
}
