# IBeaconProxyAPI

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIBeaconProxyBeacon**](IBeaconProxyAPI.md#interfacesibeaconproxybeacon) | **POST** /{networkId}/interface/IBeaconProxy/read/{address}/beacon | IBeaconProxy.beacon
[**interfacesIBeaconProxySetBeacon**](IBeaconProxyAPI.md#interfacesibeaconproxysetbeacon) | **POST** /{networkId}/interface/IBeaconProxy/write/{address}/setBeacon | IBeaconProxy.setBeacon


# **interfacesIBeaconProxyBeacon**
```swift
    open class func interfacesIBeaconProxyBeacon(networkId: String, address: String, interfacesIBeaconImplementationRequest: InterfacesIBeaconImplementationRequest, completion: @escaping (_ data: InterfacesIBeaconImplementation200Response?, _ error: Error?) -> Void)
```

IBeaconProxy.beacon

Read `beacon()` on an instance of `IBeaconProxy`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIBeaconImplementationRequest = interfaces_IBeacon_implementation_request(contractParams: 123) // InterfacesIBeaconImplementationRequest | 

// IBeaconProxy.beacon
IBeaconProxyAPI.interfacesIBeaconProxyBeacon(networkId: networkId, address: address, interfacesIBeaconImplementationRequest: interfacesIBeaconImplementationRequest) { (response, error) in
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

[**InterfacesIBeaconImplementation200Response**](InterfacesIBeaconImplementation200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIBeaconProxySetBeacon**
```swift
    open class func interfacesIBeaconProxySetBeacon(networkId: String, address: String, interfacesIBeaconProxySetBeaconRequest: InterfacesIBeaconProxySetBeaconRequest, completion: @escaping (_ data: InterfacesIBeaconProxySetBeacon200Response?, _ error: Error?) -> Void)
```

IBeaconProxy.setBeacon

Write `setBeacon(_beaconAddress,data)` on an instance of `IBeaconProxy`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIBeaconProxySetBeaconRequest = interfaces_IBeaconProxy_setBeacon_request(contractParams: interfaces_IBeaconProxy_setBeacon_request_contractParams(_0: "_0_example", _1: "_1_example", beaconAddress: "beaconAddress_example", data: "data_example")) // InterfacesIBeaconProxySetBeaconRequest | 

// IBeaconProxy.setBeacon
IBeaconProxyAPI.interfacesIBeaconProxySetBeacon(networkId: networkId, address: address, interfacesIBeaconProxySetBeaconRequest: interfacesIBeaconProxySetBeaconRequest) { (response, error) in
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
 **interfacesIBeaconProxySetBeaconRequest** | [**InterfacesIBeaconProxySetBeaconRequest**](InterfacesIBeaconProxySetBeaconRequest.md) |  | 

### Return type

[**InterfacesIBeaconProxySetBeacon200Response**](InterfacesIBeaconProxySetBeacon200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

