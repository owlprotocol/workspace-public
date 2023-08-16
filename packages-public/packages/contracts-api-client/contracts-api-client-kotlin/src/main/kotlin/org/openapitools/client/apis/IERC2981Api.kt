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
import org.openapitools.client.models.InterfacesIERC165SupportsInterface200Response
import org.openapitools.client.models.InterfacesIERC165SupportsInterfaceRequest
import org.openapitools.client.models.InterfacesIERC2981RoyaltyInfo200Response
import org.openapitools.client.models.InterfacesIERC2981RoyaltyInfoRequest

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

class IERC2981Api(basePath: kotlin.String = defaultBasePath, client: OkHttpClient = ApiClient.defaultClient) : ApiClient(basePath, client) {
    companion object {
        @JvmStatic
        val defaultBasePath: String by lazy {
            System.getProperties().getProperty(ApiClient.baseUrlKey, "https://17a0-195-175-28-162.ngrok-free.app/api")
        }
    }

    /**
     * IERC2981.royaltyInfo
     * Read &#x60;royaltyInfo(tokenId,salePrice)&#x60; on an instance of &#x60;IERC2981&#x60;
     * @param networkId The network id (default to "80001")
     * @param address An ethereum address
     * @param interfacesIERC2981RoyaltyInfoRequest 
     * @return InterfacesIERC2981RoyaltyInfo200Response
     * @throws IllegalStateException If the request is not correctly configured
     * @throws IOException Rethrows the OkHttp execute method exception
     * @throws UnsupportedOperationException If the API returns an informational or redirection response
     * @throws ClientException If the API returns a client error response
     * @throws ServerException If the API returns a server error response
     */
    @Suppress("UNCHECKED_CAST")
    @Throws(IllegalStateException::class, IOException::class, UnsupportedOperationException::class, ClientException::class, ServerException::class)
    fun interfacesIERC2981RoyaltyInfo(networkId: kotlin.String = "80001", address: kotlin.String, interfacesIERC2981RoyaltyInfoRequest: InterfacesIERC2981RoyaltyInfoRequest) : InterfacesIERC2981RoyaltyInfo200Response {
        val localVarResponse = interfacesIERC2981RoyaltyInfoWithHttpInfo(networkId = networkId, address = address, interfacesIERC2981RoyaltyInfoRequest = interfacesIERC2981RoyaltyInfoRequest)

        return when (localVarResponse.responseType) {
            ResponseType.Success -> (localVarResponse as Success<*>).data as InterfacesIERC2981RoyaltyInfo200Response
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
     * IERC2981.royaltyInfo
     * Read &#x60;royaltyInfo(tokenId,salePrice)&#x60; on an instance of &#x60;IERC2981&#x60;
     * @param networkId The network id (default to "80001")
     * @param address An ethereum address
     * @param interfacesIERC2981RoyaltyInfoRequest 
     * @return ApiResponse<InterfacesIERC2981RoyaltyInfo200Response?>
     * @throws IllegalStateException If the request is not correctly configured
     * @throws IOException Rethrows the OkHttp execute method exception
     */
    @Suppress("UNCHECKED_CAST")
    @Throws(IllegalStateException::class, IOException::class)
    fun interfacesIERC2981RoyaltyInfoWithHttpInfo(networkId: kotlin.String, address: kotlin.String, interfacesIERC2981RoyaltyInfoRequest: InterfacesIERC2981RoyaltyInfoRequest) : ApiResponse<InterfacesIERC2981RoyaltyInfo200Response?> {
        val localVariableConfig = interfacesIERC2981RoyaltyInfoRequestConfig(networkId = networkId, address = address, interfacesIERC2981RoyaltyInfoRequest = interfacesIERC2981RoyaltyInfoRequest)

        return request<InterfacesIERC2981RoyaltyInfoRequest, InterfacesIERC2981RoyaltyInfo200Response>(
            localVariableConfig
        )
    }

    /**
     * To obtain the request config of the operation interfacesIERC2981RoyaltyInfo
     *
     * @param networkId The network id (default to "80001")
     * @param address An ethereum address
     * @param interfacesIERC2981RoyaltyInfoRequest 
     * @return RequestConfig
     */
    fun interfacesIERC2981RoyaltyInfoRequestConfig(networkId: kotlin.String, address: kotlin.String, interfacesIERC2981RoyaltyInfoRequest: InterfacesIERC2981RoyaltyInfoRequest) : RequestConfig<InterfacesIERC2981RoyaltyInfoRequest> {
        val localVariableBody = interfacesIERC2981RoyaltyInfoRequest
        val localVariableQuery: MultiValueMap = mutableMapOf()
        val localVariableHeaders: MutableMap<String, String> = mutableMapOf()
        localVariableHeaders["Content-Type"] = "application/json"
        localVariableHeaders["Accept"] = "application/json"

        return RequestConfig(
            method = RequestMethod.POST,
            path = "/{networkId}/interface/IERC2981/read/{address}/royaltyInfo".replace("{"+"networkId"+"}", encodeURIComponent(networkId.toString())).replace("{"+"address"+"}", encodeURIComponent(address.toString())),
            query = localVariableQuery,
            headers = localVariableHeaders,
            requiresAuthentication = true,
            body = localVariableBody
        )
    }

    /**
     * IERC2981.supportsInterface
     * Read &#x60;supportsInterface(interfaceId)&#x60; on an instance of &#x60;IERC2981&#x60;
     * @param networkId The network id (default to "80001")
     * @param address An ethereum address
     * @param interfacesIERC165SupportsInterfaceRequest 
     * @return InterfacesIERC165SupportsInterface200Response
     * @throws IllegalStateException If the request is not correctly configured
     * @throws IOException Rethrows the OkHttp execute method exception
     * @throws UnsupportedOperationException If the API returns an informational or redirection response
     * @throws ClientException If the API returns a client error response
     * @throws ServerException If the API returns a server error response
     */
    @Suppress("UNCHECKED_CAST")
    @Throws(IllegalStateException::class, IOException::class, UnsupportedOperationException::class, ClientException::class, ServerException::class)
    fun interfacesIERC2981SupportsInterface(networkId: kotlin.String = "80001", address: kotlin.String, interfacesIERC165SupportsInterfaceRequest: InterfacesIERC165SupportsInterfaceRequest) : InterfacesIERC165SupportsInterface200Response {
        val localVarResponse = interfacesIERC2981SupportsInterfaceWithHttpInfo(networkId = networkId, address = address, interfacesIERC165SupportsInterfaceRequest = interfacesIERC165SupportsInterfaceRequest)

        return when (localVarResponse.responseType) {
            ResponseType.Success -> (localVarResponse as Success<*>).data as InterfacesIERC165SupportsInterface200Response
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
     * IERC2981.supportsInterface
     * Read &#x60;supportsInterface(interfaceId)&#x60; on an instance of &#x60;IERC2981&#x60;
     * @param networkId The network id (default to "80001")
     * @param address An ethereum address
     * @param interfacesIERC165SupportsInterfaceRequest 
     * @return ApiResponse<InterfacesIERC165SupportsInterface200Response?>
     * @throws IllegalStateException If the request is not correctly configured
     * @throws IOException Rethrows the OkHttp execute method exception
     */
    @Suppress("UNCHECKED_CAST")
    @Throws(IllegalStateException::class, IOException::class)
    fun interfacesIERC2981SupportsInterfaceWithHttpInfo(networkId: kotlin.String, address: kotlin.String, interfacesIERC165SupportsInterfaceRequest: InterfacesIERC165SupportsInterfaceRequest) : ApiResponse<InterfacesIERC165SupportsInterface200Response?> {
        val localVariableConfig = interfacesIERC2981SupportsInterfaceRequestConfig(networkId = networkId, address = address, interfacesIERC165SupportsInterfaceRequest = interfacesIERC165SupportsInterfaceRequest)

        return request<InterfacesIERC165SupportsInterfaceRequest, InterfacesIERC165SupportsInterface200Response>(
            localVariableConfig
        )
    }

    /**
     * To obtain the request config of the operation interfacesIERC2981SupportsInterface
     *
     * @param networkId The network id (default to "80001")
     * @param address An ethereum address
     * @param interfacesIERC165SupportsInterfaceRequest 
     * @return RequestConfig
     */
    fun interfacesIERC2981SupportsInterfaceRequestConfig(networkId: kotlin.String, address: kotlin.String, interfacesIERC165SupportsInterfaceRequest: InterfacesIERC165SupportsInterfaceRequest) : RequestConfig<InterfacesIERC165SupportsInterfaceRequest> {
        val localVariableBody = interfacesIERC165SupportsInterfaceRequest
        val localVariableQuery: MultiValueMap = mutableMapOf()
        val localVariableHeaders: MutableMap<String, String> = mutableMapOf()
        localVariableHeaders["Content-Type"] = "application/json"
        localVariableHeaders["Accept"] = "application/json"

        return RequestConfig(
            method = RequestMethod.POST,
            path = "/{networkId}/interface/IERC2981/read/{address}/supportsInterface".replace("{"+"networkId"+"}", encodeURIComponent(networkId.toString())).replace("{"+"address"+"}", encodeURIComponent(address.toString())),
            query = localVariableQuery,
            headers = localVariableHeaders,
            requiresAuthentication = true,
            body = localVariableBody
        )
    }


    private fun encodeURIComponent(uriComponent: kotlin.String): kotlin.String =
        HttpUrl.Builder().scheme("http").host("localhost").addPathSegment(uriComponent).build().encodedPathSegments[0]
}
