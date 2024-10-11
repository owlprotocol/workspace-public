// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AccessControlRecursiveLib} from "../../access/AccessControlRecursiveLib.sol";

import {IERC721DropSinglePhase} from "./IERC721DropSinglePhase.sol";
import {IERC721MintableAutoId} from "./IERC721MintableAutoId.sol";

import {ERC721DropLib} from "./ERC721DropLib.sol";
import {ERC721MintableAutoIdLib} from "./ERC721MintableAutoIdLib.sol";
import {ERC721ClaimLib} from "./ERC721ClaimLib.sol";

/**
 * @dev Manage and claim ERC-721 tokens airdrops in a single phase.
 */
contract ERC721DropSinglePhaseFacet is IERC721DropSinglePhase {
    using ERC721ClaimLib for ERC721ClaimLib.ClaimCondition;

    /**
     * @notice Set or update the drop condition.
     * Caller must have the `ERC721_DROP_ROLE`.
     * @param merkleRoot Merkle root for the address-based claim limits.
     */
    function setDropCondition(bytes32 merkleRoot) external {
        ERC721DropLib._setDropCondition(0, merkleRoot);
    }

    /**
     * @notice Mint a single token to the specified address.
     * @param to The address to mint the token to.
     * @param condition ClaimCondition struct containing all condition fields.
     * @param merkleProof Array of hashes required to verify the account's eligibility.
     */
    function mintWithProof(
        address to,
        ERC721ClaimLib.ClaimCondition calldata condition,
        bytes32[] calldata merkleProof
    ) external payable returns (uint256) {
        if (AccessControlRecursiveLib._hasRoleRecursive(ERC721MintableAutoIdLib.ERC721_MINTER_ROLE, msg.sender)) {
            return ERC721MintableAutoIdLib.__unsafe_mint(to);
        } else {
            ERC721DropLib._claimWithProof(0, msg.sender, 1, condition, merkleProof);
            return ERC721MintableAutoIdLib.__unsafe_mint(to);
        }
    }

    /**
     * @notice Mint multiple tokens in a batch.
     * @param to The addresses to mint the tokens to.
     * @param condition ClaimCondition struct containing all condition fields.
     * @param merkleProof Array of hashes required to verify the account's eligibility.
     */
    function mintBatchWithProof(
        address[] memory to,
        ERC721ClaimLib.ClaimCondition calldata condition,
        bytes32[] calldata merkleProof
    ) external payable returns (uint256[] memory) {
        if (AccessControlRecursiveLib._hasRoleRecursive(ERC721MintableAutoIdLib.ERC721_MINTER_ROLE, msg.sender)) {
            return ERC721MintableAutoIdLib.__unsafe_mintBatch(to);
        } else {
            ERC721DropLib._claimWithProof(0, msg.sender, to.length, condition, merkleProof);
            return ERC721MintableAutoIdLib.__unsafe_mintBatch(to);
        }
    }

    /**
     * @notice Safely mint a single token to the specified address.
     * @param to The address to mint the token to.
     * @param condition ClaimCondition struct containing all condition fields.
     * @param merkleProof Array of hashes required to verify the account's eligibility.
     */
    function safeMintWithProof(
        address to,
        ERC721ClaimLib.ClaimCondition calldata condition,
        bytes32[] calldata merkleProof
    ) external payable returns (uint256) {
        if (AccessControlRecursiveLib._hasRoleRecursive(ERC721MintableAutoIdLib.ERC721_MINTER_ROLE, msg.sender)) {
            return ERC721MintableAutoIdLib.__unsafe_safeMint(to);
        } else {
            ERC721DropLib._claimWithProof(0, msg.sender, 1, condition, merkleProof);
            return ERC721MintableAutoIdLib.__unsafe_safeMint(to);
        }
    }

    /**
     * @notice Safely mint multiple tokens in a batch.
     * @param to The addresses to mint the tokens to.
     * @param condition ClaimCondition struct containing all condition fields.
     * @param merkleProof Array of hashes required to verify the account's eligibility.
     */
    function safeMintBatchWithProof(
        address[] memory to,
        ERC721ClaimLib.ClaimCondition calldata condition,
        bytes32[] calldata merkleProof
    ) external payable returns (uint256[] memory) {
        if (AccessControlRecursiveLib._hasRoleRecursive(ERC721MintableAutoIdLib.ERC721_MINTER_ROLE, msg.sender)) {
            return ERC721MintableAutoIdLib.__unsafe_safeMintBatch(to);
        } else {
            ERC721DropLib._claimWithProof(0, msg.sender, to.length, condition, merkleProof);
            return ERC721MintableAutoIdLib.__unsafe_safeMintBatch(to);
        }
    }

    /**
     * @notice Get the number of tokens already claimed by an account.
     * @param account Address of the account.
     * @return uint256 Number of tokens claimed.
     */
    function getAccountClaimed(address account) external view returns (uint256) {
        return ERC721DropLib._getDropConditionAccountClaimed(0, account);
    }

    /**
     * @notice Get the Merkle root.
     * @return bytes32 The Merkle root.
     */
    function getMerkleRoot() external view returns (bytes32) {
        return ERC721DropLib._getDropConditionMerkleRoot(0);
    }
}
