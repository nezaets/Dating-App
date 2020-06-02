using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Helpers
{
    public static class Extensions
    {
        public static void addApplicationError (this HttpResponse response, string message) {
            response.Headers.Add("Application-Errors", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Errors");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }
    }
}