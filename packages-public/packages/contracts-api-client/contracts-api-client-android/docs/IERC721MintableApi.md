# IERC721MintableApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC721MintableMint**](IERC721MintableApi.md#interfacesIERC721MintableMint) | **POST** /{networkId}/interface/IERC721Mintable/write/{address}/mint | IERC721Mintable.mint
[**interfacesIERC721MintableMintBatch**](IERC721MintableApi.md#interfacesIERC721MintableMintBatch) | **POST** /{networkId}/interface/IERC721Mintable/write/{address}/mintBatch | IERC721Mintable.mintBatch
[**interfacesIERC721MintableSafeMint**](IERC721MintableApi.md#interfacesIERC721MintableSafeMint) | **POST** /{networkId}/interface/IERC721Mintable/write/{address}/safeMint | IERC721Mintable.safeMint
[**interfacesIERC721MintableSafeMintBatch**](IERC721MintableApi.md#interfacesIERC721MintableSafeMintBatch) | **POST** /{networkId}/interface/IERC721Mintable/write/{address}/safeMintBatch | IERC721Mintable.safeMintBatch



## interfacesIERC721MintableMint

> InterfacesIERC721Approve200Response interfacesIERC721MintableMint(networkId, address, interfacesIERC721ApproveRequest)

IERC721Mintable.mint

Write &#x60;mint(to,tokenId)&#x60; on an instance of &#x60;IERC721Mintable&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721MintableApi;

IERC721MintableApi apiInstance = new IERC721MintableApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721ApproveRequest interfacesIERC721ApproveRequest = new InterfacesIERC721ApproveRequest(); // InterfacesIERC721ApproveRequest | 
try {
    InterfacesIERC721Approve200Response result = apiInstance.interfacesIERC721MintableMint(networkId, address, interfacesIERC721ApproveRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721MintableApi#interfacesIERC721MintableMint");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIERC721ApproveRequest** | [**InterfacesIERC721ApproveRequest**](InterfacesIERC721ApproveRequest.md)|  |

### Return type

[**InterfacesIERC721Approve200Response**](InterfacesIERC721Approve200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIERC721MintableMintBatch

> InterfacesIERC721MintableMintBatch200Response interfacesIERC721MintableMintBatch(networkId, address, interfacesIERC721MintableMintBatchRequest)

IERC721Mintable.mintBatch

Write &#x60;mintBatch(to,tokenId)&#x60; on an instance of &#x60;IERC721Mintable&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721MintableApi;

IERC721MintableApi apiInstance = new IERC721MintableApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721MintableMintBatchRequest interfacesIERC721MintableMintBatchRequest = new InterfacesIERC721MintableMintBatchRequest(); // InterfacesIERC721MintableMintBatchRequest | 
try {
    InterfacesIERC721MintableMintBatch200Response result = apiInstance.interfacesIERC721MintableMintBatch(networkId, address, interfacesIERC721MintableMintBatchRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721MintableApi#interfacesIERC721MintableMintBatch");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIERC721MintableMintBatchRequest** | [**InterfacesIERC721MintableMintBatchRequest**](InterfacesIERC721MintableMintBatchRequest.md)|  |

### Return type

[**InterfacesIERC721MintableMintBatch200Response**](InterfacesIERC721MintableMintBatch200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIERC721MintableSafeMint

> InterfacesIERC721Approve200Response interfacesIERC721MintableSafeMint(networkId, address, interfacesIERC721ApproveRequest)

IERC721Mintable.safeMint

Write &#x60;safeMint(to,tokenId)&#x60; on an instance of &#x60;IERC721Mintable&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721MintableApi;

IERC721MintableApi apiInstance = new IERC721MintableApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721ApproveRequest interfacesIERC721ApproveRequest = new InterfacesIERC721ApproveRequest(); // InterfacesIERC721ApproveRequest | 
try {
    InterfacesIERC721Approve200Response result = apiInstance.interfacesIERC721MintableSafeMint(networkId, address, interfacesIERC721ApproveRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721MintableApi#interfacesIERC721MintableSafeMint");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIERC721ApproveRequest** | [**InterfacesIERC721ApproveRequest**](InterfacesIERC721ApproveRequest.md)|  |

### Return type

[**InterfacesIERC721Approve200Response**](InterfacesIERC721Approve200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIERC721MintableSafeMintBatch

> InterfacesIERC721MintableMintBatch200Response interfacesIERC721MintableSafeMintBatch(networkId, address, interfacesIERC721MintableMintBatchRequest)

IERC721Mintable.safeMintBatch

Write &#x60;safeMintBatch(to,tokenId)&#x60; on an instance of &#x60;IERC721Mintable&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721MintableApi;

IERC721MintableApi apiInstance = new IERC721MintableApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721MintableMintBatchRequest interfacesIERC721MintableMintBatchRequest = new InterfacesIERC721MintableMintBatchRequest(); // InterfacesIERC721MintableMintBatchRequest | 
try {
    InterfacesIERC721MintableMintBatch200Response result = apiInstance.interfacesIERC721MintableSafeMintBatch(networkId, address, interfacesIERC721MintableMintBatchRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721MintableApi#interfacesIERC721MintableSafeMintBatch");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIERC721MintableMintBatchRequest** | [**InterfacesIERC721MintableMintBatchRequest**](InterfacesIERC721MintableMintBatchRequest.md)|  |

### Return type

[**InterfacesIERC721MintableMintBatch200Response**](InterfacesIERC721MintableMintBatch200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

