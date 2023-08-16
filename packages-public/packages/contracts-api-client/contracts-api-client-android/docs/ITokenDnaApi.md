# ITokenDnaApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesITokenDnaGetDna**](ITokenDnaApi.md#interfacesITokenDnaGetDna) | **POST** /{networkId}/interface/ITokenDna/read/{address}/getDna | ITokenDna.getDna
[**interfacesITokenDnaGetDnaBatch**](ITokenDnaApi.md#interfacesITokenDnaGetDnaBatch) | **POST** /{networkId}/interface/ITokenDna/read/{address}/getDnaBatch | ITokenDna.getDnaBatch
[**interfacesITokenDnaSetDna**](ITokenDnaApi.md#interfacesITokenDnaSetDna) | **POST** /{networkId}/interface/ITokenDna/write/{address}/setDna | ITokenDna.setDna
[**interfacesITokenDnaSetDnaBatch**](ITokenDnaApi.md#interfacesITokenDnaSetDnaBatch) | **POST** /{networkId}/interface/ITokenDna/write/{address}/setDnaBatch | ITokenDna.setDnaBatch



## interfacesITokenDnaGetDna

> InterfacesITokenDnaGetDna200Response interfacesITokenDnaGetDna(networkId, address, interfacesIERC721GetApprovedRequest)

ITokenDna.getDna

Read &#x60;getDna(tokenId)&#x60; on an instance of &#x60;ITokenDna&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.ITokenDnaApi;

ITokenDnaApi apiInstance = new ITokenDnaApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC721GetApprovedRequest interfacesIERC721GetApprovedRequest = new InterfacesIERC721GetApprovedRequest(); // InterfacesIERC721GetApprovedRequest | 
try {
    InterfacesITokenDnaGetDna200Response result = apiInstance.interfacesITokenDnaGetDna(networkId, address, interfacesIERC721GetApprovedRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ITokenDnaApi#interfacesITokenDnaGetDna");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIERC721GetApprovedRequest** | [**InterfacesIERC721GetApprovedRequest**](InterfacesIERC721GetApprovedRequest.md)|  |

### Return type

[**InterfacesITokenDnaGetDna200Response**](InterfacesITokenDnaGetDna200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesITokenDnaGetDnaBatch

> InterfacesITokenDnaGetDnaBatch200Response interfacesITokenDnaGetDnaBatch(networkId, address, interfacesITokenDnaGetDnaBatchRequest)

ITokenDna.getDnaBatch

Read &#x60;getDnaBatch(tokenId)&#x60; on an instance of &#x60;ITokenDna&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.ITokenDnaApi;

ITokenDnaApi apiInstance = new ITokenDnaApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesITokenDnaGetDnaBatchRequest interfacesITokenDnaGetDnaBatchRequest = new InterfacesITokenDnaGetDnaBatchRequest(); // InterfacesITokenDnaGetDnaBatchRequest | 
try {
    InterfacesITokenDnaGetDnaBatch200Response result = apiInstance.interfacesITokenDnaGetDnaBatch(networkId, address, interfacesITokenDnaGetDnaBatchRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ITokenDnaApi#interfacesITokenDnaGetDnaBatch");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesITokenDnaGetDnaBatchRequest** | [**InterfacesITokenDnaGetDnaBatchRequest**](InterfacesITokenDnaGetDnaBatchRequest.md)|  |

### Return type

[**InterfacesITokenDnaGetDnaBatch200Response**](InterfacesITokenDnaGetDnaBatch200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesITokenDnaSetDna

> InterfacesITokenDnaSetDna200Response interfacesITokenDnaSetDna(networkId, address, interfacesITokenDnaSetDnaRequest)

ITokenDna.setDna

Write &#x60;setDna(tokenId,dna)&#x60; on an instance of &#x60;ITokenDna&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.ITokenDnaApi;

ITokenDnaApi apiInstance = new ITokenDnaApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesITokenDnaSetDnaRequest interfacesITokenDnaSetDnaRequest = new InterfacesITokenDnaSetDnaRequest(); // InterfacesITokenDnaSetDnaRequest | 
try {
    InterfacesITokenDnaSetDna200Response result = apiInstance.interfacesITokenDnaSetDna(networkId, address, interfacesITokenDnaSetDnaRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ITokenDnaApi#interfacesITokenDnaSetDna");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesITokenDnaSetDnaRequest** | [**InterfacesITokenDnaSetDnaRequest**](InterfacesITokenDnaSetDnaRequest.md)|  |

### Return type

[**InterfacesITokenDnaSetDna200Response**](InterfacesITokenDnaSetDna200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesITokenDnaSetDnaBatch

> InterfacesITokenDnaSetDnaBatch200Response interfacesITokenDnaSetDnaBatch(networkId, address, interfacesITokenDnaSetDnaBatchRequest)

ITokenDna.setDnaBatch

Write &#x60;setDnaBatch(tokenId,dna)&#x60; on an instance of &#x60;ITokenDna&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.ITokenDnaApi;

ITokenDnaApi apiInstance = new ITokenDnaApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesITokenDnaSetDnaBatchRequest interfacesITokenDnaSetDnaBatchRequest = new InterfacesITokenDnaSetDnaBatchRequest(); // InterfacesITokenDnaSetDnaBatchRequest | 
try {
    InterfacesITokenDnaSetDnaBatch200Response result = apiInstance.interfacesITokenDnaSetDnaBatch(networkId, address, interfacesITokenDnaSetDnaBatchRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ITokenDnaApi#interfacesITokenDnaSetDnaBatch");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesITokenDnaSetDnaBatchRequest** | [**InterfacesITokenDnaSetDnaBatchRequest**](InterfacesITokenDnaSetDnaBatchRequest.md)|  |

### Return type

[**InterfacesITokenDnaSetDnaBatch200Response**](InterfacesITokenDnaSetDnaBatch200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

