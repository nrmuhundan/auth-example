using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Host.Middlewares
{
    public class CsrfPreventionMiddleware : IMiddleware
    {
        private static readonly string[] skipUrls = new string[] { "/accounts/login", "/accounts/logout" };

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            var request = context.Request;
            if (IsBrowserRequest(request) || ValidAjaxCall(request))
            {
                await next(context);
            }
            else
            {
                context.Response.StatusCode = (int)HttpStatusCode.Forbidden;
            }
        }

        private static bool IsBrowserRequest(HttpRequest request)
        {
            return skipUrls.Any(s => s.StartsWith(request.Path, StringComparison.OrdinalIgnoreCase));            
        }

        private static bool ValidAjaxCall(HttpRequest request)
        {
            return string.Equals(request.Headers["X-Requested-With"], "XMLHttpRequest", StringComparison.Ordinal);
        } 
    }
}
