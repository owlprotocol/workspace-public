# IContractURIAPI

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIContractURIContractURI**](IContractURIAPI.md#interfacesicontracturicontracturi) | **POST** /{networkId}/interface/IContractURI/read/{address}/contractURI | IContractURI.contractURI
[**interfacesIContractURISetContractURI**](IContractURIAPI.md#interfacesicontracturisetcontracturi) | **POST** /{networkId}/interface/IContractURI/write/{address}/setContractURI | IContractURI.setContractURI


# **interfacesIContractURIContractURI**
```swift
    open class func interfacesIContractURIContractURI(networkId: String, address: String, interfacesIBeaconImplementationRequest: InterfacesIBeaconImplementationRequest, completion: @escaping (_ data: InterfacesIContractURIContractURI200Response?, _ error: Error?) -> Void)
```

IContractURI.contractURI

Read `contractURI()` on an instance of `IContractURI`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIBeaconImplementationRequest = interfaces_IBeacon_implementation_request(contractParams: 123) // InterfacesIBeaconImplementationRequest | 

// IContractURI.contractURI
IContractURIAPI.interfacesIContractURIContractURI(networkId: networkId, address: address, interfacesIBeaconImplementationRequest: interfacesIBeaconImplementationRequest) { (response, error) in
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

# **interfacesIContractURISetContractURI**
```swift
    open class func interfacesIContractURISetContractURI(networkId: String, address: String, interfacesIContractURISetContractURIRequest: InterfacesIContractURISetContractURIRequest, completion: @escaping (_ data: InterfacesIContractURISetContractURI200Response?, _ error: Error?) -> Void)
```

IContractURI.setContractURI

Write `setContractURI(uri)` on an instance of `IContractURI`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIContractURISetContractURIRequest = interfaces_IContractURI_setContractURI_request(contractParams: interfaces_IContractURI_setContractURI_request_contractParams(_0: "_0_example", uri: "uri_example")) // InterfacesIContractURISetContractURIRequest | 

// IContractURI.setContractURI
IContractURIAPI.interfacesIContractURISetContractURI(networkId: networkId, address: address, interfacesIContractURISetContractURIRequest: interfacesIContractURISetContractURIRequest) { (response, error) in
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
 **interfacesIContractURISetContractURIRequest** | [**InterfacesIContractURISetContractURIRequest**](InterfacesIContractURISetContractURIRequest.md) |  | 

### Return type

[**InterfacesIContractURISetContractURI200Response**](InterfacesIContractURISetContractURI200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

