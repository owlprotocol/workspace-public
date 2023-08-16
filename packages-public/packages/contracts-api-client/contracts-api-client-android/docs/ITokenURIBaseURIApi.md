# ITokenURIBaseURIApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesITokenURIBaseURIBaseURI**](ITokenURIBaseURIApi.md#interfacesITokenURIBaseURIBaseURI) | **POST** /{networkId}/interface/ITokenURIBaseURI/read/{address}/baseURI | ITokenURIBaseURI.baseURI
[**interfacesITokenURIBaseURISetTokenURIBaseURI**](ITokenURIBaseURIApi.md#interfacesITokenURIBaseURISetTokenURIBaseURI) | **POST** /{networkId}/interface/ITokenURIBaseURI/write/{address}/setTokenURIBaseURI | ITokenURIBaseURI.setTokenURIBaseURI



## interfacesITokenURIBaseURIBaseURI

> InterfacesIContractURIContractURI200Response interfacesITokenURIBaseURIBaseURI(networkId, address, interfacesIBeaconImplementationRequest)

ITokenURIBaseURI.baseURI

Read &#x60;baseURI()&#x60; on an instance of &#x60;ITokenURIBaseURI&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.ITokenURIBaseURIApi;

ITokenURIBaseURIApi apiInstance = new ITokenURIBaseURIApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest = new InterfacesIBeaconImplementationRequest(); // InterfacesIBeaconImplementationRequest | 
try {
    InterfacesIContractURIContractURI200Response result = apiInstance.interfacesITokenURIBaseURIBaseURI(networkId, address, interfacesIBeaconImplementationRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ITokenURIBaseURIApi#interfacesITokenURIBaseURIBaseURI");
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


## interfacesITokenURIBaseURISetTokenURIBaseURI

> InterfacesIContractURISetContractURI200Response interfacesITokenURIBaseURISetTokenURIBaseURI(networkId, address, interfacesIContractURISetContractURIRequest)

ITokenURIBaseURI.setTokenURIBaseURI

Write &#x60;setTokenURIBaseURI(uri)&#x60; on an instance of &#x60;ITokenURIBaseURI&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.ITokenURIBaseURIApi;

ITokenURIBaseURIApi apiInstance = new ITokenURIBaseURIApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIContractURISetContractURIRequest interfacesIContractURISetContractURIRequest = new InterfacesIContractURISetContractURIRequest(); // InterfacesIContractURISetContractURIRequest | 
try {
    InterfacesIContractURISetContractURI200Response result = apiInstance.interfacesITokenURIBaseURISetTokenURIBaseURI(networkId, address, interfacesIContractURISetContractURIRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ITokenURIBaseURIApi#interfacesITokenURIBaseURISetTokenURIBaseURI");
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

