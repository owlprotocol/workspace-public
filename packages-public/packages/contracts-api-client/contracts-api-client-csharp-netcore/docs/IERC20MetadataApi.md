# Org.OpenAPITools.Api.IERC20MetadataApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

| Method | HTTP request | Description |
|--------|--------------|-------------|
| [**InterfacesIERC20MetadataAllowance**](IERC20MetadataApi.md#interfacesierc20metadataallowance) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/allowance | IERC20Metadata.allowance |
| [**InterfacesIERC20MetadataApprove**](IERC20MetadataApi.md#interfacesierc20metadataapprove) | **POST** /{networkId}/interface/IERC20Metadata/write/{address}/approve | IERC20Metadata.approve |
| [**InterfacesIERC20MetadataBalanceOf**](IERC20MetadataApi.md#interfacesierc20metadatabalanceof) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/balanceOf | IERC20Metadata.balanceOf |
| [**InterfacesIERC20MetadataDecimals**](IERC20MetadataApi.md#interfacesierc20metadatadecimals) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/decimals | IERC20Metadata.decimals |
| [**InterfacesIERC20MetadataName**](IERC20MetadataApi.md#interfacesierc20metadataname) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/name | IERC20Metadata.name |
| [**InterfacesIERC20MetadataSymbol**](IERC20MetadataApi.md#interfacesierc20metadatasymbol) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/symbol | IERC20Metadata.symbol |
| [**InterfacesIERC20MetadataTotalSupply**](IERC20MetadataApi.md#interfacesierc20metadatatotalsupply) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/totalSupply | IERC20Metadata.totalSupply |
| [**InterfacesIERC20MetadataTransfer**](IERC20MetadataApi.md#interfacesierc20metadatatransfer) | **POST** /{networkId}/interface/IERC20Metadata/write/{address}/transfer | IERC20Metadata.transfer |
| [**InterfacesIERC20MetadataTransferFrom**](IERC20MetadataApi.md#interfacesierc20metadatatransferfrom) | **POST** /{networkId}/interface/IERC20Metadata/write/{address}/transferFrom | IERC20Metadata.transferFrom |

<a id="interfacesierc20metadataallowance"></a>
# **InterfacesIERC20MetadataAllowance**
> InterfacesIERC20Allowance200Response InterfacesIERC20MetadataAllowance (string networkId, string address, InterfacesIERC20AllowanceRequest interfacesIERC20AllowanceRequest)

IERC20Metadata.allowance

Read `allowance(owner,spender)` on an instance of `IERC20Metadata`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC20MetadataAllowanceExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC20MetadataApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC20AllowanceRequest = new InterfacesIERC20AllowanceRequest(); // InterfacesIERC20AllowanceRequest | 

            try
            {
                // IERC20Metadata.allowance
                InterfacesIERC20Allowance200Response result = apiInstance.InterfacesIERC20MetadataAllowance(networkId, address, interfacesIERC20AllowanceRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC20MetadataApi.InterfacesIERC20MetadataAllowance: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC20MetadataAllowanceWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC20Metadata.allowance
    ApiResponse<InterfacesIERC20Allowance200Response> response = apiInstance.InterfacesIERC20MetadataAllowanceWithHttpInfo(networkId, address, interfacesIERC20AllowanceRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC20MetadataApi.InterfacesIERC20MetadataAllowanceWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC20AllowanceRequest** | [**InterfacesIERC20AllowanceRequest**](InterfacesIERC20AllowanceRequest.md) |  |  |

### Return type

[**InterfacesIERC20Allowance200Response**](InterfacesIERC20Allowance200Response.md)

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

<a id="interfacesierc20metadataapprove"></a>
# **InterfacesIERC20MetadataApprove**
> InterfacesIERC20Approve200Response InterfacesIERC20MetadataApprove (string networkId, string address, InterfacesIERC20ApproveRequest interfacesIERC20ApproveRequest)

IERC20Metadata.approve

Write `approve(spender,amount)` on an instance of `IERC20Metadata`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC20MetadataApproveExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC20MetadataApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC20ApproveRequest = new InterfacesIERC20ApproveRequest(); // InterfacesIERC20ApproveRequest | 

            try
            {
                // IERC20Metadata.approve
                InterfacesIERC20Approve200Response result = apiInstance.InterfacesIERC20MetadataApprove(networkId, address, interfacesIERC20ApproveRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC20MetadataApi.InterfacesIERC20MetadataApprove: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC20MetadataApproveWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC20Metadata.approve
    ApiResponse<InterfacesIERC20Approve200Response> response = apiInstance.InterfacesIERC20MetadataApproveWithHttpInfo(networkId, address, interfacesIERC20ApproveRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC20MetadataApi.InterfacesIERC20MetadataApproveWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC20ApproveRequest** | [**InterfacesIERC20ApproveRequest**](InterfacesIERC20ApproveRequest.md) |  |  |

### Return type

[**InterfacesIERC20Approve200Response**](InterfacesIERC20Approve200Response.md)

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

<a id="interfacesierc20metadatabalanceof"></a>
# **InterfacesIERC20MetadataBalanceOf**
> InterfacesIERC20BalanceOf200Response InterfacesIERC20MetadataBalanceOf (string networkId, string address, InterfacesIERC1820GetManagerRequest interfacesIERC1820GetManagerRequest)

IERC20Metadata.balanceOf

Read `balanceOf(account)` on an instance of `IERC20Metadata`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC20MetadataBalanceOfExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC20MetadataApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC1820GetManagerRequest = new InterfacesIERC1820GetManagerRequest(); // InterfacesIERC1820GetManagerRequest | 

            try
            {
                // IERC20Metadata.balanceOf
                InterfacesIERC20BalanceOf200Response result = apiInstance.InterfacesIERC20MetadataBalanceOf(networkId, address, interfacesIERC1820GetManagerRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC20MetadataApi.InterfacesIERC20MetadataBalanceOf: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC20MetadataBalanceOfWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC20Metadata.balanceOf
    ApiResponse<InterfacesIERC20BalanceOf200Response> response = apiInstance.InterfacesIERC20MetadataBalanceOfWithHttpInfo(networkId, address, interfacesIERC1820GetManagerRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC20MetadataApi.InterfacesIERC20MetadataBalanceOfWithHttpInfo: " + e.Message);
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

[**InterfacesIERC20BalanceOf200Response**](InterfacesIERC20BalanceOf200Response.md)

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

<a id="interfacesierc20metadatadecimals"></a>
# **InterfacesIERC20MetadataDecimals**
> InterfacesIERC20MetadataDecimals200Response InterfacesIERC20MetadataDecimals (string networkId, string address, InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest)

IERC20Metadata.decimals

Read `decimals()` on an instance of `IERC20Metadata`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC20MetadataDecimalsExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC20MetadataApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIBeaconImplementationRequest = new InterfacesIBeaconImplementationRequest(); // InterfacesIBeaconImplementationRequest | 

            try
            {
                // IERC20Metadata.decimals
                InterfacesIERC20MetadataDecimals200Response result = apiInstance.InterfacesIERC20MetadataDecimals(networkId, address, interfacesIBeaconImplementationRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC20MetadataApi.InterfacesIERC20MetadataDecimals: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC20MetadataDecimalsWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC20Metadata.decimals
    ApiResponse<InterfacesIERC20MetadataDecimals200Response> response = apiInstance.InterfacesIERC20MetadataDecimalsWithHttpInfo(networkId, address, interfacesIBeaconImplementationRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC20MetadataApi.InterfacesIERC20MetadataDecimalsWithHttpInfo: " + e.Message);
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

[**InterfacesIERC20MetadataDecimals200Response**](InterfacesIERC20MetadataDecimals200Response.md)

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

<a id="interfacesierc20metadataname"></a>
# **InterfacesIERC20MetadataName**
> InterfacesIContractURIContractURI200Response InterfacesIERC20MetadataName (string networkId, string address, InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest)

IERC20Metadata.name

Read `name()` on an instance of `IERC20Metadata`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC20MetadataNameExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC20MetadataApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIBeaconImplementationRequest = new InterfacesIBeaconImplementationRequest(); // InterfacesIBeaconImplementationRequest | 

            try
            {
                // IERC20Metadata.name
                InterfacesIContractURIContractURI200Response result = apiInstance.InterfacesIERC20MetadataName(networkId, address, interfacesIBeaconImplementationRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC20MetadataApi.InterfacesIERC20MetadataName: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC20MetadataNameWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC20Metadata.name
    ApiResponse<InterfacesIContractURIContractURI200Response> response = apiInstance.InterfacesIERC20MetadataNameWithHttpInfo(networkId, address, interfacesIBeaconImplementationRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC20MetadataApi.InterfacesIERC20MetadataNameWithHttpInfo: " + e.Message);
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

<a id="interfacesierc20metadatasymbol"></a>
# **InterfacesIERC20MetadataSymbol**
> InterfacesIContractURIContractURI200Response InterfacesIERC20MetadataSymbol (string networkId, string address, InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest)

IERC20Metadata.symbol

Read `symbol()` on an instance of `IERC20Metadata`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC20MetadataSymbolExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC20MetadataApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIBeaconImplementationRequest = new InterfacesIBeaconImplementationRequest(); // InterfacesIBeaconImplementationRequest | 

            try
            {
                // IERC20Metadata.symbol
                InterfacesIContractURIContractURI200Response result = apiInstance.InterfacesIERC20MetadataSymbol(networkId, address, interfacesIBeaconImplementationRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC20MetadataApi.InterfacesIERC20MetadataSymbol: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC20MetadataSymbolWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC20Metadata.symbol
    ApiResponse<InterfacesIContractURIContractURI200Response> response = apiInstance.InterfacesIERC20MetadataSymbolWithHttpInfo(networkId, address, interfacesIBeaconImplementationRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC20MetadataApi.InterfacesIERC20MetadataSymbolWithHttpInfo: " + e.Message);
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

<a id="interfacesierc20metadatatotalsupply"></a>
# **InterfacesIERC20MetadataTotalSupply**
> InterfacesIERC20TotalSupply200Response InterfacesIERC20MetadataTotalSupply (string networkId, string address, InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest)

IERC20Metadata.totalSupply

Read `totalSupply()` on an instance of `IERC20Metadata`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC20MetadataTotalSupplyExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC20MetadataApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIBeaconImplementationRequest = new InterfacesIBeaconImplementationRequest(); // InterfacesIBeaconImplementationRequest | 

            try
            {
                // IERC20Metadata.totalSupply
                InterfacesIERC20TotalSupply200Response result = apiInstance.InterfacesIERC20MetadataTotalSupply(networkId, address, interfacesIBeaconImplementationRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC20MetadataApi.InterfacesIERC20MetadataTotalSupply: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC20MetadataTotalSupplyWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC20Metadata.totalSupply
    ApiResponse<InterfacesIERC20TotalSupply200Response> response = apiInstance.InterfacesIERC20MetadataTotalSupplyWithHttpInfo(networkId, address, interfacesIBeaconImplementationRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC20MetadataApi.InterfacesIERC20MetadataTotalSupplyWithHttpInfo: " + e.Message);
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

<a id="interfacesierc20metadatatransfer"></a>
# **InterfacesIERC20MetadataTransfer**
> InterfacesIERC20Transfer200Response InterfacesIERC20MetadataTransfer (string networkId, string address, InterfacesIERC20TransferRequest interfacesIERC20TransferRequest)

IERC20Metadata.transfer

Write `transfer(to,amount)` on an instance of `IERC20Metadata`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC20MetadataTransferExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC20MetadataApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC20TransferRequest = new InterfacesIERC20TransferRequest(); // InterfacesIERC20TransferRequest | 

            try
            {
                // IERC20Metadata.transfer
                InterfacesIERC20Transfer200Response result = apiInstance.InterfacesIERC20MetadataTransfer(networkId, address, interfacesIERC20TransferRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC20MetadataApi.InterfacesIERC20MetadataTransfer: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC20MetadataTransferWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC20Metadata.transfer
    ApiResponse<InterfacesIERC20Transfer200Response> response = apiInstance.InterfacesIERC20MetadataTransferWithHttpInfo(networkId, address, interfacesIERC20TransferRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC20MetadataApi.InterfacesIERC20MetadataTransferWithHttpInfo: " + e.Message);
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

<a id="interfacesierc20metadatatransferfrom"></a>
# **InterfacesIERC20MetadataTransferFrom**
> InterfacesIERC20TransferFrom200Response InterfacesIERC20MetadataTransferFrom (string networkId, string address, InterfacesIERC20TransferFromRequest interfacesIERC20TransferFromRequest)

IERC20Metadata.transferFrom

Write `transferFrom(from,to,amount)` on an instance of `IERC20Metadata`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC20MetadataTransferFromExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC20MetadataApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC20TransferFromRequest = new InterfacesIERC20TransferFromRequest(); // InterfacesIERC20TransferFromRequest | 

            try
            {
                // IERC20Metadata.transferFrom
                InterfacesIERC20TransferFrom200Response result = apiInstance.InterfacesIERC20MetadataTransferFrom(networkId, address, interfacesIERC20TransferFromRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC20MetadataApi.InterfacesIERC20MetadataTransferFrom: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC20MetadataTransferFromWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC20Metadata.transferFrom
    ApiResponse<InterfacesIERC20TransferFrom200Response> response = apiInstance.InterfacesIERC20MetadataTransferFromWithHttpInfo(networkId, address, interfacesIERC20TransferFromRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC20MetadataApi.InterfacesIERC20MetadataTransferFromWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC20TransferFromRequest** | [**InterfacesIERC20TransferFromRequest**](InterfacesIERC20TransferFromRequest.md) |  |  |

### Return type

[**InterfacesIERC20TransferFrom200Response**](InterfacesIERC20TransferFrom200Response.md)

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

