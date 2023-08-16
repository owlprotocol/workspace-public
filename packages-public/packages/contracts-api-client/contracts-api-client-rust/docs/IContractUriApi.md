# \IContractUriApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfaces_i_contract_uri_contract_uri**](IContractUriApi.md#interfaces_i_contract_uri_contract_uri) | **POST** /{networkId}/interface/IContractURI/read/{address}/contractURI | IContractURI.contractURI
[**interfaces_i_contract_uri_set_contract_uri**](IContractUriApi.md#interfaces_i_contract_uri_set_contract_uri) | **POST** /{networkId}/interface/IContractURI/write/{address}/setContractURI | IContractURI.setContractURI



## interfaces_i_contract_uri_contract_uri

> crate::models::InterfacesIContractUriContractUri200Response interfaces_i_contract_uri_contract_uri(network_id, address, interfaces_i_beacon_implementation_request)
IContractURI.contractURI

Read `contractURI()` on an instance of `IContractURI`

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


## interfaces_i_contract_uri_set_contract_uri

> crate::models::InterfacesIContractUriSetContractUri200Response interfaces_i_contract_uri_set_contract_uri(network_id, address, interfaces_i_contract_uri_set_contract_uri_request)
IContractURI.setContractURI

Write `setContractURI(uri)` on an instance of `IContractURI`

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

