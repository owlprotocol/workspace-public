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

import org.openapitools.client.ApiCallback;
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.ApiResponse;
import org.openapitools.client.Configuration;
import org.openapitools.client.Pair;
import org.openapitools.client.ProgressRequestBody;
import org.openapitools.client.ProgressResponseBody;

import com.google.gson.reflect.TypeToken;

import java.io.IOException;


import org.openapitools.client.model.DeployBeaconProxyDefaultResponse;
import org.openapitools.client.model.InterfacesIERC721GetApprovedRequest;
import org.openapitools.client.model.InterfacesIERC721MetadataTokenURI200Response;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.ws.rs.core.GenericType;

public class ITokenUriApi {
    private ApiClient localVarApiClient;
    private int localHostIndex;
    private String localCustomBaseUrl;

    public ITokenUriApi() {
        this(Configuration.getDefaultApiClient());
    }

    public ITokenUriApi(ApiClient apiClient) {
        this.localVarApiClient = apiClient;
    }

    public ApiClient getApiClient() {
        return localVarApiClient;
    }

    public void setApiClient(ApiClient apiClient) {
        this.localVarApiClient = apiClient;
    }

    public int getHostIndex() {
        return localHostIndex;
    }

    public void setHostIndex(int hostIndex) {
        this.localHostIndex = hostIndex;
    }

    public String getCustomBaseUrl() {
        return localCustomBaseUrl;
    }

    public void setCustomBaseUrl(String customBaseUrl) {
        this.localCustomBaseUrl = customBaseUrl;
    }

    /**
     * Build call for interfacesITokenURITokenURI
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesIERC721GetApprovedRequest  (required)
     * @param _callback Callback for upload/download progress
     * @return Call to execute
     * @throws ApiException If fail to serialize the request body object
     * @http.response.details
     <table summary="Response Details" border="1">
        <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
        <tr><td> 200 </td><td> Successful response </td><td>  -  </td></tr>
        <tr><td> 0 </td><td> Error response </td><td>  -  </td></tr>
     </table>
     */
    public okhttp3.Call interfacesITokenURITokenURICall(String networkId, String address, InterfacesIERC721GetApprovedRequest interfacesIERC721GetApprovedRequest, final ApiCallback _callback) throws ApiException {
        String basePath = null;
        // Operation Servers
        String[] localBasePaths = new String[] {  };

        // Determine Base Path to Use
        if (localCustomBaseUrl != null){
            basePath = localCustomBaseUrl;
        } else if ( localBasePaths.length > 0 ) {
            basePath = localBasePaths[localHostIndex];
        } else {
            basePath = null;
        }

        Object localVarPostBody = interfacesIERC721GetApprovedRequest;

        // create path and map variables
        String localVarPath = "/{networkId}/interface/ITokenURI/read/{address}/tokenURI"
            .replace("{" + "networkId" + "}", localVarApiClient.escapeString(networkId.toString()))
            .replace("{" + "address" + "}", localVarApiClient.escapeString(address.toString()));

        List<Pair> localVarQueryParams = new ArrayList<Pair>();
        List<Pair> localVarCollectionQueryParams = new ArrayList<Pair>();
        Map<String, String> localVarHeaderParams = new HashMap<String, String>();
        Map<String, String> localVarCookieParams = new HashMap<String, String>();
        Map<String, Object> localVarFormParams = new HashMap<String, Object>();

        final String[] localVarAccepts = {
            "application/json"
        };
        final String localVarAccept = localVarApiClient.selectHeaderAccept(localVarAccepts);
        if (localVarAccept != null) {
            localVarHeaderParams.put("Accept", localVarAccept);
        }

        final String[] localVarContentTypes = {
            "application/json"
        };
        final String localVarContentType = localVarApiClient.selectHeaderContentType(localVarContentTypes);
        if (localVarContentType != null) {
            localVarHeaderParams.put("Content-Type", localVarContentType);
        }

        String[] localVarAuthNames = new String[] { "Authorization" };
        return localVarApiClient.buildCall(basePath, localVarPath, "POST", localVarQueryParams, localVarCollectionQueryParams, localVarPostBody, localVarHeaderParams, localVarCookieParams, localVarFormParams, localVarAuthNames, _callback);
    }

