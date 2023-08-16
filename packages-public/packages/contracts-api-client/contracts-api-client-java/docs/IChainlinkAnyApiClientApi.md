# IChainlinkAnyApiClientApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**interfacesIChainlinkAnyApiClientContractURI**](IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientContractURI) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/contractURI | IChainlinkAnyApiClient.contractURI |
| [**interfacesIChainlinkAnyApiClientDEFAULTADMINROLE**](IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientDEFAULTADMINROLE) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/DEFAULT_ADMIN_ROLE | IChainlinkAnyApiClient.DEFAULT_ADMIN_ROLE |
| [**interfacesIChainlinkAnyApiClientFulfill**](IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientFulfill) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/fulfill | IChainlinkAnyApiClient.fulfill |
| [**interfacesIChainlinkAnyApiClientGetRoleAdmin**](IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientGetRoleAdmin) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/getRoleAdmin | IChainlinkAnyApiClient.getRoleAdmin |
| [**interfacesIChainlinkAnyApiClientGrantRole**](IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientGrantRole) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/grantRole | IChainlinkAnyApiClient.grantRole |
| [**interfacesIChainlinkAnyApiClientHasRole**](IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientHasRole) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/hasRole | IChainlinkAnyApiClient.hasRole |
| [**interfacesIChainlinkAnyApiClientRenounceRole**](IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientRenounceRole) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/renounceRole | IChainlinkAnyApiClient.renounceRole |
| [**interfacesIChainlinkAnyApiClientRequest**](IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientRequest) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/request | IChainlinkAnyApiClient.request |
| [**interfacesIChainlinkAnyApiClientRequests**](IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientRequests) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/requests | IChainlinkAnyApiClient.requests |
| [**interfacesIChainlinkAnyApiClientRevokeRole**](IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientRevokeRole) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/revokeRole | IChainlinkAnyApiClient.revokeRole |
| [**interfacesIChainlinkAnyApiClientSetContractURI**](IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientSetContractURI) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/setContractURI | IChainlinkAnyApiClient.setContractURI |
| [**interfacesIChainlinkAnyApiClientSupportsInterface**](IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientSupportsInterface) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/supportsInterface | IChainlinkAnyApiClient.supportsInterface |
| [**interfacesIChainlinkAnyApiClientVersion**](IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientVersion) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/version | IChainlinkAnyApiClient.version |
| [**interfacesIChainlinkAnyApiClientWithdrawLink**](IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientWithdrawLink) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/withdrawLink | IChainlinkAnyApiClient.withdrawLink |


<a id="interfacesIChainlinkAnyApiClientContractURI"></a>
# **interfacesIChainlinkAnyApiClientContractURI**
> InterfacesIContractURIContractURI200Response interfacesIChainlinkAnyApiClientContractURI(networkId, address, interfacesIBeaconImplementationRequest)

IChainlinkAnyApiClient.contractURI

