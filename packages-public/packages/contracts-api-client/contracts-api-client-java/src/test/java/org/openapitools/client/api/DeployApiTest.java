/*
 * Owl Contract Api
 * Specification for our API focused on contract interactions
 *
 * The version of the OpenAPI document: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


package org.openapitools.client.api;

import org.openapitools.client.ApiException;
import org.openapitools.client.model.DeployBeaconProxyDefaultResponse;
import org.openapitools.client.model.DeployBeaconProxyRequest;
import org.openapitools.client.model.DeployChainlinkAnyApiClientRequest;
import org.openapitools.client.model.DeployERC1155MintableRequest;
import org.openapitools.client.model.DeployERC20MintableRequest;
import org.openapitools.client.model.DeployERC2981SetterRequest;
import org.openapitools.client.model.DeployERC721MintableRequest;
import org.openapitools.client.model.DeployTokenDnaRequest;
import org.openapitools.client.model.DeployTokenURIBaseURIRequest;
import org.openapitools.client.model.DeployTokenURIDnaRequest;
import org.openapitools.client.model.DeployTokenURIRequest;
import org.openapitools.client.model.DeployUpgradeableBeaconRequest;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * API tests for DeployApi
 */
@Disabled
public class DeployApiTest {

    private final DeployApi api = new DeployApi();

    /**
     * Deploy BeaconProxy
     *
     * Deploys an instance of &#x60;BeaconProxy&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void deployBeaconProxyTest() throws ApiException {
        String networkId = null;
        DeployBeaconProxyRequest deployBeaconProxyRequest = null;
        Object response = api.deployBeaconProxy(networkId, deployBeaconProxyRequest);
        // TODO: test validations
    }

    /**
     * Deploy ChainlinkAnyApiClient
     *
     * Deploys an instance of &#x60;ChainlinkAnyApiClient&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void deployChainlinkAnyApiClientTest() throws ApiException {
        String networkId = null;
        DeployChainlinkAnyApiClientRequest deployChainlinkAnyApiClientRequest = null;
        Object response = api.deployChainlinkAnyApiClient(networkId, deployChainlinkAnyApiClientRequest);
        // TODO: test validations
    }

    /**
     * Deploy ERC1155Mintable
     *
     * Deploys an instance of &#x60;ERC1155Mintable&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void deployERC1155MintableTest() throws ApiException {
        String networkId = null;
        DeployERC1155MintableRequest deployERC1155MintableRequest = null;
        Object response = api.deployERC1155Mintable(networkId, deployERC1155MintableRequest);
        // TODO: test validations
    }

    /**
     * Deploy ERC20Mintable
     *
     * Deploys an instance of &#x60;ERC20Mintable&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void deployERC20MintableTest() throws ApiException {
        String networkId = null;
        DeployERC20MintableRequest deployERC20MintableRequest = null;
        Object response = api.deployERC20Mintable(networkId, deployERC20MintableRequest);
        // TODO: test validations
    }

    /**
     * Deploy ERC2981Setter
     *
     * Deploys an instance of &#x60;ERC2981Setter&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void deployERC2981SetterTest() throws ApiException {
        String networkId = null;
        DeployERC2981SetterRequest deployERC2981SetterRequest = null;
        Object response = api.deployERC2981Setter(networkId, deployERC2981SetterRequest);
        // TODO: test validations
    }

    /**
     * Deploy ERC721Mintable
     *
     * Deploys an instance of &#x60;ERC721Mintable&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void deployERC721MintableTest() throws ApiException {
        String networkId = null;
        DeployERC721MintableRequest deployERC721MintableRequest = null;
        Object response = api.deployERC721Mintable(networkId, deployERC721MintableRequest);
        // TODO: test validations
    }

    /**
     * Deploy ERC721MintableAutoId
     *
     * Deploys an instance of &#x60;ERC721MintableAutoId&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void deployERC721MintableAutoIdTest() throws ApiException {
        String networkId = null;
        DeployERC721MintableRequest deployERC721MintableRequest = null;
        Object response = api.deployERC721MintableAutoId(networkId, deployERC721MintableRequest);
        // TODO: test validations
    }

    /**
     * Deploy TokenDna
     *
     * Deploys an instance of &#x60;TokenDna&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void deployTokenDnaTest() throws ApiException {
        String networkId = null;
        DeployTokenDnaRequest deployTokenDnaRequest = null;
        Object response = api.deployTokenDna(networkId, deployTokenDnaRequest);
        // TODO: test validations
    }

    /**
     * Deploy TokenURI
     *
     * Deploys an instance of &#x60;TokenURI&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void deployTokenURITest() throws ApiException {
        String networkId = null;
        DeployTokenURIRequest deployTokenURIRequest = null;
        Object response = api.deployTokenURI(networkId, deployTokenURIRequest);
        // TODO: test validations
    }

    /**
     * Deploy TokenURIBaseURI
     *
     * Deploys an instance of &#x60;TokenURIBaseURI&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void deployTokenURIBaseURITest() throws ApiException {
        String networkId = null;
        DeployTokenURIBaseURIRequest deployTokenURIBaseURIRequest = null;
        Object response = api.deployTokenURIBaseURI(networkId, deployTokenURIBaseURIRequest);
        // TODO: test validations
    }

    /**
     * Deploy TokenURIDna
     *
     * Deploys an instance of &#x60;TokenURIDna&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void deployTokenURIDnaTest() throws ApiException {
        String networkId = null;
        DeployTokenURIDnaRequest deployTokenURIDnaRequest = null;
        Object response = api.deployTokenURIDna(networkId, deployTokenURIDnaRequest);
        // TODO: test validations
    }

    /**
     * Deploy UpgradeableBeacon
     *
     * Deploys an instance of &#x60;UpgradeableBeacon&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void deployUpgradeableBeaconTest() throws ApiException {
        String networkId = null;
        DeployUpgradeableBeaconRequest deployUpgradeableBeaconRequest = null;
        Object response = api.deployUpgradeableBeacon(networkId, deployUpgradeableBeaconRequest);
        // TODO: test validations
    }

}