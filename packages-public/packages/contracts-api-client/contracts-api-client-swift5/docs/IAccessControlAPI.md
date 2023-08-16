# IAccessControlAPI

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIAccessControlGetRoleAdmin**](IAccessControlAPI.md#interfacesiaccesscontrolgetroleadmin) | **POST** /{networkId}/interface/IAccessControl/read/{address}/getRoleAdmin | IAccessControl.getRoleAdmin
[**interfacesIAccessControlGrantRole**](IAccessControlAPI.md#interfacesiaccesscontrolgrantrole) | **POST** /{networkId}/interface/IAccessControl/write/{address}/grantRole | IAccessControl.grantRole
[**interfacesIAccessControlHasRole**](IAccessControlAPI.md#interfacesiaccesscontrolhasrole) | **POST** /{networkId}/interface/IAccessControl/read/{address}/hasRole | IAccessControl.hasRole
[**interfacesIAccessControlRenounceRole**](IAccessControlAPI.md#interfacesiaccesscontrolrenouncerole) | **POST** /{networkId}/interface/IAccessControl/write/{address}/renounceRole | IAccessControl.renounceRole
[**interfacesIAccessControlRevokeRole**](IAccessControlAPI.md#interfacesiaccesscontrolrevokerole) | **POST** /{networkId}/interface/IAccessControl/write/{address}/revokeRole | IAccessControl.revokeRole


# **interfacesIAccessControlGetRoleAdmin**
```swift
    open class func interfacesIAccessControlGetRoleAdmin(networkId: String, address: String, interfacesIAccessControlGetRoleAdminRequest: InterfacesIAccessControlGetRoleAdminRequest, completion: @escaping (_ data: InterfacesIAccessControlGetRoleAdmin200Response?, _ error: Error?) -> Void)
```

IAccessControl.getRoleAdmin

Read `getRoleAdmin(role)` on an instance of `IAccessControl`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIAccessControlGetRoleAdminRequest = interfaces_IAccessControl_getRoleAdmin_request(contractParams: interfaces_IAccessControl_getRoleAdmin_request_contractParams(_0: "_0_example", role: "role_example")) // InterfacesIAccessControlGetRoleAdminRequest | 

// IAccessControl.getRoleAdmin
IAccessControlAPI.interfacesIAccessControlGetRoleAdmin(networkId: networkId, address: address, interfacesIAccessControlGetRoleAdminRequest: interfacesIAccessControlGetRoleAdminRequest) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String** | The network id | [default to &quot;80001&quot;]
 **address** | **String** | An ethereum address | 
 **interfacesIAccessControlGetRoleAdminRequest** | [**InterfacesIAccessControlGetRoleAdminRequest**](InterfacesIAccessControlGetRoleAdminRequest.md) |  | 

### Return type

[**InterfacesIAccessControlGetRoleAdmin200Response**](InterfacesIAccessControlGetRoleAdmin200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIAccessControlGrantRole**
```swift
    open class func interfacesIAccessControlGrantRole(networkId: String, address: String, interfacesIAccessControlGrantRoleRequest: InterfacesIAccessControlGrantRoleRequest, completion: @escaping (_ data: InterfacesIAccessControlGrantRole200Response?, _ error: Error?) -> Void)
```

IAccessControl.grantRole

Write `grantRole(role,account)` on an instance of `IAccessControl`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIAccessControlGrantRoleRequest = interfaces_IAccessControl_grantRole_request(contractParams: interfaces_IAccessControl_grantRole_request_contractParams(_0: "_0_example", _1: "_1_example", role: "role_example", account: "account_example")) // InterfacesIAccessControlGrantRoleRequest | 

// IAccessControl.grantRole
IAccessControlAPI.interfacesIAccessControlGrantRole(networkId: networkId, address: address, interfacesIAccessControlGrantRoleRequest: interfacesIAccessControlGrantRoleRequest) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String** | The network id | [default to &quot;80001&quot;]
 **address** | **String** | An ethereum address | 
 **interfacesIAccessControlGrantRoleRequest** | [**InterfacesIAccessControlGrantRoleRequest**](InterfacesIAccessControlGrantRoleRequest.md) |  | 

### Return type

[**InterfacesIAccessControlGrantRole200Response**](InterfacesIAccessControlGrantRole200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIAccessControlHasRole**
```swift
    open class func interfacesIAccessControlHasRole(networkId: String, address: String, interfacesIAccessControlGrantRoleRequest: InterfacesIAccessControlGrantRoleRequest, completion: @escaping (_ data: InterfacesIAccessControlHasRole200Response?, _ error: Error?) -> Void)
```

IAccessControl.hasRole

Read `hasRole(role,account)` on an instance of `IAccessControl`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIAccessControlGrantRoleRequest = interfaces_IAccessControl_grantRole_request(contractParams: interfaces_IAccessControl_grantRole_request_contractParams(_0: "_0_example", _1: "_1_example", role: "role_example", account: "account_example")) // InterfacesIAccessControlGrantRoleRequest | 

// IAccessControl.hasRole
IAccessControlAPI.interfacesIAccessControlHasRole(networkId: networkId, address: address, interfacesIAccessControlGrantRoleRequest: interfacesIAccessControlGrantRoleRequest) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String** | The network id | [default to &quot;80001&quot;]
 **address** | **String** | An ethereum address | 
 **interfacesIAccessControlGrantRoleRequest** | [**InterfacesIAccessControlGrantRoleRequest**](InterfacesIAccessControlGrantRoleRequest.md) |  | 

### Return type

[**InterfacesIAccessControlHasRole200Response**](InterfacesIAccessControlHasRole200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIAccessControlRenounceRole**
```swift
    open class func interfacesIAccessControlRenounceRole(networkId: String, address: String, interfacesIAccessControlGrantRoleRequest: InterfacesIAccessControlGrantRoleRequest, completion: @escaping (_ data: InterfacesIAccessControlGrantRole200Response?, _ error: Error?) -> Void)
```

IAccessControl.renounceRole

Write `renounceRole(role,account)` on an instance of `IAccessControl`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIAccessControlGrantRoleRequest = interfaces_IAccessControl_grantRole_request(contractParams: interfaces_IAccessControl_grantRole_request_contractParams(_0: "_0_example", _1: "_1_example", role: "role_example", account: "account_example")) // InterfacesIAccessControlGrantRoleRequest | 

// IAccessControl.renounceRole
IAccessControlAPI.interfacesIAccessControlRenounceRole(networkId: networkId, address: address, interfacesIAccessControlGrantRoleRequest: interfacesIAccessControlGrantRoleRequest) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String** | The network id | [default to &quot;80001&quot;]
 **address** | **String** | An ethereum address | 
 **interfacesIAccessControlGrantRoleRequest** | [**InterfacesIAccessControlGrantRoleRequest**](InterfacesIAccessControlGrantRoleRequest.md) |  | 

### Return type

[**InterfacesIAccessControlGrantRole200Response**](InterfacesIAccessControlGrantRole200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIAccessControlRevokeRole**
```swift
    open class func interfacesIAccessControlRevokeRole(networkId: String, address: String, interfacesIAccessControlGrantRoleRequest: InterfacesIAccessControlGrantRoleRequest, completion: @escaping (_ data: InterfacesIAccessControlGrantRole200Response?, _ error: Error?) -> Void)
```

IAccessControl.revokeRole

Write `revokeRole(role,account)` on an instance of `IAccessControl`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIAccessControlGrantRoleRequest = interfaces_IAccessControl_grantRole_request(contractParams: interfaces_IAccessControl_grantRole_request_contractParams(_0: "_0_example", _1: "_1_example", role: "role_example", account: "account_example")) // InterfacesIAccessControlGrantRoleRequest | 

// IAccessControl.revokeRole
IAccessControlAPI.interfacesIAccessControlRevokeRole(networkId: networkId, address: address, interfacesIAccessControlGrantRoleRequest: interfacesIAccessControlGrantRoleRequest) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String** | The network id | [default to &quot;80001&quot;]
 **address** | **String** | An ethereum address | 
 **interfacesIAccessControlGrantRoleRequest** | [**InterfacesIAccessControlGrantRoleRequest**](InterfacesIAccessControlGrantRoleRequest.md) |  | 

### Return type

[**InterfacesIAccessControlGrantRole200Response**](InterfacesIAccessControlGrantRole200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

