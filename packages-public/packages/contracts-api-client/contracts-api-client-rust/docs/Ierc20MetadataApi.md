# \Ierc20MetadataApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfaces_ierc20_metadata_allowance**](Ierc20MetadataApi.md#interfaces_ierc20_metadata_allowance) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/allowance | IERC20Metadata.allowance
[**interfaces_ierc20_metadata_approve**](Ierc20MetadataApi.md#interfaces_ierc20_metadata_approve) | **POST** /{networkId}/interface/IERC20Metadata/write/{address}/approve | IERC20Metadata.approve
[**interfaces_ierc20_metadata_balance_of**](Ierc20MetadataApi.md#interfaces_ierc20_metadata_balance_of) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/balanceOf | IERC20Metadata.balanceOf
[**interfaces_ierc20_metadata_decimals**](Ierc20MetadataApi.md#interfaces_ierc20_metadata_decimals) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/decimals | IERC20Metadata.decimals
[**interfaces_ierc20_metadata_name**](Ierc20MetadataApi.md#interfaces_ierc20_metadata_name) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/name | IERC20Metadata.name
[**interfaces_ierc20_metadata_symbol**](Ierc20MetadataApi.md#interfaces_ierc20_metadata_symbol) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/symbol | IERC20Metadata.symbol
[**interfaces_ierc20_metadata_total_supply**](Ierc20MetadataApi.md#interfaces_ierc20_metadata_total_supply) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/totalSupply | IERC20Metadata.totalSupply
[**interfaces_ierc20_metadata_transfer**](Ierc20MetadataApi.md#interfaces_ierc20_metadata_transfer) | **POST** /{networkId}/interface/IERC20Metadata/write/{address}/transfer | IERC20Metadata.transfer
[**interfaces_ierc20_metadata_transfer_from**](Ierc20MetadataApi.md#interfaces_ierc20_metadata_transfer_from) | **POST** /{networkId}/interface/IERC20Metadata/write/{address}/transferFrom | IERC20Metadata.transferFrom



## interfaces_ierc20_metadata_allowance

> crate::models::InterfacesIerc20Allowance200Response interfaces_ierc20_metadata_allowance(network_id, address, interfaces_ierc20_allowance_request)
IERC20Metadata.allowance

Read `allowance(owner,spender)` on an instance of `IERC20Metadata`

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


## interfaces_ierc20_metadata_approve

> crate::models::InterfacesIerc20Approve200Response interfaces_ierc20_metadata_approve(network_id, address, interfaces_ierc20_approve_request)
IERC20Metadata.approve

Write `approve(spender,amount)` on an instance of `IERC20Metadata`

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


## interfaces_ierc20_metadata_balance_of

> crate::models::InterfacesIerc20BalanceOf200Response interfaces_ierc20_metadata_balance_of(network_id, address, interfaces_ierc1820_get_manager_request)
IERC20Metadata.balanceOf

Read `balanceOf(account)` on an instance of `IERC20Metadata`

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


## interfaces_ierc20_metadata_decimals

> crate::models::InterfacesIerc20MetadataDecimals200Response interfaces_ierc20_metadata_decimals(network_id, address, interfaces_i_beacon_implementation_request)
IERC20Metadata.decimals

Read `decimals()` on an instance of `IERC20Metadata`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_i_beacon_implementation_request** | [**InterfacesIBeaconImplementationRequest**](InterfacesIBeaconImplementationRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc20MetadataDecimals200Response**](interfaces_IERC20Metadata_decimals_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc20_metadata_name

> crate::models::InterfacesIContractUriContractUri200Response interfaces_ierc20_metadata_name(network_id, address, interfaces_i_beacon_implementation_request)
IERC20Metadata.name

Read `name()` on an instance of `IERC20Metadata`

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


## interfaces_ierc20_metadata_symbol

> crate::models::InterfacesIContractUriContractUri200Response interfaces_ierc20_metadata_symbol(network_id, address, interfaces_i_beacon_implementation_request)
IERC20Metadata.symbol

Read `symbol()` on an instance of `IERC20Metadata`

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


## interfaces_ierc20_metadata_total_supply

> crate::models::InterfacesIerc20TotalSupply200Response interfaces_ierc20_metadata_total_supply(network_id, address, interfaces_i_beacon_implementation_request)
IERC20Metadata.totalSupply

Read `totalSupply()` on an instance of `IERC20Metadata`

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


## interfaces_ierc20_metadata_transfer

> crate::models::InterfacesIerc20Transfer200Response interfaces_ierc20_metadata_transfer(network_id, address, interfaces_ierc20_transfer_request)
IERC20Metadata.transfer

Write `transfer(to,amount)` on an instance of `IERC20Metadata`

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


## interfaces_ierc20_metadata_transfer_from

> crate::models::InterfacesIerc20TransferFrom200Response interfaces_ierc20_metadata_transfer_from(network_id, address, interfaces_ierc20_transfer_from_request)
IERC20Metadata.transferFrom

Write `transferFrom(from,to,amount)` on an instance of `IERC20Metadata`

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

