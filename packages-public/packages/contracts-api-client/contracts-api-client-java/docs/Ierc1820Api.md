# Ierc1820Api

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**interfacesIERC1820GetInterfaceImplementer**](Ierc1820Api.md#interfacesIERC1820GetInterfaceImplementer) | **POST** /{networkId}/interface/IERC1820/read/{address}/getInterfaceImplementer | IERC1820.getInterfaceImplementer |
| [**interfacesIERC1820GetManager**](Ierc1820Api.md#interfacesIERC1820GetManager) | **POST** /{networkId}/interface/IERC1820/read/{address}/getManager | IERC1820.getManager |
| [**interfacesIERC1820ImplementsERC165Interface**](Ierc1820Api.md#interfacesIERC1820ImplementsERC165Interface) | **POST** /{networkId}/interface/IERC1820/read/{address}/implementsERC165Interface | IERC1820.implementsERC165Interface |
| [**interfacesIERC1820ImplementsERC165InterfaceNoCache**](Ierc1820Api.md#interfacesIERC1820ImplementsERC165InterfaceNoCache) | **POST** /{networkId}/interface/IERC1820/read/{address}/implementsERC165InterfaceNoCache | IERC1820.implementsERC165InterfaceNoCache |
| [**interfacesIERC1820InterfaceHash**](Ierc1820Api.md#interfacesIERC1820InterfaceHash) | **POST** /{networkId}/interface/IERC1820/read/{address}/interfaceHash | IERC1820.interfaceHash |
| [**interfacesIERC1820SetInterfaceImplementer**](Ierc1820Api.md#interfacesIERC1820SetInterfaceImplementer) | **POST** /{networkId}/interface/IERC1820/write/{address}/setInterfaceImplementer | IERC1820.setInterfaceImplementer |
| [**interfacesIERC1820SetManager**](Ierc1820Api.md#interfacesIERC1820SetManager) | **POST** /{networkId}/interface/IERC1820/write/{address}/setManager | IERC1820.setManager |
| [**interfacesIERC1820UpdateERC165Cache**](Ierc1820Api.md#interfacesIERC1820UpdateERC165Cache) | **POST** /{networkId}/interface/IERC1820/write/{address}/updateERC165Cache | IERC1820.updateERC165Cache |


<a id="interfacesIERC1820GetInterfaceImplementer"></a>
# **interfacesIERC1820GetInterfaceImplementer**
> InterfacesIERC1820GetInterfaceImplementer200Response interfacesIERC1820GetInterfaceImplementer(networkId, address, interfacesIERC1820GetInterfaceImplementerRequest)

IERC1820.getInterfaceImplementer

Read &#x60;getInterfaceImplementer(account,_interfaceHash)&#x60; on an instance of &#x60;IERC1820&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.Ierc1820Api;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    Ierc1820Api apiInstance = new Ierc1820Api(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC1820GetInterfaceImplementerRequest interfacesIERC1820GetInterfaceImplementerRequest = new InterfacesIERC1820GetInterfaceImplementerRequest(); // InterfacesIERC1820GetInterfaceImplementerRequest | 
    try {
      InterfacesIERC1820GetInterfaceImplementer200Response result = apiInstance.interfacesIERC1820GetInterfaceImplementer(networkId, address, interfacesIERC1820GetInterfaceImplementerRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling Ierc1820Api#interfacesIERC1820GetInterfaceImplementer");
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
| **interfacesIERC1820GetInterfaceImplementerRequest** | [**InterfacesIERC1820GetInterfaceImplementerRequest**](InterfacesIERC1820GetInterfaceImplementerRequest.md)|  | |

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

<a id="interfacesIERC1820GetManager"></a>
# **interfacesIERC1820GetManager**
> InterfacesIERC1820GetManager200Response interfacesIERC1820GetManager(networkId, address, interfacesIERC1820GetManagerRequest)

IERC1820.getManager

Read &#x60;getManager(account)&#x60; on an instance of &#x60;IERC1820&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.Ierc1820Api;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    Ierc1820Api apiInstance = new Ierc1820Api(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC1820GetManagerRequest interfacesIERC1820GetManagerRequest = new InterfacesIERC1820GetManagerRequest(); // InterfacesIERC1820GetManagerRequest | 
    try {
      InterfacesIERC1820GetManager200Response result = apiInstance.interfacesIERC1820GetManager(networkId, address, interfacesIERC1820GetManagerRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling Ierc1820Api#interfacesIERC1820GetManager");
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
| **interfacesIERC1820GetManagerRequest** | [**InterfacesIERC1820GetManagerRequest**](InterfacesIERC1820GetManagerRequest.md)|  | |

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

<a id="interfacesIERC1820ImplementsERC165Interface"></a>
# **interfacesIERC1820ImplementsERC165Interface**
> InterfacesIERC1820ImplementsERC165Interface200Response interfacesIERC1820ImplementsERC165Interface(networkId, address, interfacesIERC1820ImplementsERC165InterfaceRequest)

IERC1820.implementsERC165Interface

Read &#x60;implementsERC165Interface(account,interfaceId)&#x60; on an instance of &#x60;IERC1820&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.Ierc1820Api;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    Ierc1820Api apiInstance = new Ierc1820Api(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC1820ImplementsERC165InterfaceRequest interfacesIERC1820ImplementsERC165InterfaceRequest = new InterfacesIERC1820ImplementsERC165InterfaceRequest(); // InterfacesIERC1820ImplementsERC165InterfaceRequest | 
    try {
      InterfacesIERC1820ImplementsERC165Interface200Response result = apiInstance.interfacesIERC1820ImplementsERC165Interface(networkId, address, interfacesIERC1820ImplementsERC165InterfaceRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling Ierc1820Api#interfacesIERC1820ImplementsERC165Interface");
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
| **interfacesIERC1820ImplementsERC165InterfaceRequest** | [**InterfacesIERC1820ImplementsERC165InterfaceRequest**](InterfacesIERC1820ImplementsERC165InterfaceRequest.md)|  | |

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

<a id="interfacesIERC1820ImplementsERC165InterfaceNoCache"></a>
# **interfacesIERC1820ImplementsERC165InterfaceNoCache**
> InterfacesIERC1820ImplementsERC165Interface200Response interfacesIERC1820ImplementsERC165InterfaceNoCache(networkId, address, interfacesIERC1820ImplementsERC165InterfaceRequest)

IERC1820.implementsERC165InterfaceNoCache

Read &#x60;implementsERC165InterfaceNoCache(account,interfaceId)&#x60; on an instance of &#x60;IERC1820&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.Ierc1820Api;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    Ierc1820Api apiInstance = new Ierc1820Api(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC1820ImplementsERC165InterfaceRequest interfacesIERC1820ImplementsERC165InterfaceRequest = new InterfacesIERC1820ImplementsERC165InterfaceRequest(); // InterfacesIERC1820ImplementsERC165InterfaceRequest | 
    try {
      InterfacesIERC1820ImplementsERC165Interface200Response result = apiInstance.interfacesIERC1820ImplementsERC165InterfaceNoCache(networkId, address, interfacesIERC1820ImplementsERC165InterfaceRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling Ierc1820Api#interfacesIERC1820ImplementsERC165InterfaceNoCache");
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
| **interfacesIERC1820ImplementsERC165InterfaceRequest** | [**InterfacesIERC1820ImplementsERC165InterfaceRequest**](InterfacesIERC1820ImplementsERC165InterfaceRequest.md)|  | |

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

<a id="interfacesIERC1820InterfaceHash"></a>
# **interfacesIERC1820InterfaceHash**
> InterfacesIERC1820InterfaceHash200Response interfacesIERC1820InterfaceHash(networkId, address, interfacesIERC1820InterfaceHashRequest)

IERC1820.interfaceHash

Read &#x60;interfaceHash(interfaceName)&#x60; on an instance of &#x60;IERC1820&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.Ierc1820Api;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    Ierc1820Api apiInstance = new Ierc1820Api(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC1820InterfaceHashRequest interfacesIERC1820InterfaceHashRequest = new InterfacesIERC1820InterfaceHashRequest(); // InterfacesIERC1820InterfaceHashRequest | 
    try {
      InterfacesIERC1820InterfaceHash200Response result = apiInstance.interfacesIERC1820InterfaceHash(networkId, address, interfacesIERC1820InterfaceHashRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling Ierc1820Api#interfacesIERC1820InterfaceHash");
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
| **interfacesIERC1820InterfaceHashRequest** | [**InterfacesIERC1820InterfaceHashRequest**](InterfacesIERC1820InterfaceHashRequest.md)|  | |

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

<a id="interfacesIERC1820SetInterfaceImplementer"></a>
# **interfacesIERC1820SetInterfaceImplementer**
> InterfacesIERC1820SetInterfaceImplementer200Response interfacesIERC1820SetInterfaceImplementer(networkId, address, interfacesIERC1820SetInterfaceImplementerRequest)

IERC1820.setInterfaceImplementer

Write &#x60;setInterfaceImplementer(account,_interfaceHash,implementer)&#x60; on an instance of &#x60;IERC1820&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.Ierc1820Api;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    Ierc1820Api apiInstance = new Ierc1820Api(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC1820SetInterfaceImplementerRequest interfacesIERC1820SetInterfaceImplementerRequest = new InterfacesIERC1820SetInterfaceImplementerRequest(); // InterfacesIERC1820SetInterfaceImplementerRequest | 
    try {
      InterfacesIERC1820SetInterfaceImplementer200Response result = apiInstance.interfacesIERC1820SetInterfaceImplementer(networkId, address, interfacesIERC1820SetInterfaceImplementerRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling Ierc1820Api#interfacesIERC1820SetInterfaceImplementer");
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
| **interfacesIERC1820SetInterfaceImplementerRequest** | [**InterfacesIERC1820SetInterfaceImplementerRequest**](InterfacesIERC1820SetInterfaceImplementerRequest.md)|  | |

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

<a id="interfacesIERC1820SetManager"></a>
# **interfacesIERC1820SetManager**
> InterfacesIERC1820SetManager200Response interfacesIERC1820SetManager(networkId, address, interfacesIERC1820SetManagerRequest)

IERC1820.setManager

Write &#x60;setManager(account,newManager)&#x60; on an instance of &#x60;IERC1820&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.Ierc1820Api;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    Ierc1820Api apiInstance = new Ierc1820Api(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC1820SetManagerRequest interfacesIERC1820SetManagerRequest = new InterfacesIERC1820SetManagerRequest(); // InterfacesIERC1820SetManagerRequest | 
    try {
      InterfacesIERC1820SetManager200Response result = apiInstance.interfacesIERC1820SetManager(networkId, address, interfacesIERC1820SetManagerRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling Ierc1820Api#interfacesIERC1820SetManager");
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
| **interfacesIERC1820SetManagerRequest** | [**InterfacesIERC1820SetManagerRequest**](InterfacesIERC1820SetManagerRequest.md)|  | |

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

<a id="interfacesIERC1820UpdateERC165Cache"></a>
# **interfacesIERC1820UpdateERC165Cache**
> InterfacesIERC1820UpdateERC165Cache200Response interfacesIERC1820UpdateERC165Cache(networkId, address, interfacesIERC1820ImplementsERC165InterfaceRequest)

IERC1820.updateERC165Cache

Write &#x60;updateERC165Cache(account,interfaceId)&#x60; on an instance of &#x60;IERC1820&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.Ierc1820Api;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    Ierc1820Api apiInstance = new Ierc1820Api(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC1820ImplementsERC165InterfaceRequest interfacesIERC1820ImplementsERC165InterfaceRequest = new InterfacesIERC1820ImplementsERC165InterfaceRequest(); // InterfacesIERC1820ImplementsERC165InterfaceRequest | 
    try {
      InterfacesIERC1820UpdateERC165Cache200Response result = apiInstance.interfacesIERC1820UpdateERC165Cache(networkId, address, interfacesIERC1820ImplementsERC165InterfaceRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling Ierc1820Api#interfacesIERC1820UpdateERC165Cache");
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
| **interfacesIERC1820ImplementsERC165InterfaceRequest** | [**InterfacesIERC1820ImplementsERC165InterfaceRequest**](InterfacesIERC1820ImplementsERC165InterfaceRequest.md)|  | |

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

