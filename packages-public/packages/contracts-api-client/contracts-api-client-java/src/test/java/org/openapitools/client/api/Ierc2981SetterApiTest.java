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
import org.openapitools.client.model.InterfacesIERC2981SetterSetDefaultRoyalty200Response;
import org.openapitools.client.model.InterfacesIERC2981SetterSetDefaultRoyaltyRequest;
import org.openapitools.client.model.InterfacesIERC2981SetterSetTokenRoyalty200Response;
import org.openapitools.client.model.InterfacesIERC2981SetterSetTokenRoyaltyRequest;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * API tests for Ierc2981SetterApi
 */
@Disabled
public class Ierc2981SetterApiTest {

    private final Ierc2981SetterApi api = new Ierc2981SetterApi();

    /**
     * IERC2981Setter.setDefaultRoyalty
     *
     * Write &#x60;setDefaultRoyalty(receiver,feeNumerator)&#x60; on an instance of &#x60;IERC2981Setter&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void interfacesIERC2981SetterSetDefaultRoyaltyTest() throws ApiException {
        String networkId = null;
        String address = null;
        InterfacesIERC2981SetterSetDefaultRoyaltyRequest interfacesIERC2981SetterSetDefaultRoyaltyRequest = null;
        InterfacesIERC2981SetterSetDefaultRoyalty200Response response = api.interfacesIERC2981SetterSetDefaultRoyalty(networkId, address, interfacesIERC2981SetterSetDefaultRoyaltyRequest);
        // TODO: test validations
    }

    /**
     * IERC2981Setter.setTokenRoyalty
     *
     * Write &#x60;setTokenRoyalty(tokenId,receiver,feeNumerator)&#x60; on an instance of &#x60;IERC2981Setter&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void interfacesIERC2981SetterSetTokenRoyaltyTest() throws ApiException {
        String networkId = null;
        String address = null;
        InterfacesIERC2981SetterSetTokenRoyaltyRequest interfacesIERC2981SetterSetTokenRoyaltyRequest = null;
        InterfacesIERC2981SetterSetTokenRoyalty200Response response = api.interfacesIERC2981SetterSetTokenRoyalty(networkId, address, interfacesIERC2981SetterSetTokenRoyaltyRequest);
        // TODO: test validations
    }

}