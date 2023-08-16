# IERC20Api

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC20Allowance**](IERC20Api.md#interfacesIERC20Allowance) | **POST** /{networkId}/interface/IERC20/read/{address}/allowance | IERC20.allowance
[**interfacesIERC20Approve**](IERC20Api.md#interfacesIERC20Approve) | **POST** /{networkId}/interface/IERC20/write/{address}/approve | IERC20.approve
[**interfacesIERC20BalanceOf**](IERC20Api.md#interfacesIERC20BalanceOf) | **POST** /{networkId}/interface/IERC20/read/{address}/balanceOf | IERC20.balanceOf
[**interfacesIERC20TotalSupply**](IERC20Api.md#interfacesIERC20TotalSupply) | **POST** /{networkId}/interface/IERC20/read/{address}/totalSupply | IERC20.totalSupply
[**interfacesIERC20Transfer**](IERC20Api.md#interfacesIERC20Transfer) | **POST** /{networkId}/interface/IERC20/write/{address}/transfer | IERC20.transfer
[**interfacesIERC20TransferFrom**](IERC20Api.md#interfacesIERC20TransferFrom) | **POST** /{networkId}/interface/IERC20/write/{address}/transferFrom | IERC20.transferFrom



## interfacesIERC20Allowance

> InterfacesIERC20Allowance200Response interfacesIERC20Allowance(networkId, address, interfacesIERC20AllowanceRequest)

IERC20.allowance

Read &#x60;allowance(owner,spender)&#x60; on an instance of &#x60;IERC20&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC20Api;

IERC20Api apiInstance = new IERC20Api();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC20AllowanceRequest interfacesIERC20AllowanceRequest = new InterfacesIERC20AllowanceRequest(); // InterfacesIERC20AllowanceRequest | 
try {
    InterfacesIERC20Allowance200Response result = apiInstance.interfacesIERC20Allowance(networkId, address, interfacesIERC20AllowanceRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC20Api#interfacesIERC20Allowance");
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


## interfacesIERC20Approve

> InterfacesIERC20Approve200Response interfacesIERC20Approve(networkId, address, interfacesIERC20ApproveRequest)

IERC20.approve

Write &#x60;approve(spender,amount)&#x60; on an instance of &#x60;IERC20&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC20Api;

IERC20Api apiInstance = new IERC20Api();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC20ApproveRequest interfacesIERC20ApproveRequest = new InterfacesIERC20ApproveRequest(); // InterfacesIERC20ApproveRequest | 
try {
    InterfacesIERC20Approve200Response result = apiInstance.interfacesIERC20Approve(networkId, address, interfacesIERC20ApproveRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC20Api#interfacesIERC20Approve");
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


## interfacesIERC20BalanceOf

> InterfacesIERC20BalanceOf200Response interfacesIERC20BalanceOf(networkId, address, interfacesIERC1820GetManagerRequest)

IERC20.balanceOf

Read &#x60;balanceOf(account)&#x60; on an instance of &#x60;IERC20&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC20Api;

IERC20Api apiInstance = new IERC20Api();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC1820GetManagerRequest interfacesIERC1820GetManagerRequest = new InterfacesIERC1820GetManagerRequest(); // InterfacesIERC1820GetManagerRequest | 
try {
    InterfacesIERC20BalanceOf200Response result = apiInstance.interfacesIERC20BalanceOf(networkId, address, interfacesIERC1820GetManagerRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC20Api#interfacesIERC20BalanceOf");
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


## interfacesIERC20TotalSupply

> InterfacesIERC20TotalSupply200Response interfacesIERC20TotalSupply(networkId, address, interfacesIBeaconImplementationRequest)

IERC20.totalSupply

Read &#x60;totalSupply()&#x60; on an instance of &#x60;IERC20&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC20Api;

IERC20Api apiInstance = new IERC20Api();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest = new InterfacesIBeaconImplementationRequest(); // InterfacesIBeaconImplementationRequest | 
try {
    InterfacesIERC20TotalSupply200Response result = apiInstance.interfacesIERC20TotalSupply(networkId, address, interfacesIBeaconImplementationRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC20Api#interfacesIERC20TotalSupply");
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


## interfacesIERC20Transfer

> InterfacesIERC20Transfer200Response interfacesIERC20Transfer(networkId, address, interfacesIERC20TransferRequest)

IERC20.transfer

Write &#x60;transfer(to,amount)&#x60; on an instance of &#x60;IERC20&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC20Api;

IERC20Api apiInstance = new IERC20Api();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC20TransferRequest interfacesIERC20TransferRequest = new InterfacesIERC20TransferRequest(); // InterfacesIERC20TransferRequest | 
try {
    InterfacesIERC20Transfer200Response result = apiInstance.interfacesIERC20Transfer(networkId, address, interfacesIERC20TransferRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC20Api#interfacesIERC20Transfer");
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


## interfacesIERC20TransferFrom

> InterfacesIERC20TransferFrom200Response interfacesIERC20TransferFrom(networkId, address, interfacesIERC20TransferFromRequest)

IERC20.transferFrom

Write &#x60;transferFrom(from,to,amount)&#x60; on an instance of &#x60;IERC20&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC20Api;

IERC20Api apiInstance = new IERC20Api();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC20TransferFromRequest interfacesIERC20TransferFromRequest = new InterfacesIERC20TransferFromRequest(); // InterfacesIERC20TransferFromRequest | 
try {
    InterfacesIERC20TransferFrom200Response result = apiInstance.interfacesIERC20TransferFrom(networkId, address, interfacesIERC20TransferFromRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC20Api#interfacesIERC20TransferFrom");
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

