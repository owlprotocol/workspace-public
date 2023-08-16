# Org.OpenAPITools.Api.IERC20MintableApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

| Method | HTTP request | Description |
|--------|--------------|-------------|
| [**InterfacesIERC20MintableMint**](IERC20MintableApi.md#interfacesierc20mintablemint) | **POST** /{networkId}/interface/IERC20Mintable/write/{address}/mint | IERC20Mintable.mint |

<a id="interfacesierc20mintablemint"></a>
# **InterfacesIERC20MintableMint**
> InterfacesIERC20Transfer200Response InterfacesIERC20MintableMint (string networkId, string address, InterfacesIERC20TransferRequest interfacesIERC20TransferRequest)

IERC20Mintable.mint

Write `mint(to,amount)` on an instance of `IERC20Mintable`

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class InterfacesIERC20MintableMintExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://17a0-195-175-28-162.ngrok-free.app/api";
            // Configure API key authorization: Authorization
            config.AddApiKey("x-api-key", "YOUR_API_KEY");
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // config.AddApiKeyPrefix("x-api-key", "Bearer");

            var apiInstance = new IERC20MintableApi(config);
            var networkId = "\"80001\"";  // string | The network id (default to "80001")
            var address = "address_example";  // string | An ethereum address
            var interfacesIERC20TransferRequest = new InterfacesIERC20TransferRequest(); // InterfacesIERC20TransferRequest | 

            try
            {
                // IERC20Mintable.mint
                InterfacesIERC20Transfer200Response result = apiInstance.InterfacesIERC20MintableMint(networkId, address, interfacesIERC20TransferRequest);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling IERC20MintableApi.InterfacesIERC20MintableMint: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the InterfacesIERC20MintableMintWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // IERC20Mintable.mint
    ApiResponse<InterfacesIERC20Transfer200Response> response = apiInstance.InterfacesIERC20MintableMintWithHttpInfo(networkId, address, interfacesIERC20TransferRequest);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling IERC20MintableApi.InterfacesIERC20MintableMintWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **networkId** | **string** | The network id | [default to &quot;80001&quot;] |
| **address** | **string** | An ethereum address |  |
| **interfacesIERC20TransferRequest** | [**InterfacesIERC20TransferRequest**](InterfacesIERC20TransferRequest.md) |  |  |

### Return type

[**InterfacesIERC20Transfer200Response**](InterfacesIERC20Transfer200Response.md)

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

