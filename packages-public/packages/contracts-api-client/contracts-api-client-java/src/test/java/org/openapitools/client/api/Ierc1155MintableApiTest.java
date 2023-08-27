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
import org.openapitools.client.model.InterfacesIERC1155MintableMint200Response;
import org.openapitools.client.model.InterfacesIERC1155MintableMintBatch200Response;
import org.openapitools.client.model.InterfacesIERC1155MintableMintBatchRequest;
import org.openapitools.client.model.InterfacesIERC1155MintableMintRequest;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * API tests for Ierc1155MintableApi
 */
@Disabled
public class Ierc1155MintableApiTest {

    private final Ierc1155MintableApi api = new Ierc1155MintableApi();

    /**
     * IERC1155Mintable.mint
     *
     * Write &#x60;mint(to,id,amount,data)&#x60; on an instance of &#x60;IERC1155Mintable&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void interfacesIERC1155MintableMintTest() throws ApiException {
        String networkId = null;
        String address = null;
        InterfacesIERC1155MintableMintRequest interfacesIERC1155MintableMintRequest = null;
        InterfacesIERC1155MintableMint200Response response = api.interfacesIERC1155MintableMint(networkId, address, interfacesIERC1155MintableMintRequest);
        // TODO: test validations
    }

    /**
     * IERC1155Mintable.mintBatch
     *
     * Write &#x60;mintBatch(to,ids,amounts,data)&#x60; on an instance of &#x60;IERC1155Mintable&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void interfacesIERC1155MintableMintBatchTest() throws ApiException {
        String networkId = null;
        String address = null;
        InterfacesIERC1155MintableMintBatchRequest interfacesIERC1155MintableMintBatchRequest = null;
        InterfacesIERC1155MintableMintBatch200Response response = api.interfacesIERC1155MintableMintBatch(networkId, address, interfacesIERC1155MintableMintBatchRequest);
        // TODO: test validations
    }

}