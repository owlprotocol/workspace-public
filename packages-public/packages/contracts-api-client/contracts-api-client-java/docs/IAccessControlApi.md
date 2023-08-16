# IAccessControlApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**interfacesIAccessControlGetRoleAdmin**](IAccessControlApi.md#interfacesIAccessControlGetRoleAdmin) | **POST** /{networkId}/interface/IAccessControl/read/{address}/getRoleAdmin | IAccessControl.getRoleAdmin |
| [**interfacesIAccessControlGrantRole**](IAccessControlApi.md#interfacesIAccessControlGrantRole) | **POST** /{networkId}/interface/IAccessControl/write/{address}/grantRole | IAccessControl.grantRole |
| [**interfacesIAccessControlHasRole**](IAccessControlApi.md#interfacesIAccessControlHasRole) | **POST** /{networkId}/interface/IAccessControl/read/{address}/hasRole | IAccessControl.hasRole |
| [**interfacesIAccessControlRenounceRole**](IAccessControlApi.md#interfacesIAccessControlRenounceRole) | **POST** /{networkId}/interface/IAccessControl/write/{address}/renounceRole | IAccessControl.renounceRole |
| [**interfacesIAccessControlRevokeRole**](IAccessControlApi.md#interfacesIAccessControlRevokeRole) | **POST** /{networkId}/interface/IAccessControl/write/{address}/revokeRole | IAccessControl.revokeRole |


<a id="interfacesIAccessControlGetRoleAdmin"></a>
# **interfacesIAccessControlGetRoleAdmin**
> InterfacesIAccessControlGetRoleAdmin200Response interfacesIAccessControlGetRoleAdmin(networkId, address, interfacesIAccessControlGetRoleAdminRequest)

IAccessControl.getRoleAdmin

Read &#x60;getRoleAdmin(role)&#x60; on an instance of &#x60;IAccessControl&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.IAccessControlApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    IAccessControlApi apiInstance = new IAccessControlApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIAccessControlGetRoleAdminRequest interfacesIAccessControlGetRoleAdminRequest = new InterfacesIAccessControlGetRoleAdminRequest(); // InterfacesIAccessControlGetRoleAdminRequest | 
    try {
      InterfacesIAccessControlGetRoleAdmin200Response result = apiInstance.interfacesIAccessControlGetRoleAdmin(networkId, address, interfacesIAccessControlGetRoleAdminRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling IAccessControlApi#interfacesIAccessControlGetRoleAdmin");
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

<a id="interfacesIAccessControlGrantRole"></a>
# **interfacesIAccessControlGrantRole**
> InterfacesIAccessControlGrantRole200Response interfacesIAccessControlGrantRole(networkId, address, interfacesIAccessControlGrantRoleRequest)

IAccessControl.grantRole

Write &#x60;grantRole(role,account)&#x60; on an instance of &#x60;IAccessControl&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.IAccessControlApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    IAccessControlApi apiInstance = new IAccessControlApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIAccessControlGrantRoleRequest interfacesIAccessControlGrantRoleRequest = new InterfacesIAccessControlGrantRoleRequest(); // InterfacesIAccessControlGrantRoleRequest | 
    try {
      InterfacesIAccessControlGrantRole200Response result = apiInstance.interfacesIAccessControlGrantRole(networkId, address, interfacesIAccessControlGrantRoleRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling IAccessControlApi#interfacesIAccessControlGrantRole");
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

<a id="interfacesIAccessControlHasRole"></a>
# **interfacesIAccessControlHasRole**
> InterfacesIAccessControlHasRole200Response interfacesIAccessControlHasRole(networkId, address, interfacesIAccessControlGrantRoleRequest)

IAccessControl.hasRole

Read &#x60;hasRole(role,account)&#x60; on an instance of &#x60;IAccessControl&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.IAccessControlApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    IAccessControlApi apiInstance = new IAccessControlApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIAccessControlGrantRoleRequest interfacesIAccessControlGrantRoleRequest = new InterfacesIAccessControlGrantRoleRequest(); // InterfacesIAccessControlGrantRoleRequest | 
    try {
      InterfacesIAccessControlHasRole200Response result = apiInstance.interfacesIAccessControlHasRole(networkId, address, interfacesIAccessControlGrantRoleRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling IAccessControlApi#interfacesIAccessControlHasRole");
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

<a id="interfacesIAccessControlRenounceRole"></a>
# **interfacesIAccessControlRenounceRole**
> InterfacesIAccessControlGrantRole200Response interfacesIAccessControlRenounceRole(networkId, address, interfacesIAccessControlGrantRoleRequest)

IAccessControl.renounceRole

Write &#x60;renounceRole(role,account)&#x60; on an instance of &#x60;IAccessControl&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.IAccessControlApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    IAccessControlApi apiInstance = new IAccessControlApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIAccessControlGrantRoleRequest interfacesIAccessControlGrantRoleRequest = new InterfacesIAccessControlGrantRoleRequest(); // InterfacesIAccessControlGrantRoleRequest | 
    try {
      InterfacesIAccessControlGrantRole200Response result = apiInstance.interfacesIAccessControlRenounceRole(networkId, address, interfacesIAccessControlGrantRoleRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling IAccessControlApi#interfacesIAccessControlRenounceRole");
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

<a id="interfacesIAccessControlRevokeRole"></a>
# **interfacesIAccessControlRevokeRole**
> InterfacesIAccessControlGrantRole200Response interfacesIAccessControlRevokeRole(networkId, address, interfacesIAccessControlGrantRoleRequest)

IAccessControl.revokeRole

Write &#x60;revokeRole(role,account)&#x60; on an instance of &#x60;IAccessControl&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.IAccessControlApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    IAccessControlApi apiInstance = new IAccessControlApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIAccessControlGrantRoleRequest interfacesIAccessControlGrantRoleRequest = new InterfacesIAccessControlGrantRoleRequest(); // InterfacesIAccessControlGrantRoleRequest | 
    try {
      InterfacesIAccessControlGrantRole200Response result = apiInstance.interfacesIAccessControlRevokeRole(networkId, address, interfacesIAccessControlGrantRoleRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling IAccessControlApi#interfacesIAccessControlRevokeRole");
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

