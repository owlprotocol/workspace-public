# Ierc2981SetterApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**interfacesIERC2981SetterSetDefaultRoyalty**](Ierc2981SetterApi.md#interfacesIERC2981SetterSetDefaultRoyalty) | **POST** /{networkId}/interface/IERC2981Setter/write/{address}/setDefaultRoyalty | IERC2981Setter.setDefaultRoyalty |
| [**interfacesIERC2981SetterSetTokenRoyalty**](Ierc2981SetterApi.md#interfacesIERC2981SetterSetTokenRoyalty) | **POST** /{networkId}/interface/IERC2981Setter/write/{address}/setTokenRoyalty | IERC2981Setter.setTokenRoyalty |


<a id="interfacesIERC2981SetterSetDefaultRoyalty"></a>
# **interfacesIERC2981SetterSetDefaultRoyalty**
> InterfacesIERC2981SetterSetDefaultRoyalty200Response interfacesIERC2981SetterSetDefaultRoyalty(networkId, address, interfacesIERC2981SetterSetDefaultRoyaltyRequest)

IERC2981Setter.setDefaultRoyalty

Write &#x60;setDefaultRoyalty(receiver,feeNumerator)&#x60; on an instance of &#x60;IERC2981Setter&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.Ierc2981SetterApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    Ierc2981SetterApi apiInstance = new Ierc2981SetterApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC2981SetterSetDefaultRoyaltyRequest interfacesIERC2981SetterSetDefaultRoyaltyRequest = new InterfacesIERC2981SetterSetDefaultRoyaltyRequest(); // InterfacesIERC2981SetterSetDefaultRoyaltyRequest | 
    try {
      InterfacesIERC2981SetterSetDefaultRoyalty200Response result = apiInstance.interfacesIERC2981SetterSetDefaultRoyalty(networkId, address, interfacesIERC2981SetterSetDefaultRoyaltyRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling Ierc2981SetterApi#interfacesIERC2981SetterSetDefaultRoyalty");
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
| **interfacesIERC2981SetterSetDefaultRoyaltyRequest** | [**InterfacesIERC2981SetterSetDefaultRoyaltyRequest**](InterfacesIERC2981SetterSetDefaultRoyaltyRequest.md)|  | |

### Return type

[**InterfacesIERC2981SetterSetDefaultRoyalty200Response**](InterfacesIERC2981SetterSetDefaultRoyalty200Response.md)

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

<a id="interfacesIERC2981SetterSetTokenRoyalty"></a>
# **interfacesIERC2981SetterSetTokenRoyalty**
> InterfacesIERC2981SetterSetTokenRoyalty200Response interfacesIERC2981SetterSetTokenRoyalty(networkId, address, interfacesIERC2981SetterSetTokenRoyaltyRequest)

IERC2981Setter.setTokenRoyalty

Write &#x60;setTokenRoyalty(tokenId,receiver,feeNumerator)&#x60; on an instance of &#x60;IERC2981Setter&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.Ierc2981SetterApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    Ierc2981SetterApi apiInstance = new Ierc2981SetterApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC2981SetterSetTokenRoyaltyRequest interfacesIERC2981SetterSetTokenRoyaltyRequest = new InterfacesIERC2981SetterSetTokenRoyaltyRequest(); // InterfacesIERC2981SetterSetTokenRoyaltyRequest | 
    try {
      InterfacesIERC2981SetterSetTokenRoyalty200Response result = apiInstance.interfacesIERC2981SetterSetTokenRoyalty(networkId, address, interfacesIERC2981SetterSetTokenRoyaltyRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling Ierc2981SetterApi#interfacesIERC2981SetterSetTokenRoyalty");
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
| **interfacesIERC2981SetterSetTokenRoyaltyRequest** | [**InterfacesIERC2981SetterSetTokenRoyaltyRequest**](InterfacesIERC2981SetterSetTokenRoyaltyRequest.md)|  | |

### Return type

[**InterfacesIERC2981SetterSetTokenRoyalty200Response**](InterfacesIERC2981SetterSetTokenRoyalty200Response.md)

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

