# ITokenDnaAPI

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesITokenDnaGetDna**](ITokenDnaAPI.md#interfacesitokendnagetdna) | **POST** /{networkId}/interface/ITokenDna/read/{address}/getDna | ITokenDna.getDna
[**interfacesITokenDnaGetDnaBatch**](ITokenDnaAPI.md#interfacesitokendnagetdnabatch) | **POST** /{networkId}/interface/ITokenDna/read/{address}/getDnaBatch | ITokenDna.getDnaBatch
[**interfacesITokenDnaSetDna**](ITokenDnaAPI.md#interfacesitokendnasetdna) | **POST** /{networkId}/interface/ITokenDna/write/{address}/setDna | ITokenDna.setDna
[**interfacesITokenDnaSetDnaBatch**](ITokenDnaAPI.md#interfacesitokendnasetdnabatch) | **POST** /{networkId}/interface/ITokenDna/write/{address}/setDnaBatch | ITokenDna.setDnaBatch


# **interfacesITokenDnaGetDna**
```swift
    open class func interfacesITokenDnaGetDna(networkId: String, address: String, interfacesIERC721GetApprovedRequest: InterfacesIERC721GetApprovedRequest, completion: @escaping (_ data: InterfacesITokenDnaGetDna200Response?, _ error: Error?) -> Void)
```

ITokenDna.getDna

Read `getDna(tokenId)` on an instance of `ITokenDna`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC721GetApprovedRequest = interfaces_IERC721_getApproved_request(contractParams: interfaces_IERC721_getApproved_request_contractParams(_0: "_0_example", tokenId: "tokenId_example")) // InterfacesIERC721GetApprovedRequest | 

// ITokenDna.getDna
ITokenDnaAPI.interfacesITokenDnaGetDna(networkId: networkId, address: address, interfacesIERC721GetApprovedRequest: interfacesIERC721GetApprovedRequest) { (response, error) in
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

[**InterfacesITokenDnaGetDna200Response**](InterfacesITokenDnaGetDna200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesITokenDnaGetDnaBatch**
```swift
    open class func interfacesITokenDnaGetDnaBatch(networkId: String, address: String, interfacesITokenDnaGetDnaBatchRequest: InterfacesITokenDnaGetDnaBatchRequest, completion: @escaping (_ data: InterfacesITokenDnaGetDnaBatch200Response?, _ error: Error?) -> Void)
```

ITokenDna.getDnaBatch

Read `getDnaBatch(tokenId)` on an instance of `ITokenDna`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesITokenDnaGetDnaBatchRequest = interfaces_ITokenDna_getDnaBatch_request(contractParams: interfaces_ITokenDna_getDnaBatch_request_contractParams(_0: ["_0_example"], tokenId: ["tokenId_example"])) // InterfacesITokenDnaGetDnaBatchRequest | 

// ITokenDna.getDnaBatch
ITokenDnaAPI.interfacesITokenDnaGetDnaBatch(networkId: networkId, address: address, interfacesITokenDnaGetDnaBatchRequest: interfacesITokenDnaGetDnaBatchRequest) { (response, error) in
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
 **interfacesITokenDnaGetDnaBatchRequest** | [**InterfacesITokenDnaGetDnaBatchRequest**](InterfacesITokenDnaGetDnaBatchRequest.md) |  | 

### Return type

[**InterfacesITokenDnaGetDnaBatch200Response**](InterfacesITokenDnaGetDnaBatch200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesITokenDnaSetDna**
```swift
    open class func interfacesITokenDnaSetDna(networkId: String, address: String, interfacesITokenDnaSetDnaRequest: InterfacesITokenDnaSetDnaRequest, completion: @escaping (_ data: InterfacesITokenDnaSetDna200Response?, _ error: Error?) -> Void)
```

ITokenDna.setDna

Write `setDna(tokenId,dna)` on an instance of `ITokenDna`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesITokenDnaSetDnaRequest = interfaces_ITokenDna_setDna_request(contractParams: interfaces_ITokenDna_setDna_request_contractParams(_0: "_0_example", _1: "_1_example", tokenId: "tokenId_example", dna: "dna_example")) // InterfacesITokenDnaSetDnaRequest | 

// ITokenDna.setDna
ITokenDnaAPI.interfacesITokenDnaSetDna(networkId: networkId, address: address, interfacesITokenDnaSetDnaRequest: interfacesITokenDnaSetDnaRequest) { (response, error) in
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
 **interfacesITokenDnaSetDnaRequest** | [**InterfacesITokenDnaSetDnaRequest**](InterfacesITokenDnaSetDnaRequest.md) |  | 

### Return type

[**InterfacesITokenDnaSetDna200Response**](InterfacesITokenDnaSetDna200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesITokenDnaSetDnaBatch**
```swift
    open class func interfacesITokenDnaSetDnaBatch(networkId: String, address: String, interfacesITokenDnaSetDnaBatchRequest: InterfacesITokenDnaSetDnaBatchRequest, completion: @escaping (_ data: InterfacesITokenDnaSetDnaBatch200Response?, _ error: Error?) -> Void)
```

ITokenDna.setDnaBatch

Write `setDnaBatch(tokenId,dna)` on an instance of `ITokenDna`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesITokenDnaSetDnaBatchRequest = interfaces_ITokenDna_setDnaBatch_request(contractParams: interfaces_ITokenDna_setDnaBatch_request_contractParams(_0: ["_0_example"], _1: ["_1_example"], tokenId: ["tokenId_example"], dna: ["dna_example"])) // InterfacesITokenDnaSetDnaBatchRequest | 

// ITokenDna.setDnaBatch
ITokenDnaAPI.interfacesITokenDnaSetDnaBatch(networkId: networkId, address: address, interfacesITokenDnaSetDnaBatchRequest: interfacesITokenDnaSetDnaBatchRequest) { (response, error) in
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
 **interfacesITokenDnaSetDnaBatchRequest** | [**InterfacesITokenDnaSetDnaBatchRequest**](InterfacesITokenDnaSetDnaBatchRequest.md) |  | 

### Return type

[**InterfacesITokenDnaSetDnaBatch200Response**](InterfacesITokenDnaSetDnaBatch200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

