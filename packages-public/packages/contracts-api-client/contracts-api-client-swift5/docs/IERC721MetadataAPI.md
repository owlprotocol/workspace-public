# IERC721MetadataAPI

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC721MetadataApprove**](IERC721MetadataAPI.md#interfacesierc721metadataapprove) | **POST** /{networkId}/interface/IERC721Metadata/write/{address}/approve | IERC721Metadata.approve
[**interfacesIERC721MetadataBalanceOf**](IERC721MetadataAPI.md#interfacesierc721metadatabalanceof) | **POST** /{networkId}/interface/IERC721Metadata/read/{address}/balanceOf | IERC721Metadata.balanceOf
[**interfacesIERC721MetadataGetApproved**](IERC721MetadataAPI.md#interfacesierc721metadatagetapproved) | **POST** /{networkId}/interface/IERC721Metadata/read/{address}/getApproved | IERC721Metadata.getApproved
[**interfacesIERC721MetadataIsApprovedForAll**](IERC721MetadataAPI.md#interfacesierc721metadataisapprovedforall) | **POST** /{networkId}/interface/IERC721Metadata/read/{address}/isApprovedForAll | IERC721Metadata.isApprovedForAll
[**interfacesIERC721MetadataName**](IERC721MetadataAPI.md#interfacesierc721metadataname) | **POST** /{networkId}/interface/IERC721Metadata/read/{address}/name | IERC721Metadata.name
[**interfacesIERC721MetadataOwnerOf**](IERC721MetadataAPI.md#interfacesierc721metadataownerof) | **POST** /{networkId}/interface/IERC721Metadata/read/{address}/ownerOf | IERC721Metadata.ownerOf
[**interfacesIERC721MetadataSafeTransferFrom**](IERC721MetadataAPI.md#interfacesierc721metadatasafetransferfrom) | **POST** /{networkId}/interface/IERC721Metadata/write/{address}/safeTransferFrom | IERC721Metadata.safeTransferFrom
[**interfacesIERC721MetadataSetApprovalForAll**](IERC721MetadataAPI.md#interfacesierc721metadatasetapprovalforall) | **POST** /{networkId}/interface/IERC721Metadata/write/{address}/setApprovalForAll | IERC721Metadata.setApprovalForAll
[**interfacesIERC721MetadataSupportsInterface**](IERC721MetadataAPI.md#interfacesierc721metadatasupportsinterface) | **POST** /{networkId}/interface/IERC721Metadata/read/{address}/supportsInterface | IERC721Metadata.supportsInterface
[**interfacesIERC721MetadataSymbol**](IERC721MetadataAPI.md#interfacesierc721metadatasymbol) | **POST** /{networkId}/interface/IERC721Metadata/read/{address}/symbol | IERC721Metadata.symbol
[**interfacesIERC721MetadataTokenURI**](IERC721MetadataAPI.md#interfacesierc721metadatatokenuri) | **POST** /{networkId}/interface/IERC721Metadata/read/{address}/tokenURI | IERC721Metadata.tokenURI
[**interfacesIERC721MetadataTransferFrom**](IERC721MetadataAPI.md#interfacesierc721metadatatransferfrom) | **POST** /{networkId}/interface/IERC721Metadata/write/{address}/transferFrom | IERC721Metadata.transferFrom


# **interfacesIERC721MetadataApprove**
```swift
    open class func interfacesIERC721MetadataApprove(networkId: String, address: String, interfacesIERC721ApproveRequest: InterfacesIERC721ApproveRequest, completion: @escaping (_ data: InterfacesIERC721Approve200Response?, _ error: Error?) -> Void)
```

IERC721Metadata.approve

Write `approve(to,tokenId)` on an instance of `IERC721Metadata`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721ApproveRequest = interfaces_IERC721_approve_request(contractParams: interfaces_IERC721_approve_request_contractParams(_0: "_0_example", _1: "_1_example", to: "to_example", tokenId: "tokenId_example")) // InterfacesIERC721ApproveRequest | 

// IERC721Metadata.approve
IERC721MetadataAPI.interfacesIERC721MetadataApprove(networkId: networkId, address: address, interfacesIERC721ApproveRequest: interfacesIERC721ApproveRequest) { (response, error) in
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

# **interfacesIERC721MetadataBalanceOf**
```swift
    open class func interfacesIERC721MetadataBalanceOf(networkId: String, address: String, interfacesIERC721BalanceOfRequest: InterfacesIERC721BalanceOfRequest, completion: @escaping (_ data: InterfacesIERC721BalanceOf200Response?, _ error: Error?) -> Void)
```

IERC721Metadata.balanceOf

Read `balanceOf(owner)` on an instance of `IERC721Metadata`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721BalanceOfRequest = interfaces_IERC721_balanceOf_request(contractParams: interfaces_IERC721_balanceOf_request_contractParams(_0: "_0_example", owner: "owner_example")) // InterfacesIERC721BalanceOfRequest | 

// IERC721Metadata.balanceOf
IERC721MetadataAPI.interfacesIERC721MetadataBalanceOf(networkId: networkId, address: address, interfacesIERC721BalanceOfRequest: interfacesIERC721BalanceOfRequest) { (response, error) in
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

# **interfacesIERC721MetadataGetApproved**
```swift
    open class func interfacesIERC721MetadataGetApproved(networkId: String, address: String, interfacesIERC721GetApprovedRequest: InterfacesIERC721GetApprovedRequest, completion: @escaping (_ data: InterfacesIERC721GetApproved200Response?, _ error: Error?) -> Void)
```

IERC721Metadata.getApproved

Read `getApproved(tokenId)` on an instance of `IERC721Metadata`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721GetApprovedRequest = interfaces_IERC721_getApproved_request(contractParams: interfaces_IERC721_getApproved_request_contractParams(_0: "_0_example", tokenId: "tokenId_example")) // InterfacesIERC721GetApprovedRequest | 

// IERC721Metadata.getApproved
IERC721MetadataAPI.interfacesIERC721MetadataGetApproved(networkId: networkId, address: address, interfacesIERC721GetApprovedRequest: interfacesIERC721GetApprovedRequest) { (response, error) in
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

# **interfacesIERC721MetadataIsApprovedForAll**
```swift
    open class func interfacesIERC721MetadataIsApprovedForAll(networkId: String, address: String, interfacesIERC721IsApprovedForAllRequest: InterfacesIERC721IsApprovedForAllRequest, completion: @escaping (_ data: InterfacesIERC721IsApprovedForAll200Response?, _ error: Error?) -> Void)
```

IERC721Metadata.isApprovedForAll

Read `isApprovedForAll(owner,operator)` on an instance of `IERC721Metadata`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721IsApprovedForAllRequest = interfaces_IERC721_isApprovedForAll_request(contractParams: interfaces_IERC721_isApprovedForAll_request_contractParams(_0: "_0_example", _1: "_1_example", owner: "owner_example", _operator: "_operator_example")) // InterfacesIERC721IsApprovedForAllRequest | 

// IERC721Metadata.isApprovedForAll
IERC721MetadataAPI.interfacesIERC721MetadataIsApprovedForAll(networkId: networkId, address: address, interfacesIERC721IsApprovedForAllRequest: interfacesIERC721IsApprovedForAllRequest) { (response, error) in
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

# **interfacesIERC721MetadataName**
```swift
    open class func interfacesIERC721MetadataName(networkId: String, address: String, interfacesIBeaconImplementationRequest: InterfacesIBeaconImplementationRequest, completion: @escaping (_ data: InterfacesIContractURIContractURI200Response?, _ error: Error?) -> Void)
```

IERC721Metadata.name

Read `name()` on an instance of `IERC721Metadata`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIBeaconImplementationRequest = interfaces_IBeacon_implementation_request(contractParams: 123) // InterfacesIBeaconImplementationRequest | 

// IERC721Metadata.name
IERC721MetadataAPI.interfacesIERC721MetadataName(networkId: networkId, address: address, interfacesIBeaconImplementationRequest: interfacesIBeaconImplementationRequest) { (response, error) in
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

# **interfacesIERC721MetadataOwnerOf**
```swift
    open class func interfacesIERC721MetadataOwnerOf(networkId: String, address: String, interfacesIERC721GetApprovedRequest: InterfacesIERC721GetApprovedRequest, completion: @escaping (_ data: InterfacesIERC721OwnerOf200Response?, _ error: Error?) -> Void)
```

IERC721Metadata.ownerOf

Read `ownerOf(tokenId)` on an instance of `IERC721Metadata`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721GetApprovedRequest = interfaces_IERC721_getApproved_request(contractParams: interfaces_IERC721_getApproved_request_contractParams(_0: "_0_example", tokenId: "tokenId_example")) // InterfacesIERC721GetApprovedRequest | 

// IERC721Metadata.ownerOf
IERC721MetadataAPI.interfacesIERC721MetadataOwnerOf(networkId: networkId, address: address, interfacesIERC721GetApprovedRequest: interfacesIERC721GetApprovedRequest) { (response, error) in
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

# **interfacesIERC721MetadataSafeTransferFrom**
```swift
    open class func interfacesIERC721MetadataSafeTransferFrom(networkId: String, address: String, interfacesIERC721SafeTransferFromRequest: InterfacesIERC721SafeTransferFromRequest, completion: @escaping (_ data: InterfacesIERC721SafeTransferFrom200Response?, _ error: Error?) -> Void)
```

IERC721Metadata.safeTransferFrom

Write `safeTransferFrom(from,to,tokenId,data)` on an instance of `IERC721Metadata`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721SafeTransferFromRequest = interfaces_IERC721_safeTransferFrom_request(contractParams: interfaces_IERC721_safeTransferFrom_request_contractParams(_0: "_0_example", _1: "_1_example", _2: "_2_example", _3: "_3_example", from: "from_example", to: "to_example", tokenId: "tokenId_example", data: "data_example")) // InterfacesIERC721SafeTransferFromRequest | 

// IERC721Metadata.safeTransferFrom
IERC721MetadataAPI.interfacesIERC721MetadataSafeTransferFrom(networkId: networkId, address: address, interfacesIERC721SafeTransferFromRequest: interfacesIERC721SafeTransferFromRequest) { (response, error) in
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

# **interfacesIERC721MetadataSetApprovalForAll**
```swift
    open class func interfacesIERC721MetadataSetApprovalForAll(networkId: String, address: String, interfacesIERC721SetApprovalForAllRequest: InterfacesIERC721SetApprovalForAllRequest, completion: @escaping (_ data: InterfacesIERC721SetApprovalForAll200Response?, _ error: Error?) -> Void)
```

IERC721Metadata.setApprovalForAll

Write `setApprovalForAll(operator,_approved)` on an instance of `IERC721Metadata`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721SetApprovalForAllRequest = interfaces_IERC721_setApprovalForAll_request(contractParams: interfaces_IERC721_setApprovalForAll_request_contractParams(_0: "_0_example", _1: false, _operator: "_operator_example", approved: false)) // InterfacesIERC721SetApprovalForAllRequest | 

// IERC721Metadata.setApprovalForAll
IERC721MetadataAPI.interfacesIERC721MetadataSetApprovalForAll(networkId: networkId, address: address, interfacesIERC721SetApprovalForAllRequest: interfacesIERC721SetApprovalForAllRequest) { (response, error) in
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

# **interfacesIERC721MetadataSupportsInterface**
```swift
    open class func interfacesIERC721MetadataSupportsInterface(networkId: String, address: String, interfacesIERC165SupportsInterfaceRequest: InterfacesIERC165SupportsInterfaceRequest, completion: @escaping (_ data: InterfacesIERC165SupportsInterface200Response?, _ error: Error?) -> Void)
```

IERC721Metadata.supportsInterface

Read `supportsInterface(interfaceId)` on an instance of `IERC721Metadata`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC165SupportsInterfaceRequest = interfaces_IERC165_supportsInterface_request(contractParams: interfaces_IERC165_supportsInterface_request_contractParams(_0: "_0_example", interfaceId: "interfaceId_example")) // InterfacesIERC165SupportsInterfaceRequest | 

// IERC721Metadata.supportsInterface
IERC721MetadataAPI.interfacesIERC721MetadataSupportsInterface(networkId: networkId, address: address, interfacesIERC165SupportsInterfaceRequest: interfacesIERC165SupportsInterfaceRequest) { (response, error) in
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

# **interfacesIERC721MetadataSymbol**
```swift
    open class func interfacesIERC721MetadataSymbol(networkId: String, address: String, interfacesIBeaconImplementationRequest: InterfacesIBeaconImplementationRequest, completion: @escaping (_ data: InterfacesIContractURIContractURI200Response?, _ error: Error?) -> Void)
```

IERC721Metadata.symbol

Read `symbol()` on an instance of `IERC721Metadata`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIBeaconImplementationRequest = interfaces_IBeacon_implementation_request(contractParams: 123) // InterfacesIBeaconImplementationRequest | 

// IERC721Metadata.symbol
IERC721MetadataAPI.interfacesIERC721MetadataSymbol(networkId: networkId, address: address, interfacesIBeaconImplementationRequest: interfacesIBeaconImplementationRequest) { (response, error) in
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

# **interfacesIERC721MetadataTokenURI**
```swift
    open class func interfacesIERC721MetadataTokenURI(networkId: String, address: String, interfacesIERC721GetApprovedRequest: InterfacesIERC721GetApprovedRequest, completion: @escaping (_ data: InterfacesIERC721MetadataTokenURI200Response?, _ error: Error?) -> Void)
```

IERC721Metadata.tokenURI

Read `tokenURI(tokenId)` on an instance of `IERC721Metadata`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721GetApprovedRequest = interfaces_IERC721_getApproved_request(contractParams: interfaces_IERC721_getApproved_request_contractParams(_0: "_0_example", tokenId: "tokenId_example")) // InterfacesIERC721GetApprovedRequest | 

// IERC721Metadata.tokenURI
IERC721MetadataAPI.interfacesIERC721MetadataTokenURI(networkId: networkId, address: address, interfacesIERC721GetApprovedRequest: interfacesIERC721GetApprovedRequest) { (response, error) in
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

[**InterfacesIERC721MetadataTokenURI200Response**](InterfacesIERC721MetadataTokenURI200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC721MetadataTransferFrom**
```swift
    open class func interfacesIERC721MetadataTransferFrom(networkId: String, address: String, interfacesIERC721TransferFromRequest: InterfacesIERC721TransferFromRequest, completion: @escaping (_ data: InterfacesIERC721TransferFrom200Response?, _ error: Error?) -> Void)
```

IERC721Metadata.transferFrom

Write `transferFrom(from,to,tokenId)` on an instance of `IERC721Metadata`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721TransferFromRequest = interfaces_IERC721_transferFrom_request(contractParams: interfaces_IERC721_transferFrom_request_contractParams(_0: "_0_example", _1: "_1_example", _2: "_2_example", from: "from_example", to: "to_example", tokenId: "tokenId_example")) // InterfacesIERC721TransferFromRequest | 

// IERC721Metadata.transferFrom
IERC721MetadataAPI.interfacesIERC721MetadataTransferFrom(networkId: networkId, address: address, interfacesIERC721TransferFromRequest: interfacesIERC721TransferFromRequest) { (response, error) in
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

