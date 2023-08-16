# Org.OpenAPITools.Api.IERC2981Api

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

| Method | HTTP request | Description |
|--------|--------------|-------------|
| [**InterfacesIERC2981RoyaltyInfo**](IERC2981Api.md#interfacesierc2981royaltyinfo) | **POST** /{networkId}/interface/IERC2981/read/{address}/royaltyInfo | IERC2981.royaltyInfo |
| [**InterfacesIERC2981SupportsInterface**](IERC2981Api.md#interfacesierc2981supportsinterface) | **POST** /{networkId}/interface/IERC2981/read/{address}/supportsInterface | IERC2981.supportsInterface |

<a id="interfacesierc2981royaltyinfo"></a>
# **InterfacesIERC2981RoyaltyInfo**
> InterfacesIERC2981RoyaltyInfo200Response InterfacesIERC2981RoyaltyInfo (string networkId, string address, InterfacesIERC2981RoyaltyInfoRequest interfacesIERC2981RoyaltyInfoRequest)

IERC2981.royaltyInfo

Read `royaltyInfo(tokenId,salePrice)` on an instance of `IERC2981`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC2981RoyaltyInfoExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC2981Api(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC2981RoyaltyInfoRequest = new InterfacesIERC2981RoyaltyInfoRequest(); // InterfacesIERC2981RoyaltyInfoRequest | 

            try
            {
                // IERC2981.royaltyInfo
                InterfacesIERC2981RoyaltyInfo200Response result = apiInstance.InterfacesIERC2981RoyaltyInfo(networkId, address, interfacesIERC2981RoyaltyInfoRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC2981Api.InterfacesIERC2981RoyaltyInfo: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC2981RoyaltyInfoWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC2981.royaltyInfo
    ApiResponse<InterfacesIERC2981RoyaltyInfo200Response> response = apiInstance.InterfacesIERC2981RoyaltyInfoWithHttpInfo(networkId, address, interfacesIERC2981RoyaltyInfoRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC2981Api.InterfacesIERC2981RoyaltyInfoWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC2981RoyaltyInfoRequest** | [**InterfacesIERC2981RoyaltyInfoRequest**](InterfacesIERC2981RoyaltyInfoRequest.md) |  |  |

### Return type

[**InterfacesIERC2981RoyaltyInfo200Response**](InterfacesIERC2981RoyaltyInfo200Response.md)

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

<a id="interfacesierc2981supportsinterface"></a>
# **InterfacesIERC2981SupportsInterface**
> InterfacesIERC165SupportsInterface200Response InterfacesIERC2981SupportsInterface (string networkId, string address, InterfacesIERC165SupportsInterfaceRequest interfacesIERC165SupportsInterfaceRequest)

IERC2981.supportsInterface

Read `supportsInterface(interfaceId)` on an instance of `IERC2981`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC2981SupportsInterfaceExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC2981Api(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC165SupportsInterfaceRequest = new InterfacesIERC165SupportsInterfaceRequest(); // InterfacesIERC165SupportsInterfaceRequest | 

            try
            {
                // IERC2981.supportsInterface
                InterfacesIERC165SupportsInterface200Response result = apiInstance.InterfacesIERC2981SupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC2981Api.InterfacesIERC2981SupportsInterface: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC2981SupportsInterfaceWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC2981.supportsInterface
    ApiResponse<InterfacesIERC165SupportsInterface200Response> response = apiInstance.InterfacesIERC2981SupportsInterfaceWithHttpInfo(networkId, address, interfacesIERC165SupportsInterfaceRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC2981Api.InterfacesIERC2981SupportsInterfaceWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC165SupportsInterfaceRequest** | [**InterfacesIERC165SupportsInterfaceRequest**](InterfacesIERC165SupportsInterfaceRequest.md) |  |  |

### Return type

[**InterfacesIERC165SupportsInterface200Response**](InterfacesIERC165SupportsInterface200Response.md)

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