Read &#x60;contractURI()&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.IChainlinkAnyApiClientApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    IChainlinkAnyApiClientApi apiInstance = new IChainlinkAnyApiClientApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest = new InterfacesIBeaconImplementationRequest(); // InterfacesIBeaconImplementationRequest | 
    try {
      InterfacesIContractURIContractURI200Response result = apiInstance.interfacesIChainlinkAnyApiClientContractURI(networkId, address, interfacesIBeaconImplementationRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientContractURI");
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
| **address** | **String**| An ethereum address | |
| **interfacesIBeaconImplementationRequest** | [**InterfacesIBeaconImplementationRequest**](InterfacesIBeaconImplementationRequest.md)|  | |

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

<a id="interfacesIChainlinkAnyApiClientDEFAULTADMINROLE"></a>
# **interfacesIChainlinkAnyApiClientDEFAULTADMINROLE**
> InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE200Response interfacesIChainlinkAnyApiClientDEFAULTADMINROLE(networkId, address, interfacesIBeaconImplementationRequest)

IChainlinkAnyApiClient.DEFAULT_ADMIN_ROLE

Read &#x60;DEFAULT_ADMIN_ROLE()&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.IChainlinkAnyApiClientApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    IChainlinkAnyApiClientApi apiInstance = new IChainlinkAnyApiClientApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest = new InterfacesIBeaconImplementationRequest(); // InterfacesIBeaconImplementationRequest | 
    try {
      InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE200Response result = apiInstance.interfacesIChainlinkAnyApiClientDEFAULTADMINROLE(networkId, address, interfacesIBeaconImplementationRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientDEFAULTADMINROLE");
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
| **address** | **String**| An ethereum address | |
| **interfacesIBeaconImplementationRequest** | [**InterfacesIBeaconImplementationRequest**](InterfacesIBeaconImplementationRequest.md)|  | |

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

<a id="interfacesIChainlinkAnyApiClientFulfill"></a>
# **interfacesIChainlinkAnyApiClientFulfill**
> InterfacesIChainlinkAnyApiClientFulfill200Response interfacesIChainlinkAnyApiClientFulfill(networkId, address, interfacesIChainlinkAnyApiClientFulfillRequest)

IChainlinkAnyApiClient.fulfill

Write &#x60;fulfill(reqId,reqResponseData)&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.IChainlinkAnyApiClientApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    IChainlinkAnyApiClientApi apiInstance = new IChainlinkAnyApiClientApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIChainlinkAnyApiClientFulfillRequest interfacesIChainlinkAnyApiClientFulfillRequest = new InterfacesIChainlinkAnyApiClientFulfillRequest(); // InterfacesIChainlinkAnyApiClientFulfillRequest | 
    try {
      InterfacesIChainlinkAnyApiClientFulfill200Response result = apiInstance.interfacesIChainlinkAnyApiClientFulfill(networkId, address, interfacesIChainlinkAnyApiClientFulfillRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientFulfill");
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
| **address** | **String**| An ethereum address | |
| **interfacesIChainlinkAnyApiClientFulfillRequest** | [**InterfacesIChainlinkAnyApiClientFulfillRequest**](InterfacesIChainlinkAnyApiClientFulfillRequest.md)|  | |

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

<a id="interfacesIChainlinkAnyApiClientGetRoleAdmin"></a>
# **interfacesIChainlinkAnyApiClientGetRoleAdmin**
> InterfacesIAccessControlGetRoleAdmin200Response interfacesIChainlinkAnyApiClientGetRoleAdmin(networkId, address, interfacesIAccessControlGetRoleAdminRequest)

IChainlinkAnyApiClient.getRoleAdmin

Read &#x60;getRoleAdmin(role)&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.IChainlinkAnyApiClientApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    IChainlinkAnyApiClientApi apiInstance = new IChainlinkAnyApiClientApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIAccessControlGetRoleAdminRequest interfacesIAccessControlGetRoleAdminRequest = new InterfacesIAccessControlGetRoleAdminRequest(); // InterfacesIAccessControlGetRoleAdminRequest | 
    try {
      InterfacesIAccessControlGetRoleAdmin200Response result = apiInstance.interfacesIChainlinkAnyApiClientGetRoleAdmin(networkId, address, interfacesIAccessControlGetRoleAdminRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientGetRoleAdmin");
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
| **address** | **String**| An ethereum address | |
| **interfacesIAccessControlGetRoleAdminRequest** | [**InterfacesIAccessControlGetRoleAdminRequest**](InterfacesIAccessControlGetRoleAdminRequest.md)|  | |

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

<a id="interfacesIChainlinkAnyApiClientGrantRole"></a>
# **interfacesIChainlinkAnyApiClientGrantRole**
> InterfacesIAccessControlGrantRole200Response interfacesIChainlinkAnyApiClientGrantRole(networkId, address, interfacesIAccessControlGrantRoleRequest)

IChainlinkAnyApiClient.grantRole

Write &#x60;grantRole(role,account)&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.IChainlinkAnyApiClientApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    IChainlinkAnyApiClientApi apiInstance = new IChainlinkAnyApiClientApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIAccessControlGrantRoleRequest interfacesIAccessControlGrantRoleRequest = new InterfacesIAccessControlGrantRoleRequest(); // InterfacesIAccessControlGrantRoleRequest | 
    try {
      InterfacesIAccessControlGrantRole200Response result = apiInstance.interfacesIChainlinkAnyApiClientGrantRole(networkId, address, interfacesIAccessControlGrantRoleRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientGrantRole");
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
| **address** | **String**| An ethereum address | |
| **interfacesIAccessControlGrantRoleRequest** | [**InterfacesIAccessControlGrantRoleRequest**](InterfacesIAccessControlGrantRoleRequest.md)|  | |

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

<a id="interfacesIChainlinkAnyApiClientHasRole"></a>
# **interfacesIChainlinkAnyApiClientHasRole**
> InterfacesIAccessControlHasRole200Response interfacesIChainlinkAnyApiClientHasRole(networkId, address, interfacesIAccessControlGrantRoleRequest)

IChainlinkAnyApiClient.hasRole

Read &#x60;hasRole(role,account)&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.IChainlinkAnyApiClientApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    IChainlinkAnyApiClientApi apiInstance = new IChainlinkAnyApiClientApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIAccessControlGrantRoleRequest interfacesIAccessControlGrantRoleRequest = new InterfacesIAccessControlGrantRoleRequest(); // InterfacesIAccessControlGrantRoleRequest | 
    try {
      InterfacesIAccessControlHasRole200Response result = apiInstance.interfacesIChainlinkAnyApiClientHasRole(networkId, address, interfacesIAccessControlGrantRoleRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientHasRole");
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
| **address** | **String**| An ethereum address | |
| **interfacesIAccessControlGrantRoleRequest** | [**InterfacesIAccessControlGrantRoleRequest**](InterfacesIAccessControlGrantRoleRequest.md)|  | |

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

<a id="interfacesIChainlinkAnyApiClientRenounceRole"></a>
# **interfacesIChainlinkAnyApiClientRenounceRole**
> InterfacesIAccessControlGrantRole200Response interfacesIChainlinkAnyApiClientRenounceRole(networkId, address, interfacesIAccessControlGrantRoleRequest)

IChainlinkAnyApiClient.renounceRole

Write &#x60;renounceRole(role,account)&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.IChainlinkAnyApiClientApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    IChainlinkAnyApiClientApi apiInstance = new IChainlinkAnyApiClientApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIAccessControlGrantRoleRequest interfacesIAccessControlGrantRoleRequest = new InterfacesIAccessControlGrantRoleRequest(); // InterfacesIAccessControlGrantRoleRequest | 
    try {
      InterfacesIAccessControlGrantRole200Response result = apiInstance.interfacesIChainlinkAnyApiClientRenounceRole(networkId, address, interfacesIAccessControlGrantRoleRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientRenounceRole");
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
| **address** | **String**| An ethereum address | |
| **interfacesIAccessControlGrantRoleRequest** | [**InterfacesIAccessControlGrantRoleRequest**](InterfacesIAccessControlGrantRoleRequest.md)|  | |

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

<a id="interfacesIChainlinkAnyApiClientRequest"></a>
# **interfacesIChainlinkAnyApiClientRequest**
> InterfacesIChainlinkAnyApiClientRequest200Response interfacesIChainlinkAnyApiClientRequest(networkId, address, interfacesIChainlinkAnyApiClientRequestRequest)

IChainlinkAnyApiClient.request

Write &#x60;request(fulfillAddress,fulfillPrefixData,reqJobId,reqUrl,reqPath,reqFee)&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.IChainlinkAnyApiClientApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    IChainlinkAnyApiClientApi apiInstance = new IChainlinkAnyApiClientApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIChainlinkAnyApiClientRequestRequest interfacesIChainlinkAnyApiClientRequestRequest = new InterfacesIChainlinkAnyApiClientRequestRequest(); // InterfacesIChainlinkAnyApiClientRequestRequest | 
    try {
      InterfacesIChainlinkAnyApiClientRequest200Response result = apiInstance.interfacesIChainlinkAnyApiClientRequest(networkId, address, interfacesIChainlinkAnyApiClientRequestRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientRequest");
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
| **address** | **String**| An ethereum address | |
| **interfacesIChainlinkAnyApiClientRequestRequest** | [**InterfacesIChainlinkAnyApiClientRequestRequest**](InterfacesIChainlinkAnyApiClientRequestRequest.md)|  | |

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

<a id="interfacesIChainlinkAnyApiClientRequests"></a>
# **interfacesIChainlinkAnyApiClientRequests**
> InterfacesIChainlinkAnyApiClientRequests200Response interfacesIChainlinkAnyApiClientRequests(networkId, address, interfacesIChainlinkAnyApiClientRequestsRequest)

IChainlinkAnyApiClient.requests

Read &#x60;requests()&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.IChainlinkAnyApiClientApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    IChainlinkAnyApiClientApi apiInstance = new IChainlinkAnyApiClientApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIChainlinkAnyApiClientRequestsRequest interfacesIChainlinkAnyApiClientRequestsRequest = new InterfacesIChainlinkAnyApiClientRequestsRequest(); // InterfacesIChainlinkAnyApiClientRequestsRequest | 
    try {
      InterfacesIChainlinkAnyApiClientRequests200Response result = apiInstance.interfacesIChainlinkAnyApiClientRequests(networkId, address, interfacesIChainlinkAnyApiClientRequestsRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientRequests");
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
| **address** | **String**| An ethereum address | |
| **interfacesIChainlinkAnyApiClientRequestsRequest** | [**InterfacesIChainlinkAnyApiClientRequestsRequest**](InterfacesIChainlinkAnyApiClientRequestsRequest.md)|  | |

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

<a id="interfacesIChainlinkAnyApiClientRevokeRole"></a>
# **interfacesIChainlinkAnyApiClientRevokeRole**
> InterfacesIAccessControlGrantRole200Response interfacesIChainlinkAnyApiClientRevokeRole(networkId, address, interfacesIAccessControlGrantRoleRequest)

IChainlinkAnyApiClient.revokeRole

Write &#x60;revokeRole(role,account)&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.IChainlinkAnyApiClientApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    IChainlinkAnyApiClientApi apiInstance = new IChainlinkAnyApiClientApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIAccessControlGrantRoleRequest interfacesIAccessControlGrantRoleRequest = new InterfacesIAccessControlGrantRoleRequest(); // InterfacesIAccessControlGrantRoleRequest | 
    try {
      InterfacesIAccessControlGrantRole200Response result = apiInstance.interfacesIChainlinkAnyApiClientRevokeRole(networkId, address, interfacesIAccessControlGrantRoleRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientRevokeRole");
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
| **address** | **String**| An ethereum address | |
| **interfacesIAccessControlGrantRoleRequest** | [**InterfacesIAccessControlGrantRoleRequest**](InterfacesIAccessControlGrantRoleRequest.md)|  | |

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

<a id="interfacesIChainlinkAnyApiClientSetContractURI"></a>
# **interfacesIChainlinkAnyApiClientSetContractURI**
> InterfacesIContractURISetContractURI200Response interfacesIChainlinkAnyApiClientSetContractURI(networkId, address, interfacesIContractURISetContractURIRequest)

IChainlinkAnyApiClient.setContractURI

Write &#x60;setContractURI(uri)&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.IChainlinkAnyApiClientApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    IChainlinkAnyApiClientApi apiInstance = new IChainlinkAnyApiClientApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIContractURISetContractURIRequest interfacesIContractURISetContractURIRequest = new InterfacesIContractURISetContractURIRequest(); // InterfacesIContractURISetContractURIRequest | 
    try {
      InterfacesIContractURISetContractURI200Response result = apiInstance.interfacesIChainlinkAnyApiClientSetContractURI(networkId, address, interfacesIContractURISetContractURIRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientSetContractURI");
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
| **address** | **String**| An ethereum address | |
| **interfacesIContractURISetContractURIRequest** | [**InterfacesIContractURISetContractURIRequest**](InterfacesIContractURISetContractURIRequest.md)|  | |

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

<a id="interfacesIChainlinkAnyApiClientSupportsInterface"></a>
# **interfacesIChainlinkAnyApiClientSupportsInterface**
> InterfacesIERC165SupportsInterface200Response interfacesIChainlinkAnyApiClientSupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest)

IChainlinkAnyApiClient.supportsInterface

Read &#x60;supportsInterface(interfaceId)&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.IChainlinkAnyApiClientApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    IChainlinkAnyApiClientApi apiInstance = new IChainlinkAnyApiClientApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC165SupportsInterfaceRequest interfacesIERC165SupportsInterfaceRequest = new InterfacesIERC165SupportsInterfaceRequest(); // InterfacesIERC165SupportsInterfaceRequest | 
    try {
      InterfacesIERC165SupportsInterface200Response result = apiInstance.interfacesIChainlinkAnyApiClientSupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientSupportsInterface");
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
| **address** | **String**| An ethereum address | |
| **interfacesIERC165SupportsInterfaceRequest** | [**InterfacesIERC165SupportsInterfaceRequest**](InterfacesIERC165SupportsInterfaceRequest.md)|  | |

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

<a id="interfacesIChainlinkAnyApiClientVersion"></a>
# **interfacesIChainlinkAnyApiClientVersion**
> InterfacesIContractURIContractURI200Response interfacesIChainlinkAnyApiClientVersion(networkId, address, interfacesIBeaconImplementationRequest)

IChainlinkAnyApiClient.version

Read &#x60;version()&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.IChainlinkAnyApiClientApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    IChainlinkAnyApiClientApi apiInstance = new IChainlinkAnyApiClientApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest = new InterfacesIBeaconImplementationRequest(); // InterfacesIBeaconImplementationRequest | 
    try {
      InterfacesIContractURIContractURI200Response result = apiInstance.interfacesIChainlinkAnyApiClientVersion(networkId, address, interfacesIBeaconImplementationRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientVersion");
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
| **address** | **String**| An ethereum address | |
| **interfacesIBeaconImplementationRequest** | [**InterfacesIBeaconImplementationRequest**](InterfacesIBeaconImplementationRequest.md)|  | |

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

<a id="interfacesIChainlinkAnyApiClientWithdrawLink"></a>
# **interfacesIChainlinkAnyApiClientWithdrawLink**
> InterfacesIERC20Transfer200Response interfacesIChainlinkAnyApiClientWithdrawLink(networkId, address, interfacesIERC20TransferRequest)

IChainlinkAnyApiClient.withdrawLink

Write &#x60;withdrawLink(to,amount)&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.IChainlinkAnyApiClientApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    IChainlinkAnyApiClientApi apiInstance = new IChainlinkAnyApiClientApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC20TransferRequest interfacesIERC20TransferRequest = new InterfacesIERC20TransferRequest(); // InterfacesIERC20TransferRequest | 
    try {
      InterfacesIERC20Transfer200Response result = apiInstance.interfacesIChainlinkAnyApiClientWithdrawLink(networkId, address, interfacesIERC20TransferRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientWithdrawLink");
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
| **address** | **String**| An ethereum address | |
| **interfacesIERC20TransferRequest** | [**InterfacesIERC20TransferRequest**](InterfacesIERC20TransferRequest.md)|  | |

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

