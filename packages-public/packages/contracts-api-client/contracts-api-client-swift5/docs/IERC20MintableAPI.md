# IERC20MintableAPI

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC20MintableMint**](IERC20MintableAPI.md#interfacesierc20mintablemint) | **POST** /{networkId}/interface/IERC20Mintable/write/{address}/mint | IERC20Mintable.mint


# **interfacesIERC20MintableMint**
```swift
    open class func interfacesIERC20MintableMint(networkId: String, address: String, interfacesIERC20TransferRequest: InterfacesIERC20TransferRequest, completion: @escaping (_ data: InterfacesIERC20Transfer200Response?, _ error: Error?) -> Void)
```

IERC20Mintable.mint

Write `mint(to,amount)` on an instance of `IERC20Mintable`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC20TransferRequest = interfaces_IERC20_transfer_request(contractParams: interfaces_IERC20_transfer_request_contractParams(_0: "_0_example", _1: "_1_example", to: "to_example", amount: "amount_example")) // InterfacesIERC20TransferRequest | 

// IERC20Mintable.mint
IERC20MintableAPI.interfacesIERC20MintableMint(networkId: networkId, address: address, interfacesIERC20TransferRequest: interfacesIERC20TransferRequest) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String** | The network id | [default to &quot;80001&quot;]
 **address** | **String** | An ethereum address | 
 **interfacesIERC20TransferRequest** | [**InterfacesIERC20TransferRequest**](InterfacesIERC20TransferRequest.md) |  | 

### Return type

[**InterfacesIERC20Transfer200Response**](InterfacesIERC20Transfer200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

