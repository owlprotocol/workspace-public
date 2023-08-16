# IContractURIApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIContractURIContractURI**](IContractURIApi.md#interfacesIContractURIContractURI) | **POST** /{networkId}/interface/IContractURI/read/{address}/contractURI | IContractURI.contractURI
[**interfacesIContractURISetContractURI**](IContractURIApi.md#interfacesIContractURISetContractURI) | **POST** /{networkId}/interface/IContractURI/write/{address}/setContractURI | IContractURI.setContractURI



## interfacesIContractURIContractURI

> InterfacesIContractURIContractURI200Response interfacesIContractURIContractURI(networkId, address, interfacesIBeaconImplementationRequest)

IContractURI.contractURI

Read &#x60;contractURI()&#x60; on an instance of &#x60;IContractURI&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IContractURIApi;

IContractURIApi apiInstance = new IContractURIApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest = new InterfacesIBeaconImplementationRequest(); // InterfacesIBeaconImplementationRequest | 
try {
    InterfacesIContractURIContractURI200Response result = apiInstance.interfacesIContractURIContractURI(networkId, address, interfacesIBeaconImplementationRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IContractURIApi#interfacesIContractURIContractURI");
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

[**InterfacesIContractURIContractURI200Response**](InterfacesIContractURIContractURI200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIContractURISetContractURI

> InterfacesIContractURISetContractURI200Response interfacesIContractURISetContractURI(networkId, address, interfacesIContractURISetContractURIRequest)

IContractURI.setContractURI

Write &#x60;setContractURI(uri)&#x60; on an instance of &#x60;IContractURI&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IContractURIApi;

IContractURIApi apiInstance = new IContractURIApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIContractURISetContractURIRequest interfacesIContractURISetContractURIRequest = new InterfacesIContractURISetContractURIRequest(); // InterfacesIContractURISetContractURIRequest | 
try {
    InterfacesIContractURISetContractURI200Response result = apiInstance.interfacesIContractURISetContractURI(networkId, address, interfacesIContractURISetContractURIRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IContractURIApi#interfacesIContractURISetContractURI");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIContractURISetContractURIRequest** | [**InterfacesIContractURISetContractURIRequest**](InterfacesIContractURISetContractURIRequest.md)|  |

### Return type

[**InterfacesIContractURISetContractURI200Response**](InterfacesIContractURISetContractURI200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

