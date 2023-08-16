# Org.OpenAPITools.Api.IBeaconProxyApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

| Method | HTTP request | Description |
|--------|--------------|-------------|
| [**InterfacesIBeaconProxyBeacon**](IBeaconProxyApi.md#interfacesibeaconproxybeacon) | **POST** /{networkId}/interface/IBeaconProxy/read/{address}/beacon | IBeaconProxy.beacon |
| [**InterfacesIBeaconProxySetBeacon**](IBeaconProxyApi.md#interfacesibeaconproxysetbeacon) | **POST** /{networkId}/interface/IBeaconProxy/write/{address}/setBeacon | IBeaconProxy.setBeacon |

<a id="interfacesibeaconproxybeacon"></a>
# **InterfacesIBeaconProxyBeacon**
> InterfacesIBeaconImplementation200Response InterfacesIBeaconProxyBeacon (string networkId, string address, InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest)

IBeaconProxy.beacon

Read `beacon()` on an instance of `IBeaconProxy`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIBeaconProxyBeaconExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IBeaconProxyApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIBeaconImplementationRequest = new InterfacesIBeaconImplementationRequest(); // InterfacesIBeaconImplementationRequest | 

            try
            {
                // IBeaconProxy.beacon
                InterfacesIBeaconImplementation200Response result = apiInstance.InterfacesIBeaconProxyBeacon(networkId, address, interfacesIBeaconImplementationRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IBeaconProxyApi.InterfacesIBeaconProxyBeacon: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIBeaconProxyBeaconWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IBeaconProxy.beacon
    ApiResponse<InterfacesIBeaconImplementation200Response> response = apiInstance.InterfacesIBeaconProxyBeaconWithHttpInfo(networkId, address, interfacesIBeaconImplementationRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IBeaconProxyApi.InterfacesIBeaconProxyBeaconWithHttpInfo: " + e.Message);
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

[**InterfacesIBeaconImplementation200Response**](InterfacesIBeaconImplementation200Response.md)

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

<a id="interfacesibeaconproxysetbeacon"></a>
# **InterfacesIBeaconProxySetBeacon**
> InterfacesIBeaconProxySetBeacon200Response InterfacesIBeaconProxySetBeacon (string networkId, string address, InterfacesIBeaconProxySetBeaconRequest interfacesIBeaconProxySetBeaconRequest)

IBeaconProxy.setBeacon

Write `setBeacon(_beaconAddress,data)` on an instance of `IBeaconProxy`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIBeaconProxySetBeaconExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IBeaconProxyApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIBeaconProxySetBeaconRequest = new InterfacesIBeaconProxySetBeaconRequest(); // InterfacesIBeaconProxySetBeaconRequest | 

            try
            {
                // IBeaconProxy.setBeacon
                InterfacesIBeaconProxySetBeacon200Response result = apiInstance.InterfacesIBeaconProxySetBeacon(networkId, address, interfacesIBeaconProxySetBeaconRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IBeaconProxyApi.InterfacesIBeaconProxySetBeacon: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIBeaconProxySetBeaconWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IBeaconProxy.setBeacon
    ApiResponse<InterfacesIBeaconProxySetBeacon200Response> response = apiInstance.InterfacesIBeaconProxySetBeaconWithHttpInfo(networkId, address, interfacesIBeaconProxySetBeaconRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IBeaconProxyApi.InterfacesIBeaconProxySetBeaconWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIBeaconProxySetBeaconRequest** | [**InterfacesIBeaconProxySetBeaconRequest**](InterfacesIBeaconProxySetBeaconRequest.md) |  |  |

### Return type

[**InterfacesIBeaconProxySetBeacon200Response**](InterfacesIBeaconProxySetBeacon200Response.md)

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

