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
import org.openapitools.client.models.InterfacesIBeaconImplementation200Response
import org.openapitools.client.models.InterfacesIBeaconImplementationRequest
import org.openapitools.client.models.InterfacesIBeaconProxySetBeacon200Response
import org.openapitools.client.models.InterfacesIBeaconProxySetBeaconRequest

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

class IBeaconProxyApi(basePath: kotlin.String = defaultBasePath, client: OkHttpClient = ApiClient.defaultClient) : ApiClient(basePath, client) {
    companion object {
        @JvmStatic
        val defaultBasePath: String by lazy {
            System.getProperties().getProperty(ApiClient.baseUrlKey, "https://17a0-195-175-28-162.ngrok-free.app/api")
        }
    }

    /**
     * IBeaconProxy.beacon
     * Read &#x60;beacon()&#x60; on an instance of &#x60;IBeaconProxy&#x60;
     * @param networkId The network id (default to "80001")
     * @param address An ethereum address
     * @param interfacesIBeaconImplementationRequest 
     * @return InterfacesIBeaconImplementation200Response
     * @throws IllegalStateException If the request is not correctly configured
     * @throws IOException Rethrows the OkHttp execute method exception
     * @throws UnsupportedOperationException If the API returns an informational or redirection response
     * @throws ClientException If the API returns a client error response
     * @throws ServerException If the API returns a server error response
     */
    @Suppress("UNCHECKED_CAST")
    @Throws(IllegalStateException::class, IOException::class, UnsupportedOperationException::class, ClientException::class, ServerException::class)
    fun interfacesIBeaconProxyBeacon(networkId: kotlin.String = "80001", address: kotlin.String, interfacesIBeaconImplementationRequest: InterfacesIBeaconImplementationRequest) : InterfacesIBeaconImplementation200Response {
        val localVarResponse = interfacesIBeaconProxyBeaconWithHttpInfo(networkId = networkId, address = address, interfacesIBeaconImplementationRequest = interfacesIBeaconImplementationRequest)

        return when (localVarResponse.responseType) {
            ResponseType.Success -> (localVarResponse as Success<*>).data as InterfacesIBeaconImplementation200Response
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
     * IBeaconProxy.beacon
     * Read &#x60;beacon()&#x60; on an instance of &#x60;IBeaconProxy&#x60;
     * @param networkId The network id (default to "80001")
     * @param address An ethereum address
     * @param interfacesIBeaconImplementationRequest 
     * @return ApiResponse<InterfacesIBeaconImplementation200Response?>
     * @throws IllegalStateException If the request is not correctly configured
     * @throws IOException Rethrows the OkHttp execute method exception
     */
    @Suppress("UNCHECKED_CAST")
    @Throws(IllegalStateException::class, IOException::class)
    fun interfacesIBeaconProxyBeaconWithHttpInfo(networkId: kotlin.String, address: kotlin.String, interfacesIBeaconImplementationRequest: InterfacesIBeaconImplementationRequest) : ApiResponse<InterfacesIBeaconImplementation200Response?> {
        val localVariableConfig = interfacesIBeaconProxyBeaconRequestConfig(networkId = networkId, address = address, interfacesIBeaconImplementationRequest = interfacesIBeaconImplementationRequest)

        return request<InterfacesIBeaconImplementationRequest, InterfacesIBeaconImplementation200Response>(
            localVariableConfig
        )
    }

    /**
     * To obtain the request config of the operation interfacesIBeaconProxyBeacon
     *
     * @param networkId The network id (default to "80001")
     * @param address An ethereum address
     * @param interfacesIBeaconImplementationRequest 
     * @return RequestConfig
     */
    fun interfacesIBeaconProxyBeaconRequestConfig(networkId: kotlin.String, address: kotlin.String, interfacesIBeaconImplementationRequest: InterfacesIBeaconImplementationRequest) : RequestConfig<InterfacesIBeaconImplementationRequest> {
        val localVariableBody = interfacesIBeaconImplementationRequest
        val localVariableQuery: MultiValueMap = mutableMapOf()
        val localVariableHeaders: MutableMap<String, String> = mutableMapOf()
        localVariableHeaders["Content-Type"] = "application/json"
        localVariableHeaders["Accept"] = "application/json"

        return RequestConfig(
            method = RequestMethod.POST,
            path = "/{networkId}/interface/IBeaconProxy/read/{address}/beacon".replace("{"+"networkId"+"}", encodeURIComponent(networkId.toString())).replace("{"+"address"+"}", encodeURIComponent(address.toString())),
            query = localVariableQuery,
            headers = localVariableHeaders,
            requiresAuthentication = true,
            body = localVariableBody
        )
    }

    /**
     * IBeaconProxy.setBeacon
     * Write &#x60;setBeacon(_beaconAddress,data)&#x60; on an instance of &#x60;IBeaconProxy&#x60;
     * @param networkId The network id (default to "80001")
     * @param address An ethereum address
     * @param interfacesIBeaconProxySetBeaconRequest 
     * @return InterfacesIBeaconProxySetBeacon200Response
     * @throws IllegalStateException If the request is not correctly configured
     * @throws IOException Rethrows the OkHttp execute method exception
     * @throws UnsupportedOperationException If the API returns an informational or redirection response
     * @throws ClientException If the API returns a client error response
     * @throws ServerException If the API returns a server error response
     */
    @Suppress("UNCHECKED_CAST")
    @Throws(IllegalStateException::class, IOException::class, UnsupportedOperationException::class, ClientException::class, ServerException::class)
    fun interfacesIBeaconProxySetBeacon(networkId: kotlin.String = "80001", address: kotlin.String, interfacesIBeaconProxySetBeaconRequest: InterfacesIBeaconProxySetBeaconRequest) : InterfacesIBeaconProxySetBeacon200Response {
        val localVarResponse = interfacesIBeaconProxySetBeaconWithHttpInfo(networkId = networkId, address = address, interfacesIBeaconProxySetBeaconRequest = interfacesIBeaconProxySetBeaconRequest)

        return when (localVarResponse.responseType) {
            ResponseType.Success -> (localVarResponse as Success<*>).data as InterfacesIBeaconProxySetBeacon200Response
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
     * IBeaconProxy.setBeacon
     * Write &#x60;setBeacon(_beaconAddress,data)&#x60; on an instance of &#x60;IBeaconProxy&#x60;
     * @param networkId The network id (default to "80001")
     * @param address An ethereum address
     * @param interfacesIBeaconProxySetBeaconRequest 
     * @return ApiResponse<InterfacesIBeaconProxySetBeacon200Response?>
     * @throws IllegalStateException If the request is not correctly configured
     * @throws IOException Rethrows the OkHttp execute method exception
     */
    @Suppress("UNCHECKED_CAST")
    @Throws(IllegalStateException::class, IOException::class)
    fun interfacesIBeaconProxySetBeaconWithHttpInfo(networkId: kotlin.String, address: kotlin.String, interfacesIBeaconProxySetBeaconRequest: InterfacesIBeaconProxySetBeaconRequest) : ApiResponse<InterfacesIBeaconProxySetBeacon200Response?> {
        val localVariableConfig = interfacesIBeaconProxySetBeaconRequestConfig(networkId = networkId, address = address, interfacesIBeaconProxySetBeaconRequest = interfacesIBeaconProxySetBeaconRequest)

        return request<InterfacesIBeaconProxySetBeaconRequest, InterfacesIBeaconProxySetBeacon200Response>(
            localVariableConfig
        )
    }

    /**
     * To obtain the request config of the operation interfacesIBeaconProxySetBeacon
     *
     * @param networkId The network id (default to "80001")
     * @param address An ethereum address
     * @param interfacesIBeaconProxySetBeaconRequest 
     * @return RequestConfig
     */
    fun interfacesIBeaconProxySetBeaconRequestConfig(networkId: kotlin.String, address: kotlin.String, interfacesIBeaconProxySetBeaconRequest: InterfacesIBeaconProxySetBeaconRequest) : RequestConfig<InterfacesIBeaconProxySetBeaconRequest> {
        val localVariableBody = interfacesIBeaconProxySetBeaconRequest
        val localVariableQuery: MultiValueMap = mutableMapOf()
        val localVariableHeaders: MutableMap<String, String> = mutableMapOf()
        localVariableHeaders["Content-Type"] = "application/json"
        localVariableHeaders["Accept"] = "application/json"

        return RequestConfig(
            method = RequestMethod.POST,
            path = "/{networkId}/interface/IBeaconProxy/write/{address}/setBeacon".replace("{"+"networkId"+"}", encodeURIComponent(networkId.toString())).replace("{"+"address"+"}", encodeURIComponent(address.toString())),
            query = localVariableQuery,
            headers = localVariableHeaders,
            requiresAuthentication = true,
            body = localVariableBody
        )
    }


    private fun encodeURIComponent(uriComponent: kotlin.String): kotlin.String =
        HttpUrl.Builder().scheme("http").host("localhost").addPathSegment(uriComponent).build().encodedPathSegments[0]
}