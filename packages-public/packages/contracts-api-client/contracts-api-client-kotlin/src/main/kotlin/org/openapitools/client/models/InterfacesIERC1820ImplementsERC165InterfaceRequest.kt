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

import org.openapitools.client.models.InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams

import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import java.io.Serializable

/**
 * 
 *
 * @param contractParams 
 */


data class InterfacesIERC1820ImplementsERC165InterfaceRequest (

    @Json(name = "contractParams")
    val contractParams: InterfacesIERC1820ImplementsERC165InterfaceRequestContractParams

) : Serializable {
    companion object {
        private const val serialVersionUID: Long = 123
    }

}
