# Org.OpenAPITools.Api.ITokenURIBaseURIApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

| Method | HTTP request | Description |
|--------|--------------|-------------|
| [**InterfacesITokenURIBaseURIBaseURI**](ITokenURIBaseURIApi.md#interfacesitokenuribaseuribaseuri) | **POST** /{networkId}/interface/ITokenURIBaseURI/read/{address}/baseURI | ITokenURIBaseURI.baseURI |
| [**InterfacesITokenURIBaseURISetTokenURIBaseURI**](ITokenURIBaseURIApi.md#interfacesitokenuribaseurisettokenuribaseuri) | **POST** /{networkId}/interface/ITokenURIBaseURI/write/{address}/setTokenURIBaseURI | ITokenURIBaseURI.setTokenURIBaseURI |

<a id="interfacesitokenuribaseuribaseuri"></a>
# **InterfacesITokenURIBaseURIBaseURI**
> InterfacesIContractURIContractURI200Response InterfacesITokenURIBaseURIBaseURI (string networkId, string address, InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest)

ITokenURIBaseURI.baseURI

Read `baseURI()` on an instance of `ITokenURIBaseURI`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesITokenURIBaseURIBaseURIExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new ITokenURIBaseURIApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIBeaconImplementationRequest = new InterfacesIBeaconImplementationRequest(); // InterfacesIBeaconImplementationRequest | 

            try
            {
                // ITokenURIBaseURI.baseURI
                InterfacesIContractURIContractURI200Response result = apiInstance.InterfacesITokenURIBaseURIBaseURI(networkId, address, interfacesIBeaconImplementationRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling ITokenURIBaseURIApi.InterfacesITokenURIBaseURIBaseURI: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesITokenURIBaseURIBaseURIWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // ITokenURIBaseURI.baseURI
    ApiResponse<InterfacesIContractURIContractURI200Response> response = apiInstance.InterfacesITokenURIBaseURIBaseURIWithHttpInfo(networkId, address, interfacesIBeaconImplementationRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling ITokenURIBaseURIApi.InterfacesITokenURIBaseURIBaseURIWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIBeaconImplementationRequest** | [**InterfacesIBeaconImplementationRequest**](InterfacesIBeaconImplementationRequest.md) |  |  |

### Return type

[**InterfacesIContractURIContractURI200Response**](InterfacesIContractURIContractURI200Response.md)

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

<a id="interfacesitokenuribaseurisettokenuribaseuri"></a>
# **InterfacesITokenURIBaseURISetTokenURIBaseURI**
> InterfacesIContractURISetContractURI200Response InterfacesITokenURIBaseURISetTokenURIBaseURI (string networkId, string address, InterfacesIContractURISetContractURIRequest interfacesIContractURISetContractURIRequest)

ITokenURIBaseURI.setTokenURIBaseURI

Write `setTokenURIBaseURI(uri)` on an instance of `ITokenURIBaseURI`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesITokenURIBaseURISetTokenURIBaseURIExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new ITokenURIBaseURIApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIContractURISetContractURIRequest = new InterfacesIContractURISetContractURIRequest(); // InterfacesIContractURISetContractURIRequest | 

            try
            {
                // ITokenURIBaseURI.setTokenURIBaseURI
                InterfacesIContractURISetContractURI200Response result = apiInstance.InterfacesITokenURIBaseURISetTokenURIBaseURI(networkId, address, interfacesIContractURISetContractURIRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling ITokenURIBaseURIApi.InterfacesITokenURIBaseURISetTokenURIBaseURI: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesITokenURIBaseURISetTokenURIBaseURIWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // ITokenURIBaseURI.setTokenURIBaseURI
    ApiResponse<InterfacesIContractURISetContractURI200Response> response = apiInstance.InterfacesITokenURIBaseURISetTokenURIBaseURIWithHttpInfo(networkId, address, interfacesIContractURISetContractURIRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling ITokenURIBaseURIApi.InterfacesITokenURIBaseURISetTokenURIBaseURIWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIContractURISetContractURIRequest** | [**InterfacesIContractURISetContractURIRequest**](InterfacesIContractURISetContractURIRequest.md) |  |  |

### Return type

[**InterfacesIContractURISetContractURI200Response**](InterfacesIContractURISetContractURI200Response.md)

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

