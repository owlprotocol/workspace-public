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
 * @param email 
 * @param apiKey 
 * @param authorization 
 * @param dfnsAddress 
 * @param dfnsId 
 * @param dfnsStatus 
 * @param gnosisTxHash 
 * @param gnosisAddress 
 * @param topupTotals 
 */


data class WebhooksReadme200Response (

    @Json(name = "email")
    val email: kotlin.String,

    @Json(name = "apiKey")
    val apiKey: kotlin.String,

    @Json(name = "Authorization")
    val authorization: kotlin.String,

    @Json(name = "dfnsAddress")
    val dfnsAddress: kotlin.String? = null,

    @Json(name = "dfnsId")
    val dfnsId: kotlin.String? = null,

    @Json(name = "dfnsStatus")
    val dfnsStatus: kotlin.String? = null,

    @Json(name = "gnosisTxHash")
    val gnosisTxHash: kotlin.String? = null,

    @Json(name = "gnosisAddress")
    val gnosisAddress: kotlin.String? = null,

    @Json(name = "topupTotals")
    val topupTotals: kotlin.Any? = null

) : Serializable {
    companion object {
        private const val serialVersionUID: Long = 123
    }

}

