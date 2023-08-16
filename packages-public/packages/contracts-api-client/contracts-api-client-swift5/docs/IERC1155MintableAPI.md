# IERC1155MintableAPI

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC1155MintableMint**](IERC1155MintableAPI.md#interfacesierc1155mintablemint) | **POST** /{networkId}/interface/IERC1155Mintable/write/{address}/mint | IERC1155Mintable.mint
[**interfacesIERC1155MintableMintBatch**](IERC1155MintableAPI.md#interfacesierc1155mintablemintbatch) | **POST** /{networkId}/interface/IERC1155Mintable/write/{address}/mintBatch | IERC1155Mintable.mintBatch


# **interfacesIERC1155MintableMint**
```swift
    open class func interfacesIERC1155MintableMint(networkId: String, address: String, interfacesIERC1155MintableMintRequest: InterfacesIERC1155MintableMintRequest, completion: @escaping (_ data: InterfacesIERC1155MintableMint200Response?, _ error: Error?) -> Void)
```

IERC1155Mintable.mint

Write `mint(to,id,amount,data)` on an instance of `IERC1155Mintable`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC1155MintableMintRequest = interfaces_IERC1155Mintable_mint_request(contractParams: interfaces_IERC1155Mintable_mint_request_contractParams(_0: "_0_example", _1: "_1_example", _2: "_2_example", _3: "_3_example", to: "to_example", id: "id_example", amount: "amount_example", data: "data_example")) // InterfacesIERC1155MintableMintRequest | 

// IERC1155Mintable.mint
IERC1155MintableAPI.interfacesIERC1155MintableMint(networkId: networkId, address: address, interfacesIERC1155MintableMintRequest: interfacesIERC1155MintableMintRequest) { (response, error) in
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
 **interfacesIERC1155MintableMintRequest** | [**InterfacesIERC1155MintableMintRequest**](InterfacesIERC1155MintableMintRequest.md) |  | 

### Return type

[**InterfacesIERC1155MintableMint200Response**](InterfacesIERC1155MintableMint200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC1155MintableMintBatch**
```swift
    open class func interfacesIERC1155MintableMintBatch(networkId: String, address: String, interfacesIERC1155MintableMintBatchRequest: InterfacesIERC1155MintableMintBatchRequest, completion: @escaping (_ data: InterfacesIERC1155MintableMintBatch200Response?, _ error: Error?) -> Void)
```

IERC1155Mintable.mintBatch

Write `mintBatch(to,ids,amounts,data)` on an instance of `IERC1155Mintable`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC1155MintableMintBatchRequest = interfaces_IERC1155Mintable_mintBatch_request(contractParams: interfaces_IERC1155Mintable_mintBatch_request_contractParams(_0: "_0_example", _1: ["_1_example"], _2: ["_2_example"], _3: "_3_example", to: "to_example", ids: ["ids_example"], amounts: ["amounts_example"], data: "data_example")) // InterfacesIERC1155MintableMintBatchRequest | 

// IERC1155Mintable.mintBatch
IERC1155MintableAPI.interfacesIERC1155MintableMintBatch(networkId: networkId, address: address, interfacesIERC1155MintableMintBatchRequest: interfacesIERC1155MintableMintBatchRequest) { (response, error) in
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
 **interfacesIERC1155MintableMintBatchRequest** | [**InterfacesIERC1155MintableMintBatchRequest**](InterfacesIERC1155MintableMintBatchRequest.md) |  | 

### Return type

[**InterfacesIERC1155MintableMintBatch200Response**](InterfacesIERC1155MintableMintBatch200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

