# IERC721MintableAPI

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC721MintableMint**](IERC721MintableAPI.md#interfacesierc721mintablemint) | **POST** /{networkId}/interface/IERC721Mintable/write/{address}/mint | IERC721Mintable.mint
[**interfacesIERC721MintableMintBatch**](IERC721MintableAPI.md#interfacesierc721mintablemintbatch) | **POST** /{networkId}/interface/IERC721Mintable/write/{address}/mintBatch | IERC721Mintable.mintBatch
[**interfacesIERC721MintableSafeMint**](IERC721MintableAPI.md#interfacesierc721mintablesafemint) | **POST** /{networkId}/interface/IERC721Mintable/write/{address}/safeMint | IERC721Mintable.safeMint
[**interfacesIERC721MintableSafeMintBatch**](IERC721MintableAPI.md#interfacesierc721mintablesafemintbatch) | **POST** /{networkId}/interface/IERC721Mintable/write/{address}/safeMintBatch | IERC721Mintable.safeMintBatch


# **interfacesIERC721MintableMint**
```swift
    open class func interfacesIERC721MintableMint(networkId: String, address: String, interfacesIERC721ApproveRequest: InterfacesIERC721ApproveRequest, completion: @escaping (_ data: InterfacesIERC721Approve200Response?, _ error: Error?) -> Void)
```

IERC721Mintable.mint

Write `mint(to,tokenId)` on an instance of `IERC721Mintable`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721ApproveRequest = interfaces_IERC721_approve_request(contractParams: interfaces_IERC721_approve_request_contractParams(_0: "_0_example", _1: "_1_example", to: "to_example", tokenId: "tokenId_example")) // InterfacesIERC721ApproveRequest | 

// IERC721Mintable.mint
IERC721MintableAPI.interfacesIERC721MintableMint(networkId: networkId, address: address, interfacesIERC721ApproveRequest: interfacesIERC721ApproveRequest) { (response, error) in
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

# **interfacesIERC721MintableMintBatch**
```swift
    open class func interfacesIERC721MintableMintBatch(networkId: String, address: String, interfacesIERC721MintableMintBatchRequest: InterfacesIERC721MintableMintBatchRequest, completion: @escaping (_ data: InterfacesIERC721MintableMintBatch200Response?, _ error: Error?) -> Void)
```

IERC721Mintable.mintBatch

Write `mintBatch(to,tokenId)` on an instance of `IERC721Mintable`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721MintableMintBatchRequest = interfaces_IERC721Mintable_mintBatch_request(contractParams: interfaces_IERC721Mintable_mintBatch_request_contractParams(_0: ["_0_example"], _1: ["_1_example"], to: ["to_example"], tokenId: ["tokenId_example"])) // InterfacesIERC721MintableMintBatchRequest | 

// IERC721Mintable.mintBatch
IERC721MintableAPI.interfacesIERC721MintableMintBatch(networkId: networkId, address: address, interfacesIERC721MintableMintBatchRequest: interfacesIERC721MintableMintBatchRequest) { (response, error) in
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
 **interfacesIERC721MintableMintBatchRequest** | [**InterfacesIERC721MintableMintBatchRequest**](InterfacesIERC721MintableMintBatchRequest.md) |  | 

### Return type

[**InterfacesIERC721MintableMintBatch200Response**](InterfacesIERC721MintableMintBatch200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC721MintableSafeMint**
```swift
    open class func interfacesIERC721MintableSafeMint(networkId: String, address: String, interfacesIERC721ApproveRequest: InterfacesIERC721ApproveRequest, completion: @escaping (_ data: InterfacesIERC721Approve200Response?, _ error: Error?) -> Void)
```

IERC721Mintable.safeMint

Write `safeMint(to,tokenId)` on an instance of `IERC721Mintable`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721ApproveRequest = interfaces_IERC721_approve_request(contractParams: interfaces_IERC721_approve_request_contractParams(_0: "_0_example", _1: "_1_example", to: "to_example", tokenId: "tokenId_example")) // InterfacesIERC721ApproveRequest | 

// IERC721Mintable.safeMint
IERC721MintableAPI.interfacesIERC721MintableSafeMint(networkId: networkId, address: address, interfacesIERC721ApproveRequest: interfacesIERC721ApproveRequest) { (response, error) in
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

# **interfacesIERC721MintableSafeMintBatch**
```swift
    open class func interfacesIERC721MintableSafeMintBatch(networkId: String, address: String, interfacesIERC721MintableMintBatchRequest: InterfacesIERC721MintableMintBatchRequest, completion: @escaping (_ data: InterfacesIERC721MintableMintBatch200Response?, _ error: Error?) -> Void)
```

IERC721Mintable.safeMintBatch

Write `safeMintBatch(to,tokenId)` on an instance of `IERC721Mintable`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721MintableMintBatchRequest = interfaces_IERC721Mintable_mintBatch_request(contractParams: interfaces_IERC721Mintable_mintBatch_request_contractParams(_0: ["_0_example"], _1: ["_1_example"], to: ["to_example"], tokenId: ["tokenId_example"])) // InterfacesIERC721MintableMintBatchRequest | 

// IERC721Mintable.safeMintBatch
IERC721MintableAPI.interfacesIERC721MintableSafeMintBatch(networkId: networkId, address: address, interfacesIERC721MintableMintBatchRequest: interfacesIERC721MintableMintBatchRequest) { (response, error) in
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
 **interfacesIERC721MintableMintBatchRequest** | [**InterfacesIERC721MintableMintBatchRequest**](InterfacesIERC721MintableMintBatchRequest.md) |  | 

### Return type

[**InterfacesIERC721MintableMintBatch200Response**](InterfacesIERC721MintableMintBatch200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

