# Org.OpenAPITools.Api.WebhooksApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

| Method | HTTP request | Description |
|--------|--------------|-------------|
| [**WebhooksReadme**](WebhooksApi.md#webhooksreadme) | **POST** /webhooks/readme | Signup/Login user with readme.io |

<a id="webhooksreadme"></a>
# **WebhooksReadme**
> WebhooksReadme200Response WebhooksReadme (WebhooksReadmeRequest webhooksReadmeRequest)

Signup/Login user with readme.io

Readme.io webhook for signups

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class WebhooksReadmeExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new WebhooksApi(config);
            var webhooksReadmeRequest = new WebhooksReadmeRequest(); // WebhooksReadmeRequest | 

            try
            {
                // Signup/Login user with readme.io
                WebhooksReadme200Response result = apiInstance.WebhooksReadme(webhooksReadmeRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling WebhooksApi.WebhooksReadme: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the WebhooksReadmeWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Signup/Login user with readme.io
    ApiResponse<WebhooksReadme200Response> response = apiInstance.WebhooksReadmeWithHttpInfo(webhooksReadmeRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling WebhooksApi.WebhooksReadmeWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **webhooksReadmeRequest** | [**WebhooksReadmeRequest**](WebhooksReadmeRequest.md) |  |  |

### Return type

[**WebhooksReadme200Response**](WebhooksReadme200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful response |  -  |
| **0** | Error response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

