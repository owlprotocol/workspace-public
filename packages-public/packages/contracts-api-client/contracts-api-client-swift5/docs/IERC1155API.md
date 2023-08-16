# IERC1155API

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC1155BalanceOf**](IERC1155API.md#interfacesierc1155balanceof) | **POST** /{networkId}/interface/IERC1155/read/{address}/balanceOf | IERC1155.balanceOf
[**interfacesIERC1155BalanceOfBatch**](IERC1155API.md#interfacesierc1155balanceofbatch) | **POST** /{networkId}/interface/IERC1155/read/{address}/balanceOfBatch | IERC1155.balanceOfBatch
[**interfacesIERC1155IsApprovedForAll**](IERC1155API.md#interfacesierc1155isapprovedforall) | **POST** /{networkId}/interface/IERC1155/read/{address}/isApprovedForAll | IERC1155.isApprovedForAll
[**interfacesIERC1155SafeBatchTransferFrom**](IERC1155API.md#interfacesierc1155safebatchtransferfrom) | **POST** /{networkId}/interface/IERC1155/write/{address}/safeBatchTransferFrom | IERC1155.safeBatchTransferFrom
[**interfacesIERC1155SafeTransferFrom**](IERC1155API.md#interfacesierc1155safetransferfrom) | **POST** /{networkId}/interface/IERC1155/write/{address}/safeTransferFrom | IERC1155.safeTransferFrom
[**interfacesIERC1155SetApprovalForAll**](IERC1155API.md#interfacesierc1155setapprovalforall) | **POST** /{networkId}/interface/IERC1155/write/{address}/setApprovalForAll | IERC1155.setApprovalForAll
[**interfacesIERC1155SupportsInterface**](IERC1155API.md#interfacesierc1155supportsinterface) | **POST** /{networkId}/interface/IERC1155/read/{address}/supportsInterface | IERC1155.supportsInterface


# **interfacesIERC1155BalanceOf**
```swift
    open class func interfacesIERC1155BalanceOf(networkId: String, address: String, interfacesIERC1155BalanceOfRequest: InterfacesIERC1155BalanceOfRequest, completion: @escaping (_ data: InterfacesIERC1155BalanceOf200Response?, _ error: Error?) -> Void)
```

IERC1155.balanceOf

Read `balanceOf(account,id)` on an instance of `IERC1155`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC1155BalanceOfRequest = interfaces_IERC1155_balanceOf_request(contractParams: interfaces_IERC1155_balanceOf_request_contractParams(_0: "_0_example", _1: "_1_example", account: "account_example", id: "id_example")) // InterfacesIERC1155BalanceOfRequest | 

// IERC1155.balanceOf
IERC1155API.interfacesIERC1155BalanceOf(networkId: networkId, address: address, interfacesIERC1155BalanceOfRequest: interfacesIERC1155BalanceOfRequest) { (response, error) in
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
 **interfacesIERC1155BalanceOfRequest** | [**InterfacesIERC1155BalanceOfRequest**](InterfacesIERC1155BalanceOfRequest.md) |  | 

### Return type

[**InterfacesIERC1155BalanceOf200Response**](InterfacesIERC1155BalanceOf200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC1155BalanceOfBatch**
```swift
    open class func interfacesIERC1155BalanceOfBatch(networkId: String, address: String, interfacesIERC1155BalanceOfBatchRequest: InterfacesIERC1155BalanceOfBatchRequest, completion: @escaping (_ data: InterfacesIERC1155BalanceOfBatch200Response?, _ error: Error?) -> Void)
```

IERC1155.balanceOfBatch

Read `balanceOfBatch(accounts,ids)` on an instance of `IERC1155`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC1155BalanceOfBatchRequest = interfaces_IERC1155_balanceOfBatch_request(contractParams: interfaces_IERC1155_balanceOfBatch_request_contractParams(_0: ["_0_example"], _1: ["_1_example"], accounts: ["accounts_example"], ids: ["ids_example"])) // InterfacesIERC1155BalanceOfBatchRequest | 

// IERC1155.balanceOfBatch
IERC1155API.interfacesIERC1155BalanceOfBatch(networkId: networkId, address: address, interfacesIERC1155BalanceOfBatchRequest: interfacesIERC1155BalanceOfBatchRequest) { (response, error) in
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
 **interfacesIERC1155BalanceOfBatchRequest** | [**InterfacesIERC1155BalanceOfBatchRequest**](InterfacesIERC1155BalanceOfBatchRequest.md) |  | 

### Return type

[**InterfacesIERC1155BalanceOfBatch200Response**](InterfacesIERC1155BalanceOfBatch200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC1155IsApprovedForAll**
```swift
    open class func interfacesIERC1155IsApprovedForAll(networkId: String, address: String, interfacesIERC1155IsApprovedForAllRequest: InterfacesIERC1155IsApprovedForAllRequest, completion: @escaping (_ data: InterfacesIERC1155IsApprovedForAll200Response?, _ error: Error?) -> Void)
```

IERC1155.isApprovedForAll

Read `isApprovedForAll(account,operator)` on an instance of `IERC1155`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC1155IsApprovedForAllRequest = interfaces_IERC1155_isApprovedForAll_request(contractParams: interfaces_IERC1155_isApprovedForAll_request_contractParams(_0: "_0_example", _1: "_1_example", account: "account_example", _operator: "_operator_example")) // InterfacesIERC1155IsApprovedForAllRequest | 

// IERC1155.isApprovedForAll
IERC1155API.interfacesIERC1155IsApprovedForAll(networkId: networkId, address: address, interfacesIERC1155IsApprovedForAllRequest: interfacesIERC1155IsApprovedForAllRequest) { (response, error) in
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
 **interfacesIERC1155IsApprovedForAllRequest** | [**InterfacesIERC1155IsApprovedForAllRequest**](InterfacesIERC1155IsApprovedForAllRequest.md) |  | 

### Return type

[**InterfacesIERC1155IsApprovedForAll200Response**](InterfacesIERC1155IsApprovedForAll200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC1155SafeBatchTransferFrom**
```swift
    open class func interfacesIERC1155SafeBatchTransferFrom(networkId: String, address: String, interfacesIERC1155SafeBatchTransferFromRequest: InterfacesIERC1155SafeBatchTransferFromRequest, completion: @escaping (_ data: InterfacesIERC1155SafeBatchTransferFrom200Response?, _ error: Error?) -> Void)
```

IERC1155.safeBatchTransferFrom

Write `safeBatchTransferFrom(from,to,ids,amounts,data)` on an instance of `IERC1155`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC1155SafeBatchTransferFromRequest = interfaces_IERC1155_safeBatchTransferFrom_request(contractParams: interfaces_IERC1155_safeBatchTransferFrom_request_contractParams(_0: "_0_example", _1: "_1_example", _2: ["_2_example"], _3: ["_3_example"], _4: "_4_example", from: "from_example", to: "to_example", ids: ["ids_example"], amounts: ["amounts_example"], data: "data_example")) // InterfacesIERC1155SafeBatchTransferFromRequest | 

// IERC1155.safeBatchTransferFrom
IERC1155API.interfacesIERC1155SafeBatchTransferFrom(networkId: networkId, address: address, interfacesIERC1155SafeBatchTransferFromRequest: interfacesIERC1155SafeBatchTransferFromRequest) { (response, error) in
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
 **interfacesIERC1155SafeBatchTransferFromRequest** | [**InterfacesIERC1155SafeBatchTransferFromRequest**](InterfacesIERC1155SafeBatchTransferFromRequest.md) |  | 

### Return type

[**InterfacesIERC1155SafeBatchTransferFrom200Response**](InterfacesIERC1155SafeBatchTransferFrom200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC1155SafeTransferFrom**
```swift
    open class func interfacesIERC1155SafeTransferFrom(networkId: String, address: String, interfacesIERC1155SafeTransferFromRequest: InterfacesIERC1155SafeTransferFromRequest, completion: @escaping (_ data: InterfacesIERC1155SafeTransferFrom200Response?, _ error: Error?) -> Void)
```

IERC1155.safeTransferFrom

Write `safeTransferFrom(from,to,id,amount,data)` on an instance of `IERC1155`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC1155SafeTransferFromRequest = interfaces_IERC1155_safeTransferFrom_request(contractParams: interfaces_IERC1155_safeTransferFrom_request_contractParams(_0: "_0_example", _1: "_1_example", _2: "_2_example", _3: "_3_example", _4: "_4_example", from: "from_example", to: "to_example", id: "id_example", amount: "amount_example", data: "data_example")) // InterfacesIERC1155SafeTransferFromRequest | 

// IERC1155.safeTransferFrom
IERC1155API.interfacesIERC1155SafeTransferFrom(networkId: networkId, address: address, interfacesIERC1155SafeTransferFromRequest: interfacesIERC1155SafeTransferFromRequest) { (response, error) in
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
 **interfacesIERC1155SafeTransferFromRequest** | [**InterfacesIERC1155SafeTransferFromRequest**](InterfacesIERC1155SafeTransferFromRequest.md) |  | 

### Return type

[**InterfacesIERC1155SafeTransferFrom200Response**](InterfacesIERC1155SafeTransferFrom200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC1155SetApprovalForAll**
```swift
    open class func interfacesIERC1155SetApprovalForAll(networkId: String, address: String, interfacesIERC1155SetApprovalForAllRequest: InterfacesIERC1155SetApprovalForAllRequest, completion: @escaping (_ data: InterfacesIERC1155SetApprovalForAll200Response?, _ error: Error?) -> Void)
```

IERC1155.setApprovalForAll

Write `setApprovalForAll(operator,approved)` on an instance of `IERC1155`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC1155SetApprovalForAllRequest = interfaces_IERC1155_setApprovalForAll_request(contractParams: interfaces_IERC1155_setApprovalForAll_request_contractParams(_0: "_0_example", _1: false, _operator: "_operator_example", approved: false)) // InterfacesIERC1155SetApprovalForAllRequest | 

// IERC1155.setApprovalForAll
IERC1155API.interfacesIERC1155SetApprovalForAll(networkId: networkId, address: address, interfacesIERC1155SetApprovalForAllRequest: interfacesIERC1155SetApprovalForAllRequest) { (response, error) in
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
 **interfacesIERC1155SetApprovalForAllRequest** | [**InterfacesIERC1155SetApprovalForAllRequest**](InterfacesIERC1155SetApprovalForAllRequest.md) |  | 

### Return type

[**InterfacesIERC1155SetApprovalForAll200Response**](InterfacesIERC1155SetApprovalForAll200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC1155SupportsInterface**
```swift
    open class func interfacesIERC1155SupportsInterface(networkId: String, address: String, interfacesIERC165SupportsInterfaceRequest: InterfacesIERC165SupportsInterfaceRequest, completion: @escaping (_ data: InterfacesIERC165SupportsInterface200Response?, _ error: Error?) -> Void)
```

IERC1155.supportsInterface

Read `supportsInterface(interfaceId)` on an instance of `IERC1155`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC165SupportsInterfaceRequest = interfaces_IERC165_supportsInterface_request(contractParams: interfaces_IERC165_supportsInterface_request_contractParams(_0: "_0_example", interfaceId: "interfaceId_example")) // InterfacesIERC165SupportsInterfaceRequest | 

// IERC1155.supportsInterface
IERC1155API.interfacesIERC1155SupportsInterface(networkId: networkId, address: address, interfacesIERC165SupportsInterfaceRequest: interfacesIERC165SupportsInterfaceRequest) { (response, error) in
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
 **interfacesIERC165SupportsInterfaceRequest** | [**InterfacesIERC165SupportsInterfaceRequest**](InterfacesIERC165SupportsInterfaceRequest.md) |  | 

### Return type

[**InterfacesIERC165SupportsInterface200Response**](InterfacesIERC165SupportsInterface200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

