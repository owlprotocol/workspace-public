# IERC1155MetadataURIApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC1155MetadataURIBalanceOf**](IERC1155MetadataURIApi.md#interfacesIERC1155MetadataURIBalanceOf) | **POST** /{networkId}/interface/IERC1155MetadataURI/read/{address}/balanceOf | IERC1155MetadataURI.balanceOf
[**interfacesIERC1155MetadataURIBalanceOfBatch**](IERC1155MetadataURIApi.md#interfacesIERC1155MetadataURIBalanceOfBatch) | **POST** /{networkId}/interface/IERC1155MetadataURI/read/{address}/balanceOfBatch | IERC1155MetadataURI.balanceOfBatch
[**interfacesIERC1155MetadataURIIsApprovedForAll**](IERC1155MetadataURIApi.md#interfacesIERC1155MetadataURIIsApprovedForAll) | **POST** /{networkId}/interface/IERC1155MetadataURI/read/{address}/isApprovedForAll | IERC1155MetadataURI.isApprovedForAll
[**interfacesIERC1155MetadataURISafeBatchTransferFrom**](IERC1155MetadataURIApi.md#interfacesIERC1155MetadataURISafeBatchTransferFrom) | **POST** /{networkId}/interface/IERC1155MetadataURI/write/{address}/safeBatchTransferFrom | IERC1155MetadataURI.safeBatchTransferFrom
[**interfacesIERC1155MetadataURISafeTransferFrom**](IERC1155MetadataURIApi.md#interfacesIERC1155MetadataURISafeTransferFrom) | **POST** /{networkId}/interface/IERC1155MetadataURI/write/{address}/safeTransferFrom | IERC1155MetadataURI.safeTransferFrom
[**interfacesIERC1155MetadataURISetApprovalForAll**](IERC1155MetadataURIApi.md#interfacesIERC1155MetadataURISetApprovalForAll) | **POST** /{networkId}/interface/IERC1155MetadataURI/write/{address}/setApprovalForAll | IERC1155MetadataURI.setApprovalForAll
[**interfacesIERC1155MetadataURISupportsInterface**](IERC1155MetadataURIApi.md#interfacesIERC1155MetadataURISupportsInterface) | **POST** /{networkId}/interface/IERC1155MetadataURI/read/{address}/supportsInterface | IERC1155MetadataURI.supportsInterface
[**interfacesIERC1155MetadataURIUri**](IERC1155MetadataURIApi.md#interfacesIERC1155MetadataURIUri) | **POST** /{networkId}/interface/IERC1155MetadataURI/read/{address}/uri | IERC1155MetadataURI.uri



## interfacesIERC1155MetadataURIBalanceOf

> InterfacesIERC1155BalanceOf200Response interfacesIERC1155MetadataURIBalanceOf(networkId, address, interfacesIERC1155BalanceOfRequest)

IERC1155MetadataURI.balanceOf

Read &#x60;balanceOf(account,id)&#x60; on an instance of &#x60;IERC1155MetadataURI&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC1155MetadataURIApi;

IERC1155MetadataURIApi apiInstance = new IERC1155MetadataURIApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC1155BalanceOfRequest interfacesIERC1155BalanceOfRequest = new InterfacesIERC1155BalanceOfRequest(); // InterfacesIERC1155BalanceOfRequest | 
try {
    InterfacesIERC1155BalanceOf200Response result = apiInstance.interfacesIERC1155MetadataURIBalanceOf(networkId, address, interfacesIERC1155BalanceOfRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC1155MetadataURIApi#interfacesIERC1155MetadataURIBalanceOf");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIERC1155BalanceOfRequest** | [**InterfacesIERC1155BalanceOfRequest**](InterfacesIERC1155BalanceOfRequest.md)|  |

### Return type

[**InterfacesIERC1155BalanceOf200Response**](InterfacesIERC1155BalanceOf200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIERC1155MetadataURIBalanceOfBatch

> InterfacesIERC1155BalanceOfBatch200Response interfacesIERC1155MetadataURIBalanceOfBatch(networkId, address, interfacesIERC1155BalanceOfBatchRequest)

IERC1155MetadataURI.balanceOfBatch

Read &#x60;balanceOfBatch(accounts,ids)&#x60; on an instance of &#x60;IERC1155MetadataURI&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC1155MetadataURIApi;

IERC1155MetadataURIApi apiInstance = new IERC1155MetadataURIApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC1155BalanceOfBatchRequest interfacesIERC1155BalanceOfBatchRequest = new InterfacesIERC1155BalanceOfBatchRequest(); // InterfacesIERC1155BalanceOfBatchRequest | 
try {
    InterfacesIERC1155BalanceOfBatch200Response result = apiInstance.interfacesIERC1155MetadataURIBalanceOfBatch(networkId, address, interfacesIERC1155BalanceOfBatchRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC1155MetadataURIApi#interfacesIERC1155MetadataURIBalanceOfBatch");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIERC1155BalanceOfBatchRequest** | [**InterfacesIERC1155BalanceOfBatchRequest**](InterfacesIERC1155BalanceOfBatchRequest.md)|  |

### Return type

[**InterfacesIERC1155BalanceOfBatch200Response**](InterfacesIERC1155BalanceOfBatch200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIERC1155MetadataURIIsApprovedForAll

> InterfacesIERC1155IsApprovedForAll200Response interfacesIERC1155MetadataURIIsApprovedForAll(networkId, address, interfacesIERC1155IsApprovedForAllRequest)

IERC1155MetadataURI.isApprovedForAll

Read &#x60;isApprovedForAll(account,operator)&#x60; on an instance of &#x60;IERC1155MetadataURI&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC1155MetadataURIApi;

IERC1155MetadataURIApi apiInstance = new IERC1155MetadataURIApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC1155IsApprovedForAllRequest interfacesIERC1155IsApprovedForAllRequest = new InterfacesIERC1155IsApprovedForAllRequest(); // InterfacesIERC1155IsApprovedForAllRequest | 
try {
    InterfacesIERC1155IsApprovedForAll200Response result = apiInstance.interfacesIERC1155MetadataURIIsApprovedForAll(networkId, address, interfacesIERC1155IsApprovedForAllRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC1155MetadataURIApi#interfacesIERC1155MetadataURIIsApprovedForAll");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIERC1155IsApprovedForAllRequest** | [**InterfacesIERC1155IsApprovedForAllRequest**](InterfacesIERC1155IsApprovedForAllRequest.md)|  |

### Return type

[**InterfacesIERC1155IsApprovedForAll200Response**](InterfacesIERC1155IsApprovedForAll200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIERC1155MetadataURISafeBatchTransferFrom

> InterfacesIERC1155SafeBatchTransferFrom200Response interfacesIERC1155MetadataURISafeBatchTransferFrom(networkId, address, interfacesIERC1155SafeBatchTransferFromRequest)

IERC1155MetadataURI.safeBatchTransferFrom

Write &#x60;safeBatchTransferFrom(from,to,ids,amounts,data)&#x60; on an instance of &#x60;IERC1155MetadataURI&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC1155MetadataURIApi;

IERC1155MetadataURIApi apiInstance = new IERC1155MetadataURIApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC1155SafeBatchTransferFromRequest interfacesIERC1155SafeBatchTransferFromRequest = new InterfacesIERC1155SafeBatchTransferFromRequest(); // InterfacesIERC1155SafeBatchTransferFromRequest | 
try {
    InterfacesIERC1155SafeBatchTransferFrom200Response result = apiInstance.interfacesIERC1155MetadataURISafeBatchTransferFrom(networkId, address, interfacesIERC1155SafeBatchTransferFromRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC1155MetadataURIApi#interfacesIERC1155MetadataURISafeBatchTransferFrom");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIERC1155SafeBatchTransferFromRequest** | [**InterfacesIERC1155SafeBatchTransferFromRequest**](InterfacesIERC1155SafeBatchTransferFromRequest.md)|  |

### Return type

[**InterfacesIERC1155SafeBatchTransferFrom200Response**](InterfacesIERC1155SafeBatchTransferFrom200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIERC1155MetadataURISafeTransferFrom

> InterfacesIERC1155SafeTransferFrom200Response interfacesIERC1155MetadataURISafeTransferFrom(networkId, address, interfacesIERC1155SafeTransferFromRequest)

IERC1155MetadataURI.safeTransferFrom

Write &#x60;safeTransferFrom(from,to,id,amount,data)&#x60; on an instance of &#x60;IERC1155MetadataURI&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC1155MetadataURIApi;

IERC1155MetadataURIApi apiInstance = new IERC1155MetadataURIApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC1155SafeTransferFromRequest interfacesIERC1155SafeTransferFromRequest = new InterfacesIERC1155SafeTransferFromRequest(); // InterfacesIERC1155SafeTransferFromRequest | 
try {
    InterfacesIERC1155SafeTransferFrom200Response result = apiInstance.interfacesIERC1155MetadataURISafeTransferFrom(networkId, address, interfacesIERC1155SafeTransferFromRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC1155MetadataURIApi#interfacesIERC1155MetadataURISafeTransferFrom");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIERC1155SafeTransferFromRequest** | [**InterfacesIERC1155SafeTransferFromRequest**](InterfacesIERC1155SafeTransferFromRequest.md)|  |

### Return type

[**InterfacesIERC1155SafeTransferFrom200Response**](InterfacesIERC1155SafeTransferFrom200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIERC1155MetadataURISetApprovalForAll

> InterfacesIERC1155SetApprovalForAll200Response interfacesIERC1155MetadataURISetApprovalForAll(networkId, address, interfacesIERC1155SetApprovalForAllRequest)

IERC1155MetadataURI.setApprovalForAll

Write &#x60;setApprovalForAll(operator,approved)&#x60; on an instance of &#x60;IERC1155MetadataURI&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC1155MetadataURIApi;

IERC1155MetadataURIApi apiInstance = new IERC1155MetadataURIApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC1155SetApprovalForAllRequest interfacesIERC1155SetApprovalForAllRequest = new InterfacesIERC1155SetApprovalForAllRequest(); // InterfacesIERC1155SetApprovalForAllRequest | 
try {
    InterfacesIERC1155SetApprovalForAll200Response result = apiInstance.interfacesIERC1155MetadataURISetApprovalForAll(networkId, address, interfacesIERC1155SetApprovalForAllRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC1155MetadataURIApi#interfacesIERC1155MetadataURISetApprovalForAll");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIERC1155SetApprovalForAllRequest** | [**InterfacesIERC1155SetApprovalForAllRequest**](InterfacesIERC1155SetApprovalForAllRequest.md)|  |

### Return type

[**InterfacesIERC1155SetApprovalForAll200Response**](InterfacesIERC1155SetApprovalForAll200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIERC1155MetadataURISupportsInterface

> InterfacesIERC165SupportsInterface200Response interfacesIERC1155MetadataURISupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest)

IERC1155MetadataURI.supportsInterface

Read &#x60;supportsInterface(interfaceId)&#x60; on an instance of &#x60;IERC1155MetadataURI&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC1155MetadataURIApi;

IERC1155MetadataURIApi apiInstance = new IERC1155MetadataURIApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC165SupportsInterfaceRequest interfacesIERC165SupportsInterfaceRequest = new InterfacesIERC165SupportsInterfaceRequest(); // InterfacesIERC165SupportsInterfaceRequest | 
try {
    InterfacesIERC165SupportsInterface200Response result = apiInstance.interfacesIERC1155MetadataURISupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC1155MetadataURIApi#interfacesIERC1155MetadataURISupportsInterface");
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


## interfacesIERC1155MetadataURIUri

> InterfacesIERC1155MetadataURIUri200Response interfacesIERC1155MetadataURIUri(networkId, address, interfacesIERC1155MetadataURIUriRequest)

IERC1155MetadataURI.uri

Read &#x60;uri(id)&#x60; on an instance of &#x60;IERC1155MetadataURI&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC1155MetadataURIApi;

IERC1155MetadataURIApi apiInstance = new IERC1155MetadataURIApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC1155MetadataURIUriRequest interfacesIERC1155MetadataURIUriRequest = new InterfacesIERC1155MetadataURIUriRequest(); // InterfacesIERC1155MetadataURIUriRequest | 
try {
    InterfacesIERC1155MetadataURIUri200Response result = apiInstance.interfacesIERC1155MetadataURIUri(networkId, address, interfacesIERC1155MetadataURIUriRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC1155MetadataURIApi#interfacesIERC1155MetadataURIUri");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIERC1155MetadataURIUriRequest** | [**InterfacesIERC1155MetadataURIUriRequest**](InterfacesIERC1155MetadataURIUriRequest.md)|  |

### Return type

[**InterfacesIERC1155MetadataURIUri200Response**](InterfacesIERC1155MetadataURIUri200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

