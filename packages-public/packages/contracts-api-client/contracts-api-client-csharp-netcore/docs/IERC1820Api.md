# Org.OpenAPITools.Api.IERC1820Api

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

| Method | HTTP request | Description |
|--------|--------------|-------------|
| [**InterfacesIERC1820GetInterfaceImplementer**](IERC1820Api.md#interfacesierc1820getinterfaceimplementer) | **POST** /{networkId}/interface/IERC1820/read/{address}/getInterfaceImplementer | IERC1820.getInterfaceImplementer |
| [**InterfacesIERC1820GetManager**](IERC1820Api.md#interfacesierc1820getmanager) | **POST** /{networkId}/interface/IERC1820/read/{address}/getManager | IERC1820.getManager |
| [**InterfacesIERC1820ImplementsERC165Interface**](IERC1820Api.md#interfacesierc1820implementserc165interface) | **POST** /{networkId}/interface/IERC1820/read/{address}/implementsERC165Interface | IERC1820.implementsERC165Interface |
| [**InterfacesIERC1820ImplementsERC165InterfaceNoCache**](IERC1820Api.md#interfacesierc1820implementserc165interfacenocache) | **POST** /{networkId}/interface/IERC1820/read/{address}/implementsERC165InterfaceNoCache | IERC1820.implementsERC165InterfaceNoCache |
| [**InterfacesIERC1820InterfaceHash**](IERC1820Api.md#interfacesierc1820interfacehash) | **POST** /{networkId}/interface/IERC1820/read/{address}/interfaceHash | IERC1820.interfaceHash |
| [**InterfacesIERC1820SetInterfaceImplementer**](IERC1820Api.md#interfacesierc1820setinterfaceimplementer) | **POST** /{networkId}/interface/IERC1820/write/{address}/setInterfaceImplementer | IERC1820.setInterfaceImplementer |
| [**InterfacesIERC1820SetManager**](IERC1820Api.md#interfacesierc1820setmanager) | **POST** /{networkId}/interface/IERC1820/write/{address}/setManager | IERC1820.setManager |
| [**InterfacesIERC1820UpdateERC165Cache**](IERC1820Api.md#interfacesierc1820updateerc165cache) | **POST** /{networkId}/interface/IERC1820/write/{address}/updateERC165Cache | IERC1820.updateERC165Cache |

<a id="interfacesierc1820getinterfaceimplementer"></a>
# **InterfacesIERC1820GetInterfaceImplementer**
> InterfacesIERC1820GetInterfaceImplementer200Response InterfacesIERC1820GetInterfaceImplementer (string networkId, string address, InterfacesIERC1820GetInterfaceImplementerRequest interfacesIERC1820GetInterfaceImplementerRequest)

IERC1820.getInterfaceImplementer

Read `getInterfaceImplementer(account,_interfaceHash)` on an instance of `IERC1820`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC1820GetInterfaceImplementerExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC1820Api(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC1820GetInterfaceImplementerRequest = new InterfacesIERC1820GetInterfaceImplementerRequest(); // InterfacesIERC1820GetInterfaceImplementerRequest | 

            try
            {
                // IERC1820.getInterfaceImplementer
                InterfacesIERC1820GetInterfaceImplementer200Response result = apiInstance.InterfacesIERC1820GetInterfaceImplementer(networkId, address, interfacesIERC1820GetInterfaceImplementerRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC1820Api.InterfacesIERC1820GetInterfaceImplementer: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC1820GetInterfaceImplementerWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC1820.getInterfaceImplementer
    ApiResponse<InterfacesIERC1820GetInterfaceImplementer200Response> response = apiInstance.InterfacesIERC1820GetInterfaceImplementerWithHttpInfo(networkId, address, interfacesIERC1820GetInterfaceImplementerRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC1820Api.InterfacesIERC1820GetInterfaceImplementerWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC1820GetInterfaceImplementerRequest** | [**InterfacesIERC1820GetInterfaceImplementerRequest**](InterfacesIERC1820GetInterfaceImplementerRequest.md) |  |  |

### Return type

[**InterfacesIERC1820GetInterfaceImplementer200Response**](InterfacesIERC1820GetInterfaceImplementer200Response.md)

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

<a id="interfacesierc1820getmanager"></a>
# **InterfacesIERC1820GetManager**
> InterfacesIERC1820GetManager200Response InterfacesIERC1820GetManager (string networkId, string address, InterfacesIERC1820GetManagerRequest interfacesIERC1820GetManagerRequest)

IERC1820.getManager

Read `getManager(account)` on an instance of `IERC1820`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC1820GetManagerExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC1820Api(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC1820GetManagerRequest = new InterfacesIERC1820GetManagerRequest(); // InterfacesIERC1820GetManagerRequest | 

            try
            {
                // IERC1820.getManager
                InterfacesIERC1820GetManager200Response result = apiInstance.InterfacesIERC1820GetManager(networkId, address, interfacesIERC1820GetManagerRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC1820Api.InterfacesIERC1820GetManager: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC1820GetManagerWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC1820.getManager
    ApiResponse<InterfacesIERC1820GetManager200Response> response = apiInstance.InterfacesIERC1820GetManagerWithHttpInfo(networkId, address, interfacesIERC1820GetManagerRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC1820Api.InterfacesIERC1820GetManagerWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC1820GetManagerRequest** | [**InterfacesIERC1820GetManagerRequest**](InterfacesIERC1820GetManagerRequest.md) |  |  |

### Return type

[**InterfacesIERC1820GetManager200Response**](InterfacesIERC1820GetManager200Response.md)

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

<a id="interfacesierc1820implementserc165interface"></a>
# **InterfacesIERC1820ImplementsERC165Interface**
> InterfacesIERC1820ImplementsERC165Interface200Response InterfacesIERC1820ImplementsERC165Interface (string networkId, string address, InterfacesIERC1820ImplementsERC165InterfaceRequest interfacesIERC1820ImplementsERC165InterfaceRequest)

IERC1820.implementsERC165Interface

Read `implementsERC165Interface(account,interfaceId)` on an instance of `IERC1820`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC1820ImplementsERC165InterfaceExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC1820Api(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC1820ImplementsERC165InterfaceRequest = new InterfacesIERC1820ImplementsERC165InterfaceRequest(); // InterfacesIERC1820ImplementsERC165InterfaceRequest | 

            try
            {
                // IERC1820.implementsERC165Interface
                InterfacesIERC1820ImplementsERC165Interface200Response result = apiInstance.InterfacesIERC1820ImplementsERC165Interface(networkId, address, interfacesIERC1820ImplementsERC165InterfaceRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC1820Api.InterfacesIERC1820ImplementsERC165Interface: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC1820ImplementsERC165InterfaceWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC1820.implementsERC165Interface
    ApiResponse<InterfacesIERC1820ImplementsERC165Interface200Response> response = apiInstance.InterfacesIERC1820ImplementsERC165InterfaceWithHttpInfo(networkId, address, interfacesIERC1820ImplementsERC165InterfaceRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC1820Api.InterfacesIERC1820ImplementsERC165InterfaceWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC1820ImplementsERC165InterfaceRequest** | [**InterfacesIERC1820ImplementsERC165InterfaceRequest**](InterfacesIERC1820ImplementsERC165InterfaceRequest.md) |  |  |

### Return type

[**InterfacesIERC1820ImplementsERC165Interface200Response**](InterfacesIERC1820ImplementsERC165Interface200Response.md)

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

<a id="interfacesierc1820implementserc165interfacenocache"></a>
# **InterfacesIERC1820ImplementsERC165InterfaceNoCache**
> InterfacesIERC1820ImplementsERC165Interface200Response InterfacesIERC1820ImplementsERC165InterfaceNoCache (string networkId, string address, InterfacesIERC1820ImplementsERC165InterfaceRequest interfacesIERC1820ImplementsERC165InterfaceRequest)

IERC1820.implementsERC165InterfaceNoCache

Read `implementsERC165InterfaceNoCache(account,interfaceId)` on an instance of `IERC1820`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC1820ImplementsERC165InterfaceNoCacheExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC1820Api(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC1820ImplementsERC165InterfaceRequest = new InterfacesIERC1820ImplementsERC165InterfaceRequest(); // InterfacesIERC1820ImplementsERC165InterfaceRequest | 

            try
            {
                // IERC1820.implementsERC165InterfaceNoCache
                InterfacesIERC1820ImplementsERC165Interface200Response result = apiInstance.InterfacesIERC1820ImplementsERC165InterfaceNoCache(networkId, address, interfacesIERC1820ImplementsERC165InterfaceRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC1820Api.InterfacesIERC1820ImplementsERC165InterfaceNoCache: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC1820ImplementsERC165InterfaceNoCacheWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC1820.implementsERC165InterfaceNoCache
    ApiResponse<InterfacesIERC1820ImplementsERC165Interface200Response> response = apiInstance.InterfacesIERC1820ImplementsERC165InterfaceNoCacheWithHttpInfo(networkId, address, interfacesIERC1820ImplementsERC165InterfaceRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC1820Api.InterfacesIERC1820ImplementsERC165InterfaceNoCacheWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC1820ImplementsERC165InterfaceRequest** | [**InterfacesIERC1820ImplementsERC165InterfaceRequest**](InterfacesIERC1820ImplementsERC165InterfaceRequest.md) |  |  |

### Return type

[**InterfacesIERC1820ImplementsERC165Interface200Response**](InterfacesIERC1820ImplementsERC165Interface200Response.md)

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

<a id="interfacesierc1820interfacehash"></a>
# **InterfacesIERC1820InterfaceHash**
> InterfacesIERC1820InterfaceHash200Response InterfacesIERC1820InterfaceHash (string networkId, string address, InterfacesIERC1820InterfaceHashRequest interfacesIERC1820InterfaceHashRequest)

IERC1820.interfaceHash

Read `interfaceHash(interfaceName)` on an instance of `IERC1820`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC1820InterfaceHashExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC1820Api(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC1820InterfaceHashRequest = new InterfacesIERC1820InterfaceHashRequest(); // InterfacesIERC1820InterfaceHashRequest | 

            try
            {
                // IERC1820.interfaceHash
                InterfacesIERC1820InterfaceHash200Response result = apiInstance.InterfacesIERC1820InterfaceHash(networkId, address, interfacesIERC1820InterfaceHashRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC1820Api.InterfacesIERC1820InterfaceHash: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC1820InterfaceHashWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC1820.interfaceHash
    ApiResponse<InterfacesIERC1820InterfaceHash200Response> response = apiInstance.InterfacesIERC1820InterfaceHashWithHttpInfo(networkId, address, interfacesIERC1820InterfaceHashRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC1820Api.InterfacesIERC1820InterfaceHashWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC1820InterfaceHashRequest** | [**InterfacesIERC1820InterfaceHashRequest**](InterfacesIERC1820InterfaceHashRequest.md) |  |  |

### Return type

[**InterfacesIERC1820InterfaceHash200Response**](InterfacesIERC1820InterfaceHash200Response.md)

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

<a id="interfacesierc1820setinterfaceimplementer"></a>
# **InterfacesIERC1820SetInterfaceImplementer**
> InterfacesIERC1820SetInterfaceImplementer200Response InterfacesIERC1820SetInterfaceImplementer (string networkId, string address, InterfacesIERC1820SetInterfaceImplementerRequest interfacesIERC1820SetInterfaceImplementerRequest)

IERC1820.setInterfaceImplementer

Write `setInterfaceImplementer(account,_interfaceHash,implementer)` on an instance of `IERC1820`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC1820SetInterfaceImplementerExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC1820Api(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC1820SetInterfaceImplementerRequest = new InterfacesIERC1820SetInterfaceImplementerRequest(); // InterfacesIERC1820SetInterfaceImplementerRequest | 

            try
            {
                // IERC1820.setInterfaceImplementer
                InterfacesIERC1820SetInterfaceImplementer200Response result = apiInstance.InterfacesIERC1820SetInterfaceImplementer(networkId, address, interfacesIERC1820SetInterfaceImplementerRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC1820Api.InterfacesIERC1820SetInterfaceImplementer: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC1820SetInterfaceImplementerWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC1820.setInterfaceImplementer
    ApiResponse<InterfacesIERC1820SetInterfaceImplementer200Response> response = apiInstance.InterfacesIERC1820SetInterfaceImplementerWithHttpInfo(networkId, address, interfacesIERC1820SetInterfaceImplementerRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC1820Api.InterfacesIERC1820SetInterfaceImplementerWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC1820SetInterfaceImplementerRequest** | [**InterfacesIERC1820SetInterfaceImplementerRequest**](InterfacesIERC1820SetInterfaceImplementerRequest.md) |  |  |

### Return type

[**InterfacesIERC1820SetInterfaceImplementer200Response**](InterfacesIERC1820SetInterfaceImplementer200Response.md)

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

<a id="interfacesierc1820setmanager"></a>
# **InterfacesIERC1820SetManager**
> InterfacesIERC1820SetManager200Response InterfacesIERC1820SetManager (string networkId, string address, InterfacesIERC1820SetManagerRequest interfacesIERC1820SetManagerRequest)

IERC1820.setManager

Write `setManager(account,newManager)` on an instance of `IERC1820`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC1820SetManagerExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC1820Api(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC1820SetManagerRequest = new InterfacesIERC1820SetManagerRequest(); // InterfacesIERC1820SetManagerRequest | 

            try
            {
                // IERC1820.setManager
                InterfacesIERC1820SetManager200Response result = apiInstance.InterfacesIERC1820SetManager(networkId, address, interfacesIERC1820SetManagerRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC1820Api.InterfacesIERC1820SetManager: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC1820SetManagerWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC1820.setManager
    ApiResponse<InterfacesIERC1820SetManager200Response> response = apiInstance.InterfacesIERC1820SetManagerWithHttpInfo(networkId, address, interfacesIERC1820SetManagerRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC1820Api.InterfacesIERC1820SetManagerWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC1820SetManagerRequest** | [**InterfacesIERC1820SetManagerRequest**](InterfacesIERC1820SetManagerRequest.md) |  |  |

### Return type

[**InterfacesIERC1820SetManager200Response**](InterfacesIERC1820SetManager200Response.md)

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

<a id="interfacesierc1820updateerc165cache"></a>
# **InterfacesIERC1820UpdateERC165Cache**
> InterfacesIERC1820UpdateERC165Cache200Response InterfacesIERC1820UpdateERC165Cache (string networkId, string address, InterfacesIERC1820ImplementsERC165InterfaceRequest interfacesIERC1820ImplementsERC165InterfaceRequest)

IERC1820.updateERC165Cache

Write `updateERC165Cache(account,interfaceId)` on an instance of `IERC1820`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC1820UpdateERC165CacheExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC1820Api(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC1820ImplementsERC165InterfaceRequest = new InterfacesIERC1820ImplementsERC165InterfaceRequest(); // InterfacesIERC1820ImplementsERC165InterfaceRequest | 

            try
            {
                // IERC1820.updateERC165Cache
                InterfacesIERC1820UpdateERC165Cache200Response result = apiInstance.InterfacesIERC1820UpdateERC165Cache(networkId, address, interfacesIERC1820ImplementsERC165InterfaceRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC1820Api.InterfacesIERC1820UpdateERC165Cache: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC1820UpdateERC165CacheWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC1820.updateERC165Cache
    ApiResponse<InterfacesIERC1820UpdateERC165Cache200Response> response = apiInstance.InterfacesIERC1820UpdateERC165CacheWithHttpInfo(networkId, address, interfacesIERC1820ImplementsERC165InterfaceRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC1820Api.InterfacesIERC1820UpdateERC165CacheWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC1820ImplementsERC165InterfaceRequest** | [**InterfacesIERC1820ImplementsERC165InterfaceRequest**](InterfacesIERC1820ImplementsERC165InterfaceRequest.md) |  |  |

### Return type

[**InterfacesIERC1820UpdateERC165Cache200Response**](InterfacesIERC1820UpdateERC165Cache200Response.md)

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

