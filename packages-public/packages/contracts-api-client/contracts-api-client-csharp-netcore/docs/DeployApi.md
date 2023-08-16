# Org.OpenAPITools.Api.DeployApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

| Method | HTTP request | Description |
|--------|--------------|-------------|
| [**DeployBeaconProxy**](DeployApi.md#deploybeaconproxy) | **POST** /{networkId}/deploy/BeaconProxy | Deploy BeaconProxy |
| [**DeployChainlinkAnyApiClient**](DeployApi.md#deploychainlinkanyapiclient) | **POST** /{networkId}/deploy/ChainlinkAnyApiClient | Deploy ChainlinkAnyApiClient |
| [**DeployERC1155Mintable**](DeployApi.md#deployerc1155mintable) | **POST** /{networkId}/deploy/ERC1155Mintable | Deploy ERC1155Mintable |
| [**DeployERC20Mintable**](DeployApi.md#deployerc20mintable) | **POST** /{networkId}/deploy/ERC20Mintable | Deploy ERC20Mintable |
| [**DeployERC2981Setter**](DeployApi.md#deployerc2981setter) | **POST** /{networkId}/deploy/ERC2981Setter | Deploy ERC2981Setter |
| [**DeployERC721Mintable**](DeployApi.md#deployerc721mintable) | **POST** /{networkId}/deploy/ERC721Mintable | Deploy ERC721Mintable |
| [**DeployERC721MintableAutoId**](DeployApi.md#deployerc721mintableautoid) | **POST** /{networkId}/deploy/ERC721MintableAutoId | Deploy ERC721MintableAutoId |
| [**DeployTokenDna**](DeployApi.md#deploytokendna) | **POST** /{networkId}/deploy/TokenDna | Deploy TokenDna |
| [**DeployTokenURI**](DeployApi.md#deploytokenuri) | **POST** /{networkId}/deploy/TokenURI | Deploy TokenURI |
| [**DeployTokenURIBaseURI**](DeployApi.md#deploytokenuribaseuri) | **POST** /{networkId}/deploy/TokenURIBaseURI | Deploy TokenURIBaseURI |
| [**DeployTokenURIDna**](DeployApi.md#deploytokenuridna) | **POST** /{networkId}/deploy/TokenURIDna | Deploy TokenURIDna |
| [**DeployUpgradeableBeacon**](DeployApi.md#deployupgradeablebeacon) | **POST** /{networkId}/deploy/UpgradeableBeacon | Deploy UpgradeableBeacon |

<a id="deploybeaconproxy"></a>
# **DeployBeaconProxy**
> Object DeployBeaconProxy (string networkId, DeployBeaconProxyRequest deployBeaconProxyRequest)

Deploy BeaconProxy

Deploys an instance of `BeaconProxy`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class DeployBeaconProxyExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new DeployApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var deployBeaconProxyRequest = new DeployBeaconProxyRequest(); // DeployBeaconProxyRequest | 

            try
            {
                // Deploy BeaconProxy
                Object result = apiInstance.DeployBeaconProxy(networkId, deployBeaconProxyRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DeployApi.DeployBeaconProxy: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the DeployBeaconProxyWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Deploy BeaconProxy
    ApiResponse<Object> response = apiInstance.DeployBeaconProxyWithHttpInfo(networkId, deployBeaconProxyRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling DeployApi.DeployBeaconProxyWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **deployBeaconProxyRequest** | [**DeployBeaconProxyRequest**](DeployBeaconProxyRequest.md) |  |  |

### Return type

**Object**

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

<a id="deploychainlinkanyapiclient"></a>
# **DeployChainlinkAnyApiClient**
> Object DeployChainlinkAnyApiClient (string networkId, DeployChainlinkAnyApiClientRequest deployChainlinkAnyApiClientRequest)

Deploy ChainlinkAnyApiClient

Deploys an instance of `ChainlinkAnyApiClient`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class DeployChainlinkAnyApiClientExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new DeployApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var deployChainlinkAnyApiClientRequest = new DeployChainlinkAnyApiClientRequest(); // DeployChainlinkAnyApiClientRequest | 

            try
            {
                // Deploy ChainlinkAnyApiClient
                Object result = apiInstance.DeployChainlinkAnyApiClient(networkId, deployChainlinkAnyApiClientRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DeployApi.DeployChainlinkAnyApiClient: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the DeployChainlinkAnyApiClientWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Deploy ChainlinkAnyApiClient
    ApiResponse<Object> response = apiInstance.DeployChainlinkAnyApiClientWithHttpInfo(networkId, deployChainlinkAnyApiClientRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling DeployApi.DeployChainlinkAnyApiClientWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **deployChainlinkAnyApiClientRequest** | [**DeployChainlinkAnyApiClientRequest**](DeployChainlinkAnyApiClientRequest.md) |  |  |

### Return type

**Object**

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

<a id="deployerc1155mintable"></a>
# **DeployERC1155Mintable**
> Object DeployERC1155Mintable (string networkId, DeployERC1155MintableRequest deployERC1155MintableRequest)

Deploy ERC1155Mintable

Deploys an instance of `ERC1155Mintable`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class DeployERC1155MintableExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new DeployApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var deployERC1155MintableRequest = new DeployERC1155MintableRequest(); // DeployERC1155MintableRequest | 

            try
            {
                // Deploy ERC1155Mintable
                Object result = apiInstance.DeployERC1155Mintable(networkId, deployERC1155MintableRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DeployApi.DeployERC1155Mintable: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the DeployERC1155MintableWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Deploy ERC1155Mintable
    ApiResponse<Object> response = apiInstance.DeployERC1155MintableWithHttpInfo(networkId, deployERC1155MintableRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling DeployApi.DeployERC1155MintableWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **deployERC1155MintableRequest** | [**DeployERC1155MintableRequest**](DeployERC1155MintableRequest.md) |  |  |

### Return type

**Object**

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

<a id="deployerc20mintable"></a>
# **DeployERC20Mintable**
> Object DeployERC20Mintable (string networkId, DeployERC20MintableRequest deployERC20MintableRequest)

Deploy ERC20Mintable

Deploys an instance of `ERC20Mintable`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class DeployERC20MintableExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new DeployApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var deployERC20MintableRequest = new DeployERC20MintableRequest(); // DeployERC20MintableRequest | 

            try
            {
                // Deploy ERC20Mintable
                Object result = apiInstance.DeployERC20Mintable(networkId, deployERC20MintableRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DeployApi.DeployERC20Mintable: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the DeployERC20MintableWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Deploy ERC20Mintable
    ApiResponse<Object> response = apiInstance.DeployERC20MintableWithHttpInfo(networkId, deployERC20MintableRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling DeployApi.DeployERC20MintableWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **deployERC20MintableRequest** | [**DeployERC20MintableRequest**](DeployERC20MintableRequest.md) |  |  |

### Return type

**Object**

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

<a id="deployerc2981setter"></a>
# **DeployERC2981Setter**
> Object DeployERC2981Setter (string networkId, DeployERC2981SetterRequest deployERC2981SetterRequest)

Deploy ERC2981Setter

Deploys an instance of `ERC2981Setter`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class DeployERC2981SetterExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new DeployApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var deployERC2981SetterRequest = new DeployERC2981SetterRequest(); // DeployERC2981SetterRequest | 

            try
            {
                // Deploy ERC2981Setter
                Object result = apiInstance.DeployERC2981Setter(networkId, deployERC2981SetterRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DeployApi.DeployERC2981Setter: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the DeployERC2981SetterWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Deploy ERC2981Setter
    ApiResponse<Object> response = apiInstance.DeployERC2981SetterWithHttpInfo(networkId, deployERC2981SetterRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling DeployApi.DeployERC2981SetterWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **deployERC2981SetterRequest** | [**DeployERC2981SetterRequest**](DeployERC2981SetterRequest.md) |  |  |

### Return type

**Object**

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

<a id="deployerc721mintable"></a>
# **DeployERC721Mintable**
> Object DeployERC721Mintable (string networkId, DeployERC721MintableRequest deployERC721MintableRequest)

Deploy ERC721Mintable

Deploys an instance of `ERC721Mintable`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class DeployERC721MintableExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new DeployApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var deployERC721MintableRequest = new DeployERC721MintableRequest(); // DeployERC721MintableRequest | 

            try
            {
                // Deploy ERC721Mintable
                Object result = apiInstance.DeployERC721Mintable(networkId, deployERC721MintableRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DeployApi.DeployERC721Mintable: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the DeployERC721MintableWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Deploy ERC721Mintable
    ApiResponse<Object> response = apiInstance.DeployERC721MintableWithHttpInfo(networkId, deployERC721MintableRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling DeployApi.DeployERC721MintableWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **deployERC721MintableRequest** | [**DeployERC721MintableRequest**](DeployERC721MintableRequest.md) |  |  |

### Return type

**Object**

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

<a id="deployerc721mintableautoid"></a>
# **DeployERC721MintableAutoId**
> Object DeployERC721MintableAutoId (string networkId, DeployERC721MintableRequest deployERC721MintableRequest)

Deploy ERC721MintableAutoId

Deploys an instance of `ERC721MintableAutoId`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class DeployERC721MintableAutoIdExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new DeployApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var deployERC721MintableRequest = new DeployERC721MintableRequest(); // DeployERC721MintableRequest | 

            try
            {
                // Deploy ERC721MintableAutoId
                Object result = apiInstance.DeployERC721MintableAutoId(networkId, deployERC721MintableRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DeployApi.DeployERC721MintableAutoId: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the DeployERC721MintableAutoIdWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Deploy ERC721MintableAutoId
    ApiResponse<Object> response = apiInstance.DeployERC721MintableAutoIdWithHttpInfo(networkId, deployERC721MintableRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling DeployApi.DeployERC721MintableAutoIdWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **deployERC721MintableRequest** | [**DeployERC721MintableRequest**](DeployERC721MintableRequest.md) |  |  |

### Return type

**Object**

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

<a id="deploytokendna"></a>
# **DeployTokenDna**
> Object DeployTokenDna (string networkId, DeployTokenDnaRequest deployTokenDnaRequest)

Deploy TokenDna

Deploys an instance of `TokenDna`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class DeployTokenDnaExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new DeployApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var deployTokenDnaRequest = new DeployTokenDnaRequest(); // DeployTokenDnaRequest | 

            try
            {
                // Deploy TokenDna
                Object result = apiInstance.DeployTokenDna(networkId, deployTokenDnaRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DeployApi.DeployTokenDna: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the DeployTokenDnaWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Deploy TokenDna
    ApiResponse<Object> response = apiInstance.DeployTokenDnaWithHttpInfo(networkId, deployTokenDnaRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling DeployApi.DeployTokenDnaWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **deployTokenDnaRequest** | [**DeployTokenDnaRequest**](DeployTokenDnaRequest.md) |  |  |

### Return type

**Object**

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

<a id="deploytokenuri"></a>
# **DeployTokenURI**
> Object DeployTokenURI (string networkId, DeployTokenURIRequest deployTokenURIRequest)

Deploy TokenURI

Deploys an instance of `TokenURI`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class DeployTokenURIExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new DeployApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var deployTokenURIRequest = new DeployTokenURIRequest(); // DeployTokenURIRequest | 

            try
            {
                // Deploy TokenURI
                Object result = apiInstance.DeployTokenURI(networkId, deployTokenURIRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DeployApi.DeployTokenURI: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the DeployTokenURIWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Deploy TokenURI
    ApiResponse<Object> response = apiInstance.DeployTokenURIWithHttpInfo(networkId, deployTokenURIRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling DeployApi.DeployTokenURIWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **deployTokenURIRequest** | [**DeployTokenURIRequest**](DeployTokenURIRequest.md) |  |  |

### Return type

**Object**

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

<a id="deploytokenuribaseuri"></a>
# **DeployTokenURIBaseURI**
> Object DeployTokenURIBaseURI (string networkId, DeployTokenURIBaseURIRequest deployTokenURIBaseURIRequest)

Deploy TokenURIBaseURI

Deploys an instance of `TokenURIBaseURI`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class DeployTokenURIBaseURIExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new DeployApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var deployTokenURIBaseURIRequest = new DeployTokenURIBaseURIRequest(); // DeployTokenURIBaseURIRequest | 

            try
            {
                // Deploy TokenURIBaseURI
                Object result = apiInstance.DeployTokenURIBaseURI(networkId, deployTokenURIBaseURIRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DeployApi.DeployTokenURIBaseURI: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the DeployTokenURIBaseURIWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Deploy TokenURIBaseURI
    ApiResponse<Object> response = apiInstance.DeployTokenURIBaseURIWithHttpInfo(networkId, deployTokenURIBaseURIRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling DeployApi.DeployTokenURIBaseURIWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **deployTokenURIBaseURIRequest** | [**DeployTokenURIBaseURIRequest**](DeployTokenURIBaseURIRequest.md) |  |  |

### Return type

**Object**

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

<a id="deploytokenuridna"></a>
# **DeployTokenURIDna**
> Object DeployTokenURIDna (string networkId, DeployTokenURIDnaRequest deployTokenURIDnaRequest)

Deploy TokenURIDna

Deploys an instance of `TokenURIDna`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class DeployTokenURIDnaExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new DeployApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var deployTokenURIDnaRequest = new DeployTokenURIDnaRequest(); // DeployTokenURIDnaRequest | 

            try
            {
                // Deploy TokenURIDna
                Object result = apiInstance.DeployTokenURIDna(networkId, deployTokenURIDnaRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DeployApi.DeployTokenURIDna: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the DeployTokenURIDnaWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Deploy TokenURIDna
    ApiResponse<Object> response = apiInstance.DeployTokenURIDnaWithHttpInfo(networkId, deployTokenURIDnaRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling DeployApi.DeployTokenURIDnaWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **deployTokenURIDnaRequest** | [**DeployTokenURIDnaRequest**](DeployTokenURIDnaRequest.md) |  |  |

### Return type

**Object**

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

<a id="deployupgradeablebeacon"></a>
# **DeployUpgradeableBeacon**
> Object DeployUpgradeableBeacon (string networkId, DeployUpgradeableBeaconRequest deployUpgradeableBeaconRequest)

Deploy UpgradeableBeacon

Deploys an instance of `UpgradeableBeacon`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class DeployUpgradeableBeaconExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new DeployApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var deployUpgradeableBeaconRequest = new DeployUpgradeableBeaconRequest(); // DeployUpgradeableBeaconRequest | 

            try
            {
                // Deploy UpgradeableBeacon
                Object result = apiInstance.DeployUpgradeableBeacon(networkId, deployUpgradeableBeaconRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling DeployApi.DeployUpgradeableBeacon: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the DeployUpgradeableBeaconWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Deploy UpgradeableBeacon
    ApiResponse<Object> response = apiInstance.DeployUpgradeableBeaconWithHttpInfo(networkId, deployUpgradeableBeaconRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling DeployApi.DeployUpgradeableBeaconWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **deployUpgradeableBeaconRequest** | [**DeployUpgradeableBeaconRequest**](DeployUpgradeableBeaconRequest.md) |  |  |

### Return type

**Object**

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

