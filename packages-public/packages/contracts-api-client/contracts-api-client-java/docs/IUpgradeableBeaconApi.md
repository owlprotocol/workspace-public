# IUpgradeableBeaconApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**interfacesIUpgradeableBeaconUpgradeTo**](IUpgradeableBeaconApi.md#interfacesIUpgradeableBeaconUpgradeTo) | **POST** /{networkId}/interface/IUpgradeableBeacon/write/{address}/upgradeTo | IUpgradeableBeacon.upgradeTo |


<a id="interfacesIUpgradeableBeaconUpgradeTo"></a>
# **interfacesIUpgradeableBeaconUpgradeTo**
> InterfacesIUpgradeableBeaconUpgradeTo200Response interfacesIUpgradeableBeaconUpgradeTo(networkId, address, interfacesIUpgradeableBeaconUpgradeToRequest)

IUpgradeableBeacon.upgradeTo

Write &#x60;upgradeTo(newImplementation)&#x60; on an instance of &#x60;IUpgradeableBeacon&#x60;

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.IUpgradeableBeaconApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://17a0-195-175-28-162.ngrok-free.app/api");
    
    // Configure API key authorization: Authorization
    ApiKeyAuth Authorization = (ApiKeyAuth) defaultClient.getAuthentication("Authorization");
    Authorization.setApiKey("YOUR API KEY");
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //Authorization.setApiKeyPrefix("Token");

    IUpgradeableBeaconApi apiInstance = new IUpgradeableBeaconApi(defaultClient);
    String networkId = "80001"; // String | The network id
    String address = "address_example"; // String | An ethereum address
    InterfacesIUpgradeableBeaconUpgradeToRequest interfacesIUpgradeableBeaconUpgradeToRequest = new InterfacesIUpgradeableBeaconUpgradeToRequest(); // InterfacesIUpgradeableBeaconUpgradeToRequest | 
    try {
      InterfacesIUpgradeableBeaconUpgradeTo200Response result = apiInstance.interfacesIUpgradeableBeaconUpgradeTo(networkId, address, interfacesIUpgradeableBeaconUpgradeToRequest);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling IUpgradeableBeaconApi#interfacesIUpgradeableBeaconUpgradeTo");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **networkId** | **String**| The network id | [default to 80001] |
| **address** | **String**| An ethereum address | |
| **interfacesIUpgradeableBeaconUpgradeToRequest** | [**InterfacesIUpgradeableBeaconUpgradeToRequest**](InterfacesIUpgradeableBeaconUpgradeToRequest.md)|  | |

### Return type

[**InterfacesIUpgradeableBeaconUpgradeTo200Response**](InterfacesIUpgradeableBeaconUpgradeTo200Response.md)

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful response |  -  |
| **0** | Error response |  -  |

