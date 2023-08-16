# \Ierc20Api

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfaces_ierc20_allowance**](Ierc20Api.md#interfaces_ierc20_allowance) | **POST** /{networkId}/interface/IERC20/read/{address}/allowance | IERC20.allowance
[**interfaces_ierc20_approve**](Ierc20Api.md#interfaces_ierc20_approve) | **POST** /{networkId}/interface/IERC20/write/{address}/approve | IERC20.approve
[**interfaces_ierc20_balance_of**](Ierc20Api.md#interfaces_ierc20_balance_of) | **POST** /{networkId}/interface/IERC20/read/{address}/balanceOf | IERC20.balanceOf
[**interfaces_ierc20_total_supply**](Ierc20Api.md#interfaces_ierc20_total_supply) | **POST** /{networkId}/interface/IERC20/read/{address}/totalSupply | IERC20.totalSupply
[**interfaces_ierc20_transfer**](Ierc20Api.md#interfaces_ierc20_transfer) | **POST** /{networkId}/interface/IERC20/write/{address}/transfer | IERC20.transfer
[**interfaces_ierc20_transfer_from**](Ierc20Api.md#interfaces_ierc20_transfer_from) | **POST** /{networkId}/interface/IERC20/write/{address}/transferFrom | IERC20.transferFrom



## interfaces_ierc20_allowance

> crate::models::InterfacesIerc20Allowance200Response interfaces_ierc20_allowance(network_id, address, interfaces_ierc20_allowance_request)
IERC20.allowance

Read `allowance(owner,spender)` on an instance of `IERC20`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc20_allowance_request** | [**InterfacesIerc20AllowanceRequest**](InterfacesIerc20AllowanceRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc20Allowance200Response**](interfaces_IERC20_allowance_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc20_approve

> crate::models::InterfacesIerc20Approve200Response interfaces_ierc20_approve(network_id, address, interfaces_ierc20_approve_request)
IERC20.approve

Write `approve(spender,amount)` on an instance of `IERC20`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc20_approve_request** | [**InterfacesIerc20ApproveRequest**](InterfacesIerc20ApproveRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc20Approve200Response**](interfaces_IERC20_approve_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc20_balance_of

> crate::models::InterfacesIerc20BalanceOf200Response interfaces_ierc20_balance_of(network_id, address, interfaces_ierc1820_get_manager_request)
IERC20.balanceOf

Read `balanceOf(account)` on an instance of `IERC20`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc1820_get_manager_request** | [**InterfacesIerc1820GetManagerRequest**](InterfacesIerc1820GetManagerRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc20BalanceOf200Response**](interfaces_IERC20_balanceOf_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc20_total_supply

> crate::models::InterfacesIerc20TotalSupply200Response interfaces_ierc20_total_supply(network_id, address, interfaces_i_beacon_implementation_request)
IERC20.totalSupply

Read `totalSupply()` on an instance of `IERC20`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_i_beacon_implementation_request** | [**InterfacesIBeaconImplementationRequest**](InterfacesIBeaconImplementationRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc20TotalSupply200Response**](interfaces_IERC20_totalSupply_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc20_transfer

> crate::models::InterfacesIerc20Transfer200Response interfaces_ierc20_transfer(network_id, address, interfaces_ierc20_transfer_request)
IERC20.transfer

Write `transfer(to,amount)` on an instance of `IERC20`

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


## interfaces_ierc20_transfer_from

> crate::models::InterfacesIerc20TransferFrom200Response interfaces_ierc20_transfer_from(network_id, address, interfaces_ierc20_transfer_from_request)
IERC20.transferFrom

Write `transferFrom(from,to,amount)` on an instance of `IERC20`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc20_transfer_from_request** | [**InterfacesIerc20TransferFromRequest**](InterfacesIerc20TransferFromRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc20TransferFrom200Response**](interfaces_IERC20_transferFrom_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

