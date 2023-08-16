# IERC165Api

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC165SupportsInterface**](IERC165Api.md#interfacesIERC165SupportsInterface) | **POST** /{networkId}/interface/IERC165/read/{address}/supportsInterface | IERC165.supportsInterface


<a id="interfacesIERC165SupportsInterface"></a>
# **interfacesIERC165SupportsInterface**
> InterfacesIERC165SupportsInterface200Response interfacesIERC165SupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest)

IERC165.supportsInterface

Read &#x60;supportsInterface(interfaceId)&#x60; on an instance of &#x60;IERC165&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC165Api()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC165SupportsInterfaceRequest : InterfacesIERC165SupportsInterfaceRequest =  // InterfacesIERC165SupportsInterfaceRequest | 
try {
    val result : InterfacesIERC165SupportsInterface200Response = apiInstance.interfacesIERC165SupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC165Api#interfacesIERC165SupportsInterface")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC165Api#interfacesIERC165SupportsInterface")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC165SupportsInterfaceRequest** | [**InterfacesIERC165SupportsInterfaceRequest**](InterfacesIERC165SupportsInterfaceRequest.md)|  |

### Return type

[**InterfacesIERC165SupportsInterface200Response**](InterfacesIERC165SupportsInterface200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

