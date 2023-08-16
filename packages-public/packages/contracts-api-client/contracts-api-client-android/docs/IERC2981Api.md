# IERC2981Api

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC2981RoyaltyInfo**](IERC2981Api.md#interfacesIERC2981RoyaltyInfo) | **POST** /{networkId}/interface/IERC2981/read/{address}/royaltyInfo | IERC2981.royaltyInfo
[**interfacesIERC2981SupportsInterface**](IERC2981Api.md#interfacesIERC2981SupportsInterface) | **POST** /{networkId}/interface/IERC2981/read/{address}/supportsInterface | IERC2981.supportsInterface



## interfacesIERC2981RoyaltyInfo

> InterfacesIERC2981RoyaltyInfo200Response interfacesIERC2981RoyaltyInfo(networkId, address, interfacesIERC2981RoyaltyInfoRequest)

IERC2981.royaltyInfo

Read &#x60;royaltyInfo(tokenId,salePrice)&#x60; on an instance of &#x60;IERC2981&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC2981Api;

IERC2981Api apiInstance = new IERC2981Api();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC2981RoyaltyInfoRequest interfacesIERC2981RoyaltyInfoRequest = new InterfacesIERC2981RoyaltyInfoRequest(); // InterfacesIERC2981RoyaltyInfoRequest | 
try {
    InterfacesIERC2981RoyaltyInfo200Response result = apiInstance.interfacesIERC2981RoyaltyInfo(networkId, address, interfacesIERC2981RoyaltyInfoRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC2981Api#interfacesIERC2981RoyaltyInfo");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIERC2981RoyaltyInfoRequest** | [**InterfacesIERC2981RoyaltyInfoRequest**](InterfacesIERC2981RoyaltyInfoRequest.md)|  |

### Return type

[**InterfacesIERC2981RoyaltyInfo200Response**](InterfacesIERC2981RoyaltyInfo200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIERC2981SupportsInterface

> InterfacesIERC165SupportsInterface200Response interfacesIERC2981SupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest)

IERC2981.supportsInterface

Read &#x60;supportsInterface(interfaceId)&#x60; on an instance of &#x60;IERC2981&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC2981Api;

IERC2981Api apiInstance = new IERC2981Api();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC165SupportsInterfaceRequest interfacesIERC165SupportsInterfaceRequest = new InterfacesIERC165SupportsInterfaceRequest(); // InterfacesIERC165SupportsInterfaceRequest | 
try {
    InterfacesIERC165SupportsInterface200Response result = apiInstance.interfacesIERC2981SupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC2981Api#interfacesIERC2981SupportsInterface");
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

