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
import org.openapitools.client.model.InterfacesIBeaconImplementationRequest;
import org.openapitools.client.model.InterfacesIERC1820GetManagerRequest;
import org.openapitools.client.model.InterfacesIERC20Allowance200Response;
import org.openapitools.client.model.InterfacesIERC20AllowanceRequest;
import org.openapitools.client.model.InterfacesIERC20Approve200Response;
import org.openapitools.client.model.InterfacesIERC20ApproveRequest;
import org.openapitools.client.model.InterfacesIERC20BalanceOf200Response;
import org.openapitools.client.model.InterfacesIERC20TotalSupply200Response;
import org.openapitools.client.model.InterfacesIERC20Transfer200Response;
import org.openapitools.client.model.InterfacesIERC20TransferFrom200Response;
import org.openapitools.client.model.InterfacesIERC20TransferFromRequest;
import org.openapitools.client.model.InterfacesIERC20TransferRequest;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * API tests for Ierc20Api
 */
@Disabled
public class Ierc20ApiTest {

    private final Ierc20Api api = new Ierc20Api();

    /**
     * IERC20.allowance
     *
     * Read &#x60;allowance(owner,spender)&#x60; on an instance of &#x60;IERC20&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void interfacesIERC20AllowanceTest() throws ApiException {
        String networkId = null;
        String address = null;
        InterfacesIERC20AllowanceRequest interfacesIERC20AllowanceRequest = null;
        InterfacesIERC20Allowance200Response response = api.interfacesIERC20Allowance(networkId, address, interfacesIERC20AllowanceRequest);
        // TODO: test validations
    }

    /**
     * IERC20.approve
     *
     * Write &#x60;approve(spender,amount)&#x60; on an instance of &#x60;IERC20&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void interfacesIERC20ApproveTest() throws ApiException {
        String networkId = null;
        String address = null;
        InterfacesIERC20ApproveRequest interfacesIERC20ApproveRequest = null;
        InterfacesIERC20Approve200Response response = api.interfacesIERC20Approve(networkId, address, interfacesIERC20ApproveRequest);
        // TODO: test validations
    }

    /**
     * IERC20.balanceOf
     *
     * Read &#x60;balanceOf(account)&#x60; on an instance of &#x60;IERC20&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void interfacesIERC20BalanceOfTest() throws ApiException {
        String networkId = null;
        String address = null;
        InterfacesIERC1820GetManagerRequest interfacesIERC1820GetManagerRequest = null;
        InterfacesIERC20BalanceOf200Response response = api.interfacesIERC20BalanceOf(networkId, address, interfacesIERC1820GetManagerRequest);
        // TODO: test validations
    }

    /**
     * IERC20.totalSupply
     *
     * Read &#x60;totalSupply()&#x60; on an instance of &#x60;IERC20&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void interfacesIERC20TotalSupplyTest() throws ApiException {
        String networkId = null;
        String address = null;
        InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest = null;
        InterfacesIERC20TotalSupply200Response response = api.interfacesIERC20TotalSupply(networkId, address, interfacesIBeaconImplementationRequest);
        // TODO: test validations
    }

    /**
     * IERC20.transfer
     *
     * Write &#x60;transfer(to,amount)&#x60; on an instance of &#x60;IERC20&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void interfacesIERC20TransferTest() throws ApiException {
        String networkId = null;
        String address = null;
        InterfacesIERC20TransferRequest interfacesIERC20TransferRequest = null;
        InterfacesIERC20Transfer200Response response = api.interfacesIERC20Transfer(networkId, address, interfacesIERC20TransferRequest);
        // TODO: test validations
    }

    /**
     * IERC20.transferFrom
     *
     * Write &#x60;transferFrom(from,to,amount)&#x60; on an instance of &#x60;IERC20&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void interfacesIERC20TransferFromTest() throws ApiException {
        String networkId = null;
        String address = null;
        InterfacesIERC20TransferFromRequest interfacesIERC20TransferFromRequest = null;
        InterfacesIERC20TransferFrom200Response response = api.interfacesIERC20TransferFrom(networkId, address, interfacesIERC20TransferFromRequest);
        // TODO: test validations
    }

}