# \IBeaconApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfaces_i_beacon_implementation**](IBeaconApi.md#interfaces_i_beacon_implementation) | **POST** /{networkId}/interface/IBeacon/read/{address}/implementation | IBeacon.implementation



## interfaces_i_beacon_implementation

> crate::models::InterfacesIBeaconImplementation200Response interfaces_i_beacon_implementation(network_id, address, interfaces_i_beacon_implementation_request)
IBeacon.implementation

Read `implementation()` on an instance of `IBeacon`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_i_beacon_implementation_request** | [**InterfacesIBeaconImplementationRequest**](InterfacesIBeaconImplementationRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIBeaconImplementation200Response**](interfaces_IBeacon_implementation_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

