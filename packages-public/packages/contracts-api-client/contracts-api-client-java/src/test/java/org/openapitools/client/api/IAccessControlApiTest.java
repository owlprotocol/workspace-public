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
import org.openapitools.client.model.InterfacesIAccessControlGetRoleAdmin200Response;
import org.openapitools.client.model.InterfacesIAccessControlGetRoleAdminRequest;
import org.openapitools.client.model.InterfacesIAccessControlGrantRole200Response;
import org.openapitools.client.model.InterfacesIAccessControlGrantRoleRequest;
import org.openapitools.client.model.InterfacesIAccessControlHasRole200Response;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * API tests for IAccessControlApi
 */
@Disabled
public class IAccessControlApiTest {

    private final IAccessControlApi api = new IAccessControlApi();

    /**
     * IAccessControl.getRoleAdmin
     *
     * Read &#x60;getRoleAdmin(role)&#x60; on an instance of &#x60;IAccessControl&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void interfacesIAccessControlGetRoleAdminTest() throws ApiException {
        String networkId = null;
        String address = null;
        InterfacesIAccessControlGetRoleAdminRequest interfacesIAccessControlGetRoleAdminRequest = null;
        InterfacesIAccessControlGetRoleAdmin200Response response = api.interfacesIAccessControlGetRoleAdmin(networkId, address, interfacesIAccessControlGetRoleAdminRequest);
        // TODO: test validations
    }

    /**
     * IAccessControl.grantRole
     *
     * Write &#x60;grantRole(role,account)&#x60; on an instance of &#x60;IAccessControl&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void interfacesIAccessControlGrantRoleTest() throws ApiException {
        String networkId = null;
        String address = null;
        InterfacesIAccessControlGrantRoleRequest interfacesIAccessControlGrantRoleRequest = null;
        InterfacesIAccessControlGrantRole200Response response = api.interfacesIAccessControlGrantRole(networkId, address, interfacesIAccessControlGrantRoleRequest);
        // TODO: test validations
    }

    /**
     * IAccessControl.hasRole
     *
     * Read &#x60;hasRole(role,account)&#x60; on an instance of &#x60;IAccessControl&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void interfacesIAccessControlHasRoleTest() throws ApiException {
        String networkId = null;
        String address = null;
        InterfacesIAccessControlGrantRoleRequest interfacesIAccessControlGrantRoleRequest = null;
        InterfacesIAccessControlHasRole200Response response = api.interfacesIAccessControlHasRole(networkId, address, interfacesIAccessControlGrantRoleRequest);
        // TODO: test validations
    }

    /**
     * IAccessControl.renounceRole
     *
     * Write &#x60;renounceRole(role,account)&#x60; on an instance of &#x60;IAccessControl&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void interfacesIAccessControlRenounceRoleTest() throws ApiException {
        String networkId = null;
        String address = null;
        InterfacesIAccessControlGrantRoleRequest interfacesIAccessControlGrantRoleRequest = null;
        InterfacesIAccessControlGrantRole200Response response = api.interfacesIAccessControlRenounceRole(networkId, address, interfacesIAccessControlGrantRoleRequest);
        // TODO: test validations
    }

    /**
     * IAccessControl.revokeRole
     *
     * Write &#x60;revokeRole(role,account)&#x60; on an instance of &#x60;IAccessControl&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void interfacesIAccessControlRevokeRoleTest() throws ApiException {
        String networkId = null;
        String address = null;
        InterfacesIAccessControlGrantRoleRequest interfacesIAccessControlGrantRoleRequest = null;
        InterfacesIAccessControlGrantRole200Response response = api.interfacesIAccessControlRevokeRole(networkId, address, interfacesIAccessControlGrantRoleRequest);
        // TODO: test validations
    }

}