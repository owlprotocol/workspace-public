# Org.OpenAPITools.Api.IERC721MintableApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

| Method | HTTP request | Description |
|--------|--------------|-------------|
| [**InterfacesIERC721MintableMint**](IERC721MintableApi.md#interfacesierc721mintablemint) | **POST** /{networkId}/interface/IERC721Mintable/write/{address}/mint | IERC721Mintable.mint |
| [**InterfacesIERC721MintableMintBatch**](IERC721MintableApi.md#interfacesierc721mintablemintbatch) | **POST** /{networkId}/interface/IERC721Mintable/write/{address}/mintBatch | IERC721Mintable.mintBatch |
| [**InterfacesIERC721MintableSafeMint**](IERC721MintableApi.md#interfacesierc721mintablesafemint) | **POST** /{networkId}/interface/IERC721Mintable/write/{address}/safeMint | IERC721Mintable.safeMint |
| [**InterfacesIERC721MintableSafeMintBatch**](IERC721MintableApi.md#interfacesierc721mintablesafemintbatch) | **POST** /{networkId}/interface/IERC721Mintable/write/{address}/safeMintBatch | IERC721Mintable.safeMintBatch |

<a id="interfacesierc721mintablemint"></a>
# **InterfacesIERC721MintableMint**
> InterfacesIERC721Approve200Response InterfacesIERC721MintableMint (string networkId, string address, InterfacesIERC721ApproveRequest interfacesIERC721ApproveRequest)

IERC721Mintable.mint

Write `mint(to,tokenId)` on an instance of `IERC721Mintable`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC721MintableMintExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC721MintableApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC721ApproveRequest = new InterfacesIERC721ApproveRequest(); // InterfacesIERC721ApproveRequest | 

            try
            {
                // IERC721Mintable.mint
                InterfacesIERC721Approve200Response result = apiInstance.InterfacesIERC721MintableMint(networkId, address, interfacesIERC721ApproveRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC721MintableApi.InterfacesIERC721MintableMint: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC721MintableMintWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC721Mintable.mint
    ApiResponse<InterfacesIERC721Approve200Response> response = apiInstance.InterfacesIERC721MintableMintWithHttpInfo(networkId, address, interfacesIERC721ApproveRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC721MintableApi.InterfacesIERC721MintableMintWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC721ApproveRequest** | [**InterfacesIERC721ApproveRequest**](InterfacesIERC721ApproveRequest.md) |  |  |

### Return type

[**InterfacesIERC721Approve200Response**](InterfacesIERC721Approve200Response.md)

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

<a id="interfacesierc721mintablemintbatch"></a>
# **InterfacesIERC721MintableMintBatch**
> InterfacesIERC721MintableMintBatch200Response InterfacesIERC721MintableMintBatch (string networkId, string address, InterfacesIERC721MintableMintBatchRequest interfacesIERC721MintableMintBatchRequest)

IERC721Mintable.mintBatch

Write `mintBatch(to,tokenId)` on an instance of `IERC721Mintable`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC721MintableMintBatchExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC721MintableApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC721MintableMintBatchRequest = new InterfacesIERC721MintableMintBatchRequest(); // InterfacesIERC721MintableMintBatchRequest | 

            try
            {
                // IERC721Mintable.mintBatch
                InterfacesIERC721MintableMintBatch200Response result = apiInstance.InterfacesIERC721MintableMintBatch(networkId, address, interfacesIERC721MintableMintBatchRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC721MintableApi.InterfacesIERC721MintableMintBatch: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC721MintableMintBatchWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC721Mintable.mintBatch
    ApiResponse<InterfacesIERC721MintableMintBatch200Response> response = apiInstance.InterfacesIERC721MintableMintBatchWithHttpInfo(networkId, address, interfacesIERC721MintableMintBatchRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC721MintableApi.InterfacesIERC721MintableMintBatchWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC721MintableMintBatchRequest** | [**InterfacesIERC721MintableMintBatchRequest**](InterfacesIERC721MintableMintBatchRequest.md) |  |  |

### Return type

[**InterfacesIERC721MintableMintBatch200Response**](InterfacesIERC721MintableMintBatch200Response.md)

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

<a id="interfacesierc721mintablesafemint"></a>
# **InterfacesIERC721MintableSafeMint**
> InterfacesIERC721Approve200Response InterfacesIERC721MintableSafeMint (string networkId, string address, InterfacesIERC721ApproveRequest interfacesIERC721ApproveRequest)

IERC721Mintable.safeMint

Write `safeMint(to,tokenId)` on an instance of `IERC721Mintable`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC721MintableSafeMintExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC721MintableApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC721ApproveRequest = new InterfacesIERC721ApproveRequest(); // InterfacesIERC721ApproveRequest | 

            try
            {
                // IERC721Mintable.safeMint
                InterfacesIERC721Approve200Response result = apiInstance.InterfacesIERC721MintableSafeMint(networkId, address, interfacesIERC721ApproveRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC721MintableApi.InterfacesIERC721MintableSafeMint: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC721MintableSafeMintWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC721Mintable.safeMint
    ApiResponse<InterfacesIERC721Approve200Response> response = apiInstance.InterfacesIERC721MintableSafeMintWithHttpInfo(networkId, address, interfacesIERC721ApproveRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC721MintableApi.InterfacesIERC721MintableSafeMintWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC721ApproveRequest** | [**InterfacesIERC721ApproveRequest**](InterfacesIERC721ApproveRequest.md) |  |  |

### Return type

[**InterfacesIERC721Approve200Response**](InterfacesIERC721Approve200Response.md)

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

<a id="interfacesierc721mintablesafemintbatch"></a>
# **InterfacesIERC721MintableSafeMintBatch**
> InterfacesIERC721MintableMintBatch200Response InterfacesIERC721MintableSafeMintBatch (string networkId, string address, InterfacesIERC721MintableMintBatchRequest interfacesIERC721MintableMintBatchRequest)

IERC721Mintable.safeMintBatch

Write `safeMintBatch(to,tokenId)` on an instance of `IERC721Mintable`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC721MintableSafeMintBatchExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC721MintableApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC721MintableMintBatchRequest = new InterfacesIERC721MintableMintBatchRequest(); // InterfacesIERC721MintableMintBatchRequest | 

            try
            {
                // IERC721Mintable.safeMintBatch
                InterfacesIERC721MintableMintBatch200Response result = apiInstance.InterfacesIERC721MintableSafeMintBatch(networkId, address, interfacesIERC721MintableMintBatchRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC721MintableApi.InterfacesIERC721MintableSafeMintBatch: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC721MintableSafeMintBatchWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC721Mintable.safeMintBatch
    ApiResponse<InterfacesIERC721MintableMintBatch200Response> response = apiInstance.InterfacesIERC721MintableSafeMintBatchWithHttpInfo(networkId, address, interfacesIERC721MintableMintBatchRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC721MintableApi.InterfacesIERC721MintableSafeMintBatchWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC721MintableMintBatchRequest** | [**InterfacesIERC721MintableMintBatchRequest**](InterfacesIERC721MintableMintBatchRequest.md) |  |  |

### Return type

[**InterfacesIERC721MintableMintBatch200Response**](InterfacesIERC721MintableMintBatch200Response.md)

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

