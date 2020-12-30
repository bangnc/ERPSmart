using ERP_SMART.Business.Utils.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP_SMART.Business.Services.System.User
{
    public interface ISystemUserService
    {
        ResponseList<SystemUserDTO> GetMany(int page, int page_size, string sort, string filter, string search);
        SystemUserDTO Register(SystemUserDTO systemUserDTO);
        SystemUserDTO Update(SystemUserDTO dto, Guid id);
        SystemUserDTO Login(string userName, string passWord);
        SystemUserDTO GetById(Guid Id);
        bool Remove(Guid id);
    }
}
