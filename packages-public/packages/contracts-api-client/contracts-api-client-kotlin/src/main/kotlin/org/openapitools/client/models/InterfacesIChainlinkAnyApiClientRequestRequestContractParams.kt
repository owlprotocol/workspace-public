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
 * @param _1 An arbitrary length byte array
 * @param _2 A solidity bytes32
 * @param _3 A string
 * @param _4 A string
 * @param _5 A solidity uint256
 * @param fulfillAddress An ethereum address
 * @param fulfillPrefixData An arbitrary length byte array
 * @param reqJobId A solidity bytes32
 * @param reqUrl A string
 * @param reqPath A string
 * @param reqFee A solidity uint256
 */


data class InterfacesIChainlinkAnyApiClientRequestRequestContractParams (

    /* An ethereum address */
    @Json(name = "0")
    val _0: kotlin.String? = null,

    /* An arbitrary length byte array */
    @Json(name = "1")
    val _1: kotlin.String? = null,

    /* A solidity bytes32 */
    @Json(name = "2")
    val _2: kotlin.String? = null,

    /* A string */
    @Json(name = "3")
    val _3: kotlin.String? = null,

    /* A string */
    @Json(name = "4")
    val _4: kotlin.String? = null,

    /* A solidity uint256 */
    @Json(name = "5")
    val _5: kotlin.String? = null,

    /* An ethereum address */
    @Json(name = "fulfillAddress")
    val fulfillAddress: kotlin.String? = null,

    /* An arbitrary length byte array */
    @Json(name = "fulfillPrefixData")
    val fulfillPrefixData: kotlin.String? = null,

    /* A solidity bytes32 */
    @Json(name = "reqJobId")
    val reqJobId: kotlin.String? = null,

    /* A string */
    @Json(name = "reqUrl")
    val reqUrl: kotlin.String? = null,

    /* A string */
    @Json(name = "reqPath")
    val reqPath: kotlin.String? = null,

    /* A solidity uint256 */
    @Json(name = "reqFee")
    val reqFee: kotlin.String? = null

) : Serializable {
    companion object {
        private const val serialVersionUID: Long = 123
    }

}
