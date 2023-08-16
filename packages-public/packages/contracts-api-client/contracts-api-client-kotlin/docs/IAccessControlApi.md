# IAccessControlApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIAccessControlGetRoleAdmin**](IAccessControlApi.md#interfacesIAccessControlGetRoleAdmin) | **POST** /{networkId}/interface/IAccessControl/read/{address}/getRoleAdmin | IAccessControl.getRoleAdmin
[**interfacesIAccessControlGrantRole**](IAccessControlApi.md#interfacesIAccessControlGrantRole) | **POST** /{networkId}/interface/IAccessControl/write/{address}/grantRole | IAccessControl.grantRole
[**interfacesIAccessControlHasRole**](IAccessControlApi.md#interfacesIAccessControlHasRole) | **POST** /{networkId}/interface/IAccessControl/read/{address}/hasRole | IAccessControl.hasRole
[**interfacesIAccessControlRenounceRole**](IAccessControlApi.md#interfacesIAccessControlRenounceRole) | **POST** /{networkId}/interface/IAccessControl/write/{address}/renounceRole | IAccessControl.renounceRole
[**interfacesIAccessControlRevokeRole**](IAccessControlApi.md#interfacesIAccessControlRevokeRole) | **POST** /{networkId}/interface/IAccessControl/write/{address}/revokeRole | IAccessControl.revokeRole


<a id="interfacesIAccessControlGetRoleAdmin"></a>
# **interfacesIAccessControlGetRoleAdmin**
> InterfacesIAccessControlGetRoleAdmin200Response interfacesIAccessControlGetRoleAdmin(networkId, address, interfacesIAccessControlGetRoleAdminRequest)

IAccessControl.getRoleAdmin

Read &#x60;getRoleAdmin(role)&#x60; on an instance of &#x60;IAccessControl&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IAccessControlApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIAccessControlGetRoleAdminRequest : InterfacesIAccessControlGetRoleAdminRequest =  // InterfacesIAccessControlGetRoleAdminRequest | 
try {
    val result : InterfacesIAccessControlGetRoleAdmin200Response = apiInstance.interfacesIAccessControlGetRoleAdmin(networkId, address, interfacesIAccessControlGetRoleAdminRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IAccessControlApi#interfacesIAccessControlGetRoleAdmin")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IAccessControlApi#interfacesIAccessControlGetRoleAdmin")
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

<a id="interfacesIAccessControlGrantRole"></a>
# **interfacesIAccessControlGrantRole**
> InterfacesIAccessControlGrantRole200Response interfacesIAccessControlGrantRole(networkId, address, interfacesIAccessControlGrantRoleRequest)

IAccessControl.grantRole

Write &#x60;grantRole(role,account)&#x60; on an instance of &#x60;IAccessControl&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IAccessControlApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIAccessControlGrantRoleRequest : InterfacesIAccessControlGrantRoleRequest =  // InterfacesIAccessControlGrantRoleRequest | 
try {
    val result : InterfacesIAccessControlGrantRole200Response = apiInstance.interfacesIAccessControlGrantRole(networkId, address, interfacesIAccessControlGrantRoleRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IAccessControlApi#interfacesIAccessControlGrantRole")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IAccessControlApi#interfacesIAccessControlGrantRole")
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

<a id="interfacesIAccessControlHasRole"></a>
# **interfacesIAccessControlHasRole**
> InterfacesIAccessControlHasRole200Response interfacesIAccessControlHasRole(networkId, address, interfacesIAccessControlGrantRoleRequest)

IAccessControl.hasRole

Read &#x60;hasRole(role,account)&#x60; on an instance of &#x60;IAccessControl&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IAccessControlApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIAccessControlGrantRoleRequest : InterfacesIAccessControlGrantRoleRequest =  // InterfacesIAccessControlGrantRoleRequest | 
try {
    val result : InterfacesIAccessControlHasRole200Response = apiInstance.interfacesIAccessControlHasRole(networkId, address, interfacesIAccessControlGrantRoleRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IAccessControlApi#interfacesIAccessControlHasRole")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IAccessControlApi#interfacesIAccessControlHasRole")
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

<a id="interfacesIAccessControlRenounceRole"></a>
# **interfacesIAccessControlRenounceRole**
> InterfacesIAccessControlGrantRole200Response interfacesIAccessControlRenounceRole(networkId, address, interfacesIAccessControlGrantRoleRequest)

IAccessControl.renounceRole

Write &#x60;renounceRole(role,account)&#x60; on an instance of &#x60;IAccessControl&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IAccessControlApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIAccessControlGrantRoleRequest : InterfacesIAccessControlGrantRoleRequest =  // InterfacesIAccessControlGrantRoleRequest | 
try {
    val result : InterfacesIAccessControlGrantRole200Response = apiInstance.interfacesIAccessControlRenounceRole(networkId, address, interfacesIAccessControlGrantRoleRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IAccessControlApi#interfacesIAccessControlRenounceRole")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IAccessControlApi#interfacesIAccessControlRenounceRole")
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

<a id="interfacesIAccessControlRevokeRole"></a>
# **interfacesIAccessControlRevokeRole**
> InterfacesIAccessControlGrantRole200Response interfacesIAccessControlRevokeRole(networkId, address, interfacesIAccessControlGrantRoleRequest)

IAccessControl.revokeRole

Write &#x60;revokeRole(role,account)&#x60; on an instance of &#x60;IAccessControl&#x60;

### Example
```kotlin
// Import classes:
//import org.openapitools.client.infrastructure.*
//import org.openapitools.client.models.*

val apiInstance = IAccessControlApi()
val networkId : kotlin.String = networkId_example // kotlin.String | The network id
val address : kotlin.String = address_example // kotlin.String | An ethereum address
val interfacesIAccessControlGrantRoleRequest : InterfacesIAccessControlGrantRoleRequest =  // InterfacesIAccessControlGrantRoleRequest | 
try {
    val result : InterfacesIAccessControlGrantRole200Response = apiInstance.interfacesIAccessControlRevokeRole(networkId, address, interfacesIAccessControlGrantRoleRequest)
    println(result)
} catch (e: ClientException) {
    println("4xx response calling IAccessControlApi#interfacesIAccessControlRevokeRole")
    e.printStackTrace()
} catch (e: ServerException) {
    println("5xx response calling IAccessControlApi#interfacesIAccessControlRevokeRole")
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

