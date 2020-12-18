using ERP_SMART.Business.Utils.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP_SMART.Business.Services.System.Module
{
    public interface ISystemModuleService
    {
        SystemModuleDTO Insert(SystemModuleDTO moduleDTO);
        ResponseList<SystemModuleDTO> GetMany(int page, int page_size, string sort, string filter, string search);
        SystemModuleDTO GetById(Guid Id);
        SystemModuleDTO Update(SystemModuleDTO dto, Guid id);
        bool Remove(Guid id);
        bool Removes(List<Guid> ids);
    }

}
