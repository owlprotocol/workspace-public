# IERC721MetadataApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC721MetadataApprove**](IERC721MetadataApi.md#interfacesIERC721MetadataApprove) | **POST** /{networkId}/interface/IERC721Metadata/write/{address}/approve | IERC721Metadata.approve
[**interfacesIERC721MetadataBalanceOf**](IERC721MetadataApi.md#interfacesIERC721MetadataBalanceOf) | **POST** /{networkId}/interface/IERC721Metadata/read/{address}/balanceOf | IERC721Metadata.balanceOf
[**interfacesIERC721MetadataGetApproved**](IERC721MetadataApi.md#interfacesIERC721MetadataGetApproved) | **POST** /{networkId}/interface/IERC721Metadata/read/{address}/getApproved | IERC721Metadata.getApproved
[**interfacesIERC721MetadataIsApprovedForAll**](IERC721MetadataApi.md#interfacesIERC721MetadataIsApprovedForAll) | **POST** /{networkId}/interface/IERC721Metadata/read/{address}/isApprovedForAll | IERC721Metadata.isApprovedForAll
[**interfacesIERC721MetadataName**](IERC721MetadataApi.md#interfacesIERC721MetadataName) | **POST** /{networkId}/interface/IERC721Metadata/read/{address}/name | IERC721Metadata.name
[**interfacesIERC721MetadataOwnerOf**](IERC721MetadataApi.md#interfacesIERC721MetadataOwnerOf) | **POST** /{networkId}/interface/IERC721Metadata/read/{address}/ownerOf | IERC721Metadata.ownerOf
[**interfacesIERC721MetadataSafeTransferFrom**](IERC721MetadataApi.md#interfacesIERC721MetadataSafeTransferFrom) | **POST** /{networkId}/interface/IERC721Metadata/write/{address}/safeTransferFrom | IERC721Metadata.safeTransferFrom
[**interfacesIERC721MetadataSetApprovalForAll**](IERC721MetadataApi.md#interfacesIERC721MetadataSetApprovalForAll) | **POST** /{networkId}/interface/IERC721Metadata/write/{address}/setApprovalForAll | IERC721Metadata.setApprovalForAll
[**interfacesIERC721MetadataSupportsInterface**](IERC721MetadataApi.md#interfacesIERC721MetadataSupportsInterface) | **POST** /{networkId}/interface/IERC721Metadata/read/{address}/supportsInterface | IERC721Metadata.supportsInterface
[**interfacesIERC721MetadataSymbol**](IERC721MetadataApi.md#interfacesIERC721MetadataSymbol) | **POST** /{networkId}/interface/IERC721Metadata/read/{address}/symbol | IERC721Metadata.symbol
[**interfacesIERC721MetadataTokenURI**](IERC721MetadataApi.md#interfacesIERC721MetadataTokenURI) | **POST** /{networkId}/interface/IERC721Metadata/read/{address}/tokenURI | IERC721Metadata.tokenURI
[**interfacesIERC721MetadataTransferFrom**](IERC721MetadataApi.md#interfacesIERC721MetadataTransferFrom) | **POST** /{networkId}/interface/IERC721Metadata/write/{address}/transferFrom | IERC721Metadata.transferFrom



## interfacesIERC721MetadataApprove

> InterfacesIERC721Approve200Response interfacesIERC721MetadataApprove(networkId, address, interfacesIERC721ApproveRequest)

IERC721Metadata.approve

Write &#x60;approve(to,tokenId)&#x60; on an instance of &#x60;IERC721Metadata&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721MetadataApi;

IERC721MetadataApi apiInstance = new IERC721MetadataApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721ApproveRequest interfacesIERC721ApproveRequest = new InterfacesIERC721ApproveRequest(); // InterfacesIERC721ApproveRequest | 
try {
    InterfacesIERC721Approve200Response result = apiInstance.interfacesIERC721MetadataApprove(networkId, address, interfacesIERC721ApproveRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721MetadataApi#interfacesIERC721MetadataApprove");
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


## interfacesIERC721MetadataBalanceOf

> InterfacesIERC721BalanceOf200Response interfacesIERC721MetadataBalanceOf(networkId, address, interfacesIERC721BalanceOfRequest)

IERC721Metadata.balanceOf

Read &#x60;balanceOf(owner)&#x60; on an instance of &#x60;IERC721Metadata&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721MetadataApi;

IERC721MetadataApi apiInstance = new IERC721MetadataApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721BalanceOfRequest interfacesIERC721BalanceOfRequest = new InterfacesIERC721BalanceOfRequest(); // InterfacesIERC721BalanceOfRequest | 
try {
    InterfacesIERC721BalanceOf200Response result = apiInstance.interfacesIERC721MetadataBalanceOf(networkId, address, interfacesIERC721BalanceOfRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721MetadataApi#interfacesIERC721MetadataBalanceOf");
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


## interfacesIERC721MetadataGetApproved

> InterfacesIERC721GetApproved200Response interfacesIERC721MetadataGetApproved(networkId, address, interfacesIERC721GetApprovedRequest)

IERC721Metadata.getApproved

Read &#x60;getApproved(tokenId)&#x60; on an instance of &#x60;IERC721Metadata&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721MetadataApi;

IERC721MetadataApi apiInstance = new IERC721MetadataApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721GetApprovedRequest interfacesIERC721GetApprovedRequest = new InterfacesIERC721GetApprovedRequest(); // InterfacesIERC721GetApprovedRequest | 
try {
    InterfacesIERC721GetApproved200Response result = apiInstance.interfacesIERC721MetadataGetApproved(networkId, address, interfacesIERC721GetApprovedRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721MetadataApi#interfacesIERC721MetadataGetApproved");
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


## interfacesIERC721MetadataIsApprovedForAll

> InterfacesIERC721IsApprovedForAll200Response interfacesIERC721MetadataIsApprovedForAll(networkId, address, interfacesIERC721IsApprovedForAllRequest)

IERC721Metadata.isApprovedForAll

Read &#x60;isApprovedForAll(owner,operator)&#x60; on an instance of &#x60;IERC721Metadata&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721MetadataApi;

IERC721MetadataApi apiInstance = new IERC721MetadataApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721IsApprovedForAllRequest interfacesIERC721IsApprovedForAllRequest = new InterfacesIERC721IsApprovedForAllRequest(); // InterfacesIERC721IsApprovedForAllRequest | 
try {
    InterfacesIERC721IsApprovedForAll200Response result = apiInstance.interfacesIERC721MetadataIsApprovedForAll(networkId, address, interfacesIERC721IsApprovedForAllRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721MetadataApi#interfacesIERC721MetadataIsApprovedForAll");
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


## interfacesIERC721MetadataName

> InterfacesIContractURIContractURI200Response interfacesIERC721MetadataName(networkId, address, interfacesIBeaconImplementationRequest)

IERC721Metadata.name

Read &#x60;name()&#x60; on an instance of &#x60;IERC721Metadata&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721MetadataApi;

IERC721MetadataApi apiInstance = new IERC721MetadataApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest = new InterfacesIBeaconImplementationRequest(); // InterfacesIBeaconImplementationRequest | 
try {
    InterfacesIContractURIContractURI200Response result = apiInstance.interfacesIERC721MetadataName(networkId, address, interfacesIBeaconImplementationRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721MetadataApi#interfacesIERC721MetadataName");
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

[**InterfacesIContractURIContractURI200Response**](InterfacesIContractURIContractURI200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIERC721MetadataOwnerOf

> InterfacesIERC721OwnerOf200Response interfacesIERC721MetadataOwnerOf(networkId, address, interfacesIERC721GetApprovedRequest)

IERC721Metadata.ownerOf

Read &#x60;ownerOf(tokenId)&#x60; on an instance of &#x60;IERC721Metadata&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721MetadataApi;

IERC721MetadataApi apiInstance = new IERC721MetadataApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721GetApprovedRequest interfacesIERC721GetApprovedRequest = new InterfacesIERC721GetApprovedRequest(); // InterfacesIERC721GetApprovedRequest | 
try {
    InterfacesIERC721OwnerOf200Response result = apiInstance.interfacesIERC721MetadataOwnerOf(networkId, address, interfacesIERC721GetApprovedRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721MetadataApi#interfacesIERC721MetadataOwnerOf");
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


## interfacesIERC721MetadataSafeTransferFrom

> InterfacesIERC721SafeTransferFrom200Response interfacesIERC721MetadataSafeTransferFrom(networkId, address, interfacesIERC721SafeTransferFromRequest)

IERC721Metadata.safeTransferFrom

Write &#x60;safeTransferFrom(from,to,tokenId,data)&#x60; on an instance of &#x60;IERC721Metadata&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721MetadataApi;

IERC721MetadataApi apiInstance = new IERC721MetadataApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721SafeTransferFromRequest interfacesIERC721SafeTransferFromRequest = new InterfacesIERC721SafeTransferFromRequest(); // InterfacesIERC721SafeTransferFromRequest | 
try {
    InterfacesIERC721SafeTransferFrom200Response result = apiInstance.interfacesIERC721MetadataSafeTransferFrom(networkId, address, interfacesIERC721SafeTransferFromRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721MetadataApi#interfacesIERC721MetadataSafeTransferFrom");
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


## interfacesIERC721MetadataSetApprovalForAll

> InterfacesIERC721SetApprovalForAll200Response interfacesIERC721MetadataSetApprovalForAll(networkId, address, interfacesIERC721SetApprovalForAllRequest)

IERC721Metadata.setApprovalForAll

Write &#x60;setApprovalForAll(operator,_approved)&#x60; on an instance of &#x60;IERC721Metadata&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721MetadataApi;

IERC721MetadataApi apiInstance = new IERC721MetadataApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721SetApprovalForAllRequest interfacesIERC721SetApprovalForAllRequest = new InterfacesIERC721SetApprovalForAllRequest(); // InterfacesIERC721SetApprovalForAllRequest | 
try {
    InterfacesIERC721SetApprovalForAll200Response result = apiInstance.interfacesIERC721MetadataSetApprovalForAll(networkId, address, interfacesIERC721SetApprovalForAllRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721MetadataApi#interfacesIERC721MetadataSetApprovalForAll");
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


## interfacesIERC721MetadataSupportsInterface

> InterfacesIERC165SupportsInterface200Response interfacesIERC721MetadataSupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest)

IERC721Metadata.supportsInterface

Read &#x60;supportsInterface(interfaceId)&#x60; on an instance of &#x60;IERC721Metadata&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721MetadataApi;

IERC721MetadataApi apiInstance = new IERC721MetadataApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC165SupportsInterfaceRequest interfacesIERC165SupportsInterfaceRequest = new InterfacesIERC165SupportsInterfaceRequest(); // InterfacesIERC165SupportsInterfaceRequest | 
try {
    InterfacesIERC165SupportsInterface200Response result = apiInstance.interfacesIERC721MetadataSupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721MetadataApi#interfacesIERC721MetadataSupportsInterface");
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


## interfacesIERC721MetadataSymbol

> InterfacesIContractURIContractURI200Response interfacesIERC721MetadataSymbol(networkId, address, interfacesIBeaconImplementationRequest)

IERC721Metadata.symbol

Read &#x60;symbol()&#x60; on an instance of &#x60;IERC721Metadata&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721MetadataApi;

IERC721MetadataApi apiInstance = new IERC721MetadataApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest = new InterfacesIBeaconImplementationRequest(); // InterfacesIBeaconImplementationRequest | 
try {
    InterfacesIContractURIContractURI200Response result = apiInstance.interfacesIERC721MetadataSymbol(networkId, address, interfacesIBeaconImplementationRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721MetadataApi#interfacesIERC721MetadataSymbol");
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

[**InterfacesIContractURIContractURI200Response**](InterfacesIContractURIContractURI200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIERC721MetadataTokenURI

> InterfacesIERC721MetadataTokenURI200Response interfacesIERC721MetadataTokenURI(networkId, address, interfacesIERC721GetApprovedRequest)

IERC721Metadata.tokenURI

Read &#x60;tokenURI(tokenId)&#x60; on an instance of &#x60;IERC721Metadata&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721MetadataApi;

IERC721MetadataApi apiInstance = new IERC721MetadataApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721GetApprovedRequest interfacesIERC721GetApprovedRequest = new InterfacesIERC721GetApprovedRequest(); // InterfacesIERC721GetApprovedRequest | 
try {
    InterfacesIERC721MetadataTokenURI200Response result = apiInstance.interfacesIERC721MetadataTokenURI(networkId, address, interfacesIERC721GetApprovedRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721MetadataApi#interfacesIERC721MetadataTokenURI");
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


## interfacesIERC721MetadataTransferFrom

> InterfacesIERC721TransferFrom200Response interfacesIERC721MetadataTransferFrom(networkId, address, interfacesIERC721TransferFromRequest)

IERC721Metadata.transferFrom

Write &#x60;transferFrom(from,to,tokenId)&#x60; on an instance of &#x60;IERC721Metadata&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC721MetadataApi;

IERC721MetadataApi apiInstance = new IERC721MetadataApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721TransferFromRequest interfacesIERC721TransferFromRequest = new InterfacesIERC721TransferFromRequest(); // InterfacesIERC721TransferFromRequest | 
try {
    InterfacesIERC721TransferFrom200Response result = apiInstance.interfacesIERC721MetadataTransferFrom(networkId, address, interfacesIERC721TransferFromRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC721MetadataApi#interfacesIERC721MetadataTransferFrom");
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
