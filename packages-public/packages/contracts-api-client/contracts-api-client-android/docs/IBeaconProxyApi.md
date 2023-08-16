# IBeaconProxyApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIBeaconProxyBeacon**](IBeaconProxyApi.md#interfacesIBeaconProxyBeacon) | **POST** /{networkId}/interface/IBeaconProxy/read/{address}/beacon | IBeaconProxy.beacon
[**interfacesIBeaconProxySetBeacon**](IBeaconProxyApi.md#interfacesIBeaconProxySetBeacon) | **POST** /{networkId}/interface/IBeaconProxy/write/{address}/setBeacon | IBeaconProxy.setBeacon



## interfacesIBeaconProxyBeacon

> InterfacesIBeaconImplementation200Response interfacesIBeaconProxyBeacon(networkId, address, interfacesIBeaconImplementationRequest)

IBeaconProxy.beacon

Read &#x60;beacon()&#x60; on an instance of &#x60;IBeaconProxy&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IBeaconProxyApi;

IBeaconProxyApi apiInstance = new IBeaconProxyApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest = new InterfacesIBeaconImplementationRequest(); // InterfacesIBeaconImplementationRequest | 
try {
    InterfacesIBeaconImplementation200Response result = apiInstance.interfacesIBeaconProxyBeacon(networkId, address, interfacesIBeaconImplementationRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IBeaconProxyApi#interfacesIBeaconProxyBeacon");
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


## interfacesIBeaconProxySetBeacon

> InterfacesIBeaconProxySetBeacon200Response interfacesIBeaconProxySetBeacon(networkId, address, interfacesIBeaconProxySetBeaconRequest)

IBeaconProxy.setBeacon

Write &#x60;setBeacon(_beaconAddress,data)&#x60; on an instance of &#x60;IBeaconProxy&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IBeaconProxyApi;

IBeaconProxyApi apiInstance = new IBeaconProxyApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIBeaconProxySetBeaconRequest interfacesIBeaconProxySetBeaconRequest = new InterfacesIBeaconProxySetBeaconRequest(); // InterfacesIBeaconProxySetBeaconRequest | 
try {
    InterfacesIBeaconProxySetBeacon200Response result = apiInstance.interfacesIBeaconProxySetBeacon(networkId, address, interfacesIBeaconProxySetBeaconRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IBeaconProxyApi#interfacesIBeaconProxySetBeacon");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIBeaconProxySetBeaconRequest** | [**InterfacesIBeaconProxySetBeaconRequest**](InterfacesIBeaconProxySetBeaconRequest.md)|  |

### Return type

[**InterfacesIBeaconProxySetBeacon200Response**](InterfacesIBeaconProxySetBeacon200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

