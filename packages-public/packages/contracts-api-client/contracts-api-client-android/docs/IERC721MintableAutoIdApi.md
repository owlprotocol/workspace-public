# IERC721MintableAutoIdApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC721MintableAutoIdMint**](IERC721MintableAutoIdApi.md#interfacesIERC721MintableAutoIdMint) | **POST** /{networkId}/interface/IERC721MintableAutoId/write/{address}/mint | IERC721MintableAutoId.mint
[**interfacesIERC721MintableAutoIdMintBatch**](IERC721MintableAutoIdApi.md#interfacesIERC721MintableAutoIdMintBatch) | **POST** /{networkId}/interface/IERC721MintableAutoId/write/{address}/mintBatch | IERC721MintableAutoId.mintBatch
[**interfacesIERC721MintableAutoIdSafeMint**](IERC721MintableAutoIdApi.md#interfacesIERC721MintableAutoIdSafeMint) | **POST** /{networkId}/interface/IERC721MintableAutoId/write/{address}/safeMint | IERC721MintableAutoId.safeMint
[**interfacesIERC721MintableAutoIdSafeMintBatch**](IERC721MintableAutoIdApi.md#interfacesIERC721MintableAutoIdSafeMintBatch) | **POST** /{networkId}/interface/IERC721MintableAutoId/write/{address}/safeMintBatch | IERC721MintableAutoId.safeMintBatch



## interfacesIERC721MintableAutoIdMint

> InterfacesIERC721MintableAutoIdMint200Response interfacesIERC721MintableAutoIdMint(networkId, address, interfacesIERC721MintableAutoIdMintRequest)

IERC721MintableAutoId.mint

Write &#x60;mint(to)&#x60; on an instance of &#x60;IERC721MintableAutoId&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721MintableAutoIdApi;

IERC721MintableAutoIdApi apiInstance = new IERC721MintableAutoIdApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721MintableAutoIdMintRequest interfacesIERC721MintableAutoIdMintRequest = new InterfacesIERC721MintableAutoIdMintRequest(); // InterfacesIERC721MintableAutoIdMintRequest | 
try {
    InterfacesIERC721MintableAutoIdMint200Response result = apiInstance.interfacesIERC721MintableAutoIdMint(networkId, address, interfacesIERC721MintableAutoIdMintRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721MintableAutoIdApi#interfacesIERC721MintableAutoIdMint");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIERC721MintableAutoIdMintRequest** | [**InterfacesIERC721MintableAutoIdMintRequest**](InterfacesIERC721MintableAutoIdMintRequest.md)|  |

### Return type

[**InterfacesIERC721MintableAutoIdMint200Response**](InterfacesIERC721MintableAutoIdMint200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIERC721MintableAutoIdMintBatch

> InterfacesIERC721MintableAutoIdMintBatch200Response interfacesIERC721MintableAutoIdMintBatch(networkId, address, interfacesIERC721MintableAutoIdMintBatchRequest)

IERC721MintableAutoId.mintBatch

Write &#x60;mintBatch(to)&#x60; on an instance of &#x60;IERC721MintableAutoId&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721MintableAutoIdApi;

IERC721MintableAutoIdApi apiInstance = new IERC721MintableAutoIdApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721MintableAutoIdMintBatchRequest interfacesIERC721MintableAutoIdMintBatchRequest = new InterfacesIERC721MintableAutoIdMintBatchRequest(); // InterfacesIERC721MintableAutoIdMintBatchRequest | 
try {
    InterfacesIERC721MintableAutoIdMintBatch200Response result = apiInstance.interfacesIERC721MintableAutoIdMintBatch(networkId, address, interfacesIERC721MintableAutoIdMintBatchRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721MintableAutoIdApi#interfacesIERC721MintableAutoIdMintBatch");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIERC721MintableAutoIdMintBatchRequest** | [**InterfacesIERC721MintableAutoIdMintBatchRequest**](InterfacesIERC721MintableAutoIdMintBatchRequest.md)|  |

### Return type

[**InterfacesIERC721MintableAutoIdMintBatch200Response**](InterfacesIERC721MintableAutoIdMintBatch200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIERC721MintableAutoIdSafeMint

> InterfacesIERC721MintableAutoIdMint200Response interfacesIERC721MintableAutoIdSafeMint(networkId, address, interfacesIERC721MintableAutoIdMintRequest)

IERC721MintableAutoId.safeMint

Write &#x60;safeMint(to)&#x60; on an instance of &#x60;IERC721MintableAutoId&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721MintableAutoIdApi;

IERC721MintableAutoIdApi apiInstance = new IERC721MintableAutoIdApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721MintableAutoIdMintRequest interfacesIERC721MintableAutoIdMintRequest = new InterfacesIERC721MintableAutoIdMintRequest(); // InterfacesIERC721MintableAutoIdMintRequest | 
try {
    InterfacesIERC721MintableAutoIdMint200Response result = apiInstance.interfacesIERC721MintableAutoIdSafeMint(networkId, address, interfacesIERC721MintableAutoIdMintRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721MintableAutoIdApi#interfacesIERC721MintableAutoIdSafeMint");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIERC721MintableAutoIdMintRequest** | [**InterfacesIERC721MintableAutoIdMintRequest**](InterfacesIERC721MintableAutoIdMintRequest.md)|  |

### Return type

[**InterfacesIERC721MintableAutoIdMint200Response**](InterfacesIERC721MintableAutoIdMint200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIERC721MintableAutoIdSafeMintBatch

> InterfacesIERC721MintableAutoIdMintBatch200Response interfacesIERC721MintableAutoIdSafeMintBatch(networkId, address, interfacesIERC721MintableAutoIdMintBatchRequest)

IERC721MintableAutoId.safeMintBatch

Write &#x60;safeMintBatch(to)&#x60; on an instance of &#x60;IERC721MintableAutoId&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721MintableAutoIdApi;

IERC721MintableAutoIdApi apiInstance = new IERC721MintableAutoIdApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721MintableAutoIdMintBatchRequest interfacesIERC721MintableAutoIdMintBatchRequest = new InterfacesIERC721MintableAutoIdMintBatchRequest(); // InterfacesIERC721MintableAutoIdMintBatchRequest | 
try {
    InterfacesIERC721MintableAutoIdMintBatch200Response result = apiInstance.interfacesIERC721MintableAutoIdSafeMintBatch(networkId, address, interfacesIERC721MintableAutoIdMintBatchRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721MintableAutoIdApi#interfacesIERC721MintableAutoIdSafeMintBatch");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIERC721MintableAutoIdMintBatchRequest** | [**InterfacesIERC721MintableAutoIdMintBatchRequest**](InterfacesIERC721MintableAutoIdMintBatchRequest.md)|  |

### Return type

[**InterfacesIERC721MintableAutoIdMintBatch200Response**](InterfacesIERC721MintableAutoIdMintBatch200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

