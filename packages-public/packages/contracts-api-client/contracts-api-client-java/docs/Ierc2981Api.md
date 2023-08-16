# Ierc2981Api

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**interfacesIERC2981RoyaltyInfo**](Ierc2981Api.md#interfacesIERC2981RoyaltyInfo) | **POST** /{networkId}/interface/IERC2981/read/{address}/royaltyInfo | IERC2981.royaltyInfo |
| [**interfacesIERC2981SupportsInterface**](Ierc2981Api.md#interfacesIERC2981SupportsInterface) | **POST** /{networkId}/interface/IERC2981/read/{address}/supportsInterface | IERC2981.supportsInterface |


<a id="interfacesIERC2981RoyaltyInfo"></a>
# **interfacesIERC2981RoyaltyInfo**
> InterfacesIERC2981RoyaltyInfo200Response interfacesIERC2981RoyaltyInfo(networkId, address, interfacesIERC2981RoyaltyInfoRequest)

IERC2981.royaltyInfo

Read &#x60;royaltyInfo(tokenId,salePrice)&#x60; on an instance of &#x60;IERC2981&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.Ierc2981Api;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    Ierc2981Api apiInstance = new Ierc2981Api(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC2981RoyaltyInfoRequest interfacesIERC2981RoyaltyInfoRequest = new InterfacesIERC2981RoyaltyInfoRequest(); // InterfacesIERC2981RoyaltyInfoRequest | 
    try {
      InterfacesIERC2981RoyaltyInfo200Response result = apiInstance.interfacesIERC2981RoyaltyInfo(networkId, address, interfacesIERC2981RoyaltyInfoRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling Ierc2981Api#interfacesIERC2981RoyaltyInfo");
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
| **interfacesIERC2981RoyaltyInfoRequest** | [**InterfacesIERC2981RoyaltyInfoRequest**](InterfacesIERC2981RoyaltyInfoRequest.md)|  | |

### Return type

[**InterfacesIERC2981RoyaltyInfo200Response**](InterfacesIERC2981RoyaltyInfo200Response.md)

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

<a id="interfacesIERC2981SupportsInterface"></a>
# **interfacesIERC2981SupportsInterface**
> InterfacesIERC165SupportsInterface200Response interfacesIERC2981SupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest)

IERC2981.supportsInterface

Read &#x60;supportsInterface(interfaceId)&#x60; on an instance of &#x60;IERC2981&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.Ierc2981Api;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    Ierc2981Api apiInstance = new Ierc2981Api(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC165SupportsInterfaceRequest interfacesIERC165SupportsInterfaceRequest = new InterfacesIERC165SupportsInterfaceRequest(); // InterfacesIERC165SupportsInterfaceRequest | 
    try {
      InterfacesIERC165SupportsInterface200Response result = apiInstance.interfacesIERC2981SupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling Ierc2981Api#interfacesIERC2981SupportsInterface");
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

