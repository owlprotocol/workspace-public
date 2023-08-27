# ITokenUriApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**interfacesITokenURITokenURI**](ITokenUriApi.md#interfacesITokenURITokenURI) | **POST** /{networkId}/interface/ITokenURI/read/{address}/tokenURI | ITokenURI.tokenURI |


<a id="interfacesITokenURITokenURI"></a>
# **interfacesITokenURITokenURI**
> InterfacesIERC721MetadataTokenURI200Response interfacesITokenURITokenURI(networkId, address, interfacesIERC721GetApprovedRequest)

ITokenURI.tokenURI

Read &#x60;tokenURI(tokenId)&#x60; on an instance of &#x60;ITokenURI&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.ITokenUriApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    ITokenUriApi apiInstance = new ITokenUriApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIERC721GetApprovedRequest interfacesIERC721GetApprovedRequest = new InterfacesIERC721GetApprovedRequest(); // InterfacesIERC721GetApprovedRequest | 
    try {
      InterfacesIERC721MetadataTokenURI200Response result = apiInstance.interfacesITokenURITokenURI(networkId, address, interfacesIERC721GetApprovedRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling ITokenUriApi#interfacesITokenURITokenURI");
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

[**InterfacesIERC721MetadataTokenURI200Response**](InterfacesIERC721MetadataTokenURI200Response.md)

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
