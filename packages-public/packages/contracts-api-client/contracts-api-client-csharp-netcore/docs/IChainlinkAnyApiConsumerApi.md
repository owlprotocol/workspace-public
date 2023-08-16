# Org.OpenAPITools.Api.IChainlinkAnyApiConsumerApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

| Method | HTTP request | Description |
|--------|--------------|-------------|
| [**InterfacesIChainlinkAnyApiConsumerFulfill**](IChainlinkAnyApiConsumerApi.md#interfacesichainlinkanyapiconsumerfulfill) | **POST** /{networkId}/interface/IChainlinkAnyApiConsumer/write/{address}/fulfill | IChainlinkAnyApiConsumer.fulfill |

<a id="interfacesichainlinkanyapiconsumerfulfill"></a>
# **InterfacesIChainlinkAnyApiConsumerFulfill**
> InterfacesIChainlinkAnyApiConsumerFulfill200Response InterfacesIChainlinkAnyApiConsumerFulfill (string networkId, string address, InterfacesIChainlinkAnyApiConsumerFulfillRequest interfacesIChainlinkAnyApiConsumerFulfillRequest)

IChainlinkAnyApiConsumer.fulfill

Write `fulfill(fulfillPrefixData,fulfillResponseData)` on an instance of `IChainlinkAnyApiConsumer`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIChainlinkAnyApiConsumerFulfillExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IChainlinkAnyApiConsumerApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIChainlinkAnyApiConsumerFulfillRequest = new InterfacesIChainlinkAnyApiConsumerFulfillRequest(); // InterfacesIChainlinkAnyApiConsumerFulfillRequest | 

            try
            {
                // IChainlinkAnyApiConsumer.fulfill
                InterfacesIChainlinkAnyApiConsumerFulfill200Response result = apiInstance.InterfacesIChainlinkAnyApiConsumerFulfill(networkId, address, interfacesIChainlinkAnyApiConsumerFulfillRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IChainlinkAnyApiConsumerApi.InterfacesIChainlinkAnyApiConsumerFulfill: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIChainlinkAnyApiConsumerFulfillWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IChainlinkAnyApiConsumer.fulfill
    ApiResponse<InterfacesIChainlinkAnyApiConsumerFulfill200Response> response = apiInstance.InterfacesIChainlinkAnyApiConsumerFulfillWithHttpInfo(networkId, address, interfacesIChainlinkAnyApiConsumerFulfillRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IChainlinkAnyApiConsumerApi.InterfacesIChainlinkAnyApiConsumerFulfillWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIChainlinkAnyApiConsumerFulfillRequest** | [**InterfacesIChainlinkAnyApiConsumerFulfillRequest**](InterfacesIChainlinkAnyApiConsumerFulfillRequest.md) |  |  |

### Return type

[**InterfacesIChainlinkAnyApiConsumerFulfill200Response**](InterfacesIChainlinkAnyApiConsumerFulfill200Response.md)

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

