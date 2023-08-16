# IERC20MetadataApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC20MetadataAllowance**](IERC20MetadataApi.md#interfacesIERC20MetadataAllowance) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/allowance | IERC20Metadata.allowance
[**interfacesIERC20MetadataApprove**](IERC20MetadataApi.md#interfacesIERC20MetadataApprove) | **POST** /{networkId}/interface/IERC20Metadata/write/{address}/approve | IERC20Metadata.approve
[**interfacesIERC20MetadataBalanceOf**](IERC20MetadataApi.md#interfacesIERC20MetadataBalanceOf) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/balanceOf | IERC20Metadata.balanceOf
[**interfacesIERC20MetadataDecimals**](IERC20MetadataApi.md#interfacesIERC20MetadataDecimals) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/decimals | IERC20Metadata.decimals
[**interfacesIERC20MetadataName**](IERC20MetadataApi.md#interfacesIERC20MetadataName) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/name | IERC20Metadata.name
[**interfacesIERC20MetadataSymbol**](IERC20MetadataApi.md#interfacesIERC20MetadataSymbol) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/symbol | IERC20Metadata.symbol
[**interfacesIERC20MetadataTotalSupply**](IERC20MetadataApi.md#interfacesIERC20MetadataTotalSupply) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/totalSupply | IERC20Metadata.totalSupply
[**interfacesIERC20MetadataTransfer**](IERC20MetadataApi.md#interfacesIERC20MetadataTransfer) | **POST** /{networkId}/interface/IERC20Metadata/write/{address}/transfer | IERC20Metadata.transfer
[**interfacesIERC20MetadataTransferFrom**](IERC20MetadataApi.md#interfacesIERC20MetadataTransferFrom) | **POST** /{networkId}/interface/IERC20Metadata/write/{address}/transferFrom | IERC20Metadata.transferFrom



## interfacesIERC20MetadataAllowance

> InterfacesIERC20Allowance200Response interfacesIERC20MetadataAllowance(networkId, address, interfacesIERC20AllowanceRequest)

IERC20Metadata.allowance

Read &#x60;allowance(owner,spender)&#x60; on an instance of &#x60;IERC20Metadata&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC20MetadataApi;

IERC20MetadataApi apiInstance = new IERC20MetadataApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC20AllowanceRequest interfacesIERC20AllowanceRequest = new InterfacesIERC20AllowanceRequest(); // InterfacesIERC20AllowanceRequest | 
try {
    InterfacesIERC20Allowance200Response result = apiInstance.interfacesIERC20MetadataAllowance(networkId, address, interfacesIERC20AllowanceRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC20MetadataApi#interfacesIERC20MetadataAllowance");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIERC20AllowanceRequest** | [**InterfacesIERC20AllowanceRequest**](InterfacesIERC20AllowanceRequest.md)|  |

### Return type

[**InterfacesIERC20Allowance200Response**](InterfacesIERC20Allowance200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIERC20MetadataApprove

> InterfacesIERC20Approve200Response interfacesIERC20MetadataApprove(networkId, address, interfacesIERC20ApproveRequest)

IERC20Metadata.approve

Write &#x60;approve(spender,amount)&#x60; on an instance of &#x60;IERC20Metadata&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC20MetadataApi;

IERC20MetadataApi apiInstance = new IERC20MetadataApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC20ApproveRequest interfacesIERC20ApproveRequest = new InterfacesIERC20ApproveRequest(); // InterfacesIERC20ApproveRequest | 
try {
    InterfacesIERC20Approve200Response result = apiInstance.interfacesIERC20MetadataApprove(networkId, address, interfacesIERC20ApproveRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC20MetadataApi#interfacesIERC20MetadataApprove");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIERC20ApproveRequest** | [**InterfacesIERC20ApproveRequest**](InterfacesIERC20ApproveRequest.md)|  |

### Return type

[**InterfacesIERC20Approve200Response**](InterfacesIERC20Approve200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIERC20MetadataBalanceOf

> InterfacesIERC20BalanceOf200Response interfacesIERC20MetadataBalanceOf(networkId, address, interfacesIERC1820GetManagerRequest)

IERC20Metadata.balanceOf

Read &#x60;balanceOf(account)&#x60; on an instance of &#x60;IERC20Metadata&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC20MetadataApi;

IERC20MetadataApi apiInstance = new IERC20MetadataApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC1820GetManagerRequest interfacesIERC1820GetManagerRequest = new InterfacesIERC1820GetManagerRequest(); // InterfacesIERC1820GetManagerRequest | 
try {
    InterfacesIERC20BalanceOf200Response result = apiInstance.interfacesIERC20MetadataBalanceOf(networkId, address, interfacesIERC1820GetManagerRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC20MetadataApi#interfacesIERC20MetadataBalanceOf");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIERC1820GetManagerRequest** | [**InterfacesIERC1820GetManagerRequest**](InterfacesIERC1820GetManagerRequest.md)|  |

### Return type

[**InterfacesIERC20BalanceOf200Response**](InterfacesIERC20BalanceOf200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIERC20MetadataDecimals

> InterfacesIERC20MetadataDecimals200Response interfacesIERC20MetadataDecimals(networkId, address, interfacesIBeaconImplementationRequest)

IERC20Metadata.decimals

Read &#x60;decimals()&#x60; on an instance of &#x60;IERC20Metadata&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC20MetadataApi;

IERC20MetadataApi apiInstance = new IERC20MetadataApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest = new InterfacesIBeaconImplementationRequest(); // InterfacesIBeaconImplementationRequest | 
try {
    InterfacesIERC20MetadataDecimals200Response result = apiInstance.interfacesIERC20MetadataDecimals(networkId, address, interfacesIBeaconImplementationRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC20MetadataApi#interfacesIERC20MetadataDecimals");
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

[**InterfacesIERC20MetadataDecimals200Response**](InterfacesIERC20MetadataDecimals200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIERC20MetadataName

> InterfacesIContractURIContractURI200Response interfacesIERC20MetadataName(networkId, address, interfacesIBeaconImplementationRequest)

IERC20Metadata.name

Read &#x60;name()&#x60; on an instance of &#x60;IERC20Metadata&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC20MetadataApi;

IERC20MetadataApi apiInstance = new IERC20MetadataApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest = new InterfacesIBeaconImplementationRequest(); // InterfacesIBeaconImplementationRequest | 
try {
    InterfacesIContractURIContractURI200Response result = apiInstance.interfacesIERC20MetadataName(networkId, address, interfacesIBeaconImplementationRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC20MetadataApi#interfacesIERC20MetadataName");
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


## interfacesIERC20MetadataSymbol

> InterfacesIContractURIContractURI200Response interfacesIERC20MetadataSymbol(networkId, address, interfacesIBeaconImplementationRequest)

IERC20Metadata.symbol

Read &#x60;symbol()&#x60; on an instance of &#x60;IERC20Metadata&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC20MetadataApi;

IERC20MetadataApi apiInstance = new IERC20MetadataApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest = new InterfacesIBeaconImplementationRequest(); // InterfacesIBeaconImplementationRequest | 
try {
    InterfacesIContractURIContractURI200Response result = apiInstance.interfacesIERC20MetadataSymbol(networkId, address, interfacesIBeaconImplementationRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC20MetadataApi#interfacesIERC20MetadataSymbol");
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


## interfacesIERC20MetadataTotalSupply

> InterfacesIERC20TotalSupply200Response interfacesIERC20MetadataTotalSupply(networkId, address, interfacesIBeaconImplementationRequest)

IERC20Metadata.totalSupply

Read &#x60;totalSupply()&#x60; on an instance of &#x60;IERC20Metadata&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC20MetadataApi;

IERC20MetadataApi apiInstance = new IERC20MetadataApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest = new InterfacesIBeaconImplementationRequest(); // InterfacesIBeaconImplementationRequest | 
try {
    InterfacesIERC20TotalSupply200Response result = apiInstance.interfacesIERC20MetadataTotalSupply(networkId, address, interfacesIBeaconImplementationRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC20MetadataApi#interfacesIERC20MetadataTotalSupply");
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


## interfacesIERC20MetadataTransfer

> InterfacesIERC20Transfer200Response interfacesIERC20MetadataTransfer(networkId, address, interfacesIERC20TransferRequest)

IERC20Metadata.transfer

Write &#x60;transfer(to,amount)&#x60; on an instance of &#x60;IERC20Metadata&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC20MetadataApi;

IERC20MetadataApi apiInstance = new IERC20MetadataApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC20TransferRequest interfacesIERC20TransferRequest = new InterfacesIERC20TransferRequest(); // InterfacesIERC20TransferRequest | 
try {
    InterfacesIERC20Transfer200Response result = apiInstance.interfacesIERC20MetadataTransfer(networkId, address, interfacesIERC20TransferRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC20MetadataApi#interfacesIERC20MetadataTransfer");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIERC20TransferRequest** | [**InterfacesIERC20TransferRequest**](InterfacesIERC20TransferRequest.md)|  |

### Return type

[**InterfacesIERC20Transfer200Response**](InterfacesIERC20Transfer200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIERC20MetadataTransferFrom

> InterfacesIERC20TransferFrom200Response interfacesIERC20MetadataTransferFrom(networkId, address, interfacesIERC20TransferFromRequest)

IERC20Metadata.transferFrom

Write &#x60;transferFrom(from,to,amount)&#x60; on an instance of &#x60;IERC20Metadata&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC20MetadataApi;

IERC20MetadataApi apiInstance = new IERC20MetadataApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC20TransferFromRequest interfacesIERC20TransferFromRequest = new InterfacesIERC20TransferFromRequest(); // InterfacesIERC20TransferFromRequest | 
try {
    InterfacesIERC20TransferFrom200Response result = apiInstance.interfacesIERC20MetadataTransferFrom(networkId, address, interfacesIERC20TransferFromRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC20MetadataApi#interfacesIERC20MetadataTransferFrom");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIERC20TransferFromRequest** | [**InterfacesIERC20TransferFromRequest**](InterfacesIERC20TransferFromRequest.md)|  |

### Return type

[**InterfacesIERC20TransferFrom200Response**](InterfacesIERC20TransferFrom200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

