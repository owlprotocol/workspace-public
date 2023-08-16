# IERC20MetadataAPI

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC20MetadataAllowance**](IERC20MetadataAPI.md#interfacesierc20metadataallowance) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/allowance | IERC20Metadata.allowance
[**interfacesIERC20MetadataApprove**](IERC20MetadataAPI.md#interfacesierc20metadataapprove) | **POST** /{networkId}/interface/IERC20Metadata/write/{address}/approve | IERC20Metadata.approve
[**interfacesIERC20MetadataBalanceOf**](IERC20MetadataAPI.md#interfacesierc20metadatabalanceof) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/balanceOf | IERC20Metadata.balanceOf
[**interfacesIERC20MetadataDecimals**](IERC20MetadataAPI.md#interfacesierc20metadatadecimals) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/decimals | IERC20Metadata.decimals
[**interfacesIERC20MetadataName**](IERC20MetadataAPI.md#interfacesierc20metadataname) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/name | IERC20Metadata.name
[**interfacesIERC20MetadataSymbol**](IERC20MetadataAPI.md#interfacesierc20metadatasymbol) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/symbol | IERC20Metadata.symbol
[**interfacesIERC20MetadataTotalSupply**](IERC20MetadataAPI.md#interfacesierc20metadatatotalsupply) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/totalSupply | IERC20Metadata.totalSupply
[**interfacesIERC20MetadataTransfer**](IERC20MetadataAPI.md#interfacesierc20metadatatransfer) | **POST** /{networkId}/interface/IERC20Metadata/write/{address}/transfer | IERC20Metadata.transfer
[**interfacesIERC20MetadataTransferFrom**](IERC20MetadataAPI.md#interfacesierc20metadatatransferfrom) | **POST** /{networkId}/interface/IERC20Metadata/write/{address}/transferFrom | IERC20Metadata.transferFrom


# **interfacesIERC20MetadataAllowance**
```swift
    open class func interfacesIERC20MetadataAllowance(networkId: String, address: String, interfacesIERC20AllowanceRequest: InterfacesIERC20AllowanceRequest, completion: @escaping (_ data: InterfacesIERC20Allowance200Response?, _ error: Error?) -> Void)
```

IERC20Metadata.allowance

Read `allowance(owner,spender)` on an instance of `IERC20Metadata`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC20AllowanceRequest = interfaces_IERC20_allowance_request(contractParams: interfaces_IERC20_allowance_request_contractParams(_0: "_0_example", _1: "_1_example", owner: "owner_example", spender: "spender_example")) // InterfacesIERC20AllowanceRequest | 

// IERC20Metadata.allowance
IERC20MetadataAPI.interfacesIERC20MetadataAllowance(networkId: networkId, address: address, interfacesIERC20AllowanceRequest: interfacesIERC20AllowanceRequest) { (response, error) in
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

# **interfacesIERC20MetadataApprove**
```swift
    open class func interfacesIERC20MetadataApprove(networkId: String, address: String, interfacesIERC20ApproveRequest: InterfacesIERC20ApproveRequest, completion: @escaping (_ data: InterfacesIERC20Approve200Response?, _ error: Error?) -> Void)
```

IERC20Metadata.approve

Write `approve(spender,amount)` on an instance of `IERC20Metadata`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC20ApproveRequest = interfaces_IERC20_approve_request(contractParams: interfaces_IERC20_approve_request_contractParams(_0: "_0_example", _1: "_1_example", spender: "spender_example", amount: "amount_example")) // InterfacesIERC20ApproveRequest | 

// IERC20Metadata.approve
IERC20MetadataAPI.interfacesIERC20MetadataApprove(networkId: networkId, address: address, interfacesIERC20ApproveRequest: interfacesIERC20ApproveRequest) { (response, error) in
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

# **interfacesIERC20MetadataBalanceOf**
```swift
    open class func interfacesIERC20MetadataBalanceOf(networkId: String, address: String, interfacesIERC1820GetManagerRequest: InterfacesIERC1820GetManagerRequest, completion: @escaping (_ data: InterfacesIERC20BalanceOf200Response?, _ error: Error?) -> Void)
```

IERC20Metadata.balanceOf

Read `balanceOf(account)` on an instance of `IERC20Metadata`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC1820GetManagerRequest = interfaces_IERC1820_getManager_request(contractParams: interfaces_IERC1820_getManager_request_contractParams(_0: "_0_example", account: "account_example")) // InterfacesIERC1820GetManagerRequest | 

// IERC20Metadata.balanceOf
IERC20MetadataAPI.interfacesIERC20MetadataBalanceOf(networkId: networkId, address: address, interfacesIERC1820GetManagerRequest: interfacesIERC1820GetManagerRequest) { (response, error) in
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

# **interfacesIERC20MetadataDecimals**
```swift
    open class func interfacesIERC20MetadataDecimals(networkId: String, address: String, interfacesIBeaconImplementationRequest: InterfacesIBeaconImplementationRequest, completion: @escaping (_ data: InterfacesIERC20MetadataDecimals200Response?, _ error: Error?) -> Void)
```

IERC20Metadata.decimals

Read `decimals()` on an instance of `IERC20Metadata`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIBeaconImplementationRequest = interfaces_IBeacon_implementation_request(contractParams: 123) // InterfacesIBeaconImplementationRequest | 

// IERC20Metadata.decimals
IERC20MetadataAPI.interfacesIERC20MetadataDecimals(networkId: networkId, address: address, interfacesIBeaconImplementationRequest: interfacesIBeaconImplementationRequest) { (response, error) in
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

[**InterfacesIERC20MetadataDecimals200Response**](InterfacesIERC20MetadataDecimals200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC20MetadataName**
```swift
    open class func interfacesIERC20MetadataName(networkId: String, address: String, interfacesIBeaconImplementationRequest: InterfacesIBeaconImplementationRequest, completion: @escaping (_ data: InterfacesIContractURIContractURI200Response?, _ error: Error?) -> Void)
```

IERC20Metadata.name

Read `name()` on an instance of `IERC20Metadata`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIBeaconImplementationRequest = interfaces_IBeacon_implementation_request(contractParams: 123) // InterfacesIBeaconImplementationRequest | 

// IERC20Metadata.name
IERC20MetadataAPI.interfacesIERC20MetadataName(networkId: networkId, address: address, interfacesIBeaconImplementationRequest: interfacesIBeaconImplementationRequest) { (response, error) in
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

[**InterfacesIContractURIContractURI200Response**](InterfacesIContractURIContractURI200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC20MetadataSymbol**
```swift
    open class func interfacesIERC20MetadataSymbol(networkId: String, address: String, interfacesIBeaconImplementationRequest: InterfacesIBeaconImplementationRequest, completion: @escaping (_ data: InterfacesIContractURIContractURI200Response?, _ error: Error?) -> Void)
```

IERC20Metadata.symbol

Read `symbol()` on an instance of `IERC20Metadata`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIBeaconImplementationRequest = interfaces_IBeacon_implementation_request(contractParams: 123) // InterfacesIBeaconImplementationRequest | 

// IERC20Metadata.symbol
IERC20MetadataAPI.interfacesIERC20MetadataSymbol(networkId: networkId, address: address, interfacesIBeaconImplementationRequest: interfacesIBeaconImplementationRequest) { (response, error) in
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

[**InterfacesIContractURIContractURI200Response**](InterfacesIContractURIContractURI200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC20MetadataTotalSupply**
```swift
    open class func interfacesIERC20MetadataTotalSupply(networkId: String, address: String, interfacesIBeaconImplementationRequest: InterfacesIBeaconImplementationRequest, completion: @escaping (_ data: InterfacesIERC20TotalSupply200Response?, _ error: Error?) -> Void)
```

IERC20Metadata.totalSupply

Read `totalSupply()` on an instance of `IERC20Metadata`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIBeaconImplementationRequest = interfaces_IBeacon_implementation_request(contractParams: 123) // InterfacesIBeaconImplementationRequest | 

// IERC20Metadata.totalSupply
IERC20MetadataAPI.interfacesIERC20MetadataTotalSupply(networkId: networkId, address: address, interfacesIBeaconImplementationRequest: interfacesIBeaconImplementationRequest) { (response, error) in
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

# **interfacesIERC20MetadataTransfer**
```swift
    open class func interfacesIERC20MetadataTransfer(networkId: String, address: String, interfacesIERC20TransferRequest: InterfacesIERC20TransferRequest, completion: @escaping (_ data: InterfacesIERC20Transfer200Response?, _ error: Error?) -> Void)
```

IERC20Metadata.transfer

Write `transfer(to,amount)` on an instance of `IERC20Metadata`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC20TransferRequest = interfaces_IERC20_transfer_request(contractParams: interfaces_IERC20_transfer_request_contractParams(_0: "_0_example", _1: "_1_example", to: "to_example", amount: "amount_example")) // InterfacesIERC20TransferRequest | 

// IERC20Metadata.transfer
IERC20MetadataAPI.interfacesIERC20MetadataTransfer(networkId: networkId, address: address, interfacesIERC20TransferRequest: interfacesIERC20TransferRequest) { (response, error) in
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

# **interfacesIERC20MetadataTransferFrom**
```swift
    open class func interfacesIERC20MetadataTransferFrom(networkId: String, address: String, interfacesIERC20TransferFromRequest: InterfacesIERC20TransferFromRequest, completion: @escaping (_ data: InterfacesIERC20TransferFrom200Response?, _ error: Error?) -> Void)
```

IERC20Metadata.transferFrom

Write `transferFrom(from,to,amount)` on an instance of `IERC20Metadata`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC20TransferFromRequest = interfaces_IERC20_transferFrom_request(contractParams: interfaces_IERC20_transferFrom_request_contractParams(_0: "_0_example", _1: "_1_example", _2: "_2_example", from: "from_example", to: "to_example", amount: "amount_example")) // InterfacesIERC20TransferFromRequest | 

// IERC20Metadata.transferFrom
IERC20MetadataAPI.interfacesIERC20MetadataTransferFrom(networkId: networkId, address: address, interfacesIERC20TransferFromRequest: interfacesIERC20TransferFromRequest) { (response, error) in
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

