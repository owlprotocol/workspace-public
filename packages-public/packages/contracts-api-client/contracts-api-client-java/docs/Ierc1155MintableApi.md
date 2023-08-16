# Ierc1155MintableApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**interfacesIERC1155MintableMint**](Ierc1155MintableApi.md#interfacesIERC1155MintableMint) | **POST** /{networkId}/interface/IERC1155Mintable/write/{address}/mint | IERC1155Mintable.mint |
| [**interfacesIERC1155MintableMintBatch**](Ierc1155MintableApi.md#interfacesIERC1155MintableMintBatch) | **POST** /{networkId}/interface/IERC1155Mintable/write/{address}/mintBatch | IERC1155Mintable.mintBatch |


<a id="interfacesIERC1155MintableMint"></a>
# **interfacesIERC1155MintableMint**
> InterfacesIERC1155MintableMint200Response interfacesIERC1155MintableMint(networkId, address, interfacesIERC1155MintableMintRequest)

IERC1155Mintable.mint

Write &#x60;mint(to,id,amount,data)&#x60; on an instance of &#x60;IERC1155Mintable&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.Ierc1155MintableApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    Ierc1155MintableApi apiInstance = new Ierc1155MintableApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC1155MintableMintRequest interfacesIERC1155MintableMintRequest = new InterfacesIERC1155MintableMintRequest(); // InterfacesIERC1155MintableMintRequest | 
    try {
      InterfacesIERC1155MintableMint200Response result = apiInstance.interfacesIERC1155MintableMint(networkId, address, interfacesIERC1155MintableMintRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling Ierc1155MintableApi#interfacesIERC1155MintableMint");
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
| **interfacesIERC1155MintableMintRequest** | [**InterfacesIERC1155MintableMintRequest**](InterfacesIERC1155MintableMintRequest.md)|  | |

### Return type

[**InterfacesIERC1155MintableMint200Response**](InterfacesIERC1155MintableMint200Response.md)

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

<a id="interfacesIERC1155MintableMintBatch"></a>
# **interfacesIERC1155MintableMintBatch**
> InterfacesIERC1155MintableMintBatch200Response interfacesIERC1155MintableMintBatch(networkId, address, interfacesIERC1155MintableMintBatchRequest)

IERC1155Mintable.mintBatch

Write &#x60;mintBatch(to,ids,amounts,data)&#x60; on an instance of &#x60;IERC1155Mintable&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.Ierc1155MintableApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    Ierc1155MintableApi apiInstance = new Ierc1155MintableApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC1155MintableMintBatchRequest interfacesIERC1155MintableMintBatchRequest = new InterfacesIERC1155MintableMintBatchRequest(); // InterfacesIERC1155MintableMintBatchRequest | 
    try {
      InterfacesIERC1155MintableMintBatch200Response result = apiInstance.interfacesIERC1155MintableMintBatch(networkId, address, interfacesIERC1155MintableMintBatchRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling Ierc1155MintableApi#interfacesIERC1155MintableMintBatch");
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
| **interfacesIERC1155MintableMintBatchRequest** | [**InterfacesIERC1155MintableMintBatchRequest**](InterfacesIERC1155MintableMintBatchRequest.md)|  | |

### Return type

[**InterfacesIERC1155MintableMintBatch200Response**](InterfacesIERC1155MintableMintBatch200Response.md)

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

