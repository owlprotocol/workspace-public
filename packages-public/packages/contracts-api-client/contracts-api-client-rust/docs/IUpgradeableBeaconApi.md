# \IUpgradeableBeaconApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**interfaces_i_upgradeable_beacon_upgrade_to**](IUpgradeableBeaconApi.md#interfaces_i_upgradeable_beacon_upgrade_to) | **POST** /{networkId}/interface/IUpgradeableBeacon/write/{address}/upgradeTo | IUpgradeableBeacon.upgradeTo



## interfaces_i_upgradeable_beacon_upgrade_to

> crate::models::InterfacesIUpgradeableBeaconUpgradeTo200Response interfaces_i_upgradeable_beacon_upgrade_to(network_id, address, interfaces_i_upgradeable_beacon_upgrade_to_request)
IUpgradeableBeacon.upgradeTo

Write `upgradeTo(newImplementation)` on an instance of `IUpgradeableBeacon`

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**network_id** | **String** | The network id | [required] |[default to 80001]
**address** | **String** | An ethereum address | [required] |
**interfaces_i_upgradeable_beacon_upgrade_to_request** | [**InterfacesIUpgradeableBeaconUpgradeToRequest**](InterfacesIUpgradeableBeaconUpgradeToRequest.md) |  | [required] |

### Return type

[**crate::models::InterfacesIUpgradeableBeaconUpgradeTo200Response**](interfaces_IUpgradeableBeacon_upgradeTo_200_response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

