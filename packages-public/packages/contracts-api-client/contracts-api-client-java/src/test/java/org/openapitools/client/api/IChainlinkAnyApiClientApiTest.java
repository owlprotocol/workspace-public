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
import org.openapitools.client.model.InterfacesIBeaconImplementationRequest;
import org.openapitools.client.model.InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE200Response;
import org.openapitools.client.model.InterfacesIChainlinkAnyApiClientFulfill200Response;
import org.openapitools.client.model.InterfacesIChainlinkAnyApiClientFulfillRequest;
import org.openapitools.client.model.InterfacesIChainlinkAnyApiClientRequest200Response;
import org.openapitools.client.model.InterfacesIChainlinkAnyApiClientRequestRequest;
import org.openapitools.client.model.InterfacesIChainlinkAnyApiClientRequests200Response;
import org.openapitools.client.model.InterfacesIChainlinkAnyApiClientRequestsRequest;
import org.openapitools.client.model.InterfacesIContractURIContractURI200Response;
import org.openapitools.client.model.InterfacesIContractURISetContractURI200Response;
import org.openapitools.client.model.InterfacesIContractURISetContractURIRequest;
import org.openapitools.client.model.InterfacesIERC165SupportsInterface200Response;
import org.openapitools.client.model.InterfacesIERC165SupportsInterfaceRequest;
import org.openapitools.client.model.InterfacesIERC20Transfer200Response;
import org.openapitools.client.model.InterfacesIERC20TransferRequest;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * API tests for IChainlinkAnyApiClientApi
 */
@Disabled
public class IChainlinkAnyApiClientApiTest {

    private final IChainlinkAnyApiClientApi api = new IChainlinkAnyApiClientApi();

