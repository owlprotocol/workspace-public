# \Ierc20MintableApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfaces_ierc20_mintable_mint**](Ierc20MintableApi.md#interfaces_ierc20_mintable_mint) | **POST** /{networkId}/interface/IERC20Mintable/write/{address}/mint | IERC20Mintable.mint



## interfaces_ierc20_mintable_mint

> crate::models::InterfacesIerc20Transfer200Response interfaces_ierc20_mintable_mint(network_id, address, interfaces_ierc20_transfer_request)
IERC20Mintable.mint

Write `mint(to,amount)` on an instance of `IERC20Mintable`

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

