# IChainlinkAnyApiClientApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIChainlinkAnyApiClientContractURI**](IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientContractURI) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/contractURI | IChainlinkAnyApiClient.contractURI
[**interfacesIChainlinkAnyApiClientDEFAULTADMINROLE**](IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientDEFAULTADMINROLE) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/DEFAULT_ADMIN_ROLE | IChainlinkAnyApiClient.DEFAULT_ADMIN_ROLE
[**interfacesIChainlinkAnyApiClientFulfill**](IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientFulfill) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/fulfill | IChainlinkAnyApiClient.fulfill
[**interfacesIChainlinkAnyApiClientGetRoleAdmin**](IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientGetRoleAdmin) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/getRoleAdmin | IChainlinkAnyApiClient.getRoleAdmin
[**interfacesIChainlinkAnyApiClientGrantRole**](IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientGrantRole) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/grantRole | IChainlinkAnyApiClient.grantRole
[**interfacesIChainlinkAnyApiClientHasRole**](IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientHasRole) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/hasRole | IChainlinkAnyApiClient.hasRole
[**interfacesIChainlinkAnyApiClientRenounceRole**](IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientRenounceRole) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/renounceRole | IChainlinkAnyApiClient.renounceRole
[**interfacesIChainlinkAnyApiClientRequest**](IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientRequest) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/request | IChainlinkAnyApiClient.request
[**interfacesIChainlinkAnyApiClientRequests**](IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientRequests) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/requests | IChainlinkAnyApiClient.requests
[**interfacesIChainlinkAnyApiClientRevokeRole**](IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientRevokeRole) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/revokeRole | IChainlinkAnyApiClient.revokeRole
[**interfacesIChainlinkAnyApiClientSetContractURI**](IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientSetContractURI) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/setContractURI | IChainlinkAnyApiClient.setContractURI
[**interfacesIChainlinkAnyApiClientSupportsInterface**](IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientSupportsInterface) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/supportsInterface | IChainlinkAnyApiClient.supportsInterface
[**interfacesIChainlinkAnyApiClientVersion**](IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientVersion) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/version | IChainlinkAnyApiClient.version
[**interfacesIChainlinkAnyApiClientWithdrawLink**](IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientWithdrawLink) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/withdrawLink | IChainlinkAnyApiClient.withdrawLink


<a id="interfacesIChainlinkAnyApiClientContractURI"></a>
# **interfacesIChainlinkAnyApiClientContractURI**
> InterfacesIContractURIContractURI200Response interfacesIChainlinkAnyApiClientContractURI(networkId, address, interfacesIBeaconImplementationRequest)

IChainlinkAnyApiClient.contractURI

