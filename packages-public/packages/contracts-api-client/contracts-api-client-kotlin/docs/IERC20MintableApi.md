# IERC20MintableApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC20MintableMint**](IERC20MintableApi.md#interfacesIERC20MintableMint) | **POST** /{networkId}/interface/IERC20Mintable/write/{address}/mint | IERC20Mintable.mint


<a id="interfacesIERC20MintableMint"></a>
# **interfacesIERC20MintableMint**
> InterfacesIERC20Transfer200Response interfacesIERC20MintableMint(networkId, address, interfacesIERC20TransferRequest)

IERC20Mintable.mint

Write &#x60;mint(to,amount)&#x60; on an instance of &#x60;IERC20Mintable&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC20MintableApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC20TransferRequest : InterfacesIERC20TransferRequest =  // InterfacesIERC20TransferRequest | 
try {
    val result : InterfacesIERC20Transfer200Response = apiInstance.interfacesIERC20MintableMint(networkId, address, interfacesIERC20TransferRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC20MintableApi#interfacesIERC20MintableMint")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC20MintableApi#interfacesIERC20MintableMint")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC20TransferRequest** | [**InterfacesIERC20TransferRequest**](InterfacesIERC20TransferRequest.md)|  |

### Return type

[**InterfacesIERC20Transfer200Response**](InterfacesIERC20Transfer200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