    @SuppressWarnings("rawtypes")
    private okhttp3.Call interfacesITokenURITokenURIValidateBeforeCall(String networkId, String address, InterfacesIERC721GetApprovedRequest interfacesIERC721GetApprovedRequest, final ApiCallback _callback) throws ApiException {
        // verify the required parameter 'networkId' is set
        if (networkId == null) {
            throw new ApiException("Missing the required parameter 'networkId' when calling interfacesITokenURITokenURI(Async)");
        }

        // verify the required parameter 'address' is set
        if (address == null) {
            throw new ApiException("Missing the required parameter 'address' when calling interfacesITokenURITokenURI(Async)");
        }

        // verify the required parameter 'interfacesIERC721GetApprovedRequest' is set
        if (interfacesIERC721GetApprovedRequest == null) {
            throw new ApiException("Missing the required parameter 'interfacesIERC721GetApprovedRequest' when calling interfacesITokenURITokenURI(Async)");
        }

        return interfacesITokenURITokenURICall(networkId, address, interfacesIERC721GetApprovedRequest, _callback);

    }

    /**
     * ITokenURI.tokenURI
     * Read &#x60;tokenURI(tokenId)&#x60; on an instance of &#x60;ITokenURI&#x60;
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesIERC721GetApprovedRequest  (required)
     * @return InterfacesIERC721MetadataTokenURI200Response
     * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the response body
     * @http.response.details
     <table summary="Response Details" border="1">
        <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
        <tr><td> 200 </td><td> Successful response </td><td>  -  </td></tr>
        <tr><td> 0 </td><td> Error response </td><td>  -  </td></tr>
     </table>
     */
    public InterfacesIERC721MetadataTokenURI200Response interfacesITokenURITokenURI(String networkId, String address, InterfacesIERC721GetApprovedRequest interfacesIERC721GetApprovedRequest) throws ApiException {
        ApiResponse<InterfacesIERC721MetadataTokenURI200Response> localVarResp = interfacesITokenURITokenURIWithHttpInfo(networkId, address, interfacesIERC721GetApprovedRequest);
        return localVarResp.getData();
    }

    /**
     * ITokenURI.tokenURI
     * Read &#x60;tokenURI(tokenId)&#x60; on an instance of &#x60;ITokenURI&#x60;
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesIERC721GetApprovedRequest  (required)
     * @return ApiResponse&lt;InterfacesIERC721MetadataTokenURI200Response&gt;
     * @throws ApiException If fail to call the API, e.g. server error or cannot deserialize the response body
     * @http.response.details
     <table summary="Response Details" border="1">
        <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
        <tr><td> 200 </td><td> Successful response </td><td>  -  </td></tr>
        <tr><td> 0 </td><td> Error response </td><td>  -  </td></tr>
     </table>
     */
    public ApiResponse<InterfacesIERC721MetadataTokenURI200Response> interfacesITokenURITokenURIWithHttpInfo(String networkId, String address, InterfacesIERC721GetApprovedRequest interfacesIERC721GetApprovedRequest) throws ApiException {
        okhttp3.Call localVarCall = interfacesITokenURITokenURIValidateBeforeCall(networkId, address, interfacesIERC721GetApprovedRequest, null);
        Type localVarReturnType = new TypeToken<InterfacesIERC721MetadataTokenURI200Response>(){}.getType();
        return localVarApiClient.execute(localVarCall, localVarReturnType);
    }

    /**
     * ITokenURI.tokenURI (asynchronously)
     * Read &#x60;tokenURI(tokenId)&#x60; on an instance of &#x60;ITokenURI&#x60;
     * @param networkId The network id (required)
     * @param address An ethereum address (required)
     * @param interfacesIERC721GetApprovedRequest  (required)
     * @param _callback The callback to be executed when the API call finishes
     * @return The request call
     * @throws ApiException If fail to process the API call, e.g. serializing the request body object
     * @http.response.details
     <table summary="Response Details" border="1">
        <tr><td> Status Code </td><td> Description </td><td> Response Headers </td></tr>
        <tr><td> 200 </td><td> Successful response </td><td>  -  </td></tr>
        <tr><td> 0 </td><td> Error response </td><td>  -  </td></tr>
     </table>
     */
    public okhttp3.Call interfacesITokenURITokenURIAsync(String networkId, String address, InterfacesIERC721GetApprovedRequest interfacesIERC721GetApprovedRequest, final ApiCallback<InterfacesIERC721MetadataTokenURI200Response> _callback) throws ApiException {

        okhttp3.Call localVarCall = interfacesITokenURITokenURIValidateBeforeCall(networkId, address, interfacesIERC721GetApprovedRequest, _callback);
        Type localVarReturnType = new TypeToken<InterfacesIERC721MetadataTokenURI200Response>(){}.getType();
        localVarApiClient.executeAsync(localVarCall, localVarReturnType, _callback);
        return localVarCall;
    }
}