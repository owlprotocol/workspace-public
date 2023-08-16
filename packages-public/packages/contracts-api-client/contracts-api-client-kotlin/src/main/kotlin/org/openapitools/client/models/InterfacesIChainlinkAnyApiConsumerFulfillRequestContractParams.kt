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
 * @param _0 An arbitrary length byte array
 * @param _1 An arbitrary length byte array
 * @param fulfillPrefixData An arbitrary length byte array
 * @param fulfillResponseData An arbitrary length byte array
 */


data class InterfacesIChainlinkAnyApiConsumerFulfillRequestContractParams (

    /* An arbitrary length byte array */
    @Json(name = "0")
    val _0: kotlin.String? = null,

    /* An arbitrary length byte array */
    @Json(name = "1")
    val _1: kotlin.String? = null,

    /* An arbitrary length byte array */
    @Json(name = "fulfillPrefixData")
    val fulfillPrefixData: kotlin.String? = null,

    /* An arbitrary length byte array */
    @Json(name = "fulfillResponseData")
    val fulfillResponseData: kotlin.String? = null

) : Serializable {
    companion object {
        private const val serialVersionUID: Long = 123
    }

}

