# IBeaconApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIBeaconImplementation**](IBeaconApi.md#interfacesIBeaconImplementation) | **POST** /{networkId}/interface/IBeacon/read/{address}/implementation | IBeacon.implementation



## interfacesIBeaconImplementation

> InterfacesIBeaconImplementation200Response interfacesIBeaconImplementation(networkId, address, interfacesIBeaconImplementationRequest)

IBeacon.implementation

Read &#x60;implementation()&#x60; on an instance of &#x60;IBeacon&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IBeaconApi;

IBeaconApi apiInstance = new IBeaconApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest = new InterfacesIBeaconImplementationRequest(); // InterfacesIBeaconImplementationRequest | 
try {
    InterfacesIBeaconImplementation200Response result = apiInstance.interfacesIBeaconImplementation(networkId, address, interfacesIBeaconImplementationRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IBeaconApi#interfacesIBeaconImplementation");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIBeaconImplementationRequest** | [**InterfacesIBeaconImplementationRequest**](InterfacesIBeaconImplementationRequest.md)|  |

### Return type

[**InterfacesIBeaconImplementation200Response**](InterfacesIBeaconImplementation200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

