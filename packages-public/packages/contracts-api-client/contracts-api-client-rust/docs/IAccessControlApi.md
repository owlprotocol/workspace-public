# \IAccessControlApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfaces_i_access_control_get_role_admin**](IAccessControlApi.md#interfaces_i_access_control_get_role_admin) | **POST** /{networkId}/interface/IAccessControl/read/{address}/getRoleAdmin | IAccessControl.getRoleAdmin
[**interfaces_i_access_control_grant_role**](IAccessControlApi.md#interfaces_i_access_control_grant_role) | **POST** /{networkId}/interface/IAccessControl/write/{address}/grantRole | IAccessControl.grantRole
[**interfaces_i_access_control_has_role**](IAccessControlApi.md#interfaces_i_access_control_has_role) | **POST** /{networkId}/interface/IAccessControl/read/{address}/hasRole | IAccessControl.hasRole
[**interfaces_i_access_control_renounce_role**](IAccessControlApi.md#interfaces_i_access_control_renounce_role) | **POST** /{networkId}/interface/IAccessControl/write/{address}/renounceRole | IAccessControl.renounceRole
[**interfaces_i_access_control_revoke_role**](IAccessControlApi.md#interfaces_i_access_control_revoke_role) | **POST** /{networkId}/interface/IAccessControl/write/{address}/revokeRole | IAccessControl.revokeRole



## interfaces_i_access_control_get_role_admin

> crate::models::InterfacesIAccessControlGetRoleAdmin200Response interfaces_i_access_control_get_role_admin(network_id, address, interfaces_i_access_control_get_role_admin_request)
IAccessControl.getRoleAdmin

Read `getRoleAdmin(role)` on an instance of `IAccessControl`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_i_access_control_get_role_admin_request** | [**InterfacesIAccessControlGetRoleAdminRequest**](InterfacesIAccessControlGetRoleAdminRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIAccessControlGetRoleAdmin200Response**](interfaces_IAccessControl_getRoleAdmin_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_i_access_control_grant_role

> crate::models::InterfacesIAccessControlGrantRole200Response interfaces_i_access_control_grant_role(network_id, address, interfaces_i_access_control_grant_role_request)
IAccessControl.grantRole

Write `grantRole(role,account)` on an instance of `IAccessControl`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_i_access_control_grant_role_request** | [**InterfacesIAccessControlGrantRoleRequest**](InterfacesIAccessControlGrantRoleRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIAccessControlGrantRole200Response**](interfaces_IAccessControl_grantRole_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_i_access_control_has_role

> crate::models::InterfacesIAccessControlHasRole200Response interfaces_i_access_control_has_role(network_id, address, interfaces_i_access_control_grant_role_request)
IAccessControl.hasRole

Read `hasRole(role,account)` on an instance of `IAccessControl`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_i_access_control_grant_role_request** | [**InterfacesIAccessControlGrantRoleRequest**](InterfacesIAccessControlGrantRoleRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIAccessControlHasRole200Response**](interfaces_IAccessControl_hasRole_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_i_access_control_renounce_role

> crate::models::InterfacesIAccessControlGrantRole200Response interfaces_i_access_control_renounce_role(network_id, address, interfaces_i_access_control_grant_role_request)
IAccessControl.renounceRole

Write `renounceRole(role,account)` on an instance of `IAccessControl`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_i_access_control_grant_role_request** | [**InterfacesIAccessControlGrantRoleRequest**](InterfacesIAccessControlGrantRoleRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIAccessControlGrantRole200Response**](interfaces_IAccessControl_grantRole_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_i_access_control_revoke_role

> crate::models::InterfacesIAccessControlGrantRole200Response interfaces_i_access_control_revoke_role(network_id, address, interfaces_i_access_control_grant_role_request)
IAccessControl.revokeRole

Write `revokeRole(role,account)` on an instance of `IAccessControl`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_i_access_control_grant_role_request** | [**InterfacesIAccessControlGrantRoleRequest**](InterfacesIAccessControlGrantRoleRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIAccessControlGrantRole200Response**](interfaces_IAccessControl_grantRole_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

