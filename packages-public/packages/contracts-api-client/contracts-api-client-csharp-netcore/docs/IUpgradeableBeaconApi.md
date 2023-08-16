# Org.OpenAPITools.Api.IUpgradeableBeaconApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

| Method | HTTP request | Description |
|--------|--------------|-------------|
| [**InterfacesIUpgradeableBeaconUpgradeTo**](IUpgradeableBeaconApi.md#interfacesiupgradeablebeaconupgradeto) | **POST** /{networkId}/interface/IUpgradeableBeacon/write/{address}/upgradeTo | IUpgradeableBeacon.upgradeTo |

<a id="interfacesiupgradeablebeaconupgradeto"></a>
# **InterfacesIUpgradeableBeaconUpgradeTo**
> InterfacesIUpgradeableBeaconUpgradeTo200Response InterfacesIUpgradeableBeaconUpgradeTo (string networkId, string address, InterfacesIUpgradeableBeaconUpgradeToRequest interfacesIUpgradeableBeaconUpgradeToRequest)

IUpgradeableBeacon.upgradeTo

Write `upgradeTo(newImplementation)` on an instance of `IUpgradeableBeacon`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIUpgradeableBeaconUpgradeToExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IUpgradeableBeaconApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIUpgradeableBeaconUpgradeToRequest = new InterfacesIUpgradeableBeaconUpgradeToRequest(); // InterfacesIUpgradeableBeaconUpgradeToRequest | 

            try
            {
                // IUpgradeableBeacon.upgradeTo
                InterfacesIUpgradeableBeaconUpgradeTo200Response result = apiInstance.InterfacesIUpgradeableBeaconUpgradeTo(networkId, address, interfacesIUpgradeableBeaconUpgradeToRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IUpgradeableBeaconApi.InterfacesIUpgradeableBeaconUpgradeTo: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIUpgradeableBeaconUpgradeToWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IUpgradeableBeacon.upgradeTo
    ApiResponse<InterfacesIUpgradeableBeaconUpgradeTo200Response> response = apiInstance.InterfacesIUpgradeableBeaconUpgradeToWithHttpInfo(networkId, address, interfacesIUpgradeableBeaconUpgradeToRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IUpgradeableBeaconApi.InterfacesIUpgradeableBeaconUpgradeToWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIUpgradeableBeaconUpgradeToRequest** | [**InterfacesIUpgradeableBeaconUpgradeToRequest**](InterfacesIUpgradeableBeaconUpgradeToRequest.md) |  |  |

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

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

