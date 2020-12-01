using ERP_SMART.Business.Services.System.User;
using Fissoft.EntityFramework.Fts;
using Unity;
using Unity.Injection;
using Unity.Resolution;

namespace ERP_SMART.Business.Utils.Unity
{
    public static class MyUnity
    {
        private static UnityContainer container;
        public static UnityContainer RegisterService()
        {
            DbInterceptors.Init();
            // Web API configuration and services
            container = new UnityContainer();
            #region quản lý danh muc dùng chung
            container.RegisterType<ISystemUserService, SystemUserService>(new InjectionConstructor());
            
            #endregion
            return container;
        }
        public static T GetService<T>(params ResolverOverride[] overrides)
        {
            return container.Resolve<T>(overrides);
        }
    }
}
