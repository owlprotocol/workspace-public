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

import org.openapitools.client.models.InterfacesITokenDnaGetDnaBatch200ResponseResult
import org.openapitools.client.models.InterfacesITokenDnaGetDnaBatchRequestContractParams

import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import java.io.Serializable

/**
 * 
 *
 * @param contractParams 
 * @param result 
 */


data class InterfacesITokenDnaGetDnaBatch200Response (

    @Json(name = "contractParams")
    val contractParams: InterfacesITokenDnaGetDnaBatchRequestContractParams,

    @Json(name = "result")
    val result: InterfacesITokenDnaGetDnaBatch200ResponseResult

) : Serializable {
    companion object {
        private const val serialVersionUID: Long = 123
    }

}

