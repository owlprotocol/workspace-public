# \ITokenUriApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfaces_i_token_uri_token_uri**](ITokenUriApi.md#interfaces_i_token_uri_token_uri) | **POST** /{networkId}/interface/ITokenURI/read/{address}/tokenURI | ITokenURI.tokenURI



## interfaces_i_token_uri_token_uri

> crate::models::InterfacesIerc721MetadataTokenUri200Response interfaces_i_token_uri_token_uri(network_id, address, interfaces_ierc721_get_approved_request)
ITokenURI.tokenURI

Read `tokenURI(tokenId)` on an instance of `ITokenURI`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc721_get_approved_request** | [**InterfacesIerc721GetApprovedRequest**](InterfacesIerc721GetApprovedRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIerc721MetadataTokenUri200Response**](interfaces_IERC721Metadata_tokenURI_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

