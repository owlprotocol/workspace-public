// Store address + maxCuserClaim
// prove data
// update on-chain tracking

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {MerkleProof} from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

library ERC721DropLib {
    /// @custom:storage-location erc7201:erc721.drop.storage
    struct DropStorage {
        bytes32 merkleRoot;
        mapping(address => uint256) maxUserClaim;
        mapping(address => uint256) userClaims;
    }

    // Errors
    error MismatchedArrays();
    error InvalidProof();
    error ClaimLimitExceeded(uint256 attempted, uint256 remaining);
    error ZeroAddress();

    // Events
    event DropConditionSet(bytes32 indexed merkleRoot, address[] addresses, uint256[] maxClaims);
    event TokensClaimedWithProof(address indexed user, uint256 quantity, uint256 totalClaimed);

    bytes32 internal constant DROP_STORAGE_POSITION = keccak256("erc721.drop.storage");

    function getData() internal pure returns (DropStorage storage ds) {
        bytes32 position = DROP_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }

    /**
     * @dev Set or update the Merkle root and claim limits.
     * Each leaf node in the Merkle tree is constructed as:
     *
     * `keccak256(bytes.concat(keccak256(abi.encode(address, maxUserClaim))))`
     *
     * where:
     * - `address` is the user's wallet address.
     * - `maxUserClaim` is the maximum number of tokens the user can claim.
     *
     * The Merkle tree should be constructed using OpenZeppelin's `merkle-tree` tool
     * to ensure compatibility.
     *
     * @param root Merkle root for address-based claim limits.
     * @param addresses Array of user addresses to be included in the Merkle tree.
     * @param maxClaims Array of maximum claim amounts corresponding to each address.
     */
    function _setDropCondition(bytes32 root, address[] calldata addresses, uint256[] calldata maxClaims) internal {
        if (addresses.length != maxClaims.length) revert MismatchedArrays();

        DropStorage storage ds = getData();
        ds.merkleRoot = root;

        for (uint256 i = 0; i < addresses.length; i++) {
            if (addresses[i] == address(0)) revert ZeroAddress();
            ds.maxUserClaim[addresses[i]] = maxClaims[i];
        }

        emit DropConditionSet(root, addresses, maxClaims);
    }

    /**
     * @dev Verify Merkle proof and update user claims.
     * This function checks if the provided Merkle proof is valid by constructing the leaf node
     * using `keccak256(bytes.concat(keccak256(abi.encode(user, ds.maxUserClaim[user]))))`.
     * If the proof is valid, it updates the number of tokens claimed by the user.
     *
     * @param user Address of the user making the claim.
     * @param quantity Number of tokens the user wants to claim.
     * @param merkleProof Array of hashes required to verify the user's eligibility.
     */
    function _claimWithProof(address user, uint256 quantity, bytes32[] calldata merkleProof) internal {
        DropStorage storage ds = getData();

        // Construct the leaf node using double-hashing pattern for verification
        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(user, ds.maxUserClaim[user]))));

        // Verify the Merkle proof against the root and the constructed leaf node
        if (!MerkleProof.verify(merkleProof, ds.merkleRoot, leaf)) {
            revert InvalidProof();
        }

        uint256 remaining = ds.maxUserClaim[user] - ds.userClaims[user];
        if (quantity > remaining) {
            revert ClaimLimitExceeded(quantity, remaining);
        }

        ds.userClaims[user] += quantity;

        emit TokensClaimedWithProof(user, quantity, ds.userClaims[user]);
    }

    /**
     * @dev Get the maximum claim limit for a user.
     * @param user Address of the user.
     * @return uint256 Maximum tokens the user can claim.
     */
    function _getMaxClaimForUser(address user) internal view returns (uint256) {
        DropStorage storage ds = getData();
        return ds.maxUserClaim[user];
    }

    /**
     * @dev Get the number of tokens already claimed by a user.
     * @param user Address of the user.
     * @return uint256 Number of tokens claimed.
     */
    function _getUserClaimed(address user) internal view returns (uint256) {
        DropStorage storage ds = getData();
        return ds.userClaims[user];
    }
}
