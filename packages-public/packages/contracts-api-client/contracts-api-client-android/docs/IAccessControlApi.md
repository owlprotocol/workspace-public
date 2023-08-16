# IAccessControlApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIAccessControlGetRoleAdmin**](IAccessControlApi.md#interfacesIAccessControlGetRoleAdmin) | **POST** /{networkId}/interface/IAccessControl/read/{address}/getRoleAdmin | IAccessControl.getRoleAdmin
[**interfacesIAccessControlGrantRole**](IAccessControlApi.md#interfacesIAccessControlGrantRole) | **POST** /{networkId}/interface/IAccessControl/write/{address}/grantRole | IAccessControl.grantRole
[**interfacesIAccessControlHasRole**](IAccessControlApi.md#interfacesIAccessControlHasRole) | **POST** /{networkId}/interface/IAccessControl/read/{address}/hasRole | IAccessControl.hasRole
[**interfacesIAccessControlRenounceRole**](IAccessControlApi.md#interfacesIAccessControlRenounceRole) | **POST** /{networkId}/interface/IAccessControl/write/{address}/renounceRole | IAccessControl.renounceRole
[**interfacesIAccessControlRevokeRole**](IAccessControlApi.md#interfacesIAccessControlRevokeRole) | **POST** /{networkId}/interface/IAccessControl/write/{address}/revokeRole | IAccessControl.revokeRole



## interfacesIAccessControlGetRoleAdmin

> InterfacesIAccessControlGetRoleAdmin200Response interfacesIAccessControlGetRoleAdmin(networkId, address, interfacesIAccessControlGetRoleAdminRequest)

IAccessControl.getRoleAdmin

Read &#x60;getRoleAdmin(role)&#x60; on an instance of &#x60;IAccessControl&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IAccessControlApi;

IAccessControlApi apiInstance = new IAccessControlApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIAccessControlGetRoleAdminRequest interfacesIAccessControlGetRoleAdminRequest = new InterfacesIAccessControlGetRoleAdminRequest(); // InterfacesIAccessControlGetRoleAdminRequest | 
try {
    InterfacesIAccessControlGetRoleAdmin200Response result = apiInstance.interfacesIAccessControlGetRoleAdmin(networkId, address, interfacesIAccessControlGetRoleAdminRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IAccessControlApi#interfacesIAccessControlGetRoleAdmin");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIAccessControlGetRoleAdminRequest** | [**InterfacesIAccessControlGetRoleAdminRequest**](InterfacesIAccessControlGetRoleAdminRequest.md)|  |

### Return type

[**InterfacesIAccessControlGetRoleAdmin200Response**](InterfacesIAccessControlGetRoleAdmin200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIAccessControlGrantRole

> InterfacesIAccessControlGrantRole200Response interfacesIAccessControlGrantRole(networkId, address, interfacesIAccessControlGrantRoleRequest)

IAccessControl.grantRole

Write &#x60;grantRole(role,account)&#x60; on an instance of &#x60;IAccessControl&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IAccessControlApi;

IAccessControlApi apiInstance = new IAccessControlApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIAccessControlGrantRoleRequest interfacesIAccessControlGrantRoleRequest = new InterfacesIAccessControlGrantRoleRequest(); // InterfacesIAccessControlGrantRoleRequest | 
try {
    InterfacesIAccessControlGrantRole200Response result = apiInstance.interfacesIAccessControlGrantRole(networkId, address, interfacesIAccessControlGrantRoleRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IAccessControlApi#interfacesIAccessControlGrantRole");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIAccessControlGrantRoleRequest** | [**InterfacesIAccessControlGrantRoleRequest**](InterfacesIAccessControlGrantRoleRequest.md)|  |

### Return type

[**InterfacesIAccessControlGrantRole200Response**](InterfacesIAccessControlGrantRole200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIAccessControlHasRole

> InterfacesIAccessControlHasRole200Response interfacesIAccessControlHasRole(networkId, address, interfacesIAccessControlGrantRoleRequest)

IAccessControl.hasRole

Read &#x60;hasRole(role,account)&#x60; on an instance of &#x60;IAccessControl&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IAccessControlApi;

IAccessControlApi apiInstance = new IAccessControlApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIAccessControlGrantRoleRequest interfacesIAccessControlGrantRoleRequest = new InterfacesIAccessControlGrantRoleRequest(); // InterfacesIAccessControlGrantRoleRequest | 
try {
    InterfacesIAccessControlHasRole200Response result = apiInstance.interfacesIAccessControlHasRole(networkId, address, interfacesIAccessControlGrantRoleRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IAccessControlApi#interfacesIAccessControlHasRole");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIAccessControlGrantRoleRequest** | [**InterfacesIAccessControlGrantRoleRequest**](InterfacesIAccessControlGrantRoleRequest.md)|  |

### Return type

[**InterfacesIAccessControlHasRole200Response**](InterfacesIAccessControlHasRole200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIAccessControlRenounceRole

> InterfacesIAccessControlGrantRole200Response interfacesIAccessControlRenounceRole(networkId, address, interfacesIAccessControlGrantRoleRequest)

IAccessControl.renounceRole

Write &#x60;renounceRole(role,account)&#x60; on an instance of &#x60;IAccessControl&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IAccessControlApi;

IAccessControlApi apiInstance = new IAccessControlApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIAccessControlGrantRoleRequest interfacesIAccessControlGrantRoleRequest = new InterfacesIAccessControlGrantRoleRequest(); // InterfacesIAccessControlGrantRoleRequest | 
try {
    InterfacesIAccessControlGrantRole200Response result = apiInstance.interfacesIAccessControlRenounceRole(networkId, address, interfacesIAccessControlGrantRoleRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IAccessControlApi#interfacesIAccessControlRenounceRole");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIAccessControlGrantRoleRequest** | [**InterfacesIAccessControlGrantRoleRequest**](InterfacesIAccessControlGrantRoleRequest.md)|  |

### Return type

[**InterfacesIAccessControlGrantRole200Response**](InterfacesIAccessControlGrantRole200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## interfacesIAccessControlRevokeRole

> InterfacesIAccessControlGrantRole200Response interfacesIAccessControlRevokeRole(networkId, address, interfacesIAccessControlGrantRoleRequest)

IAccessControl.revokeRole

Write &#x60;revokeRole(role,account)&#x60; on an instance of &#x60;IAccessControl&#x60;

### Example

```java
// Import classes:
//import org.openapitools.client.api.IAccessControlApi;

IAccessControlApi apiInstance = new IAccessControlApi();
String networkId = 80001; // String | The network id
String address = null; // String | An ethereum address
InterfacesIAccessControlGrantRoleRequest interfacesIAccessControlGrantRoleRequest = new InterfacesIAccessControlGrantRoleRequest(); // InterfacesIAccessControlGrantRoleRequest | 
try {
    InterfacesIAccessControlGrantRole200Response result = apiInstance.interfacesIAccessControlRevokeRole(networkId, address, interfacesIAccessControlGrantRoleRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling IAccessControlApi#interfacesIAccessControlRevokeRole");
    e.printStackTrace();
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String**| The network id | [default to 80001]
 **address** | **String**| An ethereum address | [default to null]
 **interfacesIAccessControlGrantRoleRequest** | [**InterfacesIAccessControlGrantRoleRequest**](InterfacesIAccessControlGrantRoleRequest.md)|  |

### Return type

[**InterfacesIAccessControlGrantRole200Response**](InterfacesIAccessControlGrantRole200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

