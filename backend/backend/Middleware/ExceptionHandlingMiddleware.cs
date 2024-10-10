using System.Net;
using backend.Models;

namespace backend.Middleware;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;

    public ExceptionHandlingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext httpContext)
    {
        try
        {
            await _next(httpContext);
        }
        catch (HttpResponseException ex)
        {
            httpContext.Response.StatusCode = (int)ex.StatusCode;
            await httpContext.Response.WriteAsync(ex.ErrorMessage);
        }
        catch
        {
            httpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            await httpContext.Response.WriteAsync("An unexpected error occurred.");
        }
    }
}
