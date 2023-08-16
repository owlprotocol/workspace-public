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

import org.openapitools.client.models.InterfacesIERC20Allowance200ResponseResult
import org.openapitools.client.models.InterfacesIERC721EnumerableTokenOfOwnerByIndexRequestContractParams

import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import java.io.Serializable

/**
 * 
 *
 * @param contractParams 
 * @param result 
 */


data class InterfacesIERC721EnumerableTokenOfOwnerByIndex200Response (

    @Json(name = "contractParams")
    val contractParams: InterfacesIERC721EnumerableTokenOfOwnerByIndexRequestContractParams,

    @Json(name = "result")
    val result: InterfacesIERC20Allowance200ResponseResult

) : Serializable {
    companion object {
        private const val serialVersionUID: Long = 123
    }

}

