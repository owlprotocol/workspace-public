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
import org.openapitools.client.model.InterfacesIERC721MintableAutoIdMint200Response;
import org.openapitools.client.model.InterfacesIERC721MintableAutoIdMintBatch200Response;
import org.openapitools.client.model.InterfacesIERC721MintableAutoIdMintBatchRequest;
import org.openapitools.client.model.InterfacesIERC721MintableAutoIdMintRequest;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * API tests for Ierc721MintableAutoIdApi
 */
@Disabled
public class Ierc721MintableAutoIdApiTest {

    private final Ierc721MintableAutoIdApi api = new Ierc721MintableAutoIdApi();

    /**
     * IERC721MintableAutoId.mint
     *
     * Write &#x60;mint(to)&#x60; on an instance of &#x60;IERC721MintableAutoId&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void interfacesIERC721MintableAutoIdMintTest() throws ApiException {
        String networkId = null;
        String address = null;
        InterfacesIERC721MintableAutoIdMintRequest interfacesIERC721MintableAutoIdMintRequest = null;
        InterfacesIERC721MintableAutoIdMint200Response response = api.interfacesIERC721MintableAutoIdMint(networkId, address, interfacesIERC721MintableAutoIdMintRequest);
        // TODO: test validations
    }

    /**
     * IERC721MintableAutoId.mintBatch
     *
     * Write &#x60;mintBatch(to)&#x60; on an instance of &#x60;IERC721MintableAutoId&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void interfacesIERC721MintableAutoIdMintBatchTest() throws ApiException {
        String networkId = null;
        String address = null;
        InterfacesIERC721MintableAutoIdMintBatchRequest interfacesIERC721MintableAutoIdMintBatchRequest = null;
        InterfacesIERC721MintableAutoIdMintBatch200Response response = api.interfacesIERC721MintableAutoIdMintBatch(networkId, address, interfacesIERC721MintableAutoIdMintBatchRequest);
        // TODO: test validations
    }

    /**
     * IERC721MintableAutoId.safeMint
     *
     * Write &#x60;safeMint(to)&#x60; on an instance of &#x60;IERC721MintableAutoId&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void interfacesIERC721MintableAutoIdSafeMintTest() throws ApiException {
        String networkId = null;
        String address = null;
        InterfacesIERC721MintableAutoIdMintRequest interfacesIERC721MintableAutoIdMintRequest = null;
        InterfacesIERC721MintableAutoIdMint200Response response = api.interfacesIERC721MintableAutoIdSafeMint(networkId, address, interfacesIERC721MintableAutoIdMintRequest);
        // TODO: test validations
    }

    /**
     * IERC721MintableAutoId.safeMintBatch
     *
     * Write &#x60;safeMintBatch(to)&#x60; on an instance of &#x60;IERC721MintableAutoId&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void interfacesIERC721MintableAutoIdSafeMintBatchTest() throws ApiException {
        String networkId = null;
        String address = null;
        InterfacesIERC721MintableAutoIdMintBatchRequest interfacesIERC721MintableAutoIdMintBatchRequest = null;
        InterfacesIERC721MintableAutoIdMintBatch200Response response = api.interfacesIERC721MintableAutoIdSafeMintBatch(networkId, address, interfacesIERC721MintableAutoIdMintBatchRequest);
        // TODO: test validations
    }

}
