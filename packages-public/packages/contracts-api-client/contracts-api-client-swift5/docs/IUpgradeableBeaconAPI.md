# IUpgradeableBeaconAPI

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIUpgradeableBeaconUpgradeTo**](IUpgradeableBeaconAPI.md#interfacesiupgradeablebeaconupgradeto) | **POST** /{networkId}/interface/IUpgradeableBeacon/write/{address}/upgradeTo | IUpgradeableBeacon.upgradeTo


# **interfacesIUpgradeableBeaconUpgradeTo**
```swift
    open class func interfacesIUpgradeableBeaconUpgradeTo(networkId: String, address: String, interfacesIUpgradeableBeaconUpgradeToRequest: InterfacesIUpgradeableBeaconUpgradeToRequest, completion: @escaping (_ data: InterfacesIUpgradeableBeaconUpgradeTo200Response?, _ error: Error?) -> Void)
```

IUpgradeableBeacon.upgradeTo

Write `upgradeTo(newImplementation)` on an instance of `IUpgradeableBeacon`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIUpgradeableBeaconUpgradeToRequest = interfaces_IUpgradeableBeacon_upgradeTo_request(contractParams: interfaces_IUpgradeableBeacon_upgradeTo_request_contractParams(_0: "_0_example", newImplementation: "newImplementation_example")) // InterfacesIUpgradeableBeaconUpgradeToRequest | 

// IUpgradeableBeacon.upgradeTo
IUpgradeableBeaconAPI.interfacesIUpgradeableBeaconUpgradeTo(networkId: networkId, address: address, interfacesIUpgradeableBeaconUpgradeToRequest: interfacesIUpgradeableBeaconUpgradeToRequest) { (response, error) in
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
 **interfacesIUpgradeableBeaconUpgradeToRequest** | [**InterfacesIUpgradeableBeaconUpgradeToRequest**](InterfacesIUpgradeableBeaconUpgradeToRequest.md) |  | 

### Return type

[**InterfacesIUpgradeableBeaconUpgradeTo200Response**](InterfacesIUpgradeableBeaconUpgradeTo200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
