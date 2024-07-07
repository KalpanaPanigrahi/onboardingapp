using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backendapi.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }

        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        public string? Password { get; set; }

        [Required]
        public string? Username { get; set; }

        [Phone]
        public string? PhoneNumber { get; set; }

        [Required]
        public string? LinkedinUN { get; set; }

        [Url]
        public string? ResumeLink { get; set; }
    }
}