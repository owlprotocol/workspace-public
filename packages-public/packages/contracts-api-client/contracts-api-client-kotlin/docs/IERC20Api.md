# IERC20Api

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC20Allowance**](IERC20Api.md#interfacesIERC20Allowance) | **POST** /{networkId}/interface/IERC20/read/{address}/allowance | IERC20.allowance
[**interfacesIERC20Approve**](IERC20Api.md#interfacesIERC20Approve) | **POST** /{networkId}/interface/IERC20/write/{address}/approve | IERC20.approve
[**interfacesIERC20BalanceOf**](IERC20Api.md#interfacesIERC20BalanceOf) | **POST** /{networkId}/interface/IERC20/read/{address}/balanceOf | IERC20.balanceOf
[**interfacesIERC20TotalSupply**](IERC20Api.md#interfacesIERC20TotalSupply) | **POST** /{networkId}/interface/IERC20/read/{address}/totalSupply | IERC20.totalSupply
[**interfacesIERC20Transfer**](IERC20Api.md#interfacesIERC20Transfer) | **POST** /{networkId}/interface/IERC20/write/{address}/transfer | IERC20.transfer
[**interfacesIERC20TransferFrom**](IERC20Api.md#interfacesIERC20TransferFrom) | **POST** /{networkId}/interface/IERC20/write/{address}/transferFrom | IERC20.transferFrom


<a id="interfacesIERC20Allowance"></a>
# **interfacesIERC20Allowance**
> InterfacesIERC20Allowance200Response interfacesIERC20Allowance(networkId, address, interfacesIERC20AllowanceRequest)

IERC20.allowance

Read &#x60;allowance(owner,spender)&#x60; on an instance of &#x60;IERC20&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC20Api()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC20AllowanceRequest : InterfacesIERC20AllowanceRequest =  // InterfacesIERC20AllowanceRequest | 
try {
    val result : InterfacesIERC20Allowance200Response = apiInstance.interfacesIERC20Allowance(networkId, address, interfacesIERC20AllowanceRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC20Api#interfacesIERC20Allowance")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC20Api#interfacesIERC20Allowance")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC20AllowanceRequest** | [**InterfacesIERC20AllowanceRequest**](InterfacesIERC20AllowanceRequest.md)|  |

### Return type

[**InterfacesIERC20Allowance200Response**](InterfacesIERC20Allowance200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC20Approve"></a>
# **interfacesIERC20Approve**
> InterfacesIERC20Approve200Response interfacesIERC20Approve(networkId, address, interfacesIERC20ApproveRequest)

IERC20.approve

Write &#x60;approve(spender,amount)&#x60; on an instance of &#x60;IERC20&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC20Api()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC20ApproveRequest : InterfacesIERC20ApproveRequest =  // InterfacesIERC20ApproveRequest | 
try {
    val result : InterfacesIERC20Approve200Response = apiInstance.interfacesIERC20Approve(networkId, address, interfacesIERC20ApproveRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC20Api#interfacesIERC20Approve")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC20Api#interfacesIERC20Approve")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC20ApproveRequest** | [**InterfacesIERC20ApproveRequest**](InterfacesIERC20ApproveRequest.md)|  |

### Return type

[**InterfacesIERC20Approve200Response**](InterfacesIERC20Approve200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC20BalanceOf"></a>
# **interfacesIERC20BalanceOf**
> InterfacesIERC20BalanceOf200Response interfacesIERC20BalanceOf(networkId, address, interfacesIERC1820GetManagerRequest)

IERC20.balanceOf

Read &#x60;balanceOf(account)&#x60; on an instance of &#x60;IERC20&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC20Api()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC1820GetManagerRequest : InterfacesIERC1820GetManagerRequest =  // InterfacesIERC1820GetManagerRequest | 
try {
    val result : InterfacesIERC20BalanceOf200Response = apiInstance.interfacesIERC20BalanceOf(networkId, address, interfacesIERC1820GetManagerRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC20Api#interfacesIERC20BalanceOf")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC20Api#interfacesIERC20BalanceOf")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC1820GetManagerRequest** | [**InterfacesIERC1820GetManagerRequest**](InterfacesIERC1820GetManagerRequest.md)|  |

### Return type

[**InterfacesIERC20BalanceOf200Response**](InterfacesIERC20BalanceOf200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC20TotalSupply"></a>
# **interfacesIERC20TotalSupply**
> InterfacesIERC20TotalSupply200Response interfacesIERC20TotalSupply(networkId, address, interfacesIBeaconImplementationRequest)

IERC20.totalSupply

Read &#x60;totalSupply()&#x60; on an instance of &#x60;IERC20&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC20Api()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIBeaconImplementationRequest : InterfacesIBeaconImplementationRequest =  // InterfacesIBeaconImplementationRequest | 
try {
    val result : InterfacesIERC20TotalSupply200Response = apiInstance.interfacesIERC20TotalSupply(networkId, address, interfacesIBeaconImplementationRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC20Api#interfacesIERC20TotalSupply")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC20Api#interfacesIERC20TotalSupply")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIBeaconImplementationRequest** | [**InterfacesIBeaconImplementationRequest**](InterfacesIBeaconImplementationRequest.md)|  |

### Return type

[**InterfacesIERC20TotalSupply200Response**](InterfacesIERC20TotalSupply200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC20Transfer"></a>
# **interfacesIERC20Transfer**
> InterfacesIERC20Transfer200Response interfacesIERC20Transfer(networkId, address, interfacesIERC20TransferRequest)

IERC20.transfer

Write &#x60;transfer(to,amount)&#x60; on an instance of &#x60;IERC20&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC20Api()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC20TransferRequest : InterfacesIERC20TransferRequest =  // InterfacesIERC20TransferRequest | 
try {
    val result : InterfacesIERC20Transfer200Response = apiInstance.interfacesIERC20Transfer(networkId, address, interfacesIERC20TransferRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC20Api#interfacesIERC20Transfer")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC20Api#interfacesIERC20Transfer")
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

<a id="interfacesIERC20TransferFrom"></a>
# **interfacesIERC20TransferFrom**
> InterfacesIERC20TransferFrom200Response interfacesIERC20TransferFrom(networkId, address, interfacesIERC20TransferFromRequest)

IERC20.transferFrom

Write &#x60;transferFrom(from,to,amount)&#x60; on an instance of &#x60;IERC20&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC20Api()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC20TransferFromRequest : InterfacesIERC20TransferFromRequest =  // InterfacesIERC20TransferFromRequest | 
try {
    val result : InterfacesIERC20TransferFrom200Response = apiInstance.interfacesIERC20TransferFrom(networkId, address, interfacesIERC20TransferFromRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC20Api#interfacesIERC20TransferFrom")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC20Api#interfacesIERC20TransferFrom")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIERC20TransferFromRequest** | [**InterfacesIERC20TransferFromRequest**](InterfacesIERC20TransferFromRequest.md)|  |

### Return type

[**InterfacesIERC20TransferFrom200Response**](InterfacesIERC20TransferFrom200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

