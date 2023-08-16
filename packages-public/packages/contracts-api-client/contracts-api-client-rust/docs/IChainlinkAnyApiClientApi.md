# \IChainlinkAnyApiClientApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfaces_i_chainlink_any_api_client_contract_uri**](IChainlinkAnyApiClientApi.md#interfaces_i_chainlink_any_api_client_contract_uri) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/contractURI | IChainlinkAnyApiClient.contractURI
[**interfaces_i_chainlink_any_api_client_defaultadminrole**](IChainlinkAnyApiClientApi.md#interfaces_i_chainlink_any_api_client_defaultadminrole) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/DEFAULT_ADMIN_ROLE | IChainlinkAnyApiClient.DEFAULT_ADMIN_ROLE
[**interfaces_i_chainlink_any_api_client_fulfill**](IChainlinkAnyApiClientApi.md#interfaces_i_chainlink_any_api_client_fulfill) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/fulfill | IChainlinkAnyApiClient.fulfill
[**interfaces_i_chainlink_any_api_client_get_role_admin**](IChainlinkAnyApiClientApi.md#interfaces_i_chainlink_any_api_client_get_role_admin) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/getRoleAdmin | IChainlinkAnyApiClient.getRoleAdmin
[**interfaces_i_chainlink_any_api_client_grant_role**](IChainlinkAnyApiClientApi.md#interfaces_i_chainlink_any_api_client_grant_role) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/grantRole | IChainlinkAnyApiClient.grantRole
[**interfaces_i_chainlink_any_api_client_has_role**](IChainlinkAnyApiClientApi.md#interfaces_i_chainlink_any_api_client_has_role) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/hasRole | IChainlinkAnyApiClient.hasRole
[**interfaces_i_chainlink_any_api_client_renounce_role**](IChainlinkAnyApiClientApi.md#interfaces_i_chainlink_any_api_client_renounce_role) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/renounceRole | IChainlinkAnyApiClient.renounceRole
[**interfaces_i_chainlink_any_api_client_request**](IChainlinkAnyApiClientApi.md#interfaces_i_chainlink_any_api_client_request) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/request | IChainlinkAnyApiClient.request
[**interfaces_i_chainlink_any_api_client_requests**](IChainlinkAnyApiClientApi.md#interfaces_i_chainlink_any_api_client_requests) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/requests | IChainlinkAnyApiClient.requests
[**interfaces_i_chainlink_any_api_client_revoke_role**](IChainlinkAnyApiClientApi.md#interfaces_i_chainlink_any_api_client_revoke_role) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/revokeRole | IChainlinkAnyApiClient.revokeRole
[**interfaces_i_chainlink_any_api_client_set_contract_uri**](IChainlinkAnyApiClientApi.md#interfaces_i_chainlink_any_api_client_set_contract_uri) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/setContractURI | IChainlinkAnyApiClient.setContractURI
[**interfaces_i_chainlink_any_api_client_supports_interface**](IChainlinkAnyApiClientApi.md#interfaces_i_chainlink_any_api_client_supports_interface) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/supportsInterface | IChainlinkAnyApiClient.supportsInterface
[**interfaces_i_chainlink_any_api_client_version**](IChainlinkAnyApiClientApi.md#interfaces_i_chainlink_any_api_client_version) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/version | IChainlinkAnyApiClient.version
[**interfaces_i_chainlink_any_api_client_withdraw_link**](IChainlinkAnyApiClientApi.md#interfaces_i_chainlink_any_api_client_withdraw_link) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/withdrawLink | IChainlinkAnyApiClient.withdrawLink



## interfaces_i_chainlink_any_api_client_contract_uri

> crate::models::InterfacesIContractUriContractUri200Response interfaces_i_chainlink_any_api_client_contract_uri(network_id, address, interfaces_i_beacon_implementation_request)
IChainlinkAnyApiClient.contractURI

Read `contractURI()` on an instance of `IChainlinkAnyApiClient`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_i_beacon_implementation_request** | [**InterfacesIBeaconImplementationRequest**](InterfacesIBeaconImplementationRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIContractUriContractUri200Response**](interfaces_IContractURI_contractURI_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_i_chainlink_any_api_client_defaultadminrole

> crate::models::InterfacesIChainlinkAnyApiClientDefaultAdminRole200Response interfaces_i_chainlink_any_api_client_defaultadminrole(network_id, address, interfaces_i_beacon_implementation_request)
IChainlinkAnyApiClient.DEFAULT_ADMIN_ROLE

Read `DEFAULT_ADMIN_ROLE()` on an instance of `IChainlinkAnyApiClient`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_i_beacon_implementation_request** | [**InterfacesIBeaconImplementationRequest**](InterfacesIBeaconImplementationRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIChainlinkAnyApiClientDefaultAdminRole200Response**](interfaces_IChainlinkAnyApiClient_DEFAULT_ADMIN_ROLE_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_i_chainlink_any_api_client_fulfill

> crate::models::InterfacesIChainlinkAnyApiClientFulfill200Response interfaces_i_chainlink_any_api_client_fulfill(network_id, address, interfaces_i_chainlink_any_api_client_fulfill_request)
IChainlinkAnyApiClient.fulfill

Write `fulfill(reqId,reqResponseData)` on an instance of `IChainlinkAnyApiClient`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_i_chainlink_any_api_client_fulfill_request** | [**InterfacesIChainlinkAnyApiClientFulfillRequest**](InterfacesIChainlinkAnyApiClientFulfillRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIChainlinkAnyApiClientFulfill200Response**](interfaces_IChainlinkAnyApiClient_fulfill_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_i_chainlink_any_api_client_get_role_admin

> crate::models::InterfacesIAccessControlGetRoleAdmin200Response interfaces_i_chainlink_any_api_client_get_role_admin(network_id, address, interfaces_i_access_control_get_role_admin_request)
IChainlinkAnyApiClient.getRoleAdmin

Read `getRoleAdmin(role)` on an instance of `IChainlinkAnyApiClient`

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


## interfaces_i_chainlink_any_api_client_grant_role

> crate::models::InterfacesIAccessControlGrantRole200Response interfaces_i_chainlink_any_api_client_grant_role(network_id, address, interfaces_i_access_control_grant_role_request)
IChainlinkAnyApiClient.grantRole

Write `grantRole(role,account)` on an instance of `IChainlinkAnyApiClient`

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


## interfaces_i_chainlink_any_api_client_has_role

> crate::models::InterfacesIAccessControlHasRole200Response interfaces_i_chainlink_any_api_client_has_role(network_id, address, interfaces_i_access_control_grant_role_request)
IChainlinkAnyApiClient.hasRole

Read `hasRole(role,account)` on an instance of `IChainlinkAnyApiClient`

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


## interfaces_i_chainlink_any_api_client_renounce_role

> crate::models::InterfacesIAccessControlGrantRole200Response interfaces_i_chainlink_any_api_client_renounce_role(network_id, address, interfaces_i_access_control_grant_role_request)
IChainlinkAnyApiClient.renounceRole

Write `renounceRole(role,account)` on an instance of `IChainlinkAnyApiClient`

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


## interfaces_i_chainlink_any_api_client_request

> crate::models::InterfacesIChainlinkAnyApiClientRequest200Response interfaces_i_chainlink_any_api_client_request(network_id, address, interfaces_i_chainlink_any_api_client_request_request)
IChainlinkAnyApiClient.request

Write `request(fulfillAddress,fulfillPrefixData,reqJobId,reqUrl,reqPath,reqFee)` on an instance of `IChainlinkAnyApiClient`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_i_chainlink_any_api_client_request_request** | [**InterfacesIChainlinkAnyApiClientRequestRequest**](InterfacesIChainlinkAnyApiClientRequestRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIChainlinkAnyApiClientRequest200Response**](interfaces_IChainlinkAnyApiClient_request_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_i_chainlink_any_api_client_requests

> crate::models::InterfacesIChainlinkAnyApiClientRequests200Response interfaces_i_chainlink_any_api_client_requests(network_id, address, interfaces_i_chainlink_any_api_client_requests_request)
IChainlinkAnyApiClient.requests

Read `requests()` on an instance of `IChainlinkAnyApiClient`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_i_chainlink_any_api_client_requests_request** | [**InterfacesIChainlinkAnyApiClientRequestsRequest**](InterfacesIChainlinkAnyApiClientRequestsRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIChainlinkAnyApiClientRequests200Response**](interfaces_IChainlinkAnyApiClient_requests_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_i_chainlink_any_api_client_revoke_role

> crate::models::InterfacesIAccessControlGrantRole200Response interfaces_i_chainlink_any_api_client_revoke_role(network_id, address, interfaces_i_access_control_grant_role_request)
IChainlinkAnyApiClient.revokeRole

Write `revokeRole(role,account)` on an instance of `IChainlinkAnyApiClient`

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


## interfaces_i_chainlink_any_api_client_set_contract_uri

> crate::models::InterfacesIContractUriSetContractUri200Response interfaces_i_chainlink_any_api_client_set_contract_uri(network_id, address, interfaces_i_contract_uri_set_contract_uri_request)
IChainlinkAnyApiClient.setContractURI

Write `setContractURI(uri)` on an instance of `IChainlinkAnyApiClient`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_i_contract_uri_set_contract_uri_request** | [**InterfacesIContractUriSetContractUriRequest**](InterfacesIContractUriSetContractUriRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIContractUriSetContractUri200Response**](interfaces_IContractURI_setContractURI_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_i_chainlink_any_api_client_supports_interface

> crate::models::InterfacesIerc165SupportsInterface200Response interfaces_i_chainlink_any_api_client_supports_interface(network_id, address, interfaces_ierc165_supports_interface_request)
IChainlinkAnyApiClient.supportsInterface

Read `supportsInterface(interfaceId)` on an instance of `IChainlinkAnyApiClient`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc165_supports_interface_request** | [**InterfacesIerc165SupportsInterfaceRequest**](InterfacesIerc165SupportsInterfaceRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc165SupportsInterface200Response**](interfaces_IERC165_supportsInterface_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_i_chainlink_any_api_client_version

> crate::models::InterfacesIContractUriContractUri200Response interfaces_i_chainlink_any_api_client_version(network_id, address, interfaces_i_beacon_implementation_request)
IChainlinkAnyApiClient.version

Read `version()` on an instance of `IChainlinkAnyApiClient`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_i_beacon_implementation_request** | [**InterfacesIBeaconImplementationRequest**](InterfacesIBeaconImplementationRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIContractUriContractUri200Response**](interfaces_IContractURI_contractURI_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_i_chainlink_any_api_client_withdraw_link

> crate::models::InterfacesIerc20Transfer200Response interfaces_i_chainlink_any_api_client_withdraw_link(network_id, address, interfaces_ierc20_transfer_request)
IChainlinkAnyApiClient.withdrawLink

Write `withdrawLink(to,amount)` on an instance of `IChainlinkAnyApiClient`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc20_transfer_request** | [**InterfacesIerc20TransferRequest**](InterfacesIerc20TransferRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc20Transfer200Response**](interfaces_IERC20_transfer_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

