# Org.OpenAPITools.Api.IERC1155MintableApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

| Method | HTTP request | Description |
|--------|--------------|-------------|
| [**InterfacesIERC1155MintableMint**](IERC1155MintableApi.md#interfacesierc1155mintablemint) | **POST** /{networkId}/interface/IERC1155Mintable/write/{address}/mint | IERC1155Mintable.mint |
| [**InterfacesIERC1155MintableMintBatch**](IERC1155MintableApi.md#interfacesierc1155mintablemintbatch) | **POST** /{networkId}/interface/IERC1155Mintable/write/{address}/mintBatch | IERC1155Mintable.mintBatch |

<a id="interfacesierc1155mintablemint"></a>
# **InterfacesIERC1155MintableMint**
> InterfacesIERC1155MintableMint200Response InterfacesIERC1155MintableMint (string networkId, string address, InterfacesIERC1155MintableMintRequest interfacesIERC1155MintableMintRequest)

IERC1155Mintable.mint

Write `mint(to,id,amount,data)` on an instance of `IERC1155Mintable`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC1155MintableMintExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC1155MintableApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC1155MintableMintRequest = new InterfacesIERC1155MintableMintRequest(); // InterfacesIERC1155MintableMintRequest | 

            try
            {
                // IERC1155Mintable.mint
                InterfacesIERC1155MintableMint200Response result = apiInstance.InterfacesIERC1155MintableMint(networkId, address, interfacesIERC1155MintableMintRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC1155MintableApi.InterfacesIERC1155MintableMint: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC1155MintableMintWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC1155Mintable.mint
    ApiResponse<InterfacesIERC1155MintableMint200Response> response = apiInstance.InterfacesIERC1155MintableMintWithHttpInfo(networkId, address, interfacesIERC1155MintableMintRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC1155MintableApi.InterfacesIERC1155MintableMintWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC1155MintableMintRequest** | [**InterfacesIERC1155MintableMintRequest**](InterfacesIERC1155MintableMintRequest.md) |  |  |

### Return type

[**InterfacesIERC1155MintableMint200Response**](InterfacesIERC1155MintableMint200Response.md)

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

<a id="interfacesierc1155mintablemintbatch"></a>
# **InterfacesIERC1155MintableMintBatch**
> InterfacesIERC1155MintableMintBatch200Response InterfacesIERC1155MintableMintBatch (string networkId, string address, InterfacesIERC1155MintableMintBatchRequest interfacesIERC1155MintableMintBatchRequest)

IERC1155Mintable.mintBatch

Write `mintBatch(to,ids,amounts,data)` on an instance of `IERC1155Mintable`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC1155MintableMintBatchExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC1155MintableApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC1155MintableMintBatchRequest = new InterfacesIERC1155MintableMintBatchRequest(); // InterfacesIERC1155MintableMintBatchRequest | 

            try
            {
                // IERC1155Mintable.mintBatch
                InterfacesIERC1155MintableMintBatch200Response result = apiInstance.InterfacesIERC1155MintableMintBatch(networkId, address, interfacesIERC1155MintableMintBatchRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC1155MintableApi.InterfacesIERC1155MintableMintBatch: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC1155MintableMintBatchWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC1155Mintable.mintBatch
    ApiResponse<InterfacesIERC1155MintableMintBatch200Response> response = apiInstance.InterfacesIERC1155MintableMintBatchWithHttpInfo(networkId, address, interfacesIERC1155MintableMintBatchRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC1155MintableApi.InterfacesIERC1155MintableMintBatchWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC1155MintableMintBatchRequest** | [**InterfacesIERC1155MintableMintBatchRequest**](InterfacesIERC1155MintableMintBatchRequest.md) |  |  |

### Return type

[**InterfacesIERC1155MintableMintBatch200Response**](InterfacesIERC1155MintableMintBatch200Response.md)

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

