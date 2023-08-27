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
import org.openapitools.client.models.InterfacesIAccessControlGetRoleAdmin200Response
import org.openapitools.client.models.InterfacesIAccessControlGetRoleAdminRequest
import org.openapitools.client.models.InterfacesIAccessControlGrantRole200Response
import org.openapitools.client.models.InterfacesIAccessControlGrantRoleRequest
import org.openapitools.client.models.InterfacesIAccessControlHasRole200Response

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

class IAccessControlApi(basePath: kotlin.String = defaultBasePath, client: OkHttpClient = ApiClient.defaultClient) : ApiClient(basePath, client) {
    companion object {
        @JvmStatic
        val defaultBasePath: String by lazy {
            System.getProperties().getProperty(ApiClient.baseUrlKey, "https://17a0-195-175-28-162.ngrok-free.app/api")
        }
    }

    /**
     * IAccessControl.getRoleAdmin
     * Read &#x60;getRoleAdmin(role)&#x60; on an instance of &#x60;IAccessControl&#x60;
     * @param networkId The network id (default to "80001")
     * @param address An ethereum address
     * @param interfacesIAccessControlGetRoleAdminRequest 
     * @return InterfacesIAccessControlGetRoleAdmin200Response
     * @throws IllegalStateException If the request is not correctly configured
     * @throws IOException Rethrows the OkHttp execute method exception
     * @throws UnsupportedOperationException If the API returns an informational or redirection response
     * @throws ClientException If the API returns a client error response
     * @throws ServerException If the API returns a server error response
     */
    @Suppress("UNCHECKED_CAST")
    @Throws(IllegalStateException::class, IOException::class, UnsupportedOperationException::class, ClientException::class, ServerException::class)
    fun interfacesIAccessControlGetRoleAdmin(networkId: kotlin.String = "80001", address: kotlin.String, interfacesIAccessControlGetRoleAdminRequest: InterfacesIAccessControlGetRoleAdminRequest) : InterfacesIAccessControlGetRoleAdmin200Response {
        val localVarResponse = interfacesIAccessControlGetRoleAdminWithHttpInfo(networkId = networkId, address = address, interfacesIAccessControlGetRoleAdminRequest = interfacesIAccessControlGetRoleAdminRequest)

        return when (localVarResponse.responseType) {
            ResponseType.Success -> (localVarResponse as Success<*>).data as InterfacesIAccessControlGetRoleAdmin200Response
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
     * IAccessControl.getRoleAdmin
     * Read &#x60;getRoleAdmin(role)&#x60; on an instance of &#x60;IAccessControl&#x60;
     * @param networkId The network id (default to "80001")
     * @param address An ethereum address
     * @param interfacesIAccessControlGetRoleAdminRequest 
     * @return ApiResponse<InterfacesIAccessControlGetRoleAdmin200Response?>
     * @throws IllegalStateException If the request is not correctly configured
     * @throws IOException Rethrows the OkHttp execute method exception
     */
    @Suppress("UNCHECKED_CAST")
    @Throws(IllegalStateException::class, IOException::class)
    fun interfacesIAccessControlGetRoleAdminWithHttpInfo(networkId: kotlin.String, address: kotlin.String, interfacesIAccessControlGetRoleAdminRequest: InterfacesIAccessControlGetRoleAdminRequest) : ApiResponse<InterfacesIAccessControlGetRoleAdmin200Response?> {
        val localVariableConfig = interfacesIAccessControlGetRoleAdminRequestConfig(networkId = networkId, address = address, interfacesIAccessControlGetRoleAdminRequest = interfacesIAccessControlGetRoleAdminRequest)

        return request<InterfacesIAccessControlGetRoleAdminRequest, InterfacesIAccessControlGetRoleAdmin200Response>(
            localVariableConfig
        )
    }

    /**
     * To obtain the request config of the operation interfacesIAccessControlGetRoleAdmin
     *
     * @param networkId The network id (default to "80001")
     * @param address An ethereum address
     * @param interfacesIAccessControlGetRoleAdminRequest 
     * @return RequestConfig
     */
    fun interfacesIAccessControlGetRoleAdminRequestConfig(networkId: kotlin.String, address: kotlin.String, interfacesIAccessControlGetRoleAdminRequest: InterfacesIAccessControlGetRoleAdminRequest) : RequestConfig<InterfacesIAccessControlGetRoleAdminRequest> {
        val localVariableBody = interfacesIAccessControlGetRoleAdminRequest
        val localVariableQuery: MultiValueMap = mutableMapOf()
        val localVariableHeaders: MutableMap<String, String> = mutableMapOf()
        localVariableHeaders["Content-Type"] = "application/json"
        localVariableHeaders["Accept"] = "application/json"

        return RequestConfig(
            method = RequestMethod.POST,
            path = "/{networkId}/interface/IAccessControl/read/{address}/getRoleAdmin".replace("{"+"networkId"+"}", encodeURIComponent(networkId.toString())).replace("{"+"address"+"}", encodeURIComponent(address.toString())),
            query = localVariableQuery,
            headers = localVariableHeaders,
            requiresAuthentication = true,
            body = localVariableBody
        )
    }

    /**
     * IAccessControl.grantRole
     * Write &#x60;grantRole(role,account)&#x60; on an instance of &#x60;IAccessControl&#x60;
     * @param networkId The network id (default to "80001")
     * @param address An ethereum address
     * @param interfacesIAccessControlGrantRoleRequest 
     * @return InterfacesIAccessControlGrantRole200Response
     * @throws IllegalStateException If the request is not correctly configured
     * @throws IOException Rethrows the OkHttp execute method exception
     * @throws UnsupportedOperationException If the API returns an informational or redirection response
     * @throws ClientException If the API returns a client error response
     * @throws ServerException If the API returns a server error response
     */
    @Suppress("UNCHECKED_CAST")
    @Throws(IllegalStateException::class, IOException::class, UnsupportedOperationException::class, ClientException::class, ServerException::class)
    fun interfacesIAccessControlGrantRole(networkId: kotlin.String = "80001", address: kotlin.String, interfacesIAccessControlGrantRoleRequest: InterfacesIAccessControlGrantRoleRequest) : InterfacesIAccessControlGrantRole200Response {
        val localVarResponse = interfacesIAccessControlGrantRoleWithHttpInfo(networkId = networkId, address = address, interfacesIAccessControlGrantRoleRequest = interfacesIAccessControlGrantRoleRequest)

        return when (localVarResponse.responseType) {
            ResponseType.Success -> (localVarResponse as Success<*>).data as InterfacesIAccessControlGrantRole200Response
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
     * IAccessControl.grantRole
     * Write &#x60;grantRole(role,account)&#x60; on an instance of &#x60;IAccessControl&#x60;
     * @param networkId The network id (default to "80001")
     * @param address An ethereum address
     * @param interfacesIAccessControlGrantRoleRequest 
     * @return ApiResponse<InterfacesIAccessControlGrantRole200Response?>
     * @throws IllegalStateException If the request is not correctly configured
     * @throws IOException Rethrows the OkHttp execute method exception
     */
    @Suppress("UNCHECKED_CAST")
    @Throws(IllegalStateException::class, IOException::class)
    fun interfacesIAccessControlGrantRoleWithHttpInfo(networkId: kotlin.String, address: kotlin.String, interfacesIAccessControlGrantRoleRequest: InterfacesIAccessControlGrantRoleRequest) : ApiResponse<InterfacesIAccessControlGrantRole200Response?> {
        val localVariableConfig = interfacesIAccessControlGrantRoleRequestConfig(networkId = networkId, address = address, interfacesIAccessControlGrantRoleRequest = interfacesIAccessControlGrantRoleRequest)

        return request<InterfacesIAccessControlGrantRoleRequest, InterfacesIAccessControlGrantRole200Response>(
            localVariableConfig
        )
    }

    /**
     * To obtain the request config of the operation interfacesIAccessControlGrantRole
     *
     * @param networkId The network id (default to "80001")
     * @param address An ethereum address
     * @param interfacesIAccessControlGrantRoleRequest 
     * @return RequestConfig
     */
    fun interfacesIAccessControlGrantRoleRequestConfig(networkId: kotlin.String, address: kotlin.String, interfacesIAccessControlGrantRoleRequest: InterfacesIAccessControlGrantRoleRequest) : RequestConfig<InterfacesIAccessControlGrantRoleRequest> {
        val localVariableBody = interfacesIAccessControlGrantRoleRequest
        val localVariableQuery: MultiValueMap = mutableMapOf()
        val localVariableHeaders: MutableMap<String, String> = mutableMapOf()
        localVariableHeaders["Content-Type"] = "application/json"
        localVariableHeaders["Accept"] = "application/json"

        return RequestConfig(
            method = RequestMethod.POST,
            path = "/{networkId}/interface/IAccessControl/write/{address}/grantRole".replace("{"+"networkId"+"}", encodeURIComponent(networkId.toString())).replace("{"+"address"+"}", encodeURIComponent(address.toString())),
            query = localVariableQuery,
            headers = localVariableHeaders,
            requiresAuthentication = true,
            body = localVariableBody
        )
    }

    /**
     * IAccessControl.hasRole
     * Read &#x60;hasRole(role,account)&#x60; on an instance of &#x60;IAccessControl&#x60;
     * @param networkId The network id (default to "80001")
     * @param address An ethereum address
     * @param interfacesIAccessControlGrantRoleRequest 
     * @return InterfacesIAccessControlHasRole200Response
     * @throws IllegalStateException If the request is not correctly configured
     * @throws IOException Rethrows the OkHttp execute method exception
     * @throws UnsupportedOperationException If the API returns an informational or redirection response
     * @throws ClientException If the API returns a client error response
     * @throws ServerException If the API returns a server error response
     */
    @Suppress("UNCHECKED_CAST")
    @Throws(IllegalStateException::class, IOException::class, UnsupportedOperationException::class, ClientException::class, ServerException::class)
    fun interfacesIAccessControlHasRole(networkId: kotlin.String = "80001", address: kotlin.String, interfacesIAccessControlGrantRoleRequest: InterfacesIAccessControlGrantRoleRequest) : InterfacesIAccessControlHasRole200Response {
        val localVarResponse = interfacesIAccessControlHasRoleWithHttpInfo(networkId = networkId, address = address, interfacesIAccessControlGrantRoleRequest = interfacesIAccessControlGrantRoleRequest)

        return when (localVarResponse.responseType) {
            ResponseType.Success -> (localVarResponse as Success<*>).data as InterfacesIAccessControlHasRole200Response
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
     * IAccessControl.hasRole
     * Read &#x60;hasRole(role,account)&#x60; on an instance of &#x60;IAccessControl&#x60;
     * @param networkId The network id (default to "80001")
     * @param address An ethereum address
     * @param interfacesIAccessControlGrantRoleRequest 
     * @return ApiResponse<InterfacesIAccessControlHasRole200Response?>
     * @throws IllegalStateException If the request is not correctly configured
     * @throws IOException Rethrows the OkHttp execute method exception
     */
    @Suppress("UNCHECKED_CAST")
    @Throws(IllegalStateException::class, IOException::class)
    fun interfacesIAccessControlHasRoleWithHttpInfo(networkId: kotlin.String, address: kotlin.String, interfacesIAccessControlGrantRoleRequest: InterfacesIAccessControlGrantRoleRequest) : ApiResponse<InterfacesIAccessControlHasRole200Response?> {
        val localVariableConfig = interfacesIAccessControlHasRoleRequestConfig(networkId = networkId, address = address, interfacesIAccessControlGrantRoleRequest = interfacesIAccessControlGrantRoleRequest)

        return request<InterfacesIAccessControlGrantRoleRequest, InterfacesIAccessControlHasRole200Response>(
            localVariableConfig
        )
    }

    /**
     * To obtain the request config of the operation interfacesIAccessControlHasRole
     *
     * @param networkId The network id (default to "80001")
     * @param address An ethereum address
     * @param interfacesIAccessControlGrantRoleRequest 
     * @return RequestConfig
     */
    fun interfacesIAccessControlHasRoleRequestConfig(networkId: kotlin.String, address: kotlin.String, interfacesIAccessControlGrantRoleRequest: InterfacesIAccessControlGrantRoleRequest) : RequestConfig<InterfacesIAccessControlGrantRoleRequest> {
        val localVariableBody = interfacesIAccessControlGrantRoleRequest
        val localVariableQuery: MultiValueMap = mutableMapOf()
        val localVariableHeaders: MutableMap<String, String> = mutableMapOf()
        localVariableHeaders["Content-Type"] = "application/json"
        localVariableHeaders["Accept"] = "application/json"

        return RequestConfig(
            method = RequestMethod.POST,
            path = "/{networkId}/interface/IAccessControl/read/{address}/hasRole".replace("{"+"networkId"+"}", encodeURIComponent(networkId.toString())).replace("{"+"address"+"}", encodeURIComponent(address.toString())),
            query = localVariableQuery,
            headers = localVariableHeaders,
            requiresAuthentication = true,
            body = localVariableBody
        )
    }

    /**
     * IAccessControl.renounceRole
     * Write &#x60;renounceRole(role,account)&#x60; on an instance of &#x60;IAccessControl&#x60;
     * @param networkId The network id (default to "80001")
     * @param address An ethereum address
     * @param interfacesIAccessControlGrantRoleRequest 
     * @return InterfacesIAccessControlGrantRole200Response
     * @throws IllegalStateException If the request is not correctly configured
     * @throws IOException Rethrows the OkHttp execute method exception
     * @throws UnsupportedOperationException If the API returns an informational or redirection response
     * @throws ClientException If the API returns a client error response
     * @throws ServerException If the API returns a server error response
     */
    @Suppress("UNCHECKED_CAST")
    @Throws(IllegalStateException::class, IOException::class, UnsupportedOperationException::class, ClientException::class, ServerException::class)
    fun interfacesIAccessControlRenounceRole(networkId: kotlin.String = "80001", address: kotlin.String, interfacesIAccessControlGrantRoleRequest: InterfacesIAccessControlGrantRoleRequest) : InterfacesIAccessControlGrantRole200Response {
        val localVarResponse = interfacesIAccessControlRenounceRoleWithHttpInfo(networkId = networkId, address = address, interfacesIAccessControlGrantRoleRequest = interfacesIAccessControlGrantRoleRequest)

        return when (localVarResponse.responseType) {
            ResponseType.Success -> (localVarResponse as Success<*>).data as InterfacesIAccessControlGrantRole200Response
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
     * IAccessControl.renounceRole
     * Write &#x60;renounceRole(role,account)&#x60; on an instance of &#x60;IAccessControl&#x60;
     * @param networkId The network id (default to "80001")
     * @param address An ethereum address
     * @param interfacesIAccessControlGrantRoleRequest 
     * @return ApiResponse<InterfacesIAccessControlGrantRole200Response?>
     * @throws IllegalStateException If the request is not correctly configured
     * @throws IOException Rethrows the OkHttp execute method exception
     */
    @Suppress("UNCHECKED_CAST")
    @Throws(IllegalStateException::class, IOException::class)
    fun interfacesIAccessControlRenounceRoleWithHttpInfo(networkId: kotlin.String, address: kotlin.String, interfacesIAccessControlGrantRoleRequest: InterfacesIAccessControlGrantRoleRequest) : ApiResponse<InterfacesIAccessControlGrantRole200Response?> {
        val localVariableConfig = interfacesIAccessControlRenounceRoleRequestConfig(networkId = networkId, address = address, interfacesIAccessControlGrantRoleRequest = interfacesIAccessControlGrantRoleRequest)

        return request<InterfacesIAccessControlGrantRoleRequest, InterfacesIAccessControlGrantRole200Response>(
            localVariableConfig
        )
    }

    /**
     * To obtain the request config of the operation interfacesIAccessControlRenounceRole
     *
     * @param networkId The network id (default to "80001")
     * @param address An ethereum address
     * @param interfacesIAccessControlGrantRoleRequest 
     * @return RequestConfig
     */
    fun interfacesIAccessControlRenounceRoleRequestConfig(networkId: kotlin.String, address: kotlin.String, interfacesIAccessControlGrantRoleRequest: InterfacesIAccessControlGrantRoleRequest) : RequestConfig<InterfacesIAccessControlGrantRoleRequest> {
        val localVariableBody = interfacesIAccessControlGrantRoleRequest
        val localVariableQuery: MultiValueMap = mutableMapOf()
        val localVariableHeaders: MutableMap<String, String> = mutableMapOf()
        localVariableHeaders["Content-Type"] = "application/json"
        localVariableHeaders["Accept"] = "application/json"

        return RequestConfig(
            method = RequestMethod.POST,
            path = "/{networkId}/interface/IAccessControl/write/{address}/renounceRole".replace("{"+"networkId"+"}", encodeURIComponent(networkId.toString())).replace("{"+"address"+"}", encodeURIComponent(address.toString())),
            query = localVariableQuery,
            headers = localVariableHeaders,
            requiresAuthentication = true,
            body = localVariableBody
        )
    }

    /**
     * IAccessControl.revokeRole
     * Write &#x60;revokeRole(role,account)&#x60; on an instance of &#x60;IAccessControl&#x60;
     * @param networkId The network id (default to "80001")
     * @param address An ethereum address
     * @param interfacesIAccessControlGrantRoleRequest 
     * @return InterfacesIAccessControlGrantRole200Response
     * @throws IllegalStateException If the request is not correctly configured
     * @throws IOException Rethrows the OkHttp execute method exception
     * @throws UnsupportedOperationException If the API returns an informational or redirection response
     * @throws ClientException If the API returns a client error response
     * @throws ServerException If the API returns a server error response
     */
    @Suppress("UNCHECKED_CAST")
    @Throws(IllegalStateException::class, IOException::class, UnsupportedOperationException::class, ClientException::class, ServerException::class)
    fun interfacesIAccessControlRevokeRole(networkId: kotlin.String = "80001", address: kotlin.String, interfacesIAccessControlGrantRoleRequest: InterfacesIAccessControlGrantRoleRequest) : InterfacesIAccessControlGrantRole200Response {
        val localVarResponse = interfacesIAccessControlRevokeRoleWithHttpInfo(networkId = networkId, address = address, interfacesIAccessControlGrantRoleRequest = interfacesIAccessControlGrantRoleRequest)

        return when (localVarResponse.responseType) {
            ResponseType.Success -> (localVarResponse as Success<*>).data as InterfacesIAccessControlGrantRole200Response
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
     * IAccessControl.revokeRole
     * Write &#x60;revokeRole(role,account)&#x60; on an instance of &#x60;IAccessControl&#x60;
     * @param networkId The network id (default to "80001")
     * @param address An ethereum address
     * @param interfacesIAccessControlGrantRoleRequest 
     * @return ApiResponse<InterfacesIAccessControlGrantRole200Response?>
     * @throws IllegalStateException If the request is not correctly configured
     * @throws IOException Rethrows the OkHttp execute method exception
     */
    @Suppress("UNCHECKED_CAST")
    @Throws(IllegalStateException::class, IOException::class)
    fun interfacesIAccessControlRevokeRoleWithHttpInfo(networkId: kotlin.String, address: kotlin.String, interfacesIAccessControlGrantRoleRequest: InterfacesIAccessControlGrantRoleRequest) : ApiResponse<InterfacesIAccessControlGrantRole200Response?> {
        val localVariableConfig = interfacesIAccessControlRevokeRoleRequestConfig(networkId = networkId, address = address, interfacesIAccessControlGrantRoleRequest = interfacesIAccessControlGrantRoleRequest)

        return request<InterfacesIAccessControlGrantRoleRequest, InterfacesIAccessControlGrantRole200Response>(
            localVariableConfig
        )
    }

    /**
     * To obtain the request config of the operation interfacesIAccessControlRevokeRole
     *
     * @param networkId The network id (default to "80001")
     * @param address An ethereum address
     * @param interfacesIAccessControlGrantRoleRequest 
     * @return RequestConfig
     */
    fun interfacesIAccessControlRevokeRoleRequestConfig(networkId: kotlin.String, address: kotlin.String, interfacesIAccessControlGrantRoleRequest: InterfacesIAccessControlGrantRoleRequest) : RequestConfig<InterfacesIAccessControlGrantRoleRequest> {
        val localVariableBody = interfacesIAccessControlGrantRoleRequest
        val localVariableQuery: MultiValueMap = mutableMapOf()
        val localVariableHeaders: MutableMap<String, String> = mutableMapOf()
        localVariableHeaders["Content-Type"] = "application/json"
        localVariableHeaders["Accept"] = "application/json"

        return RequestConfig(
            method = RequestMethod.POST,
            path = "/{networkId}/interface/IAccessControl/write/{address}/revokeRole".replace("{"+"networkId"+"}", encodeURIComponent(networkId.toString())).replace("{"+"address"+"}", encodeURIComponent(address.toString())),
            query = localVariableQuery,
            headers = localVariableHeaders,
            requiresAuthentication = true,
            body = localVariableBody
        )
    }


    private fun encodeURIComponent(uriComponent: kotlin.String): kotlin.String =
        HttpUrl.Builder().scheme("http").host("localhost").addPathSegment(uriComponent).build().encodedPathSegments[0]
}