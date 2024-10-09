// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721DropLib} from "./ERC721DropLib.sol";

interface IERC721DropSinglePhase {
    event DropConditionSet(bytes32 indexed dropConditionId, bytes32 indexed merkleRoot);
    event TokensClaimedWithProof(
        bytes32 indexed dropConditionId,
        address indexed account,
        uint256 quantity,
        uint256 totalClaimed
    );

    /**
     * @notice Set or update the drop condition.
     * Caller must have the appropriate role.
     * @param merkleRoot Merkle root for the address-based claim limits.
     */
    function setDropCondition(bytes32 merkleRoot) external;

    /**
     * @notice Claim tokens based on a Merkle proof.
     * @param quantity Number of tokens to claim.
     * @param maxClaimable The maximum number of tokens the account is allowed to claim.
     * @param merkleProof Array of hashes required to verify the account's eligibility.
     */
    function claimWithProof(uint256 quantity, uint256 maxClaimable, bytes32[] calldata merkleProof) external;

    /**
     * @notice Get the number of tokens already claimed by an account.
     * @param account Address of the account.
     * @return uint256 Number of tokens claimed.
     */
    function getAccountClaimed(address account) external view returns (uint256);

    /**
     * @notice Check if a given account and its max claim are valid for a specific drop condition.
     * @param account Address of the account to check.
     * @param accountMaxClaim Maximum number of tokens the account can claim.
     * @param proof Array of hashes required to verify the account's eligibility.
     * @return boolean indicating if the proof is valid for the given account and max claim.
     */
    function checkMaxClaimForAccount(
        address account,
        uint256 accountMaxClaim,
        bytes32[] calldata proof
    ) external view returns (bool);
}
