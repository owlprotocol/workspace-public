// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {MerkleProof} from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import {AccessControlRecursiveLib} from "../../access/AccessControlRecursiveLib.sol";
import {IERC721DropSinglePhase} from "./IERC721DropSinglePhase.sol";
import {ERC721ClaimLib} from "./ERC721ClaimLib.sol";

library ERC721DropLib {
    using ERC721ClaimLib for ERC721ClaimLib.ClaimCondition;

    bytes32 internal constant ERC721_DROP_ROLE = bytes32(IERC721DropSinglePhase.setDropCondition.selector);

    bytes32 constant ERC721_DROP_STORAGE =
        keccak256(abi.encode(uint256(keccak256("erc721.drop.storage")) - 1)) & ~bytes32(uint256(0xff));

    /// @custom:storage-location erc7201:erc721.drop.storage
    struct DropCondition {
        bytes32 merkleRoot;
    }

    struct DropConditionState {
        mapping(address => uint256) accountClaims;
    }

    struct DropStorage {
        mapping(bytes32 => DropCondition) dropConditions;
        mapping(bytes32 => DropConditionState) dropConditionStates;
    }

    // Errors
    error InvalidProof();
    error DropConditionNotFound(bytes32 dropConditionId);

    // Events
    event DropConditionSet(bytes32 indexed dropConditionId, bytes32 merkleRoot);
    event TokensClaimedWithProof(
        bytes32 indexed dropConditionId,
        address indexed account,
        uint256 quantity,
        uint256 totalClaimed
    );

    function getData() internal pure returns (DropStorage storage ds) {
        bytes32 position = ERC721_DROP_STORAGE;
        assembly {
            ds.slot := position
        }
    }

    /**
     * @dev Set or update a drop condition.
     * Requires the caller to have the `ERC721_DROP_ROLE`.
     *
     * @param dropConditionId Unique ID for the drop condition.
     * @param root Merkle root for address-based claim limits.
     */
    function _setDropCondition(bytes32 dropConditionId, bytes32 root) internal {
        AccessControlRecursiveLib._checkRoleRecursive(ERC721_DROP_ROLE, msg.sender);

        DropStorage storage ds = getData();
        DropCondition storage condition = ds.dropConditions[dropConditionId];
        condition.merkleRoot = root;

        emit DropConditionSet(dropConditionId, root);
    }

    /**
     * @dev Verify Merkle proof and update account claims for a specific drop condition.
     *
     * @param dropConditionId The ID of the drop condition.
     * @param account Address of the account making the claim.
     * @param quantity Number of tokens the account wants to claim.
     * @param condition Claim condition struct containing all condition fields.
     * @param merkleProof Array of hashes required to verify the account's eligibility.
     */
    function _claimWithProof(
        bytes32 dropConditionId,
        address account,
        uint256 quantity,
        ERC721ClaimLib.ClaimCondition calldata condition,
        bytes32[] calldata merkleProof
    ) internal {
        DropStorage storage ds = getData();
        DropCondition storage drop = ds.dropConditions[dropConditionId];
        DropConditionState storage state = ds.dropConditionStates[dropConditionId];

        if (drop.merkleRoot == bytes32(0)) {
            revert DropConditionNotFound(dropConditionId);
        }

        if (!_verifyAccountClaimCondition(drop.merkleRoot, account, condition, merkleProof)) {
            revert InvalidProof();
        }

        condition._checkClaim(state, quantity, account);
        condition._payClaim(account, quantity);
        state.accountClaims[account] += quantity;

        emit TokensClaimedWithProof(dropConditionId, account, quantity, state.accountClaims[account]);
    }

    /**
     * @dev Verify the account's conditions using the provided Merkle proof.
     * @param merkleRoot Merkle root for the condition.
     * @param account Address of the account to check.
     * @param condition ClaimCondition struct to validate.
     * @param proof Array of hashes required to verify the account's eligibility.
     * @return boolean indicating if the proof is valid.
     */
    function _verifyAccountClaimCondition(
        bytes32 merkleRoot,
        address account,
        ERC721ClaimLib.ClaimCondition calldata condition,
        bytes32[] calldata proof
    ) internal pure returns (bool) {
        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(account, condition))));

        return MerkleProof.verify(proof, merkleRoot, leaf);
    }

    /**
     * @notice Retrieve the Merkle root of a specific drop condition.
     * @param dropConditionId The ID of the drop condition.
     * @return bytes32 Merkle root of the drop condition.
     */
    function _getDropConditionMerkleRoot(bytes32 dropConditionId) internal view returns (bytes32) {
        DropStorage storage ds = getData();
        return ds.dropConditions[dropConditionId].merkleRoot;
    }

    /**
     * @dev Get the number of tokens already claimed by an account for a specific drop condition.
     * @param dropConditionId The ID of the drop condition.
     * @param account Address of the account.
     * @return uint256 Number of tokens claimed.
     */
    function _getDropConditionAccountClaimed(bytes32 dropConditionId, address account) internal view returns (uint256) {
        DropStorage storage ds = getData();
        return ds.dropConditionStates[dropConditionId].accountClaims[account];
    }
}
