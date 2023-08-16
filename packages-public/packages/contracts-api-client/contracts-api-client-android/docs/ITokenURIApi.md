# ITokenURIApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesITokenURITokenURI**](ITokenURIApi.md#interfacesITokenURITokenURI) | **POST** /{networkId}/interface/ITokenURI/read/{address}/tokenURI | ITokenURI.tokenURI



## interfacesITokenURITokenURI

> InterfacesIERC721MetadataTokenURI200Response interfacesITokenURITokenURI(networkId, address, interfacesIERC721GetApprovedRequest)

ITokenURI.tokenURI

Read &#x60;tokenURI(tokenId)&#x60; on an instance of &#x60;ITokenURI&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.ITokenURIApi;

ITokenURIApi apiInstance = new ITokenURIApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721GetApprovedRequest interfacesIERC721GetApprovedRequest = new InterfacesIERC721GetApprovedRequest(); // InterfacesIERC721GetApprovedRequest | 
try {
    InterfacesIERC721MetadataTokenURI200Response result = apiInstance.interfacesITokenURITokenURI(networkId, address, interfacesIERC721GetApprovedRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ITokenURIApi#interfacesITokenURITokenURI");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIERC721GetApprovedRequest** | [**InterfacesIERC721GetApprovedRequest**](InterfacesIERC721GetApprovedRequest.md)|  |

### Return type

[**InterfacesIERC721MetadataTokenURI200Response**](InterfacesIERC721MetadataTokenURI200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

