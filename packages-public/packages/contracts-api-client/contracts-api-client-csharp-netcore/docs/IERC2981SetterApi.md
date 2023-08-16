# Org.OpenAPITools.Api.IERC2981SetterApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

| Method | HTTP request | Description |
|--------|--------------|-------------|
| [**InterfacesIERC2981SetterSetDefaultRoyalty**](IERC2981SetterApi.md#interfacesierc2981settersetdefaultroyalty) | **POST** /{networkId}/interface/IERC2981Setter/write/{address}/setDefaultRoyalty | IERC2981Setter.setDefaultRoyalty |
| [**InterfacesIERC2981SetterSetTokenRoyalty**](IERC2981SetterApi.md#interfacesierc2981settersettokenroyalty) | **POST** /{networkId}/interface/IERC2981Setter/write/{address}/setTokenRoyalty | IERC2981Setter.setTokenRoyalty |

<a id="interfacesierc2981settersetdefaultroyalty"></a>
# **InterfacesIERC2981SetterSetDefaultRoyalty**
> InterfacesIERC2981SetterSetDefaultRoyalty200Response InterfacesIERC2981SetterSetDefaultRoyalty (string networkId, string address, InterfacesIERC2981SetterSetDefaultRoyaltyRequest interfacesIERC2981SetterSetDefaultRoyaltyRequest)

IERC2981Setter.setDefaultRoyalty

Write `setDefaultRoyalty(receiver,feeNumerator)` on an instance of `IERC2981Setter`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC2981SetterSetDefaultRoyaltyExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC2981SetterApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC2981SetterSetDefaultRoyaltyRequest = new InterfacesIERC2981SetterSetDefaultRoyaltyRequest(); // InterfacesIERC2981SetterSetDefaultRoyaltyRequest | 

            try
            {
                // IERC2981Setter.setDefaultRoyalty
                InterfacesIERC2981SetterSetDefaultRoyalty200Response result = apiInstance.InterfacesIERC2981SetterSetDefaultRoyalty(networkId, address, interfacesIERC2981SetterSetDefaultRoyaltyRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC2981SetterApi.InterfacesIERC2981SetterSetDefaultRoyalty: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC2981SetterSetDefaultRoyaltyWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC2981Setter.setDefaultRoyalty
    ApiResponse<InterfacesIERC2981SetterSetDefaultRoyalty200Response> response = apiInstance.InterfacesIERC2981SetterSetDefaultRoyaltyWithHttpInfo(networkId, address, interfacesIERC2981SetterSetDefaultRoyaltyRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC2981SetterApi.InterfacesIERC2981SetterSetDefaultRoyaltyWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC2981SetterSetDefaultRoyaltyRequest** | [**InterfacesIERC2981SetterSetDefaultRoyaltyRequest**](InterfacesIERC2981SetterSetDefaultRoyaltyRequest.md) |  |  |

### Return type

[**InterfacesIERC2981SetterSetDefaultRoyalty200Response**](InterfacesIERC2981SetterSetDefaultRoyalty200Response.md)

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

<a id="interfacesierc2981settersettokenroyalty"></a>
# **InterfacesIERC2981SetterSetTokenRoyalty**
> InterfacesIERC2981SetterSetTokenRoyalty200Response InterfacesIERC2981SetterSetTokenRoyalty (string networkId, string address, InterfacesIERC2981SetterSetTokenRoyaltyRequest interfacesIERC2981SetterSetTokenRoyaltyRequest)

IERC2981Setter.setTokenRoyalty

Write `setTokenRoyalty(tokenId,receiver,feeNumerator)` on an instance of `IERC2981Setter`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC2981SetterSetTokenRoyaltyExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC2981SetterApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC2981SetterSetTokenRoyaltyRequest = new InterfacesIERC2981SetterSetTokenRoyaltyRequest(); // InterfacesIERC2981SetterSetTokenRoyaltyRequest | 

            try
            {
                // IERC2981Setter.setTokenRoyalty
                InterfacesIERC2981SetterSetTokenRoyalty200Response result = apiInstance.InterfacesIERC2981SetterSetTokenRoyalty(networkId, address, interfacesIERC2981SetterSetTokenRoyaltyRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC2981SetterApi.InterfacesIERC2981SetterSetTokenRoyalty: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC2981SetterSetTokenRoyaltyWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC2981Setter.setTokenRoyalty
    ApiResponse<InterfacesIERC2981SetterSetTokenRoyalty200Response> response = apiInstance.InterfacesIERC2981SetterSetTokenRoyaltyWithHttpInfo(networkId, address, interfacesIERC2981SetterSetTokenRoyaltyRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC2981SetterApi.InterfacesIERC2981SetterSetTokenRoyaltyWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC2981SetterSetTokenRoyaltyRequest** | [**InterfacesIERC2981SetterSetTokenRoyaltyRequest**](InterfacesIERC2981SetterSetTokenRoyaltyRequest.md) |  |  |

### Return type

[**InterfacesIERC2981SetterSetTokenRoyalty200Response**](InterfacesIERC2981SetterSetTokenRoyalty200Response.md)

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

