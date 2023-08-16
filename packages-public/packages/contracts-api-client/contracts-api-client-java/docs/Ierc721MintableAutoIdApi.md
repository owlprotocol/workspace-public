# Ierc721MintableAutoIdApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**interfacesIERC721MintableAutoIdMint**](Ierc721MintableAutoIdApi.md#interfacesIERC721MintableAutoIdMint) | **POST** /{networkId}/interface/IERC721MintableAutoId/write/{address}/mint | IERC721MintableAutoId.mint |
| [**interfacesIERC721MintableAutoIdMintBatch**](Ierc721MintableAutoIdApi.md#interfacesIERC721MintableAutoIdMintBatch) | **POST** /{networkId}/interface/IERC721MintableAutoId/write/{address}/mintBatch | IERC721MintableAutoId.mintBatch |
| [**interfacesIERC721MintableAutoIdSafeMint**](Ierc721MintableAutoIdApi.md#interfacesIERC721MintableAutoIdSafeMint) | **POST** /{networkId}/interface/IERC721MintableAutoId/write/{address}/safeMint | IERC721MintableAutoId.safeMint |
| [**interfacesIERC721MintableAutoIdSafeMintBatch**](Ierc721MintableAutoIdApi.md#interfacesIERC721MintableAutoIdSafeMintBatch) | **POST** /{networkId}/interface/IERC721MintableAutoId/write/{address}/safeMintBatch | IERC721MintableAutoId.safeMintBatch |


<a id="interfacesIERC721MintableAutoIdMint"></a>
# **interfacesIERC721MintableAutoIdMint**
> InterfacesIERC721MintableAutoIdMint200Response interfacesIERC721MintableAutoIdMint(networkId, address, interfacesIERC721MintableAutoIdMintRequest)

IERC721MintableAutoId.mint

Write &#x60;mint(to)&#x60; on an instance of &#x60;IERC721MintableAutoId&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.Ierc721MintableAutoIdApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    Ierc721MintableAutoIdApi apiInstance = new Ierc721MintableAutoIdApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC721MintableAutoIdMintRequest interfacesIERC721MintableAutoIdMintRequest = new InterfacesIERC721MintableAutoIdMintRequest(); // InterfacesIERC721MintableAutoIdMintRequest | 
    try {
      InterfacesIERC721MintableAutoIdMint200Response result = apiInstance.interfacesIERC721MintableAutoIdMint(networkId, address, interfacesIERC721MintableAutoIdMintRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling Ierc721MintableAutoIdApi#interfacesIERC721MintableAutoIdMint");
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
| **interfacesIERC721MintableAutoIdMintRequest** | [**InterfacesIERC721MintableAutoIdMintRequest**](InterfacesIERC721MintableAutoIdMintRequest.md)|  | |

### Return type

[**InterfacesIERC721MintableAutoIdMint200Response**](InterfacesIERC721MintableAutoIdMint200Response.md)

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

<a id="interfacesIERC721MintableAutoIdMintBatch"></a>
# **interfacesIERC721MintableAutoIdMintBatch**
> InterfacesIERC721MintableAutoIdMintBatch200Response interfacesIERC721MintableAutoIdMintBatch(networkId, address, interfacesIERC721MintableAutoIdMintBatchRequest)

IERC721MintableAutoId.mintBatch

Write &#x60;mintBatch(to)&#x60; on an instance of &#x60;IERC721MintableAutoId&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.Ierc721MintableAutoIdApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    Ierc721MintableAutoIdApi apiInstance = new Ierc721MintableAutoIdApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC721MintableAutoIdMintBatchRequest interfacesIERC721MintableAutoIdMintBatchRequest = new InterfacesIERC721MintableAutoIdMintBatchRequest(); // InterfacesIERC721MintableAutoIdMintBatchRequest | 
    try {
      InterfacesIERC721MintableAutoIdMintBatch200Response result = apiInstance.interfacesIERC721MintableAutoIdMintBatch(networkId, address, interfacesIERC721MintableAutoIdMintBatchRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling Ierc721MintableAutoIdApi#interfacesIERC721MintableAutoIdMintBatch");
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
| **interfacesIERC721MintableAutoIdMintBatchRequest** | [**InterfacesIERC721MintableAutoIdMintBatchRequest**](InterfacesIERC721MintableAutoIdMintBatchRequest.md)|  | |

### Return type

[**InterfacesIERC721MintableAutoIdMintBatch200Response**](InterfacesIERC721MintableAutoIdMintBatch200Response.md)

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

<a id="interfacesIERC721MintableAutoIdSafeMint"></a>
# **interfacesIERC721MintableAutoIdSafeMint**
> InterfacesIERC721MintableAutoIdMint200Response interfacesIERC721MintableAutoIdSafeMint(networkId, address, interfacesIERC721MintableAutoIdMintRequest)

IERC721MintableAutoId.safeMint

Write &#x60;safeMint(to)&#x60; on an instance of &#x60;IERC721MintableAutoId&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.Ierc721MintableAutoIdApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    Ierc721MintableAutoIdApi apiInstance = new Ierc721MintableAutoIdApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC721MintableAutoIdMintRequest interfacesIERC721MintableAutoIdMintRequest = new InterfacesIERC721MintableAutoIdMintRequest(); // InterfacesIERC721MintableAutoIdMintRequest | 
    try {
      InterfacesIERC721MintableAutoIdMint200Response result = apiInstance.interfacesIERC721MintableAutoIdSafeMint(networkId, address, interfacesIERC721MintableAutoIdMintRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling Ierc721MintableAutoIdApi#interfacesIERC721MintableAutoIdSafeMint");
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
| **interfacesIERC721MintableAutoIdMintRequest** | [**InterfacesIERC721MintableAutoIdMintRequest**](InterfacesIERC721MintableAutoIdMintRequest.md)|  | |

### Return type

[**InterfacesIERC721MintableAutoIdMint200Response**](InterfacesIERC721MintableAutoIdMint200Response.md)

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

<a id="interfacesIERC721MintableAutoIdSafeMintBatch"></a>
# **interfacesIERC721MintableAutoIdSafeMintBatch**
> InterfacesIERC721MintableAutoIdMintBatch200Response interfacesIERC721MintableAutoIdSafeMintBatch(networkId, address, interfacesIERC721MintableAutoIdMintBatchRequest)

IERC721MintableAutoId.safeMintBatch

Write &#x60;safeMintBatch(to)&#x60; on an instance of &#x60;IERC721MintableAutoId&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.Ierc721MintableAutoIdApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    Ierc721MintableAutoIdApi apiInstance = new Ierc721MintableAutoIdApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC721MintableAutoIdMintBatchRequest interfacesIERC721MintableAutoIdMintBatchRequest = new InterfacesIERC721MintableAutoIdMintBatchRequest(); // InterfacesIERC721MintableAutoIdMintBatchRequest | 
    try {
      InterfacesIERC721MintableAutoIdMintBatch200Response result = apiInstance.interfacesIERC721MintableAutoIdSafeMintBatch(networkId, address, interfacesIERC721MintableAutoIdMintBatchRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling Ierc721MintableAutoIdApi#interfacesIERC721MintableAutoIdSafeMintBatch");
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
| **interfacesIERC721MintableAutoIdMintBatchRequest** | [**InterfacesIERC721MintableAutoIdMintBatchRequest**](InterfacesIERC721MintableAutoIdMintBatchRequest.md)|  | |

### Return type

[**InterfacesIERC721MintableAutoIdMintBatch200Response**](InterfacesIERC721MintableAutoIdMintBatch200Response.md)

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