Read &#x60;contractURI()&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IChainlinkAnyApiClientApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIBeaconImplementationRequest : InterfacesIBeaconImplementationRequest =  // InterfacesIBeaconImplementationRequest | 
try {
    val result : InterfacesIContractURIContractURI200Response = apiInstance.interfacesIChainlinkAnyApiClientContractURI(networkId, address, interfacesIBeaconImplementationRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientContractURI")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientContractURI")
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

<a id="interfacesIChainlinkAnyApiClientDEFAULTADMINROLE"></a>
# **interfacesIChainlinkAnyApiClientDEFAULTADMINROLE**
> InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE200Response interfacesIChainlinkAnyApiClientDEFAULTADMINROLE(networkId, address, interfacesIBeaconImplementationRequest)

IChainlinkAnyApiClient.DEFAULT_ADMIN_ROLE

Read &#x60;DEFAULT_ADMIN_ROLE()&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IChainlinkAnyApiClientApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIBeaconImplementationRequest : InterfacesIBeaconImplementationRequest =  // InterfacesIBeaconImplementationRequest | 
try {
    val result : InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE200Response = apiInstance.interfacesIChainlinkAnyApiClientDEFAULTADMINROLE(networkId, address, interfacesIBeaconImplementationRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientDEFAULTADMINROLE")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientDEFAULTADMINROLE")
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

[**InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE200Response**](InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIChainlinkAnyApiClientFulfill"></a>
# **interfacesIChainlinkAnyApiClientFulfill**
> InterfacesIChainlinkAnyApiClientFulfill200Response interfacesIChainlinkAnyApiClientFulfill(networkId, address, interfacesIChainlinkAnyApiClientFulfillRequest)

IChainlinkAnyApiClient.fulfill

Write &#x60;fulfill(reqId,reqResponseData)&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IChainlinkAnyApiClientApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIChainlinkAnyApiClientFulfillRequest : InterfacesIChainlinkAnyApiClientFulfillRequest =  // InterfacesIChainlinkAnyApiClientFulfillRequest | 
try {
    val result : InterfacesIChainlinkAnyApiClientFulfill200Response = apiInstance.interfacesIChainlinkAnyApiClientFulfill(networkId, address, interfacesIChainlinkAnyApiClientFulfillRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientFulfill")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientFulfill")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIChainlinkAnyApiClientFulfillRequest** | [**InterfacesIChainlinkAnyApiClientFulfillRequest**](InterfacesIChainlinkAnyApiClientFulfillRequest.md)|  |

### Return type

[**InterfacesIChainlinkAnyApiClientFulfill200Response**](InterfacesIChainlinkAnyApiClientFulfill200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIChainlinkAnyApiClientGetRoleAdmin"></a>
# **interfacesIChainlinkAnyApiClientGetRoleAdmin**
> InterfacesIAccessControlGetRoleAdmin200Response interfacesIChainlinkAnyApiClientGetRoleAdmin(networkId, address, interfacesIAccessControlGetRoleAdminRequest)

IChainlinkAnyApiClient.getRoleAdmin

Read &#x60;getRoleAdmin(role)&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IChainlinkAnyApiClientApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIAccessControlGetRoleAdminRequest : InterfacesIAccessControlGetRoleAdminRequest =  // InterfacesIAccessControlGetRoleAdminRequest | 
try {
    val result : InterfacesIAccessControlGetRoleAdmin200Response = apiInstance.interfacesIChainlinkAnyApiClientGetRoleAdmin(networkId, address, interfacesIAccessControlGetRoleAdminRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientGetRoleAdmin")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientGetRoleAdmin")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIAccessControlGetRoleAdminRequest** | [**InterfacesIAccessControlGetRoleAdminRequest**](InterfacesIAccessControlGetRoleAdminRequest.md)|  |

### Return type

[**InterfacesIAccessControlGetRoleAdmin200Response**](InterfacesIAccessControlGetRoleAdmin200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIChainlinkAnyApiClientGrantRole"></a>
# **interfacesIChainlinkAnyApiClientGrantRole**
> InterfacesIAccessControlGrantRole200Response interfacesIChainlinkAnyApiClientGrantRole(networkId, address, interfacesIAccessControlGrantRoleRequest)

IChainlinkAnyApiClient.grantRole

Write &#x60;grantRole(role,account)&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IChainlinkAnyApiClientApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIAccessControlGrantRoleRequest : InterfacesIAccessControlGrantRoleRequest =  // InterfacesIAccessControlGrantRoleRequest | 
try {
    val result : InterfacesIAccessControlGrantRole200Response = apiInstance.interfacesIChainlinkAnyApiClientGrantRole(networkId, address, interfacesIAccessControlGrantRoleRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientGrantRole")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientGrantRole")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIAccessControlGrantRoleRequest** | [**InterfacesIAccessControlGrantRoleRequest**](InterfacesIAccessControlGrantRoleRequest.md)|  |

### Return type

[**InterfacesIAccessControlGrantRole200Response**](InterfacesIAccessControlGrantRole200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIChainlinkAnyApiClientHasRole"></a>
# **interfacesIChainlinkAnyApiClientHasRole**
> InterfacesIAccessControlHasRole200Response interfacesIChainlinkAnyApiClientHasRole(networkId, address, interfacesIAccessControlGrantRoleRequest)

IChainlinkAnyApiClient.hasRole

Read &#x60;hasRole(role,account)&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IChainlinkAnyApiClientApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIAccessControlGrantRoleRequest : InterfacesIAccessControlGrantRoleRequest =  // InterfacesIAccessControlGrantRoleRequest | 
try {
    val result : InterfacesIAccessControlHasRole200Response = apiInstance.interfacesIChainlinkAnyApiClientHasRole(networkId, address, interfacesIAccessControlGrantRoleRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientHasRole")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientHasRole")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIAccessControlGrantRoleRequest** | [**InterfacesIAccessControlGrantRoleRequest**](InterfacesIAccessControlGrantRoleRequest.md)|  |

### Return type

[**InterfacesIAccessControlHasRole200Response**](InterfacesIAccessControlHasRole200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIChainlinkAnyApiClientRenounceRole"></a>
# **interfacesIChainlinkAnyApiClientRenounceRole**
> InterfacesIAccessControlGrantRole200Response interfacesIChainlinkAnyApiClientRenounceRole(networkId, address, interfacesIAccessControlGrantRoleRequest)

IChainlinkAnyApiClient.renounceRole

Write &#x60;renounceRole(role,account)&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IChainlinkAnyApiClientApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIAccessControlGrantRoleRequest : InterfacesIAccessControlGrantRoleRequest =  // InterfacesIAccessControlGrantRoleRequest | 
try {
    val result : InterfacesIAccessControlGrantRole200Response = apiInstance.interfacesIChainlinkAnyApiClientRenounceRole(networkId, address, interfacesIAccessControlGrantRoleRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientRenounceRole")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientRenounceRole")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIAccessControlGrantRoleRequest** | [**InterfacesIAccessControlGrantRoleRequest**](InterfacesIAccessControlGrantRoleRequest.md)|  |

### Return type

[**InterfacesIAccessControlGrantRole200Response**](InterfacesIAccessControlGrantRole200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIChainlinkAnyApiClientRequest"></a>
# **interfacesIChainlinkAnyApiClientRequest**
> InterfacesIChainlinkAnyApiClientRequest200Response interfacesIChainlinkAnyApiClientRequest(networkId, address, interfacesIChainlinkAnyApiClientRequestRequest)

IChainlinkAnyApiClient.request

Write &#x60;request(fulfillAddress,fulfillPrefixData,reqJobId,reqUrl,reqPath,reqFee)&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IChainlinkAnyApiClientApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIChainlinkAnyApiClientRequestRequest : InterfacesIChainlinkAnyApiClientRequestRequest =  // InterfacesIChainlinkAnyApiClientRequestRequest | 
try {
    val result : InterfacesIChainlinkAnyApiClientRequest200Response = apiInstance.interfacesIChainlinkAnyApiClientRequest(networkId, address, interfacesIChainlinkAnyApiClientRequestRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientRequest")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientRequest")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIChainlinkAnyApiClientRequestRequest** | [**InterfacesIChainlinkAnyApiClientRequestRequest**](InterfacesIChainlinkAnyApiClientRequestRequest.md)|  |

### Return type

[**InterfacesIChainlinkAnyApiClientRequest200Response**](InterfacesIChainlinkAnyApiClientRequest200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIChainlinkAnyApiClientRequests"></a>
# **interfacesIChainlinkAnyApiClientRequests**
> InterfacesIChainlinkAnyApiClientRequests200Response interfacesIChainlinkAnyApiClientRequests(networkId, address, interfacesIChainlinkAnyApiClientRequestsRequest)

IChainlinkAnyApiClient.requests

Read &#x60;requests()&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IChainlinkAnyApiClientApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIChainlinkAnyApiClientRequestsRequest : InterfacesIChainlinkAnyApiClientRequestsRequest =  // InterfacesIChainlinkAnyApiClientRequestsRequest | 
try {
    val result : InterfacesIChainlinkAnyApiClientRequests200Response = apiInstance.interfacesIChainlinkAnyApiClientRequests(networkId, address, interfacesIChainlinkAnyApiClientRequestsRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientRequests")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientRequests")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIChainlinkAnyApiClientRequestsRequest** | [**InterfacesIChainlinkAnyApiClientRequestsRequest**](InterfacesIChainlinkAnyApiClientRequestsRequest.md)|  |

### Return type

[**InterfacesIChainlinkAnyApiClientRequests200Response**](InterfacesIChainlinkAnyApiClientRequests200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIChainlinkAnyApiClientRevokeRole"></a>
# **interfacesIChainlinkAnyApiClientRevokeRole**
> InterfacesIAccessControlGrantRole200Response interfacesIChainlinkAnyApiClientRevokeRole(networkId, address, interfacesIAccessControlGrantRoleRequest)

IChainlinkAnyApiClient.revokeRole

Write &#x60;revokeRole(role,account)&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IChainlinkAnyApiClientApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIAccessControlGrantRoleRequest : InterfacesIAccessControlGrantRoleRequest =  // InterfacesIAccessControlGrantRoleRequest | 
try {
    val result : InterfacesIAccessControlGrantRole200Response = apiInstance.interfacesIChainlinkAnyApiClientRevokeRole(networkId, address, interfacesIAccessControlGrantRoleRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientRevokeRole")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientRevokeRole")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIAccessControlGrantRoleRequest** | [**InterfacesIAccessControlGrantRoleRequest**](InterfacesIAccessControlGrantRoleRequest.md)|  |

### Return type

[**InterfacesIAccessControlGrantRole200Response**](InterfacesIAccessControlGrantRole200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIChainlinkAnyApiClientSetContractURI"></a>
# **interfacesIChainlinkAnyApiClientSetContractURI**
> InterfacesIContractURISetContractURI200Response interfacesIChainlinkAnyApiClientSetContractURI(networkId, address, interfacesIContractURISetContractURIRequest)

IChainlinkAnyApiClient.setContractURI

Write &#x60;setContractURI(uri)&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IChainlinkAnyApiClientApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIContractURISetContractURIRequest : InterfacesIContractURISetContractURIRequest =  // InterfacesIContractURISetContractURIRequest | 
try {
    val result : InterfacesIContractURISetContractURI200Response = apiInstance.interfacesIChainlinkAnyApiClientSetContractURI(networkId, address, interfacesIContractURISetContractURIRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientSetContractURI")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientSetContractURI")
    e.printStackTrace()
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **kotlin.String**| The network id | [default to &quot;80001&quot;]
 **address** | **kotlin.String**| An ethereum address |
 **interfacesIContractURISetContractURIRequest** | [**InterfacesIContractURISetContractURIRequest**](InterfacesIContractURISetContractURIRequest.md)|  |

### Return type

[**InterfacesIContractURISetContractURI200Response**](InterfacesIContractURISetContractURI200Response.md)

### Authorization


Configure Authorization:
    ApiClient.apiKey["x-api-key"] = ""
    ApiClient.apiKeyPrefix["x-api-key"] = ""

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a id="interfacesIChainlinkAnyApiClientSupportsInterface"></a>
# **interfacesIChainlinkAnyApiClientSupportsInterface**
> InterfacesIERC165SupportsInterface200Response interfacesIChainlinkAnyApiClientSupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest)

IChainlinkAnyApiClient.supportsInterface

Read &#x60;supportsInterface(interfaceId)&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IChainlinkAnyApiClientApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC165SupportsInterfaceRequest : InterfacesIERC165SupportsInterfaceRequest =  // InterfacesIERC165SupportsInterfaceRequest | 
try {
    val result : InterfacesIERC165SupportsInterface200Response = apiInstance.interfacesIChainlinkAnyApiClientSupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientSupportsInterface")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientSupportsInterface")
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

<a id="interfacesIChainlinkAnyApiClientVersion"></a>
# **interfacesIChainlinkAnyApiClientVersion**
> InterfacesIContractURIContractURI200Response interfacesIChainlinkAnyApiClientVersion(networkId, address, interfacesIBeaconImplementationRequest)

IChainlinkAnyApiClient.version

Read &#x60;version()&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IChainlinkAnyApiClientApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIBeaconImplementationRequest : InterfacesIBeaconImplementationRequest =  // InterfacesIBeaconImplementationRequest | 
try {
    val result : InterfacesIContractURIContractURI200Response = apiInstance.interfacesIChainlinkAnyApiClientVersion(networkId, address, interfacesIBeaconImplementationRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientVersion")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientVersion")
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

<a id="interfacesIChainlinkAnyApiClientWithdrawLink"></a>
# **interfacesIChainlinkAnyApiClientWithdrawLink**
> InterfacesIERC20Transfer200Response interfacesIChainlinkAnyApiClientWithdrawLink(networkId, address, interfacesIERC20TransferRequest)

IChainlinkAnyApiClient.withdrawLink

Write &#x60;withdrawLink(to,amount)&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IChainlinkAnyApiClientApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIERC20TransferRequest : InterfacesIERC20TransferRequest =  // InterfacesIERC20TransferRequest | 
try {
    val result : InterfacesIERC20Transfer200Response = apiInstance.interfacesIChainlinkAnyApiClientWithdrawLink(networkId, address, interfacesIERC20TransferRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientWithdrawLink")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IChainlinkAnyApiClientApi#interfacesIChainlinkAnyApiClientWithdrawLink")
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

