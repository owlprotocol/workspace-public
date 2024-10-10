// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AccessControlRecursiveLib} from "../../access/AccessControlRecursiveLib.sol";

import {IERC721DropSinglePhase} from "./IERC721DropSinglePhase.sol";
import {IERC721MintableAutoId} from "./IERC721MintableAutoId.sol";

import {ERC721DropLib} from "./ERC721DropLib.sol";
import {ERC721MintableAutoIdLib} from "./ERC721MintableAutoIdLib.sol";

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
     * @notice Mint a single token to the specified address.
     * @param to The address to mint the token to.
     * @param maxClaimable The maximum number of tokens the account can claim.
     * @param merkleProof Array of hashes required to verify the account's eligibility.
     */
    function mintWithProof(
        address to,
        uint256 maxClaimable,
        bytes32[] calldata merkleProof
    ) external returns (uint256) {
        if (AccessControlRecursiveLib._hasRoleRecursive(ERC721MintableAutoIdLib.ERC721_MINTER_ROLE, msg.sender)) {
            return ERC721MintableAutoIdLib.__unsafe_mint(to);
        } else {
            ERC721DropLib._claimWithProof(0, msg.sender, 1, maxClaimable, merkleProof);
            return ERC721MintableAutoIdLib.__unsafe_mint(to);
        }
    }

    /**
     * @notice Mint multiple tokens in a batch.
     * @param to The addresses to mint the tokens to.
     * @param maxClaimable The maximum number of tokens the account can claim.
     * @param merkleProof Array of hashes required to verify the account's eligibility.
     */
    function mintBatchWithProof(
        address[] memory to,
        uint256 maxClaimable,
        bytes32[] calldata merkleProof
    ) external returns (uint256[] memory) {
        if (AccessControlRecursiveLib._hasRoleRecursive(ERC721MintableAutoIdLib.ERC721_MINTER_ROLE, msg.sender)) {
            return ERC721MintableAutoIdLib.__unsafe_mintBatch(to);
        } else {
            ERC721DropLib._claimWithProof(0, msg.sender, to.length, maxClaimable, merkleProof);
            return ERC721MintableAutoIdLib.__unsafe_mintBatch(to);
        }
    }

    /**
     * @notice Safely mint a single token to the specified address.
     * @param to The address to mint the token to.
     * @param maxClaimable The maximum number of tokens the account can claim.
     * @param merkleProof Array of hashes required to verify the account's eligibility.
     */
    function safeMintWithProof(
        address to,
        uint256 maxClaimable,
        bytes32[] calldata merkleProof
    ) external returns (uint256) {
        if (AccessControlRecursiveLib._hasRoleRecursive(ERC721MintableAutoIdLib.ERC721_MINTER_ROLE, msg.sender)) {
            return ERC721MintableAutoIdLib.__unsafe_safeMint(to);
        } else {
            ERC721DropLib._claimWithProof(0, msg.sender, 1, maxClaimable, merkleProof);
            return ERC721MintableAutoIdLib.__unsafe_safeMint(to);
        }
    }

    /**
     * @notice Safely mint multiple tokens in a batch.
     * @param to The addresses to mint the tokens to.
     * @param maxClaimable The maximum number of tokens the account can claim.
     * @param merkleProof Array of hashes required to verify the account's eligibility.
     */
    function safeMintBatchWithProof(
        address[] memory to,
        uint256 maxClaimable,
        bytes32[] calldata merkleProof
    ) external returns (uint256[] memory) {
        if (AccessControlRecursiveLib._hasRoleRecursive(ERC721MintableAutoIdLib.ERC721_MINTER_ROLE, msg.sender)) {
            return ERC721MintableAutoIdLib.__unsafe_safeMintBatch(to);
        } else {
            ERC721DropLib._claimWithProof(0, msg.sender, to.length, maxClaimable, merkleProof);
            return ERC721MintableAutoIdLib.__unsafe_safeMintBatch(to);
        }
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
     * @param merkleRoot The Merkle root to use for verification.
     * @param account Address of the account to check.
     * @param accountMaxClaim Maximum number of tokens the account can claim.
     * @param proof Array of hashes required to verify the account's eligibility.
     * @return boolean indicating if the proof is valid for the given account and max claim.
     */
    function checkMaxClaimForAccount(
        bytes32 merkleRoot,
        address account,
        uint256 accountMaxClaim,
        bytes32[] calldata proof
    ) external pure returns (bool) {
        return ERC721DropLib._verifyAccountMaxClaim(merkleRoot, account, accountMaxClaim, proof);
    }
}
