# IERC20MintableApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC20MintableMint**](IERC20MintableApi.md#interfacesIERC20MintableMint) | **POST** /{networkId}/interface/IERC20Mintable/write/{address}/mint | IERC20Mintable.mint



## interfacesIERC20MintableMint

> InterfacesIERC20Transfer200Response interfacesIERC20MintableMint(networkId, address, interfacesIERC20TransferRequest)

IERC20Mintable.mint

Write &#x60;mint(to,amount)&#x60; on an instance of &#x60;IERC20Mintable&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC20MintableApi;

IERC20MintableApi apiInstance = new IERC20MintableApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC20TransferRequest interfacesIERC20TransferRequest = new InterfacesIERC20TransferRequest(); // InterfacesIERC20TransferRequest | 
try {
    InterfacesIERC20Transfer200Response result = apiInstance.interfacesIERC20MintableMint(networkId, address, interfacesIERC20TransferRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC20MintableApi#interfacesIERC20MintableMint");
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

