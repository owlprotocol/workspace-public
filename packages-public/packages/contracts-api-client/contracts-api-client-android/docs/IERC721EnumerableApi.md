# IERC721EnumerableApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC721EnumerableApprove**](IERC721EnumerableApi.md#interfacesIERC721EnumerableApprove) | **POST** /{networkId}/interface/IERC721Enumerable/write/{address}/approve | IERC721Enumerable.approve
[**interfacesIERC721EnumerableBalanceOf**](IERC721EnumerableApi.md#interfacesIERC721EnumerableBalanceOf) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/balanceOf | IERC721Enumerable.balanceOf
[**interfacesIERC721EnumerableGetApproved**](IERC721EnumerableApi.md#interfacesIERC721EnumerableGetApproved) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/getApproved | IERC721Enumerable.getApproved
[**interfacesIERC721EnumerableIsApprovedForAll**](IERC721EnumerableApi.md#interfacesIERC721EnumerableIsApprovedForAll) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/isApprovedForAll | IERC721Enumerable.isApprovedForAll
[**interfacesIERC721EnumerableOwnerOf**](IERC721EnumerableApi.md#interfacesIERC721EnumerableOwnerOf) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/ownerOf | IERC721Enumerable.ownerOf
[**interfacesIERC721EnumerableSafeTransferFrom**](IERC721EnumerableApi.md#interfacesIERC721EnumerableSafeTransferFrom) | **POST** /{networkId}/interface/IERC721Enumerable/write/{address}/safeTransferFrom | IERC721Enumerable.safeTransferFrom
[**interfacesIERC721EnumerableSetApprovalForAll**](IERC721EnumerableApi.md#interfacesIERC721EnumerableSetApprovalForAll) | **POST** /{networkId}/interface/IERC721Enumerable/write/{address}/setApprovalForAll | IERC721Enumerable.setApprovalForAll
[**interfacesIERC721EnumerableSupportsInterface**](IERC721EnumerableApi.md#interfacesIERC721EnumerableSupportsInterface) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/supportsInterface | IERC721Enumerable.supportsInterface
[**interfacesIERC721EnumerableTokenByIndex**](IERC721EnumerableApi.md#interfacesIERC721EnumerableTokenByIndex) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/tokenByIndex | IERC721Enumerable.tokenByIndex
[**interfacesIERC721EnumerableTokenOfOwnerByIndex**](IERC721EnumerableApi.md#interfacesIERC721EnumerableTokenOfOwnerByIndex) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/tokenOfOwnerByIndex | IERC721Enumerable.tokenOfOwnerByIndex
[**interfacesIERC721EnumerableTotalSupply**](IERC721EnumerableApi.md#interfacesIERC721EnumerableTotalSupply) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/totalSupply | IERC721Enumerable.totalSupply
[**interfacesIERC721EnumerableTransferFrom**](IERC721EnumerableApi.md#interfacesIERC721EnumerableTransferFrom) | **POST** /{networkId}/interface/IERC721Enumerable/write/{address}/transferFrom | IERC721Enumerable.transferFrom



## interfacesIERC721EnumerableApprove

> InterfacesIERC721Approve200Response interfacesIERC721EnumerableApprove(networkId, address, interfacesIERC721ApproveRequest)

IERC721Enumerable.approve

Write &#x60;approve(to,tokenId)&#x60; on an instance of &#x60;IERC721Enumerable&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721EnumerableApi;

IERC721EnumerableApi apiInstance = new IERC721EnumerableApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721ApproveRequest interfacesIERC721ApproveRequest = new InterfacesIERC721ApproveRequest(); // InterfacesIERC721ApproveRequest | 
try {
    InterfacesIERC721Approve200Response result = apiInstance.interfacesIERC721EnumerableApprove(networkId, address, interfacesIERC721ApproveRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721EnumerableApi#interfacesIERC721EnumerableApprove");
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


## interfacesIERC721EnumerableBalanceOf

> InterfacesIERC721BalanceOf200Response interfacesIERC721EnumerableBalanceOf(networkId, address, interfacesIERC721BalanceOfRequest)

IERC721Enumerable.balanceOf

Read &#x60;balanceOf(owner)&#x60; on an instance of &#x60;IERC721Enumerable&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721EnumerableApi;

IERC721EnumerableApi apiInstance = new IERC721EnumerableApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721BalanceOfRequest interfacesIERC721BalanceOfRequest = new InterfacesIERC721BalanceOfRequest(); // InterfacesIERC721BalanceOfRequest | 
try {
    InterfacesIERC721BalanceOf200Response result = apiInstance.interfacesIERC721EnumerableBalanceOf(networkId, address, interfacesIERC721BalanceOfRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721EnumerableApi#interfacesIERC721EnumerableBalanceOf");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIERC721BalanceOfRequest** | [**InterfacesIERC721BalanceOfRequest**](InterfacesIERC721BalanceOfRequest.md)|  |

### Return type

[**InterfacesIERC721BalanceOf200Response**](InterfacesIERC721BalanceOf200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIERC721EnumerableGetApproved

> InterfacesIERC721GetApproved200Response interfacesIERC721EnumerableGetApproved(networkId, address, interfacesIERC721GetApprovedRequest)

IERC721Enumerable.getApproved

Read &#x60;getApproved(tokenId)&#x60; on an instance of &#x60;IERC721Enumerable&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721EnumerableApi;

IERC721EnumerableApi apiInstance = new IERC721EnumerableApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721GetApprovedRequest interfacesIERC721GetApprovedRequest = new InterfacesIERC721GetApprovedRequest(); // InterfacesIERC721GetApprovedRequest | 
try {
    InterfacesIERC721GetApproved200Response result = apiInstance.interfacesIERC721EnumerableGetApproved(networkId, address, interfacesIERC721GetApprovedRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721EnumerableApi#interfacesIERC721EnumerableGetApproved");
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

[**InterfacesIERC721GetApproved200Response**](InterfacesIERC721GetApproved200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIERC721EnumerableIsApprovedForAll

> InterfacesIERC721IsApprovedForAll200Response interfacesIERC721EnumerableIsApprovedForAll(networkId, address, interfacesIERC721IsApprovedForAllRequest)

IERC721Enumerable.isApprovedForAll

Read &#x60;isApprovedForAll(owner,operator)&#x60; on an instance of &#x60;IERC721Enumerable&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721EnumerableApi;

IERC721EnumerableApi apiInstance = new IERC721EnumerableApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721IsApprovedForAllRequest interfacesIERC721IsApprovedForAllRequest = new InterfacesIERC721IsApprovedForAllRequest(); // InterfacesIERC721IsApprovedForAllRequest | 
try {
    InterfacesIERC721IsApprovedForAll200Response result = apiInstance.interfacesIERC721EnumerableIsApprovedForAll(networkId, address, interfacesIERC721IsApprovedForAllRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721EnumerableApi#interfacesIERC721EnumerableIsApprovedForAll");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIERC721IsApprovedForAllRequest** | [**InterfacesIERC721IsApprovedForAllRequest**](InterfacesIERC721IsApprovedForAllRequest.md)|  |

### Return type

[**InterfacesIERC721IsApprovedForAll200Response**](InterfacesIERC721IsApprovedForAll200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIERC721EnumerableOwnerOf

> InterfacesIERC721OwnerOf200Response interfacesIERC721EnumerableOwnerOf(networkId, address, interfacesIERC721GetApprovedRequest)

IERC721Enumerable.ownerOf

Read &#x60;ownerOf(tokenId)&#x60; on an instance of &#x60;IERC721Enumerable&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721EnumerableApi;

IERC721EnumerableApi apiInstance = new IERC721EnumerableApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721GetApprovedRequest interfacesIERC721GetApprovedRequest = new InterfacesIERC721GetApprovedRequest(); // InterfacesIERC721GetApprovedRequest | 
try {
    InterfacesIERC721OwnerOf200Response result = apiInstance.interfacesIERC721EnumerableOwnerOf(networkId, address, interfacesIERC721GetApprovedRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721EnumerableApi#interfacesIERC721EnumerableOwnerOf");
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

[**InterfacesIERC721OwnerOf200Response**](InterfacesIERC721OwnerOf200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIERC721EnumerableSafeTransferFrom

> InterfacesIERC721SafeTransferFrom200Response interfacesIERC721EnumerableSafeTransferFrom(networkId, address, interfacesIERC721SafeTransferFromRequest)

IERC721Enumerable.safeTransferFrom

Write &#x60;safeTransferFrom(from,to,tokenId,data)&#x60; on an instance of &#x60;IERC721Enumerable&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721EnumerableApi;

IERC721EnumerableApi apiInstance = new IERC721EnumerableApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721SafeTransferFromRequest interfacesIERC721SafeTransferFromRequest = new InterfacesIERC721SafeTransferFromRequest(); // InterfacesIERC721SafeTransferFromRequest | 
try {
    InterfacesIERC721SafeTransferFrom200Response result = apiInstance.interfacesIERC721EnumerableSafeTransferFrom(networkId, address, interfacesIERC721SafeTransferFromRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721EnumerableApi#interfacesIERC721EnumerableSafeTransferFrom");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIERC721SafeTransferFromRequest** | [**InterfacesIERC721SafeTransferFromRequest**](InterfacesIERC721SafeTransferFromRequest.md)|  |

### Return type

[**InterfacesIERC721SafeTransferFrom200Response**](InterfacesIERC721SafeTransferFrom200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIERC721EnumerableSetApprovalForAll

> InterfacesIERC721SetApprovalForAll200Response interfacesIERC721EnumerableSetApprovalForAll(networkId, address, interfacesIERC721SetApprovalForAllRequest)

IERC721Enumerable.setApprovalForAll

Write &#x60;setApprovalForAll(operator,_approved)&#x60; on an instance of &#x60;IERC721Enumerable&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721EnumerableApi;

IERC721EnumerableApi apiInstance = new IERC721EnumerableApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721SetApprovalForAllRequest interfacesIERC721SetApprovalForAllRequest = new InterfacesIERC721SetApprovalForAllRequest(); // InterfacesIERC721SetApprovalForAllRequest | 
try {
    InterfacesIERC721SetApprovalForAll200Response result = apiInstance.interfacesIERC721EnumerableSetApprovalForAll(networkId, address, interfacesIERC721SetApprovalForAllRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721EnumerableApi#interfacesIERC721EnumerableSetApprovalForAll");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIERC721SetApprovalForAllRequest** | [**InterfacesIERC721SetApprovalForAllRequest**](InterfacesIERC721SetApprovalForAllRequest.md)|  |

### Return type

[**InterfacesIERC721SetApprovalForAll200Response**](InterfacesIERC721SetApprovalForAll200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIERC721EnumerableSupportsInterface

> InterfacesIERC165SupportsInterface200Response interfacesIERC721EnumerableSupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest)

IERC721Enumerable.supportsInterface

Read &#x60;supportsInterface(interfaceId)&#x60; on an instance of &#x60;IERC721Enumerable&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721EnumerableApi;

IERC721EnumerableApi apiInstance = new IERC721EnumerableApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC165SupportsInterfaceRequest interfacesIERC165SupportsInterfaceRequest = new InterfacesIERC165SupportsInterfaceRequest(); // InterfacesIERC165SupportsInterfaceRequest | 
try {
    InterfacesIERC165SupportsInterface200Response result = apiInstance.interfacesIERC721EnumerableSupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721EnumerableApi#interfacesIERC721EnumerableSupportsInterface");
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


## interfacesIERC721EnumerableTokenByIndex

> InterfacesIERC721EnumerableTokenByIndex200Response interfacesIERC721EnumerableTokenByIndex(networkId, address, interfacesIERC721EnumerableTokenByIndexRequest)

IERC721Enumerable.tokenByIndex

Read &#x60;tokenByIndex(index)&#x60; on an instance of &#x60;IERC721Enumerable&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721EnumerableApi;

IERC721EnumerableApi apiInstance = new IERC721EnumerableApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721EnumerableTokenByIndexRequest interfacesIERC721EnumerableTokenByIndexRequest = new InterfacesIERC721EnumerableTokenByIndexRequest(); // InterfacesIERC721EnumerableTokenByIndexRequest | 
try {
    InterfacesIERC721EnumerableTokenByIndex200Response result = apiInstance.interfacesIERC721EnumerableTokenByIndex(networkId, address, interfacesIERC721EnumerableTokenByIndexRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721EnumerableApi#interfacesIERC721EnumerableTokenByIndex");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIERC721EnumerableTokenByIndexRequest** | [**InterfacesIERC721EnumerableTokenByIndexRequest**](InterfacesIERC721EnumerableTokenByIndexRequest.md)|  |

### Return type

[**InterfacesIERC721EnumerableTokenByIndex200Response**](InterfacesIERC721EnumerableTokenByIndex200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIERC721EnumerableTokenOfOwnerByIndex

> InterfacesIERC721EnumerableTokenOfOwnerByIndex200Response interfacesIERC721EnumerableTokenOfOwnerByIndex(networkId, address, interfacesIERC721EnumerableTokenOfOwnerByIndexRequest)

IERC721Enumerable.tokenOfOwnerByIndex

Read &#x60;tokenOfOwnerByIndex(owner,index)&#x60; on an instance of &#x60;IERC721Enumerable&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721EnumerableApi;

IERC721EnumerableApi apiInstance = new IERC721EnumerableApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest interfacesIERC721EnumerableTokenOfOwnerByIndexRequest = new InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest(); // InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest | 
try {
    InterfacesIERC721EnumerableTokenOfOwnerByIndex200Response result = apiInstance.interfacesIERC721EnumerableTokenOfOwnerByIndex(networkId, address, interfacesIERC721EnumerableTokenOfOwnerByIndexRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721EnumerableApi#interfacesIERC721EnumerableTokenOfOwnerByIndex");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIERC721EnumerableTokenOfOwnerByIndexRequest** | [**InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest**](InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest.md)|  |

### Return type

[**InterfacesIERC721EnumerableTokenOfOwnerByIndex200Response**](InterfacesIERC721EnumerableTokenOfOwnerByIndex200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIERC721EnumerableTotalSupply

> InterfacesIERC20TotalSupply200Response interfacesIERC721EnumerableTotalSupply(networkId, address, interfacesIBeaconImplementationRequest)

IERC721Enumerable.totalSupply

Read &#x60;totalSupply()&#x60; on an instance of &#x60;IERC721Enumerable&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721EnumerableApi;

IERC721EnumerableApi apiInstance = new IERC721EnumerableApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest = new InterfacesIBeaconImplementationRequest(); // InterfacesIBeaconImplementationRequest | 
try {
    InterfacesIERC20TotalSupply200Response result = apiInstance.interfacesIERC721EnumerableTotalSupply(networkId, address, interfacesIBeaconImplementationRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721EnumerableApi#interfacesIERC721EnumerableTotalSupply");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIBeaconImplementationRequest** | [**InterfacesIBeaconImplementationRequest**](InterfacesIBeaconImplementationRequest.md)|  |

### Return type

[**InterfacesIERC20TotalSupply200Response**](InterfacesIERC20TotalSupply200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIERC721EnumerableTransferFrom

> InterfacesIERC721TransferFrom200Response interfacesIERC721EnumerableTransferFrom(networkId, address, interfacesIERC721TransferFromRequest)

IERC721Enumerable.transferFrom

Write &#x60;transferFrom(from,to,tokenId)&#x60; on an instance of &#x60;IERC721Enumerable&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721EnumerableApi;

IERC721EnumerableApi apiInstance = new IERC721EnumerableApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721TransferFromRequest interfacesIERC721TransferFromRequest = new InterfacesIERC721TransferFromRequest(); // InterfacesIERC721TransferFromRequest | 
try {
    InterfacesIERC721TransferFrom200Response result = apiInstance.interfacesIERC721EnumerableTransferFrom(networkId, address, interfacesIERC721TransferFromRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721EnumerableApi#interfacesIERC721EnumerableTransferFrom");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIERC721TransferFromRequest** | [**InterfacesIERC721TransferFromRequest**](InterfacesIERC721TransferFromRequest.md)|  |

### Return type

[**InterfacesIERC721TransferFrom200Response**](InterfacesIERC721TransferFrom200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

