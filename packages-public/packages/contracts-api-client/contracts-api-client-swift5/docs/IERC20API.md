# IERC20API

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC20Allowance**](IERC20API.md#interfacesierc20allowance) | **POST** /{networkId}/interface/IERC20/read/{address}/allowance | IERC20.allowance
[**interfacesIERC20Approve**](IERC20API.md#interfacesierc20approve) | **POST** /{networkId}/interface/IERC20/write/{address}/approve | IERC20.approve
[**interfacesIERC20BalanceOf**](IERC20API.md#interfacesierc20balanceof) | **POST** /{networkId}/interface/IERC20/read/{address}/balanceOf | IERC20.balanceOf
[**interfacesIERC20TotalSupply**](IERC20API.md#interfacesierc20totalsupply) | **POST** /{networkId}/interface/IERC20/read/{address}/totalSupply | IERC20.totalSupply
[**interfacesIERC20Transfer**](IERC20API.md#interfacesierc20transfer) | **POST** /{networkId}/interface/IERC20/write/{address}/transfer | IERC20.transfer
[**interfacesIERC20TransferFrom**](IERC20API.md#interfacesierc20transferfrom) | **POST** /{networkId}/interface/IERC20/write/{address}/transferFrom | IERC20.transferFrom


# **interfacesIERC20Allowance**
```swift
    open class func interfacesIERC20Allowance(networkId: String, address: String, interfacesIERC20AllowanceRequest: InterfacesIERC20AllowanceRequest, completion: @escaping (_ data: InterfacesIERC20Allowance200Response?, _ error: Error?) -> Void)
```

IERC20.allowance

Read `allowance(owner,spender)` on an instance of `IERC20`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC20AllowanceRequest = interfaces_IERC20_allowance_request(contractParams: interfaces_IERC20_allowance_request_contractParams(_0: "_0_example", _1: "_1_example", owner: "owner_example", spender: "spender_example")) // InterfacesIERC20AllowanceRequest | 

// IERC20.allowance
IERC20API.interfacesIERC20Allowance(networkId: networkId, address: address, interfacesIERC20AllowanceRequest: interfacesIERC20AllowanceRequest) { (response, error) in
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
 **interfacesIERC20AllowanceRequest** | [**InterfacesIERC20AllowanceRequest**](InterfacesIERC20AllowanceRequest.md) |  | 

### Return type

[**InterfacesIERC20Allowance200Response**](InterfacesIERC20Allowance200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC20Approve**
```swift
    open class func interfacesIERC20Approve(networkId: String, address: String, interfacesIERC20ApproveRequest: InterfacesIERC20ApproveRequest, completion: @escaping (_ data: InterfacesIERC20Approve200Response?, _ error: Error?) -> Void)
```

IERC20.approve

Write `approve(spender,amount)` on an instance of `IERC20`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC20ApproveRequest = interfaces_IERC20_approve_request(contractParams: interfaces_IERC20_approve_request_contractParams(_0: "_0_example", _1: "_1_example", spender: "spender_example", amount: "amount_example")) // InterfacesIERC20ApproveRequest | 

// IERC20.approve
IERC20API.interfacesIERC20Approve(networkId: networkId, address: address, interfacesIERC20ApproveRequest: interfacesIERC20ApproveRequest) { (response, error) in
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
 **interfacesIERC20ApproveRequest** | [**InterfacesIERC20ApproveRequest**](InterfacesIERC20ApproveRequest.md) |  | 

### Return type

[**InterfacesIERC20Approve200Response**](InterfacesIERC20Approve200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC20BalanceOf**
```swift
    open class func interfacesIERC20BalanceOf(networkId: String, address: String, interfacesIERC1820GetManagerRequest: InterfacesIERC1820GetManagerRequest, completion: @escaping (_ data: InterfacesIERC20BalanceOf200Response?, _ error: Error?) -> Void)
```

IERC20.balanceOf

Read `balanceOf(account)` on an instance of `IERC20`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC1820GetManagerRequest = interfaces_IERC1820_getManager_request(contractParams: interfaces_IERC1820_getManager_request_contractParams(_0: "_0_example", account: "account_example")) // InterfacesIERC1820GetManagerRequest | 

// IERC20.balanceOf
IERC20API.interfacesIERC20BalanceOf(networkId: networkId, address: address, interfacesIERC1820GetManagerRequest: interfacesIERC1820GetManagerRequest) { (response, error) in
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
 **interfacesIERC1820GetManagerRequest** | [**InterfacesIERC1820GetManagerRequest**](InterfacesIERC1820GetManagerRequest.md) |  | 

### Return type

[**InterfacesIERC20BalanceOf200Response**](InterfacesIERC20BalanceOf200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC20TotalSupply**
```swift
    open class func interfacesIERC20TotalSupply(networkId: String, address: String, interfacesIBeaconImplementationRequest: InterfacesIBeaconImplementationRequest, completion: @escaping (_ data: InterfacesIERC20TotalSupply200Response?, _ error: Error?) -> Void)
```

IERC20.totalSupply

Read `totalSupply()` on an instance of `IERC20`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIBeaconImplementationRequest = interfaces_IBeacon_implementation_request(contractParams: 123) // InterfacesIBeaconImplementationRequest | 

// IERC20.totalSupply
IERC20API.interfacesIERC20TotalSupply(networkId: networkId, address: address, interfacesIBeaconImplementationRequest: interfacesIBeaconImplementationRequest) { (response, error) in
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
 **interfacesIBeaconImplementationRequest** | [**InterfacesIBeaconImplementationRequest**](InterfacesIBeaconImplementationRequest.md) |  | 

### Return type

[**InterfacesIERC20TotalSupply200Response**](InterfacesIERC20TotalSupply200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC20Transfer**
```swift
    open class func interfacesIERC20Transfer(networkId: String, address: String, interfacesIERC20TransferRequest: InterfacesIERC20TransferRequest, completion: @escaping (_ data: InterfacesIERC20Transfer200Response?, _ error: Error?) -> Void)
```

IERC20.transfer

Write `transfer(to,amount)` on an instance of `IERC20`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC20TransferRequest = interfaces_IERC20_transfer_request(contractParams: interfaces_IERC20_transfer_request_contractParams(_0: "_0_example", _1: "_1_example", to: "to_example", amount: "amount_example")) // InterfacesIERC20TransferRequest | 

// IERC20.transfer
IERC20API.interfacesIERC20Transfer(networkId: networkId, address: address, interfacesIERC20TransferRequest: interfacesIERC20TransferRequest) { (response, error) in
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

# **interfacesIERC20TransferFrom**
```swift
    open class func interfacesIERC20TransferFrom(networkId: String, address: String, interfacesIERC20TransferFromRequest: InterfacesIERC20TransferFromRequest, completion: @escaping (_ data: InterfacesIERC20TransferFrom200Response?, _ error: Error?) -> Void)
```

IERC20.transferFrom

Write `transferFrom(from,to,amount)` on an instance of `IERC20`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC20TransferFromRequest = interfaces_IERC20_transferFrom_request(contractParams: interfaces_IERC20_transferFrom_request_contractParams(_0: "_0_example", _1: "_1_example", _2: "_2_example", from: "from_example", to: "to_example", amount: "amount_example")) // InterfacesIERC20TransferFromRequest | 

// IERC20.transferFrom
IERC20API.interfacesIERC20TransferFrom(networkId: networkId, address: address, interfacesIERC20TransferFromRequest: interfacesIERC20TransferFromRequest) { (response, error) in
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
 **interfacesIERC20TransferFromRequest** | [**InterfacesIERC20TransferFromRequest**](InterfacesIERC20TransferFromRequest.md) |  | 

### Return type

[**InterfacesIERC20TransferFrom200Response**](InterfacesIERC20TransferFrom200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

