// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AccessControlRecursiveLib} from "../../access/AccessControlRecursiveLib.sol";

import {IERC721DropSinglePhase} from "./IERC721DropSinglePhase.sol";
import {ERC721DropLib} from "./ERC721DropLib.sol";

/**
 * @dev Manage and claim ERC-721 tokens airdrops in a single phase.
 */
contract ERC721DropSinglePhaseFacet is IERC721DropSinglePhase {
    /**
     * @notice Set or update the drop condition.
     * Caller must have the `ERC721_DROP_ROLE`.
     * @param merkleRoot Merkle root for the address-based claim limits.
     */
    function setDropCondition(bytes32 merkleRoot) external {
        ERC721DropLib._setDropCondition(0, merkleRoot);
    }

    /**
     * @notice Claim tokens based on a Merkle proof.
     * @param quantity Number of tokens to claim.
     * @param maxClaimable The maximum number of tokens the account is allowed to claim.
     * @param merkleProof Array of hashes required to verify the account's eligibility.
     */
    // TODO: payable?
    function claimWithProof(uint256 quantity, uint256 maxClaimable, bytes32[] calldata merkleProof) external {
        ERC721DropLib._claimWithProof(0, msg.sender, quantity, maxClaimable, merkleProof);
    }

    /**
     * @notice Get the number of tokens already claimed by an account for a specific drop condition.
     * @param account Address of the account.
     * @return uint256 Number of tokens claimed.
     */
    function getAccountClaimed(address account) external view returns (uint256) {
        return ERC721DropLib._getAccountClaimed(0, account);
    }

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
    ) external view returns (bool) {
        return ERC721DropLib._checkMaxClaimForAccount(0, account, accountMaxClaim, proof);
    }
}
