# \Ierc165Api

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfaces_ierc165_supports_interface**](Ierc165Api.md#interfaces_ierc165_supports_interface) | **POST** /{networkId}/interface/IERC165/read/{address}/supportsInterface | IERC165.supportsInterface



## interfaces_ierc165_supports_interface

> crate::models::InterfacesIerc165SupportsInterface200Response interfaces_ierc165_supports_interface(network_id, address, interfaces_ierc165_supports_interface_request)
IERC165.supportsInterface

Read `supportsInterface(interfaceId)` on an instance of `IERC165`

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

