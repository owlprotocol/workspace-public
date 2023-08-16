# IUpgradeableBeaconApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIUpgradeableBeaconUpgradeTo**](IUpgradeableBeaconApi.md#interfacesIUpgradeableBeaconUpgradeTo) | **POST** /{networkId}/interface/IUpgradeableBeacon/write/{address}/upgradeTo | IUpgradeableBeacon.upgradeTo



## interfacesIUpgradeableBeaconUpgradeTo

> InterfacesIUpgradeableBeaconUpgradeTo200Response interfacesIUpgradeableBeaconUpgradeTo(networkId, address, interfacesIUpgradeableBeaconUpgradeToRequest)

IUpgradeableBeacon.upgradeTo

Write &#x60;upgradeTo(newImplementation)&#x60; on an instance of &#x60;IUpgradeableBeacon&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IUpgradeableBeaconApi;

IUpgradeableBeaconApi apiInstance = new IUpgradeableBeaconApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIUpgradeableBeaconUpgradeToRequest interfacesIUpgradeableBeaconUpgradeToRequest = new InterfacesIUpgradeableBeaconUpgradeToRequest(); // InterfacesIUpgradeableBeaconUpgradeToRequest | 
try {
    InterfacesIUpgradeableBeaconUpgradeTo200Response result = apiInstance.interfacesIUpgradeableBeaconUpgradeTo(networkId, address, interfacesIUpgradeableBeaconUpgradeToRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IUpgradeableBeaconApi#interfacesIUpgradeableBeaconUpgradeTo");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIUpgradeableBeaconUpgradeToRequest** | [**InterfacesIUpgradeableBeaconUpgradeToRequest**](InterfacesIUpgradeableBeaconUpgradeToRequest.md)|  |

### Return type

[**InterfacesIUpgradeableBeaconUpgradeTo200Response**](InterfacesIUpgradeableBeaconUpgradeTo200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

