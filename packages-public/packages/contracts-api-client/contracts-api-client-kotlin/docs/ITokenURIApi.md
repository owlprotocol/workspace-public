# ITokenURIApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesITokenURITokenURI**](ITokenURIApi.md#interfacesITokenURITokenURI) | **POST** /{networkId}/interface/ITokenURI/read/{address}/tokenURI | ITokenURI.tokenURI


<a id="interfacesITokenURITokenURI"></a>
# **interfacesITokenURITokenURI**
> InterfacesIERC721MetadataTokenURI200Response interfacesITokenURITokenURI(networkId, address, interfacesIERC721GetApprovedRequest)

ITokenURI.tokenURI

Read &#x60;tokenURI(tokenId)&#x60; on an instance of &#x60;ITokenURI&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = ITokenURIApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC721GetApprovedRequest : InterfacesIERC721GetApprovedRequest =  // InterfacesIERC721GetApprovedRequest | 
try {
    val result : InterfacesIERC721MetadataTokenURI200Response = apiInstance.interfacesITokenURITokenURI(networkId, address, interfacesIERC721GetApprovedRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling ITokenURIApi#interfacesITokenURITokenURI")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling ITokenURIApi#interfacesITokenURITokenURI")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC721GetApprovedRequest** | [**InterfacesIERC721GetApprovedRequest**](InterfacesIERC721GetApprovedRequest.md)|  |

### Return type

[**InterfacesIERC721MetadataTokenURI200Response**](InterfacesIERC721MetadataTokenURI200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

