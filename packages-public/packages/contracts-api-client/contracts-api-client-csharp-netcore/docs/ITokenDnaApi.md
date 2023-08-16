# Org.OpenAPITools.Api.ITokenDnaApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

| Method | HTTP request | Description |
|--------|--------------|-------------|
| [**InterfacesITokenDnaGetDna**](ITokenDnaApi.md#interfacesitokendnagetdna) | **POST** /{networkId}/interface/ITokenDna/read/{address}/getDna | ITokenDna.getDna |
| [**InterfacesITokenDnaGetDnaBatch**](ITokenDnaApi.md#interfacesitokendnagetdnabatch) | **POST** /{networkId}/interface/ITokenDna/read/{address}/getDnaBatch | ITokenDna.getDnaBatch |
| [**InterfacesITokenDnaSetDna**](ITokenDnaApi.md#interfacesitokendnasetdna) | **POST** /{networkId}/interface/ITokenDna/write/{address}/setDna | ITokenDna.setDna |
| [**InterfacesITokenDnaSetDnaBatch**](ITokenDnaApi.md#interfacesitokendnasetdnabatch) | **POST** /{networkId}/interface/ITokenDna/write/{address}/setDnaBatch | ITokenDna.setDnaBatch |

<a id="interfacesitokendnagetdna"></a>
# **InterfacesITokenDnaGetDna**
> InterfacesITokenDnaGetDna200Response InterfacesITokenDnaGetDna (string networkId, string address, InterfacesIERC721GetApprovedRequest interfacesIERC721GetApprovedRequest)

ITokenDna.getDna

Read `getDna(tokenId)` on an instance of `ITokenDna`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesITokenDnaGetDnaExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new ITokenDnaApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC721GetApprovedRequest = new InterfacesIERC721GetApprovedRequest(); // InterfacesIERC721GetApprovedRequest | 

            try
            {
                // ITokenDna.getDna
                InterfacesITokenDnaGetDna200Response result = apiInstance.InterfacesITokenDnaGetDna(networkId, address, interfacesIERC721GetApprovedRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling ITokenDnaApi.InterfacesITokenDnaGetDna: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesITokenDnaGetDnaWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // ITokenDna.getDna
    ApiResponse<InterfacesITokenDnaGetDna200Response> response = apiInstance.InterfacesITokenDnaGetDnaWithHttpInfo(networkId, address, interfacesIERC721GetApprovedRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling ITokenDnaApi.InterfacesITokenDnaGetDnaWithHttpInfo: " + e.Message);
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

[**InterfacesITokenDnaGetDna200Response**](InterfacesITokenDnaGetDna200Response.md)

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

<a id="interfacesitokendnagetdnabatch"></a>
# **InterfacesITokenDnaGetDnaBatch**
> InterfacesITokenDnaGetDnaBatch200Response InterfacesITokenDnaGetDnaBatch (string networkId, string address, InterfacesITokenDnaGetDnaBatchRequest interfacesITokenDnaGetDnaBatchRequest)

ITokenDna.getDnaBatch

Read `getDnaBatch(tokenId)` on an instance of `ITokenDna`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesITokenDnaGetDnaBatchExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new ITokenDnaApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesITokenDnaGetDnaBatchRequest = new InterfacesITokenDnaGetDnaBatchRequest(); // InterfacesITokenDnaGetDnaBatchRequest | 

            try
            {
                // ITokenDna.getDnaBatch
                InterfacesITokenDnaGetDnaBatch200Response result = apiInstance.InterfacesITokenDnaGetDnaBatch(networkId, address, interfacesITokenDnaGetDnaBatchRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling ITokenDnaApi.InterfacesITokenDnaGetDnaBatch: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesITokenDnaGetDnaBatchWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // ITokenDna.getDnaBatch
    ApiResponse<InterfacesITokenDnaGetDnaBatch200Response> response = apiInstance.InterfacesITokenDnaGetDnaBatchWithHttpInfo(networkId, address, interfacesITokenDnaGetDnaBatchRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling ITokenDnaApi.InterfacesITokenDnaGetDnaBatchWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesITokenDnaGetDnaBatchRequest** | [**InterfacesITokenDnaGetDnaBatchRequest**](InterfacesITokenDnaGetDnaBatchRequest.md) |  |  |

### Return type

[**InterfacesITokenDnaGetDnaBatch200Response**](InterfacesITokenDnaGetDnaBatch200Response.md)

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

<a id="interfacesitokendnasetdna"></a>
# **InterfacesITokenDnaSetDna**
> InterfacesITokenDnaSetDna200Response InterfacesITokenDnaSetDna (string networkId, string address, InterfacesITokenDnaSetDnaRequest interfacesITokenDnaSetDnaRequest)

ITokenDna.setDna

Write `setDna(tokenId,dna)` on an instance of `ITokenDna`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesITokenDnaSetDnaExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new ITokenDnaApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesITokenDnaSetDnaRequest = new InterfacesITokenDnaSetDnaRequest(); // InterfacesITokenDnaSetDnaRequest | 

            try
            {
                // ITokenDna.setDna
                InterfacesITokenDnaSetDna200Response result = apiInstance.InterfacesITokenDnaSetDna(networkId, address, interfacesITokenDnaSetDnaRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling ITokenDnaApi.InterfacesITokenDnaSetDna: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesITokenDnaSetDnaWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // ITokenDna.setDna
    ApiResponse<InterfacesITokenDnaSetDna200Response> response = apiInstance.InterfacesITokenDnaSetDnaWithHttpInfo(networkId, address, interfacesITokenDnaSetDnaRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling ITokenDnaApi.InterfacesITokenDnaSetDnaWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesITokenDnaSetDnaRequest** | [**InterfacesITokenDnaSetDnaRequest**](InterfacesITokenDnaSetDnaRequest.md) |  |  |

### Return type

[**InterfacesITokenDnaSetDna200Response**](InterfacesITokenDnaSetDna200Response.md)

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

<a id="interfacesitokendnasetdnabatch"></a>
# **InterfacesITokenDnaSetDnaBatch**
> InterfacesITokenDnaSetDnaBatch200Response InterfacesITokenDnaSetDnaBatch (string networkId, string address, InterfacesITokenDnaSetDnaBatchRequest interfacesITokenDnaSetDnaBatchRequest)

ITokenDna.setDnaBatch

Write `setDnaBatch(tokenId,dna)` on an instance of `ITokenDna`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesITokenDnaSetDnaBatchExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new ITokenDnaApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesITokenDnaSetDnaBatchRequest = new InterfacesITokenDnaSetDnaBatchRequest(); // InterfacesITokenDnaSetDnaBatchRequest | 

            try
            {
                // ITokenDna.setDnaBatch
                InterfacesITokenDnaSetDnaBatch200Response result = apiInstance.InterfacesITokenDnaSetDnaBatch(networkId, address, interfacesITokenDnaSetDnaBatchRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling ITokenDnaApi.InterfacesITokenDnaSetDnaBatch: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesITokenDnaSetDnaBatchWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // ITokenDna.setDnaBatch
    ApiResponse<InterfacesITokenDnaSetDnaBatch200Response> response = apiInstance.InterfacesITokenDnaSetDnaBatchWithHttpInfo(networkId, address, interfacesITokenDnaSetDnaBatchRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling ITokenDnaApi.InterfacesITokenDnaSetDnaBatchWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesITokenDnaSetDnaBatchRequest** | [**InterfacesITokenDnaSetDnaBatchRequest**](InterfacesITokenDnaSetDnaBatchRequest.md) |  |  |

### Return type

[**InterfacesITokenDnaSetDnaBatch200Response**](InterfacesITokenDnaSetDnaBatch200Response.md)

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

