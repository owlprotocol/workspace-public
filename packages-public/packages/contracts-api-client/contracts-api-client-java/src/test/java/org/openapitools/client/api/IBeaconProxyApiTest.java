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
import org.openapitools.client.model.InterfacesIBeaconImplementation200Response;
import org.openapitools.client.model.InterfacesIBeaconImplementationRequest;
import org.openapitools.client.model.InterfacesIBeaconProxySetBeacon200Response;
import org.openapitools.client.model.InterfacesIBeaconProxySetBeaconRequest;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * API tests for IBeaconProxyApi
 */
@Disabled
public class IBeaconProxyApiTest {

    private final IBeaconProxyApi api = new IBeaconProxyApi();

    /**
     * IBeaconProxy.beacon
     *
     * Read &#x60;beacon()&#x60; on an instance of &#x60;IBeaconProxy&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void interfacesIBeaconProxyBeaconTest() throws ApiException {
        String networkId = null;
        String address = null;
        InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest = null;
        InterfacesIBeaconImplementation200Response response = api.interfacesIBeaconProxyBeacon(networkId, address, interfacesIBeaconImplementationRequest);
        // TODO: test validations
    }

    /**
     * IBeaconProxy.setBeacon
     *
     * Write &#x60;setBeacon(_beaconAddress,data)&#x60; on an instance of &#x60;IBeaconProxy&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void interfacesIBeaconProxySetBeaconTest() throws ApiException {
        String networkId = null;
        String address = null;
        InterfacesIBeaconProxySetBeaconRequest interfacesIBeaconProxySetBeaconRequest = null;
        InterfacesIBeaconProxySetBeacon200Response response = api.interfacesIBeaconProxySetBeacon(networkId, address, interfacesIBeaconProxySetBeaconRequest);
        // TODO: test validations
    }

}