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


import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import java.io.Serializable

/**
 * 
 *
 * @param _0 A solidity uint256
 * @param tokenId A solidity uint256
 */


data class InterfacesIERC721GetApprovedRequestContractParams (

    /* A solidity uint256 */
    @Json(name = "0")
    val _0: kotlin.String? = null,

    /* A solidity uint256 */
    @Json(name = "tokenId")
    val tokenId: kotlin.String? = null

) : Serializable {
    companion object {
        private const val serialVersionUID: Long = 123
    }

}

