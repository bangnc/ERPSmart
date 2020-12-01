using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using ERP_SMART.API.Models;
using ERP_SMART.Business.Services.System.User;
using Newtonsoft.Json;
using ERP_SMART.Business.Utils.Base;

namespace ERP_SMART.API.Providers
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {
        private readonly string _publicClientId;

        public ApplicationOAuthProvider(string publicClientId)
        {
            if (publicClientId == null)
            {
                throw new ArgumentNullException("publicClientId");
            }

            _publicClientId = publicClientId;
        }

        public override Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            try
            {
                var _userService = new SystemUserService();
                var user = _userService.Login(context.UserName, context.Password);
                var ticket = GenerateTicket(context.ClientId, user);
                context.Validated(ticket);
            }
            catch (Exception ex)
            {
                var err = new CatchError(ex);
                context.SetError(err.name, err.message);
            }
            return Task.FromResult<object>(null);
        }       

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            // Resource owner password credentials does not provide a client ID.
            if (context.ClientId == null)
            {
                context.Validated();
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientRedirectUri(OAuthValidateClientRedirectUriContext context)
        {
            if (context.ClientId == _publicClientId)
            {
                Uri expectedRootUri = new Uri(context.Request.Uri, "/");

                if (expectedRootUri.AbsoluteUri == context.RedirectUri)
                {
                    context.Validated();
                }
            }

            return Task.FromResult<object>(null);
        }

        public static AuthenticationProperties CreateProperties(string userName)
        {
            IDictionary<string, string> data = new Dictionary<string, string>
            {
                { "userName", userName }
            };
            return new AuthenticationProperties(data);
        }
        private AuthenticationTicket GenerateTicket(string ClientId, SystemUserDTO user)
        {
            // lấy thông tin phân quyền
            //var _userService = new NguoiDungService();//Unity.GetService<INguoiDungService>();
            //var quyen_han = _userService.GetRoleByUser(user);
            var identity = new ClaimsIdentity("JWT");
            identity.AddClaim(new Claim(ClaimTypes.Name, user.UserName == null ? string.Empty : user.UserName));
            identity.AddClaim(new Claim("sub", user.UserName == null ? string.Empty : user.UserName));
            identity.AddClaim(new Claim("username", user.UserName == null ? string.Empty : user.UserName));
            identity.AddClaim(new Claim("ten", user.FullName == null ? string.Empty : user.FullName));
            identity.AddClaim(new Claim("id", user.UserId.ToString()));
            identity.AddClaim(new Claim("email", user.Email == null ? string.Empty : user.Email));          

            var props = new AuthenticationProperties(new Dictionary<string, string>
                {
                    {
                         "client_id", (ClientId == null) ? string.Empty : ClientId
                    },
                    {
                        "tai_khoan", user.UserName == null?string.Empty : user.UserName
                    },
                    {
                        "ten", user.FullName == null?string.Empty : user.FullName
                    },
                     {
                        "id", user.UserId.ToString()
                    },
                    {
                        "profile", JsonConvert.SerializeObject(user)
                    },                    
                });
            var ticket = new AuthenticationTicket(identity, props);
            return ticket;
        }
    }
}