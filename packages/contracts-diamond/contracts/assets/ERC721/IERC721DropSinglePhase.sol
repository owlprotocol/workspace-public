// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721ClaimLib} from "./ERC721ClaimLib.sol";

interface IERC721DropSinglePhase {
    event DropConditionSet(bytes32 indexed dropConditionId, bytes32 merkleRoot);
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
     * @notice Mint a single token with proof.
     * @param to Address to mint the token to.
     * @param condition ClaimCondition struct containing all condition fields.
     * @param merkleProof Merkle proof array.
     */
    function mintWithProof(
        address to,
        ERC721ClaimLib.ClaimCondition calldata condition,
        bytes32[] calldata merkleProof
    ) external payable returns (uint256);

    /**
     * @notice Mint multiple tokens with proof.
     * @param to Array of addresses to mint tokens to.
     * @param condition ClaimCondition struct containing all condition fields.
     * @param merkleProof Merkle proof array.
     */
    function mintBatchWithProof(
        address[] memory to,
        ERC721ClaimLib.ClaimCondition calldata condition,
        bytes32[] calldata merkleProof
    ) external payable returns (uint256[] memory);

    /**
     * @notice Safely mint a single token with proof.
     * @param to Address to mint the token to.
     * @param condition ClaimCondition struct containing all condition fields.
     * @param merkleProof Merkle proof array.
     */
    function safeMintWithProof(
        address to,
        ERC721ClaimLib.ClaimCondition calldata condition,
        bytes32[] calldata merkleProof
    ) external payable returns (uint256);

    /**
     * @notice Safely mint multiple tokens with proof.
     * @param to Array of addresses to mint tokens to.
     * @param condition ClaimCondition struct containing all condition fields.
     * @param merkleProof Merkle proof array.
     */
    function safeMintBatchWithProof(
        address[] memory to,
        ERC721ClaimLib.ClaimCondition calldata condition,
        bytes32[] calldata merkleProof
    ) external payable returns (uint256[] memory);

    /**
     * @notice Get the number of tokens already claimed by an account.
     * @param account Address of the account.
     * @return uint256 Number of tokens claimed.
     */
    function getAccountClaimed(address account) external view returns (uint256);

    /**
     * @notice Get the Merkle root.
     * @return bytes32 The Merkle root.
     */
    function getMerkleRoot() external view returns (bytes32);
}
