# ITokenDnaApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**interfacesITokenDnaGetDna**](ITokenDnaApi.md#interfacesITokenDnaGetDna) | **POST** /{networkId}/interface/ITokenDna/read/{address}/getDna | ITokenDna.getDna |
| [**interfacesITokenDnaGetDnaBatch**](ITokenDnaApi.md#interfacesITokenDnaGetDnaBatch) | **POST** /{networkId}/interface/ITokenDna/read/{address}/getDnaBatch | ITokenDna.getDnaBatch |
| [**interfacesITokenDnaSetDna**](ITokenDnaApi.md#interfacesITokenDnaSetDna) | **POST** /{networkId}/interface/ITokenDna/write/{address}/setDna | ITokenDna.setDna |
| [**interfacesITokenDnaSetDnaBatch**](ITokenDnaApi.md#interfacesITokenDnaSetDnaBatch) | **POST** /{networkId}/interface/ITokenDna/write/{address}/setDnaBatch | ITokenDna.setDnaBatch |


<a id="interfacesITokenDnaGetDna"></a>
# **interfacesITokenDnaGetDna**
> InterfacesITokenDnaGetDna200Response interfacesITokenDnaGetDna(networkId, address, interfacesIERC721GetApprovedRequest)

ITokenDna.getDna

Read &#x60;getDna(tokenId)&#x60; on an instance of &#x60;ITokenDna&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.ITokenDnaApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    ITokenDnaApi apiInstance = new ITokenDnaApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC721GetApprovedRequest interfacesIERC721GetApprovedRequest = new InterfacesIERC721GetApprovedRequest(); // InterfacesIERC721GetApprovedRequest | 
    try {
      InterfacesITokenDnaGetDna200Response result = apiInstance.interfacesITokenDnaGetDna(networkId, address, interfacesIERC721GetApprovedRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling ITokenDnaApi#interfacesITokenDnaGetDna");
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
| **interfacesIERC721GetApprovedRequest** | [**InterfacesIERC721GetApprovedRequest**](InterfacesIERC721GetApprovedRequest.md)|  | |

### Return type

[**InterfacesITokenDnaGetDna200Response**](InterfacesITokenDnaGetDna200Response.md)

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

<a id="interfacesITokenDnaGetDnaBatch"></a>
# **interfacesITokenDnaGetDnaBatch**
> InterfacesITokenDnaGetDnaBatch200Response interfacesITokenDnaGetDnaBatch(networkId, address, interfacesITokenDnaGetDnaBatchRequest)

ITokenDna.getDnaBatch

Read &#x60;getDnaBatch(tokenId)&#x60; on an instance of &#x60;ITokenDna&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.ITokenDnaApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    ITokenDnaApi apiInstance = new ITokenDnaApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesITokenDnaGetDnaBatchRequest interfacesITokenDnaGetDnaBatchRequest = new InterfacesITokenDnaGetDnaBatchRequest(); // InterfacesITokenDnaGetDnaBatchRequest | 
    try {
      InterfacesITokenDnaGetDnaBatch200Response result = apiInstance.interfacesITokenDnaGetDnaBatch(networkId, address, interfacesITokenDnaGetDnaBatchRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling ITokenDnaApi#interfacesITokenDnaGetDnaBatch");
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
| **interfacesITokenDnaGetDnaBatchRequest** | [**InterfacesITokenDnaGetDnaBatchRequest**](InterfacesITokenDnaGetDnaBatchRequest.md)|  | |

### Return type

[**InterfacesITokenDnaGetDnaBatch200Response**](InterfacesITokenDnaGetDnaBatch200Response.md)

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

<a id="interfacesITokenDnaSetDna"></a>
# **interfacesITokenDnaSetDna**
> InterfacesITokenDnaSetDna200Response interfacesITokenDnaSetDna(networkId, address, interfacesITokenDnaSetDnaRequest)

ITokenDna.setDna

Write &#x60;setDna(tokenId,dna)&#x60; on an instance of &#x60;ITokenDna&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.ITokenDnaApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    ITokenDnaApi apiInstance = new ITokenDnaApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesITokenDnaSetDnaRequest interfacesITokenDnaSetDnaRequest = new InterfacesITokenDnaSetDnaRequest(); // InterfacesITokenDnaSetDnaRequest | 
    try {
      InterfacesITokenDnaSetDna200Response result = apiInstance.interfacesITokenDnaSetDna(networkId, address, interfacesITokenDnaSetDnaRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling ITokenDnaApi#interfacesITokenDnaSetDna");
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
| **interfacesITokenDnaSetDnaRequest** | [**InterfacesITokenDnaSetDnaRequest**](InterfacesITokenDnaSetDnaRequest.md)|  | |

### Return type

[**InterfacesITokenDnaSetDna200Response**](InterfacesITokenDnaSetDna200Response.md)

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

<a id="interfacesITokenDnaSetDnaBatch"></a>
# **interfacesITokenDnaSetDnaBatch**
> InterfacesITokenDnaSetDnaBatch200Response interfacesITokenDnaSetDnaBatch(networkId, address, interfacesITokenDnaSetDnaBatchRequest)

ITokenDna.setDnaBatch

Write &#x60;setDnaBatch(tokenId,dna)&#x60; on an instance of &#x60;ITokenDna&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.ITokenDnaApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    ITokenDnaApi apiInstance = new ITokenDnaApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesITokenDnaSetDnaBatchRequest interfacesITokenDnaSetDnaBatchRequest = new InterfacesITokenDnaSetDnaBatchRequest(); // InterfacesITokenDnaSetDnaBatchRequest | 
    try {
      InterfacesITokenDnaSetDnaBatch200Response result = apiInstance.interfacesITokenDnaSetDnaBatch(networkId, address, interfacesITokenDnaSetDnaBatchRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling ITokenDnaApi#interfacesITokenDnaSetDnaBatch");
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
| **interfacesITokenDnaSetDnaBatchRequest** | [**InterfacesITokenDnaSetDnaBatchRequest**](InterfacesITokenDnaSetDnaBatchRequest.md)|  | |

### Return type

[**InterfacesITokenDnaSetDnaBatch200Response**](InterfacesITokenDnaSetDnaBatch200Response.md)

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

