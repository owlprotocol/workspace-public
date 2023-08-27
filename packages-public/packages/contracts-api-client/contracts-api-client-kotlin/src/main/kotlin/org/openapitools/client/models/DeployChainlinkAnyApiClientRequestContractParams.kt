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
 * @param _1 A string
 * @param _2 An ethereum address
 * @param _3 An ethereum address
 * @param admin An ethereum address
 * @param initContractURI A string
 * @param token An ethereum address
 * @param oracle An ethereum address
 */


data class DeployChainlinkAnyApiClientRequestContractParams (

    /* An ethereum address */
    @Json(name = "0")
    val _0: kotlin.String? = null,

    /* A string */
    @Json(name = "1")
    val _1: kotlin.String? = null,

    /* An ethereum address */
    @Json(name = "2")
    val _2: kotlin.String? = null,

    /* An ethereum address */
    @Json(name = "3")
    val _3: kotlin.String? = null,

    /* An ethereum address */
    @Json(name = "_admin")
    val admin: kotlin.String? = null,

    /* A string */
    @Json(name = "_initContractURI")
    val initContractURI: kotlin.String? = null,

    /* An ethereum address */
    @Json(name = "token")
    val token: kotlin.String? = null,

    /* An ethereum address */
    @Json(name = "oracle")
    val oracle: kotlin.String? = null

) : Serializable {
    companion object {
        private const val serialVersionUID: Long = 123
    }

}
