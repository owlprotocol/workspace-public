# IERC721MintableAutoIdAPI

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC721MintableAutoIdMint**](IERC721MintableAutoIdAPI.md#interfacesierc721mintableautoidmint) | **POST** /{networkId}/interface/IERC721MintableAutoId/write/{address}/mint | IERC721MintableAutoId.mint
[**interfacesIERC721MintableAutoIdMintBatch**](IERC721MintableAutoIdAPI.md#interfacesierc721mintableautoidmintbatch) | **POST** /{networkId}/interface/IERC721MintableAutoId/write/{address}/mintBatch | IERC721MintableAutoId.mintBatch
[**interfacesIERC721MintableAutoIdSafeMint**](IERC721MintableAutoIdAPI.md#interfacesierc721mintableautoidsafemint) | **POST** /{networkId}/interface/IERC721MintableAutoId/write/{address}/safeMint | IERC721MintableAutoId.safeMint
[**interfacesIERC721MintableAutoIdSafeMintBatch**](IERC721MintableAutoIdAPI.md#interfacesierc721mintableautoidsafemintbatch) | **POST** /{networkId}/interface/IERC721MintableAutoId/write/{address}/safeMintBatch | IERC721MintableAutoId.safeMintBatch


# **interfacesIERC721MintableAutoIdMint**
```swift
    open class func interfacesIERC721MintableAutoIdMint(networkId: String, address: String, interfacesIERC721MintableAutoIdMintRequest: InterfacesIERC721MintableAutoIdMintRequest, completion: @escaping (_ data: InterfacesIERC721MintableAutoIdMint200Response?, _ error: Error?) -> Void)
```

IERC721MintableAutoId.mint

Write `mint(to)` on an instance of `IERC721MintableAutoId`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721MintableAutoIdMintRequest = interfaces_IERC721MintableAutoId_mint_request(contractParams: interfaces_IERC721MintableAutoId_mint_request_contractParams(_0: "_0_example", to: "to_example")) // InterfacesIERC721MintableAutoIdMintRequest | 

// IERC721MintableAutoId.mint
IERC721MintableAutoIdAPI.interfacesIERC721MintableAutoIdMint(networkId: networkId, address: address, interfacesIERC721MintableAutoIdMintRequest: interfacesIERC721MintableAutoIdMintRequest) { (response, error) in
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
 **interfacesIERC721MintableAutoIdMintRequest** | [**InterfacesIERC721MintableAutoIdMintRequest**](InterfacesIERC721MintableAutoIdMintRequest.md) |  | 

### Return type

[**InterfacesIERC721MintableAutoIdMint200Response**](InterfacesIERC721MintableAutoIdMint200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC721MintableAutoIdMintBatch**
```swift
    open class func interfacesIERC721MintableAutoIdMintBatch(networkId: String, address: String, interfacesIERC721MintableAutoIdMintBatchRequest: InterfacesIERC721MintableAutoIdMintBatchRequest, completion: @escaping (_ data: InterfacesIERC721MintableAutoIdMintBatch200Response?, _ error: Error?) -> Void)
```

IERC721MintableAutoId.mintBatch

Write `mintBatch(to)` on an instance of `IERC721MintableAutoId`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721MintableAutoIdMintBatchRequest = interfaces_IERC721MintableAutoId_mintBatch_request(contractParams: interfaces_IERC721MintableAutoId_mintBatch_request_contractParams(_0: ["_0_example"], to: ["to_example"])) // InterfacesIERC721MintableAutoIdMintBatchRequest | 

// IERC721MintableAutoId.mintBatch
IERC721MintableAutoIdAPI.interfacesIERC721MintableAutoIdMintBatch(networkId: networkId, address: address, interfacesIERC721MintableAutoIdMintBatchRequest: interfacesIERC721MintableAutoIdMintBatchRequest) { (response, error) in
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
 **interfacesIERC721MintableAutoIdMintBatchRequest** | [**InterfacesIERC721MintableAutoIdMintBatchRequest**](InterfacesIERC721MintableAutoIdMintBatchRequest.md) |  | 

### Return type

[**InterfacesIERC721MintableAutoIdMintBatch200Response**](InterfacesIERC721MintableAutoIdMintBatch200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC721MintableAutoIdSafeMint**
```swift
    open class func interfacesIERC721MintableAutoIdSafeMint(networkId: String, address: String, interfacesIERC721MintableAutoIdMintRequest: InterfacesIERC721MintableAutoIdMintRequest, completion: @escaping (_ data: InterfacesIERC721MintableAutoIdMint200Response?, _ error: Error?) -> Void)
```

IERC721MintableAutoId.safeMint

Write `safeMint(to)` on an instance of `IERC721MintableAutoId`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721MintableAutoIdMintRequest = interfaces_IERC721MintableAutoId_mint_request(contractParams: interfaces_IERC721MintableAutoId_mint_request_contractParams(_0: "_0_example", to: "to_example")) // InterfacesIERC721MintableAutoIdMintRequest | 

// IERC721MintableAutoId.safeMint
IERC721MintableAutoIdAPI.interfacesIERC721MintableAutoIdSafeMint(networkId: networkId, address: address, interfacesIERC721MintableAutoIdMintRequest: interfacesIERC721MintableAutoIdMintRequest) { (response, error) in
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
 **interfacesIERC721MintableAutoIdMintRequest** | [**InterfacesIERC721MintableAutoIdMintRequest**](InterfacesIERC721MintableAutoIdMintRequest.md) |  | 

### Return type

[**InterfacesIERC721MintableAutoIdMint200Response**](InterfacesIERC721MintableAutoIdMint200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC721MintableAutoIdSafeMintBatch**
```swift
    open class func interfacesIERC721MintableAutoIdSafeMintBatch(networkId: String, address: String, interfacesIERC721MintableAutoIdMintBatchRequest: InterfacesIERC721MintableAutoIdMintBatchRequest, completion: @escaping (_ data: InterfacesIERC721MintableAutoIdMintBatch200Response?, _ error: Error?) -> Void)
```

IERC721MintableAutoId.safeMintBatch

Write `safeMintBatch(to)` on an instance of `IERC721MintableAutoId`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721MintableAutoIdMintBatchRequest = interfaces_IERC721MintableAutoId_mintBatch_request(contractParams: interfaces_IERC721MintableAutoId_mintBatch_request_contractParams(_0: ["_0_example"], to: ["to_example"])) // InterfacesIERC721MintableAutoIdMintBatchRequest | 

// IERC721MintableAutoId.safeMintBatch
IERC721MintableAutoIdAPI.interfacesIERC721MintableAutoIdSafeMintBatch(networkId: networkId, address: address, interfacesIERC721MintableAutoIdMintBatchRequest: interfacesIERC721MintableAutoIdMintBatchRequest) { (response, error) in
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
 **interfacesIERC721MintableAutoIdMintBatchRequest** | [**InterfacesIERC721MintableAutoIdMintBatchRequest**](InterfacesIERC721MintableAutoIdMintBatchRequest.md) |  | 

### Return type

[**InterfacesIERC721MintableAutoIdMintBatch200Response**](InterfacesIERC721MintableAutoIdMintBatch200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

