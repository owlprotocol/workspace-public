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

import org.openapitools.client.models.InterfacesIERC1155SafeTransferFromRequestContractParams

import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import java.io.Serializable

/**
 * 
 *
 * @param contractParams 
 */


data class InterfacesIERC1155SafeTransferFromRequest (

    @Json(name = "contractParams")
    val contractParams: InterfacesIERC1155SafeTransferFromRequestContractParams

) : Serializable {
    companion object {
        private const val serialVersionUID: Long = 123
    }

}

