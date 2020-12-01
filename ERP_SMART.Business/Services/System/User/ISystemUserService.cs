using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP_SMART.Business.Services.System.User
{
    public interface ISystemUserService
    {
       bool Register(SystemUserDTO systemUserDTO);
        SystemUserDTO Login(string userName, string passWord);
    }
}
