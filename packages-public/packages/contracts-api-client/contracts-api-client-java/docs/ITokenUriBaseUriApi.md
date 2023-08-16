# ITokenUriBaseUriApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**interfacesITokenURIBaseURIBaseURI**](ITokenUriBaseUriApi.md#interfacesITokenURIBaseURIBaseURI) | **POST** /{networkId}/interface/ITokenURIBaseURI/read/{address}/baseURI | ITokenURIBaseURI.baseURI |
| [**interfacesITokenURIBaseURISetTokenURIBaseURI**](ITokenUriBaseUriApi.md#interfacesITokenURIBaseURISetTokenURIBaseURI) | **POST** /{networkId}/interface/ITokenURIBaseURI/write/{address}/setTokenURIBaseURI | ITokenURIBaseURI.setTokenURIBaseURI |


<a id="interfacesITokenURIBaseURIBaseURI"></a>
# **interfacesITokenURIBaseURIBaseURI**
> InterfacesIContractURIContractURI200Response interfacesITokenURIBaseURIBaseURI(networkId, address, interfacesIBeaconImplementationRequest)

ITokenURIBaseURI.baseURI

Read &#x60;baseURI()&#x60; on an instance of &#x60;ITokenURIBaseURI&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.ITokenUriBaseUriApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    ITokenUriBaseUriApi apiInstance = new ITokenUriBaseUriApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest = new InterfacesIBeaconImplementationRequest(); // InterfacesIBeaconImplementationRequest | 
    try {
      InterfacesIContractURIContractURI200Response result = apiInstance.interfacesITokenURIBaseURIBaseURI(networkId, address, interfacesIBeaconImplementationRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling ITokenUriBaseUriApi#interfacesITokenURIBaseURIBaseURI");
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

<a id="interfacesITokenURIBaseURISetTokenURIBaseURI"></a>
# **interfacesITokenURIBaseURISetTokenURIBaseURI**
> InterfacesIContractURISetContractURI200Response interfacesITokenURIBaseURISetTokenURIBaseURI(networkId, address, interfacesIContractURISetContractURIRequest)

ITokenURIBaseURI.setTokenURIBaseURI

Write &#x60;setTokenURIBaseURI(uri)&#x60; on an instance of &#x60;ITokenURIBaseURI&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.ITokenUriBaseUriApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    ITokenUriBaseUriApi apiInstance = new ITokenUriBaseUriApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIContractURISetContractURIRequest interfacesIContractURISetContractURIRequest = new InterfacesIContractURISetContractURIRequest(); // InterfacesIContractURISetContractURIRequest | 
    try {
      InterfacesIContractURISetContractURI200Response result = apiInstance.interfacesITokenURIBaseURISetTokenURIBaseURI(networkId, address, interfacesIContractURISetContractURIRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling ITokenUriBaseUriApi#interfacesITokenURIBaseURISetTokenURIBaseURI");
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

