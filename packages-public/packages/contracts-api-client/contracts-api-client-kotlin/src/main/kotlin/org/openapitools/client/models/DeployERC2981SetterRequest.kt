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

import org.openapitools.client.models.DeployBeaconProxyRequestDeployParams
import org.openapitools.client.models.DeployERC2981SetterRequestContractParams

import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import java.io.Serializable

/**
 * 
 *
 * @param deployParams 
 * @param contractParams 
 */


data class DeployERC2981SetterRequest (

    @Json(name = "deployParams")
    val deployParams: DeployBeaconProxyRequestDeployParams,

    @Json(name = "contractParams")
    val contractParams: DeployERC2981SetterRequestContractParams

) : Serializable {
    companion object {
        private const val serialVersionUID: Long = 123
    }

}

