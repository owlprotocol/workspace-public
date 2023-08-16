# IERC1820API

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC1820GetInterfaceImplementer**](IERC1820API.md#interfacesierc1820getinterfaceimplementer) | **POST** /{networkId}/interface/IERC1820/read/{address}/getInterfaceImplementer | IERC1820.getInterfaceImplementer
[**interfacesIERC1820GetManager**](IERC1820API.md#interfacesierc1820getmanager) | **POST** /{networkId}/interface/IERC1820/read/{address}/getManager | IERC1820.getManager
[**interfacesIERC1820ImplementsERC165Interface**](IERC1820API.md#interfacesierc1820implementserc165interface) | **POST** /{networkId}/interface/IERC1820/read/{address}/implementsERC165Interface | IERC1820.implementsERC165Interface
[**interfacesIERC1820ImplementsERC165InterfaceNoCache**](IERC1820API.md#interfacesierc1820implementserc165interfacenocache) | **POST** /{networkId}/interface/IERC1820/read/{address}/implementsERC165InterfaceNoCache | IERC1820.implementsERC165InterfaceNoCache
[**interfacesIERC1820InterfaceHash**](IERC1820API.md#interfacesierc1820interfacehash) | **POST** /{networkId}/interface/IERC1820/read/{address}/interfaceHash | IERC1820.interfaceHash
[**interfacesIERC1820SetInterfaceImplementer**](IERC1820API.md#interfacesierc1820setinterfaceimplementer) | **POST** /{networkId}/interface/IERC1820/write/{address}/setInterfaceImplementer | IERC1820.setInterfaceImplementer
[**interfacesIERC1820SetManager**](IERC1820API.md#interfacesierc1820setmanager) | **POST** /{networkId}/interface/IERC1820/write/{address}/setManager | IERC1820.setManager
[**interfacesIERC1820UpdateERC165Cache**](IERC1820API.md#interfacesierc1820updateerc165cache) | **POST** /{networkId}/interface/IERC1820/write/{address}/updateERC165Cache | IERC1820.updateERC165Cache


# **interfacesIERC1820GetInterfaceImplementer**
```swift
    open class func interfacesIERC1820GetInterfaceImplementer(networkId: String, address: String, interfacesIERC1820GetInterfaceImplementerRequest: InterfacesIERC1820GetInterfaceImplementerRequest, completion: @escaping (_ data: InterfacesIERC1820GetInterfaceImplementer200Response?, _ error: Error?) -> Void)
```

IERC1820.getInterfaceImplementer

Read `getInterfaceImplementer(account,_interfaceHash)` on an instance of `IERC1820`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC1820GetInterfaceImplementerRequest = interfaces_IERC1820_getInterfaceImplementer_request(contractParams: interfaces_IERC1820_getInterfaceImplementer_request_contractParams(_0: "_0_example", _1: "_1_example", account: "account_example", interfaceHash: "interfaceHash_example")) // InterfacesIERC1820GetInterfaceImplementerRequest | 

// IERC1820.getInterfaceImplementer
IERC1820API.interfacesIERC1820GetInterfaceImplementer(networkId: networkId, address: address, interfacesIERC1820GetInterfaceImplementerRequest: interfacesIERC1820GetInterfaceImplementerRequest) { (response, error) in
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
 **interfacesIERC1820GetInterfaceImplementerRequest** | [**InterfacesIERC1820GetInterfaceImplementerRequest**](InterfacesIERC1820GetInterfaceImplementerRequest.md) |  | 

### Return type

[**InterfacesIERC1820GetInterfaceImplementer200Response**](InterfacesIERC1820GetInterfaceImplementer200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC1820GetManager**
```swift
    open class func interfacesIERC1820GetManager(networkId: String, address: String, interfacesIERC1820GetManagerRequest: InterfacesIERC1820GetManagerRequest, completion: @escaping (_ data: InterfacesIERC1820GetManager200Response?, _ error: Error?) -> Void)
```

IERC1820.getManager

Read `getManager(account)` on an instance of `IERC1820`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC1820GetManagerRequest = interfaces_IERC1820_getManager_request(contractParams: interfaces_IERC1820_getManager_request_contractParams(_0: "_0_example", account: "account_example")) // InterfacesIERC1820GetManagerRequest | 

// IERC1820.getManager
IERC1820API.interfacesIERC1820GetManager(networkId: networkId, address: address, interfacesIERC1820GetManagerRequest: interfacesIERC1820GetManagerRequest) { (response, error) in
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

[**InterfacesIERC1820GetManager200Response**](InterfacesIERC1820GetManager200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC1820ImplementsERC165Interface**
```swift
    open class func interfacesIERC1820ImplementsERC165Interface(networkId: String, address: String, interfacesIERC1820ImplementsERC165InterfaceRequest: InterfacesIERC1820ImplementsERC165InterfaceRequest, completion: @escaping (_ data: InterfacesIERC1820ImplementsERC165Interface200Response?, _ error: Error?) -> Void)
```

IERC1820.implementsERC165Interface

Read `implementsERC165Interface(account,interfaceId)` on an instance of `IERC1820`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC1820ImplementsERC165InterfaceRequest = interfaces_IERC1820_implementsERC165Interface_request(contractParams: interfaces_IERC1820_implementsERC165Interface_request_contractParams(_0: "_0_example", _1: "_1_example", account: "account_example", interfaceId: "interfaceId_example")) // InterfacesIERC1820ImplementsERC165InterfaceRequest | 

// IERC1820.implementsERC165Interface
IERC1820API.interfacesIERC1820ImplementsERC165Interface(networkId: networkId, address: address, interfacesIERC1820ImplementsERC165InterfaceRequest: interfacesIERC1820ImplementsERC165InterfaceRequest) { (response, error) in
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
 **interfacesIERC1820ImplementsERC165InterfaceRequest** | [**InterfacesIERC1820ImplementsERC165InterfaceRequest**](InterfacesIERC1820ImplementsERC165InterfaceRequest.md) |  | 

### Return type

[**InterfacesIERC1820ImplementsERC165Interface200Response**](InterfacesIERC1820ImplementsERC165Interface200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC1820ImplementsERC165InterfaceNoCache**
```swift
    open class func interfacesIERC1820ImplementsERC165InterfaceNoCache(networkId: String, address: String, interfacesIERC1820ImplementsERC165InterfaceRequest: InterfacesIERC1820ImplementsERC165InterfaceRequest, completion: @escaping (_ data: InterfacesIERC1820ImplementsERC165Interface200Response?, _ error: Error?) -> Void)
```

IERC1820.implementsERC165InterfaceNoCache

Read `implementsERC165InterfaceNoCache(account,interfaceId)` on an instance of `IERC1820`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC1820ImplementsERC165InterfaceRequest = interfaces_IERC1820_implementsERC165Interface_request(contractParams: interfaces_IERC1820_implementsERC165Interface_request_contractParams(_0: "_0_example", _1: "_1_example", account: "account_example", interfaceId: "interfaceId_example")) // InterfacesIERC1820ImplementsERC165InterfaceRequest | 

// IERC1820.implementsERC165InterfaceNoCache
IERC1820API.interfacesIERC1820ImplementsERC165InterfaceNoCache(networkId: networkId, address: address, interfacesIERC1820ImplementsERC165InterfaceRequest: interfacesIERC1820ImplementsERC165InterfaceRequest) { (response, error) in
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
 **interfacesIERC1820ImplementsERC165InterfaceRequest** | [**InterfacesIERC1820ImplementsERC165InterfaceRequest**](InterfacesIERC1820ImplementsERC165InterfaceRequest.md) |  | 

### Return type

[**InterfacesIERC1820ImplementsERC165Interface200Response**](InterfacesIERC1820ImplementsERC165Interface200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC1820InterfaceHash**
```swift
    open class func interfacesIERC1820InterfaceHash(networkId: String, address: String, interfacesIERC1820InterfaceHashRequest: InterfacesIERC1820InterfaceHashRequest, completion: @escaping (_ data: InterfacesIERC1820InterfaceHash200Response?, _ error: Error?) -> Void)
```

IERC1820.interfaceHash

Read `interfaceHash(interfaceName)` on an instance of `IERC1820`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC1820InterfaceHashRequest = interfaces_IERC1820_interfaceHash_request(contractParams: interfaces_IERC1820_interfaceHash_request_contractParams(_0: "_0_example", interfaceName: "interfaceName_example")) // InterfacesIERC1820InterfaceHashRequest | 

// IERC1820.interfaceHash
IERC1820API.interfacesIERC1820InterfaceHash(networkId: networkId, address: address, interfacesIERC1820InterfaceHashRequest: interfacesIERC1820InterfaceHashRequest) { (response, error) in
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
 **interfacesIERC1820InterfaceHashRequest** | [**InterfacesIERC1820InterfaceHashRequest**](InterfacesIERC1820InterfaceHashRequest.md) |  | 

### Return type

[**InterfacesIERC1820InterfaceHash200Response**](InterfacesIERC1820InterfaceHash200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC1820SetInterfaceImplementer**
```swift
    open class func interfacesIERC1820SetInterfaceImplementer(networkId: String, address: String, interfacesIERC1820SetInterfaceImplementerRequest: InterfacesIERC1820SetInterfaceImplementerRequest, completion: @escaping (_ data: InterfacesIERC1820SetInterfaceImplementer200Response?, _ error: Error?) -> Void)
```

IERC1820.setInterfaceImplementer

Write `setInterfaceImplementer(account,_interfaceHash,implementer)` on an instance of `IERC1820`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC1820SetInterfaceImplementerRequest = interfaces_IERC1820_setInterfaceImplementer_request(contractParams: interfaces_IERC1820_setInterfaceImplementer_request_contractParams(_0: "_0_example", _1: "_1_example", _2: "_2_example", account: "account_example", interfaceHash: "interfaceHash_example", implementer: "implementer_example")) // InterfacesIERC1820SetInterfaceImplementerRequest | 

// IERC1820.setInterfaceImplementer
IERC1820API.interfacesIERC1820SetInterfaceImplementer(networkId: networkId, address: address, interfacesIERC1820SetInterfaceImplementerRequest: interfacesIERC1820SetInterfaceImplementerRequest) { (response, error) in
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
 **interfacesIERC1820SetInterfaceImplementerRequest** | [**InterfacesIERC1820SetInterfaceImplementerRequest**](InterfacesIERC1820SetInterfaceImplementerRequest.md) |  | 

### Return type

[**InterfacesIERC1820SetInterfaceImplementer200Response**](InterfacesIERC1820SetInterfaceImplementer200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC1820SetManager**
```swift
    open class func interfacesIERC1820SetManager(networkId: String, address: String, interfacesIERC1820SetManagerRequest: InterfacesIERC1820SetManagerRequest, completion: @escaping (_ data: InterfacesIERC1820SetManager200Response?, _ error: Error?) -> Void)
```

IERC1820.setManager

Write `setManager(account,newManager)` on an instance of `IERC1820`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC1820SetManagerRequest = interfaces_IERC1820_setManager_request(contractParams: interfaces_IERC1820_setManager_request_contractParams(_0: "_0_example", _1: "_1_example", account: "account_example", newManager: "newManager_example")) // InterfacesIERC1820SetManagerRequest | 

// IERC1820.setManager
IERC1820API.interfacesIERC1820SetManager(networkId: networkId, address: address, interfacesIERC1820SetManagerRequest: interfacesIERC1820SetManagerRequest) { (response, error) in
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
 **interfacesIERC1820SetManagerRequest** | [**InterfacesIERC1820SetManagerRequest**](InterfacesIERC1820SetManagerRequest.md) |  | 

### Return type

[**InterfacesIERC1820SetManager200Response**](InterfacesIERC1820SetManager200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIERC1820UpdateERC165Cache**
```swift
    open class func interfacesIERC1820UpdateERC165Cache(networkId: String, address: String, interfacesIERC1820ImplementsERC165InterfaceRequest: InterfacesIERC1820ImplementsERC165InterfaceRequest, completion: @escaping (_ data: InterfacesIERC1820UpdateERC165Cache200Response?, _ error: Error?) -> Void)
```

IERC1820.updateERC165Cache

Write `updateERC165Cache(account,interfaceId)` on an instance of `IERC1820`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC1820ImplementsERC165InterfaceRequest = interfaces_IERC1820_implementsERC165Interface_request(contractParams: interfaces_IERC1820_implementsERC165Interface_request_contractParams(_0: "_0_example", _1: "_1_example", account: "account_example", interfaceId: "interfaceId_example")) // InterfacesIERC1820ImplementsERC165InterfaceRequest | 

// IERC1820.updateERC165Cache
IERC1820API.interfacesIERC1820UpdateERC165Cache(networkId: networkId, address: address, interfacesIERC1820ImplementsERC165InterfaceRequest: interfacesIERC1820ImplementsERC165InterfaceRequest) { (response, error) in
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
 **interfacesIERC1820ImplementsERC165InterfaceRequest** | [**InterfacesIERC1820ImplementsERC165InterfaceRequest**](InterfacesIERC1820ImplementsERC165InterfaceRequest.md) |  | 

### Return type

[**InterfacesIERC1820UpdateERC165Cache200Response**](InterfacesIERC1820UpdateERC165Cache200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

