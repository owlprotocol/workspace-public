# openapi-android-client

## Requirements

Building the API client library requires [Maven](https://maven.apache.org/) to be installed.

## Installation

To install the API client library to your local Maven repository, simply execute:

```shell
mvn install
```

To deploy it to a remote Maven repository instead, configure the settings of the repository and execute:

```shell
mvn deploy
```

Refer to the [official documentation](https://maven.apache.org/plugins/maven-deploy-plugin/usage.html) for more information.

### Maven users

Add this dependency to your project's POM:

```xml
<dependency>
    <groupId>org.openapitools</groupId>
    <artifactId>openapi-android-client</artifactId>
    <version>1.0.0</version>
    <scope>compile</scope>
</dependency>
```

### Gradle users

Add this dependency to your project's build file:

```groovy
compile "org.openapitools:openapi-android-client:1.0.0"
```

### Others

At first generate the JAR by executing:

    mvn package

Then manually install the following JARs:

- target/openapi-android-client-1.0.0.jar
- target/lib/*.jar

## Getting Started

Please follow the [installation](#installation) instruction and execute the following Java code:

```java

import org.openapitools.client.api.DeployApi;

public class DeployApiExample {

    public static void main(String[] args) {
        DeployApi apiInstance = new DeployApi();
        String networkId = 80001; // String | The network id
        DeployBeaconProxyRequest deployBeaconProxyRequest = {"contractParams":{"_admin":"0x434c7df2f06d6cd172a28cb71e2afe6e1b974dbc"}}; // DeployBeaconProxyRequest | 
        try {
            OasAnyTypeNotMapped result = apiInstance.deployBeaconProxy(networkId, deployBeaconProxyRequest);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling DeployApi#deployBeaconProxy");
            e.printStackTrace();
        }
    }
}

```

## Documentation for API Endpoints

All URIs are relative to *https://17a0-195-175-28-162.ngrok-free.app/api*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*DeployApi* | [**deployBeaconProxy**](docs/DeployApi.md#deployBeaconProxy) | **POST** /{networkId}/deploy/BeaconProxy | Deploy BeaconProxy
*DeployApi* | [**deployChainlinkAnyApiClient**](docs/DeployApi.md#deployChainlinkAnyApiClient) | **POST** /{networkId}/deploy/ChainlinkAnyApiClient | Deploy ChainlinkAnyApiClient
*DeployApi* | [**deployERC1155Mintable**](docs/DeployApi.md#deployERC1155Mintable) | **POST** /{networkId}/deploy/ERC1155Mintable | Deploy ERC1155Mintable
*DeployApi* | [**deployERC20Mintable**](docs/DeployApi.md#deployERC20Mintable) | **POST** /{networkId}/deploy/ERC20Mintable | Deploy ERC20Mintable
*DeployApi* | [**deployERC2981Setter**](docs/DeployApi.md#deployERC2981Setter) | **POST** /{networkId}/deploy/ERC2981Setter | Deploy ERC2981Setter
*DeployApi* | [**deployERC721Mintable**](docs/DeployApi.md#deployERC721Mintable) | **POST** /{networkId}/deploy/ERC721Mintable | Deploy ERC721Mintable
*DeployApi* | [**deployERC721MintableAutoId**](docs/DeployApi.md#deployERC721MintableAutoId) | **POST** /{networkId}/deploy/ERC721MintableAutoId | Deploy ERC721MintableAutoId
*DeployApi* | [**deployTokenDna**](docs/DeployApi.md#deployTokenDna) | **POST** /{networkId}/deploy/TokenDna | Deploy TokenDna
*DeployApi* | [**deployTokenURI**](docs/DeployApi.md#deployTokenURI) | **POST** /{networkId}/deploy/TokenURI | Deploy TokenURI
*DeployApi* | [**deployTokenURIBaseURI**](docs/DeployApi.md#deployTokenURIBaseURI) | **POST** /{networkId}/deploy/TokenURIBaseURI | Deploy TokenURIBaseURI
*DeployApi* | [**deployTokenURIDna**](docs/DeployApi.md#deployTokenURIDna) | **POST** /{networkId}/deploy/TokenURIDna | Deploy TokenURIDna
*DeployApi* | [**deployUpgradeableBeacon**](docs/DeployApi.md#deployUpgradeableBeacon) | **POST** /{networkId}/deploy/UpgradeableBeacon | Deploy UpgradeableBeacon
*IAccessControlApi* | [**interfacesIAccessControlGetRoleAdmin**](docs/IAccessControlApi.md#interfacesIAccessControlGetRoleAdmin) | **POST** /{networkId}/interface/IAccessControl/read/{address}/getRoleAdmin | IAccessControl.getRoleAdmin
*IAccessControlApi* | [**interfacesIAccessControlGrantRole**](docs/IAccessControlApi.md#interfacesIAccessControlGrantRole) | **POST** /{networkId}/interface/IAccessControl/write/{address}/grantRole | IAccessControl.grantRole
*IAccessControlApi* | [**interfacesIAccessControlHasRole**](docs/IAccessControlApi.md#interfacesIAccessControlHasRole) | **POST** /{networkId}/interface/IAccessControl/read/{address}/hasRole | IAccessControl.hasRole
*IAccessControlApi* | [**interfacesIAccessControlRenounceRole**](docs/IAccessControlApi.md#interfacesIAccessControlRenounceRole) | **POST** /{networkId}/interface/IAccessControl/write/{address}/renounceRole | IAccessControl.renounceRole
*IAccessControlApi* | [**interfacesIAccessControlRevokeRole**](docs/IAccessControlApi.md#interfacesIAccessControlRevokeRole) | **POST** /{networkId}/interface/IAccessControl/write/{address}/revokeRole | IAccessControl.revokeRole
*IBeaconApi* | [**interfacesIBeaconImplementation**](docs/IBeaconApi.md#interfacesIBeaconImplementation) | **POST** /{networkId}/interface/IBeacon/read/{address}/implementation | IBeacon.implementation
*IBeaconProxyApi* | [**interfacesIBeaconProxyBeacon**](docs/IBeaconProxyApi.md#interfacesIBeaconProxyBeacon) | **POST** /{networkId}/interface/IBeaconProxy/read/{address}/beacon | IBeaconProxy.beacon
*IBeaconProxyApi* | [**interfacesIBeaconProxySetBeacon**](docs/IBeaconProxyApi.md#interfacesIBeaconProxySetBeacon) | **POST** /{networkId}/interface/IBeaconProxy/write/{address}/setBeacon | IBeaconProxy.setBeacon
*IChainlinkAnyApiClientApi* | [**interfacesIChainlinkAnyApiClientContractURI**](docs/IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientContractURI) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/contractURI | IChainlinkAnyApiClient.contractURI
*IChainlinkAnyApiClientApi* | [**interfacesIChainlinkAnyApiClientDEFAULTADMINROLE**](docs/IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientDEFAULTADMINROLE) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/DEFAULT_ADMIN_ROLE | IChainlinkAnyApiClient.DEFAULT_ADMIN_ROLE
*IChainlinkAnyApiClientApi* | [**interfacesIChainlinkAnyApiClientFulfill**](docs/IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientFulfill) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/fulfill | IChainlinkAnyApiClient.fulfill
*IChainlinkAnyApiClientApi* | [**interfacesIChainlinkAnyApiClientGetRoleAdmin**](docs/IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientGetRoleAdmin) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/getRoleAdmin | IChainlinkAnyApiClient.getRoleAdmin
*IChainlinkAnyApiClientApi* | [**interfacesIChainlinkAnyApiClientGrantRole**](docs/IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientGrantRole) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/grantRole | IChainlinkAnyApiClient.grantRole
*IChainlinkAnyApiClientApi* | [**interfacesIChainlinkAnyApiClientHasRole**](docs/IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientHasRole) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/hasRole | IChainlinkAnyApiClient.hasRole
*IChainlinkAnyApiClientApi* | [**interfacesIChainlinkAnyApiClientRenounceRole**](docs/IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientRenounceRole) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/renounceRole | IChainlinkAnyApiClient.renounceRole
*IChainlinkAnyApiClientApi* | [**interfacesIChainlinkAnyApiClientRequest**](docs/IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientRequest) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/request | IChainlinkAnyApiClient.request
*IChainlinkAnyApiClientApi* | [**interfacesIChainlinkAnyApiClientRequests**](docs/IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientRequests) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/requests | IChainlinkAnyApiClient.requests
*IChainlinkAnyApiClientApi* | [**interfacesIChainlinkAnyApiClientRevokeRole**](docs/IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientRevokeRole) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/revokeRole | IChainlinkAnyApiClient.revokeRole
*IChainlinkAnyApiClientApi* | [**interfacesIChainlinkAnyApiClientSetContractURI**](docs/IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientSetContractURI) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/setContractURI | IChainlinkAnyApiClient.setContractURI
*IChainlinkAnyApiClientApi* | [**interfacesIChainlinkAnyApiClientSupportsInterface**](docs/IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientSupportsInterface) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/supportsInterface | IChainlinkAnyApiClient.supportsInterface
*IChainlinkAnyApiClientApi* | [**interfacesIChainlinkAnyApiClientVersion**](docs/IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientVersion) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/read/{address}/version | IChainlinkAnyApiClient.version
*IChainlinkAnyApiClientApi* | [**interfacesIChainlinkAnyApiClientWithdrawLink**](docs/IChainlinkAnyApiClientApi.md#interfacesIChainlinkAnyApiClientWithdrawLink) | **POST** /{networkId}/interface/IChainlinkAnyApiClient/write/{address}/withdrawLink | IChainlinkAnyApiClient.withdrawLink
*IChainlinkAnyApiConsumerApi* | [**interfacesIChainlinkAnyApiConsumerFulfill**](docs/IChainlinkAnyApiConsumerApi.md#interfacesIChainlinkAnyApiConsumerFulfill) | **POST** /{networkId}/interface/IChainlinkAnyApiConsumer/write/{address}/fulfill | IChainlinkAnyApiConsumer.fulfill
*IContractURIApi* | [**interfacesIContractURIContractURI**](docs/IContractURIApi.md#interfacesIContractURIContractURI) | **POST** /{networkId}/interface/IContractURI/read/{address}/contractURI | IContractURI.contractURI
*IContractURIApi* | [**interfacesIContractURISetContractURI**](docs/IContractURIApi.md#interfacesIContractURISetContractURI) | **POST** /{networkId}/interface/IContractURI/write/{address}/setContractURI | IContractURI.setContractURI
*IERC1155Api* | [**interfacesIERC1155BalanceOf**](docs/IERC1155Api.md#interfacesIERC1155BalanceOf) | **POST** /{networkId}/interface/IERC1155/read/{address}/balanceOf | IERC1155.balanceOf
*IERC1155Api* | [**interfacesIERC1155BalanceOfBatch**](docs/IERC1155Api.md#interfacesIERC1155BalanceOfBatch) | **POST** /{networkId}/interface/IERC1155/read/{address}/balanceOfBatch | IERC1155.balanceOfBatch
*IERC1155Api* | [**interfacesIERC1155IsApprovedForAll**](docs/IERC1155Api.md#interfacesIERC1155IsApprovedForAll) | **POST** /{networkId}/interface/IERC1155/read/{address}/isApprovedForAll | IERC1155.isApprovedForAll
*IERC1155Api* | [**interfacesIERC1155SafeBatchTransferFrom**](docs/IERC1155Api.md#interfacesIERC1155SafeBatchTransferFrom) | **POST** /{networkId}/interface/IERC1155/write/{address}/safeBatchTransferFrom | IERC1155.safeBatchTransferFrom
*IERC1155Api* | [**interfacesIERC1155SafeTransferFrom**](docs/IERC1155Api.md#interfacesIERC1155SafeTransferFrom) | **POST** /{networkId}/interface/IERC1155/write/{address}/safeTransferFrom | IERC1155.safeTransferFrom
*IERC1155Api* | [**interfacesIERC1155SetApprovalForAll**](docs/IERC1155Api.md#interfacesIERC1155SetApprovalForAll) | **POST** /{networkId}/interface/IERC1155/write/{address}/setApprovalForAll | IERC1155.setApprovalForAll
*IERC1155Api* | [**interfacesIERC1155SupportsInterface**](docs/IERC1155Api.md#interfacesIERC1155SupportsInterface) | **POST** /{networkId}/interface/IERC1155/read/{address}/supportsInterface | IERC1155.supportsInterface
*IERC1155MetadataURIApi* | [**interfacesIERC1155MetadataURIBalanceOf**](docs/IERC1155MetadataURIApi.md#interfacesIERC1155MetadataURIBalanceOf) | **POST** /{networkId}/interface/IERC1155MetadataURI/read/{address}/balanceOf | IERC1155MetadataURI.balanceOf
*IERC1155MetadataURIApi* | [**interfacesIERC1155MetadataURIBalanceOfBatch**](docs/IERC1155MetadataURIApi.md#interfacesIERC1155MetadataURIBalanceOfBatch) | **POST** /{networkId}/interface/IERC1155MetadataURI/read/{address}/balanceOfBatch | IERC1155MetadataURI.balanceOfBatch
*IERC1155MetadataURIApi* | [**interfacesIERC1155MetadataURIIsApprovedForAll**](docs/IERC1155MetadataURIApi.md#interfacesIERC1155MetadataURIIsApprovedForAll) | **POST** /{networkId}/interface/IERC1155MetadataURI/read/{address}/isApprovedForAll | IERC1155MetadataURI.isApprovedForAll
*IERC1155MetadataURIApi* | [**interfacesIERC1155MetadataURISafeBatchTransferFrom**](docs/IERC1155MetadataURIApi.md#interfacesIERC1155MetadataURISafeBatchTransferFrom) | **POST** /{networkId}/interface/IERC1155MetadataURI/write/{address}/safeBatchTransferFrom | IERC1155MetadataURI.safeBatchTransferFrom
*IERC1155MetadataURIApi* | [**interfacesIERC1155MetadataURISafeTransferFrom**](docs/IERC1155MetadataURIApi.md#interfacesIERC1155MetadataURISafeTransferFrom) | **POST** /{networkId}/interface/IERC1155MetadataURI/write/{address}/safeTransferFrom | IERC1155MetadataURI.safeTransferFrom
*IERC1155MetadataURIApi* | [**interfacesIERC1155MetadataURISetApprovalForAll**](docs/IERC1155MetadataURIApi.md#interfacesIERC1155MetadataURISetApprovalForAll) | **POST** /{networkId}/interface/IERC1155MetadataURI/write/{address}/setApprovalForAll | IERC1155MetadataURI.setApprovalForAll
*IERC1155MetadataURIApi* | [**interfacesIERC1155MetadataURISupportsInterface**](docs/IERC1155MetadataURIApi.md#interfacesIERC1155MetadataURISupportsInterface) | **POST** /{networkId}/interface/IERC1155MetadataURI/read/{address}/supportsInterface | IERC1155MetadataURI.supportsInterface
*IERC1155MetadataURIApi* | [**interfacesIERC1155MetadataURIUri**](docs/IERC1155MetadataURIApi.md#interfacesIERC1155MetadataURIUri) | **POST** /{networkId}/interface/IERC1155MetadataURI/read/{address}/uri | IERC1155MetadataURI.uri
*IERC1155MintableApi* | [**interfacesIERC1155MintableMint**](docs/IERC1155MintableApi.md#interfacesIERC1155MintableMint) | **POST** /{networkId}/interface/IERC1155Mintable/write/{address}/mint | IERC1155Mintable.mint
*IERC1155MintableApi* | [**interfacesIERC1155MintableMintBatch**](docs/IERC1155MintableApi.md#interfacesIERC1155MintableMintBatch) | **POST** /{networkId}/interface/IERC1155Mintable/write/{address}/mintBatch | IERC1155Mintable.mintBatch
*IERC165Api* | [**interfacesIERC165SupportsInterface**](docs/IERC165Api.md#interfacesIERC165SupportsInterface) | **POST** /{networkId}/interface/IERC165/read/{address}/supportsInterface | IERC165.supportsInterface
*IERC1820Api* | [**interfacesIERC1820GetInterfaceImplementer**](docs/IERC1820Api.md#interfacesIERC1820GetInterfaceImplementer) | **POST** /{networkId}/interface/IERC1820/read/{address}/getInterfaceImplementer | IERC1820.getInterfaceImplementer
*IERC1820Api* | [**interfacesIERC1820GetManager**](docs/IERC1820Api.md#interfacesIERC1820GetManager) | **POST** /{networkId}/interface/IERC1820/read/{address}/getManager | IERC1820.getManager
*IERC1820Api* | [**interfacesIERC1820ImplementsERC165Interface**](docs/IERC1820Api.md#interfacesIERC1820ImplementsERC165Interface) | **POST** /{networkId}/interface/IERC1820/read/{address}/implementsERC165Interface | IERC1820.implementsERC165Interface
*IERC1820Api* | [**interfacesIERC1820ImplementsERC165InterfaceNoCache**](docs/IERC1820Api.md#interfacesIERC1820ImplementsERC165InterfaceNoCache) | **POST** /{networkId}/interface/IERC1820/read/{address}/implementsERC165InterfaceNoCache | IERC1820.implementsERC165InterfaceNoCache
*IERC1820Api* | [**interfacesIERC1820InterfaceHash**](docs/IERC1820Api.md#interfacesIERC1820InterfaceHash) | **POST** /{networkId}/interface/IERC1820/read/{address}/interfaceHash | IERC1820.interfaceHash
*IERC1820Api* | [**interfacesIERC1820SetInterfaceImplementer**](docs/IERC1820Api.md#interfacesIERC1820SetInterfaceImplementer) | **POST** /{networkId}/interface/IERC1820/write/{address}/setInterfaceImplementer | IERC1820.setInterfaceImplementer
*IERC1820Api* | [**interfacesIERC1820SetManager**](docs/IERC1820Api.md#interfacesIERC1820SetManager) | **POST** /{networkId}/interface/IERC1820/write/{address}/setManager | IERC1820.setManager
*IERC1820Api* | [**interfacesIERC1820UpdateERC165Cache**](docs/IERC1820Api.md#interfacesIERC1820UpdateERC165Cache) | **POST** /{networkId}/interface/IERC1820/write/{address}/updateERC165Cache | IERC1820.updateERC165Cache
*IERC20Api* | [**interfacesIERC20Allowance**](docs/IERC20Api.md#interfacesIERC20Allowance) | **POST** /{networkId}/interface/IERC20/read/{address}/allowance | IERC20.allowance
*IERC20Api* | [**interfacesIERC20Approve**](docs/IERC20Api.md#interfacesIERC20Approve) | **POST** /{networkId}/interface/IERC20/write/{address}/approve | IERC20.approve
*IERC20Api* | [**interfacesIERC20BalanceOf**](docs/IERC20Api.md#interfacesIERC20BalanceOf) | **POST** /{networkId}/interface/IERC20/read/{address}/balanceOf | IERC20.balanceOf
*IERC20Api* | [**interfacesIERC20TotalSupply**](docs/IERC20Api.md#interfacesIERC20TotalSupply) | **POST** /{networkId}/interface/IERC20/read/{address}/totalSupply | IERC20.totalSupply
*IERC20Api* | [**interfacesIERC20Transfer**](docs/IERC20Api.md#interfacesIERC20Transfer) | **POST** /{networkId}/interface/IERC20/write/{address}/transfer | IERC20.transfer
*IERC20Api* | [**interfacesIERC20TransferFrom**](docs/IERC20Api.md#interfacesIERC20TransferFrom) | **POST** /{networkId}/interface/IERC20/write/{address}/transferFrom | IERC20.transferFrom
*IERC20MetadataApi* | [**interfacesIERC20MetadataAllowance**](docs/IERC20MetadataApi.md#interfacesIERC20MetadataAllowance) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/allowance | IERC20Metadata.allowance
*IERC20MetadataApi* | [**interfacesIERC20MetadataApprove**](docs/IERC20MetadataApi.md#interfacesIERC20MetadataApprove) | **POST** /{networkId}/interface/IERC20Metadata/write/{address}/approve | IERC20Metadata.approve
*IERC20MetadataApi* | [**interfacesIERC20MetadataBalanceOf**](docs/IERC20MetadataApi.md#interfacesIERC20MetadataBalanceOf) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/balanceOf | IERC20Metadata.balanceOf
*IERC20MetadataApi* | [**interfacesIERC20MetadataDecimals**](docs/IERC20MetadataApi.md#interfacesIERC20MetadataDecimals) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/decimals | IERC20Metadata.decimals
*IERC20MetadataApi* | [**interfacesIERC20MetadataName**](docs/IERC20MetadataApi.md#interfacesIERC20MetadataName) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/name | IERC20Metadata.name
*IERC20MetadataApi* | [**interfacesIERC20MetadataSymbol**](docs/IERC20MetadataApi.md#interfacesIERC20MetadataSymbol) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/symbol | IERC20Metadata.symbol
*IERC20MetadataApi* | [**interfacesIERC20MetadataTotalSupply**](docs/IERC20MetadataApi.md#interfacesIERC20MetadataTotalSupply) | **POST** /{networkId}/interface/IERC20Metadata/read/{address}/totalSupply | IERC20Metadata.totalSupply
*IERC20MetadataApi* | [**interfacesIERC20MetadataTransfer**](docs/IERC20MetadataApi.md#interfacesIERC20MetadataTransfer) | **POST** /{networkId}/interface/IERC20Metadata/write/{address}/transfer | IERC20Metadata.transfer
*IERC20MetadataApi* | [**interfacesIERC20MetadataTransferFrom**](docs/IERC20MetadataApi.md#interfacesIERC20MetadataTransferFrom) | **POST** /{networkId}/interface/IERC20Metadata/write/{address}/transferFrom | IERC20Metadata.transferFrom
*IERC20MintableApi* | [**interfacesIERC20MintableMint**](docs/IERC20MintableApi.md#interfacesIERC20MintableMint) | **POST** /{networkId}/interface/IERC20Mintable/write/{address}/mint | IERC20Mintable.mint
*IERC2981Api* | [**interfacesIERC2981RoyaltyInfo**](docs/IERC2981Api.md#interfacesIERC2981RoyaltyInfo) | **POST** /{networkId}/interface/IERC2981/read/{address}/royaltyInfo | IERC2981.royaltyInfo
*IERC2981Api* | [**interfacesIERC2981SupportsInterface**](docs/IERC2981Api.md#interfacesIERC2981SupportsInterface) | **POST** /{networkId}/interface/IERC2981/read/{address}/supportsInterface | IERC2981.supportsInterface
*IERC2981SetterApi* | [**interfacesIERC2981SetterSetDefaultRoyalty**](docs/IERC2981SetterApi.md#interfacesIERC2981SetterSetDefaultRoyalty) | **POST** /{networkId}/interface/IERC2981Setter/write/{address}/setDefaultRoyalty | IERC2981Setter.setDefaultRoyalty
*IERC2981SetterApi* | [**interfacesIERC2981SetterSetTokenRoyalty**](docs/IERC2981SetterApi.md#interfacesIERC2981SetterSetTokenRoyalty) | **POST** /{networkId}/interface/IERC2981Setter/write/{address}/setTokenRoyalty | IERC2981Setter.setTokenRoyalty
*IERC721Api* | [**interfacesIERC721Approve**](docs/IERC721Api.md#interfacesIERC721Approve) | **POST** /{networkId}/interface/IERC721/write/{address}/approve | IERC721.approve
*IERC721Api* | [**interfacesIERC721BalanceOf**](docs/IERC721Api.md#interfacesIERC721BalanceOf) | **POST** /{networkId}/interface/IERC721/read/{address}/balanceOf | IERC721.balanceOf
*IERC721Api* | [**interfacesIERC721GetApproved**](docs/IERC721Api.md#interfacesIERC721GetApproved) | **POST** /{networkId}/interface/IERC721/read/{address}/getApproved | IERC721.getApproved
*IERC721Api* | [**interfacesIERC721IsApprovedForAll**](docs/IERC721Api.md#interfacesIERC721IsApprovedForAll) | **POST** /{networkId}/interface/IERC721/read/{address}/isApprovedForAll | IERC721.isApprovedForAll
*IERC721Api* | [**interfacesIERC721OwnerOf**](docs/IERC721Api.md#interfacesIERC721OwnerOf) | **POST** /{networkId}/interface/IERC721/read/{address}/ownerOf | IERC721.ownerOf
*IERC721Api* | [**interfacesIERC721SafeTransferFrom**](docs/IERC721Api.md#interfacesIERC721SafeTransferFrom) | **POST** /{networkId}/interface/IERC721/write/{address}/safeTransferFrom | IERC721.safeTransferFrom
*IERC721Api* | [**interfacesIERC721SetApprovalForAll**](docs/IERC721Api.md#interfacesIERC721SetApprovalForAll) | **POST** /{networkId}/interface/IERC721/write/{address}/setApprovalForAll | IERC721.setApprovalForAll
*IERC721Api* | [**interfacesIERC721SupportsInterface**](docs/IERC721Api.md#interfacesIERC721SupportsInterface) | **POST** /{networkId}/interface/IERC721/read/{address}/supportsInterface | IERC721.supportsInterface
*IERC721Api* | [**interfacesIERC721TransferFrom**](docs/IERC721Api.md#interfacesIERC721TransferFrom) | **POST** /{networkId}/interface/IERC721/write/{address}/transferFrom | IERC721.transferFrom
*IERC721EnumerableApi* | [**interfacesIERC721EnumerableApprove**](docs/IERC721EnumerableApi.md#interfacesIERC721EnumerableApprove) | **POST** /{networkId}/interface/IERC721Enumerable/write/{address}/approve | IERC721Enumerable.approve
*IERC721EnumerableApi* | [**interfacesIERC721EnumerableBalanceOf**](docs/IERC721EnumerableApi.md#interfacesIERC721EnumerableBalanceOf) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/balanceOf | IERC721Enumerable.balanceOf
*IERC721EnumerableApi* | [**interfacesIERC721EnumerableGetApproved**](docs/IERC721EnumerableApi.md#interfacesIERC721EnumerableGetApproved) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/getApproved | IERC721Enumerable.getApproved
*IERC721EnumerableApi* | [**interfacesIERC721EnumerableIsApprovedForAll**](docs/IERC721EnumerableApi.md#interfacesIERC721EnumerableIsApprovedForAll) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/isApprovedForAll | IERC721Enumerable.isApprovedForAll
*IERC721EnumerableApi* | [**interfacesIERC721EnumerableOwnerOf**](docs/IERC721EnumerableApi.md#interfacesIERC721EnumerableOwnerOf) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/ownerOf | IERC721Enumerable.ownerOf
*IERC721EnumerableApi* | [**interfacesIERC721EnumerableSafeTransferFrom**](docs/IERC721EnumerableApi.md#interfacesIERC721EnumerableSafeTransferFrom) | **POST** /{networkId}/interface/IERC721Enumerable/write/{address}/safeTransferFrom | IERC721Enumerable.safeTransferFrom
*IERC721EnumerableApi* | [**interfacesIERC721EnumerableSetApprovalForAll**](docs/IERC721EnumerableApi.md#interfacesIERC721EnumerableSetApprovalForAll) | **POST** /{networkId}/interface/IERC721Enumerable/write/{address}/setApprovalForAll | IERC721Enumerable.setApprovalForAll
*IERC721EnumerableApi* | [**interfacesIERC721EnumerableSupportsInterface**](docs/IERC721EnumerableApi.md#interfacesIERC721EnumerableSupportsInterface) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/supportsInterface | IERC721Enumerable.supportsInterface
*IERC721EnumerableApi* | [**interfacesIERC721EnumerableTokenByIndex**](docs/IERC721EnumerableApi.md#interfacesIERC721EnumerableTokenByIndex) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/tokenByIndex | IERC721Enumerable.tokenByIndex
*IERC721EnumerableApi* | [**interfacesIERC721EnumerableTokenOfOwnerByIndex**](docs/IERC721EnumerableApi.md#interfacesIERC721EnumerableTokenOfOwnerByIndex) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/tokenOfOwnerByIndex | IERC721Enumerable.tokenOfOwnerByIndex
*IERC721EnumerableApi* | [**interfacesIERC721EnumerableTotalSupply**](docs/IERC721EnumerableApi.md#interfacesIERC721EnumerableTotalSupply) | **POST** /{networkId}/interface/IERC721Enumerable/read/{address}/totalSupply | IERC721Enumerable.totalSupply
*IERC721EnumerableApi* | [**interfacesIERC721EnumerableTransferFrom**](docs/IERC721EnumerableApi.md#interfacesIERC721EnumerableTransferFrom) | **POST** /{networkId}/interface/IERC721Enumerable/write/{address}/transferFrom | IERC721Enumerable.transferFrom
*IERC721MetadataApi* | [**interfacesIERC721MetadataApprove**](docs/IERC721MetadataApi.md#interfacesIERC721MetadataApprove) | **POST** /{networkId}/interface/IERC721Metadata/write/{address}/approve | IERC721Metadata.approve
*IERC721MetadataApi* | [**interfacesIERC721MetadataBalanceOf**](docs/IERC721MetadataApi.md#interfacesIERC721MetadataBalanceOf) | **POST** /{networkId}/interface/IERC721Metadata/read/{address}/balanceOf | IERC721Metadata.balanceOf
*IERC721MetadataApi* | [**interfacesIERC721MetadataGetApproved**](docs/IERC721MetadataApi.md#interfacesIERC721MetadataGetApproved) | **POST** /{networkId}/interface/IERC721Metadata/read/{address}/getApproved | IERC721Metadata.getApproved
*IERC721MetadataApi* | [**interfacesIERC721MetadataIsApprovedForAll**](docs/IERC721MetadataApi.md#interfacesIERC721MetadataIsApprovedForAll) | **POST** /{networkId}/interface/IERC721Metadata/read/{address}/isApprovedForAll | IERC721Metadata.isApprovedForAll
*IERC721MetadataApi* | [**interfacesIERC721MetadataName**](docs/IERC721MetadataApi.md#interfacesIERC721MetadataName) | **POST** /{networkId}/interface/IERC721Metadata/read/{address}/name | IERC721Metadata.name
*IERC721MetadataApi* | [**interfacesIERC721MetadataOwnerOf**](docs/IERC721MetadataApi.md#interfacesIERC721MetadataOwnerOf) | **POST** /{networkId}/interface/IERC721Metadata/read/{address}/ownerOf | IERC721Metadata.ownerOf
*IERC721MetadataApi* | [**interfacesIERC721MetadataSafeTransferFrom**](docs/IERC721MetadataApi.md#interfacesIERC721MetadataSafeTransferFrom) | **POST** /{networkId}/interface/IERC721Metadata/write/{address}/safeTransferFrom | IERC721Metadata.safeTransferFrom
*IERC721MetadataApi* | [**interfacesIERC721MetadataSetApprovalForAll**](docs/IERC721MetadataApi.md#interfacesIERC721MetadataSetApprovalForAll) | **POST** /{networkId}/interface/IERC721Metadata/write/{address}/setApprovalForAll | IERC721Metadata.setApprovalForAll
*IERC721MetadataApi* | [**interfacesIERC721MetadataSupportsInterface**](docs/IERC721MetadataApi.md#interfacesIERC721MetadataSupportsInterface) | **POST** /{networkId}/interface/IERC721Metadata/read/{address}/supportsInterface | IERC721Metadata.supportsInterface
*IERC721MetadataApi* | [**interfacesIERC721MetadataSymbol**](docs/IERC721MetadataApi.md#interfacesIERC721MetadataSymbol) | **POST** /{networkId}/interface/IERC721Metadata/read/{address}/symbol | IERC721Metadata.symbol
*IERC721MetadataApi* | [**interfacesIERC721MetadataTokenURI**](docs/IERC721MetadataApi.md#interfacesIERC721MetadataTokenURI) | **POST** /{networkId}/interface/IERC721Metadata/read/{address}/tokenURI | IERC721Metadata.tokenURI
*IERC721MetadataApi* | [**interfacesIERC721MetadataTransferFrom**](docs/IERC721MetadataApi.md#interfacesIERC721MetadataTransferFrom) | **POST** /{networkId}/interface/IERC721Metadata/write/{address}/transferFrom | IERC721Metadata.transferFrom
*IERC721MintableApi* | [**interfacesIERC721MintableMint**](docs/IERC721MintableApi.md#interfacesIERC721MintableMint) | **POST** /{networkId}/interface/IERC721Mintable/write/{address}/mint | IERC721Mintable.mint
*IERC721MintableApi* | [**interfacesIERC721MintableMintBatch**](docs/IERC721MintableApi.md#interfacesIERC721MintableMintBatch) | **POST** /{networkId}/interface/IERC721Mintable/write/{address}/mintBatch | IERC721Mintable.mintBatch
*IERC721MintableApi* | [**interfacesIERC721MintableSafeMint**](docs/IERC721MintableApi.md#interfacesIERC721MintableSafeMint) | **POST** /{networkId}/interface/IERC721Mintable/write/{address}/safeMint | IERC721Mintable.safeMint
*IERC721MintableApi* | [**interfacesIERC721MintableSafeMintBatch**](docs/IERC721MintableApi.md#interfacesIERC721MintableSafeMintBatch) | **POST** /{networkId}/interface/IERC721Mintable/write/{address}/safeMintBatch | IERC721Mintable.safeMintBatch
*IERC721MintableAutoIdApi* | [**interfacesIERC721MintableAutoIdMint**](docs/IERC721MintableAutoIdApi.md#interfacesIERC721MintableAutoIdMint) | **POST** /{networkId}/interface/IERC721MintableAutoId/write/{address}/mint | IERC721MintableAutoId.mint
*IERC721MintableAutoIdApi* | [**interfacesIERC721MintableAutoIdMintBatch**](docs/IERC721MintableAutoIdApi.md#interfacesIERC721MintableAutoIdMintBatch) | **POST** /{networkId}/interface/IERC721MintableAutoId/write/{address}/mintBatch | IERC721MintableAutoId.mintBatch
*IERC721MintableAutoIdApi* | [**interfacesIERC721MintableAutoIdSafeMint**](docs/IERC721MintableAutoIdApi.md#interfacesIERC721MintableAutoIdSafeMint) | **POST** /{networkId}/interface/IERC721MintableAutoId/write/{address}/safeMint | IERC721MintableAutoId.safeMint
*IERC721MintableAutoIdApi* | [**interfacesIERC721MintableAutoIdSafeMintBatch**](docs/IERC721MintableAutoIdApi.md#interfacesIERC721MintableAutoIdSafeMintBatch) | **POST** /{networkId}/interface/IERC721MintableAutoId/write/{address}/safeMintBatch | IERC721MintableAutoId.safeMintBatch
*ITokenDnaApi* | [**interfacesITokenDnaGetDna**](docs/ITokenDnaApi.md#interfacesITokenDnaGetDna) | **POST** /{networkId}/interface/ITokenDna/read/{address}/getDna | ITokenDna.getDna
*ITokenDnaApi* | [**interfacesITokenDnaGetDnaBatch**](docs/ITokenDnaApi.md#interfacesITokenDnaGetDnaBatch) | **POST** /{networkId}/interface/ITokenDna/read/{address}/getDnaBatch | ITokenDna.getDnaBatch
*ITokenDnaApi* | [**interfacesITokenDnaSetDna**](docs/ITokenDnaApi.md#interfacesITokenDnaSetDna) | **POST** /{networkId}/interface/ITokenDna/write/{address}/setDna | ITokenDna.setDna
*ITokenDnaApi* | [**interfacesITokenDnaSetDnaBatch**](docs/ITokenDnaApi.md#interfacesITokenDnaSetDnaBatch) | **POST** /{networkId}/interface/ITokenDna/write/{address}/setDnaBatch | ITokenDna.setDnaBatch
*ITokenURIApi* | [**interfacesITokenURITokenURI**](docs/ITokenURIApi.md#interfacesITokenURITokenURI) | **POST** /{networkId}/interface/ITokenURI/read/{address}/tokenURI | ITokenURI.tokenURI
*ITokenURIBaseURIApi* | [**interfacesITokenURIBaseURIBaseURI**](docs/ITokenURIBaseURIApi.md#interfacesITokenURIBaseURIBaseURI) | **POST** /{networkId}/interface/ITokenURIBaseURI/read/{address}/baseURI | ITokenURIBaseURI.baseURI
*ITokenURIBaseURIApi* | [**interfacesITokenURIBaseURISetTokenURIBaseURI**](docs/ITokenURIBaseURIApi.md#interfacesITokenURIBaseURISetTokenURIBaseURI) | **POST** /{networkId}/interface/ITokenURIBaseURI/write/{address}/setTokenURIBaseURI | ITokenURIBaseURI.setTokenURIBaseURI
*IUpgradeableBeaconApi* | [**interfacesIUpgradeableBeaconUpgradeTo**](docs/IUpgradeableBeaconApi.md#interfacesIUpgradeableBeaconUpgradeTo) | **POST** /{networkId}/interface/IUpgradeableBeacon/write/{address}/upgradeTo | IUpgradeableBeacon.upgradeTo
*UsersApi* | [**usersMe**](docs/UsersApi.md#usersMe) | **GET** /users/me | Get user info
*WebhooksApi* | [**webhooksReadme**](docs/WebhooksApi.md#webhooksReadme) | **POST** /webhooks/readme | Signup/Login user with readme.io


## Documentation for Models

 - [DeployBeaconProxyDefaultResponse](docs/DeployBeaconProxyDefaultResponse.md)
 - [DeployBeaconProxyDefaultResponseIssuesInner](docs/DeployBeaconProxyDefaultResponseIssuesInner.md)
 - [DeployBeaconProxyRequest](docs/DeployBeaconProxyRequest.md)
 - [DeployBeaconProxyRequestContractParams](docs/DeployBeaconProxyRequestContractParams.md)
 - [DeployBeaconProxyRequestDeployParams](docs/DeployBeaconProxyRequestDeployParams.md)
 - [DeployChainlinkAnyApiClientRequest](docs/DeployChainlinkAnyApiClientRequest.md)
 - [DeployChainlinkAnyApiClientRequestContractParams](docs/DeployChainlinkAnyApiClientRequestContractParams.md)
 - [DeployERC1155MintableRequest](docs/DeployERC1155MintableRequest.md)
 - [DeployERC1155MintableRequestContractParams](docs/DeployERC1155MintableRequestContractParams.md)
 - [DeployERC20MintableRequest](docs/DeployERC20MintableRequest.md)
 - [DeployERC20MintableRequestContractParams](docs/DeployERC20MintableRequestContractParams.md)
 - [DeployERC2981SetterRequest](docs/DeployERC2981SetterRequest.md)
 - [DeployERC2981SetterRequestContractParams](docs/DeployERC2981SetterRequestContractParams.md)
 - [DeployERC721MintableRequest](docs/DeployERC721MintableRequest.md)
 - [DeployERC721MintableRequestContractParams](docs/DeployERC721MintableRequestContractParams.md)
 - [DeployTokenDnaRequest](docs/DeployTokenDnaRequest.md)
 - [DeployTokenDnaRequestContractParams](docs/DeployTokenDnaRequestContractParams.md)
 - [DeployTokenURIBaseURIRequest](docs/DeployTokenURIBaseURIRequest.md)
 - [DeployTokenURIBaseURIRequestContractParams](docs/DeployTokenURIBaseURIRequestContractParams.md)
 - [DeployTokenURIDnaRequest](docs/DeployTokenURIDnaRequest.md)
 - [DeployTokenURIDnaRequestContractParams](docs/DeployTokenURIDnaRequestContractParams.md)
 - [DeployTokenURIRequest](docs/DeployTokenURIRequest.md)
 - [DeployTokenURIRequestContractParams](docs/DeployTokenURIRequestContractParams.md)
 - [DeployUpgradeableBeaconRequest](docs/DeployUpgradeableBeaconRequest.md)
 - [DeployUpgradeableBeaconRequestContractParams](docs/DeployUpgradeableBeaconRequestContractParams.md)
 - [InterfacesIAccessControlGetRoleAdmin200Response](docs/InterfacesIAccessControlGetRoleAdmin200Response.md)
 - [InterfacesIAccessControlGetRoleAdminRequest](docs/InterfacesIAccessControlGetRoleAdminRequest.md)
 - [InterfacesIAccessControlGetRoleAdminRequestContractParams](docs/InterfacesIAccessControlGetRoleAdminRequestContractParams.md)
 - [InterfacesIAccessControlGrantRole200Response](docs/InterfacesIAccessControlGrantRole200Response.md)
 - [InterfacesIAccessControlGrantRoleRequest](docs/InterfacesIAccessControlGrantRoleRequest.md)
 - [InterfacesIAccessControlGrantRoleRequestContractParams](docs/InterfacesIAccessControlGrantRoleRequestContractParams.md)
 - [InterfacesIAccessControlHasRole200Response](docs/InterfacesIAccessControlHasRole200Response.md)
 - [InterfacesIBeaconImplementation200Response](docs/InterfacesIBeaconImplementation200Response.md)
 - [InterfacesIBeaconImplementation200ResponseResult](docs/InterfacesIBeaconImplementation200ResponseResult.md)
 - [InterfacesIBeaconImplementationRequest](docs/InterfacesIBeaconImplementationRequest.md)
 - [InterfacesIBeaconProxySetBeacon200Response](docs/InterfacesIBeaconProxySetBeacon200Response.md)
 - [InterfacesIBeaconProxySetBeaconRequest](docs/InterfacesIBeaconProxySetBeaconRequest.md)
 - [InterfacesIBeaconProxySetBeaconRequestContractParams](docs/InterfacesIBeaconProxySetBeaconRequestContractParams.md)
 - [InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE200Response](docs/InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE200Response.md)
 - [InterfacesIChainlinkAnyApiClientFulfill200Response](docs/InterfacesIChainlinkAnyApiClientFulfill200Response.md)
 - [InterfacesIChainlinkAnyApiClientFulfillRequest](docs/InterfacesIChainlinkAnyApiClientFulfillRequest.md)
 - [InterfacesIChainlinkAnyApiClientFulfillRequestContractParams](docs/InterfacesIChainlinkAnyApiClientFulfillRequestContractParams.md)
 - [InterfacesIChainlinkAnyApiClientRequest200Response](docs/InterfacesIChainlinkAnyApiClientRequest200Response.md)
 - [InterfacesIChainlinkAnyApiClientRequestRequest](docs/InterfacesIChainlinkAnyApiClientRequestRequest.md)
 - [InterfacesIChainlinkAnyApiClientRequestRequestContractParams](docs/InterfacesIChainlinkAnyApiClientRequestRequestContractParams.md)
 - [InterfacesIChainlinkAnyApiClientRequests200Response](docs/InterfacesIChainlinkAnyApiClientRequests200Response.md)
 - [InterfacesIChainlinkAnyApiClientRequests200ResponseResult](docs/InterfacesIChainlinkAnyApiClientRequests200ResponseResult.md)
 - [InterfacesIChainlinkAnyApiClientRequestsRequest](docs/InterfacesIChainlinkAnyApiClientRequestsRequest.md)
 - [InterfacesIChainlinkAnyApiConsumerFulfill200Response](docs/InterfacesIChainlinkAnyApiConsumerFulfill200Response.md)
 - [InterfacesIChainlinkAnyApiConsumerFulfillRequest](docs/InterfacesIChainlinkAnyApiConsumerFulfillRequest.md)
 - [InterfacesIChainlinkAnyApiConsumerFulfillRequestContractParams](docs/InterfacesIChainlinkAnyApiConsumerFulfillRequestContractParams.md)
 - [InterfacesIContractURIContractURI200Response](docs/InterfacesIContractURIContractURI200Response.md)
 - [InterfacesIContractURIContractURI200ResponseResult](docs/InterfacesIContractURIContractURI200ResponseResult.md)
 - [InterfacesIContractURISetContractURI200Response](docs/InterfacesIContractURISetContractURI200Response.md)
 - [InterfacesIContractURISetContractURIRequest](docs/InterfacesIContractURISetContractURIRequest.md)
 - [InterfacesIContractURISetContractURIRequestContractParams](docs/InterfacesIContractURISetContractURIRequestContractParams.md)
 - [InterfacesIERC1155BalanceOf200Response](docs/InterfacesIERC1155BalanceOf200Response.md)
 - [InterfacesIERC1155BalanceOfBatch200Response](docs/InterfacesIERC1155BalanceOfBatch200Response.md)
 - [InterfacesIERC1155BalanceOfBatch200ResponseResult](docs/InterfacesIERC1155BalanceOfBatch200ResponseResult.md)
 - [InterfacesIERC1155BalanceOfBatchRequest](docs/InterfacesIERC1155BalanceOfBatchRequest.md)
 - [InterfacesIERC1155BalanceOfBatchRequestContractParams](docs/InterfacesIERC1155BalanceOfBatchRequestContractParams.md)
 - [InterfacesIERC1155BalanceOfRequest](docs/InterfacesIERC1155BalanceOfRequest.md)
 - [InterfacesIERC1155BalanceOfRequestContractParams](docs/InterfacesIERC1155BalanceOfRequestContractParams.md)
 - [InterfacesIERC1155IsApprovedForAll200Response](docs/InterfacesIERC1155IsApprovedForAll200Response.md)
 - [InterfacesIERC1155IsApprovedForAllRequest](docs/InterfacesIERC1155IsApprovedForAllRequest.md)
 - [InterfacesIERC1155IsApprovedForAllRequestContractParams](docs/InterfacesIERC1155IsApprovedForAllRequestContractParams.md)
 - [InterfacesIERC1155MetadataURIUri200Response](docs/InterfacesIERC1155MetadataURIUri200Response.md)
 - [InterfacesIERC1155MetadataURIUriRequest](docs/InterfacesIERC1155MetadataURIUriRequest.md)
 - [InterfacesIERC1155MetadataURIUriRequestContractParams](docs/InterfacesIERC1155MetadataURIUriRequestContractParams.md)
 - [InterfacesIERC1155MintableMint200Response](docs/InterfacesIERC1155MintableMint200Response.md)
 - [InterfacesIERC1155MintableMintBatch200Response](docs/InterfacesIERC1155MintableMintBatch200Response.md)
 - [InterfacesIERC1155MintableMintBatchRequest](docs/InterfacesIERC1155MintableMintBatchRequest.md)
 - [InterfacesIERC1155MintableMintBatchRequestContractParams](docs/InterfacesIERC1155MintableMintBatchRequestContractParams.md)
 - [InterfacesIERC1155MintableMintRequest](docs/InterfacesIERC1155MintableMintRequest.md)
 - [InterfacesIERC1155MintableMintRequestContractParams](docs/InterfacesIERC1155MintableMintRequestContractParams.md)
 - [InterfacesIERC1155SafeBatchTransferFrom200Response](docs/InterfacesIERC1155SafeBatchTransferFrom200Response.md)
 - [InterfacesIERC1155SafeBatchTransferFromRequest](docs/InterfacesIERC1155SafeBatchTransferFromRequest.md)
 - [InterfacesIERC1155SafeBatchTransferFromRequestContractParams](docs/InterfacesIERC1155SafeBatchTransferFromRequestContractParams.md)
 - [InterfacesIERC1155SafeTransferFrom200Response](docs/InterfacesIERC1155SafeTransferFrom200Response.md)
 - [InterfacesIERC1155SafeTransferFromRequest](docs/InterfacesIERC1155SafeTransferFromRequest.md)
 - [InterfacesIERC1155SafeTransferFromRequestContractParams](docs/InterfacesIERC1155SafeTransferFromRequestContractParams.md)
 - [InterfacesIERC1155SetApprovalForAll200Response](docs/InterfacesIERC1155SetApprovalForAll200Response.md)
 - [InterfacesIERC1155SetApprovalForAllRequest](docs/InterfacesIERC1155SetApprovalForAllRequest.md)
 - [InterfacesIERC1155SetApprovalForAllRequestContractParams](docs/InterfacesIERC1155SetApprovalForAllRequestContractParams.md)
 - [InterfacesIERC165SupportsInterface200Response](docs/InterfacesIERC165SupportsInterface200Response.md)
 - [InterfacesIERC165SupportsInterface200ResponseResult](docs/InterfacesIERC165SupportsInterface200ResponseResult.md)
 - [InterfacesIERC165SupportsInterfaceRequest](docs/InterfacesIERC165SupportsInterfaceRequest.md)
 - [InterfacesIERC165SupportsInterfaceRequestContractParams](docs/InterfacesIERC165SupportsInterfaceRequestContractParams.md)
 - [InterfacesIERC1820GetInterfaceImplementer200Response](docs/InterfacesIERC1820GetInterfaceImplementer200Response.md)
 - [InterfacesIERC1820GetInterfaceImplementerRequest](docs/InterfacesIERC1820GetInterfaceImplementerRequest.md)
 - [InterfacesIERC1820GetInterfaceImplementerRequestContractParams](docs/InterfacesIERC1820GetInterfaceImplementerRequestContractParams.md)
 - [InterfacesIERC1820GetManager200Response](docs/InterfacesIERC1820GetManager200Response.md)
 - [InterfacesIERC1820GetManagerRequest](docs/InterfacesIERC1820GetManagerRequest.md)
 - [InterfacesIERC1820GetManagerRequestContractParams](docs/InterfacesIERC1820GetManagerRequestContractParams.md)
 - [InterfacesIERC1820ImplementsERC165Interface200Response](docs/InterfacesIERC1820ImplementsERC165Interface200Response.md)
 - [InterfacesIERC1820ImplementsERC165InterfaceRequest](docs/InterfacesIERC1820ImplementsERC165InterfaceRequest.md)
 - [InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams](docs/InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams.md)
 - [InterfacesIERC1820InterfaceHash200Response](docs/InterfacesIERC1820InterfaceHash200Response.md)
 - [InterfacesIERC1820InterfaceHash200ResponseResult](docs/InterfacesIERC1820InterfaceHash200ResponseResult.md)
 - [InterfacesIERC1820InterfaceHashRequest](docs/InterfacesIERC1820InterfaceHashRequest.md)
 - [InterfacesIERC1820InterfaceHashRequestContractParams](docs/InterfacesIERC1820InterfaceHashRequestContractParams.md)
 - [InterfacesIERC1820SetInterfaceImplementer200Response](docs/InterfacesIERC1820SetInterfaceImplementer200Response.md)
 - [InterfacesIERC1820SetInterfaceImplementerRequest](docs/InterfacesIERC1820SetInterfaceImplementerRequest.md)
 - [InterfacesIERC1820SetInterfaceImplementerRequestContractParams](docs/InterfacesIERC1820SetInterfaceImplementerRequestContractParams.md)
 - [InterfacesIERC1820SetManager200Response](docs/InterfacesIERC1820SetManager200Response.md)
 - [InterfacesIERC1820SetManagerRequest](docs/InterfacesIERC1820SetManagerRequest.md)
 - [InterfacesIERC1820SetManagerRequestContractParams](docs/InterfacesIERC1820SetManagerRequestContractParams.md)
 - [InterfacesIERC1820UpdateERC165Cache200Response](docs/InterfacesIERC1820UpdateERC165Cache200Response.md)
 - [InterfacesIERC20Allowance200Response](docs/InterfacesIERC20Allowance200Response.md)
 - [InterfacesIERC20Allowance200ResponseResult](docs/InterfacesIERC20Allowance200ResponseResult.md)
 - [InterfacesIERC20AllowanceRequest](docs/InterfacesIERC20AllowanceRequest.md)
 - [InterfacesIERC20AllowanceRequestContractParams](docs/InterfacesIERC20AllowanceRequestContractParams.md)
 - [InterfacesIERC20Approve200Response](docs/InterfacesIERC20Approve200Response.md)
 - [InterfacesIERC20ApproveRequest](docs/InterfacesIERC20ApproveRequest.md)
 - [InterfacesIERC20ApproveRequestContractParams](docs/InterfacesIERC20ApproveRequestContractParams.md)
 - [InterfacesIERC20BalanceOf200Response](docs/InterfacesIERC20BalanceOf200Response.md)
 - [InterfacesIERC20MetadataDecimals200Response](docs/InterfacesIERC20MetadataDecimals200Response.md)
 - [InterfacesIERC20MetadataDecimals200ResponseResult](docs/InterfacesIERC20MetadataDecimals200ResponseResult.md)
 - [InterfacesIERC20TotalSupply200Response](docs/InterfacesIERC20TotalSupply200Response.md)
 - [InterfacesIERC20Transfer200Response](docs/InterfacesIERC20Transfer200Response.md)
 - [InterfacesIERC20TransferFrom200Response](docs/InterfacesIERC20TransferFrom200Response.md)
 - [InterfacesIERC20TransferFromRequest](docs/InterfacesIERC20TransferFromRequest.md)
 - [InterfacesIERC20TransferFromRequestContractParams](docs/InterfacesIERC20TransferFromRequestContractParams.md)
 - [InterfacesIERC20TransferRequest](docs/InterfacesIERC20TransferRequest.md)
 - [InterfacesIERC20TransferRequestContractParams](docs/InterfacesIERC20TransferRequestContractParams.md)
 - [InterfacesIERC2981RoyaltyInfo200Response](docs/InterfacesIERC2981RoyaltyInfo200Response.md)
 - [InterfacesIERC2981RoyaltyInfo200ResponseResult](docs/InterfacesIERC2981RoyaltyInfo200ResponseResult.md)
 - [InterfacesIERC2981RoyaltyInfoRequest](docs/InterfacesIERC2981RoyaltyInfoRequest.md)
 - [InterfacesIERC2981RoyaltyInfoRequestContractParams](docs/InterfacesIERC2981RoyaltyInfoRequestContractParams.md)
 - [InterfacesIERC2981SetterSetDefaultRoyalty200Response](docs/InterfacesIERC2981SetterSetDefaultRoyalty200Response.md)
 - [InterfacesIERC2981SetterSetDefaultRoyaltyRequest](docs/InterfacesIERC2981SetterSetDefaultRoyaltyRequest.md)
 - [InterfacesIERC2981SetterSetDefaultRoyaltyRequestContractParams](docs/InterfacesIERC2981SetterSetDefaultRoyaltyRequestContractParams.md)
 - [InterfacesIERC2981SetterSetTokenRoyalty200Response](docs/InterfacesIERC2981SetterSetTokenRoyalty200Response.md)
 - [InterfacesIERC2981SetterSetTokenRoyaltyRequest](docs/InterfacesIERC2981SetterSetTokenRoyaltyRequest.md)
 - [InterfacesIERC2981SetterSetTokenRoyaltyRequestContractParams](docs/InterfacesIERC2981SetterSetTokenRoyaltyRequestContractParams.md)
 - [InterfacesIERC721Approve200Response](docs/InterfacesIERC721Approve200Response.md)
 - [InterfacesIERC721ApproveRequest](docs/InterfacesIERC721ApproveRequest.md)
 - [InterfacesIERC721ApproveRequestContractParams](docs/InterfacesIERC721ApproveRequestContractParams.md)
 - [InterfacesIERC721BalanceOf200Response](docs/InterfacesIERC721BalanceOf200Response.md)
 - [InterfacesIERC721BalanceOf200ResponseResult](docs/InterfacesIERC721BalanceOf200ResponseResult.md)
 - [InterfacesIERC721BalanceOfRequest](docs/InterfacesIERC721BalanceOfRequest.md)
 - [InterfacesIERC721BalanceOfRequestContractParams](docs/InterfacesIERC721BalanceOfRequestContractParams.md)
 - [InterfacesIERC721EnumerableTokenByIndex200Response](docs/InterfacesIERC721EnumerableTokenByIndex200Response.md)
 - [InterfacesIERC721EnumerableTokenByIndexRequest](docs/InterfacesIERC721EnumerableTokenByIndexRequest.md)
 - [InterfacesIERC721EnumerableTokenByIndexRequestContractParams](docs/InterfacesIERC721EnumerableTokenByIndexRequestContractParams.md)
 - [InterfacesIERC721EnumerableTokenOfOwnerByIndex200Response](docs/InterfacesIERC721EnumerableTokenOfOwnerByIndex200Response.md)
 - [InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest](docs/InterfacesIERC721EnumerableTokenOfOwnerByIndexRequest.md)
 - [InterfacesIERC721EnumerableTokenOfOwnerByIndexRequestContractParams](docs/InterfacesIERC721EnumerableTokenOfOwnerByIndexRequestContractParams.md)
 - [InterfacesIERC721GetApproved200Response](docs/InterfacesIERC721GetApproved200Response.md)
 - [InterfacesIERC721GetApproved200ResponseResult](docs/InterfacesIERC721GetApproved200ResponseResult.md)
 - [InterfacesIERC721GetApprovedRequest](docs/InterfacesIERC721GetApprovedRequest.md)
 - [InterfacesIERC721GetApprovedRequestContractParams](docs/InterfacesIERC721GetApprovedRequestContractParams.md)
 - [InterfacesIERC721IsApprovedForAll200Response](docs/InterfacesIERC721IsApprovedForAll200Response.md)
 - [InterfacesIERC721IsApprovedForAllRequest](docs/InterfacesIERC721IsApprovedForAllRequest.md)
 - [InterfacesIERC721IsApprovedForAllRequestContractParams](docs/InterfacesIERC721IsApprovedForAllRequestContractParams.md)
 - [InterfacesIERC721MetadataTokenURI200Response](docs/InterfacesIERC721MetadataTokenURI200Response.md)
 - [InterfacesIERC721MintableAutoIdMint200Response](docs/InterfacesIERC721MintableAutoIdMint200Response.md)
 - [InterfacesIERC721MintableAutoIdMintBatch200Response](docs/InterfacesIERC721MintableAutoIdMintBatch200Response.md)
 - [InterfacesIERC721MintableAutoIdMintBatchRequest](docs/InterfacesIERC721MintableAutoIdMintBatchRequest.md)
 - [InterfacesIERC721MintableAutoIdMintBatchRequestContractParams](docs/InterfacesIERC721MintableAutoIdMintBatchRequestContractParams.md)
 - [InterfacesIERC721MintableAutoIdMintRequest](docs/InterfacesIERC721MintableAutoIdMintRequest.md)
 - [InterfacesIERC721MintableAutoIdMintRequestContractParams](docs/InterfacesIERC721MintableAutoIdMintRequestContractParams.md)
 - [InterfacesIERC721MintableMintBatch200Response](docs/InterfacesIERC721MintableMintBatch200Response.md)
 - [InterfacesIERC721MintableMintBatchRequest](docs/InterfacesIERC721MintableMintBatchRequest.md)
 - [InterfacesIERC721MintableMintBatchRequestContractParams](docs/InterfacesIERC721MintableMintBatchRequestContractParams.md)
 - [InterfacesIERC721OwnerOf200Response](docs/InterfacesIERC721OwnerOf200Response.md)
 - [InterfacesIERC721SafeTransferFrom200Response](docs/InterfacesIERC721SafeTransferFrom200Response.md)
 - [InterfacesIERC721SafeTransferFromRequest](docs/InterfacesIERC721SafeTransferFromRequest.md)
 - [InterfacesIERC721SafeTransferFromRequestContractParams](docs/InterfacesIERC721SafeTransferFromRequestContractParams.md)
 - [InterfacesIERC721SetApprovalForAll200Response](docs/InterfacesIERC721SetApprovalForAll200Response.md)
 - [InterfacesIERC721SetApprovalForAllRequest](docs/InterfacesIERC721SetApprovalForAllRequest.md)
 - [InterfacesIERC721SetApprovalForAllRequestContractParams](docs/InterfacesIERC721SetApprovalForAllRequestContractParams.md)
 - [InterfacesIERC721TransferFrom200Response](docs/InterfacesIERC721TransferFrom200Response.md)
 - [InterfacesIERC721TransferFromRequest](docs/InterfacesIERC721TransferFromRequest.md)
 - [InterfacesIERC721TransferFromRequestContractParams](docs/InterfacesIERC721TransferFromRequestContractParams.md)
 - [InterfacesITokenDnaGetDna200Response](docs/InterfacesITokenDnaGetDna200Response.md)
 - [InterfacesITokenDnaGetDna200ResponseResult](docs/InterfacesITokenDnaGetDna200ResponseResult.md)
 - [InterfacesITokenDnaGetDnaBatch200Response](docs/InterfacesITokenDnaGetDnaBatch200Response.md)
 - [InterfacesITokenDnaGetDnaBatch200ResponseResult](docs/InterfacesITokenDnaGetDnaBatch200ResponseResult.md)
 - [InterfacesITokenDnaGetDnaBatchRequest](docs/InterfacesITokenDnaGetDnaBatchRequest.md)
 - [InterfacesITokenDnaGetDnaBatchRequestContractParams](docs/InterfacesITokenDnaGetDnaBatchRequestContractParams.md)
 - [InterfacesITokenDnaSetDna200Response](docs/InterfacesITokenDnaSetDna200Response.md)
 - [InterfacesITokenDnaSetDnaBatch200Response](docs/InterfacesITokenDnaSetDnaBatch200Response.md)
 - [InterfacesITokenDnaSetDnaBatchRequest](docs/InterfacesITokenDnaSetDnaBatchRequest.md)
 - [InterfacesITokenDnaSetDnaBatchRequestContractParams](docs/InterfacesITokenDnaSetDnaBatchRequestContractParams.md)
 - [InterfacesITokenDnaSetDnaRequest](docs/InterfacesITokenDnaSetDnaRequest.md)
 - [InterfacesITokenDnaSetDnaRequestContractParams](docs/InterfacesITokenDnaSetDnaRequestContractParams.md)
 - [InterfacesIUpgradeableBeaconUpgradeTo200Response](docs/InterfacesIUpgradeableBeaconUpgradeTo200Response.md)
 - [InterfacesIUpgradeableBeaconUpgradeToRequest](docs/InterfacesIUpgradeableBeaconUpgradeToRequest.md)
 - [InterfacesIUpgradeableBeaconUpgradeToRequestContractParams](docs/InterfacesIUpgradeableBeaconUpgradeToRequestContractParams.md)
 - [UsersMe200Response](docs/UsersMe200Response.md)
 - [WebhooksReadme200Response](docs/WebhooksReadme200Response.md)
 - [WebhooksReadmeRequest](docs/WebhooksReadmeRequest.md)


## Documentation for Authorization

Authentication schemes defined for the API:
### Authorization

- **Type**: API key

- **API key parameter name**: x-api-key
- **Location**: HTTP header


## Recommendation

It's recommended to create an instance of `ApiClient` per thread in a multithreaded environment to avoid any potential issues.

## Author



