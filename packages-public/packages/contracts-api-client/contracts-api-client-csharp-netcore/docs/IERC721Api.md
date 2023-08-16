# Org.OpenAPITools.Api.IERC721Api

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

| Method | HTTP request | Description |
|--------|--------------|-------------|
| [**InterfacesIERC721Approve**](IERC721Api.md#interfacesierc721approve) | **POST** /{networkId}/interface/IERC721/write/{address}/approve | IERC721.approve |
| [**InterfacesIERC721BalanceOf**](IERC721Api.md#interfacesierc721balanceof) | **POST** /{networkId}/interface/IERC721/read/{address}/balanceOf | IERC721.balanceOf |
| [**InterfacesIERC721GetApproved**](IERC721Api.md#interfacesierc721getapproved) | **POST** /{networkId}/interface/IERC721/read/{address}/getApproved | IERC721.getApproved |
| [**InterfacesIERC721IsApprovedForAll**](IERC721Api.md#interfacesierc721isapprovedforall) | **POST** /{networkId}/interface/IERC721/read/{address}/isApprovedForAll | IERC721.isApprovedForAll |
| [**InterfacesIERC721OwnerOf**](IERC721Api.md#interfacesierc721ownerof) | **POST** /{networkId}/interface/IERC721/read/{address}/ownerOf | IERC721.ownerOf |
| [**InterfacesIERC721SafeTransferFrom**](IERC721Api.md#interfacesierc721safetransferfrom) | **POST** /{networkId}/interface/IERC721/write/{address}/safeTransferFrom | IERC721.safeTransferFrom |
| [**InterfacesIERC721SetApprovalForAll**](IERC721Api.md#interfacesierc721setapprovalforall) | **POST** /{networkId}/interface/IERC721/write/{address}/setApprovalForAll | IERC721.setApprovalForAll |
| [**InterfacesIERC721SupportsInterface**](IERC721Api.md#interfacesierc721supportsinterface) | **POST** /{networkId}/interface/IERC721/read/{address}/supportsInterface | IERC721.supportsInterface |
| [**InterfacesIERC721TransferFrom**](IERC721Api.md#interfacesierc721transferfrom) | **POST** /{networkId}/interface/IERC721/write/{address}/transferFrom | IERC721.transferFrom |

<a id="interfacesierc721approve"></a>
# **InterfacesIERC721Approve**
> InterfacesIERC721Approve200Response InterfacesIERC721Approve (string networkId, string address, InterfacesIERC721ApproveRequest interfacesIERC721ApproveRequest)

IERC721.approve

Write `approve(to,tokenId)` on an instance of `IERC721`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC721ApproveExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC721Api(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC721ApproveRequest = new InterfacesIERC721ApproveRequest(); // InterfacesIERC721ApproveRequest | 

            try
            {
                // IERC721.approve
                InterfacesIERC721Approve200Response result = apiInstance.InterfacesIERC721Approve(networkId, address, interfacesIERC721ApproveRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC721Api.InterfacesIERC721Approve: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC721ApproveWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC721.approve
    ApiResponse<InterfacesIERC721Approve200Response> response = apiInstance.InterfacesIERC721ApproveWithHttpInfo(networkId, address, interfacesIERC721ApproveRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC721Api.InterfacesIERC721ApproveWithHttpInfo: " + e.Message);
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

<a id="interfacesierc721balanceof"></a>
# **InterfacesIERC721BalanceOf**
> InterfacesIERC721BalanceOf200Response InterfacesIERC721BalanceOf (string networkId, string address, InterfacesIERC721BalanceOfRequest interfacesIERC721BalanceOfRequest)

IERC721.balanceOf

Read `balanceOf(owner)` on an instance of `IERC721`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC721BalanceOfExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC721Api(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC721BalanceOfRequest = new InterfacesIERC721BalanceOfRequest(); // InterfacesIERC721BalanceOfRequest | 

            try
            {
                // IERC721.balanceOf
                InterfacesIERC721BalanceOf200Response result = apiInstance.InterfacesIERC721BalanceOf(networkId, address, interfacesIERC721BalanceOfRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC721Api.InterfacesIERC721BalanceOf: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC721BalanceOfWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC721.balanceOf
    ApiResponse<InterfacesIERC721BalanceOf200Response> response = apiInstance.InterfacesIERC721BalanceOfWithHttpInfo(networkId, address, interfacesIERC721BalanceOfRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC721Api.InterfacesIERC721BalanceOfWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC721BalanceOfRequest** | [**InterfacesIERC721BalanceOfRequest**](InterfacesIERC721BalanceOfRequest.md) |  |  |

### Return type

[**InterfacesIERC721BalanceOf200Response**](InterfacesIERC721BalanceOf200Response.md)

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

<a id="interfacesierc721getapproved"></a>
# **InterfacesIERC721GetApproved**
> InterfacesIERC721GetApproved200Response InterfacesIERC721GetApproved (string networkId, string address, InterfacesIERC721GetApprovedRequest interfacesIERC721GetApprovedRequest)

IERC721.getApproved

Read `getApproved(tokenId)` on an instance of `IERC721`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC721GetApprovedExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC721Api(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC721GetApprovedRequest = new InterfacesIERC721GetApprovedRequest(); // InterfacesIERC721GetApprovedRequest | 

            try
            {
                // IERC721.getApproved
                InterfacesIERC721GetApproved200Response result = apiInstance.InterfacesIERC721GetApproved(networkId, address, interfacesIERC721GetApprovedRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC721Api.InterfacesIERC721GetApproved: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC721GetApprovedWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC721.getApproved
    ApiResponse<InterfacesIERC721GetApproved200Response> response = apiInstance.InterfacesIERC721GetApprovedWithHttpInfo(networkId, address, interfacesIERC721GetApprovedRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC721Api.InterfacesIERC721GetApprovedWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC721GetApprovedRequest** | [**InterfacesIERC721GetApprovedRequest**](InterfacesIERC721GetApprovedRequest.md) |  |  |

### Return type

[**InterfacesIERC721GetApproved200Response**](InterfacesIERC721GetApproved200Response.md)

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

<a id="interfacesierc721isapprovedforall"></a>
# **InterfacesIERC721IsApprovedForAll**
> InterfacesIERC721IsApprovedForAll200Response InterfacesIERC721IsApprovedForAll (string networkId, string address, InterfacesIERC721IsApprovedForAllRequest interfacesIERC721IsApprovedForAllRequest)

IERC721.isApprovedForAll

Read `isApprovedForAll(owner,operator)` on an instance of `IERC721`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC721IsApprovedForAllExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC721Api(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC721IsApprovedForAllRequest = new InterfacesIERC721IsApprovedForAllRequest(); // InterfacesIERC721IsApprovedForAllRequest | 

            try
            {
                // IERC721.isApprovedForAll
                InterfacesIERC721IsApprovedForAll200Response result = apiInstance.InterfacesIERC721IsApprovedForAll(networkId, address, interfacesIERC721IsApprovedForAllRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC721Api.InterfacesIERC721IsApprovedForAll: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC721IsApprovedForAllWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC721.isApprovedForAll
    ApiResponse<InterfacesIERC721IsApprovedForAll200Response> response = apiInstance.InterfacesIERC721IsApprovedForAllWithHttpInfo(networkId, address, interfacesIERC721IsApprovedForAllRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC721Api.InterfacesIERC721IsApprovedForAllWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC721IsApprovedForAllRequest** | [**InterfacesIERC721IsApprovedForAllRequest**](InterfacesIERC721IsApprovedForAllRequest.md) |  |  |

### Return type

[**InterfacesIERC721IsApprovedForAll200Response**](InterfacesIERC721IsApprovedForAll200Response.md)

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

<a id="interfacesierc721ownerof"></a>
# **InterfacesIERC721OwnerOf**
> InterfacesIERC721OwnerOf200Response InterfacesIERC721OwnerOf (string networkId, string address, InterfacesIERC721GetApprovedRequest interfacesIERC721GetApprovedRequest)

IERC721.ownerOf

Read `ownerOf(tokenId)` on an instance of `IERC721`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC721OwnerOfExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC721Api(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC721GetApprovedRequest = new InterfacesIERC721GetApprovedRequest(); // InterfacesIERC721GetApprovedRequest | 

            try
            {
                // IERC721.ownerOf
                InterfacesIERC721OwnerOf200Response result = apiInstance.InterfacesIERC721OwnerOf(networkId, address, interfacesIERC721GetApprovedRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC721Api.InterfacesIERC721OwnerOf: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC721OwnerOfWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC721.ownerOf
    ApiResponse<InterfacesIERC721OwnerOf200Response> response = apiInstance.InterfacesIERC721OwnerOfWithHttpInfo(networkId, address, interfacesIERC721GetApprovedRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC721Api.InterfacesIERC721OwnerOfWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC721GetApprovedRequest** | [**InterfacesIERC721GetApprovedRequest**](InterfacesIERC721GetApprovedRequest.md) |  |  |

### Return type

[**InterfacesIERC721OwnerOf200Response**](InterfacesIERC721OwnerOf200Response.md)

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

<a id="interfacesierc721safetransferfrom"></a>
# **InterfacesIERC721SafeTransferFrom**
> InterfacesIERC721SafeTransferFrom200Response InterfacesIERC721SafeTransferFrom (string networkId, string address, InterfacesIERC721SafeTransferFromRequest interfacesIERC721SafeTransferFromRequest)

IERC721.safeTransferFrom

Write `safeTransferFrom(from,to,tokenId,data)` on an instance of `IERC721`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC721SafeTransferFromExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC721Api(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC721SafeTransferFromRequest = new InterfacesIERC721SafeTransferFromRequest(); // InterfacesIERC721SafeTransferFromRequest | 

            try
            {
                // IERC721.safeTransferFrom
                InterfacesIERC721SafeTransferFrom200Response result = apiInstance.InterfacesIERC721SafeTransferFrom(networkId, address, interfacesIERC721SafeTransferFromRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC721Api.InterfacesIERC721SafeTransferFrom: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC721SafeTransferFromWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC721.safeTransferFrom
    ApiResponse<InterfacesIERC721SafeTransferFrom200Response> response = apiInstance.InterfacesIERC721SafeTransferFromWithHttpInfo(networkId, address, interfacesIERC721SafeTransferFromRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC721Api.InterfacesIERC721SafeTransferFromWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC721SafeTransferFromRequest** | [**InterfacesIERC721SafeTransferFromRequest**](InterfacesIERC721SafeTransferFromRequest.md) |  |  |

### Return type

[**InterfacesIERC721SafeTransferFrom200Response**](InterfacesIERC721SafeTransferFrom200Response.md)

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

<a id="interfacesierc721setapprovalforall"></a>
# **InterfacesIERC721SetApprovalForAll**
> InterfacesIERC721SetApprovalForAll200Response InterfacesIERC721SetApprovalForAll (string networkId, string address, InterfacesIERC721SetApprovalForAllRequest interfacesIERC721SetApprovalForAllRequest)

IERC721.setApprovalForAll

Write `setApprovalForAll(operator,_approved)` on an instance of `IERC721`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC721SetApprovalForAllExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC721Api(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC721SetApprovalForAllRequest = new InterfacesIERC721SetApprovalForAllRequest(); // InterfacesIERC721SetApprovalForAllRequest | 

            try
            {
                // IERC721.setApprovalForAll
                InterfacesIERC721SetApprovalForAll200Response result = apiInstance.InterfacesIERC721SetApprovalForAll(networkId, address, interfacesIERC721SetApprovalForAllRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC721Api.InterfacesIERC721SetApprovalForAll: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC721SetApprovalForAllWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC721.setApprovalForAll
    ApiResponse<InterfacesIERC721SetApprovalForAll200Response> response = apiInstance.InterfacesIERC721SetApprovalForAllWithHttpInfo(networkId, address, interfacesIERC721SetApprovalForAllRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC721Api.InterfacesIERC721SetApprovalForAllWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC721SetApprovalForAllRequest** | [**InterfacesIERC721SetApprovalForAllRequest**](InterfacesIERC721SetApprovalForAllRequest.md) |  |  |

### Return type

[**InterfacesIERC721SetApprovalForAll200Response**](InterfacesIERC721SetApprovalForAll200Response.md)

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

<a id="interfacesierc721supportsinterface"></a>
# **InterfacesIERC721SupportsInterface**
> InterfacesIERC165SupportsInterface200Response InterfacesIERC721SupportsInterface (string networkId, string address, InterfacesIERC165SupportsInterfaceRequest interfacesIERC165SupportsInterfaceRequest)

IERC721.supportsInterface

Read `supportsInterface(interfaceId)` on an instance of `IERC721`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC721SupportsInterfaceExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC721Api(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC165SupportsInterfaceRequest = new InterfacesIERC165SupportsInterfaceRequest(); // InterfacesIERC165SupportsInterfaceRequest | 

            try
            {
                // IERC721.supportsInterface
                InterfacesIERC165SupportsInterface200Response result = apiInstance.InterfacesIERC721SupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC721Api.InterfacesIERC721SupportsInterface: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC721SupportsInterfaceWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC721.supportsInterface
    ApiResponse<InterfacesIERC165SupportsInterface200Response> response = apiInstance.InterfacesIERC721SupportsInterfaceWithHttpInfo(networkId, address, interfacesIERC165SupportsInterfaceRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC721Api.InterfacesIERC721SupportsInterfaceWithHttpInfo: " + e.Message);
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

<a id="interfacesierc721transferfrom"></a>
# **InterfacesIERC721TransferFrom**
> InterfacesIERC721TransferFrom200Response InterfacesIERC721TransferFrom (string networkId, string address, InterfacesIERC721TransferFromRequest interfacesIERC721TransferFromRequest)

IERC721.transferFrom

Write `transferFrom(from,to,tokenId)` on an instance of `IERC721`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC721TransferFromExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC721Api(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC721TransferFromRequest = new InterfacesIERC721TransferFromRequest(); // InterfacesIERC721TransferFromRequest | 

            try
            {
                // IERC721.transferFrom
                InterfacesIERC721TransferFrom200Response result = apiInstance.InterfacesIERC721TransferFrom(networkId, address, interfacesIERC721TransferFromRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC721Api.InterfacesIERC721TransferFrom: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC721TransferFromWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC721.transferFrom
    ApiResponse<InterfacesIERC721TransferFrom200Response> response = apiInstance.InterfacesIERC721TransferFromWithHttpInfo(networkId, address, interfacesIERC721TransferFromRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC721Api.InterfacesIERC721TransferFromWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC721TransferFromRequest** | [**InterfacesIERC721TransferFromRequest**](InterfacesIERC721TransferFromRequest.md) |  |  |

### Return type

[**InterfacesIERC721TransferFrom200Response**](InterfacesIERC721TransferFrom200Response.md)

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

