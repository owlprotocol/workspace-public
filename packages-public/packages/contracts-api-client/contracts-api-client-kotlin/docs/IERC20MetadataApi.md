# IERC20MetadataApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIERC20MetadataAllowance**](IERC20MetadataApi.md#interfacesIERC20MetadataAllowance) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/allowance | IERC20Metadata.allowance
[**interfacesIERC20MetadataApprove**](IERC20MetadataApi.md#interfacesIERC20MetadataApprove) | **POST** /{networkId}/interface/IERC20Metadata/write/{address}/approve | IERC20Metadata.approve
[**interfacesIERC20MetadataBalanceOf**](IERC20MetadataApi.md#interfacesIERC20MetadataBalanceOf) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/balanceOf | IERC20Metadata.balanceOf
[**interfacesIERC20MetadataDecimals**](IERC20MetadataApi.md#interfacesIERC20MetadataDecimals) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/decimals | IERC20Metadata.decimals
[**interfacesIERC20MetadataName**](IERC20MetadataApi.md#interfacesIERC20MetadataName) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/name | IERC20Metadata.name
[**interfacesIERC20MetadataSymbol**](IERC20MetadataApi.md#interfacesIERC20MetadataSymbol) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/symbol | IERC20Metadata.symbol
[**interfacesIERC20MetadataTotalSupply**](IERC20MetadataApi.md#interfacesIERC20MetadataTotalSupply) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/totalSupply | IERC20Metadata.totalSupply
[**interfacesIERC20MetadataTransfer**](IERC20MetadataApi.md#interfacesIERC20MetadataTransfer) | **POST** /{networkId}/interface/IERC20Metadata/write/{address}/transfer | IERC20Metadata.transfer
[**interfacesIERC20MetadataTransferFrom**](IERC20MetadataApi.md#interfacesIERC20MetadataTransferFrom) | **POST** /{networkId}/interface/IERC20Metadata/write/{address}/transferFrom | IERC20Metadata.transferFrom


<a id="interfacesIERC20MetadataAllowance"></a>
# **interfacesIERC20MetadataAllowance**
> InterfacesIERC20Allowance200Response interfacesIERC20MetadataAllowance(networkId, address, interfacesIERC20AllowanceRequest)

IERC20Metadata.allowance

Read &#x60;allowance(owner,spender)&#x60; on an instance of &#x60;IERC20Metadata&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC20MetadataApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC20AllowanceRequest : InterfacesIERC20AllowanceRequest =  // InterfacesIERC20AllowanceRequest | 
try {
    val result : InterfacesIERC20Allowance200Response = apiInstance.interfacesIERC20MetadataAllowance(networkId, address, interfacesIERC20AllowanceRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC20MetadataApi#interfacesIERC20MetadataAllowance")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC20MetadataApi#interfacesIERC20MetadataAllowance")
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

<a id="interfacesIERC20MetadataApprove"></a>
# **interfacesIERC20MetadataApprove**
> InterfacesIERC20Approve200Response interfacesIERC20MetadataApprove(networkId, address, interfacesIERC20ApproveRequest)

IERC20Metadata.approve

Write &#x60;approve(spender,amount)&#x60; on an instance of &#x60;IERC20Metadata&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC20MetadataApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC20ApproveRequest : InterfacesIERC20ApproveRequest =  // InterfacesIERC20ApproveRequest | 
try {
    val result : InterfacesIERC20Approve200Response = apiInstance.interfacesIERC20MetadataApprove(networkId, address, interfacesIERC20ApproveRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC20MetadataApi#interfacesIERC20MetadataApprove")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC20MetadataApi#interfacesIERC20MetadataApprove")
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

<a id="interfacesIERC20MetadataBalanceOf"></a>
# **interfacesIERC20MetadataBalanceOf**
> InterfacesIERC20BalanceOf200Response interfacesIERC20MetadataBalanceOf(networkId, address, interfacesIERC1820GetManagerRequest)

IERC20Metadata.balanceOf

Read &#x60;balanceOf(account)&#x60; on an instance of &#x60;IERC20Metadata&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC20MetadataApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC1820GetManagerRequest : InterfacesIERC1820GetManagerRequest =  // InterfacesIERC1820GetManagerRequest | 
try {
    val result : InterfacesIERC20BalanceOf200Response = apiInstance.interfacesIERC20MetadataBalanceOf(networkId, address, interfacesIERC1820GetManagerRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC20MetadataApi#interfacesIERC20MetadataBalanceOf")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC20MetadataApi#interfacesIERC20MetadataBalanceOf")
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

<a id="interfacesIERC20MetadataDecimals"></a>
# **interfacesIERC20MetadataDecimals**
> InterfacesIERC20MetadataDecimals200Response interfacesIERC20MetadataDecimals(networkId, address, interfacesIBeaconImplementationRequest)

IERC20Metadata.decimals

Read &#x60;decimals()&#x60; on an instance of &#x60;IERC20Metadata&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC20MetadataApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIBeaconImplementationRequest : InterfacesIBeaconImplementationRequest =  // InterfacesIBeaconImplementationRequest | 
try {
    val result : InterfacesIERC20MetadataDecimals200Response = apiInstance.interfacesIERC20MetadataDecimals(networkId, address, interfacesIBeaconImplementationRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC20MetadataApi#interfacesIERC20MetadataDecimals")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC20MetadataApi#interfacesIERC20MetadataDecimals")
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

[**InterfacesIERC20MetadataDecimals200Response**](InterfacesIERC20MetadataDecimals200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC20MetadataName"></a>
# **interfacesIERC20MetadataName**
> InterfacesIContractURIContractURI200Response interfacesIERC20MetadataName(networkId, address, interfacesIBeaconImplementationRequest)

IERC20Metadata.name

Read &#x60;name()&#x60; on an instance of &#x60;IERC20Metadata&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC20MetadataApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIBeaconImplementationRequest : InterfacesIBeaconImplementationRequest =  // InterfacesIBeaconImplementationRequest | 
try {
    val result : InterfacesIContractURIContractURI200Response = apiInstance.interfacesIERC20MetadataName(networkId, address, interfacesIBeaconImplementationRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC20MetadataApi#interfacesIERC20MetadataName")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC20MetadataApi#interfacesIERC20MetadataName")
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

[**InterfacesIContractURIContractURI200Response**](InterfacesIContractURIContractURI200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC20MetadataSymbol"></a>
# **interfacesIERC20MetadataSymbol**
> InterfacesIContractURIContractURI200Response interfacesIERC20MetadataSymbol(networkId, address, interfacesIBeaconImplementationRequest)

IERC20Metadata.symbol

Read &#x60;symbol()&#x60; on an instance of &#x60;IERC20Metadata&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC20MetadataApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIBeaconImplementationRequest : InterfacesIBeaconImplementationRequest =  // InterfacesIBeaconImplementationRequest | 
try {
    val result : InterfacesIContractURIContractURI200Response = apiInstance.interfacesIERC20MetadataSymbol(networkId, address, interfacesIBeaconImplementationRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC20MetadataApi#interfacesIERC20MetadataSymbol")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC20MetadataApi#interfacesIERC20MetadataSymbol")
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

[**InterfacesIContractURIContractURI200Response**](InterfacesIContractURIContractURI200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIERC20MetadataTotalSupply"></a>
# **interfacesIERC20MetadataTotalSupply**
> InterfacesIERC20TotalSupply200Response interfacesIERC20MetadataTotalSupply(networkId, address, interfacesIBeaconImplementationRequest)

IERC20Metadata.totalSupply

Read &#x60;totalSupply()&#x60; on an instance of &#x60;IERC20Metadata&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC20MetadataApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIBeaconImplementationRequest : InterfacesIBeaconImplementationRequest =  // InterfacesIBeaconImplementationRequest | 
try {
    val result : InterfacesIERC20TotalSupply200Response = apiInstance.interfacesIERC20MetadataTotalSupply(networkId, address, interfacesIBeaconImplementationRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC20MetadataApi#interfacesIERC20MetadataTotalSupply")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC20MetadataApi#interfacesIERC20MetadataTotalSupply")
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

<a id="interfacesIERC20MetadataTransfer"></a>
# **interfacesIERC20MetadataTransfer**
> InterfacesIERC20Transfer200Response interfacesIERC20MetadataTransfer(networkId, address, interfacesIERC20TransferRequest)

IERC20Metadata.transfer

Write &#x60;transfer(to,amount)&#x60; on an instance of &#x60;IERC20Metadata&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC20MetadataApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC20TransferRequest : InterfacesIERC20TransferRequest =  // InterfacesIERC20TransferRequest | 
try {
    val result : InterfacesIERC20Transfer200Response = apiInstance.interfacesIERC20MetadataTransfer(networkId, address, interfacesIERC20TransferRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC20MetadataApi#interfacesIERC20MetadataTransfer")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC20MetadataApi#interfacesIERC20MetadataTransfer")
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

<a id="interfacesIERC20MetadataTransferFrom"></a>
# **interfacesIERC20MetadataTransferFrom**
> InterfacesIERC20TransferFrom200Response interfacesIERC20MetadataTransferFrom(networkId, address, interfacesIERC20TransferFromRequest)

IERC20Metadata.transferFrom

Write &#x60;transferFrom(from,to,amount)&#x60; on an instance of &#x60;IERC20Metadata&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IERC20MetadataApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC20TransferFromRequest : InterfacesIERC20TransferFromRequest =  // InterfacesIERC20TransferFromRequest | 
try {
    val result : InterfacesIERC20TransferFrom200Response = apiInstance.interfacesIERC20MetadataTransferFrom(networkId, address, interfacesIERC20TransferFromRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IERC20MetadataApi#interfacesIERC20MetadataTransferFrom")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IERC20MetadataApi#interfacesIERC20MetadataTransferFrom")
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

