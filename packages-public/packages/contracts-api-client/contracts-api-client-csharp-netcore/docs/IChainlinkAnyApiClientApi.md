# Org.OpenAPITools.Api.IChainlinkAnyApiClientApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

| Method | HTTP request | Description |
|--------|--------------|-------------|
| [**InterfacesIChainlinkAnyApiClientContractURI**](IChainlinkAnyApiClientApi.md#interfacesichainlinkanyapiclientcontracturi) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/contractURI | IChainlinkAnyApiClient.contractURI |
| [**InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE**](IChainlinkAnyApiClientApi.md#interfacesichainlinkanyapiclientdefaultadminrole) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/DEFAULT_ADMIN_ROLE | IChainlinkAnyApiClient.DEFAULT_ADMIN_ROLE |
| [**InterfacesIChainlinkAnyApiClientFulfill**](IChainlinkAnyApiClientApi.md#interfacesichainlinkanyapiclientfulfill) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/fulfill | IChainlinkAnyApiClient.fulfill |
| [**InterfacesIChainlinkAnyApiClientGetRoleAdmin**](IChainlinkAnyApiClientApi.md#interfacesichainlinkanyapiclientgetroleadmin) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/getRoleAdmin | IChainlinkAnyApiClient.getRoleAdmin |
| [**InterfacesIChainlinkAnyApiClientGrantRole**](IChainlinkAnyApiClientApi.md#interfacesichainlinkanyapiclientgrantrole) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/grantRole | IChainlinkAnyApiClient.grantRole |
| [**InterfacesIChainlinkAnyApiClientHasRole**](IChainlinkAnyApiClientApi.md#interfacesichainlinkanyapiclienthasrole) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/hasRole | IChainlinkAnyApiClient.hasRole |
| [**InterfacesIChainlinkAnyApiClientRenounceRole**](IChainlinkAnyApiClientApi.md#interfacesichainlinkanyapiclientrenouncerole) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/renounceRole | IChainlinkAnyApiClient.renounceRole |
| [**InterfacesIChainlinkAnyApiClientRequest**](IChainlinkAnyApiClientApi.md#interfacesichainlinkanyapiclientrequest) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/request | IChainlinkAnyApiClient.request |
| [**InterfacesIChainlinkAnyApiClientRequests**](IChainlinkAnyApiClientApi.md#interfacesichainlinkanyapiclientrequests) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/requests | IChainlinkAnyApiClient.requests |
| [**InterfacesIChainlinkAnyApiClientRevokeRole**](IChainlinkAnyApiClientApi.md#interfacesichainlinkanyapiclientrevokerole) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/revokeRole | IChainlinkAnyApiClient.revokeRole |
| [**InterfacesIChainlinkAnyApiClientSetContractURI**](IChainlinkAnyApiClientApi.md#interfacesichainlinkanyapiclientsetcontracturi) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/setContractURI | IChainlinkAnyApiClient.setContractURI |
| [**InterfacesIChainlinkAnyApiClientSupportsInterface**](IChainlinkAnyApiClientApi.md#interfacesichainlinkanyapiclientsupportsinterface) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/supportsInterface | IChainlinkAnyApiClient.supportsInterface |
| [**InterfacesIChainlinkAnyApiClientVersion**](IChainlinkAnyApiClientApi.md#interfacesichainlinkanyapiclientversion) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/version | IChainlinkAnyApiClient.version |
| [**InterfacesIChainlinkAnyApiClientWithdrawLink**](IChainlinkAnyApiClientApi.md#interfacesichainlinkanyapiclientwithdrawlink) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/withdrawLink | IChainlinkAnyApiClient.withdrawLink |

<a id="interfacesichainlinkanyapiclientcontracturi"></a>
# **InterfacesIChainlinkAnyApiClientContractURI**
> InterfacesIContractURIContractURI200Response InterfacesIChainlinkAnyApiClientContractURI (string networkId, string address, InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest)

IChainlinkAnyApiClient.contractURI

Read `contractURI()` on an instance of `IChainlinkAnyApiClient`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIChainlinkAnyApiClientContractURIExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IChainlinkAnyApiClientApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIBeaconImplementationRequest = new InterfacesIBeaconImplementationRequest(); // InterfacesIBeaconImplementationRequest | 

            try
            {
                // IChainlinkAnyApiClient.contractURI
                InterfacesIContractURIContractURI200Response result = apiInstance.InterfacesIChainlinkAnyApiClientContractURI(networkId, address, interfacesIBeaconImplementationRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientContractURI: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIChainlinkAnyApiClientContractURIWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IChainlinkAnyApiClient.contractURI
    ApiResponse<InterfacesIContractURIContractURI200Response> response = apiInstance.InterfacesIChainlinkAnyApiClientContractURIWithHttpInfo(networkId, address, interfacesIBeaconImplementationRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientContractURIWithHttpInfo: " + e.Message);
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

[**InterfacesIContractURIContractURI200Response**](InterfacesIContractURIContractURI200Response.md)

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

<a id="interfacesichainlinkanyapiclientdefaultadminrole"></a>
# **InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE**
> InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE200Response InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE (string networkId, string address, InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest)

IChainlinkAnyApiClient.DEFAULT_ADMIN_ROLE

Read `DEFAULT_ADMIN_ROLE()` on an instance of `IChainlinkAnyApiClient`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIChainlinkAnyApiClientDEFAULTADMINROLEExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IChainlinkAnyApiClientApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIBeaconImplementationRequest = new InterfacesIBeaconImplementationRequest(); // InterfacesIBeaconImplementationRequest | 

            try
            {
                // IChainlinkAnyApiClient.DEFAULT_ADMIN_ROLE
                InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE200Response result = apiInstance.InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE(networkId, address, interfacesIBeaconImplementationRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIChainlinkAnyApiClientDEFAULTADMINROLEWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IChainlinkAnyApiClient.DEFAULT_ADMIN_ROLE
    ApiResponse<InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE200Response> response = apiInstance.InterfacesIChainlinkAnyApiClientDEFAULTADMINROLEWithHttpInfo(networkId, address, interfacesIBeaconImplementationRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientDEFAULTADMINROLEWithHttpInfo: " + e.Message);
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

[**InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE200Response**](InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE200Response.md)

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

<a id="interfacesichainlinkanyapiclientfulfill"></a>
# **InterfacesIChainlinkAnyApiClientFulfill**
> InterfacesIChainlinkAnyApiClientFulfill200Response InterfacesIChainlinkAnyApiClientFulfill (string networkId, string address, InterfacesIChainlinkAnyApiClientFulfillRequest interfacesIChainlinkAnyApiClientFulfillRequest)

IChainlinkAnyApiClient.fulfill

Write `fulfill(reqId,reqResponseData)` on an instance of `IChainlinkAnyApiClient`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIChainlinkAnyApiClientFulfillExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IChainlinkAnyApiClientApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIChainlinkAnyApiClientFulfillRequest = new InterfacesIChainlinkAnyApiClientFulfillRequest(); // InterfacesIChainlinkAnyApiClientFulfillRequest | 

            try
            {
                // IChainlinkAnyApiClient.fulfill
                InterfacesIChainlinkAnyApiClientFulfill200Response result = apiInstance.InterfacesIChainlinkAnyApiClientFulfill(networkId, address, interfacesIChainlinkAnyApiClientFulfillRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientFulfill: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIChainlinkAnyApiClientFulfillWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IChainlinkAnyApiClient.fulfill
    ApiResponse<InterfacesIChainlinkAnyApiClientFulfill200Response> response = apiInstance.InterfacesIChainlinkAnyApiClientFulfillWithHttpInfo(networkId, address, interfacesIChainlinkAnyApiClientFulfillRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientFulfillWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIChainlinkAnyApiClientFulfillRequest** | [**InterfacesIChainlinkAnyApiClientFulfillRequest**](InterfacesIChainlinkAnyApiClientFulfillRequest.md) |  |  |

### Return type

[**InterfacesIChainlinkAnyApiClientFulfill200Response**](InterfacesIChainlinkAnyApiClientFulfill200Response.md)

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

<a id="interfacesichainlinkanyapiclientgetroleadmin"></a>
# **InterfacesIChainlinkAnyApiClientGetRoleAdmin**
> InterfacesIAccessControlGetRoleAdmin200Response InterfacesIChainlinkAnyApiClientGetRoleAdmin (string networkId, string address, InterfacesIAccessControlGetRoleAdminRequest interfacesIAccessControlGetRoleAdminRequest)

IChainlinkAnyApiClient.getRoleAdmin

Read `getRoleAdmin(role)` on an instance of `IChainlinkAnyApiClient`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIChainlinkAnyApiClientGetRoleAdminExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IChainlinkAnyApiClientApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIAccessControlGetRoleAdminRequest = new InterfacesIAccessControlGetRoleAdminRequest(); // InterfacesIAccessControlGetRoleAdminRequest | 

            try
            {
                // IChainlinkAnyApiClient.getRoleAdmin
                InterfacesIAccessControlGetRoleAdmin200Response result = apiInstance.InterfacesIChainlinkAnyApiClientGetRoleAdmin(networkId, address, interfacesIAccessControlGetRoleAdminRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientGetRoleAdmin: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIChainlinkAnyApiClientGetRoleAdminWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IChainlinkAnyApiClient.getRoleAdmin
    ApiResponse<InterfacesIAccessControlGetRoleAdmin200Response> response = apiInstance.InterfacesIChainlinkAnyApiClientGetRoleAdminWithHttpInfo(networkId, address, interfacesIAccessControlGetRoleAdminRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientGetRoleAdminWithHttpInfo: " + e.Message);
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

<a id="interfacesichainlinkanyapiclientgrantrole"></a>
# **InterfacesIChainlinkAnyApiClientGrantRole**
> InterfacesIAccessControlGrantRole200Response InterfacesIChainlinkAnyApiClientGrantRole (string networkId, string address, InterfacesIAccessControlGrantRoleRequest interfacesIAccessControlGrantRoleRequest)

IChainlinkAnyApiClient.grantRole

Write `grantRole(role,account)` on an instance of `IChainlinkAnyApiClient`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIChainlinkAnyApiClientGrantRoleExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IChainlinkAnyApiClientApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIAccessControlGrantRoleRequest = new InterfacesIAccessControlGrantRoleRequest(); // InterfacesIAccessControlGrantRoleRequest | 

            try
            {
                // IChainlinkAnyApiClient.grantRole
                InterfacesIAccessControlGrantRole200Response result = apiInstance.InterfacesIChainlinkAnyApiClientGrantRole(networkId, address, interfacesIAccessControlGrantRoleRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientGrantRole: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIChainlinkAnyApiClientGrantRoleWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IChainlinkAnyApiClient.grantRole
    ApiResponse<InterfacesIAccessControlGrantRole200Response> response = apiInstance.InterfacesIChainlinkAnyApiClientGrantRoleWithHttpInfo(networkId, address, interfacesIAccessControlGrantRoleRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientGrantRoleWithHttpInfo: " + e.Message);
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

<a id="interfacesichainlinkanyapiclienthasrole"></a>
# **InterfacesIChainlinkAnyApiClientHasRole**
> InterfacesIAccessControlHasRole200Response InterfacesIChainlinkAnyApiClientHasRole (string networkId, string address, InterfacesIAccessControlGrantRoleRequest interfacesIAccessControlGrantRoleRequest)

IChainlinkAnyApiClient.hasRole

Read `hasRole(role,account)` on an instance of `IChainlinkAnyApiClient`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIChainlinkAnyApiClientHasRoleExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IChainlinkAnyApiClientApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIAccessControlGrantRoleRequest = new InterfacesIAccessControlGrantRoleRequest(); // InterfacesIAccessControlGrantRoleRequest | 

            try
            {
                // IChainlinkAnyApiClient.hasRole
                InterfacesIAccessControlHasRole200Response result = apiInstance.InterfacesIChainlinkAnyApiClientHasRole(networkId, address, interfacesIAccessControlGrantRoleRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientHasRole: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIChainlinkAnyApiClientHasRoleWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IChainlinkAnyApiClient.hasRole
    ApiResponse<InterfacesIAccessControlHasRole200Response> response = apiInstance.InterfacesIChainlinkAnyApiClientHasRoleWithHttpInfo(networkId, address, interfacesIAccessControlGrantRoleRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientHasRoleWithHttpInfo: " + e.Message);
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

<a id="interfacesichainlinkanyapiclientrenouncerole"></a>
# **InterfacesIChainlinkAnyApiClientRenounceRole**
> InterfacesIAccessControlGrantRole200Response InterfacesIChainlinkAnyApiClientRenounceRole (string networkId, string address, InterfacesIAccessControlGrantRoleRequest interfacesIAccessControlGrantRoleRequest)

IChainlinkAnyApiClient.renounceRole

Write `renounceRole(role,account)` on an instance of `IChainlinkAnyApiClient`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIChainlinkAnyApiClientRenounceRoleExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IChainlinkAnyApiClientApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIAccessControlGrantRoleRequest = new InterfacesIAccessControlGrantRoleRequest(); // InterfacesIAccessControlGrantRoleRequest | 

            try
            {
                // IChainlinkAnyApiClient.renounceRole
                InterfacesIAccessControlGrantRole200Response result = apiInstance.InterfacesIChainlinkAnyApiClientRenounceRole(networkId, address, interfacesIAccessControlGrantRoleRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientRenounceRole: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIChainlinkAnyApiClientRenounceRoleWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IChainlinkAnyApiClient.renounceRole
    ApiResponse<InterfacesIAccessControlGrantRole200Response> response = apiInstance.InterfacesIChainlinkAnyApiClientRenounceRoleWithHttpInfo(networkId, address, interfacesIAccessControlGrantRoleRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientRenounceRoleWithHttpInfo: " + e.Message);
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

<a id="interfacesichainlinkanyapiclientrequest"></a>
# **InterfacesIChainlinkAnyApiClientRequest**
> InterfacesIChainlinkAnyApiClientRequest200Response InterfacesIChainlinkAnyApiClientRequest (string networkId, string address, InterfacesIChainlinkAnyApiClientRequestRequest interfacesIChainlinkAnyApiClientRequestRequest)

IChainlinkAnyApiClient.request

Write `request(fulfillAddress,fulfillPrefixData,reqJobId,reqUrl,reqPath,reqFee)` on an instance of `IChainlinkAnyApiClient`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIChainlinkAnyApiClientRequestExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IChainlinkAnyApiClientApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIChainlinkAnyApiClientRequestRequest = new InterfacesIChainlinkAnyApiClientRequestRequest(); // InterfacesIChainlinkAnyApiClientRequestRequest | 

            try
            {
                // IChainlinkAnyApiClient.request
                InterfacesIChainlinkAnyApiClientRequest200Response result = apiInstance.InterfacesIChainlinkAnyApiClientRequest(networkId, address, interfacesIChainlinkAnyApiClientRequestRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientRequest: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIChainlinkAnyApiClientRequestWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IChainlinkAnyApiClient.request
    ApiResponse<InterfacesIChainlinkAnyApiClientRequest200Response> response = apiInstance.InterfacesIChainlinkAnyApiClientRequestWithHttpInfo(networkId, address, interfacesIChainlinkAnyApiClientRequestRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientRequestWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIChainlinkAnyApiClientRequestRequest** | [**InterfacesIChainlinkAnyApiClientRequestRequest**](InterfacesIChainlinkAnyApiClientRequestRequest.md) |  |  |

### Return type

[**InterfacesIChainlinkAnyApiClientRequest200Response**](InterfacesIChainlinkAnyApiClientRequest200Response.md)

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

<a id="interfacesichainlinkanyapiclientrequests"></a>
# **InterfacesIChainlinkAnyApiClientRequests**
> InterfacesIChainlinkAnyApiClientRequests200Response InterfacesIChainlinkAnyApiClientRequests (string networkId, string address, InterfacesIChainlinkAnyApiClientRequestsRequest interfacesIChainlinkAnyApiClientRequestsRequest)

IChainlinkAnyApiClient.requests

Read `requests()` on an instance of `IChainlinkAnyApiClient`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIChainlinkAnyApiClientRequestsExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IChainlinkAnyApiClientApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIChainlinkAnyApiClientRequestsRequest = new InterfacesIChainlinkAnyApiClientRequestsRequest(); // InterfacesIChainlinkAnyApiClientRequestsRequest | 

            try
            {
                // IChainlinkAnyApiClient.requests
                InterfacesIChainlinkAnyApiClientRequests200Response result = apiInstance.InterfacesIChainlinkAnyApiClientRequests(networkId, address, interfacesIChainlinkAnyApiClientRequestsRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientRequests: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIChainlinkAnyApiClientRequestsWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IChainlinkAnyApiClient.requests
    ApiResponse<InterfacesIChainlinkAnyApiClientRequests200Response> response = apiInstance.InterfacesIChainlinkAnyApiClientRequestsWithHttpInfo(networkId, address, interfacesIChainlinkAnyApiClientRequestsRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientRequestsWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIChainlinkAnyApiClientRequestsRequest** | [**InterfacesIChainlinkAnyApiClientRequestsRequest**](InterfacesIChainlinkAnyApiClientRequestsRequest.md) |  |  |

### Return type

[**InterfacesIChainlinkAnyApiClientRequests200Response**](InterfacesIChainlinkAnyApiClientRequests200Response.md)

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

<a id="interfacesichainlinkanyapiclientrevokerole"></a>
# **InterfacesIChainlinkAnyApiClientRevokeRole**
> InterfacesIAccessControlGrantRole200Response InterfacesIChainlinkAnyApiClientRevokeRole (string networkId, string address, InterfacesIAccessControlGrantRoleRequest interfacesIAccessControlGrantRoleRequest)

IChainlinkAnyApiClient.revokeRole

Write `revokeRole(role,account)` on an instance of `IChainlinkAnyApiClient`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIChainlinkAnyApiClientRevokeRoleExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IChainlinkAnyApiClientApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIAccessControlGrantRoleRequest = new InterfacesIAccessControlGrantRoleRequest(); // InterfacesIAccessControlGrantRoleRequest | 

            try
            {
                // IChainlinkAnyApiClient.revokeRole
                InterfacesIAccessControlGrantRole200Response result = apiInstance.InterfacesIChainlinkAnyApiClientRevokeRole(networkId, address, interfacesIAccessControlGrantRoleRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientRevokeRole: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIChainlinkAnyApiClientRevokeRoleWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IChainlinkAnyApiClient.revokeRole
    ApiResponse<InterfacesIAccessControlGrantRole200Response> response = apiInstance.InterfacesIChainlinkAnyApiClientRevokeRoleWithHttpInfo(networkId, address, interfacesIAccessControlGrantRoleRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientRevokeRoleWithHttpInfo: " + e.Message);
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

<a id="interfacesichainlinkanyapiclientsetcontracturi"></a>
# **InterfacesIChainlinkAnyApiClientSetContractURI**
> InterfacesIContractURISetContractURI200Response InterfacesIChainlinkAnyApiClientSetContractURI (string networkId, string address, InterfacesIContractURISetContractURIRequest interfacesIContractURISetContractURIRequest)

IChainlinkAnyApiClient.setContractURI

Write `setContractURI(uri)` on an instance of `IChainlinkAnyApiClient`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIChainlinkAnyApiClientSetContractURIExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IChainlinkAnyApiClientApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIContractURISetContractURIRequest = new InterfacesIContractURISetContractURIRequest(); // InterfacesIContractURISetContractURIRequest | 

            try
            {
                // IChainlinkAnyApiClient.setContractURI
                InterfacesIContractURISetContractURI200Response result = apiInstance.InterfacesIChainlinkAnyApiClientSetContractURI(networkId, address, interfacesIContractURISetContractURIRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientSetContractURI: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIChainlinkAnyApiClientSetContractURIWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IChainlinkAnyApiClient.setContractURI
    ApiResponse<InterfacesIContractURISetContractURI200Response> response = apiInstance.InterfacesIChainlinkAnyApiClientSetContractURIWithHttpInfo(networkId, address, interfacesIContractURISetContractURIRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientSetContractURIWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIContractURISetContractURIRequest** | [**InterfacesIContractURISetContractURIRequest**](InterfacesIContractURISetContractURIRequest.md) |  |  |

### Return type

[**InterfacesIContractURISetContractURI200Response**](InterfacesIContractURISetContractURI200Response.md)

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

<a id="interfacesichainlinkanyapiclientsupportsinterface"></a>
# **InterfacesIChainlinkAnyApiClientSupportsInterface**
> InterfacesIERC165SupportsInterface200Response InterfacesIChainlinkAnyApiClientSupportsInterface (string networkId, string address, InterfacesIERC165SupportsInterfaceRequest interfacesIERC165SupportsInterfaceRequest)

IChainlinkAnyApiClient.supportsInterface

Read `supportsInterface(interfaceId)` on an instance of `IChainlinkAnyApiClient`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIChainlinkAnyApiClientSupportsInterfaceExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IChainlinkAnyApiClientApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC165SupportsInterfaceRequest = new InterfacesIERC165SupportsInterfaceRequest(); // InterfacesIERC165SupportsInterfaceRequest | 

            try
            {
                // IChainlinkAnyApiClient.supportsInterface
                InterfacesIERC165SupportsInterface200Response result = apiInstance.InterfacesIChainlinkAnyApiClientSupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientSupportsInterface: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIChainlinkAnyApiClientSupportsInterfaceWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IChainlinkAnyApiClient.supportsInterface
    ApiResponse<InterfacesIERC165SupportsInterface200Response> response = apiInstance.InterfacesIChainlinkAnyApiClientSupportsInterfaceWithHttpInfo(networkId, address, interfacesIERC165SupportsInterfaceRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientSupportsInterfaceWithHttpInfo: " + e.Message);
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

<a id="interfacesichainlinkanyapiclientversion"></a>
# **InterfacesIChainlinkAnyApiClientVersion**
> InterfacesIContractURIContractURI200Response InterfacesIChainlinkAnyApiClientVersion (string networkId, string address, InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest)

IChainlinkAnyApiClient.version

Read `version()` on an instance of `IChainlinkAnyApiClient`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIChainlinkAnyApiClientVersionExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IChainlinkAnyApiClientApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIBeaconImplementationRequest = new InterfacesIBeaconImplementationRequest(); // InterfacesIBeaconImplementationRequest | 

            try
            {
                // IChainlinkAnyApiClient.version
                InterfacesIContractURIContractURI200Response result = apiInstance.InterfacesIChainlinkAnyApiClientVersion(networkId, address, interfacesIBeaconImplementationRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientVersion: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIChainlinkAnyApiClientVersionWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IChainlinkAnyApiClient.version
    ApiResponse<InterfacesIContractURIContractURI200Response> response = apiInstance.InterfacesIChainlinkAnyApiClientVersionWithHttpInfo(networkId, address, interfacesIBeaconImplementationRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientVersionWithHttpInfo: " + e.Message);
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

[**InterfacesIContractURIContractURI200Response**](InterfacesIContractURIContractURI200Response.md)

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

<a id="interfacesichainlinkanyapiclientwithdrawlink"></a>
# **InterfacesIChainlinkAnyApiClientWithdrawLink**
> InterfacesIERC20Transfer200Response InterfacesIChainlinkAnyApiClientWithdrawLink (string networkId, string address, InterfacesIERC20TransferRequest interfacesIERC20TransferRequest)

IChainlinkAnyApiClient.withdrawLink

Write `withdrawLink(to,amount)` on an instance of `IChainlinkAnyApiClient`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIChainlinkAnyApiClientWithdrawLinkExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IChainlinkAnyApiClientApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC20TransferRequest = new InterfacesIERC20TransferRequest(); // InterfacesIERC20TransferRequest | 

            try
            {
                // IChainlinkAnyApiClient.withdrawLink
                InterfacesIERC20Transfer200Response result = apiInstance.InterfacesIChainlinkAnyApiClientWithdrawLink(networkId, address, interfacesIERC20TransferRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientWithdrawLink: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIChainlinkAnyApiClientWithdrawLinkWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IChainlinkAnyApiClient.withdrawLink
    ApiResponse<InterfacesIERC20Transfer200Response> response = apiInstance.InterfacesIChainlinkAnyApiClientWithdrawLinkWithHttpInfo(networkId, address, interfacesIERC20TransferRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IChainlinkAnyApiClientApi.InterfacesIChainlinkAnyApiClientWithdrawLinkWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC20TransferRequest** | [**InterfacesIERC20TransferRequest**](InterfacesIERC20TransferRequest.md) |  |  |

### Return type

[**InterfacesIERC20Transfer200Response**](InterfacesIERC20Transfer200Response.md)

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

