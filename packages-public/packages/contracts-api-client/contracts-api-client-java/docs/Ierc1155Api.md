# Ierc1155Api

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**interfacesIERC1155BalanceOf**](Ierc1155Api.md#interfacesIERC1155BalanceOf) | **POST** /{networkId}/interface/IERC1155/read/{address}/balanceOf | IERC1155.balanceOf |
| [**interfacesIERC1155BalanceOfBatch**](Ierc1155Api.md#interfacesIERC1155BalanceOfBatch) | **POST** /{networkId}/interface/IERC1155/read/{address}/balanceOfBatch | IERC1155.balanceOfBatch |
| [**interfacesIERC1155IsApprovedForAll**](Ierc1155Api.md#interfacesIERC1155IsApprovedForAll) | **POST** /{networkId}/interface/IERC1155/read/{address}/isApprovedForAll | IERC1155.isApprovedForAll |
| [**interfacesIERC1155SafeBatchTransferFrom**](Ierc1155Api.md#interfacesIERC1155SafeBatchTransferFrom) | **POST** /{networkId}/interface/IERC1155/write/{address}/safeBatchTransferFrom | IERC1155.safeBatchTransferFrom |
| [**interfacesIERC1155SafeTransferFrom**](Ierc1155Api.md#interfacesIERC1155SafeTransferFrom) | **POST** /{networkId}/interface/IERC1155/write/{address}/safeTransferFrom | IERC1155.safeTransferFrom |
| [**interfacesIERC1155SetApprovalForAll**](Ierc1155Api.md#interfacesIERC1155SetApprovalForAll) | **POST** /{networkId}/interface/IERC1155/write/{address}/setApprovalForAll | IERC1155.setApprovalForAll |
| [**interfacesIERC1155SupportsInterface**](Ierc1155Api.md#interfacesIERC1155SupportsInterface) | **POST** /{networkId}/interface/IERC1155/read/{address}/supportsInterface | IERC1155.supportsInterface |


<a id="interfacesIERC1155BalanceOf"></a>
# **interfacesIERC1155BalanceOf**
> InterfacesIERC1155BalanceOf200Response interfacesIERC1155BalanceOf(networkId, address, interfacesIERC1155BalanceOfRequest)

IERC1155.balanceOf

Read &#x60;balanceOf(account,id)&#x60; on an instance of &#x60;IERC1155&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.Ierc1155Api;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    Ierc1155Api apiInstance = new Ierc1155Api(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC1155BalanceOfRequest interfacesIERC1155BalanceOfRequest = new InterfacesIERC1155BalanceOfRequest(); // InterfacesIERC1155BalanceOfRequest | 
    try {
      InterfacesIERC1155BalanceOf200Response result = apiInstance.interfacesIERC1155BalanceOf(networkId, address, interfacesIERC1155BalanceOfRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling Ierc1155Api#interfacesIERC1155BalanceOf");
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

<a id="interfacesIERC1155BalanceOfBatch"></a>
# **interfacesIERC1155BalanceOfBatch**
> InterfacesIERC1155BalanceOfBatch200Response interfacesIERC1155BalanceOfBatch(networkId, address, interfacesIERC1155BalanceOfBatchRequest)

IERC1155.balanceOfBatch

Read &#x60;balanceOfBatch(accounts,ids)&#x60; on an instance of &#x60;IERC1155&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.Ierc1155Api;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    Ierc1155Api apiInstance = new Ierc1155Api(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC1155BalanceOfBatchRequest interfacesIERC1155BalanceOfBatchRequest = new InterfacesIERC1155BalanceOfBatchRequest(); // InterfacesIERC1155BalanceOfBatchRequest | 
    try {
      InterfacesIERC1155BalanceOfBatch200Response result = apiInstance.interfacesIERC1155BalanceOfBatch(networkId, address, interfacesIERC1155BalanceOfBatchRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling Ierc1155Api#interfacesIERC1155BalanceOfBatch");
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

<a id="interfacesIERC1155IsApprovedForAll"></a>
# **interfacesIERC1155IsApprovedForAll**
> InterfacesIERC1155IsApprovedForAll200Response interfacesIERC1155IsApprovedForAll(networkId, address, interfacesIERC1155IsApprovedForAllRequest)

IERC1155.isApprovedForAll

Read &#x60;isApprovedForAll(account,operator)&#x60; on an instance of &#x60;IERC1155&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.Ierc1155Api;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    Ierc1155Api apiInstance = new Ierc1155Api(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC1155IsApprovedForAllRequest interfacesIERC1155IsApprovedForAllRequest = new InterfacesIERC1155IsApprovedForAllRequest(); // InterfacesIERC1155IsApprovedForAllRequest | 
    try {
      InterfacesIERC1155IsApprovedForAll200Response result = apiInstance.interfacesIERC1155IsApprovedForAll(networkId, address, interfacesIERC1155IsApprovedForAllRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling Ierc1155Api#interfacesIERC1155IsApprovedForAll");
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

<a id="interfacesIERC1155SafeBatchTransferFrom"></a>
# **interfacesIERC1155SafeBatchTransferFrom**
> InterfacesIERC1155SafeBatchTransferFrom200Response interfacesIERC1155SafeBatchTransferFrom(networkId, address, interfacesIERC1155SafeBatchTransferFromRequest)

IERC1155.safeBatchTransferFrom

Write &#x60;safeBatchTransferFrom(from,to,ids,amounts,data)&#x60; on an instance of &#x60;IERC1155&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.Ierc1155Api;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    Ierc1155Api apiInstance = new Ierc1155Api(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC1155SafeBatchTransferFromRequest interfacesIERC1155SafeBatchTransferFromRequest = new InterfacesIERC1155SafeBatchTransferFromRequest(); // InterfacesIERC1155SafeBatchTransferFromRequest | 
    try {
      InterfacesIERC1155SafeBatchTransferFrom200Response result = apiInstance.interfacesIERC1155SafeBatchTransferFrom(networkId, address, interfacesIERC1155SafeBatchTransferFromRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling Ierc1155Api#interfacesIERC1155SafeBatchTransferFrom");
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

<a id="interfacesIERC1155SafeTransferFrom"></a>
# **interfacesIERC1155SafeTransferFrom**
> InterfacesIERC1155SafeTransferFrom200Response interfacesIERC1155SafeTransferFrom(networkId, address, interfacesIERC1155SafeTransferFromRequest)

IERC1155.safeTransferFrom

Write &#x60;safeTransferFrom(from,to,id,amount,data)&#x60; on an instance of &#x60;IERC1155&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.Ierc1155Api;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    Ierc1155Api apiInstance = new Ierc1155Api(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC1155SafeTransferFromRequest interfacesIERC1155SafeTransferFromRequest = new InterfacesIERC1155SafeTransferFromRequest(); // InterfacesIERC1155SafeTransferFromRequest | 
    try {
      InterfacesIERC1155SafeTransferFrom200Response result = apiInstance.interfacesIERC1155SafeTransferFrom(networkId, address, interfacesIERC1155SafeTransferFromRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling Ierc1155Api#interfacesIERC1155SafeTransferFrom");
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

<a id="interfacesIERC1155SetApprovalForAll"></a>
# **interfacesIERC1155SetApprovalForAll**
> InterfacesIERC1155SetApprovalForAll200Response interfacesIERC1155SetApprovalForAll(networkId, address, interfacesIERC1155SetApprovalForAllRequest)

IERC1155.setApprovalForAll

Write &#x60;setApprovalForAll(operator,approved)&#x60; on an instance of &#x60;IERC1155&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.Ierc1155Api;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    Ierc1155Api apiInstance = new Ierc1155Api(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC1155SetApprovalForAllRequest interfacesIERC1155SetApprovalForAllRequest = new InterfacesIERC1155SetApprovalForAllRequest(); // InterfacesIERC1155SetApprovalForAllRequest | 
    try {
      InterfacesIERC1155SetApprovalForAll200Response result = apiInstance.interfacesIERC1155SetApprovalForAll(networkId, address, interfacesIERC1155SetApprovalForAllRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling Ierc1155Api#interfacesIERC1155SetApprovalForAll");
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

<a id="interfacesIERC1155SupportsInterface"></a>
# **interfacesIERC1155SupportsInterface**
> InterfacesIERC165SupportsInterface200Response interfacesIERC1155SupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest)

IERC1155.supportsInterface

Read &#x60;supportsInterface(interfaceId)&#x60; on an instance of &#x60;IERC1155&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.Ierc1155Api;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    Ierc1155Api apiInstance = new Ierc1155Api(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC165SupportsInterfaceRequest interfacesIERC165SupportsInterfaceRequest = new InterfacesIERC165SupportsInterfaceRequest(); // InterfacesIERC165SupportsInterfaceRequest | 
    try {
      InterfacesIERC165SupportsInterface200Response result = apiInstance.interfacesIERC1155SupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling Ierc1155Api#interfacesIERC1155SupportsInterface");
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

