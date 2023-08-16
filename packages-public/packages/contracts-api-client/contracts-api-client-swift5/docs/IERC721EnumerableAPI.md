# IERC721EnumerableAPI

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC721EnumerableApprove**](IERC721EnumerableAPI.md#interfacesierc721enumerableapprove) | **POST** /{networkId}/interface/IERC721Enumerable/write/{address}/approve | IERC721Enumerable.approve
[**interfacesIERC721EnumerableBalanceOf**](IERC721EnumerableAPI.md#interfacesierc721enumerablebalanceof) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/balanceOf | IERC721Enumerable.balanceOf
[**interfacesIERC721EnumerableGetApproved**](IERC721EnumerableAPI.md#interfacesierc721enumerablegetapproved) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/getApproved | IERC721Enumerable.getApproved
[**interfacesIERC721EnumerableIsApprovedForAll**](IERC721EnumerableAPI.md#interfacesierc721enumerableisapprovedforall) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/isApprovedForAll | IERC721Enumerable.isApprovedForAll
[**interfacesIERC721EnumerableOwnerOf**](IERC721EnumerableAPI.md#interfacesierc721enumerableownerof) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/ownerOf | IERC721Enumerable.ownerOf
[**interfacesIERC721EnumerableSafeTransferFrom**](IERC721EnumerableAPI.md#interfacesierc721enumerablesafetransferfrom) | **POST** /{networkId}/interface/IERC721Enumerable/write/{address}/safeTransferFrom | IERC721Enumerable.safeTransferFrom
[**interfacesIERC721EnumerableSetApprovalForAll**](IERC721EnumerableAPI.md#interfacesierc721enumerablesetapprovalforall) | **POST** /{networkId}/interface/IERC721Enumerable/write/{address}/setApprovalForAll | IERC721Enumerable.setApprovalForAll
[**interfacesIERC721EnumerableSupportsInterface**](IERC721EnumerableAPI.md#interfacesierc721enumerablesupportsinterface) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/supportsInterface | IERC721Enumerable.supportsInterface
[**interfacesIERC721EnumerableTokenByIndex**](IERC721EnumerableAPI.md#interfacesierc721enumerabletokenbyindex) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/tokenByIndex | IERC721Enumerable.tokenByIndex
[**interfacesIERC721EnumerableTokenOfOwnerByIndex**](IERC721EnumerableAPI.md#interfacesierc721enumerabletokenofownerbyindex) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/tokenOfOwnerByIndex | IERC721Enumerable.tokenOfOwnerByIndex
[**interfacesIERC721EnumerableTotalSupply**](IERC721EnumerableAPI.md#interfacesierc721enumerabletotalsupply) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/totalSupply | IERC721Enumerable.totalSupply
[**interfacesIERC721EnumerableTransferFrom**](IERC721EnumerableAPI.md#interfacesierc721enumerabletransferfrom) | **POST** /{networkId}/interface/IERC721Enumerable/write/{address}/transferFrom | IERC721Enumerable.transferFrom


# **interfacesIERC721EnumerableApprove**
```swift
    open class func interfacesIERC721EnumerableApprove(networkId: String, address: String, interfacesIERC721ApproveRequest: InterfacesIERC721ApproveRequest, completion: @escaping (_ data: InterfacesIERC721Approve200Response?, _ error: Error?) -> Void)
```

IERC721Enumerable.approve

Write `approve(to,tokenId)` on an instance of `IERC721Enumerable`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721ApproveRequest = interfaces_IERC721_approve_request(contractParams: interfaces_IERC721_approve_request_contractParams(_0: "_0_example", _1: "_1_example", to: "to_example", tokenId: "tokenId_example")) // InterfacesIERC721ApproveRequest | 

// IERC721Enumerable.approve
IERC721EnumerableAPI.interfacesIERC721EnumerableApprove(networkId: networkId, address: address, interfacesIERC721ApproveRequest: interfacesIERC721ApproveRequest) { (response, error) in
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

# **interfacesIERC721EnumerableBalanceOf**
```swift
    open class func interfacesIERC721EnumerableBalanceOf(networkId: String, address: String, interfacesIERC721BalanceOfRequest: InterfacesIERC721BalanceOfRequest, completion: @escaping (_ data: InterfacesIERC721BalanceOf200Response?, _ error: Error?) -> Void)
```

IERC721Enumerable.balanceOf

Read `balanceOf(owner)` on an instance of `IERC721Enumerable`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721BalanceOfRequest = interfaces_IERC721_balanceOf_request(contractParams: interfaces_IERC721_balanceOf_request_contractParams(_0: "_0_example", owner: "owner_example")) // InterfacesIERC721BalanceOfRequest | 

// IERC721Enumerable.balanceOf
IERC721EnumerableAPI.interfacesIERC721EnumerableBalanceOf(networkId: networkId, address: address, interfacesIERC721BalanceOfRequest: interfacesIERC721BalanceOfRequest) { (response, error) in
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

# **interfacesIERC721EnumerableGetApproved**
```swift
    open class func interfacesIERC721EnumerableGetApproved(networkId: String, address: String, interfacesIERC721GetApprovedRequest: InterfacesIERC721GetApprovedRequest, completion: @escaping (_ data: InterfacesIERC721GetApproved200Response?, _ error: Error?) -> Void)
```

IERC721Enumerable.getApproved

Read `getApproved(tokenId)` on an instance of `IERC721Enumerable`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721GetApprovedRequest = interfaces_IERC721_getApproved_request(contractParams: interfaces_IERC721_getApproved_request_contractParams(_0: "_0_example", tokenId: "tokenId_example")) // InterfacesIERC721GetApprovedRequest | 

// IERC721Enumerable.getApproved
IERC721EnumerableAPI.interfacesIERC721EnumerableGetApproved(networkId: networkId, address: address, interfacesIERC721GetApprovedRequest: interfacesIERC721GetApprovedRequest) { (response, error) in
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

# **interfacesIERC721EnumerableIsApprovedForAll**
```swift
    open class func interfacesIERC721EnumerableIsApprovedForAll(networkId: String, address: String, interfacesIERC721IsApprovedForAllRequest: InterfacesIERC721IsApprovedForAllRequest, completion: @escaping (_ data: InterfacesIERC721IsApprovedForAll200Response?, _ error: Error?) -> Void)
```

IERC721Enumerable.isApprovedForAll

Read `isApprovedForAll(owner,operator)` on an instance of `IERC721Enumerable`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721IsApprovedForAllRequest = interfaces_IERC721_isApprovedForAll_request(contractParams: interfaces_IERC721_isApprovedForAll_request_contractParams(_0: "_0_example", _1: "_1_example", owner: "owner_example", _operator: "_operator_example")) // InterfacesIERC721IsApprovedForAllRequest | 

// IERC721Enumerable.isApprovedForAll
IERC721EnumerableAPI.interfacesIERC721EnumerableIsApprovedForAll(networkId: networkId, address: address, interfacesIERC721IsApprovedForAllRequest: interfacesIERC721IsApprovedForAllRequest) { (response, error) in
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

# **interfacesIERC721EnumerableOwnerOf**
```swift
    open class func interfacesIERC721EnumerableOwnerOf(networkId: String, address: String, interfacesIERC721GetApprovedRequest: InterfacesIERC721GetApprovedRequest, completion: @escaping (_ data: InterfacesIERC721OwnerOf200Response?, _ error: Error?) -> Void)
```

IERC721Enumerable.ownerOf

Read `ownerOf(tokenId)` on an instance of `IERC721Enumerable`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721GetApprovedRequest = interfaces_IERC721_getApproved_request(contractParams: interfaces_IERC721_getApproved_request_contractParams(_0: "_0_example", tokenId: "tokenId_example")) // InterfacesIERC721GetApprovedRequest | 

// IERC721Enumerable.ownerOf
IERC721EnumerableAPI.interfacesIERC721EnumerableOwnerOf(networkId: networkId, address: address, interfacesIERC721GetApprovedRequest: interfacesIERC721GetApprovedRequest) { (response, error) in
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

# **interfacesIERC721EnumerableSafeTransferFrom**
```swift
    open class func interfacesIERC721EnumerableSafeTransferFrom(networkId: String, address: String, interfacesIERC721SafeTransferFromRequest: InterfacesIERC721SafeTransferFromRequest, completion: @escaping (_ data: InterfacesIERC721SafeTransferFrom200Response?, _ error: Error?) -> Void)
```

IERC721Enumerable.safeTransferFrom

Write `safeTransferFrom(from,to,tokenId,data)` on an instance of `IERC721Enumerable`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721SafeTransferFromRequest = interfaces_IERC721_safeTransferFrom_request(contractParams: interfaces_IERC721_safeTransferFrom_request_contractParams(_0: "_0_example", _1: "_1_example", _2: "_2_example", _3: "_3_example", from: "from_example", to: "to_example", tokenId: "tokenId_example", data: "data_example")) // InterfacesIERC721SafeTransferFromRequest | 

// IERC721Enumerable.safeTransferFrom
IERC721EnumerableAPI.interfacesIERC721EnumerableSafeTransferFrom(networkId: networkId, address: address, interfacesIERC721SafeTransferFromRequest: interfacesIERC721SafeTransferFromRequest) { (response, error) in
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

# **interfacesIERC721EnumerableSetApprovalForAll**
```swift
    open class func interfacesIERC721EnumerableSetApprovalForAll(networkId: String, address: String, interfacesIERC721SetApprovalForAllRequest: InterfacesIERC721SetApprovalForAllRequest, completion: @escaping (_ data: InterfacesIERC721SetApprovalForAll200Response?, _ error: Error?) -> Void)
```

IERC721Enumerable.setApprovalForAll

Write `setApprovalForAll(operator,_approved)` on an instance of `IERC721Enumerable`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721SetApprovalForAllRequest = interfaces_IERC721_setApprovalForAll_request(contractParams: interfaces_IERC721_setApprovalForAll_request_contractParams(_0: "_0_example", _1: false, _operator: "_operator_example", approved: false)) // InterfacesIERC721SetApprovalForAllRequest | 

// IERC721Enumerable.setApprovalForAll
IERC721EnumerableAPI.interfacesIERC721EnumerableSetApprovalForAll(networkId: networkId, address: address, interfacesIERC721SetApprovalForAllRequest: interfacesIERC721SetApprovalForAllRequest) { (response, error) in
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

# **interfacesIERC721EnumerableSupportsInterface**
```swift
    open class func interfacesIERC721EnumerableSupportsInterface(networkId: String, address: String, interfacesIERC165SupportsInterfaceRequest: InterfacesIERC165SupportsInterfaceRequest, completion: @escaping (_ data: InterfacesIERC165SupportsInterface200Response?, _ error: Error?) -> Void)
```

IERC721Enumerable.supportsInterface

Read `supportsInterface(interfaceId)` on an instance of `IERC721Enumerable`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC165SupportsInterfaceRequest = interfaces_IERC165_supportsInterface_request(contractParams: interfaces_IERC165_supportsInterface_request_contractParams(_0: "_0_example", interfaceId: "interfaceId_example")) // InterfacesIERC165SupportsInterfaceRequest | 

// IERC721Enumerable.supportsInterface
IERC721EnumerableAPI.interfacesIERC721EnumerableSupportsInterface(networkId: networkId, address: address, interfacesIERC165SupportsInterfaceRequest: interfacesIERC165SupportsInterfaceRequest) { (response, error) in
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

# **interfacesIERC721EnumerableTokenByIndex**
```swift
    open class func interfacesIERC721EnumerableTokenByIndex(networkId: String, address: String, interfacesIERC721EnumerableTokenByIndexRequest: InterfacesIERC721EnumerableTokenByIndexRequest, completion: @escaping (_ data: InterfacesIERC721EnumerableTokenByIndex200Response?, _ error: Error?) -> Void)
```

IERC721Enumerable.tokenByIndex

Read `tokenByIndex(index)` on an instance of `IERC721Enumerable`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721EnumerableTokenByIndexRequest = interfaces_IERC721Enumerable_tokenByIndex_request(contractParams: interfaces_IERC721Enumerable_tokenByIndex_request_contractParams(_0: "_0_example", index: "index_example")) // InterfacesIERC721EnumerableTokenByIndexRequest | 

// IERC721Enumerable.tokenByIndex
IERC721EnumerableAPI.interfacesIERC721EnumerableTokenByIndex(networkId: networkId, address: address, interfacesIERC721EnumerableTokenByIndexRequest: interfacesIERC721EnumerableTokenByIndexRequest) { (response, error) in
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
 **interfacesIERC721EnumerableTokenByIndexRequest** | [**InterfacesIERC721EnumerableTokenByIndexRequest**](InterfacesIERC721EnumerableTokenByIndexRequest.md) |  | 

### Return type

[**InterfacesIERC721EnumerableTokenByIndex200Response**](InterfacesIERC721EnumerableTokenByIndex200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC721EnumerableTokenOfOwnerByIndex**
```swift
    open class func interfacesIERC721EnumerableTokenOfOwnerByIndex(networkId: String, address: String, interfacesIERC721EnumerableTokenOfOwnerByIndexRequest: InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest, completion: @escaping (_ data: InterfacesIERC721EnumerableTokenOfOwnerByIndex200Response?, _ error: Error?) -> Void)
```

IERC721Enumerable.tokenOfOwnerByIndex

Read `tokenOfOwnerByIndex(owner,index)` on an instance of `IERC721Enumerable`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721EnumerableTokenOfOwnerByIndexRequest = interfaces_IERC721Enumerable_tokenOfOwnerByIndex_request(contractParams: interfaces_IERC721Enumerable_tokenOfOwnerByIndex_request_contractParams(_0: "_0_example", _1: "_1_example", owner: "owner_example", index: "index_example")) // InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest | 

// IERC721Enumerable.tokenOfOwnerByIndex
IERC721EnumerableAPI.interfacesIERC721EnumerableTokenOfOwnerByIndex(networkId: networkId, address: address, interfacesIERC721EnumerableTokenOfOwnerByIndexRequest: interfacesIERC721EnumerableTokenOfOwnerByIndexRequest) { (response, error) in
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
 **interfacesIERC721EnumerableTokenOfOwnerByIndexRequest** | [**InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest**](InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest.md) |  | 

### Return type

[**InterfacesIERC721EnumerableTokenOfOwnerByIndex200Response**](InterfacesIERC721EnumerableTokenOfOwnerByIndex200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC721EnumerableTotalSupply**
```swift
    open class func interfacesIERC721EnumerableTotalSupply(networkId: String, address: String, interfacesIBeaconImplementationRequest: InterfacesIBeaconImplementationRequest, completion: @escaping (_ data: InterfacesIERC20TotalSupply200Response?, _ error: Error?) -> Void)
```

IERC721Enumerable.totalSupply

Read `totalSupply()` on an instance of `IERC721Enumerable`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIBeaconImplementationRequest = interfaces_IBeacon_implementation_request(contractParams: 123) // InterfacesIBeaconImplementationRequest | 

// IERC721Enumerable.totalSupply
IERC721EnumerableAPI.interfacesIERC721EnumerableTotalSupply(networkId: networkId, address: address, interfacesIBeaconImplementationRequest: interfacesIBeaconImplementationRequest) { (response, error) in
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

# **interfacesIERC721EnumerableTransferFrom**
```swift
    open class func interfacesIERC721EnumerableTransferFrom(networkId: String, address: String, interfacesIERC721TransferFromRequest: InterfacesIERC721TransferFromRequest, completion: @escaping (_ data: InterfacesIERC721TransferFrom200Response?, _ error: Error?) -> Void)
```

IERC721Enumerable.transferFrom

Write `transferFrom(from,to,tokenId)` on an instance of `IERC721Enumerable`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721TransferFromRequest = interfaces_IERC721_transferFrom_request(contractParams: interfaces_IERC721_transferFrom_request_contractParams(_0: "_0_example", _1: "_1_example", _2: "_2_example", from: "from_example", to: "to_example", tokenId: "tokenId_example")) // InterfacesIERC721TransferFromRequest | 

// IERC721Enumerable.transferFrom
IERC721EnumerableAPI.interfacesIERC721EnumerableTransferFrom(networkId: networkId, address: address, interfacesIERC721TransferFromRequest: interfacesIERC721TransferFromRequest) { (response, error) in
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

