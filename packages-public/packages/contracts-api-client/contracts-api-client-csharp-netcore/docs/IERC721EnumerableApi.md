# Org.OpenAPITools.Api.IERC721EnumerableApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

| Method | HTTP request | Description |
|--------|--------------|-------------|
| [**InterfacesIERC721EnumerableApprove**](IERC721EnumerableApi.md#interfacesierc721enumerableapprove) | **POST** /{networkId}/interface/IERC721Enumerable/write/{address}/approve | IERC721Enumerable.approve |
| [**InterfacesIERC721EnumerableBalanceOf**](IERC721EnumerableApi.md#interfacesierc721enumerablebalanceof) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/balanceOf | IERC721Enumerable.balanceOf |
| [**InterfacesIERC721EnumerableGetApproved**](IERC721EnumerableApi.md#interfacesierc721enumerablegetapproved) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/getApproved | IERC721Enumerable.getApproved |
| [**InterfacesIERC721EnumerableIsApprovedForAll**](IERC721EnumerableApi.md#interfacesierc721enumerableisapprovedforall) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/isApprovedForAll | IERC721Enumerable.isApprovedForAll |
| [**InterfacesIERC721EnumerableOwnerOf**](IERC721EnumerableApi.md#interfacesierc721enumerableownerof) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/ownerOf | IERC721Enumerable.ownerOf |
| [**InterfacesIERC721EnumerableSafeTransferFrom**](IERC721EnumerableApi.md#interfacesierc721enumerablesafetransferfrom) | **POST** /{networkId}/interface/IERC721Enumerable/write/{address}/safeTransferFrom | IERC721Enumerable.safeTransferFrom |
| [**InterfacesIERC721EnumerableSetApprovalForAll**](IERC721EnumerableApi.md#interfacesierc721enumerablesetapprovalforall) | **POST** /{networkId}/interface/IERC721Enumerable/write/{address}/setApprovalForAll | IERC721Enumerable.setApprovalForAll |
| [**InterfacesIERC721EnumerableSupportsInterface**](IERC721EnumerableApi.md#interfacesierc721enumerablesupportsinterface) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/supportsInterface | IERC721Enumerable.supportsInterface |
| [**InterfacesIERC721EnumerableTokenByIndex**](IERC721EnumerableApi.md#interfacesierc721enumerabletokenbyindex) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/tokenByIndex | IERC721Enumerable.tokenByIndex |
| [**InterfacesIERC721EnumerableTokenOfOwnerByIndex**](IERC721EnumerableApi.md#interfacesierc721enumerabletokenofownerbyindex) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/tokenOfOwnerByIndex | IERC721Enumerable.tokenOfOwnerByIndex |
| [**InterfacesIERC721EnumerableTotalSupply**](IERC721EnumerableApi.md#interfacesierc721enumerabletotalsupply) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/totalSupply | IERC721Enumerable.totalSupply |
| [**InterfacesIERC721EnumerableTransferFrom**](IERC721EnumerableApi.md#interfacesierc721enumerabletransferfrom) | **POST** /{networkId}/interface/IERC721Enumerable/write/{address}/transferFrom | IERC721Enumerable.transferFrom |

<a id="interfacesierc721enumerableapprove"></a>
# **InterfacesIERC721EnumerableApprove**
> InterfacesIERC721Approve200Response InterfacesIERC721EnumerableApprove (string networkId, string address, InterfacesIERC721ApproveRequest interfacesIERC721ApproveRequest)

IERC721Enumerable.approve

Write `approve(to,tokenId)` on an instance of `IERC721Enumerable`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC721EnumerableApproveExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC721EnumerableApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC721ApproveRequest = new InterfacesIERC721ApproveRequest(); // InterfacesIERC721ApproveRequest | 

            try
            {
                // IERC721Enumerable.approve
                InterfacesIERC721Approve200Response result = apiInstance.InterfacesIERC721EnumerableApprove(networkId, address, interfacesIERC721ApproveRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC721EnumerableApi.InterfacesIERC721EnumerableApprove: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC721EnumerableApproveWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC721Enumerable.approve
    ApiResponse<InterfacesIERC721Approve200Response> response = apiInstance.InterfacesIERC721EnumerableApproveWithHttpInfo(networkId, address, interfacesIERC721ApproveRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC721EnumerableApi.InterfacesIERC721EnumerableApproveWithHttpInfo: " + e.Message);
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

<a id="interfacesierc721enumerablebalanceof"></a>
# **InterfacesIERC721EnumerableBalanceOf**
> InterfacesIERC721BalanceOf200Response InterfacesIERC721EnumerableBalanceOf (string networkId, string address, InterfacesIERC721BalanceOfRequest interfacesIERC721BalanceOfRequest)

IERC721Enumerable.balanceOf

Read `balanceOf(owner)` on an instance of `IERC721Enumerable`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC721EnumerableBalanceOfExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC721EnumerableApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC721BalanceOfRequest = new InterfacesIERC721BalanceOfRequest(); // InterfacesIERC721BalanceOfRequest | 

            try
            {
                // IERC721Enumerable.balanceOf
                InterfacesIERC721BalanceOf200Response result = apiInstance.InterfacesIERC721EnumerableBalanceOf(networkId, address, interfacesIERC721BalanceOfRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC721EnumerableApi.InterfacesIERC721EnumerableBalanceOf: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC721EnumerableBalanceOfWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC721Enumerable.balanceOf
    ApiResponse<InterfacesIERC721BalanceOf200Response> response = apiInstance.InterfacesIERC721EnumerableBalanceOfWithHttpInfo(networkId, address, interfacesIERC721BalanceOfRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC721EnumerableApi.InterfacesIERC721EnumerableBalanceOfWithHttpInfo: " + e.Message);
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

<a id="interfacesierc721enumerablegetapproved"></a>
# **InterfacesIERC721EnumerableGetApproved**
> InterfacesIERC721GetApproved200Response InterfacesIERC721EnumerableGetApproved (string networkId, string address, InterfacesIERC721GetApprovedRequest interfacesIERC721GetApprovedRequest)

IERC721Enumerable.getApproved

Read `getApproved(tokenId)` on an instance of `IERC721Enumerable`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC721EnumerableGetApprovedExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC721EnumerableApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC721GetApprovedRequest = new InterfacesIERC721GetApprovedRequest(); // InterfacesIERC721GetApprovedRequest | 

            try
            {
                // IERC721Enumerable.getApproved
                InterfacesIERC721GetApproved200Response result = apiInstance.InterfacesIERC721EnumerableGetApproved(networkId, address, interfacesIERC721GetApprovedRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC721EnumerableApi.InterfacesIERC721EnumerableGetApproved: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC721EnumerableGetApprovedWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC721Enumerable.getApproved
    ApiResponse<InterfacesIERC721GetApproved200Response> response = apiInstance.InterfacesIERC721EnumerableGetApprovedWithHttpInfo(networkId, address, interfacesIERC721GetApprovedRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC721EnumerableApi.InterfacesIERC721EnumerableGetApprovedWithHttpInfo: " + e.Message);
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

<a id="interfacesierc721enumerableisapprovedforall"></a>
# **InterfacesIERC721EnumerableIsApprovedForAll**
> InterfacesIERC721IsApprovedForAll200Response InterfacesIERC721EnumerableIsApprovedForAll (string networkId, string address, InterfacesIERC721IsApprovedForAllRequest interfacesIERC721IsApprovedForAllRequest)

IERC721Enumerable.isApprovedForAll

Read `isApprovedForAll(owner,operator)` on an instance of `IERC721Enumerable`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC721EnumerableIsApprovedForAllExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC721EnumerableApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC721IsApprovedForAllRequest = new InterfacesIERC721IsApprovedForAllRequest(); // InterfacesIERC721IsApprovedForAllRequest | 

            try
            {
                // IERC721Enumerable.isApprovedForAll
                InterfacesIERC721IsApprovedForAll200Response result = apiInstance.InterfacesIERC721EnumerableIsApprovedForAll(networkId, address, interfacesIERC721IsApprovedForAllRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC721EnumerableApi.InterfacesIERC721EnumerableIsApprovedForAll: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC721EnumerableIsApprovedForAllWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC721Enumerable.isApprovedForAll
    ApiResponse<InterfacesIERC721IsApprovedForAll200Response> response = apiInstance.InterfacesIERC721EnumerableIsApprovedForAllWithHttpInfo(networkId, address, interfacesIERC721IsApprovedForAllRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC721EnumerableApi.InterfacesIERC721EnumerableIsApprovedForAllWithHttpInfo: " + e.Message);
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

<a id="interfacesierc721enumerableownerof"></a>
# **InterfacesIERC721EnumerableOwnerOf**
> InterfacesIERC721OwnerOf200Response InterfacesIERC721EnumerableOwnerOf (string networkId, string address, InterfacesIERC721GetApprovedRequest interfacesIERC721GetApprovedRequest)

IERC721Enumerable.ownerOf

Read `ownerOf(tokenId)` on an instance of `IERC721Enumerable`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC721EnumerableOwnerOfExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC721EnumerableApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC721GetApprovedRequest = new InterfacesIERC721GetApprovedRequest(); // InterfacesIERC721GetApprovedRequest | 

            try
            {
                // IERC721Enumerable.ownerOf
                InterfacesIERC721OwnerOf200Response result = apiInstance.InterfacesIERC721EnumerableOwnerOf(networkId, address, interfacesIERC721GetApprovedRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC721EnumerableApi.InterfacesIERC721EnumerableOwnerOf: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC721EnumerableOwnerOfWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC721Enumerable.ownerOf
    ApiResponse<InterfacesIERC721OwnerOf200Response> response = apiInstance.InterfacesIERC721EnumerableOwnerOfWithHttpInfo(networkId, address, interfacesIERC721GetApprovedRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC721EnumerableApi.InterfacesIERC721EnumerableOwnerOfWithHttpInfo: " + e.Message);
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

<a id="interfacesierc721enumerablesafetransferfrom"></a>
# **InterfacesIERC721EnumerableSafeTransferFrom**
> InterfacesIERC721SafeTransferFrom200Response InterfacesIERC721EnumerableSafeTransferFrom (string networkId, string address, InterfacesIERC721SafeTransferFromRequest interfacesIERC721SafeTransferFromRequest)

IERC721Enumerable.safeTransferFrom

Write `safeTransferFrom(from,to,tokenId,data)` on an instance of `IERC721Enumerable`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC721EnumerableSafeTransferFromExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC721EnumerableApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC721SafeTransferFromRequest = new InterfacesIERC721SafeTransferFromRequest(); // InterfacesIERC721SafeTransferFromRequest | 

            try
            {
                // IERC721Enumerable.safeTransferFrom
                InterfacesIERC721SafeTransferFrom200Response result = apiInstance.InterfacesIERC721EnumerableSafeTransferFrom(networkId, address, interfacesIERC721SafeTransferFromRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC721EnumerableApi.InterfacesIERC721EnumerableSafeTransferFrom: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC721EnumerableSafeTransferFromWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC721Enumerable.safeTransferFrom
    ApiResponse<InterfacesIERC721SafeTransferFrom200Response> response = apiInstance.InterfacesIERC721EnumerableSafeTransferFromWithHttpInfo(networkId, address, interfacesIERC721SafeTransferFromRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC721EnumerableApi.InterfacesIERC721EnumerableSafeTransferFromWithHttpInfo: " + e.Message);
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

<a id="interfacesierc721enumerablesetapprovalforall"></a>
# **InterfacesIERC721EnumerableSetApprovalForAll**
> InterfacesIERC721SetApprovalForAll200Response InterfacesIERC721EnumerableSetApprovalForAll (string networkId, string address, InterfacesIERC721SetApprovalForAllRequest interfacesIERC721SetApprovalForAllRequest)

IERC721Enumerable.setApprovalForAll

Write `setApprovalForAll(operator,_approved)` on an instance of `IERC721Enumerable`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC721EnumerableSetApprovalForAllExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC721EnumerableApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC721SetApprovalForAllRequest = new InterfacesIERC721SetApprovalForAllRequest(); // InterfacesIERC721SetApprovalForAllRequest | 

            try
            {
                // IERC721Enumerable.setApprovalForAll
                InterfacesIERC721SetApprovalForAll200Response result = apiInstance.InterfacesIERC721EnumerableSetApprovalForAll(networkId, address, interfacesIERC721SetApprovalForAllRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC721EnumerableApi.InterfacesIERC721EnumerableSetApprovalForAll: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC721EnumerableSetApprovalForAllWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC721Enumerable.setApprovalForAll
    ApiResponse<InterfacesIERC721SetApprovalForAll200Response> response = apiInstance.InterfacesIERC721EnumerableSetApprovalForAllWithHttpInfo(networkId, address, interfacesIERC721SetApprovalForAllRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC721EnumerableApi.InterfacesIERC721EnumerableSetApprovalForAllWithHttpInfo: " + e.Message);
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

<a id="interfacesierc721enumerablesupportsinterface"></a>
# **InterfacesIERC721EnumerableSupportsInterface**
> InterfacesIERC165SupportsInterface200Response InterfacesIERC721EnumerableSupportsInterface (string networkId, string address, InterfacesIERC165SupportsInterfaceRequest interfacesIERC165SupportsInterfaceRequest)

IERC721Enumerable.supportsInterface

Read `supportsInterface(interfaceId)` on an instance of `IERC721Enumerable`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC721EnumerableSupportsInterfaceExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC721EnumerableApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC165SupportsInterfaceRequest = new InterfacesIERC165SupportsInterfaceRequest(); // InterfacesIERC165SupportsInterfaceRequest | 

            try
            {
                // IERC721Enumerable.supportsInterface
                InterfacesIERC165SupportsInterface200Response result = apiInstance.InterfacesIERC721EnumerableSupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC721EnumerableApi.InterfacesIERC721EnumerableSupportsInterface: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC721EnumerableSupportsInterfaceWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC721Enumerable.supportsInterface
    ApiResponse<InterfacesIERC165SupportsInterface200Response> response = apiInstance.InterfacesIERC721EnumerableSupportsInterfaceWithHttpInfo(networkId, address, interfacesIERC165SupportsInterfaceRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC721EnumerableApi.InterfacesIERC721EnumerableSupportsInterfaceWithHttpInfo: " + e.Message);
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

<a id="interfacesierc721enumerabletokenbyindex"></a>
# **InterfacesIERC721EnumerableTokenByIndex**
> InterfacesIERC721EnumerableTokenByIndex200Response InterfacesIERC721EnumerableTokenByIndex (string networkId, string address, InterfacesIERC721EnumerableTokenByIndexRequest interfacesIERC721EnumerableTokenByIndexRequest)

IERC721Enumerable.tokenByIndex

Read `tokenByIndex(index)` on an instance of `IERC721Enumerable`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC721EnumerableTokenByIndexExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC721EnumerableApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC721EnumerableTokenByIndexRequest = new InterfacesIERC721EnumerableTokenByIndexRequest(); // InterfacesIERC721EnumerableTokenByIndexRequest | 

            try
            {
                // IERC721Enumerable.tokenByIndex
                InterfacesIERC721EnumerableTokenByIndex200Response result = apiInstance.InterfacesIERC721EnumerableTokenByIndex(networkId, address, interfacesIERC721EnumerableTokenByIndexRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC721EnumerableApi.InterfacesIERC721EnumerableTokenByIndex: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC721EnumerableTokenByIndexWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC721Enumerable.tokenByIndex
    ApiResponse<InterfacesIERC721EnumerableTokenByIndex200Response> response = apiInstance.InterfacesIERC721EnumerableTokenByIndexWithHttpInfo(networkId, address, interfacesIERC721EnumerableTokenByIndexRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC721EnumerableApi.InterfacesIERC721EnumerableTokenByIndexWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC721EnumerableTokenByIndexRequest** | [**InterfacesIERC721EnumerableTokenByIndexRequest**](InterfacesIERC721EnumerableTokenByIndexRequest.md) |  |  |

### Return type

[**InterfacesIERC721EnumerableTokenByIndex200Response**](InterfacesIERC721EnumerableTokenByIndex200Response.md)

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

<a id="interfacesierc721enumerabletokenofownerbyindex"></a>
# **InterfacesIERC721EnumerableTokenOfOwnerByIndex**
> InterfacesIERC721EnumerableTokenOfOwnerByIndex200Response InterfacesIERC721EnumerableTokenOfOwnerByIndex (string networkId, string address, InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest interfacesIERC721EnumerableTokenOfOwnerByIndexRequest)

IERC721Enumerable.tokenOfOwnerByIndex

Read `tokenOfOwnerByIndex(owner,index)` on an instance of `IERC721Enumerable`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC721EnumerableTokenOfOwnerByIndexExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC721EnumerableApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC721EnumerableTokenOfOwnerByIndexRequest = new InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest(); // InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest | 

            try
            {
                // IERC721Enumerable.tokenOfOwnerByIndex
                InterfacesIERC721EnumerableTokenOfOwnerByIndex200Response result = apiInstance.InterfacesIERC721EnumerableTokenOfOwnerByIndex(networkId, address, interfacesIERC721EnumerableTokenOfOwnerByIndexRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC721EnumerableApi.InterfacesIERC721EnumerableTokenOfOwnerByIndex: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC721EnumerableTokenOfOwnerByIndexWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC721Enumerable.tokenOfOwnerByIndex
    ApiResponse<InterfacesIERC721EnumerableTokenOfOwnerByIndex200Response> response = apiInstance.InterfacesIERC721EnumerableTokenOfOwnerByIndexWithHttpInfo(networkId, address, interfacesIERC721EnumerableTokenOfOwnerByIndexRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC721EnumerableApi.InterfacesIERC721EnumerableTokenOfOwnerByIndexWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC721EnumerableTokenOfOwnerByIndexRequest** | [**InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest**](InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest.md) |  |  |

### Return type

[**InterfacesIERC721EnumerableTokenOfOwnerByIndex200Response**](InterfacesIERC721EnumerableTokenOfOwnerByIndex200Response.md)

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

<a id="interfacesierc721enumerabletotalsupply"></a>
# **InterfacesIERC721EnumerableTotalSupply**
> InterfacesIERC20TotalSupply200Response InterfacesIERC721EnumerableTotalSupply (string networkId, string address, InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest)

IERC721Enumerable.totalSupply

Read `totalSupply()` on an instance of `IERC721Enumerable`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC721EnumerableTotalSupplyExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC721EnumerableApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIBeaconImplementationRequest = new InterfacesIBeaconImplementationRequest(); // InterfacesIBeaconImplementationRequest | 

            try
            {
                // IERC721Enumerable.totalSupply
                InterfacesIERC20TotalSupply200Response result = apiInstance.InterfacesIERC721EnumerableTotalSupply(networkId, address, interfacesIBeaconImplementationRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC721EnumerableApi.InterfacesIERC721EnumerableTotalSupply: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC721EnumerableTotalSupplyWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC721Enumerable.totalSupply
    ApiResponse<InterfacesIERC20TotalSupply200Response> response = apiInstance.InterfacesIERC721EnumerableTotalSupplyWithHttpInfo(networkId, address, interfacesIBeaconImplementationRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC721EnumerableApi.InterfacesIERC721EnumerableTotalSupplyWithHttpInfo: " + e.Message);
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

[**InterfacesIERC20TotalSupply200Response**](InterfacesIERC20TotalSupply200Response.md)

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

<a id="interfacesierc721enumerabletransferfrom"></a>
# **InterfacesIERC721EnumerableTransferFrom**
> InterfacesIERC721TransferFrom200Response InterfacesIERC721EnumerableTransferFrom (string networkId, string address, InterfacesIERC721TransferFromRequest interfacesIERC721TransferFromRequest)

IERC721Enumerable.transferFrom

Write `transferFrom(from,to,tokenId)` on an instance of `IERC721Enumerable`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC721EnumerableTransferFromExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC721EnumerableApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC721TransferFromRequest = new InterfacesIERC721TransferFromRequest(); // InterfacesIERC721TransferFromRequest | 

            try
            {
                // IERC721Enumerable.transferFrom
                InterfacesIERC721TransferFrom200Response result = apiInstance.InterfacesIERC721EnumerableTransferFrom(networkId, address, interfacesIERC721TransferFromRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC721EnumerableApi.InterfacesIERC721EnumerableTransferFrom: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC721EnumerableTransferFromWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC721Enumerable.transferFrom
    ApiResponse<InterfacesIERC721TransferFrom200Response> response = apiInstance.InterfacesIERC721EnumerableTransferFromWithHttpInfo(networkId, address, interfacesIERC721TransferFromRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC721EnumerableApi.InterfacesIERC721EnumerableTransferFromWithHttpInfo: " + e.Message);
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

