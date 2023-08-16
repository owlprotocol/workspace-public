# \Ierc2981SetterApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfaces_ierc2981_setter_set_default_royalty**](Ierc2981SetterApi.md#interfaces_ierc2981_setter_set_default_royalty) | **POST** /{networkId}/interface/IERC2981Setter/write/{address}/setDefaultRoyalty | IERC2981Setter.setDefaultRoyalty
[**interfaces_ierc2981_setter_set_token_royalty**](Ierc2981SetterApi.md#interfaces_ierc2981_setter_set_token_royalty) | **POST** /{networkId}/interface/IERC2981Setter/write/{address}/setTokenRoyalty | IERC2981Setter.setTokenRoyalty



## interfaces_ierc2981_setter_set_default_royalty

> crate::models::InterfacesIerc2981SetterSetDefaultRoyalty200Response interfaces_ierc2981_setter_set_default_royalty(network_id, address, interfaces_ierc2981_setter_set_default_royalty_request)
IERC2981Setter.setDefaultRoyalty

Write `setDefaultRoyalty(receiver,feeNumerator)` on an instance of `IERC2981Setter`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc2981_setter_set_default_royalty_request** | [**InterfacesIerc2981SetterSetDefaultRoyaltyRequest**](InterfacesIerc2981SetterSetDefaultRoyaltyRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc2981SetterSetDefaultRoyalty200Response**](interfaces_IERC2981Setter_setDefaultRoyalty_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_ierc2981_setter_set_token_royalty

> crate::models::InterfacesIerc2981SetterSetTokenRoyalty200Response interfaces_ierc2981_setter_set_token_royalty(network_id, address, interfaces_ierc2981_setter_set_token_royalty_request)
IERC2981Setter.setTokenRoyalty

Write `setTokenRoyalty(tokenId,receiver,feeNumerator)` on an instance of `IERC2981Setter`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc2981_setter_set_token_royalty_request** | [**InterfacesIerc2981SetterSetTokenRoyaltyRequest**](InterfacesIerc2981SetterSetTokenRoyaltyRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc2981SetterSetTokenRoyalty200Response**](interfaces_IERC2981Setter_setTokenRoyalty_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

