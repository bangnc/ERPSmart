using System.Web.Http;
using System;
using System.Security.Claims;
using System.Collections.Generic;
using System.Linq;

namespace ERP_SMART.API.Controllers
{
    public class BaseController: ApiController
    {
        /// <summary>
        /// get Id Current bangnc quang teo eeee
        /// </summary>
        /// <returns></returns>
      public Guid GetUserId()
        {
            if (User.Identity != null && User.Identity.IsAuthenticated)
            {               
                var identity = (ClaimsIdentity)User.Identity;
                IEnumerable<Claim> claims = identity.Claims;
                var claimId = claims.FirstOrDefault(x => x.Type == "id");
                return Guid.Parse(claimId.Value);

            }
            return Guid.Empty;
        }
    }
}
