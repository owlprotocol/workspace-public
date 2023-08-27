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
 * @param _0 A solidity uint256
 * @param _1 An ethereum address
 * @param _2 A solidity uint96
 * @param tokenId A solidity uint256
 * @param `receiver` An ethereum address
 * @param feeNumerator A solidity uint96
 */


data class InterfacesIERC2981SetterSetTokenRoyaltyRequestContractParams (

    /* A solidity uint256 */
    @Json(name = "0")
    val _0: kotlin.String? = null,

    /* An ethereum address */
    @Json(name = "1")
    val _1: kotlin.String? = null,

    /* A solidity uint96 */
    @Json(name = "2")
    val _2: kotlin.String? = null,

    /* A solidity uint256 */
    @Json(name = "tokenId")
    val tokenId: kotlin.String? = null,

    /* An ethereum address */
    @Json(name = "receiver")
    val `receiver`: kotlin.String? = null,

    /* A solidity uint96 */
    @Json(name = "feeNumerator")
    val feeNumerator: kotlin.String? = null

) : Serializable {
    companion object {
        private const val serialVersionUID: Long = 123
    }

}
