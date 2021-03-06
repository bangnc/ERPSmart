﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using ERP_SMART.Business.Utils.Unity;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;

namespace ERP_SMART.API
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));
            // my config
            //var cors = new EnableCorsAttribute("*", "*", "*");            
            //config.EnableCors();
            // Web API routes
            config.MapHttpAttributeRoutes();
            MyUnity.RegisterService();
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
