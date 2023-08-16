# IERC165Api

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC165SupportsInterface**](IERC165Api.md#interfacesIERC165SupportsInterface) | **POST** /{networkId}/interface/IERC165/read/{address}/supportsInterface | IERC165.supportsInterface



## interfacesIERC165SupportsInterface

> InterfacesIERC165SupportsInterface200Response interfacesIERC165SupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest)

IERC165.supportsInterface

Read &#x60;supportsInterface(interfaceId)&#x60; on an instance of &#x60;IERC165&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC165Api;

IERC165Api apiInstance = new IERC165Api();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC165SupportsInterfaceRequest interfacesIERC165SupportsInterfaceRequest = new InterfacesIERC165SupportsInterfaceRequest(); // InterfacesIERC165SupportsInterfaceRequest | 
try {
    InterfacesIERC165SupportsInterface200Response result = apiInstance.interfacesIERC165SupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC165Api#interfacesIERC165SupportsInterface");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIERC165SupportsInterfaceRequest** | [**InterfacesIERC165SupportsInterfaceRequest**](InterfacesIERC165SupportsInterfaceRequest.md)|  |

### Return type

[**InterfacesIERC165SupportsInterface200Response**](InterfacesIERC165SupportsInterface200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

