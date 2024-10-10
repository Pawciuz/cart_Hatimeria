namespace backend.Models;

using System;
using System.Net;

public class HttpResponseException : Exception
{
    public HttpStatusCode StatusCode { get; }
    public string ErrorMessage { get; }

    public HttpResponseException(HttpStatusCode statusCode, string message) : base(message)
    {
        StatusCode = statusCode;
        ErrorMessage = message;
    }
}