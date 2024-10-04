// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721ClaimLib} from "./ERC721ClaimLib.sol";

/**
 * @dev Interface for managing and claiming ERC-721 tokens based on specific claim conditions.
 */
interface IERC721Claim {
    /**
     * @dev Emitted when a new claim condition is set or updated.
     */
    event ClaimConditionSet(bytes32 indexed conditionId, ERC721ClaimLib.ClaimCondition condition);

    /**
     * @dev Emitted when tokens are claimed.
     */
    event TokensClaimed(address indexed claimant, bytes32 indexed conditionId, uint256 quantity);

    /**
     * @dev Sets or updates a claim condition.
     * @param conditionId ID of the condition.
     * @param startTimestamp The starting timestamp of the condition.
     * @param endTimestamp The end timestamp when the condition expires.
     * @param maxClaimableSupply The maximum number of tokens that can be claimed under this condition.
     * @param quantityLimitPerWallet The maximum number of tokens a single wallet can claim.
     * @param pricePerToken The price per token under this condition.
     * @param currency The currency in which the price is set.
     */
    function setClaimCondition(
        bytes32 conditionId,
        uint256 startTimestamp,
        uint256 endTimestamp,
        uint256 maxClaimableSupply,
        uint256 quantityLimitPerWallet,
        uint256 pricePerToken,
        address currency
    ) external;

    /**
     * @dev Removes an existing claim condition.
     * @param conditionId ID of the condition to remove.
     */
    function removeClaimCondition(bytes32 conditionId) external;

    /**
     * @dev Claims `quantity` tokens for `to` under `conditionId`.
     * Marked as `payable` to support native currency (ETH) payments.
     * @param conditionId The ID of the claim condition.
     * @param to The address to send the claimed tokens to.
     * @param quantity The number of tokens to claim.
     * @return uint256 The number of tokens successfully claimed.
     */
    function claimTokens(bytes32 conditionId, address to, uint256 quantity) external payable returns (uint256);

    /**
     * @dev Returns the details of a claim condition.
     * @param conditionId The ID of the condition.
     * @return ClaimCondition The details of the condition.
     */
    function getClaimCondition(bytes32 conditionId) external view returns (ERC721ClaimLib.ClaimCondition memory);
}