    /**
     * IChainlinkAnyApiClient.contractURI
     *
     * Read &#x60;contractURI()&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void interfacesIChainlinkAnyApiClientContractURITest() throws ApiException {
        String networkId = null;
        String address = null;
        InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest = null;
        InterfacesIContractURIContractURI200Response response = api.interfacesIChainlinkAnyApiClientContractURI(networkId, address, interfacesIBeaconImplementationRequest);
        // TODO: test validations
    }

    /**
     * IChainlinkAnyApiClient.DEFAULT_ADMIN_ROLE
     *
     * Read &#x60;DEFAULT_ADMIN_ROLE()&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void interfacesIChainlinkAnyApiClientDEFAULTADMINROLETest() throws ApiException {
        String networkId = null;
        String address = null;
        InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest = null;
        InterfacesIChainlinkAnyApiClientDEFAULTADMINROLE200Response response = api.interfacesIChainlinkAnyApiClientDEFAULTADMINROLE(networkId, address, interfacesIBeaconImplementationRequest);
        // TODO: test validations
    }

    /**
     * IChainlinkAnyApiClient.fulfill
     *
     * Write &#x60;fulfill(reqId,reqResponseData)&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void interfacesIChainlinkAnyApiClientFulfillTest() throws ApiException {
        String networkId = null;
        String address = null;
        InterfacesIChainlinkAnyApiClientFulfillRequest interfacesIChainlinkAnyApiClientFulfillRequest = null;
        InterfacesIChainlinkAnyApiClientFulfill200Response response = api.interfacesIChainlinkAnyApiClientFulfill(networkId, address, interfacesIChainlinkAnyApiClientFulfillRequest);
        // TODO: test validations
    }

    /**
     * IChainlinkAnyApiClient.getRoleAdmin
     *
     * Read &#x60;getRoleAdmin(role)&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void interfacesIChainlinkAnyApiClientGetRoleAdminTest() throws ApiException {
        String networkId = null;
        String address = null;
        InterfacesIAccessControlGetRoleAdminRequest interfacesIAccessControlGetRoleAdminRequest = null;
        InterfacesIAccessControlGetRoleAdmin200Response response = api.interfacesIChainlinkAnyApiClientGetRoleAdmin(networkId, address, interfacesIAccessControlGetRoleAdminRequest);
        // TODO: test validations
    }

    /**
     * IChainlinkAnyApiClient.grantRole
     *
     * Write &#x60;grantRole(role,account)&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void interfacesIChainlinkAnyApiClientGrantRoleTest() throws ApiException {
        String networkId = null;
        String address = null;
        InterfacesIAccessControlGrantRoleRequest interfacesIAccessControlGrantRoleRequest = null;
        InterfacesIAccessControlGrantRole200Response response = api.interfacesIChainlinkAnyApiClientGrantRole(networkId, address, interfacesIAccessControlGrantRoleRequest);
        // TODO: test validations
    }

    /**
     * IChainlinkAnyApiClient.hasRole
     *
     * Read &#x60;hasRole(role,account)&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void interfacesIChainlinkAnyApiClientHasRoleTest() throws ApiException {
        String networkId = null;
        String address = null;
        InterfacesIAccessControlGrantRoleRequest interfacesIAccessControlGrantRoleRequest = null;
        InterfacesIAccessControlHasRole200Response response = api.interfacesIChainlinkAnyApiClientHasRole(networkId, address, interfacesIAccessControlGrantRoleRequest);
        // TODO: test validations
    }

    /**
     * IChainlinkAnyApiClient.renounceRole
     *
     * Write &#x60;renounceRole(role,account)&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void interfacesIChainlinkAnyApiClientRenounceRoleTest() throws ApiException {
        String networkId = null;
        String address = null;
        InterfacesIAccessControlGrantRoleRequest interfacesIAccessControlGrantRoleRequest = null;
        InterfacesIAccessControlGrantRole200Response response = api.interfacesIChainlinkAnyApiClientRenounceRole(networkId, address, interfacesIAccessControlGrantRoleRequest);
        // TODO: test validations
    }

    /**
     * IChainlinkAnyApiClient.request
     *
     * Write &#x60;request(fulfillAddress,fulfillPrefixData,reqJobId,reqUrl,reqPath,reqFee)&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void interfacesIChainlinkAnyApiClientRequestTest() throws ApiException {
        String networkId = null;
        String address = null;
        InterfacesIChainlinkAnyApiClientRequestRequest interfacesIChainlinkAnyApiClientRequestRequest = null;
        InterfacesIChainlinkAnyApiClientRequest200Response response = api.interfacesIChainlinkAnyApiClientRequest(networkId, address, interfacesIChainlinkAnyApiClientRequestRequest);
        // TODO: test validations
    }

    /**
     * IChainlinkAnyApiClient.requests
     *
     * Read &#x60;requests()&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void interfacesIChainlinkAnyApiClientRequestsTest() throws ApiException {
        String networkId = null;
        String address = null;
        InterfacesIChainlinkAnyApiClientRequestsRequest interfacesIChainlinkAnyApiClientRequestsRequest = null;
        InterfacesIChainlinkAnyApiClientRequests200Response response = api.interfacesIChainlinkAnyApiClientRequests(networkId, address, interfacesIChainlinkAnyApiClientRequestsRequest);
        // TODO: test validations
    }

    /**
     * IChainlinkAnyApiClient.revokeRole
     *
     * Write &#x60;revokeRole(role,account)&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void interfacesIChainlinkAnyApiClientRevokeRoleTest() throws ApiException {
        String networkId = null;
        String address = null;
        InterfacesIAccessControlGrantRoleRequest interfacesIAccessControlGrantRoleRequest = null;
        InterfacesIAccessControlGrantRole200Response response = api.interfacesIChainlinkAnyApiClientRevokeRole(networkId, address, interfacesIAccessControlGrantRoleRequest);
        // TODO: test validations
    }

    /**
     * IChainlinkAnyApiClient.setContractURI
     *
     * Write &#x60;setContractURI(uri)&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void interfacesIChainlinkAnyApiClientSetContractURITest() throws ApiException {
        String networkId = null;
        String address = null;
        InterfacesIContractURISetContractURIRequest interfacesIContractURISetContractURIRequest = null;
        InterfacesIContractURISetContractURI200Response response = api.interfacesIChainlinkAnyApiClientSetContractURI(networkId, address, interfacesIContractURISetContractURIRequest);
        // TODO: test validations
    }

    /**
     * IChainlinkAnyApiClient.supportsInterface
     *
     * Read &#x60;supportsInterface(interfaceId)&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void interfacesIChainlinkAnyApiClientSupportsInterfaceTest() throws ApiException {
        String networkId = null;
        String address = null;
        InterfacesIERC165SupportsInterfaceRequest interfacesIERC165SupportsInterfaceRequest = null;
        InterfacesIERC165SupportsInterface200Response response = api.interfacesIChainlinkAnyApiClientSupportsInterface(networkId, address, interfacesIERC165SupportsInterfaceRequest);
        // TODO: test validations
    }

    /**
     * IChainlinkAnyApiClient.version
     *
     * Read &#x60;version()&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void interfacesIChainlinkAnyApiClientVersionTest() throws ApiException {
        String networkId = null;
        String address = null;
        InterfacesIBeaconImplementationRequest interfacesIBeaconImplementationRequest = null;
        InterfacesIContractURIContractURI200Response response = api.interfacesIChainlinkAnyApiClientVersion(networkId, address, interfacesIBeaconImplementationRequest);
        // TODO: test validations
    }

    /**
     * IChainlinkAnyApiClient.withdrawLink
     *
     * Write &#x60;withdrawLink(to,amount)&#x60; on an instance of &#x60;IChainlinkAnyApiClient&#x60;
     *
     * @throws ApiException if the Api call fails
     */
    @Test
    public void interfacesIChainlinkAnyApiClientWithdrawLinkTest() throws ApiException {
        String networkId = null;
        String address = null;
        InterfacesIERC20TransferRequest interfacesIERC20TransferRequest = null;
        InterfacesIERC20Transfer200Response response = api.interfacesIChainlinkAnyApiClientWithdrawLink(networkId, address, interfacesIERC20TransferRequest);
        // TODO: test validations
    }

}