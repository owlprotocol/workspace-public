# IERC721Api

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC721Approve**](IERC721Api.md#interfacesIERC721Approve) | **POST** /{networkId}/interface/IERC721/write/{address}/approve | IERC721.approve
[**interfacesIERC721BalanceOf**](IERC721Api.md#interfacesIERC721BalanceOf) | **POST** /{networkId}/interface/IERC721/read/{address}/balanceOf | IERC721.balanceOf
[**interfacesIERC721GetApproved**](IERC721Api.md#interfacesIERC721GetApproved) | **POST** /{networkId}/interface/IERC721/read/{address}/getApproved | IERC721.getApproved
[**interfacesIERC721IsApprovedForAll**](IERC721Api.md#interfacesIERC721IsApprovedForAll) | **POST** /{networkId}/interface/IERC721/read/{address}/isApprovedForAll | IERC721.isApprovedForAll
[**interfacesIERC721OwnerOf**](IERC721Api.md#interfacesIERC721OwnerOf) | **POST** /{networkId}/interface/IERC721/read/{address}/ownerOf | IERC721.ownerOf
[**interfacesIERC721SafeTransferFrom**](IERC721Api.md#interfacesIERC721SafeTransferFrom) | **POST** /{networkId}/interface/IERC721/write/{address}/safeTransferFrom | IERC721.safeTransferFrom
[**interfacesIERC721SetApprovalForAll**](IERC721Api.md#interfacesIERC721SetApprovalForAll) | **POST** /{networkId}/interface/IERC721/write/{address}/setApprovalForAll | IERC721.setApprovalForAll
[**interfacesIERC721SupportsInterface**](IERC721Api.md#interfacesIERC721SupportsInterface) | **POST** /{networkId}/interface/IERC721/read/{address}/supportsInterface | IERC721.supportsInterface
[**interfacesIERC721TransferFrom**](IERC721Api.md#interfacesIERC721TransferFrom) | **POST** /{networkId}/interface/IERC721/write/{address}/transferFrom | IERC721.transferFrom



## interfacesIERC721Approve

> InterfacesIERC721Approve200Response interfacesIERC721Approve(networkId, address, interfacesIERC721ApproveRequest)

IERC721.approve

Write &#x60;approve(to,tokenId)&#x60; on an instance of &#x60;IERC721&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721Api;

IERC721Api apiInstance = new IERC721Api();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721ApproveRequest interfacesIERC721ApproveRequest = new InterfacesIERC721ApproveRequest(); // InterfacesIERC721ApproveRequest | 
try {
    InterfacesIERC721Approve200Response result = apiInstance.interfacesIERC721Approve(networkId, address, interfacesIERC721ApproveRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721Api#interfacesIERC721Approve");
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


## interfacesIERC721BalanceOf

> InterfacesIERC721BalanceOf200Response interfacesIERC721BalanceOf(networkId, address, interfacesIERC721BalanceOfRequest)

IERC721.balanceOf

Read &#x60;balanceOf(owner)&#x60; on an instance of &#x60;IERC721&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721Api;

IERC721Api apiInstance = new IERC721Api();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721BalanceOfRequest interfacesIERC721BalanceOfRequest = new InterfacesIERC721BalanceOfRequest(); // InterfacesIERC721BalanceOfRequest | 
try {
    InterfacesIERC721BalanceOf200Response result = apiInstance.interfacesIERC721BalanceOf(networkId, address, interfacesIERC721BalanceOfRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721Api#interfacesIERC721BalanceOf");
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


## interfacesIERC721GetApproved

> InterfacesIERC721GetApproved200Response interfacesIERC721GetApproved(networkId, address, interfacesIERC721GetApprovedRequest)

IERC721.getApproved

Read &#x60;getApproved(tokenId)&#x60; on an instance of &#x60;IERC721&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721Api;

IERC721Api apiInstance = new IERC721Api();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721GetApprovedRequest interfacesIERC721GetApprovedRequest = new InterfacesIERC721GetApprovedRequest(); // InterfacesIERC721GetApprovedRequest | 
try {
    InterfacesIERC721GetApproved200Response result = apiInstance.interfacesIERC721GetApproved(networkId, address, interfacesIERC721GetApprovedRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721Api#interfacesIERC721GetApproved");
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


## interfacesIERC721IsApprovedForAll

> InterfacesIERC721IsApprovedForAll200Response interfacesIERC721IsApprovedForAll(networkId, address, interfacesIERC721IsApprovedForAllRequest)

IERC721.isApprovedForAll

Read &#x60;isApprovedForAll(owner,operator)&#x60; on an instance of &#x60;IERC721&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721Api;

IERC721Api apiInstance = new IERC721Api();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721IsApprovedForAllRequest interfacesIERC721IsApprovedForAllRequest = new InterfacesIERC721IsApprovedForAllRequest(); // InterfacesIERC721IsApprovedForAllRequest | 
try {
    InterfacesIERC721IsApprovedForAll200Response result = apiInstance.interfacesIERC721IsApprovedForAll(networkId, address, interfacesIERC721IsApprovedForAllRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721Api#interfacesIERC721IsApprovedForAll");
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


## interfacesIERC721OwnerOf

> InterfacesIERC721OwnerOf200Response interfacesIERC721OwnerOf(networkId, address, interfacesIERC721GetApprovedRequest)

IERC721.ownerOf

Read &#x60;ownerOf(tokenId)&#x60; on an instance of &#x60;IERC721&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721Api;

IERC721Api apiInstance = new IERC721Api();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721GetApprovedRequest interfacesIERC721GetApprovedRequest = new InterfacesIERC721GetApprovedRequest(); // InterfacesIERC721GetApprovedRequest | 
try {
    InterfacesIERC721OwnerOf200Response result = apiInstance.interfacesIERC721OwnerOf(networkId, address, interfacesIERC721GetApprovedRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721Api#interfacesIERC721OwnerOf");
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


## interfacesIERC721SafeTransferFrom

> InterfacesIERC721SafeTransferFrom200Response interfacesIERC721SafeTransferFrom(networkId, address, interfacesIERC721SafeTransferFromRequest)

IERC721.safeTransferFrom

Write &#x60;safeTransferFrom(from,to,tokenId,data)&#x60; on an instance of &#x60;IERC721&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721Api;

IERC721Api apiInstance = new IERC721Api();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721SafeTransferFromRequest interfacesIERC721SafeTransferFromRequest = new InterfacesIERC721SafeTransferFromRequest(); // InterfacesIERC721SafeTransferFromRequest | 
try {
    InterfacesIERC721SafeTransferFrom200Response result = apiInstance.interfacesIERC721SafeTransferFrom(networkId, address, interfacesIERC721SafeTransferFromRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721Api#interfacesIERC721SafeTransferFrom");
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


## interfacesIERC721SetApprovalForAll

> InterfacesIERC721SetApprovalForAll200Response interfacesIERC721SetApprovalForAll(networkId, address, interfacesIERC721SetApprovalForAllRequest)

IERC721.setApprovalForAll

Write &#x60;setApprovalForAll(operator,_approved)&#x60; on an instance of &#x60;IERC721&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721Api;

IERC721Api apiInstance = new IERC721Api();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721SetApprovalForAllRequest interfacesIERC721SetApprovalForAllRequest = new InterfacesIERC721SetApprovalForAllRequest(); // InterfacesIERC721SetApprovalForAllRequest | 
try {
    InterfacesIERC721SetApprovalForAll200Response result = apiInstance.interfacesIERC721SetApprovalForAll(networkId, address, interfacesIERC721SetApprovalForAllRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721Api#interfacesIERC721SetApprovalForAll");
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


## interfacesIERC721SupportsInterface

> InterfacesIERC165SupportsInterface200Response interfacesIERC721SupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest)

IERC721.supportsInterface

Read &#x60;supportsInterface(interfaceId)&#x60; on an instance of &#x60;IERC721&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721Api;

IERC721Api apiInstance = new IERC721Api();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC165SupportsInterfaceRequest interfacesIERC165SupportsInterfaceRequest = new InterfacesIERC165SupportsInterfaceRequest(); // InterfacesIERC165SupportsInterfaceRequest | 
try {
    InterfacesIERC165SupportsInterface200Response result = apiInstance.interfacesIERC721SupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721Api#interfacesIERC721SupportsInterface");
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


## interfacesIERC721TransferFrom

> InterfacesIERC721TransferFrom200Response interfacesIERC721TransferFrom(networkId, address, interfacesIERC721TransferFromRequest)

IERC721.transferFrom

Write &#x60;transferFrom(from,to,tokenId)&#x60; on an instance of &#x60;IERC721&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721Api;

IERC721Api apiInstance = new IERC721Api();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721TransferFromRequest interfacesIERC721TransferFromRequest = new InterfacesIERC721TransferFromRequest(); // InterfacesIERC721TransferFromRequest | 
try {
    InterfacesIERC721TransferFrom200Response result = apiInstance.interfacesIERC721TransferFrom(networkId, address, interfacesIERC721TransferFromRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721Api#interfacesIERC721TransferFrom");
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

