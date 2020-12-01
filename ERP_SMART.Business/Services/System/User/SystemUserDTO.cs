using ERP_SMART.Business.Utils.Base;
using System;
using System.ComponentModel.DataAnnotations;

namespace ERP_SMART.Business.Services.System.User
{
    public class SystemUserDTO : BaseDTO
    {
        public Guid UserId { get; set; }

        [Required]
        [Display(Name = "Tên đăng nhập")]
        public string UserName { get; set; }
        public string FullName { get; set; }

        [Required]
        [Display(Name = "Mật khẩu")]
        public string Password { get; set; }
        public bool IsAdmin { get; set; }

        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Avatar { get; set; }
        public string ClientId { get; set; }
        public bool IsActive { get; set; }
    }
    public class SystemUserLoginDTO
    {      
        [Required]
        [Display(Name = "Tên đăng nhập")]
        public string UserName { get; set; }       

        [Required]
        [Display(Name = "Mật khẩu")]
        public string Password { get; set; }
       
    }
}
