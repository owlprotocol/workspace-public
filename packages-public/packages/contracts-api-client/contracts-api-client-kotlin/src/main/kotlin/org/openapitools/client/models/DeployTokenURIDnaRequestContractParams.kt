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
 * @param _4 An ethereum address
 * @param _5 An ethereum address
 * @param admin An ethereum address
 * @param contractUri A string
 * @param baseUriRole An ethereum address
 * @param baseUri A string
 * @param dnaProviderRole An ethereum address
 * @param dnaProvider An ethereum address
 */


data class DeployTokenURIDnaRequestContractParams (

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
    @Json(name = "4")
    val _4: kotlin.String? = null,

    /* An ethereum address */
    @Json(name = "5")
    val _5: kotlin.String? = null,

    /* An ethereum address */
    @Json(name = "_admin")
    val admin: kotlin.String? = null,

    /* A string */
    @Json(name = "_contractUri")
    val contractUri: kotlin.String? = null,

    /* An ethereum address */
    @Json(name = "_baseUriRole")
    val baseUriRole: kotlin.String? = null,

    /* A string */
    @Json(name = "_baseUri")
    val baseUri: kotlin.String? = null,

    /* An ethereum address */
    @Json(name = "_dnaProviderRole")
    val dnaProviderRole: kotlin.String? = null,

    /* An ethereum address */
    @Json(name = "_dnaProvider")
    val dnaProvider: kotlin.String? = null

) : Serializable {
    companion object {
        private const val serialVersionUID: Long = 123
    }

}

