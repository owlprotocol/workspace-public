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

package org.openapitools.client.models

import org.openapitools.client.models.InterfacesIChainlinkAnyApiClientRequests200ResponseResult
import org.openapitools.client.models.InterfacesIERC1820InterfaceHash200ResponseResult

import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import java.io.Serializable

/**
 * 
 *
 * @param contractParams 
 * @param result 
 */


data class InterfacesIChainlinkAnyApiClientRequests200Response (

    @Json(name = "contractParams")
    val contractParams: InterfacesIERC1820InterfaceHash200ResponseResult,

    @Json(name = "result")
    val result: InterfacesIChainlinkAnyApiClientRequests200ResponseResult

) : Serializable {
    companion object {
        private const val serialVersionUID: Long = 123
    }

}

