# IUpgradeableBeaconApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIUpgradeableBeaconUpgradeTo**](IUpgradeableBeaconApi.md#interfacesIUpgradeableBeaconUpgradeTo) | **POST** /{networkId}/interface/IUpgradeableBeacon/write/{address}/upgradeTo | IUpgradeableBeacon.upgradeTo


<a id="interfacesIUpgradeableBeaconUpgradeTo"></a>
# **interfacesIUpgradeableBeaconUpgradeTo**
> InterfacesIUpgradeableBeaconUpgradeTo200Response interfacesIUpgradeableBeaconUpgradeTo(networkId, address, interfacesIUpgradeableBeaconUpgradeToRequest)

IUpgradeableBeacon.upgradeTo

Write &#x60;upgradeTo(newImplementation)&#x60; on an instance of &#x60;IUpgradeableBeacon&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IUpgradeableBeaconApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIUpgradeableBeaconUpgradeToRequest : InterfacesIUpgradeableBeaconUpgradeToRequest =  // InterfacesIUpgradeableBeaconUpgradeToRequest | 
try {
    val result : InterfacesIUpgradeableBeaconUpgradeTo200Response = apiInstance.interfacesIUpgradeableBeaconUpgradeTo(networkId, address, interfacesIUpgradeableBeaconUpgradeToRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IUpgradeableBeaconApi#interfacesIUpgradeableBeaconUpgradeTo")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IUpgradeableBeaconApi#interfacesIUpgradeableBeaconUpgradeTo")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIUpgradeableBeaconUpgradeToRequest** | [**InterfacesIUpgradeableBeaconUpgradeToRequest**](InterfacesIUpgradeableBeaconUpgradeToRequest.md)|  |

### Return type

[**InterfacesIUpgradeableBeaconUpgradeTo200Response**](InterfacesIUpgradeableBeaconUpgradeTo200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

