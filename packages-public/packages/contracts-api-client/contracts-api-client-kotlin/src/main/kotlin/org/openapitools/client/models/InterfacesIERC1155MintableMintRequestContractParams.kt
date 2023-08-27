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
 * @param _1 A solidity uint256
 * @param _2 A solidity uint256
 * @param _3 An arbitrary length byte array
 * @param to An ethereum address
 * @param id A solidity uint256
 * @param amount A solidity uint256
 * @param `data` An arbitrary length byte array
 */


data class InterfacesIERC1155MintableMintRequestContractParams (

    /* An ethereum address */
    @Json(name = "0")
    val _0: kotlin.String? = null,

    /* A solidity uint256 */
    @Json(name = "1")
    val _1: kotlin.String? = null,

    /* A solidity uint256 */
    @Json(name = "2")
    val _2: kotlin.String? = null,

    /* An arbitrary length byte array */
    @Json(name = "3")
    val _3: kotlin.String? = null,

    /* An ethereum address */
    @Json(name = "to")
    val to: kotlin.String? = null,

    /* A solidity uint256 */
    @Json(name = "id")
    val id: kotlin.String? = null,

    /* A solidity uint256 */
    @Json(name = "amount")
    val amount: kotlin.String? = null,

    /* An arbitrary length byte array */
    @Json(name = "data")
    val `data`: kotlin.String? = null

) : Serializable {
    companion object {
        private const val serialVersionUID: Long = 123
    }

}
