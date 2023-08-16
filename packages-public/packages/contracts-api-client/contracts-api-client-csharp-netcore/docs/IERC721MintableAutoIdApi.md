# Org.OpenAPITools.Api.IERC721MintableAutoIdApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

| Method | HTTP request | Description |
|--------|--------------|-------------|
| [**InterfacesIERC721MintableAutoIdMint**](IERC721MintableAutoIdApi.md#interfacesierc721mintableautoidmint) | **POST** /{networkId}/interface/IERC721MintableAutoId/write/{address}/mint | IERC721MintableAutoId.mint |
| [**InterfacesIERC721MintableAutoIdMintBatch**](IERC721MintableAutoIdApi.md#interfacesierc721mintableautoidmintbatch) | **POST** /{networkId}/interface/IERC721MintableAutoId/write/{address}/mintBatch | IERC721MintableAutoId.mintBatch |
| [**InterfacesIERC721MintableAutoIdSafeMint**](IERC721MintableAutoIdApi.md#interfacesierc721mintableautoidsafemint) | **POST** /{networkId}/interface/IERC721MintableAutoId/write/{address}/safeMint | IERC721MintableAutoId.safeMint |
| [**InterfacesIERC721MintableAutoIdSafeMintBatch**](IERC721MintableAutoIdApi.md#interfacesierc721mintableautoidsafemintbatch) | **POST** /{networkId}/interface/IERC721MintableAutoId/write/{address}/safeMintBatch | IERC721MintableAutoId.safeMintBatch |

<a id="interfacesierc721mintableautoidmint"></a>
# **InterfacesIERC721MintableAutoIdMint**
> InterfacesIERC721MintableAutoIdMint200Response InterfacesIERC721MintableAutoIdMint (string networkId, string address, InterfacesIERC721MintableAutoIdMintRequest interfacesIERC721MintableAutoIdMintRequest)

IERC721MintableAutoId.mint

Write `mint(to)` on an instance of `IERC721MintableAutoId`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC721MintableAutoIdMintExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC721MintableAutoIdApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC721MintableAutoIdMintRequest = new InterfacesIERC721MintableAutoIdMintRequest(); // InterfacesIERC721MintableAutoIdMintRequest | 

            try
            {
                // IERC721MintableAutoId.mint
                InterfacesIERC721MintableAutoIdMint200Response result = apiInstance.InterfacesIERC721MintableAutoIdMint(networkId, address, interfacesIERC721MintableAutoIdMintRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC721MintableAutoIdApi.InterfacesIERC721MintableAutoIdMint: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC721MintableAutoIdMintWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC721MintableAutoId.mint
    ApiResponse<InterfacesIERC721MintableAutoIdMint200Response> response = apiInstance.InterfacesIERC721MintableAutoIdMintWithHttpInfo(networkId, address, interfacesIERC721MintableAutoIdMintRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC721MintableAutoIdApi.InterfacesIERC721MintableAutoIdMintWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC721MintableAutoIdMintRequest** | [**InterfacesIERC721MintableAutoIdMintRequest**](InterfacesIERC721MintableAutoIdMintRequest.md) |  |  |

### Return type

[**InterfacesIERC721MintableAutoIdMint200Response**](InterfacesIERC721MintableAutoIdMint200Response.md)

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

<a id="interfacesierc721mintableautoidmintbatch"></a>
# **InterfacesIERC721MintableAutoIdMintBatch**
> InterfacesIERC721MintableAutoIdMintBatch200Response InterfacesIERC721MintableAutoIdMintBatch (string networkId, string address, InterfacesIERC721MintableAutoIdMintBatchRequest interfacesIERC721MintableAutoIdMintBatchRequest)

IERC721MintableAutoId.mintBatch

Write `mintBatch(to)` on an instance of `IERC721MintableAutoId`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC721MintableAutoIdMintBatchExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC721MintableAutoIdApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC721MintableAutoIdMintBatchRequest = new InterfacesIERC721MintableAutoIdMintBatchRequest(); // InterfacesIERC721MintableAutoIdMintBatchRequest | 

            try
            {
                // IERC721MintableAutoId.mintBatch
                InterfacesIERC721MintableAutoIdMintBatch200Response result = apiInstance.InterfacesIERC721MintableAutoIdMintBatch(networkId, address, interfacesIERC721MintableAutoIdMintBatchRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC721MintableAutoIdApi.InterfacesIERC721MintableAutoIdMintBatch: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC721MintableAutoIdMintBatchWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC721MintableAutoId.mintBatch
    ApiResponse<InterfacesIERC721MintableAutoIdMintBatch200Response> response = apiInstance.InterfacesIERC721MintableAutoIdMintBatchWithHttpInfo(networkId, address, interfacesIERC721MintableAutoIdMintBatchRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC721MintableAutoIdApi.InterfacesIERC721MintableAutoIdMintBatchWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC721MintableAutoIdMintBatchRequest** | [**InterfacesIERC721MintableAutoIdMintBatchRequest**](InterfacesIERC721MintableAutoIdMintBatchRequest.md) |  |  |

### Return type

[**InterfacesIERC721MintableAutoIdMintBatch200Response**](InterfacesIERC721MintableAutoIdMintBatch200Response.md)

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

<a id="interfacesierc721mintableautoidsafemint"></a>
# **InterfacesIERC721MintableAutoIdSafeMint**
> InterfacesIERC721MintableAutoIdMint200Response InterfacesIERC721MintableAutoIdSafeMint (string networkId, string address, InterfacesIERC721MintableAutoIdMintRequest interfacesIERC721MintableAutoIdMintRequest)

IERC721MintableAutoId.safeMint

Write `safeMint(to)` on an instance of `IERC721MintableAutoId`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC721MintableAutoIdSafeMintExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC721MintableAutoIdApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC721MintableAutoIdMintRequest = new InterfacesIERC721MintableAutoIdMintRequest(); // InterfacesIERC721MintableAutoIdMintRequest | 

            try
            {
                // IERC721MintableAutoId.safeMint
                InterfacesIERC721MintableAutoIdMint200Response result = apiInstance.InterfacesIERC721MintableAutoIdSafeMint(networkId, address, interfacesIERC721MintableAutoIdMintRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC721MintableAutoIdApi.InterfacesIERC721MintableAutoIdSafeMint: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC721MintableAutoIdSafeMintWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC721MintableAutoId.safeMint
    ApiResponse<InterfacesIERC721MintableAutoIdMint200Response> response = apiInstance.InterfacesIERC721MintableAutoIdSafeMintWithHttpInfo(networkId, address, interfacesIERC721MintableAutoIdMintRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC721MintableAutoIdApi.InterfacesIERC721MintableAutoIdSafeMintWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC721MintableAutoIdMintRequest** | [**InterfacesIERC721MintableAutoIdMintRequest**](InterfacesIERC721MintableAutoIdMintRequest.md) |  |  |

### Return type

[**InterfacesIERC721MintableAutoIdMint200Response**](InterfacesIERC721MintableAutoIdMint200Response.md)

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

<a id="interfacesierc721mintableautoidsafemintbatch"></a>
# **InterfacesIERC721MintableAutoIdSafeMintBatch**
> InterfacesIERC721MintableAutoIdMintBatch200Response InterfacesIERC721MintableAutoIdSafeMintBatch (string networkId, string address, InterfacesIERC721MintableAutoIdMintBatchRequest interfacesIERC721MintableAutoIdMintBatchRequest)

IERC721MintableAutoId.safeMintBatch

Write `safeMintBatch(to)` on an instance of `IERC721MintableAutoId`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC721MintableAutoIdSafeMintBatchExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC721MintableAutoIdApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC721MintableAutoIdMintBatchRequest = new InterfacesIERC721MintableAutoIdMintBatchRequest(); // InterfacesIERC721MintableAutoIdMintBatchRequest | 

            try
            {
                // IERC721MintableAutoId.safeMintBatch
                InterfacesIERC721MintableAutoIdMintBatch200Response result = apiInstance.InterfacesIERC721MintableAutoIdSafeMintBatch(networkId, address, interfacesIERC721MintableAutoIdMintBatchRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC721MintableAutoIdApi.InterfacesIERC721MintableAutoIdSafeMintBatch: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC721MintableAutoIdSafeMintBatchWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC721MintableAutoId.safeMintBatch
    ApiResponse<InterfacesIERC721MintableAutoIdMintBatch200Response> response = apiInstance.InterfacesIERC721MintableAutoIdSafeMintBatchWithHttpInfo(networkId, address, interfacesIERC721MintableAutoIdMintBatchRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC721MintableAutoIdApi.InterfacesIERC721MintableAutoIdSafeMintBatchWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC721MintableAutoIdMintBatchRequest** | [**InterfacesIERC721MintableAutoIdMintBatchRequest**](InterfacesIERC721MintableAutoIdMintBatchRequest.md) |  |  |

### Return type

[**InterfacesIERC721MintableAutoIdMintBatch200Response**](InterfacesIERC721MintableAutoIdMintBatch200Response.md)

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

