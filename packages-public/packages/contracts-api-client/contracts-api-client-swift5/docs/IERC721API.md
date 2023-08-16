# IERC721API

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC721Approve**](IERC721API.md#interfacesierc721approve) | **POST** /{networkId}/interface/IERC721/write/{address}/approve | IERC721.approve
[**interfacesIERC721BalanceOf**](IERC721API.md#interfacesierc721balanceof) | **POST** /{networkId}/interface/IERC721/read/{address}/balanceOf | IERC721.balanceOf
[**interfacesIERC721GetApproved**](IERC721API.md#interfacesierc721getapproved) | **POST** /{networkId}/interface/IERC721/read/{address}/getApproved | IERC721.getApproved
[**interfacesIERC721IsApprovedForAll**](IERC721API.md#interfacesierc721isapprovedforall) | **POST** /{networkId}/interface/IERC721/read/{address}/isApprovedForAll | IERC721.isApprovedForAll
[**interfacesIERC721OwnerOf**](IERC721API.md#interfacesierc721ownerof) | **POST** /{networkId}/interface/IERC721/read/{address}/ownerOf | IERC721.ownerOf
[**interfacesIERC721SafeTransferFrom**](IERC721API.md#interfacesierc721safetransferfrom) | **POST** /{networkId}/interface/IERC721/write/{address}/safeTransferFrom | IERC721.safeTransferFrom
[**interfacesIERC721SetApprovalForAll**](IERC721API.md#interfacesierc721setapprovalforall) | **POST** /{networkId}/interface/IERC721/write/{address}/setApprovalForAll | IERC721.setApprovalForAll
[**interfacesIERC721SupportsInterface**](IERC721API.md#interfacesierc721supportsinterface) | **POST** /{networkId}/interface/IERC721/read/{address}/supportsInterface | IERC721.supportsInterface
[**interfacesIERC721TransferFrom**](IERC721API.md#interfacesierc721transferfrom) | **POST** /{networkId}/interface/IERC721/write/{address}/transferFrom | IERC721.transferFrom


# **interfacesIERC721Approve**
```swift
    open class func interfacesIERC721Approve(networkId: String, address: String, interfacesIERC721ApproveRequest: InterfacesIERC721ApproveRequest, completion: @escaping (_ data: InterfacesIERC721Approve200Response?, _ error: Error?) -> Void)
```

IERC721.approve

Write `approve(to,tokenId)` on an instance of `IERC721`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721ApproveRequest = interfaces_IERC721_approve_request(contractParams: interfaces_IERC721_approve_request_contractParams(_0: "_0_example", _1: "_1_example", to: "to_example", tokenId: "tokenId_example")) // InterfacesIERC721ApproveRequest | 

// IERC721.approve
IERC721API.interfacesIERC721Approve(networkId: networkId, address: address, interfacesIERC721ApproveRequest: interfacesIERC721ApproveRequest) { (response, error) in
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
 **interfacesIERC721ApproveRequest** | [**InterfacesIERC721ApproveRequest**](InterfacesIERC721ApproveRequest.md) |  | 

### Return type

[**InterfacesIERC721Approve200Response**](InterfacesIERC721Approve200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC721BalanceOf**
```swift
    open class func interfacesIERC721BalanceOf(networkId: String, address: String, interfacesIERC721BalanceOfRequest: InterfacesIERC721BalanceOfRequest, completion: @escaping (_ data: InterfacesIERC721BalanceOf200Response?, _ error: Error?) -> Void)
```

IERC721.balanceOf

Read `balanceOf(owner)` on an instance of `IERC721`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721BalanceOfRequest = interfaces_IERC721_balanceOf_request(contractParams: interfaces_IERC721_balanceOf_request_contractParams(_0: "_0_example", owner: "owner_example")) // InterfacesIERC721BalanceOfRequest | 

// IERC721.balanceOf
IERC721API.interfacesIERC721BalanceOf(networkId: networkId, address: address, interfacesIERC721BalanceOfRequest: interfacesIERC721BalanceOfRequest) { (response, error) in
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
 **interfacesIERC721BalanceOfRequest** | [**InterfacesIERC721BalanceOfRequest**](InterfacesIERC721BalanceOfRequest.md) |  | 

### Return type

[**InterfacesIERC721BalanceOf200Response**](InterfacesIERC721BalanceOf200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC721GetApproved**
```swift
    open class func interfacesIERC721GetApproved(networkId: String, address: String, interfacesIERC721GetApprovedRequest: InterfacesIERC721GetApprovedRequest, completion: @escaping (_ data: InterfacesIERC721GetApproved200Response?, _ error: Error?) -> Void)
```

IERC721.getApproved

Read `getApproved(tokenId)` on an instance of `IERC721`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721GetApprovedRequest = interfaces_IERC721_getApproved_request(contractParams: interfaces_IERC721_getApproved_request_contractParams(_0: "_0_example", tokenId: "tokenId_example")) // InterfacesIERC721GetApprovedRequest | 

// IERC721.getApproved
IERC721API.interfacesIERC721GetApproved(networkId: networkId, address: address, interfacesIERC721GetApprovedRequest: interfacesIERC721GetApprovedRequest) { (response, error) in
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
 **interfacesIERC721GetApprovedRequest** | [**InterfacesIERC721GetApprovedRequest**](InterfacesIERC721GetApprovedRequest.md) |  | 

### Return type

[**InterfacesIERC721GetApproved200Response**](InterfacesIERC721GetApproved200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC721IsApprovedForAll**
```swift
    open class func interfacesIERC721IsApprovedForAll(networkId: String, address: String, interfacesIERC721IsApprovedForAllRequest: InterfacesIERC721IsApprovedForAllRequest, completion: @escaping (_ data: InterfacesIERC721IsApprovedForAll200Response?, _ error: Error?) -> Void)
```

IERC721.isApprovedForAll

Read `isApprovedForAll(owner,operator)` on an instance of `IERC721`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721IsApprovedForAllRequest = interfaces_IERC721_isApprovedForAll_request(contractParams: interfaces_IERC721_isApprovedForAll_request_contractParams(_0: "_0_example", _1: "_1_example", owner: "owner_example", _operator: "_operator_example")) // InterfacesIERC721IsApprovedForAllRequest | 

// IERC721.isApprovedForAll
IERC721API.interfacesIERC721IsApprovedForAll(networkId: networkId, address: address, interfacesIERC721IsApprovedForAllRequest: interfacesIERC721IsApprovedForAllRequest) { (response, error) in
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
 **interfacesIERC721IsApprovedForAllRequest** | [**InterfacesIERC721IsApprovedForAllRequest**](InterfacesIERC721IsApprovedForAllRequest.md) |  | 

### Return type

[**InterfacesIERC721IsApprovedForAll200Response**](InterfacesIERC721IsApprovedForAll200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC721OwnerOf**
```swift
    open class func interfacesIERC721OwnerOf(networkId: String, address: String, interfacesIERC721GetApprovedRequest: InterfacesIERC721GetApprovedRequest, completion: @escaping (_ data: InterfacesIERC721OwnerOf200Response?, _ error: Error?) -> Void)
```

IERC721.ownerOf

Read `ownerOf(tokenId)` on an instance of `IERC721`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721GetApprovedRequest = interfaces_IERC721_getApproved_request(contractParams: interfaces_IERC721_getApproved_request_contractParams(_0: "_0_example", tokenId: "tokenId_example")) // InterfacesIERC721GetApprovedRequest | 

// IERC721.ownerOf
IERC721API.interfacesIERC721OwnerOf(networkId: networkId, address: address, interfacesIERC721GetApprovedRequest: interfacesIERC721GetApprovedRequest) { (response, error) in
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
 **interfacesIERC721GetApprovedRequest** | [**InterfacesIERC721GetApprovedRequest**](InterfacesIERC721GetApprovedRequest.md) |  | 

### Return type

[**InterfacesIERC721OwnerOf200Response**](InterfacesIERC721OwnerOf200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC721SafeTransferFrom**
```swift
    open class func interfacesIERC721SafeTransferFrom(networkId: String, address: String, interfacesIERC721SafeTransferFromRequest: InterfacesIERC721SafeTransferFromRequest, completion: @escaping (_ data: InterfacesIERC721SafeTransferFrom200Response?, _ error: Error?) -> Void)
```

IERC721.safeTransferFrom

Write `safeTransferFrom(from,to,tokenId,data)` on an instance of `IERC721`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721SafeTransferFromRequest = interfaces_IERC721_safeTransferFrom_request(contractParams: interfaces_IERC721_safeTransferFrom_request_contractParams(_0: "_0_example", _1: "_1_example", _2: "_2_example", _3: "_3_example", from: "from_example", to: "to_example", tokenId: "tokenId_example", data: "data_example")) // InterfacesIERC721SafeTransferFromRequest | 

// IERC721.safeTransferFrom
IERC721API.interfacesIERC721SafeTransferFrom(networkId: networkId, address: address, interfacesIERC721SafeTransferFromRequest: interfacesIERC721SafeTransferFromRequest) { (response, error) in
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
 **interfacesIERC721SafeTransferFromRequest** | [**InterfacesIERC721SafeTransferFromRequest**](InterfacesIERC721SafeTransferFromRequest.md) |  | 

### Return type

[**InterfacesIERC721SafeTransferFrom200Response**](InterfacesIERC721SafeTransferFrom200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC721SetApprovalForAll**
```swift
    open class func interfacesIERC721SetApprovalForAll(networkId: String, address: String, interfacesIERC721SetApprovalForAllRequest: InterfacesIERC721SetApprovalForAllRequest, completion: @escaping (_ data: InterfacesIERC721SetApprovalForAll200Response?, _ error: Error?) -> Void)
```

IERC721.setApprovalForAll

Write `setApprovalForAll(operator,_approved)` on an instance of `IERC721`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721SetApprovalForAllRequest = interfaces_IERC721_setApprovalForAll_request(contractParams: interfaces_IERC721_setApprovalForAll_request_contractParams(_0: "_0_example", _1: false, _operator: "_operator_example", approved: false)) // InterfacesIERC721SetApprovalForAllRequest | 

// IERC721.setApprovalForAll
IERC721API.interfacesIERC721SetApprovalForAll(networkId: networkId, address: address, interfacesIERC721SetApprovalForAllRequest: interfacesIERC721SetApprovalForAllRequest) { (response, error) in
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
 **interfacesIERC721SetApprovalForAllRequest** | [**InterfacesIERC721SetApprovalForAllRequest**](InterfacesIERC721SetApprovalForAllRequest.md) |  | 

### Return type

[**InterfacesIERC721SetApprovalForAll200Response**](InterfacesIERC721SetApprovalForAll200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC721SupportsInterface**
```swift
    open class func interfacesIERC721SupportsInterface(networkId: String, address: String, interfacesIERC165SupportsInterfaceRequest: InterfacesIERC165SupportsInterfaceRequest, completion: @escaping (_ data: InterfacesIERC165SupportsInterface200Response?, _ error: Error?) -> Void)
```

IERC721.supportsInterface

Read `supportsInterface(interfaceId)` on an instance of `IERC721`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC165SupportsInterfaceRequest = interfaces_IERC165_supportsInterface_request(contractParams: interfaces_IERC165_supportsInterface_request_contractParams(_0: "_0_example", interfaceId: "interfaceId_example")) // InterfacesIERC165SupportsInterfaceRequest | 

// IERC721.supportsInterface
IERC721API.interfacesIERC721SupportsInterface(networkId: networkId, address: address, interfacesIERC165SupportsInterfaceRequest: interfacesIERC165SupportsInterfaceRequest) { (response, error) in
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

# **interfacesIERC721TransferFrom**
```swift
    open class func interfacesIERC721TransferFrom(networkId: String, address: String, interfacesIERC721TransferFromRequest: InterfacesIERC721TransferFromRequest, completion: @escaping (_ data: InterfacesIERC721TransferFrom200Response?, _ error: Error?) -> Void)
```

IERC721.transferFrom

Write `transferFrom(from,to,tokenId)` on an instance of `IERC721`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721TransferFromRequest = interfaces_IERC721_transferFrom_request(contractParams: interfaces_IERC721_transferFrom_request_contractParams(_0: "_0_example", _1: "_1_example", _2: "_2_example", from: "from_example", to: "to_example", tokenId: "tokenId_example")) // InterfacesIERC721TransferFromRequest | 

// IERC721.transferFrom
IERC721API.interfacesIERC721TransferFrom(networkId: networkId, address: address, interfacesIERC721TransferFromRequest: interfacesIERC721TransferFromRequest) { (response, error) in
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
 **interfacesIERC721TransferFromRequest** | [**InterfacesIERC721TransferFromRequest**](InterfacesIERC721TransferFromRequest.md) |  | 

### Return type

[**InterfacesIERC721TransferFrom200Response**](InterfacesIERC721TransferFrom200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

