# Ierc1155MetadataUriApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**interfacesIERC1155MetadataURIBalanceOf**](Ierc1155MetadataUriApi.md#interfacesIERC1155MetadataURIBalanceOf) | **POST** /{networkId}/interface/IERC1155MetadataURI/read/{address}/balanceOf | IERC1155MetadataURI.balanceOf |
| [**interfacesIERC1155MetadataURIBalanceOfBatch**](Ierc1155MetadataUriApi.md#interfacesIERC1155MetadataURIBalanceOfBatch) | **POST** /{networkId}/interface/IERC1155MetadataURI/read/{address}/balanceOfBatch | IERC1155MetadataURI.balanceOfBatch |
| [**interfacesIERC1155MetadataURIIsApprovedForAll**](Ierc1155MetadataUriApi.md#interfacesIERC1155MetadataURIIsApprovedForAll) | **POST** /{networkId}/interface/IERC1155MetadataURI/read/{address}/isApprovedForAll | IERC1155MetadataURI.isApprovedForAll |
| [**interfacesIERC1155MetadataURISafeBatchTransferFrom**](Ierc1155MetadataUriApi.md#interfacesIERC1155MetadataURISafeBatchTransferFrom) | **POST** /{networkId}/interface/IERC1155MetadataURI/write/{address}/safeBatchTransferFrom | IERC1155MetadataURI.safeBatchTransferFrom |
| [**interfacesIERC1155MetadataURISafeTransferFrom**](Ierc1155MetadataUriApi.md#interfacesIERC1155MetadataURISafeTransferFrom) | **POST** /{networkId}/interface/IERC1155MetadataURI/write/{address}/safeTransferFrom | IERC1155MetadataURI.safeTransferFrom |
| [**interfacesIERC1155MetadataURISetApprovalForAll**](Ierc1155MetadataUriApi.md#interfacesIERC1155MetadataURISetApprovalForAll) | **POST** /{networkId}/interface/IERC1155MetadataURI/write/{address}/setApprovalForAll | IERC1155MetadataURI.setApprovalForAll |
| [**interfacesIERC1155MetadataURISupportsInterface**](Ierc1155MetadataUriApi.md#interfacesIERC1155MetadataURISupportsInterface) | **POST** /{networkId}/interface/IERC1155MetadataURI/read/{address}/supportsInterface | IERC1155MetadataURI.supportsInterface |
| [**interfacesIERC1155MetadataURIUri**](Ierc1155MetadataUriApi.md#interfacesIERC1155MetadataURIUri) | **POST** /{networkId}/interface/IERC1155MetadataURI/read/{address}/uri | IERC1155MetadataURI.uri |


<a id="interfacesIERC1155MetadataURIBalanceOf"></a>
# **interfacesIERC1155MetadataURIBalanceOf**
> InterfacesIERC1155BalanceOf200Response interfacesIERC1155MetadataURIBalanceOf(networkId, address, interfacesIERC1155BalanceOfRequest)

IERC1155MetadataURI.balanceOf

Read &#x60;balanceOf(account,id)&#x60; on an instance of &#x60;IERC1155MetadataURI&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.Ierc1155MetadataUriApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    Ierc1155MetadataUriApi apiInstance = new Ierc1155MetadataUriApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC1155BalanceOfRequest interfacesIERC1155BalanceOfRequest = new InterfacesIERC1155BalanceOfRequest(); // InterfacesIERC1155BalanceOfRequest | 
    try {
      InterfacesIERC1155BalanceOf200Response result = apiInstance.interfacesIERC1155MetadataURIBalanceOf(networkId, address, interfacesIERC1155BalanceOfRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling Ierc1155MetadataUriApi#interfacesIERC1155MetadataURIBalanceOf");
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
| **interfacesIERC1155BalanceOfRequest** | [**InterfacesIERC1155BalanceOfRequest**](InterfacesIERC1155BalanceOfRequest.md)|  | |

### Return type

[**InterfacesIERC1155BalanceOf200Response**](InterfacesIERC1155BalanceOf200Response.md)

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

<a id="interfacesIERC1155MetadataURIBalanceOfBatch"></a>
# **interfacesIERC1155MetadataURIBalanceOfBatch**
> InterfacesIERC1155BalanceOfBatch200Response interfacesIERC1155MetadataURIBalanceOfBatch(networkId, address, interfacesIERC1155BalanceOfBatchRequest)

IERC1155MetadataURI.balanceOfBatch

Read &#x60;balanceOfBatch(accounts,ids)&#x60; on an instance of &#x60;IERC1155MetadataURI&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.Ierc1155MetadataUriApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    Ierc1155MetadataUriApi apiInstance = new Ierc1155MetadataUriApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC1155BalanceOfBatchRequest interfacesIERC1155BalanceOfBatchRequest = new InterfacesIERC1155BalanceOfBatchRequest(); // InterfacesIERC1155BalanceOfBatchRequest | 
    try {
      InterfacesIERC1155BalanceOfBatch200Response result = apiInstance.interfacesIERC1155MetadataURIBalanceOfBatch(networkId, address, interfacesIERC1155BalanceOfBatchRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling Ierc1155MetadataUriApi#interfacesIERC1155MetadataURIBalanceOfBatch");
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
| **interfacesIERC1155BalanceOfBatchRequest** | [**InterfacesIERC1155BalanceOfBatchRequest**](InterfacesIERC1155BalanceOfBatchRequest.md)|  | |

### Return type

[**InterfacesIERC1155BalanceOfBatch200Response**](InterfacesIERC1155BalanceOfBatch200Response.md)

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

<a id="interfacesIERC1155MetadataURIIsApprovedForAll"></a>
# **interfacesIERC1155MetadataURIIsApprovedForAll**
> InterfacesIERC1155IsApprovedForAll200Response interfacesIERC1155MetadataURIIsApprovedForAll(networkId, address, interfacesIERC1155IsApprovedForAllRequest)

IERC1155MetadataURI.isApprovedForAll

Read &#x60;isApprovedForAll(account,operator)&#x60; on an instance of &#x60;IERC1155MetadataURI&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.Ierc1155MetadataUriApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    Ierc1155MetadataUriApi apiInstance = new Ierc1155MetadataUriApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC1155IsApprovedForAllRequest interfacesIERC1155IsApprovedForAllRequest = new InterfacesIERC1155IsApprovedForAllRequest(); // InterfacesIERC1155IsApprovedForAllRequest | 
    try {
      InterfacesIERC1155IsApprovedForAll200Response result = apiInstance.interfacesIERC1155MetadataURIIsApprovedForAll(networkId, address, interfacesIERC1155IsApprovedForAllRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling Ierc1155MetadataUriApi#interfacesIERC1155MetadataURIIsApprovedForAll");
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
| **interfacesIERC1155IsApprovedForAllRequest** | [**InterfacesIERC1155IsApprovedForAllRequest**](InterfacesIERC1155IsApprovedForAllRequest.md)|  | |

### Return type

[**InterfacesIERC1155IsApprovedForAll200Response**](InterfacesIERC1155IsApprovedForAll200Response.md)

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

<a id="interfacesIERC1155MetadataURISafeBatchTransferFrom"></a>
# **interfacesIERC1155MetadataURISafeBatchTransferFrom**
> InterfacesIERC1155SafeBatchTransferFrom200Response interfacesIERC1155MetadataURISafeBatchTransferFrom(networkId, address, interfacesIERC1155SafeBatchTransferFromRequest)

IERC1155MetadataURI.safeBatchTransferFrom

Write &#x60;safeBatchTransferFrom(from,to,ids,amounts,data)&#x60; on an instance of &#x60;IERC1155MetadataURI&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.Ierc1155MetadataUriApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    Ierc1155MetadataUriApi apiInstance = new Ierc1155MetadataUriApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC1155SafeBatchTransferFromRequest interfacesIERC1155SafeBatchTransferFromRequest = new InterfacesIERC1155SafeBatchTransferFromRequest(); // InterfacesIERC1155SafeBatchTransferFromRequest | 
    try {
      InterfacesIERC1155SafeBatchTransferFrom200Response result = apiInstance.interfacesIERC1155MetadataURISafeBatchTransferFrom(networkId, address, interfacesIERC1155SafeBatchTransferFromRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling Ierc1155MetadataUriApi#interfacesIERC1155MetadataURISafeBatchTransferFrom");
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
| **interfacesIERC1155SafeBatchTransferFromRequest** | [**InterfacesIERC1155SafeBatchTransferFromRequest**](InterfacesIERC1155SafeBatchTransferFromRequest.md)|  | |

### Return type

[**InterfacesIERC1155SafeBatchTransferFrom200Response**](InterfacesIERC1155SafeBatchTransferFrom200Response.md)

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

<a id="interfacesIERC1155MetadataURISafeTransferFrom"></a>
# **interfacesIERC1155MetadataURISafeTransferFrom**
> InterfacesIERC1155SafeTransferFrom200Response interfacesIERC1155MetadataURISafeTransferFrom(networkId, address, interfacesIERC1155SafeTransferFromRequest)

IERC1155MetadataURI.safeTransferFrom

Write &#x60;safeTransferFrom(from,to,id,amount,data)&#x60; on an instance of &#x60;IERC1155MetadataURI&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.Ierc1155MetadataUriApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    Ierc1155MetadataUriApi apiInstance = new Ierc1155MetadataUriApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC1155SafeTransferFromRequest interfacesIERC1155SafeTransferFromRequest = new InterfacesIERC1155SafeTransferFromRequest(); // InterfacesIERC1155SafeTransferFromRequest | 
    try {
      InterfacesIERC1155SafeTransferFrom200Response result = apiInstance.interfacesIERC1155MetadataURISafeTransferFrom(networkId, address, interfacesIERC1155SafeTransferFromRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling Ierc1155MetadataUriApi#interfacesIERC1155MetadataURISafeTransferFrom");
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
| **interfacesIERC1155SafeTransferFromRequest** | [**InterfacesIERC1155SafeTransferFromRequest**](InterfacesIERC1155SafeTransferFromRequest.md)|  | |

### Return type

[**InterfacesIERC1155SafeTransferFrom200Response**](InterfacesIERC1155SafeTransferFrom200Response.md)

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

<a id="interfacesIERC1155MetadataURISetApprovalForAll"></a>
# **interfacesIERC1155MetadataURISetApprovalForAll**
> InterfacesIERC1155SetApprovalForAll200Response interfacesIERC1155MetadataURISetApprovalForAll(networkId, address, interfacesIERC1155SetApprovalForAllRequest)

IERC1155MetadataURI.setApprovalForAll

Write &#x60;setApprovalForAll(operator,approved)&#x60; on an instance of &#x60;IERC1155MetadataURI&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.Ierc1155MetadataUriApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    Ierc1155MetadataUriApi apiInstance = new Ierc1155MetadataUriApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC1155SetApprovalForAllRequest interfacesIERC1155SetApprovalForAllRequest = new InterfacesIERC1155SetApprovalForAllRequest(); // InterfacesIERC1155SetApprovalForAllRequest | 
    try {
      InterfacesIERC1155SetApprovalForAll200Response result = apiInstance.interfacesIERC1155MetadataURISetApprovalForAll(networkId, address, interfacesIERC1155SetApprovalForAllRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling Ierc1155MetadataUriApi#interfacesIERC1155MetadataURISetApprovalForAll");
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
| **interfacesIERC1155SetApprovalForAllRequest** | [**InterfacesIERC1155SetApprovalForAllRequest**](InterfacesIERC1155SetApprovalForAllRequest.md)|  | |

### Return type

[**InterfacesIERC1155SetApprovalForAll200Response**](InterfacesIERC1155SetApprovalForAll200Response.md)

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

<a id="interfacesIERC1155MetadataURISupportsInterface"></a>
# **interfacesIERC1155MetadataURISupportsInterface**
> InterfacesIERC165SupportsInterface200Response interfacesIERC1155MetadataURISupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest)

IERC1155MetadataURI.supportsInterface

Read &#x60;supportsInterface(interfaceId)&#x60; on an instance of &#x60;IERC1155MetadataURI&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.Ierc1155MetadataUriApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    Ierc1155MetadataUriApi apiInstance = new Ierc1155MetadataUriApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC165SupportsInterfaceRequest interfacesIERC165SupportsInterfaceRequest = new InterfacesIERC165SupportsInterfaceRequest(); // InterfacesIERC165SupportsInterfaceRequest | 
    try {
      InterfacesIERC165SupportsInterface200Response result = apiInstance.interfacesIERC1155MetadataURISupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling Ierc1155MetadataUriApi#interfacesIERC1155MetadataURISupportsInterface");
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

<a id="interfacesIERC1155MetadataURIUri"></a>
# **interfacesIERC1155MetadataURIUri**
> InterfacesIERC1155MetadataURIUri200Response interfacesIERC1155MetadataURIUri(networkId, address, interfacesIERC1155MetadataURIUriRequest)

IERC1155MetadataURI.uri

Read &#x60;uri(id)&#x60; on an instance of &#x60;IERC1155MetadataURI&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.Ierc1155MetadataUriApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    Ierc1155MetadataUriApi apiInstance = new Ierc1155MetadataUriApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC1155MetadataURIUriRequest interfacesIERC1155MetadataURIUriRequest = new InterfacesIERC1155MetadataURIUriRequest(); // InterfacesIERC1155MetadataURIUriRequest | 
    try {
      InterfacesIERC1155MetadataURIUri200Response result = apiInstance.interfacesIERC1155MetadataURIUri(networkId, address, interfacesIERC1155MetadataURIUriRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling Ierc1155MetadataUriApi#interfacesIERC1155MetadataURIUri");
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
| **interfacesIERC1155MetadataURIUriRequest** | [**InterfacesIERC1155MetadataURIUriRequest**](InterfacesIERC1155MetadataURIUriRequest.md)|  | |

### Return type

[**InterfacesIERC1155MetadataURIUri200Response**](InterfacesIERC1155MetadataURIUri200Response.md)

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

