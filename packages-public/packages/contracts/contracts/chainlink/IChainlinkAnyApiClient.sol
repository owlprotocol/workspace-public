//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

/**
 * @dev Interface for a universal Chainlink AnyApi client. Requests store a fulfillAddress and fulfillPrefixData
 * that are stored (indexed on reqId) and then used to proxy the fulfillment data.
 * This has the advantages of using 1 single LINK balance for multiple Chainlink data consumers.
 * We only support bytes responses as all other types can be derived from these.
 * Responses call IChainlinkAnyApiConsumer.fulfill(fulfillPrefixData, fulfillResponseData) on contract that is then responsible for decoding data.
 */
interface IChainlinkAnyApiClient {
    /**
     * @dev Issue Chainlink AnyApi request. Protected by onlyRoleRecursive(REQUEST_ROLE)
     * @param fulfillAddress address of contract to call on fulfillment
     * @param fulfillPrefixData prefix data that is concatenated with response. Can store additional params
     * @param reqJobId jobId of request. Should be a Get > bytes job. We make this parametrized to support multiple networks & operator deployments.
     * @param reqUrl api to call
     * @param reqPath JSON path to extract
     * @param reqFee LINK token payment. Recommended minimum: 0.1 * 10**18 (Varies by network and job)
     */
    function request(
        address fulfillAddress,
        bytes calldata fulfillPrefixData,
        bytes32 reqJobId,
        string calldata reqUrl,
        string calldata reqPath,
        uint256 reqFee
    ) external;

    /**
     * @dev Fulfill function called by Chainlink oracle. This is then forwarded to relevant contract configuration that
     * was stored at issuance of the request.
     * Protected by recordChainlinkFulfillment modifier that checks reqId is unfulfilled, and caller is oracle associated with request
     * @param reqId generated by Chainlink library
     * @param reqResponseData result data
     */
    function fulfill(bytes32 reqId, bytes memory reqResponseData) external;

    /**
     * @dev Allow withdraw of Link tokens from the contract. Protected by onlyRoleRecursive(WITHDRAW_ROLE)
     * @param to target address, does not have to be same as caller
     * @param amount amount to withdraw, does not have to be full amount
     */
    function withdrawLink(address to, uint256 amount) external;
}
