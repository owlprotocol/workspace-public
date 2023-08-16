# \DeployApi

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**DeployBeaconProxy**](DeployApi.md#DeployBeaconProxy) | **Post** /{networkId}/deploy/BeaconProxy | Deploy BeaconProxy
[**DeployChainlinkAnyApiClient**](DeployApi.md#DeployChainlinkAnyApiClient) | **Post** /{networkId}/deploy/ChainlinkAnyApiClient | Deploy ChainlinkAnyApiClient
[**DeployERC1155Mintable**](DeployApi.md#DeployERC1155Mintable) | **Post** /{networkId}/deploy/ERC1155Mintable | Deploy ERC1155Mintable
[**DeployERC20Mintable**](DeployApi.md#DeployERC20Mintable) | **Post** /{networkId}/deploy/ERC20Mintable | Deploy ERC20Mintable
[**DeployERC2981Setter**](DeployApi.md#DeployERC2981Setter) | **Post** /{networkId}/deploy/ERC2981Setter | Deploy ERC2981Setter
[**DeployERC721Mintable**](DeployApi.md#DeployERC721Mintable) | **Post** /{networkId}/deploy/ERC721Mintable | Deploy ERC721Mintable
[**DeployERC721MintableAutoId**](DeployApi.md#DeployERC721MintableAutoId) | **Post** /{networkId}/deploy/ERC721MintableAutoId | Deploy ERC721MintableAutoId
[**DeployTokenDna**](DeployApi.md#DeployTokenDna) | **Post** /{networkId}/deploy/TokenDna | Deploy TokenDna
[**DeployTokenURI**](DeployApi.md#DeployTokenURI) | **Post** /{networkId}/deploy/TokenURI | Deploy TokenURI
[**DeployTokenURIBaseURI**](DeployApi.md#DeployTokenURIBaseURI) | **Post** /{networkId}/deploy/TokenURIBaseURI | Deploy TokenURIBaseURI
[**DeployTokenURIDna**](DeployApi.md#DeployTokenURIDna) | **Post** /{networkId}/deploy/TokenURIDna | Deploy TokenURIDna
[**DeployUpgradeableBeacon**](DeployApi.md#DeployUpgradeableBeacon) | **Post** /{networkId}/deploy/UpgradeableBeacon | Deploy UpgradeableBeacon



## DeployBeaconProxy

> interface{} DeployBeaconProxy(ctx, networkId).DeployBeaconProxyRequest(deployBeaconProxyRequest).Execute()

Deploy BeaconProxy



### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
    networkId := "networkId_example" // string | The network id (default to "80001")
    deployBeaconProxyRequest := *openapiclient.NewDeployBeaconProxyRequest(*openapiclient.NewDeployBeaconProxyRequestDeployParams("DeploymentMethod_example"), *openapiclient.NewDeployBeaconProxyRequestContractParams()) // DeployBeaconProxyRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.DeployApi.DeployBeaconProxy(context.Background(), networkId).DeployBeaconProxyRequest(deployBeaconProxyRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `DeployApi.DeployBeaconProxy``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `DeployBeaconProxy`: interface{}
    fmt.Fprintf(os.Stdout, "Response from `DeployApi.DeployBeaconProxy`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]

### Other Parameters

Other parameters are passed through a pointer to a apiDeployBeaconProxyRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **deployBeaconProxyRequest** | [**DeployBeaconProxyRequest**](DeployBeaconProxyRequest.md) |  | 

### Return type

**interface{}**

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeployChainlinkAnyApiClient

> interface{} DeployChainlinkAnyApiClient(ctx, networkId).DeployChainlinkAnyApiClientRequest(deployChainlinkAnyApiClientRequest).Execute()

Deploy ChainlinkAnyApiClient



### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
    networkId := "networkId_example" // string | The network id (default to "80001")
    deployChainlinkAnyApiClientRequest := *openapiclient.NewDeployChainlinkAnyApiClientRequest(*openapiclient.NewDeployBeaconProxyRequestDeployParams("DeploymentMethod_example"), *openapiclient.NewDeployChainlinkAnyApiClientRequestContractParams()) // DeployChainlinkAnyApiClientRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.DeployApi.DeployChainlinkAnyApiClient(context.Background(), networkId).DeployChainlinkAnyApiClientRequest(deployChainlinkAnyApiClientRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `DeployApi.DeployChainlinkAnyApiClient``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `DeployChainlinkAnyApiClient`: interface{}
    fmt.Fprintf(os.Stdout, "Response from `DeployApi.DeployChainlinkAnyApiClient`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]

### Other Parameters

Other parameters are passed through a pointer to a apiDeployChainlinkAnyApiClientRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **deployChainlinkAnyApiClientRequest** | [**DeployChainlinkAnyApiClientRequest**](DeployChainlinkAnyApiClientRequest.md) |  | 

### Return type

**interface{}**

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeployERC1155Mintable

> interface{} DeployERC1155Mintable(ctx, networkId).DeployERC1155MintableRequest(deployERC1155MintableRequest).Execute()

Deploy ERC1155Mintable



### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
    networkId := "networkId_example" // string | The network id (default to "80001")
    deployERC1155MintableRequest := *openapiclient.NewDeployERC1155MintableRequest(*openapiclient.NewDeployBeaconProxyRequestDeployParams("DeploymentMethod_example"), *openapiclient.NewDeployERC1155MintableRequestContractParams()) // DeployERC1155MintableRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.DeployApi.DeployERC1155Mintable(context.Background(), networkId).DeployERC1155MintableRequest(deployERC1155MintableRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `DeployApi.DeployERC1155Mintable``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `DeployERC1155Mintable`: interface{}
    fmt.Fprintf(os.Stdout, "Response from `DeployApi.DeployERC1155Mintable`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]

### Other Parameters

Other parameters are passed through a pointer to a apiDeployERC1155MintableRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **deployERC1155MintableRequest** | [**DeployERC1155MintableRequest**](DeployERC1155MintableRequest.md) |  | 

### Return type

**interface{}**

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeployERC20Mintable

> interface{} DeployERC20Mintable(ctx, networkId).DeployERC20MintableRequest(deployERC20MintableRequest).Execute()

Deploy ERC20Mintable



### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
    networkId := "networkId_example" // string | The network id (default to "80001")
    deployERC20MintableRequest := *openapiclient.NewDeployERC20MintableRequest(*openapiclient.NewDeployBeaconProxyRequestDeployParams("DeploymentMethod_example"), *openapiclient.NewDeployERC20MintableRequestContractParams()) // DeployERC20MintableRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.DeployApi.DeployERC20Mintable(context.Background(), networkId).DeployERC20MintableRequest(deployERC20MintableRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `DeployApi.DeployERC20Mintable``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `DeployERC20Mintable`: interface{}
    fmt.Fprintf(os.Stdout, "Response from `DeployApi.DeployERC20Mintable`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]

### Other Parameters

Other parameters are passed through a pointer to a apiDeployERC20MintableRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **deployERC20MintableRequest** | [**DeployERC20MintableRequest**](DeployERC20MintableRequest.md) |  | 

### Return type

**interface{}**

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeployERC2981Setter

> interface{} DeployERC2981Setter(ctx, networkId).DeployERC2981SetterRequest(deployERC2981SetterRequest).Execute()

Deploy ERC2981Setter



### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
    networkId := "networkId_example" // string | The network id (default to "80001")
    deployERC2981SetterRequest := *openapiclient.NewDeployERC2981SetterRequest(*openapiclient.NewDeployBeaconProxyRequestDeployParams("DeploymentMethod_example"), *openapiclient.NewDeployERC2981SetterRequestContractParams()) // DeployERC2981SetterRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.DeployApi.DeployERC2981Setter(context.Background(), networkId).DeployERC2981SetterRequest(deployERC2981SetterRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `DeployApi.DeployERC2981Setter``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `DeployERC2981Setter`: interface{}
    fmt.Fprintf(os.Stdout, "Response from `DeployApi.DeployERC2981Setter`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]

### Other Parameters

Other parameters are passed through a pointer to a apiDeployERC2981SetterRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **deployERC2981SetterRequest** | [**DeployERC2981SetterRequest**](DeployERC2981SetterRequest.md) |  | 

### Return type

**interface{}**

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeployERC721Mintable

> interface{} DeployERC721Mintable(ctx, networkId).DeployERC721MintableRequest(deployERC721MintableRequest).Execute()

Deploy ERC721Mintable



### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
    networkId := "networkId_example" // string | The network id (default to "80001")
    deployERC721MintableRequest := *openapiclient.NewDeployERC721MintableRequest(*openapiclient.NewDeployBeaconProxyRequestDeployParams("DeploymentMethod_example"), *openapiclient.NewDeployERC721MintableRequestContractParams()) // DeployERC721MintableRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.DeployApi.DeployERC721Mintable(context.Background(), networkId).DeployERC721MintableRequest(deployERC721MintableRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `DeployApi.DeployERC721Mintable``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `DeployERC721Mintable`: interface{}
    fmt.Fprintf(os.Stdout, "Response from `DeployApi.DeployERC721Mintable`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]

### Other Parameters

Other parameters are passed through a pointer to a apiDeployERC721MintableRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **deployERC721MintableRequest** | [**DeployERC721MintableRequest**](DeployERC721MintableRequest.md) |  | 

### Return type

**interface{}**

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeployERC721MintableAutoId

> interface{} DeployERC721MintableAutoId(ctx, networkId).DeployERC721MintableRequest(deployERC721MintableRequest).Execute()

Deploy ERC721MintableAutoId



### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
    networkId := "networkId_example" // string | The network id (default to "80001")
    deployERC721MintableRequest := *openapiclient.NewDeployERC721MintableRequest(*openapiclient.NewDeployBeaconProxyRequestDeployParams("DeploymentMethod_example"), *openapiclient.NewDeployERC721MintableRequestContractParams()) // DeployERC721MintableRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.DeployApi.DeployERC721MintableAutoId(context.Background(), networkId).DeployERC721MintableRequest(deployERC721MintableRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `DeployApi.DeployERC721MintableAutoId``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `DeployERC721MintableAutoId`: interface{}
    fmt.Fprintf(os.Stdout, "Response from `DeployApi.DeployERC721MintableAutoId`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]

### Other Parameters

Other parameters are passed through a pointer to a apiDeployERC721MintableAutoIdRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **deployERC721MintableRequest** | [**DeployERC721MintableRequest**](DeployERC721MintableRequest.md) |  | 

### Return type

**interface{}**

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeployTokenDna

> interface{} DeployTokenDna(ctx, networkId).DeployTokenDnaRequest(deployTokenDnaRequest).Execute()

Deploy TokenDna



### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
    networkId := "networkId_example" // string | The network id (default to "80001")
    deployTokenDnaRequest := *openapiclient.NewDeployTokenDnaRequest(*openapiclient.NewDeployBeaconProxyRequestDeployParams("DeploymentMethod_example"), *openapiclient.NewDeployTokenDnaRequestContractParams()) // DeployTokenDnaRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.DeployApi.DeployTokenDna(context.Background(), networkId).DeployTokenDnaRequest(deployTokenDnaRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `DeployApi.DeployTokenDna``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `DeployTokenDna`: interface{}
    fmt.Fprintf(os.Stdout, "Response from `DeployApi.DeployTokenDna`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]

### Other Parameters

Other parameters are passed through a pointer to a apiDeployTokenDnaRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **deployTokenDnaRequest** | [**DeployTokenDnaRequest**](DeployTokenDnaRequest.md) |  | 

### Return type

**interface{}**

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeployTokenURI

> interface{} DeployTokenURI(ctx, networkId).DeployTokenURIRequest(deployTokenURIRequest).Execute()

Deploy TokenURI



### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
    networkId := "networkId_example" // string | The network id (default to "80001")
    deployTokenURIRequest := *openapiclient.NewDeployTokenURIRequest(*openapiclient.NewDeployBeaconProxyRequestDeployParams("DeploymentMethod_example"), *openapiclient.NewDeployTokenURIRequestContractParams()) // DeployTokenURIRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.DeployApi.DeployTokenURI(context.Background(), networkId).DeployTokenURIRequest(deployTokenURIRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `DeployApi.DeployTokenURI``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `DeployTokenURI`: interface{}
    fmt.Fprintf(os.Stdout, "Response from `DeployApi.DeployTokenURI`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]

### Other Parameters

Other parameters are passed through a pointer to a apiDeployTokenURIRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **deployTokenURIRequest** | [**DeployTokenURIRequest**](DeployTokenURIRequest.md) |  | 

### Return type

**interface{}**

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeployTokenURIBaseURI

> interface{} DeployTokenURIBaseURI(ctx, networkId).DeployTokenURIBaseURIRequest(deployTokenURIBaseURIRequest).Execute()

Deploy TokenURIBaseURI



### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
    networkId := "networkId_example" // string | The network id (default to "80001")
    deployTokenURIBaseURIRequest := *openapiclient.NewDeployTokenURIBaseURIRequest(*openapiclient.NewDeployBeaconProxyRequestDeployParams("DeploymentMethod_example"), *openapiclient.NewDeployTokenURIBaseURIRequestContractParams()) // DeployTokenURIBaseURIRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.DeployApi.DeployTokenURIBaseURI(context.Background(), networkId).DeployTokenURIBaseURIRequest(deployTokenURIBaseURIRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `DeployApi.DeployTokenURIBaseURI``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `DeployTokenURIBaseURI`: interface{}
    fmt.Fprintf(os.Stdout, "Response from `DeployApi.DeployTokenURIBaseURI`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]

### Other Parameters

Other parameters are passed through a pointer to a apiDeployTokenURIBaseURIRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **deployTokenURIBaseURIRequest** | [**DeployTokenURIBaseURIRequest**](DeployTokenURIBaseURIRequest.md) |  | 

### Return type

**interface{}**

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeployTokenURIDna

> interface{} DeployTokenURIDna(ctx, networkId).DeployTokenURIDnaRequest(deployTokenURIDnaRequest).Execute()

Deploy TokenURIDna



### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
    networkId := "networkId_example" // string | The network id (default to "80001")
    deployTokenURIDnaRequest := *openapiclient.NewDeployTokenURIDnaRequest(*openapiclient.NewDeployBeaconProxyRequestDeployParams("DeploymentMethod_example"), *openapiclient.NewDeployTokenURIDnaRequestContractParams()) // DeployTokenURIDnaRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.DeployApi.DeployTokenURIDna(context.Background(), networkId).DeployTokenURIDnaRequest(deployTokenURIDnaRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `DeployApi.DeployTokenURIDna``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `DeployTokenURIDna`: interface{}
    fmt.Fprintf(os.Stdout, "Response from `DeployApi.DeployTokenURIDna`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]

### Other Parameters

Other parameters are passed through a pointer to a apiDeployTokenURIDnaRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **deployTokenURIDnaRequest** | [**DeployTokenURIDnaRequest**](DeployTokenURIDnaRequest.md) |  | 

### Return type

**interface{}**

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeployUpgradeableBeacon

> interface{} DeployUpgradeableBeacon(ctx, networkId).DeployUpgradeableBeaconRequest(deployUpgradeableBeaconRequest).Execute()

Deploy UpgradeableBeacon



### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
    networkId := "networkId_example" // string | The network id (default to "80001")
    deployUpgradeableBeaconRequest := *openapiclient.NewDeployUpgradeableBeaconRequest(*openapiclient.NewDeployBeaconProxyRequestDeployParams("DeploymentMethod_example"), *openapiclient.NewDeployUpgradeableBeaconRequestContractParams()) // DeployUpgradeableBeaconRequest | 

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.DeployApi.DeployUpgradeableBeacon(context.Background(), networkId).DeployUpgradeableBeaconRequest(deployUpgradeableBeaconRequest).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `DeployApi.DeployUpgradeableBeacon``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `DeployUpgradeableBeacon`: interface{}
    fmt.Fprintf(os.Stdout, "Response from `DeployApi.DeployUpgradeableBeacon`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**networkId** | **string** | The network id | [default to &quot;80001&quot;]

### Other Parameters

Other parameters are passed through a pointer to a apiDeployUpgradeableBeaconRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **deployUpgradeableBeaconRequest** | [**DeployUpgradeableBeaconRequest**](DeployUpgradeableBeaconRequest.md) |  | 

### Return type

**interface{}**

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

