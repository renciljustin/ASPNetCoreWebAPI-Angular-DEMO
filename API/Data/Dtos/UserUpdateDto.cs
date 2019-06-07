using System;
using System.ComponentModel.DataAnnotations;

namespace API.Data.Dtos
{
    public class UserUpdateDto
    {
        [Required]
        [StringLength(maximumLength: 255, ErrorMessage = "Must be at least 2 to 255 characters.", MinimumLength = 2)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(maximumLength: 255, ErrorMessage = "Must be at least 2 to 255 characters.", MinimumLength = 2)]
        public string LastName { get; set; }

        [DataType(DataType.Date)]
        public DateTime? BirthDate { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}