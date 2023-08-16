/**
 *
 * Please note:
 * This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * Do not edit this file manually.
 *
 */

@file:Suppress(
    "ArrayInDataClass",
    "EnumEntryName",
    "RemoveRedundantQualifierName",
    "UnusedImport"
)

package org.openapitools.client.apis

import java.io.IOException
import okhttp3.OkHttpClient
import okhttp3.HttpUrl

import org.openapitools.client.models.DeployBeaconProxyDefaultResponse
import org.openapitools.client.models.InterfacesIChainlinkAnyApiConsumerFulfill200Response
import org.openapitools.client.models.InterfacesIChainlinkAnyApiConsumerFulfillRequest

import com.squareup.moshi.Json

import org.openapitools.client.infrastructure.ApiClient
import org.openapitools.client.infrastructure.ApiResponse
import org.openapitools.client.infrastructure.ClientException
import org.openapitools.client.infrastructure.ClientError
import org.openapitools.client.infrastructure.ServerException
import org.openapitools.client.infrastructure.ServerError
import org.openapitools.client.infrastructure.MultiValueMap
import org.openapitools.client.infrastructure.PartConfig
import org.openapitools.client.infrastructure.RequestConfig
import org.openapitools.client.infrastructure.RequestMethod
import org.openapitools.client.infrastructure.ResponseType
import org.openapitools.client.infrastructure.Success
import org.openapitools.client.infrastructure.toMultiValue

class IChainlinkAnyApiConsumerApi(basePath: kotlin.String = defaultBasePath, client: OkHttpClient = ApiClient.defaultClient) : ApiClient(basePath, client) {
    companion object {
        @JvmStatic
        val defaultBasePath: String by lazy {
            System.getProperties().getProperty(ApiClient.baseUrlKey, "https://17a0-195-175-28-162.ngrok-free.app/api")
        }
    }

    /**
     * IChainlinkAnyApiConsumer.fulfill
     * Write &#x60;fulfill(fulfillPrefixData,fulfillResponseData)&#x60; on an instance of &#x60;IChainlinkAnyApiConsumer&#x60;
     * @param networkId The network id (default to "80001")
     * @param address An ethereum address
     * @param interfacesIChainlinkAnyApiConsumerFulfillRequest 
     * @return InterfacesIChainlinkAnyApiConsumerFulfill200Response
     * @throws IllegalStateException If the request is not correctly configured
     * @throws IOException Rethrows the OkHttp execute method exception
     * @throws UnsupportedOperationException If the API returns an informational or redirection response
     * @throws ClientException If the API returns a client error response
     * @throws ServerException If the API returns a server error response
     */
    @Suppress("UNCHECKED_CAST")
    @Throws(IllegalStateException::class, IOException::class, UnsupportedOperationException::class, ClientException::class, ServerException::class)
    fun interfacesIChainlinkAnyApiConsumerFulfill(networkId: kotlin.String = "80001", address: kotlin.String, interfacesIChainlinkAnyApiConsumerFulfillRequest: InterfacesIChainlinkAnyApiConsumerFulfillRequest) : InterfacesIChainlinkAnyApiConsumerFulfill200Response {
        val localVarResponse = interfacesIChainlinkAnyApiConsumerFulfillWithHttpInfo(networkId = networkId, address = address, interfacesIChainlinkAnyApiConsumerFulfillRequest = interfacesIChainlinkAnyApiConsumerFulfillRequest)

        return when (localVarResponse.responseType) {
            ResponseType.Success -> (localVarResponse as Success<*>).data as InterfacesIChainlinkAnyApiConsumerFulfill200Response
            ResponseType.Informational -> throw UnsupportedOperationException("Client does not support Informational responses.")
            ResponseType.Redirection -> throw UnsupportedOperationException("Client does not support Redirection responses.")
            ResponseType.ClientError -> {
                val localVarError = localVarResponse as ClientError<*>
                throw ClientException("Client error : ${localVarError.statusCode} ${localVarError.message.orEmpty()}", localVarError.statusCode, localVarResponse)
            }
            ResponseType.ServerError -> {
                val localVarError = localVarResponse as ServerError<*>
                throw ServerException("Server error : ${localVarError.statusCode} ${localVarError.message.orEmpty()}", localVarError.statusCode, localVarResponse)
            }
        }
    }

    /**
     * IChainlinkAnyApiConsumer.fulfill
     * Write &#x60;fulfill(fulfillPrefixData,fulfillResponseData)&#x60; on an instance of &#x60;IChainlinkAnyApiConsumer&#x60;
     * @param networkId The network id (default to "80001")
     * @param address An ethereum address
     * @param interfacesIChainlinkAnyApiConsumerFulfillRequest 
     * @return ApiResponse<InterfacesIChainlinkAnyApiConsumerFulfill200Response?>
     * @throws IllegalStateException If the request is not correctly configured
     * @throws IOException Rethrows the OkHttp execute method exception
     */
    @Suppress("UNCHECKED_CAST")
    @Throws(IllegalStateException::class, IOException::class)
    fun interfacesIChainlinkAnyApiConsumerFulfillWithHttpInfo(networkId: kotlin.String, address: kotlin.String, interfacesIChainlinkAnyApiConsumerFulfillRequest: InterfacesIChainlinkAnyApiConsumerFulfillRequest) : ApiResponse<InterfacesIChainlinkAnyApiConsumerFulfill200Response?> {
        val localVariableConfig = interfacesIChainlinkAnyApiConsumerFulfillRequestConfig(networkId = networkId, address = address, interfacesIChainlinkAnyApiConsumerFulfillRequest = interfacesIChainlinkAnyApiConsumerFulfillRequest)

        return request<InterfacesIChainlinkAnyApiConsumerFulfillRequest, InterfacesIChainlinkAnyApiConsumerFulfill200Response>(
            localVariableConfig
        )
    }

    /**
     * To obtain the request config of the operation interfacesIChainlinkAnyApiConsumerFulfill
     *
     * @param networkId The network id (default to "80001")
     * @param address An ethereum address
     * @param interfacesIChainlinkAnyApiConsumerFulfillRequest 
     * @return RequestConfig
     */
    fun interfacesIChainlinkAnyApiConsumerFulfillRequestConfig(networkId: kotlin.String, address: kotlin.String, interfacesIChainlinkAnyApiConsumerFulfillRequest: InterfacesIChainlinkAnyApiConsumerFulfillRequest) : RequestConfig<InterfacesIChainlinkAnyApiConsumerFulfillRequest> {
        val localVariableBody = interfacesIChainlinkAnyApiConsumerFulfillRequest
        val localVariableQuery: MultiValueMap = mutableMapOf()
        val localVariableHeaders: MutableMap<String, String> = mutableMapOf()
        localVariableHeaders["Content-Type"] = "application/json"
        localVariableHeaders["Accept"] = "application/json"

        return RequestConfig(
            method = RequestMethod.POST,
            path = "/{networkId}/interface/IChainlinkAnyApiConsumer/write/{address}/fulfill".replace("{"+"networkId"+"}", encodeURIComponent(networkId.toString())).replace("{"+"address"+"}", encodeURIComponent(address.toString())),
            query = localVariableQuery,
            headers = localVariableHeaders,
            requiresAuthentication = true,
            body = localVariableBody
        )
    }


    private fun encodeURIComponent(uriComponent: kotlin.String): kotlin.String =
        HttpUrl.Builder().scheme("http").host("localhost").addPathSegment(uriComponent).build().encodedPathSegments[0]
}
