# Org.OpenAPITools.Api.IERC1155Api

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

| Method | HTTP request | Description |
|--------|--------------|-------------|
| [**InterfacesIERC1155BalanceOf**](IERC1155Api.md#interfacesierc1155balanceof) | **POST** /{networkId}/interface/IERC1155/read/{address}/balanceOf | IERC1155.balanceOf |
| [**InterfacesIERC1155BalanceOfBatch**](IERC1155Api.md#interfacesierc1155balanceofbatch) | **POST** /{networkId}/interface/IERC1155/read/{address}/balanceOfBatch | IERC1155.balanceOfBatch |
| [**InterfacesIERC1155IsApprovedForAll**](IERC1155Api.md#interfacesierc1155isapprovedforall) | **POST** /{networkId}/interface/IERC1155/read/{address}/isApprovedForAll | IERC1155.isApprovedForAll |
| [**InterfacesIERC1155SafeBatchTransferFrom**](IERC1155Api.md#interfacesierc1155safebatchtransferfrom) | **POST** /{networkId}/interface/IERC1155/write/{address}/safeBatchTransferFrom | IERC1155.safeBatchTransferFrom |
| [**InterfacesIERC1155SafeTransferFrom**](IERC1155Api.md#interfacesierc1155safetransferfrom) | **POST** /{networkId}/interface/IERC1155/write/{address}/safeTransferFrom | IERC1155.safeTransferFrom |
| [**InterfacesIERC1155SetApprovalForAll**](IERC1155Api.md#interfacesierc1155setapprovalforall) | **POST** /{networkId}/interface/IERC1155/write/{address}/setApprovalForAll | IERC1155.setApprovalForAll |
| [**InterfacesIERC1155SupportsInterface**](IERC1155Api.md#interfacesierc1155supportsinterface) | **POST** /{networkId}/interface/IERC1155/read/{address}/supportsInterface | IERC1155.supportsInterface |

<a id="interfacesierc1155balanceof"></a>
# **InterfacesIERC1155BalanceOf**
> InterfacesIERC1155BalanceOf200Response InterfacesIERC1155BalanceOf (string networkId, string address, InterfacesIERC1155BalanceOfRequest interfacesIERC1155BalanceOfRequest)

IERC1155.balanceOf

Read `balanceOf(account,id)` on an instance of `IERC1155`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC1155BalanceOfExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC1155Api(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC1155BalanceOfRequest = new InterfacesIERC1155BalanceOfRequest(); // InterfacesIERC1155BalanceOfRequest | 

            try
            {
                // IERC1155.balanceOf
                InterfacesIERC1155BalanceOf200Response result = apiInstance.InterfacesIERC1155BalanceOf(networkId, address, interfacesIERC1155BalanceOfRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC1155Api.InterfacesIERC1155BalanceOf: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC1155BalanceOfWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC1155.balanceOf
    ApiResponse<InterfacesIERC1155BalanceOf200Response> response = apiInstance.InterfacesIERC1155BalanceOfWithHttpInfo(networkId, address, interfacesIERC1155BalanceOfRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC1155Api.InterfacesIERC1155BalanceOfWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC1155BalanceOfRequest** | [**InterfacesIERC1155BalanceOfRequest**](InterfacesIERC1155BalanceOfRequest.md) |  |  |

### Return type

[**InterfacesIERC1155BalanceOf200Response**](InterfacesIERC1155BalanceOf200Response.md)

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

<a id="interfacesierc1155balanceofbatch"></a>
# **InterfacesIERC1155BalanceOfBatch**
> InterfacesIERC1155BalanceOfBatch200Response InterfacesIERC1155BalanceOfBatch (string networkId, string address, InterfacesIERC1155BalanceOfBatchRequest interfacesIERC1155BalanceOfBatchRequest)

IERC1155.balanceOfBatch

Read `balanceOfBatch(accounts,ids)` on an instance of `IERC1155`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC1155BalanceOfBatchExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC1155Api(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC1155BalanceOfBatchRequest = new InterfacesIERC1155BalanceOfBatchRequest(); // InterfacesIERC1155BalanceOfBatchRequest | 

            try
            {
                // IERC1155.balanceOfBatch
                InterfacesIERC1155BalanceOfBatch200Response result = apiInstance.InterfacesIERC1155BalanceOfBatch(networkId, address, interfacesIERC1155BalanceOfBatchRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC1155Api.InterfacesIERC1155BalanceOfBatch: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC1155BalanceOfBatchWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC1155.balanceOfBatch
    ApiResponse<InterfacesIERC1155BalanceOfBatch200Response> response = apiInstance.InterfacesIERC1155BalanceOfBatchWithHttpInfo(networkId, address, interfacesIERC1155BalanceOfBatchRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC1155Api.InterfacesIERC1155BalanceOfBatchWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC1155BalanceOfBatchRequest** | [**InterfacesIERC1155BalanceOfBatchRequest**](InterfacesIERC1155BalanceOfBatchRequest.md) |  |  |

### Return type

[**InterfacesIERC1155BalanceOfBatch200Response**](InterfacesIERC1155BalanceOfBatch200Response.md)

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

<a id="interfacesierc1155isapprovedforall"></a>
# **InterfacesIERC1155IsApprovedForAll**
> InterfacesIERC1155IsApprovedForAll200Response InterfacesIERC1155IsApprovedForAll (string networkId, string address, InterfacesIERC1155IsApprovedForAllRequest interfacesIERC1155IsApprovedForAllRequest)

IERC1155.isApprovedForAll

Read `isApprovedForAll(account,operator)` on an instance of `IERC1155`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC1155IsApprovedForAllExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC1155Api(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC1155IsApprovedForAllRequest = new InterfacesIERC1155IsApprovedForAllRequest(); // InterfacesIERC1155IsApprovedForAllRequest | 

            try
            {
                // IERC1155.isApprovedForAll
                InterfacesIERC1155IsApprovedForAll200Response result = apiInstance.InterfacesIERC1155IsApprovedForAll(networkId, address, interfacesIERC1155IsApprovedForAllRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC1155Api.InterfacesIERC1155IsApprovedForAll: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC1155IsApprovedForAllWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC1155.isApprovedForAll
    ApiResponse<InterfacesIERC1155IsApprovedForAll200Response> response = apiInstance.InterfacesIERC1155IsApprovedForAllWithHttpInfo(networkId, address, interfacesIERC1155IsApprovedForAllRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC1155Api.InterfacesIERC1155IsApprovedForAllWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC1155IsApprovedForAllRequest** | [**InterfacesIERC1155IsApprovedForAllRequest**](InterfacesIERC1155IsApprovedForAllRequest.md) |  |  |

### Return type

[**InterfacesIERC1155IsApprovedForAll200Response**](InterfacesIERC1155IsApprovedForAll200Response.md)

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

<a id="interfacesierc1155safebatchtransferfrom"></a>
# **InterfacesIERC1155SafeBatchTransferFrom**
> InterfacesIERC1155SafeBatchTransferFrom200Response InterfacesIERC1155SafeBatchTransferFrom (string networkId, string address, InterfacesIERC1155SafeBatchTransferFromRequest interfacesIERC1155SafeBatchTransferFromRequest)

IERC1155.safeBatchTransferFrom

Write `safeBatchTransferFrom(from,to,ids,amounts,data)` on an instance of `IERC1155`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC1155SafeBatchTransferFromExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC1155Api(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC1155SafeBatchTransferFromRequest = new InterfacesIERC1155SafeBatchTransferFromRequest(); // InterfacesIERC1155SafeBatchTransferFromRequest | 

            try
            {
                // IERC1155.safeBatchTransferFrom
                InterfacesIERC1155SafeBatchTransferFrom200Response result = apiInstance.InterfacesIERC1155SafeBatchTransferFrom(networkId, address, interfacesIERC1155SafeBatchTransferFromRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC1155Api.InterfacesIERC1155SafeBatchTransferFrom: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC1155SafeBatchTransferFromWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC1155.safeBatchTransferFrom
    ApiResponse<InterfacesIERC1155SafeBatchTransferFrom200Response> response = apiInstance.InterfacesIERC1155SafeBatchTransferFromWithHttpInfo(networkId, address, interfacesIERC1155SafeBatchTransferFromRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC1155Api.InterfacesIERC1155SafeBatchTransferFromWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC1155SafeBatchTransferFromRequest** | [**InterfacesIERC1155SafeBatchTransferFromRequest**](InterfacesIERC1155SafeBatchTransferFromRequest.md) |  |  |

### Return type

[**InterfacesIERC1155SafeBatchTransferFrom200Response**](InterfacesIERC1155SafeBatchTransferFrom200Response.md)

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

<a id="interfacesierc1155safetransferfrom"></a>
# **InterfacesIERC1155SafeTransferFrom**
> InterfacesIERC1155SafeTransferFrom200Response InterfacesIERC1155SafeTransferFrom (string networkId, string address, InterfacesIERC1155SafeTransferFromRequest interfacesIERC1155SafeTransferFromRequest)

IERC1155.safeTransferFrom

Write `safeTransferFrom(from,to,id,amount,data)` on an instance of `IERC1155`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC1155SafeTransferFromExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC1155Api(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC1155SafeTransferFromRequest = new InterfacesIERC1155SafeTransferFromRequest(); // InterfacesIERC1155SafeTransferFromRequest | 

            try
            {
                // IERC1155.safeTransferFrom
                InterfacesIERC1155SafeTransferFrom200Response result = apiInstance.InterfacesIERC1155SafeTransferFrom(networkId, address, interfacesIERC1155SafeTransferFromRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC1155Api.InterfacesIERC1155SafeTransferFrom: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC1155SafeTransferFromWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC1155.safeTransferFrom
    ApiResponse<InterfacesIERC1155SafeTransferFrom200Response> response = apiInstance.InterfacesIERC1155SafeTransferFromWithHttpInfo(networkId, address, interfacesIERC1155SafeTransferFromRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC1155Api.InterfacesIERC1155SafeTransferFromWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC1155SafeTransferFromRequest** | [**InterfacesIERC1155SafeTransferFromRequest**](InterfacesIERC1155SafeTransferFromRequest.md) |  |  |

### Return type

[**InterfacesIERC1155SafeTransferFrom200Response**](InterfacesIERC1155SafeTransferFrom200Response.md)

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

<a id="interfacesierc1155setapprovalforall"></a>
# **InterfacesIERC1155SetApprovalForAll**
> InterfacesIERC1155SetApprovalForAll200Response InterfacesIERC1155SetApprovalForAll (string networkId, string address, InterfacesIERC1155SetApprovalForAllRequest interfacesIERC1155SetApprovalForAllRequest)

IERC1155.setApprovalForAll

Write `setApprovalForAll(operator,approved)` on an instance of `IERC1155`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC1155SetApprovalForAllExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC1155Api(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC1155SetApprovalForAllRequest = new InterfacesIERC1155SetApprovalForAllRequest(); // InterfacesIERC1155SetApprovalForAllRequest | 

            try
            {
                // IERC1155.setApprovalForAll
                InterfacesIERC1155SetApprovalForAll200Response result = apiInstance.InterfacesIERC1155SetApprovalForAll(networkId, address, interfacesIERC1155SetApprovalForAllRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC1155Api.InterfacesIERC1155SetApprovalForAll: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC1155SetApprovalForAllWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC1155.setApprovalForAll
    ApiResponse<InterfacesIERC1155SetApprovalForAll200Response> response = apiInstance.InterfacesIERC1155SetApprovalForAllWithHttpInfo(networkId, address, interfacesIERC1155SetApprovalForAllRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC1155Api.InterfacesIERC1155SetApprovalForAllWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC1155SetApprovalForAllRequest** | [**InterfacesIERC1155SetApprovalForAllRequest**](InterfacesIERC1155SetApprovalForAllRequest.md) |  |  |

### Return type

[**InterfacesIERC1155SetApprovalForAll200Response**](InterfacesIERC1155SetApprovalForAll200Response.md)

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

<a id="interfacesierc1155supportsinterface"></a>
# **InterfacesIERC1155SupportsInterface**
> InterfacesIERC165SupportsInterface200Response InterfacesIERC1155SupportsInterface (string networkId, string address, InterfacesIERC165SupportsInterfaceRequest interfacesIERC165SupportsInterfaceRequest)

IERC1155.supportsInterface

Read `supportsInterface(interfaceId)` on an instance of `IERC1155`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC1155SupportsInterfaceExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC1155Api(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC165SupportsInterfaceRequest = new InterfacesIERC165SupportsInterfaceRequest(); // InterfacesIERC165SupportsInterfaceRequest | 

            try
            {
                // IERC1155.supportsInterface
                InterfacesIERC165SupportsInterface200Response result = apiInstance.InterfacesIERC1155SupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC1155Api.InterfacesIERC1155SupportsInterface: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC1155SupportsInterfaceWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC1155.supportsInterface
    ApiResponse<InterfacesIERC165SupportsInterface200Response> response = apiInstance.InterfacesIERC1155SupportsInterfaceWithHttpInfo(networkId, address, interfacesIERC165SupportsInterfaceRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC1155Api.InterfacesIERC1155SupportsInterfaceWithHttpInfo: " + e.Message);
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

