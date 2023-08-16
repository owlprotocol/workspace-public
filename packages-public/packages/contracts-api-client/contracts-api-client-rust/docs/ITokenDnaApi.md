# \ITokenDnaApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfaces_i_token_dna_get_dna**](ITokenDnaApi.md#interfaces_i_token_dna_get_dna) | **POST** /{networkId}/interface/ITokenDna/read/{address}/getDna | ITokenDna.getDna
[**interfaces_i_token_dna_get_dna_batch**](ITokenDnaApi.md#interfaces_i_token_dna_get_dna_batch) | **POST** /{networkId}/interface/ITokenDna/read/{address}/getDnaBatch | ITokenDna.getDnaBatch
[**interfaces_i_token_dna_set_dna**](ITokenDnaApi.md#interfaces_i_token_dna_set_dna) | **POST** /{networkId}/interface/ITokenDna/write/{address}/setDna | ITokenDna.setDna
[**interfaces_i_token_dna_set_dna_batch**](ITokenDnaApi.md#interfaces_i_token_dna_set_dna_batch) | **POST** /{networkId}/interface/ITokenDna/write/{address}/setDnaBatch | ITokenDna.setDnaBatch



## interfaces_i_token_dna_get_dna

> crate::models::InterfacesITokenDnaGetDna200Response interfaces_i_token_dna_get_dna(network_id, address, interfaces_ierc721_get_approved_request)
ITokenDna.getDna

Read `getDna(tokenId)` on an instance of `ITokenDna`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_ierc721_get_approved_request** | [**InterfacesIerc721GetApprovedRequest**](InterfacesIerc721GetApprovedRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesITokenDnaGetDna200Response**](interfaces_ITokenDna_getDna_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_i_token_dna_get_dna_batch

> crate::models::InterfacesITokenDnaGetDnaBatch200Response interfaces_i_token_dna_get_dna_batch(network_id, address, interfaces_i_token_dna_get_dna_batch_request)
ITokenDna.getDnaBatch

Read `getDnaBatch(tokenId)` on an instance of `ITokenDna`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_i_token_dna_get_dna_batch_request** | [**InterfacesITokenDnaGetDnaBatchRequest**](InterfacesITokenDnaGetDnaBatchRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesITokenDnaGetDnaBatch200Response**](interfaces_ITokenDna_getDnaBatch_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_i_token_dna_set_dna

> crate::models::InterfacesITokenDnaSetDna200Response interfaces_i_token_dna_set_dna(network_id, address, interfaces_i_token_dna_set_dna_request)
ITokenDna.setDna

Write `setDna(tokenId,dna)` on an instance of `ITokenDna`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_i_token_dna_set_dna_request** | [**InterfacesITokenDnaSetDnaRequest**](InterfacesITokenDnaSetDnaRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesITokenDnaSetDna200Response**](interfaces_ITokenDna_setDna_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## interfaces_i_token_dna_set_dna_batch

> crate::models::InterfacesITokenDnaSetDnaBatch200Response interfaces_i_token_dna_set_dna_batch(network_id, address, interfaces_i_token_dna_set_dna_batch_request)
ITokenDna.setDnaBatch

Write `setDnaBatch(tokenId,dna)` on an instance of `ITokenDna`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_i_token_dna_set_dna_batch_request** | [**InterfacesITokenDnaSetDnaBatchRequest**](InterfacesITokenDnaSetDnaBatchRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesITokenDnaSetDnaBatch200Response**](interfaces_ITokenDna_setDnaBatch_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

