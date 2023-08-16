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

import org.openapitools.client.models.DeployBeaconProxyDefaultResponseIssuesInner

import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import java.io.Serializable

/**
 * 
 *
 * @param message 
 * @param code 
 * @param issues 
 */


data class DeployBeaconProxyDefaultResponse (

    @Json(name = "message")
    val message: kotlin.String,

    @Json(name = "code")
    val code: kotlin.String,

    @Json(name = "issues")
    val issues: kotlin.collections.List<DeployBeaconProxyDefaultResponseIssuesInner>? = null

) : Serializable {
    companion object {
        private const val serialVersionUID: Long = 123
    }

}

