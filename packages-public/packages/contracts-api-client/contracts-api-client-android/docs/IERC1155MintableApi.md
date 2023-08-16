# IERC1155MintableApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC1155MintableMint**](IERC1155MintableApi.md#interfacesIERC1155MintableMint) | **POST** /{networkId}/interface/IERC1155Mintable/write/{address}/mint | IERC1155Mintable.mint
[**interfacesIERC1155MintableMintBatch**](IERC1155MintableApi.md#interfacesIERC1155MintableMintBatch) | **POST** /{networkId}/interface/IERC1155Mintable/write/{address}/mintBatch | IERC1155Mintable.mintBatch



## interfacesIERC1155MintableMint

> InterfacesIERC1155MintableMint200Response interfacesIERC1155MintableMint(networkId, address, interfacesIERC1155MintableMintRequest)

IERC1155Mintable.mint

Write &#x60;mint(to,id,amount,data)&#x60; on an instance of &#x60;IERC1155Mintable&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC1155MintableApi;

IERC1155MintableApi apiInstance = new IERC1155MintableApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC1155MintableMintRequest interfacesIERC1155MintableMintRequest = new InterfacesIERC1155MintableMintRequest(); // InterfacesIERC1155MintableMintRequest | 
try {
    InterfacesIERC1155MintableMint200Response result = apiInstance.interfacesIERC1155MintableMint(networkId, address, interfacesIERC1155MintableMintRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC1155MintableApi#interfacesIERC1155MintableMint");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIERC1155MintableMintRequest** | [**InterfacesIERC1155MintableMintRequest**](InterfacesIERC1155MintableMintRequest.md)|  |

### Return type

[**InterfacesIERC1155MintableMint200Response**](InterfacesIERC1155MintableMint200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIERC1155MintableMintBatch

> InterfacesIERC1155MintableMintBatch200Response interfacesIERC1155MintableMintBatch(networkId, address, interfacesIERC1155MintableMintBatchRequest)

IERC1155Mintable.mintBatch

Write &#x60;mintBatch(to,ids,amounts,data)&#x60; on an instance of &#x60;IERC1155Mintable&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC1155MintableApi;

IERC1155MintableApi apiInstance = new IERC1155MintableApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC1155MintableMintBatchRequest interfacesIERC1155MintableMintBatchRequest = new InterfacesIERC1155MintableMintBatchRequest(); // InterfacesIERC1155MintableMintBatchRequest | 
try {
    InterfacesIERC1155MintableMintBatch200Response result = apiInstance.interfacesIERC1155MintableMintBatch(networkId, address, interfacesIERC1155MintableMintBatchRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC1155MintableApi#interfacesIERC1155MintableMintBatch");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIERC1155MintableMintBatchRequest** | [**InterfacesIERC1155MintableMintBatchRequest**](InterfacesIERC1155MintableMintBatchRequest.md)|  |

### Return type

[**InterfacesIERC1155MintableMintBatch200Response**](InterfacesIERC1155MintableMintBatch200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

