# Org.OpenAPITools.Api.IAccessControlApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

| Method | HTTP request | Description |
|--------|--------------|-------------|
| [**InterfacesIAccessControlGetRoleAdmin**](IAccessControlApi.md#interfacesiaccesscontrolgetroleadmin) | **POST** /{networkId}/interface/IAccessControl/read/{address}/getRoleAdmin | IAccessControl.getRoleAdmin |
| [**InterfacesIAccessControlGrantRole**](IAccessControlApi.md#interfacesiaccesscontrolgrantrole) | **POST** /{networkId}/interface/IAccessControl/write/{address}/grantRole | IAccessControl.grantRole |
| [**InterfacesIAccessControlHasRole**](IAccessControlApi.md#interfacesiaccesscontrolhasrole) | **POST** /{networkId}/interface/IAccessControl/read/{address}/hasRole | IAccessControl.hasRole |
| [**InterfacesIAccessControlRenounceRole**](IAccessControlApi.md#interfacesiaccesscontrolrenouncerole) | **POST** /{networkId}/interface/IAccessControl/write/{address}/renounceRole | IAccessControl.renounceRole |
| [**InterfacesIAccessControlRevokeRole**](IAccessControlApi.md#interfacesiaccesscontrolrevokerole) | **POST** /{networkId}/interface/IAccessControl/write/{address}/revokeRole | IAccessControl.revokeRole |

<a id="interfacesiaccesscontrolgetroleadmin"></a>
# **InterfacesIAccessControlGetRoleAdmin**
> InterfacesIAccessControlGetRoleAdmin200Response InterfacesIAccessControlGetRoleAdmin (string networkId, string address, InterfacesIAccessControlGetRoleAdminRequest interfacesIAccessControlGetRoleAdminRequest)

IAccessControl.getRoleAdmin

Read `getRoleAdmin(role)` on an instance of `IAccessControl`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIAccessControlGetRoleAdminExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IAccessControlApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIAccessControlGetRoleAdminRequest = new InterfacesIAccessControlGetRoleAdminRequest(); // InterfacesIAccessControlGetRoleAdminRequest | 

            try
            {
                // IAccessControl.getRoleAdmin
                InterfacesIAccessControlGetRoleAdmin200Response result = apiInstance.InterfacesIAccessControlGetRoleAdmin(networkId, address, interfacesIAccessControlGetRoleAdminRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IAccessControlApi.InterfacesIAccessControlGetRoleAdmin: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIAccessControlGetRoleAdminWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IAccessControl.getRoleAdmin
    ApiResponse<InterfacesIAccessControlGetRoleAdmin200Response> response = apiInstance.InterfacesIAccessControlGetRoleAdminWithHttpInfo(networkId, address, interfacesIAccessControlGetRoleAdminRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IAccessControlApi.InterfacesIAccessControlGetRoleAdminWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIAccessControlGetRoleAdminRequest** | [**InterfacesIAccessControlGetRoleAdminRequest**](InterfacesIAccessControlGetRoleAdminRequest.md) |  |  |

### Return type

[**InterfacesIAccessControlGetRoleAdmin200Response**](InterfacesIAccessControlGetRoleAdmin200Response.md)

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

<a id="interfacesiaccesscontrolgrantrole"></a>
# **InterfacesIAccessControlGrantRole**
> InterfacesIAccessControlGrantRole200Response InterfacesIAccessControlGrantRole (string networkId, string address, InterfacesIAccessControlGrantRoleRequest interfacesIAccessControlGrantRoleRequest)

IAccessControl.grantRole

Write `grantRole(role,account)` on an instance of `IAccessControl`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIAccessControlGrantRoleExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IAccessControlApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIAccessControlGrantRoleRequest = new InterfacesIAccessControlGrantRoleRequest(); // InterfacesIAccessControlGrantRoleRequest | 

            try
            {
                // IAccessControl.grantRole
                InterfacesIAccessControlGrantRole200Response result = apiInstance.InterfacesIAccessControlGrantRole(networkId, address, interfacesIAccessControlGrantRoleRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IAccessControlApi.InterfacesIAccessControlGrantRole: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIAccessControlGrantRoleWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IAccessControl.grantRole
    ApiResponse<InterfacesIAccessControlGrantRole200Response> response = apiInstance.InterfacesIAccessControlGrantRoleWithHttpInfo(networkId, address, interfacesIAccessControlGrantRoleRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IAccessControlApi.InterfacesIAccessControlGrantRoleWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIAccessControlGrantRoleRequest** | [**InterfacesIAccessControlGrantRoleRequest**](InterfacesIAccessControlGrantRoleRequest.md) |  |  |

### Return type

[**InterfacesIAccessControlGrantRole200Response**](InterfacesIAccessControlGrantRole200Response.md)

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

<a id="interfacesiaccesscontrolhasrole"></a>
# **InterfacesIAccessControlHasRole**
> InterfacesIAccessControlHasRole200Response InterfacesIAccessControlHasRole (string networkId, string address, InterfacesIAccessControlGrantRoleRequest interfacesIAccessControlGrantRoleRequest)

IAccessControl.hasRole

Read `hasRole(role,account)` on an instance of `IAccessControl`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIAccessControlHasRoleExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IAccessControlApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIAccessControlGrantRoleRequest = new InterfacesIAccessControlGrantRoleRequest(); // InterfacesIAccessControlGrantRoleRequest | 

            try
            {
                // IAccessControl.hasRole
                InterfacesIAccessControlHasRole200Response result = apiInstance.InterfacesIAccessControlHasRole(networkId, address, interfacesIAccessControlGrantRoleRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IAccessControlApi.InterfacesIAccessControlHasRole: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIAccessControlHasRoleWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IAccessControl.hasRole
    ApiResponse<InterfacesIAccessControlHasRole200Response> response = apiInstance.InterfacesIAccessControlHasRoleWithHttpInfo(networkId, address, interfacesIAccessControlGrantRoleRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IAccessControlApi.InterfacesIAccessControlHasRoleWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIAccessControlGrantRoleRequest** | [**InterfacesIAccessControlGrantRoleRequest**](InterfacesIAccessControlGrantRoleRequest.md) |  |  |

### Return type

[**InterfacesIAccessControlHasRole200Response**](InterfacesIAccessControlHasRole200Response.md)

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

<a id="interfacesiaccesscontrolrenouncerole"></a>
# **InterfacesIAccessControlRenounceRole**
> InterfacesIAccessControlGrantRole200Response InterfacesIAccessControlRenounceRole (string networkId, string address, InterfacesIAccessControlGrantRoleRequest interfacesIAccessControlGrantRoleRequest)

IAccessControl.renounceRole

Write `renounceRole(role,account)` on an instance of `IAccessControl`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIAccessControlRenounceRoleExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IAccessControlApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIAccessControlGrantRoleRequest = new InterfacesIAccessControlGrantRoleRequest(); // InterfacesIAccessControlGrantRoleRequest | 

            try
            {
                // IAccessControl.renounceRole
                InterfacesIAccessControlGrantRole200Response result = apiInstance.InterfacesIAccessControlRenounceRole(networkId, address, interfacesIAccessControlGrantRoleRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IAccessControlApi.InterfacesIAccessControlRenounceRole: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIAccessControlRenounceRoleWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IAccessControl.renounceRole
    ApiResponse<InterfacesIAccessControlGrantRole200Response> response = apiInstance.InterfacesIAccessControlRenounceRoleWithHttpInfo(networkId, address, interfacesIAccessControlGrantRoleRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IAccessControlApi.InterfacesIAccessControlRenounceRoleWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIAccessControlGrantRoleRequest** | [**InterfacesIAccessControlGrantRoleRequest**](InterfacesIAccessControlGrantRoleRequest.md) |  |  |

### Return type

[**InterfacesIAccessControlGrantRole200Response**](InterfacesIAccessControlGrantRole200Response.md)

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

<a id="interfacesiaccesscontrolrevokerole"></a>
# **InterfacesIAccessControlRevokeRole**
> InterfacesIAccessControlGrantRole200Response InterfacesIAccessControlRevokeRole (string networkId, string address, InterfacesIAccessControlGrantRoleRequest interfacesIAccessControlGrantRoleRequest)

IAccessControl.revokeRole

Write `revokeRole(role,account)` on an instance of `IAccessControl`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIAccessControlRevokeRoleExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IAccessControlApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIAccessControlGrantRoleRequest = new InterfacesIAccessControlGrantRoleRequest(); // InterfacesIAccessControlGrantRoleRequest | 

            try
            {
                // IAccessControl.revokeRole
                InterfacesIAccessControlGrantRole200Response result = apiInstance.InterfacesIAccessControlRevokeRole(networkId, address, interfacesIAccessControlGrantRoleRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IAccessControlApi.InterfacesIAccessControlRevokeRole: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIAccessControlRevokeRoleWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IAccessControl.revokeRole
    ApiResponse<InterfacesIAccessControlGrantRole200Response> response = apiInstance.InterfacesIAccessControlRevokeRoleWithHttpInfo(networkId, address, interfacesIAccessControlGrantRoleRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IAccessControlApi.InterfacesIAccessControlRevokeRoleWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIAccessControlGrantRoleRequest** | [**InterfacesIAccessControlGrantRoleRequest**](InterfacesIAccessControlGrantRoleRequest.md) |  |  |

### Return type

[**InterfacesIAccessControlGrantRole200Response**](InterfacesIAccessControlGrantRole200Response.md)

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

