# DeployApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**deployBeaconProxy**](DeployApi.md#deployBeaconProxy) | **POST** /{networkId}/deploy/BeaconProxy | Deploy BeaconProxy |
| [**deployChainlinkAnyApiClient**](DeployApi.md#deployChainlinkAnyApiClient) | **POST** /{networkId}/deploy/ChainlinkAnyApiClient | Deploy ChainlinkAnyApiClient |
| [**deployERC1155Mintable**](DeployApi.md#deployERC1155Mintable) | **POST** /{networkId}/deploy/ERC1155Mintable | Deploy ERC1155Mintable |
| [**deployERC20Mintable**](DeployApi.md#deployERC20Mintable) | **POST** /{networkId}/deploy/ERC20Mintable | Deploy ERC20Mintable |
| [**deployERC2981Setter**](DeployApi.md#deployERC2981Setter) | **POST** /{networkId}/deploy/ERC2981Setter | Deploy ERC2981Setter |
| [**deployERC721Mintable**](DeployApi.md#deployERC721Mintable) | **POST** /{networkId}/deploy/ERC721Mintable | Deploy ERC721Mintable |
| [**deployERC721MintableAutoId**](DeployApi.md#deployERC721MintableAutoId) | **POST** /{networkId}/deploy/ERC721MintableAutoId | Deploy ERC721MintableAutoId |
| [**deployTokenDna**](DeployApi.md#deployTokenDna) | **POST** /{networkId}/deploy/TokenDna | Deploy TokenDna |
| [**deployTokenURI**](DeployApi.md#deployTokenURI) | **POST** /{networkId}/deploy/TokenURI | Deploy TokenURI |
| [**deployTokenURIBaseURI**](DeployApi.md#deployTokenURIBaseURI) | **POST** /{networkId}/deploy/TokenURIBaseURI | Deploy TokenURIBaseURI |
| [**deployTokenURIDna**](DeployApi.md#deployTokenURIDna) | **POST** /{networkId}/deploy/TokenURIDna | Deploy TokenURIDna |
| [**deployUpgradeableBeacon**](DeployApi.md#deployUpgradeableBeacon) | **POST** /{networkId}/deploy/UpgradeableBeacon | Deploy UpgradeableBeacon |


<a id="deployBeaconProxy"></a>
# **deployBeaconProxy**
> Object deployBeaconProxy(networkId, deployBeaconProxyRequest)

Deploy BeaconProxy

Deploys an instance of &#x60;BeaconProxy&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.DeployApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    DeployApi apiInstance = new DeployApi(defaultClient);
    String networkId = "80001"; // String | The network id
    DeployBeaconProxyRequest deployBeaconProxyRequest = new DeployBeaconProxyRequest(); // DeployBeaconProxyRequest | 
    try {
      Object result = apiInstance.deployBeaconProxy(networkId, deployBeaconProxyRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling DeployApi#deployBeaconProxy");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **networkId** | **String**| The network id | [default to 80001] |
| **deployBeaconProxyRequest** | [**DeployBeaconProxyRequest**](DeployBeaconProxyRequest.md)|  | |

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

<a id="deployChainlinkAnyApiClient"></a>
# **deployChainlinkAnyApiClient**
> Object deployChainlinkAnyApiClient(networkId, deployChainlinkAnyApiClientRequest)

Deploy ChainlinkAnyApiClient

Deploys an instance of &#x60;ChainlinkAnyApiClient&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.DeployApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    DeployApi apiInstance = new DeployApi(defaultClient);
    String networkId = "80001"; // String | The network id
    DeployChainlinkAnyApiClientRequest deployChainlinkAnyApiClientRequest = new DeployChainlinkAnyApiClientRequest(); // DeployChainlinkAnyApiClientRequest | 
    try {
      Object result = apiInstance.deployChainlinkAnyApiClient(networkId, deployChainlinkAnyApiClientRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling DeployApi#deployChainlinkAnyApiClient");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **networkId** | **String**| The network id | [default to 80001] |
| **deployChainlinkAnyApiClientRequest** | [**DeployChainlinkAnyApiClientRequest**](DeployChainlinkAnyApiClientRequest.md)|  | |

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

<a id="deployERC1155Mintable"></a>
# **deployERC1155Mintable**
> Object deployERC1155Mintable(networkId, deployERC1155MintableRequest)

Deploy ERC1155Mintable

Deploys an instance of &#x60;ERC1155Mintable&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.DeployApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    DeployApi apiInstance = new DeployApi(defaultClient);
    String networkId = "80001"; // String | The network id
    DeployERC1155MintableRequest deployERC1155MintableRequest = new DeployERC1155MintableRequest(); // DeployERC1155MintableRequest | 
    try {
      Object result = apiInstance.deployERC1155Mintable(networkId, deployERC1155MintableRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling DeployApi#deployERC1155Mintable");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **networkId** | **String**| The network id | [default to 80001] |
| **deployERC1155MintableRequest** | [**DeployERC1155MintableRequest**](DeployERC1155MintableRequest.md)|  | |

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

<a id="deployERC20Mintable"></a>
# **deployERC20Mintable**
> Object deployERC20Mintable(networkId, deployERC20MintableRequest)

Deploy ERC20Mintable

Deploys an instance of &#x60;ERC20Mintable&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.DeployApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    DeployApi apiInstance = new DeployApi(defaultClient);
    String networkId = "80001"; // String | The network id
    DeployERC20MintableRequest deployERC20MintableRequest = new DeployERC20MintableRequest(); // DeployERC20MintableRequest | 
    try {
      Object result = apiInstance.deployERC20Mintable(networkId, deployERC20MintableRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling DeployApi#deployERC20Mintable");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **networkId** | **String**| The network id | [default to 80001] |
| **deployERC20MintableRequest** | [**DeployERC20MintableRequest**](DeployERC20MintableRequest.md)|  | |

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

<a id="deployERC2981Setter"></a>
# **deployERC2981Setter**
> Object deployERC2981Setter(networkId, deployERC2981SetterRequest)

Deploy ERC2981Setter

Deploys an instance of &#x60;ERC2981Setter&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.DeployApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    DeployApi apiInstance = new DeployApi(defaultClient);
    String networkId = "80001"; // String | The network id
    DeployERC2981SetterRequest deployERC2981SetterRequest = new DeployERC2981SetterRequest(); // DeployERC2981SetterRequest | 
    try {
      Object result = apiInstance.deployERC2981Setter(networkId, deployERC2981SetterRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling DeployApi#deployERC2981Setter");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **networkId** | **String**| The network id | [default to 80001] |
| **deployERC2981SetterRequest** | [**DeployERC2981SetterRequest**](DeployERC2981SetterRequest.md)|  | |

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

<a id="deployERC721Mintable"></a>
# **deployERC721Mintable**
> Object deployERC721Mintable(networkId, deployERC721MintableRequest)

Deploy ERC721Mintable

Deploys an instance of &#x60;ERC721Mintable&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.DeployApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    DeployApi apiInstance = new DeployApi(defaultClient);
    String networkId = "80001"; // String | The network id
    DeployERC721MintableRequest deployERC721MintableRequest = new DeployERC721MintableRequest(); // DeployERC721MintableRequest | 
    try {
      Object result = apiInstance.deployERC721Mintable(networkId, deployERC721MintableRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling DeployApi#deployERC721Mintable");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **networkId** | **String**| The network id | [default to 80001] |
| **deployERC721MintableRequest** | [**DeployERC721MintableRequest**](DeployERC721MintableRequest.md)|  | |

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

<a id="deployERC721MintableAutoId"></a>
# **deployERC721MintableAutoId**
> Object deployERC721MintableAutoId(networkId, deployERC721MintableRequest)

Deploy ERC721MintableAutoId

Deploys an instance of &#x60;ERC721MintableAutoId&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.DeployApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    DeployApi apiInstance = new DeployApi(defaultClient);
    String networkId = "80001"; // String | The network id
    DeployERC721MintableRequest deployERC721MintableRequest = new DeployERC721MintableRequest(); // DeployERC721MintableRequest | 
    try {
      Object result = apiInstance.deployERC721MintableAutoId(networkId, deployERC721MintableRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling DeployApi#deployERC721MintableAutoId");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **networkId** | **String**| The network id | [default to 80001] |
| **deployERC721MintableRequest** | [**DeployERC721MintableRequest**](DeployERC721MintableRequest.md)|  | |

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

<a id="deployTokenDna"></a>
# **deployTokenDna**
> Object deployTokenDna(networkId, deployTokenDnaRequest)

Deploy TokenDna

Deploys an instance of &#x60;TokenDna&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.DeployApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    DeployApi apiInstance = new DeployApi(defaultClient);
    String networkId = "80001"; // String | The network id
    DeployTokenDnaRequest deployTokenDnaRequest = new DeployTokenDnaRequest(); // DeployTokenDnaRequest | 
    try {
      Object result = apiInstance.deployTokenDna(networkId, deployTokenDnaRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling DeployApi#deployTokenDna");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **networkId** | **String**| The network id | [default to 80001] |
| **deployTokenDnaRequest** | [**DeployTokenDnaRequest**](DeployTokenDnaRequest.md)|  | |

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

<a id="deployTokenURI"></a>
# **deployTokenURI**
> Object deployTokenURI(networkId, deployTokenURIRequest)

Deploy TokenURI

Deploys an instance of &#x60;TokenURI&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.DeployApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    DeployApi apiInstance = new DeployApi(defaultClient);
    String networkId = "80001"; // String | The network id
    DeployTokenURIRequest deployTokenURIRequest = new DeployTokenURIRequest(); // DeployTokenURIRequest | 
    try {
      Object result = apiInstance.deployTokenURI(networkId, deployTokenURIRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling DeployApi#deployTokenURI");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **networkId** | **String**| The network id | [default to 80001] |
| **deployTokenURIRequest** | [**DeployTokenURIRequest**](DeployTokenURIRequest.md)|  | |

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

<a id="deployTokenURIBaseURI"></a>
# **deployTokenURIBaseURI**
> Object deployTokenURIBaseURI(networkId, deployTokenURIBaseURIRequest)

Deploy TokenURIBaseURI

Deploys an instance of &#x60;TokenURIBaseURI&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.DeployApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    DeployApi apiInstance = new DeployApi(defaultClient);
    String networkId = "80001"; // String | The network id
    DeployTokenURIBaseURIRequest deployTokenURIBaseURIRequest = new DeployTokenURIBaseURIRequest(); // DeployTokenURIBaseURIRequest | 
    try {
      Object result = apiInstance.deployTokenURIBaseURI(networkId, deployTokenURIBaseURIRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling DeployApi#deployTokenURIBaseURI");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **networkId** | **String**| The network id | [default to 80001] |
| **deployTokenURIBaseURIRequest** | [**DeployTokenURIBaseURIRequest**](DeployTokenURIBaseURIRequest.md)|  | |

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

<a id="deployTokenURIDna"></a>
# **deployTokenURIDna**
> Object deployTokenURIDna(networkId, deployTokenURIDnaRequest)

Deploy TokenURIDna

Deploys an instance of &#x60;TokenURIDna&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.DeployApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    DeployApi apiInstance = new DeployApi(defaultClient);
    String networkId = "80001"; // String | The network id
    DeployTokenURIDnaRequest deployTokenURIDnaRequest = new DeployTokenURIDnaRequest(); // DeployTokenURIDnaRequest | 
    try {
      Object result = apiInstance.deployTokenURIDna(networkId, deployTokenURIDnaRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling DeployApi#deployTokenURIDna");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **networkId** | **String**| The network id | [default to 80001] |
| **deployTokenURIDnaRequest** | [**DeployTokenURIDnaRequest**](DeployTokenURIDnaRequest.md)|  | |

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

<a id="deployUpgradeableBeacon"></a>
# **deployUpgradeableBeacon**
> Object deployUpgradeableBeacon(networkId, deployUpgradeableBeaconRequest)

Deploy UpgradeableBeacon

Deploys an instance of &#x60;UpgradeableBeacon&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.DeployApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    DeployApi apiInstance = new DeployApi(defaultClient);
    String networkId = "80001"; // String | The network id
    DeployUpgradeableBeaconRequest deployUpgradeableBeaconRequest = new DeployUpgradeableBeaconRequest(); // DeployUpgradeableBeaconRequest | 
    try {
      Object result = apiInstance.deployUpgradeableBeacon(networkId, deployUpgradeableBeaconRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling DeployApi#deployUpgradeableBeacon");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **networkId** | **String**| The network id | [default to 80001] |
| **deployUpgradeableBeaconRequest** | [**DeployUpgradeableBeaconRequest**](DeployUpgradeableBeaconRequest.md)|  | |

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

