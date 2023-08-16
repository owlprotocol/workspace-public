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
 * @param _3 A string
 * @param admin An ethereum address
 * @param contractUri A string
 * @param uriRole An ethereum address
 * @param uri A string
 */


data class DeployTokenURIRequestContractParams (

    /* An ethereum address */
    @Json(name = "0")
    val _0: kotlin.String? = null,

    /* A string */
    @Json(name = "1")
    val _1: kotlin.String? = null,

    /* An ethereum address */
    @Json(name = "2")
    val _2: kotlin.String? = null,

    /* A string */
    @Json(name = "3")
    val _3: kotlin.String? = null,

    /* An ethereum address */
    @Json(name = "_admin")
    val admin: kotlin.String? = null,

    /* A string */
    @Json(name = "_contractUri")
    val contractUri: kotlin.String? = null,

    /* An ethereum address */
    @Json(name = "_uriRole")
    val uriRole: kotlin.String? = null,

    /* A string */
    @Json(name = "_uri")
    val uri: kotlin.String? = null

) : Serializable {
    companion object {
        private const val serialVersionUID: Long = 123
    }

}

