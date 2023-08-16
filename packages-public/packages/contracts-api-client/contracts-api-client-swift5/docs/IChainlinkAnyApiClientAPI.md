# IChainlinkAnyApiClientAPI

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfacesIChainlinkAnyApiClientContractURI**](IChainlinkAnyApiClientAPI.md#interfacesichainlinkanyapiclientcontracturi) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/contractURI | IChainlinkAnyApiClient.contractURI
[**interfacesIChainlinkAnyApiClientDEFAULTADMINROLE**](IChainlinkAnyApiClientAPI.md#interfacesichainlinkanyapiclientdefaultadminrole) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/DEFAULT_ADMIN_ROLE | IChainlinkAnyApiClient.DEFAULT_ADMIN_ROLE
[**interfacesIChainlinkAnyApiClientFulfill**](IChainlinkAnyApiClientAPI.md#interfacesichainlinkanyapiclientfulfill) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/fulfill | IChainlinkAnyApiClient.fulfill
[**interfacesIChainlinkAnyApiClientGetRoleAdmin**](IChainlinkAnyApiClientAPI.md#interfacesichainlinkanyapiclientgetroleadmin) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/getRoleAdmin | IChainlinkAnyApiClient.getRoleAdmin
[**interfacesIChainlinkAnyApiClientGrantRole**](IChainlinkAnyApiClientAPI.md#interfacesichainlinkanyapiclientgrantrole) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/grantRole | IChainlinkAnyApiClient.grantRole
[**interfacesIChainlinkAnyApiClientHasRole**](IChainlinkAnyApiClientAPI.md#interfacesichainlinkanyapiclienthasrole) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/hasRole | IChainlinkAnyApiClient.hasRole
[**interfacesIChainlinkAnyApiClientRenounceRole**](IChainlinkAnyApiClientAPI.md#interfacesichainlinkanyapiclientrenouncerole) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/renounceRole | IChainlinkAnyApiClient.renounceRole
[**interfacesIChainlinkAnyApiClientRequest**](IChainlinkAnyApiClientAPI.md#interfacesichainlinkanyapiclientrequest) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/request | IChainlinkAnyApiClient.request
[**interfacesIChainlinkAnyApiClientRequests**](IChainlinkAnyApiClientAPI.md#interfacesichainlinkanyapiclientrequests) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/requests | IChainlinkAnyApiClient.requests
[**interfacesIChainlinkAnyApiClientRevokeRole**](IChainlinkAnyApiClientAPI.md#interfacesichainlinkanyapiclientrevokerole) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/revokeRole | IChainlinkAnyApiClient.revokeRole
[**interfacesIChainlinkAnyApiClientSetContractURI**](IChainlinkAnyApiClientAPI.md#interfacesichainlinkanyapiclientsetcontracturi) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/setContractURI | IChainlinkAnyApiClient.setContractURI
[**interfacesIChainlinkAnyApiClientSupportsInterface**](IChainlinkAnyApiClientAPI.md#interfacesichainlinkanyapiclientsupportsinterface) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/supportsInterface | IChainlinkAnyApiClient.supportsInterface
[**interfacesIChainlinkAnyApiClientVersion**](IChainlinkAnyApiClientAPI.md#interfacesichainlinkanyapiclientversion) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/version | IChainlinkAnyApiClient.version
[**interfacesIChainlinkAnyApiClientWithdrawLink**](IChainlinkAnyApiClientAPI.md#interfacesichainlinkanyapiclientwithdrawlink) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/withdrawLink | IChainlinkAnyApiClient.withdrawLink


# **interfacesIChainlinkAnyApiClientContractURI**
```swift
    open class func interfacesIChainlinkAnyApiClientContractURI(networkId: String, address: String, interfacesIBeaconImplementationRequest: InterfacesIBeaconImplementationRequest, completion: @escaping (_ data: InterfacesIContractURIContractURI200Response?, _ error: Error?) -> Void)
```

IChainlinkAnyApiClient.contractURI

Read `contractURI()` on an instance of `IChainlinkAnyApiClient`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIBeaconImplementationRequest = interfaces_IBeacon_implementation_request(contractParams: 123) // InterfacesIBeaconImplementationRequest | 

// IChainlinkAnyApiClient.contractURI
IChainlinkAnyApiClientAPI.interfacesIChainlinkAnyApiClientContractURI(networkId: networkId, address: address, interfacesIBeaconImplementationRequest: interfacesIBeaconImplementationRequest) { (response, error) in
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
 **interfacesIBeaconImplementationRequest** | [**InterfacesIBeaconImplementationRequest**](InterfacesIBeaconImplementationRequest.md) |  | 

### Return type

[**InterfacesIContractURIContractURI200Response**](InterfacesIContractURIContractURI200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIChainlinkAnyApiClientDEFAULTADMINROLE**
```swift
    open class func interfacesIChainlinkAnyApiClientDEFAULTADMINROLE(networkId: String, address: String, interfacesIBeaconImplementationRequest: InterfacesIBeaconImplementationRequest, completion: @escaping (_ data: InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE200Response?, _ error: Error?) -> Void)
```

IChainlinkAnyApiClient.DEFAULT_ADMIN_ROLE

Read `DEFAULT_ADMIN_ROLE()` on an instance of `IChainlinkAnyApiClient`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIBeaconImplementationRequest = interfaces_IBeacon_implementation_request(contractParams: 123) // InterfacesIBeaconImplementationRequest | 

// IChainlinkAnyApiClient.DEFAULT_ADMIN_ROLE
IChainlinkAnyApiClientAPI.interfacesIChainlinkAnyApiClientDEFAULTADMINROLE(networkId: networkId, address: address, interfacesIBeaconImplementationRequest: interfacesIBeaconImplementationRequest) { (response, error) in
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
 **interfacesIBeaconImplementationRequest** | [**InterfacesIBeaconImplementationRequest**](InterfacesIBeaconImplementationRequest.md) |  | 

### Return type

[**InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE200Response**](InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIChainlinkAnyApiClientFulfill**
```swift
    open class func interfacesIChainlinkAnyApiClientFulfill(networkId: String, address: String, interfacesIChainlinkAnyApiClientFulfillRequest: InterfacesIChainlinkAnyApiClientFulfillRequest, completion: @escaping (_ data: InterfacesIChainlinkAnyApiClientFulfill200Response?, _ error: Error?) -> Void)
```

IChainlinkAnyApiClient.fulfill

Write `fulfill(reqId,reqResponseData)` on an instance of `IChainlinkAnyApiClient`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIChainlinkAnyApiClientFulfillRequest = interfaces_IChainlinkAnyApiClient_fulfill_request(contractParams: interfaces_IChainlinkAnyApiClient_fulfill_request_contractParams(_0: "_0_example", _1: "_1_example", reqId: "reqId_example", reqResponseData: "reqResponseData_example")) // InterfacesIChainlinkAnyApiClientFulfillRequest | 

// IChainlinkAnyApiClient.fulfill
IChainlinkAnyApiClientAPI.interfacesIChainlinkAnyApiClientFulfill(networkId: networkId, address: address, interfacesIChainlinkAnyApiClientFulfillRequest: interfacesIChainlinkAnyApiClientFulfillRequest) { (response, error) in
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
 **interfacesIChainlinkAnyApiClientFulfillRequest** | [**InterfacesIChainlinkAnyApiClientFulfillRequest**](InterfacesIChainlinkAnyApiClientFulfillRequest.md) |  | 

### Return type

[**InterfacesIChainlinkAnyApiClientFulfill200Response**](InterfacesIChainlinkAnyApiClientFulfill200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIChainlinkAnyApiClientGetRoleAdmin**
```swift
    open class func interfacesIChainlinkAnyApiClientGetRoleAdmin(networkId: String, address: String, interfacesIAccessControlGetRoleAdminRequest: InterfacesIAccessControlGetRoleAdminRequest, completion: @escaping (_ data: InterfacesIAccessControlGetRoleAdmin200Response?, _ error: Error?) -> Void)
```

IChainlinkAnyApiClient.getRoleAdmin

Read `getRoleAdmin(role)` on an instance of `IChainlinkAnyApiClient`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIAccessControlGetRoleAdminRequest = interfaces_IAccessControl_getRoleAdmin_request(contractParams: interfaces_IAccessControl_getRoleAdmin_request_contractParams(_0: "_0_example", role: "role_example")) // InterfacesIAccessControlGetRoleAdminRequest | 

// IChainlinkAnyApiClient.getRoleAdmin
IChainlinkAnyApiClientAPI.interfacesIChainlinkAnyApiClientGetRoleAdmin(networkId: networkId, address: address, interfacesIAccessControlGetRoleAdminRequest: interfacesIAccessControlGetRoleAdminRequest) { (response, error) in
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

# **interfacesIChainlinkAnyApiClientGrantRole**
```swift
    open class func interfacesIChainlinkAnyApiClientGrantRole(networkId: String, address: String, interfacesIAccessControlGrantRoleRequest: InterfacesIAccessControlGrantRoleRequest, completion: @escaping (_ data: InterfacesIAccessControlGrantRole200Response?, _ error: Error?) -> Void)
```

IChainlinkAnyApiClient.grantRole

Write `grantRole(role,account)` on an instance of `IChainlinkAnyApiClient`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIAccessControlGrantRoleRequest = interfaces_IAccessControl_grantRole_request(contractParams: interfaces_IAccessControl_grantRole_request_contractParams(_0: "_0_example", _1: "_1_example", role: "role_example", account: "account_example")) // InterfacesIAccessControlGrantRoleRequest | 

// IChainlinkAnyApiClient.grantRole
IChainlinkAnyApiClientAPI.interfacesIChainlinkAnyApiClientGrantRole(networkId: networkId, address: address, interfacesIAccessControlGrantRoleRequest: interfacesIAccessControlGrantRoleRequest) { (response, error) in
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

# **interfacesIChainlinkAnyApiClientHasRole**
```swift
    open class func interfacesIChainlinkAnyApiClientHasRole(networkId: String, address: String, interfacesIAccessControlGrantRoleRequest: InterfacesIAccessControlGrantRoleRequest, completion: @escaping (_ data: InterfacesIAccessControlHasRole200Response?, _ error: Error?) -> Void)
```

IChainlinkAnyApiClient.hasRole

Read `hasRole(role,account)` on an instance of `IChainlinkAnyApiClient`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIAccessControlGrantRoleRequest = interfaces_IAccessControl_grantRole_request(contractParams: interfaces_IAccessControl_grantRole_request_contractParams(_0: "_0_example", _1: "_1_example", role: "role_example", account: "account_example")) // InterfacesIAccessControlGrantRoleRequest | 

// IChainlinkAnyApiClient.hasRole
IChainlinkAnyApiClientAPI.interfacesIChainlinkAnyApiClientHasRole(networkId: networkId, address: address, interfacesIAccessControlGrantRoleRequest: interfacesIAccessControlGrantRoleRequest) { (response, error) in
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

# **interfacesIChainlinkAnyApiClientRenounceRole**
```swift
    open class func interfacesIChainlinkAnyApiClientRenounceRole(networkId: String, address: String, interfacesIAccessControlGrantRoleRequest: InterfacesIAccessControlGrantRoleRequest, completion: @escaping (_ data: InterfacesIAccessControlGrantRole200Response?, _ error: Error?) -> Void)
```

IChainlinkAnyApiClient.renounceRole

Write `renounceRole(role,account)` on an instance of `IChainlinkAnyApiClient`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIAccessControlGrantRoleRequest = interfaces_IAccessControl_grantRole_request(contractParams: interfaces_IAccessControl_grantRole_request_contractParams(_0: "_0_example", _1: "_1_example", role: "role_example", account: "account_example")) // InterfacesIAccessControlGrantRoleRequest | 

// IChainlinkAnyApiClient.renounceRole
IChainlinkAnyApiClientAPI.interfacesIChainlinkAnyApiClientRenounceRole(networkId: networkId, address: address, interfacesIAccessControlGrantRoleRequest: interfacesIAccessControlGrantRoleRequest) { (response, error) in
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

# **interfacesIChainlinkAnyApiClientRequest**
```swift
    open class func interfacesIChainlinkAnyApiClientRequest(networkId: String, address: String, interfacesIChainlinkAnyApiClientRequestRequest: InterfacesIChainlinkAnyApiClientRequestRequest, completion: @escaping (_ data: InterfacesIChainlinkAnyApiClientRequest200Response?, _ error: Error?) -> Void)
```

IChainlinkAnyApiClient.request

Write `request(fulfillAddress,fulfillPrefixData,reqJobId,reqUrl,reqPath,reqFee)` on an instance of `IChainlinkAnyApiClient`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIChainlinkAnyApiClientRequestRequest = interfaces_IChainlinkAnyApiClient_request_request(contractParams: interfaces_IChainlinkAnyApiClient_request_request_contractParams(_0: "_0_example", _1: "_1_example", _2: "_2_example", _3: "_3_example", _4: "_4_example", _5: "_5_example", fulfillAddress: "fulfillAddress_example", fulfillPrefixData: "fulfillPrefixData_example", reqJobId: "reqJobId_example", reqUrl: "reqUrl_example", reqPath: "reqPath_example", reqFee: "reqFee_example")) // InterfacesIChainlinkAnyApiClientRequestRequest | 

// IChainlinkAnyApiClient.request
IChainlinkAnyApiClientAPI.interfacesIChainlinkAnyApiClientRequest(networkId: networkId, address: address, interfacesIChainlinkAnyApiClientRequestRequest: interfacesIChainlinkAnyApiClientRequestRequest) { (response, error) in
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
 **interfacesIChainlinkAnyApiClientRequestRequest** | [**InterfacesIChainlinkAnyApiClientRequestRequest**](InterfacesIChainlinkAnyApiClientRequestRequest.md) |  | 

### Return type

[**InterfacesIChainlinkAnyApiClientRequest200Response**](InterfacesIChainlinkAnyApiClientRequest200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIChainlinkAnyApiClientRequests**
```swift
    open class func interfacesIChainlinkAnyApiClientRequests(networkId: String, address: String, interfacesIChainlinkAnyApiClientRequestsRequest: InterfacesIChainlinkAnyApiClientRequestsRequest, completion: @escaping (_ data: InterfacesIChainlinkAnyApiClientRequests200Response?, _ error: Error?) -> Void)
```

IChainlinkAnyApiClient.requests

Read `requests()` on an instance of `IChainlinkAnyApiClient`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIChainlinkAnyApiClientRequestsRequest = interfaces_IChainlinkAnyApiClient_requests_request(contractParams: interfaces_IERC1820_interfaceHash_200_response_result(_0: "_0_example", : "_example")) // InterfacesIChainlinkAnyApiClientRequestsRequest | 

// IChainlinkAnyApiClient.requests
IChainlinkAnyApiClientAPI.interfacesIChainlinkAnyApiClientRequests(networkId: networkId, address: address, interfacesIChainlinkAnyApiClientRequestsRequest: interfacesIChainlinkAnyApiClientRequestsRequest) { (response, error) in
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
 **interfacesIChainlinkAnyApiClientRequestsRequest** | [**InterfacesIChainlinkAnyApiClientRequestsRequest**](InterfacesIChainlinkAnyApiClientRequestsRequest.md) |  | 

### Return type

[**InterfacesIChainlinkAnyApiClientRequests200Response**](InterfacesIChainlinkAnyApiClientRequests200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIChainlinkAnyApiClientRevokeRole**
```swift
    open class func interfacesIChainlinkAnyApiClientRevokeRole(networkId: String, address: String, interfacesIAccessControlGrantRoleRequest: InterfacesIAccessControlGrantRoleRequest, completion: @escaping (_ data: InterfacesIAccessControlGrantRole200Response?, _ error: Error?) -> Void)
```

IChainlinkAnyApiClient.revokeRole

Write `revokeRole(role,account)` on an instance of `IChainlinkAnyApiClient`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIAccessControlGrantRoleRequest = interfaces_IAccessControl_grantRole_request(contractParams: interfaces_IAccessControl_grantRole_request_contractParams(_0: "_0_example", _1: "_1_example", role: "role_example", account: "account_example")) // InterfacesIAccessControlGrantRoleRequest | 

// IChainlinkAnyApiClient.revokeRole
IChainlinkAnyApiClientAPI.interfacesIChainlinkAnyApiClientRevokeRole(networkId: networkId, address: address, interfacesIAccessControlGrantRoleRequest: interfacesIAccessControlGrantRoleRequest) { (response, error) in
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

# **interfacesIChainlinkAnyApiClientSetContractURI**
```swift
    open class func interfacesIChainlinkAnyApiClientSetContractURI(networkId: String, address: String, interfacesIContractURISetContractURIRequest: InterfacesIContractURISetContractURIRequest, completion: @escaping (_ data: InterfacesIContractURISetContractURI200Response?, _ error: Error?) -> Void)
```

IChainlinkAnyApiClient.setContractURI

Write `setContractURI(uri)` on an instance of `IChainlinkAnyApiClient`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIContractURISetContractURIRequest = interfaces_IContractURI_setContractURI_request(contractParams: interfaces_IContractURI_setContractURI_request_contractParams(_0: "_0_example", uri: "uri_example")) // InterfacesIContractURISetContractURIRequest | 

// IChainlinkAnyApiClient.setContractURI
IChainlinkAnyApiClientAPI.interfacesIChainlinkAnyApiClientSetContractURI(networkId: networkId, address: address, interfacesIContractURISetContractURIRequest: interfacesIContractURISetContractURIRequest) { (response, error) in
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
 **interfacesIContractURISetContractURIRequest** | [**InterfacesIContractURISetContractURIRequest**](InterfacesIContractURISetContractURIRequest.md) |  | 

### Return type

[**InterfacesIContractURISetContractURI200Response**](InterfacesIContractURISetContractURI200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIChainlinkAnyApiClientSupportsInterface**
```swift
    open class func interfacesIChainlinkAnyApiClientSupportsInterface(networkId: String, address: String, interfacesIERC165SupportsInterfaceRequest: InterfacesIERC165SupportsInterfaceRequest, completion: @escaping (_ data: InterfacesIERC165SupportsInterface200Response?, _ error: Error?) -> Void)
```

IChainlinkAnyApiClient.supportsInterface

Read `supportsInterface(interfaceId)` on an instance of `IChainlinkAnyApiClient`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC165SupportsInterfaceRequest = interfaces_IERC165_supportsInterface_request(contractParams: interfaces_IERC165_supportsInterface_request_contractParams(_0: "_0_example", interfaceId: "interfaceId_example")) // InterfacesIERC165SupportsInterfaceRequest | 

// IChainlinkAnyApiClient.supportsInterface
IChainlinkAnyApiClientAPI.interfacesIChainlinkAnyApiClientSupportsInterface(networkId: networkId, address: address, interfacesIERC165SupportsInterfaceRequest: interfacesIERC165SupportsInterfaceRequest) { (response, error) in
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
 **interfacesIERC165SupportsInterfaceRequest** | [**InterfacesIERC165SupportsInterfaceRequest**](InterfacesIERC165SupportsInterfaceRequest.md) |  | 

### Return type

[**InterfacesIERC165SupportsInterface200Response**](InterfacesIERC165SupportsInterface200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIChainlinkAnyApiClientVersion**
```swift
    open class func interfacesIChainlinkAnyApiClientVersion(networkId: String, address: String, interfacesIBeaconImplementationRequest: InterfacesIBeaconImplementationRequest, completion: @escaping (_ data: InterfacesIContractURIContractURI200Response?, _ error: Error?) -> Void)
```

IChainlinkAnyApiClient.version

Read `version()` on an instance of `IChainlinkAnyApiClient`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIBeaconImplementationRequest = interfaces_IBeacon_implementation_request(contractParams: 123) // InterfacesIBeaconImplementationRequest | 

// IChainlinkAnyApiClient.version
IChainlinkAnyApiClientAPI.interfacesIChainlinkAnyApiClientVersion(networkId: networkId, address: address, interfacesIBeaconImplementationRequest: interfacesIBeaconImplementationRequest) { (response, error) in
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
 **interfacesIBeaconImplementationRequest** | [**InterfacesIBeaconImplementationRequest**](InterfacesIBeaconImplementationRequest.md) |  | 

### Return type

[**InterfacesIContractURIContractURI200Response**](InterfacesIContractURIContractURI200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **interfacesIChainlinkAnyApiClientWithdrawLink**
```swift
    open class func interfacesIChainlinkAnyApiClientWithdrawLink(networkId: String, address: String, interfacesIERC20TransferRequest: InterfacesIERC20TransferRequest, completion: @escaping (_ data: InterfacesIERC20Transfer200Response?, _ error: Error?) -> Void)
```

IChainlinkAnyApiClient.withdrawLink

Write `withdrawLink(to,amount)` on an instance of `IChainlinkAnyApiClient`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let address = "address_example" // String | An ethereum address
let interfacesIERC20TransferRequest = interfaces_IERC20_transfer_request(contractParams: interfaces_IERC20_transfer_request_contractParams(_0: "_0_example", _1: "_1_example", to: "to_example", amount: "amount_example")) // InterfacesIERC20TransferRequest | 

// IChainlinkAnyApiClient.withdrawLink
IChainlinkAnyApiClientAPI.interfacesIChainlinkAnyApiClientWithdrawLink(networkId: networkId, address: address, interfacesIERC20TransferRequest: interfacesIERC20TransferRequest) { (response, error) in
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
 **interfacesIERC20TransferRequest** | [**InterfacesIERC20TransferRequest**](InterfacesIERC20TransferRequest.md) |  | 

### Return type

[**InterfacesIERC20Transfer200Response**](InterfacesIERC20Transfer200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

