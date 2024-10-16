// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721ClaimLib} from "./ERC721ClaimLib.sol";

/**
 * @dev Interface for managing and claiming ERC-721 tokens based on specific claim conditions.
 */
interface IERC721ClaimSinglePhase {
    /**
     * @dev Emitted when a new claim condition is set or updated.
     */
    event ClaimConditionSet(bytes32 indexed conditionId, ERC721ClaimLib.ClaimCondition condition);

    /**
     * @dev Emitted when tokens are claimed.
     */
    event TokensClaimed(address indexed claimant, bytes32 indexed conditionId, uint256 quantity);

    /**
     * TODO: Add comments on how to delete. Set startTimestamp to MAX_INT
     * @dev Sets or updates a claim condition.
     * @param condition The details of the condition.
     */
    function setClaimCondition(ERC721ClaimLib.ClaimCondition memory condition) external;

    /**
     * @dev Returns the details of a claim condition.
     * @return ClaimCondition The details of the condition.
     */
    function getClaimCondition() external view returns (ERC721ClaimLib.ClaimCondition memory);

    /**
     * @dev Returns the number of claims made by a specific wallet.
     * @param account The address of the wallet to check.
     * @return uint256 The number of claims made by the account.
     */
    function getAccountClaims(address account) external view returns (uint256);
}
