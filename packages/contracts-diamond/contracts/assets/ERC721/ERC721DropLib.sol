// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {MerkleProof} from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import {AccessControlRecursiveLib} from "../../access/AccessControlRecursiveLib.sol";

library ERC721DropLib {
    // TODO: use selector
    bytes32 internal constant ERC721_DROP_ROLE = bytes32("ERC721_DROP_ROLE");

    bytes32 constant ERC721_DROP_STORAGE =
        keccak256(abi.encode(uint256(keccak256("erc721.drop.storage")) - 1)) & ~bytes32(uint256(0xff));

    /// @custom:storage-location erc7201:erc721.drop.storage
    struct DropStorage {
        bytes32 merkleRoot;
        mapping(address => uint256) accountClaims;
    }

    // Errors
    error InvalidProof();
    error ClaimLimitExceeded(uint256 attempted, uint256 remaining);

    // Events
    event DropConditionSet(bytes32 indexed merkleRoot);
    event TokensClaimedWithProof(address indexed account, uint256 quantity, uint256 totalClaimed);

    function getData() internal pure returns (DropStorage storage ds) {
        bytes32 position = ERC721_DROP_STORAGE;
        assembly {
            ds.slot := position
        }
    }

    /**
     * @dev Set or update the Merkle root.
     * Requires the caller to have the `ERC721_DROP_ROLE`.
     *
     * @param root Merkle root for address-based claim limits.
     */
    function _setDropCondition(bytes32 root) internal {
        AccessControlRecursiveLib._checkRoleRecursive(ERC721_DROP_ROLE, msg.sender);

        DropStorage storage ds = getData();
        ds.merkleRoot = root;

        emit DropConditionSet(root);
    }

    /**
     * @dev Verify Merkle proof and update account claims.
     * This function uses `_checkMaxClaimForAccount` to validate the proof, and if the proof is valid, it updates the number of tokens claimed by the account.
     *
     * @param account Address of the account making the claim.
     * @param quantity Number of tokens the account wants to claim.
     * @param accountMaxClaim Maximum number of tokens the account is allowed to claim.
     * @param merkleProof Array of hashes required to verify the account's eligibility.
     */
    function _claimWithProof(
        address account,
        uint256 quantity,
        uint256 accountMaxClaim,
        bytes32[] calldata merkleProof
    ) internal {
        DropStorage storage ds = getData();

        if (!_checkMaxClaimForAccount(account, accountMaxClaim, merkleProof)) {
            revert InvalidProof();
        }

        uint256 remaining = accountMaxClaim - ds.accountClaims[account];
        if (quantity > remaining) {
            revert ClaimLimitExceeded(quantity, remaining);
        }

        ds.accountClaims[account] += quantity;

        emit TokensClaimedWithProof(account, quantity, ds.accountClaims[account]);
    }

    /**
     * @dev Check if a given account and its max claim are valid based on the stored Merkle root.
     * @param account Address of the account to check.
     * @param accountMaxClaim Maximum number of tokens the account can claim.
     * @param proof Array of hashes required to verify the account's eligibility.
     * @return boolean indicating if the proof is valid for the given account and max claim.
     */
    function _checkMaxClaimForAccount(
        address account,
        uint256 accountMaxClaim,
        bytes32[] calldata proof
    ) internal view returns (bool) {
        DropStorage storage ds = getData();

        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(account, accountMaxClaim))));

        return MerkleProof.verify(proof, ds.merkleRoot, leaf);
    }

    /**
     * @dev Get the number of tokens already claimed by an account.
     * @param account Address of the account.
     * @return uint256 Number of tokens claimed.
     */
    function _getAccountClaimed(address account) internal view returns (uint256) {
        DropStorage storage ds = getData();
        return ds.accountClaims[account];
    }
}
