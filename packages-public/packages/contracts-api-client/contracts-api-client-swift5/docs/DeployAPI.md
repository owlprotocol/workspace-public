# DeployAPI

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**deployBeaconProxy**](DeployAPI.md#deploybeaconproxy) | **POST** /{networkId}/deploy/BeaconProxy | Deploy BeaconProxy
[**deployChainlinkAnyApiClient**](DeployAPI.md#deploychainlinkanyapiclient) | **POST** /{networkId}/deploy/ChainlinkAnyApiClient | Deploy ChainlinkAnyApiClient
[**deployERC1155Mintable**](DeployAPI.md#deployerc1155mintable) | **POST** /{networkId}/deploy/ERC1155Mintable | Deploy ERC1155Mintable
[**deployERC20Mintable**](DeployAPI.md#deployerc20mintable) | **POST** /{networkId}/deploy/ERC20Mintable | Deploy ERC20Mintable
[**deployERC2981Setter**](DeployAPI.md#deployerc2981setter) | **POST** /{networkId}/deploy/ERC2981Setter | Deploy ERC2981Setter
[**deployERC721Mintable**](DeployAPI.md#deployerc721mintable) | **POST** /{networkId}/deploy/ERC721Mintable | Deploy ERC721Mintable
[**deployERC721MintableAutoId**](DeployAPI.md#deployerc721mintableautoid) | **POST** /{networkId}/deploy/ERC721MintableAutoId | Deploy ERC721MintableAutoId
[**deployTokenDna**](DeployAPI.md#deploytokendna) | **POST** /{networkId}/deploy/TokenDna | Deploy TokenDna
[**deployTokenURI**](DeployAPI.md#deploytokenuri) | **POST** /{networkId}/deploy/TokenURI | Deploy TokenURI
[**deployTokenURIBaseURI**](DeployAPI.md#deploytokenuribaseuri) | **POST** /{networkId}/deploy/TokenURIBaseURI | Deploy TokenURIBaseURI
[**deployTokenURIDna**](DeployAPI.md#deploytokenuridna) | **POST** /{networkId}/deploy/TokenURIDna | Deploy TokenURIDna
[**deployUpgradeableBeacon**](DeployAPI.md#deployupgradeablebeacon) | **POST** /{networkId}/deploy/UpgradeableBeacon | Deploy UpgradeableBeacon


# **deployBeaconProxy**
```swift
    open class func deployBeaconProxy(networkId: String, deployBeaconProxyRequest: DeployBeaconProxyRequest, completion: @escaping (_ data: AnyCodable?, _ error: Error?) -> Void)
```

Deploy BeaconProxy

Deploys an instance of `BeaconProxy`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let deployBeaconProxyRequest = deploy_BeaconProxy_request(deployParams: deploy_BeaconProxy_request_deployParams(msgSender: "msgSender_example", salt: "salt_example", deploymentMethod: "deploymentMethod_example", beaconAddress: "beaconAddress_example", beaonAdmin: "beaonAdmin_example"), contractParams: deploy_BeaconProxy_request_contractParams(_0: "_0_example", _1: "_1_example", _2: "_2_example", admin: "admin_example", beaconAddress: "beaconAddress_example", data: "data_example")) // DeployBeaconProxyRequest | 

// Deploy BeaconProxy
DeployAPI.deployBeaconProxy(networkId: networkId, deployBeaconProxyRequest: deployBeaconProxyRequest) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String** | The network id | [default to &quot;80001&quot;]
 **deployBeaconProxyRequest** | [**DeployBeaconProxyRequest**](DeployBeaconProxyRequest.md) |  | 

### Return type

**AnyCodable**

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deployChainlinkAnyApiClient**
```swift
    open class func deployChainlinkAnyApiClient(networkId: String, deployChainlinkAnyApiClientRequest: DeployChainlinkAnyApiClientRequest, completion: @escaping (_ data: AnyCodable?, _ error: Error?) -> Void)
```

Deploy ChainlinkAnyApiClient

Deploys an instance of `ChainlinkAnyApiClient`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let deployChainlinkAnyApiClientRequest = deploy_ChainlinkAnyApiClient_request(deployParams: deploy_BeaconProxy_request_deployParams(msgSender: "msgSender_example", salt: "salt_example", deploymentMethod: "deploymentMethod_example", beaconAddress: "beaconAddress_example", beaonAdmin: "beaonAdmin_example"), contractParams: deploy_ChainlinkAnyApiClient_request_contractParams(_0: "_0_example", _1: "_1_example", _2: "_2_example", _3: "_3_example", admin: "admin_example", initContractURI: "initContractURI_example", token: "token_example", oracle: "oracle_example")) // DeployChainlinkAnyApiClientRequest | 

// Deploy ChainlinkAnyApiClient
DeployAPI.deployChainlinkAnyApiClient(networkId: networkId, deployChainlinkAnyApiClientRequest: deployChainlinkAnyApiClientRequest) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String** | The network id | [default to &quot;80001&quot;]
 **deployChainlinkAnyApiClientRequest** | [**DeployChainlinkAnyApiClientRequest**](DeployChainlinkAnyApiClientRequest.md) |  | 

### Return type

**AnyCodable**

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deployERC1155Mintable**
```swift
    open class func deployERC1155Mintable(networkId: String, deployERC1155MintableRequest: DeployERC1155MintableRequest, completion: @escaping (_ data: AnyCodable?, _ error: Error?) -> Void)
```

Deploy ERC1155Mintable

Deploys an instance of `ERC1155Mintable`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let deployERC1155MintableRequest = deploy_ERC1155Mintable_request(deployParams: deploy_BeaconProxy_request_deployParams(msgSender: "msgSender_example", salt: "salt_example", deploymentMethod: "deploymentMethod_example", beaconAddress: "beaconAddress_example", beaonAdmin: "beaonAdmin_example"), contractParams: deploy_ERC1155Mintable_request_contractParams(_0: "_0_example", _1: "_1_example", _2: "_2_example", _3: "_3_example", admin: "admin_example", initContractURI: "initContractURI_example", tokenUriProvider: "tokenUriProvider_example", tokenRoyaltyProvider: "tokenRoyaltyProvider_example")) // DeployERC1155MintableRequest | 

// Deploy ERC1155Mintable
DeployAPI.deployERC1155Mintable(networkId: networkId, deployERC1155MintableRequest: deployERC1155MintableRequest) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String** | The network id | [default to &quot;80001&quot;]
 **deployERC1155MintableRequest** | [**DeployERC1155MintableRequest**](DeployERC1155MintableRequest.md) |  | 

### Return type

**AnyCodable**

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deployERC20Mintable**
```swift
    open class func deployERC20Mintable(networkId: String, deployERC20MintableRequest: DeployERC20MintableRequest, completion: @escaping (_ data: AnyCodable?, _ error: Error?) -> Void)
```

Deploy ERC20Mintable

Deploys an instance of `ERC20Mintable`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let deployERC20MintableRequest = deploy_ERC20Mintable_request(deployParams: deploy_BeaconProxy_request_deployParams(msgSender: "msgSender_example", salt: "salt_example", deploymentMethod: "deploymentMethod_example", beaconAddress: "beaconAddress_example", beaonAdmin: "beaonAdmin_example"), contractParams: deploy_ERC20Mintable_request_contractParams(_0: "_0_example", _1: "_1_example", _2: "_2_example", _3: "_3_example", admin: "admin_example", initContractURI: "initContractURI_example", name: "name_example", symbol: "symbol_example")) // DeployERC20MintableRequest | 

// Deploy ERC20Mintable
DeployAPI.deployERC20Mintable(networkId: networkId, deployERC20MintableRequest: deployERC20MintableRequest) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String** | The network id | [default to &quot;80001&quot;]
 **deployERC20MintableRequest** | [**DeployERC20MintableRequest**](DeployERC20MintableRequest.md) |  | 

### Return type

**AnyCodable**

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deployERC2981Setter**
```swift
    open class func deployERC2981Setter(networkId: String, deployERC2981SetterRequest: DeployERC2981SetterRequest, completion: @escaping (_ data: AnyCodable?, _ error: Error?) -> Void)
```

Deploy ERC2981Setter

Deploys an instance of `ERC2981Setter`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let deployERC2981SetterRequest = deploy_ERC2981Setter_request(deployParams: deploy_BeaconProxy_request_deployParams(msgSender: "msgSender_example", salt: "salt_example", deploymentMethod: "deploymentMethod_example", beaconAddress: "beaconAddress_example", beaonAdmin: "beaonAdmin_example"), contractParams: deploy_ERC2981Setter_request_contractParams(_0: "_0_example", _1: "_1_example", _2: "_2_example", _3: "_3_example", _4: "_4_example", admin: "admin_example", contractUri: "contractUri_example", royaltyRole: "royaltyRole_example", royaltyReceiver: "royaltyReceiver_example", feeNumerator: "feeNumerator_example")) // DeployERC2981SetterRequest | 

// Deploy ERC2981Setter
DeployAPI.deployERC2981Setter(networkId: networkId, deployERC2981SetterRequest: deployERC2981SetterRequest) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String** | The network id | [default to &quot;80001&quot;]
 **deployERC2981SetterRequest** | [**DeployERC2981SetterRequest**](DeployERC2981SetterRequest.md) |  | 

### Return type

**AnyCodable**

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deployERC721Mintable**
```swift
    open class func deployERC721Mintable(networkId: String, deployERC721MintableRequest: DeployERC721MintableRequest, completion: @escaping (_ data: AnyCodable?, _ error: Error?) -> Void)
```

Deploy ERC721Mintable

Deploys an instance of `ERC721Mintable`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let deployERC721MintableRequest = deploy_ERC721Mintable_request(deployParams: deploy_BeaconProxy_request_deployParams(msgSender: "msgSender_example", salt: "salt_example", deploymentMethod: "deploymentMethod_example", beaconAddress: "beaconAddress_example", beaonAdmin: "beaonAdmin_example"), contractParams: deploy_ERC721Mintable_request_contractParams(_0: "_0_example", _1: "_1_example", _2: "_2_example", _3: "_3_example", _4: "_4_example", _5: "_5_example", admin: "admin_example", initContractURI: "initContractURI_example", name: "name_example", symbol: "symbol_example", tokenUriProvider: "tokenUriProvider_example", tokenRoyaltyProvider: "tokenRoyaltyProvider_example")) // DeployERC721MintableRequest | 

// Deploy ERC721Mintable
DeployAPI.deployERC721Mintable(networkId: networkId, deployERC721MintableRequest: deployERC721MintableRequest) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String** | The network id | [default to &quot;80001&quot;]
 **deployERC721MintableRequest** | [**DeployERC721MintableRequest**](DeployERC721MintableRequest.md) |  | 

### Return type

**AnyCodable**

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deployERC721MintableAutoId**
```swift
    open class func deployERC721MintableAutoId(networkId: String, deployERC721MintableRequest: DeployERC721MintableRequest, completion: @escaping (_ data: AnyCodable?, _ error: Error?) -> Void)
```

Deploy ERC721MintableAutoId

Deploys an instance of `ERC721MintableAutoId`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let deployERC721MintableRequest = deploy_ERC721Mintable_request(deployParams: deploy_BeaconProxy_request_deployParams(msgSender: "msgSender_example", salt: "salt_example", deploymentMethod: "deploymentMethod_example", beaconAddress: "beaconAddress_example", beaonAdmin: "beaonAdmin_example"), contractParams: deploy_ERC721Mintable_request_contractParams(_0: "_0_example", _1: "_1_example", _2: "_2_example", _3: "_3_example", _4: "_4_example", _5: "_5_example", admin: "admin_example", initContractURI: "initContractURI_example", name: "name_example", symbol: "symbol_example", tokenUriProvider: "tokenUriProvider_example", tokenRoyaltyProvider: "tokenRoyaltyProvider_example")) // DeployERC721MintableRequest | 

// Deploy ERC721MintableAutoId
DeployAPI.deployERC721MintableAutoId(networkId: networkId, deployERC721MintableRequest: deployERC721MintableRequest) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String** | The network id | [default to &quot;80001&quot;]
 **deployERC721MintableRequest** | [**DeployERC721MintableRequest**](DeployERC721MintableRequest.md) |  | 

### Return type

**AnyCodable**

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deployTokenDna**
```swift
    open class func deployTokenDna(networkId: String, deployTokenDnaRequest: DeployTokenDnaRequest, completion: @escaping (_ data: AnyCodable?, _ error: Error?) -> Void)
```

Deploy TokenDna

Deploys an instance of `TokenDna`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let deployTokenDnaRequest = deploy_TokenDna_request(deployParams: deploy_BeaconProxy_request_deployParams(msgSender: "msgSender_example", salt: "salt_example", deploymentMethod: "deploymentMethod_example", beaconAddress: "beaconAddress_example", beaonAdmin: "beaonAdmin_example"), contractParams: deploy_TokenDna_request_contractParams(_0: "_0_example", _1: "_1_example", _2: "_2_example", admin: "admin_example", contractUri: "contractUri_example", dnaRole: "dnaRole_example")) // DeployTokenDnaRequest | 

// Deploy TokenDna
DeployAPI.deployTokenDna(networkId: networkId, deployTokenDnaRequest: deployTokenDnaRequest) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String** | The network id | [default to &quot;80001&quot;]
 **deployTokenDnaRequest** | [**DeployTokenDnaRequest**](DeployTokenDnaRequest.md) |  | 

### Return type

**AnyCodable**

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deployTokenURI**
```swift
    open class func deployTokenURI(networkId: String, deployTokenURIRequest: DeployTokenURIRequest, completion: @escaping (_ data: AnyCodable?, _ error: Error?) -> Void)
```

Deploy TokenURI

Deploys an instance of `TokenURI`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let deployTokenURIRequest = deploy_TokenURI_request(deployParams: deploy_BeaconProxy_request_deployParams(msgSender: "msgSender_example", salt: "salt_example", deploymentMethod: "deploymentMethod_example", beaconAddress: "beaconAddress_example", beaonAdmin: "beaonAdmin_example"), contractParams: deploy_TokenURI_request_contractParams(_0: "_0_example", _1: "_1_example", _2: "_2_example", _3: "_3_example", admin: "admin_example", contractUri: "contractUri_example", uriRole: "uriRole_example", uri: "uri_example")) // DeployTokenURIRequest | 

// Deploy TokenURI
DeployAPI.deployTokenURI(networkId: networkId, deployTokenURIRequest: deployTokenURIRequest) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String** | The network id | [default to &quot;80001&quot;]
 **deployTokenURIRequest** | [**DeployTokenURIRequest**](DeployTokenURIRequest.md) |  | 

### Return type

**AnyCodable**

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deployTokenURIBaseURI**
```swift
    open class func deployTokenURIBaseURI(networkId: String, deployTokenURIBaseURIRequest: DeployTokenURIBaseURIRequest, completion: @escaping (_ data: AnyCodable?, _ error: Error?) -> Void)
```

Deploy TokenURIBaseURI

Deploys an instance of `TokenURIBaseURI`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let deployTokenURIBaseURIRequest = deploy_TokenURIBaseURI_request(deployParams: deploy_BeaconProxy_request_deployParams(msgSender: "msgSender_example", salt: "salt_example", deploymentMethod: "deploymentMethod_example", beaconAddress: "beaconAddress_example", beaonAdmin: "beaonAdmin_example"), contractParams: deploy_TokenURIBaseURI_request_contractParams(_0: "_0_example", _1: "_1_example", _2: "_2_example", _3: "_3_example", admin: "admin_example", contractUri: "contractUri_example", baseUriRole: "baseUriRole_example", baseUri: "baseUri_example")) // DeployTokenURIBaseURIRequest | 

// Deploy TokenURIBaseURI
DeployAPI.deployTokenURIBaseURI(networkId: networkId, deployTokenURIBaseURIRequest: deployTokenURIBaseURIRequest) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String** | The network id | [default to &quot;80001&quot;]
 **deployTokenURIBaseURIRequest** | [**DeployTokenURIBaseURIRequest**](DeployTokenURIBaseURIRequest.md) |  | 

### Return type

**AnyCodable**

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deployTokenURIDna**
```swift
    open class func deployTokenURIDna(networkId: String, deployTokenURIDnaRequest: DeployTokenURIDnaRequest, completion: @escaping (_ data: AnyCodable?, _ error: Error?) -> Void)
```

Deploy TokenURIDna

Deploys an instance of `TokenURIDna`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let deployTokenURIDnaRequest = deploy_TokenURIDna_request(deployParams: deploy_BeaconProxy_request_deployParams(msgSender: "msgSender_example", salt: "salt_example", deploymentMethod: "deploymentMethod_example", beaconAddress: "beaconAddress_example", beaonAdmin: "beaonAdmin_example"), contractParams: deploy_TokenURIDna_request_contractParams(_0: "_0_example", _1: "_1_example", _2: "_2_example", _3: "_3_example", _4: "_4_example", _5: "_5_example", admin: "admin_example", contractUri: "contractUri_example", baseUriRole: "baseUriRole_example", baseUri: "baseUri_example", dnaProviderRole: "dnaProviderRole_example", dnaProvider: "dnaProvider_example")) // DeployTokenURIDnaRequest | 

// Deploy TokenURIDna
DeployAPI.deployTokenURIDna(networkId: networkId, deployTokenURIDnaRequest: deployTokenURIDnaRequest) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String** | The network id | [default to &quot;80001&quot;]
 **deployTokenURIDnaRequest** | [**DeployTokenURIDnaRequest**](DeployTokenURIDnaRequest.md) |  | 

### Return type

**AnyCodable**

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deployUpgradeableBeacon**
```swift
    open class func deployUpgradeableBeacon(networkId: String, deployUpgradeableBeaconRequest: DeployUpgradeableBeaconRequest, completion: @escaping (_ data: AnyCodable?, _ error: Error?) -> Void)
```

Deploy UpgradeableBeacon

Deploys an instance of `UpgradeableBeacon`

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let networkId = "networkId_example" // String | The network id (default to "80001")
let deployUpgradeableBeaconRequest = deploy_UpgradeableBeacon_request(deployParams: deploy_BeaconProxy_request_deployParams(msgSender: "msgSender_example", salt: "salt_example", deploymentMethod: "deploymentMethod_example", beaconAddress: "beaconAddress_example", beaonAdmin: "beaonAdmin_example"), contractParams: deploy_UpgradeableBeacon_request_contractParams(_0: "_0_example", _1: "_1_example", admin: "admin_example", implementation: "implementation_example")) // DeployUpgradeableBeaconRequest | 

// Deploy UpgradeableBeacon
DeployAPI.deployUpgradeableBeacon(networkId: networkId, deployUpgradeableBeaconRequest: deployUpgradeableBeaconRequest) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **networkId** | **String** | The network id | [default to &quot;80001&quot;]
 **deployUpgradeableBeaconRequest** | [**DeployUpgradeableBeaconRequest**](DeployUpgradeableBeaconRequest.md) |  | 

### Return type

**AnyCodable**

### Authorization

[Authorization](../README.md#Authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

