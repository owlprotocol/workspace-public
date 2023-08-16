# IERC2981SetterApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC2981SetterSetDefaultRoyalty**](IERC2981SetterApi.md#interfacesIERC2981SetterSetDefaultRoyalty) | **POST** /{networkId}/interface/IERC2981Setter/write/{address}/setDefaultRoyalty | IERC2981Setter.setDefaultRoyalty
[**interfacesIERC2981SetterSetTokenRoyalty**](IERC2981SetterApi.md#interfacesIERC2981SetterSetTokenRoyalty) | **POST** /{networkId}/interface/IERC2981Setter/write/{address}/setTokenRoyalty | IERC2981Setter.setTokenRoyalty



## interfacesIERC2981SetterSetDefaultRoyalty

> InterfacesIERC2981SetterSetDefaultRoyalty200Response interfacesIERC2981SetterSetDefaultRoyalty(networkId, address, interfacesIERC2981SetterSetDefaultRoyaltyRequest)

IERC2981Setter.setDefaultRoyalty

Write &#x60;setDefaultRoyalty(receiver,feeNumerator)&#x60; on an instance of &#x60;IERC2981Setter&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC2981SetterApi;

IERC2981SetterApi apiInstance = new IERC2981SetterApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC2981SetterSetDefaultRoyaltyRequest interfacesIERC2981SetterSetDefaultRoyaltyRequest = new InterfacesIERC2981SetterSetDefaultRoyaltyRequest(); // InterfacesIERC2981SetterSetDefaultRoyaltyRequest | 
try {
    InterfacesIERC2981SetterSetDefaultRoyalty200Response result = apiInstance.interfacesIERC2981SetterSetDefaultRoyalty(networkId, address, interfacesIERC2981SetterSetDefaultRoyaltyRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC2981SetterApi#interfacesIERC2981SetterSetDefaultRoyalty");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIERC2981SetterSetDefaultRoyaltyRequest** | [**InterfacesIERC2981SetterSetDefaultRoyaltyRequest**](InterfacesIERC2981SetterSetDefaultRoyaltyRequest.md)|  |

### Return type

[**InterfacesIERC2981SetterSetDefaultRoyalty200Response**](InterfacesIERC2981SetterSetDefaultRoyalty200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIERC2981SetterSetTokenRoyalty

> InterfacesIERC2981SetterSetTokenRoyalty200Response interfacesIERC2981SetterSetTokenRoyalty(networkId, address, interfacesIERC2981SetterSetTokenRoyaltyRequest)

IERC2981Setter.setTokenRoyalty

Write &#x60;setTokenRoyalty(tokenId,receiver,feeNumerator)&#x60; on an instance of &#x60;IERC2981Setter&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IERC2981SetterApi;

IERC2981SetterApi apiInstance = new IERC2981SetterApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIERC2981SetterSetTokenRoyaltyRequest interfacesIERC2981SetterSetTokenRoyaltyRequest = new InterfacesIERC2981SetterSetTokenRoyaltyRequest(); // InterfacesIERC2981SetterSetTokenRoyaltyRequest | 
try {
    InterfacesIERC2981SetterSetTokenRoyalty200Response result = apiInstance.interfacesIERC2981SetterSetTokenRoyalty(networkId, address, interfacesIERC2981SetterSetTokenRoyaltyRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IERC2981SetterApi#interfacesIERC2981SetterSetTokenRoyalty");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIERC2981SetterSetTokenRoyaltyRequest** | [**InterfacesIERC2981SetterSetTokenRoyaltyRequest**](InterfacesIERC2981SetterSetTokenRoyaltyRequest.md)|  |

### Return type

[**InterfacesIERC2981SetterSetTokenRoyalty200Response**](InterfacesIERC2981SetterSetTokenRoyalty200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

