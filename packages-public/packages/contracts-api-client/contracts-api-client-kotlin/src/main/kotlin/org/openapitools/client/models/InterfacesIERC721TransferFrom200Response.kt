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

import org.openapitools.client.models.InterfacesIERC721TransferFromRequestContractParams

import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import java.io.Serializable

/**
 * 
 *
 * @param contractParams 
 * @param txHash 
 */


data class InterfacesIERC721TransferFrom200Response (

    @Json(name = "contractParams")
    val contractParams: InterfacesIERC721TransferFromRequestContractParams,

    @Json(name = "txHash")
    val txHash: kotlin.String

) : Serializable {
    companion object {
        private const val serialVersionUID: Long = 123
    }

}

