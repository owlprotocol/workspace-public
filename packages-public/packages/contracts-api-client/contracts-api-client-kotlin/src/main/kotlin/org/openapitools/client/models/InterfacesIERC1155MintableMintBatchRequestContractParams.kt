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
 * @param _0 An ethereum address
 * @param _1 
 * @param _2 
 * @param _3 An arbitrary length byte array
 * @param to An ethereum address
 * @param ids 
 * @param amounts 
 * @param `data` An arbitrary length byte array
 */


data class InterfacesIERC1155MintableMintBatchRequestContractParams (

    /* An ethereum address */
    @Json(name = "0")
    val _0: kotlin.String? = null,

    @Json(name = "1")
    val _1: kotlin.collections.List<kotlin.String>? = null,

    @Json(name = "2")
    val _2: kotlin.collections.List<kotlin.String>? = null,

    /* An arbitrary length byte array */
    @Json(name = "3")
    val _3: kotlin.String? = null,

    /* An ethereum address */
    @Json(name = "to")
    val to: kotlin.String? = null,

    @Json(name = "ids")
    val ids: kotlin.collections.List<kotlin.String>? = null,

    @Json(name = "amounts")
    val amounts: kotlin.collections.List<kotlin.String>? = null,

    /* An arbitrary length byte array */
    @Json(name = "data")
    val `data`: kotlin.String? = null

) : Serializable {
    companion object {
        private const val serialVersionUID: Long = 123
    }

}

