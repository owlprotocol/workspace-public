# IERC1155MetadataURIAPI

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC1155MetadataURIBalanceOf**](IERC1155MetadataURIAPI.md#interfacesierc1155metadatauribalanceof) | **POST** /{networkId}/interface/IERC1155MetadataURI/read/{address}/balanceOf | IERC1155MetadataURI.balanceOf
[**interfacesIERC1155MetadataURIBalanceOfBatch**](IERC1155MetadataURIAPI.md#interfacesierc1155metadatauribalanceofbatch) | **POST** /{networkId}/interface/IERC1155MetadataURI/read/{address}/balanceOfBatch | IERC1155MetadataURI.balanceOfBatch
[**interfacesIERC1155MetadataURIIsApprovedForAll**](IERC1155MetadataURIAPI.md#interfacesierc1155metadatauriisapprovedforall) | **POST** /{networkId}/interface/IERC1155MetadataURI/read/{address}/isApprovedForAll | IERC1155MetadataURI.isApprovedForAll
[**interfacesIERC1155MetadataURISafeBatchTransferFrom**](IERC1155MetadataURIAPI.md#interfacesierc1155metadataurisafebatchtransferfrom) | **POST** /{networkId}/interface/IERC1155MetadataURI/write/{address}/safeBatchTransferFrom | IERC1155MetadataURI.safeBatchTransferFrom
[**interfacesIERC1155MetadataURISafeTransferFrom**](IERC1155MetadataURIAPI.md#interfacesierc1155metadataurisafetransferfrom) | **POST** /{networkId}/interface/IERC1155MetadataURI/write/{address}/safeTransferFrom | IERC1155MetadataURI.safeTransferFrom
[**interfacesIERC1155MetadataURISetApprovalForAll**](IERC1155MetadataURIAPI.md#interfacesierc1155metadataurisetapprovalforall) | **POST** /{networkId}/interface/IERC1155MetadataURI/write/{address}/setApprovalForAll | IERC1155MetadataURI.setApprovalForAll
[**interfacesIERC1155MetadataURISupportsInterface**](IERC1155MetadataURIAPI.md#interfacesierc1155metadataurisupportsinterface) | **POST** /{networkId}/interface/IERC1155MetadataURI/read/{address}/supportsInterface | IERC1155MetadataURI.supportsInterface
[**interfacesIERC1155MetadataURIUri**](IERC1155MetadataURIAPI.md#interfacesierc1155metadatauriuri) | **POST** /{networkId}/interface/IERC1155MetadataURI/read/{address}/uri | IERC1155MetadataURI.uri


# **interfacesIERC1155MetadataURIBalanceOf**
```swift
    open class func interfacesIERC1155MetadataURIBalanceOf(networkId: String, address: String, interfacesIERC1155BalanceOfRequest: InterfacesIERC1155BalanceOfRequest, completion: @escaping (_ data: InterfacesIERC1155BalanceOf200Response?, _ error: Error?) -> Void)
```

IERC1155MetadataURI.balanceOf

Read `balanceOf(account,id)` on an instance of `IERC1155MetadataURI`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC1155BalanceOfRequest = interfaces_IERC1155_balanceOf_request(contractParams: interfaces_IERC1155_balanceOf_request_contractParams(_0: "_0_example", _1: "_1_example", account: "account_example", id: "id_example")) // InterfacesIERC1155BalanceOfRequest | 

// IERC1155MetadataURI.balanceOf
IERC1155MetadataURIAPI.interfacesIERC1155MetadataURIBalanceOf(networkId: networkId, address: address, interfacesIERC1155BalanceOfRequest: interfacesIERC1155BalanceOfRequest) { (response, error) in
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

# **interfacesIERC1155MetadataURIBalanceOfBatch**
```swift
    open class func interfacesIERC1155MetadataURIBalanceOfBatch(networkId: String, address: String, interfacesIERC1155BalanceOfBatchRequest: InterfacesIERC1155BalanceOfBatchRequest, completion: @escaping (_ data: InterfacesIERC1155BalanceOfBatch200Response?, _ error: Error?) -> Void)
```

IERC1155MetadataURI.balanceOfBatch

Read `balanceOfBatch(accounts,ids)` on an instance of `IERC1155MetadataURI`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC1155BalanceOfBatchRequest = interfaces_IERC1155_balanceOfBatch_request(contractParams: interfaces_IERC1155_balanceOfBatch_request_contractParams(_0: ["_0_example"], _1: ["_1_example"], accounts: ["accounts_example"], ids: ["ids_example"])) // InterfacesIERC1155BalanceOfBatchRequest | 

// IERC1155MetadataURI.balanceOfBatch
IERC1155MetadataURIAPI.interfacesIERC1155MetadataURIBalanceOfBatch(networkId: networkId, address: address, interfacesIERC1155BalanceOfBatchRequest: interfacesIERC1155BalanceOfBatchRequest) { (response, error) in
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

# **interfacesIERC1155MetadataURIIsApprovedForAll**
```swift
    open class func interfacesIERC1155MetadataURIIsApprovedForAll(networkId: String, address: String, interfacesIERC1155IsApprovedForAllRequest: InterfacesIERC1155IsApprovedForAllRequest, completion: @escaping (_ data: InterfacesIERC1155IsApprovedForAll200Response?, _ error: Error?) -> Void)
```

IERC1155MetadataURI.isApprovedForAll

Read `isApprovedForAll(account,operator)` on an instance of `IERC1155MetadataURI`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC1155IsApprovedForAllRequest = interfaces_IERC1155_isApprovedForAll_request(contractParams: interfaces_IERC1155_isApprovedForAll_request_contractParams(_0: "_0_example", _1: "_1_example", account: "account_example", _operator: "_operator_example")) // InterfacesIERC1155IsApprovedForAllRequest | 

// IERC1155MetadataURI.isApprovedForAll
IERC1155MetadataURIAPI.interfacesIERC1155MetadataURIIsApprovedForAll(networkId: networkId, address: address, interfacesIERC1155IsApprovedForAllRequest: interfacesIERC1155IsApprovedForAllRequest) { (response, error) in
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

# **interfacesIERC1155MetadataURISafeBatchTransferFrom**
```swift
    open class func interfacesIERC1155MetadataURISafeBatchTransferFrom(networkId: String, address: String, interfacesIERC1155SafeBatchTransferFromRequest: InterfacesIERC1155SafeBatchTransferFromRequest, completion: @escaping (_ data: InterfacesIERC1155SafeBatchTransferFrom200Response?, _ error: Error?) -> Void)
```

IERC1155MetadataURI.safeBatchTransferFrom

Write `safeBatchTransferFrom(from,to,ids,amounts,data)` on an instance of `IERC1155MetadataURI`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC1155SafeBatchTransferFromRequest = interfaces_IERC1155_safeBatchTransferFrom_request(contractParams: interfaces_IERC1155_safeBatchTransferFrom_request_contractParams(_0: "_0_example", _1: "_1_example", _2: ["_2_example"], _3: ["_3_example"], _4: "_4_example", from: "from_example", to: "to_example", ids: ["ids_example"], amounts: ["amounts_example"], data: "data_example")) // InterfacesIERC1155SafeBatchTransferFromRequest | 

// IERC1155MetadataURI.safeBatchTransferFrom
IERC1155MetadataURIAPI.interfacesIERC1155MetadataURISafeBatchTransferFrom(networkId: networkId, address: address, interfacesIERC1155SafeBatchTransferFromRequest: interfacesIERC1155SafeBatchTransferFromRequest) { (response, error) in
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

# **interfacesIERC1155MetadataURISafeTransferFrom**
```swift
    open class func interfacesIERC1155MetadataURISafeTransferFrom(networkId: String, address: String, interfacesIERC1155SafeTransferFromRequest: InterfacesIERC1155SafeTransferFromRequest, completion: @escaping (_ data: InterfacesIERC1155SafeTransferFrom200Response?, _ error: Error?) -> Void)
```

IERC1155MetadataURI.safeTransferFrom

Write `safeTransferFrom(from,to,id,amount,data)` on an instance of `IERC1155MetadataURI`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC1155SafeTransferFromRequest = interfaces_IERC1155_safeTransferFrom_request(contractParams: interfaces_IERC1155_safeTransferFrom_request_contractParams(_0: "_0_example", _1: "_1_example", _2: "_2_example", _3: "_3_example", _4: "_4_example", from: "from_example", to: "to_example", id: "id_example", amount: "amount_example", data: "data_example")) // InterfacesIERC1155SafeTransferFromRequest | 

// IERC1155MetadataURI.safeTransferFrom
IERC1155MetadataURIAPI.interfacesIERC1155MetadataURISafeTransferFrom(networkId: networkId, address: address, interfacesIERC1155SafeTransferFromRequest: interfacesIERC1155SafeTransferFromRequest) { (response, error) in
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

# **interfacesIERC1155MetadataURISetApprovalForAll**
```swift
    open class func interfacesIERC1155MetadataURISetApprovalForAll(networkId: String, address: String, interfacesIERC1155SetApprovalForAllRequest: InterfacesIERC1155SetApprovalForAllRequest, completion: @escaping (_ data: InterfacesIERC1155SetApprovalForAll200Response?, _ error: Error?) -> Void)
```

IERC1155MetadataURI.setApprovalForAll

Write `setApprovalForAll(operator,approved)` on an instance of `IERC1155MetadataURI`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC1155SetApprovalForAllRequest = interfaces_IERC1155_setApprovalForAll_request(contractParams: interfaces_IERC1155_setApprovalForAll_request_contractParams(_0: "_0_example", _1: false, _operator: "_operator_example", approved: false)) // InterfacesIERC1155SetApprovalForAllRequest | 

// IERC1155MetadataURI.setApprovalForAll
IERC1155MetadataURIAPI.interfacesIERC1155MetadataURISetApprovalForAll(networkId: networkId, address: address, interfacesIERC1155SetApprovalForAllRequest: interfacesIERC1155SetApprovalForAllRequest) { (response, error) in
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

# **interfacesIERC1155MetadataURISupportsInterface**
```swift
    open class func interfacesIERC1155MetadataURISupportsInterface(networkId: String, address: String, interfacesIERC165SupportsInterfaceRequest: InterfacesIERC165SupportsInterfaceRequest, completion: @escaping (_ data: InterfacesIERC165SupportsInterface200Response?, _ error: Error?) -> Void)
```

IERC1155MetadataURI.supportsInterface

Read `supportsInterface(interfaceId)` on an instance of `IERC1155MetadataURI`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC165SupportsInterfaceRequest = interfaces_IERC165_supportsInterface_request(contractParams: interfaces_IERC165_supportsInterface_request_contractParams(_0: "_0_example", interfaceId: "interfaceId_example")) // InterfacesIERC165SupportsInterfaceRequest | 

// IERC1155MetadataURI.supportsInterface
IERC1155MetadataURIAPI.interfacesIERC1155MetadataURISupportsInterface(networkId: networkId, address: address, interfacesIERC165SupportsInterfaceRequest: interfacesIERC165SupportsInterfaceRequest) { (response, error) in
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

# **interfacesIERC1155MetadataURIUri**
```swift
    open class func interfacesIERC1155MetadataURIUri(networkId: String, address: String, interfacesIERC1155MetadataURIUriRequest: InterfacesIERC1155MetadataURIUriRequest, completion: @escaping (_ data: InterfacesIERC1155MetadataURIUri200Response?, _ error: Error?) -> Void)
```

IERC1155MetadataURI.uri

Read `uri(id)` on an instance of `IERC1155MetadataURI`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC1155MetadataURIUriRequest = interfaces_IERC1155MetadataURI_uri_request(contractParams: interfaces_IERC1155MetadataURI_uri_request_contractParams(_0: "_0_example", id: "id_example")) // InterfacesIERC1155MetadataURIUriRequest | 

// IERC1155MetadataURI.uri
IERC1155MetadataURIAPI.interfacesIERC1155MetadataURIUri(networkId: networkId, address: address, interfacesIERC1155MetadataURIUriRequest: interfacesIERC1155MetadataURIUriRequest) { (response, error) in
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
 **interfacesIERC1155MetadataURIUriRequest** | [**InterfacesIERC1155MetadataURIUriRequest**](InterfacesIERC1155MetadataURIUriRequest.md) |  | 

### Return type

[**InterfacesIERC1155MetadataURIUri200Response**](InterfacesIERC1155MetadataURIUri200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

