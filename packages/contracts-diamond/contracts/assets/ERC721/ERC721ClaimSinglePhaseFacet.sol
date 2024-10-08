// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AccessControlRecursiveLib} from "../../access/AccessControlRecursiveLib.sol";

import {ERC721MintableAutoIdLib} from "./ERC721MintableAutoIdLib.sol";
import {ERC721ClaimLib} from "./ERC721ClaimLib.sol";

import {IERC721MintableAutoId} from "./IERC721MintableAutoId.sol";
import {IERC721ClaimSinglePhase} from "./IERC721ClaimSinglePhase.sol";

/**
 * @dev Manage and claim ERC-721 tokens.
 */
contract ERC721ClaimSinglePhaseFacet is IERC721ClaimSinglePhase {
    /**
     * @notice Must have `erc721.roles.mint`
     * @dev Allows `erc721.roles.mint` to mint NFTs
     * @param to address to
     */
    function mint(address to) external payable returns (uint256) {
        if (AccessControlRecursiveLib._hasRoleRecursive(ERC721MintableAutoIdLib.ERC721_MINTER_ROLE, msg.sender)) {
            // msg.sender has minter role, skip claim check
            return ERC721MintableAutoIdLib.__unsafe_mint(to);
        } else {
            // some other address, check claim
            ERC721ClaimLib._claim(0, msg.sender, 1);

            return ERC721MintableAutoIdLib.__unsafe_mint(to);
        }
    }

    function mintBatch(address[] memory to) external payable returns (uint256[] memory) {
        if (AccessControlRecursiveLib._hasRoleRecursive(ERC721MintableAutoIdLib.ERC721_MINTER_ROLE, msg.sender)) {
            // msg.sender has minter role, skip claim check
            return ERC721MintableAutoIdLib.__unsafe_mintBatch(to);
        } else {
            // some other address, check claim
            ERC721ClaimLib._claim(0, msg.sender, to.length);

            return ERC721MintableAutoIdLib.__unsafe_mintBatch(to);
        }
    }

    /**
     * @notice Must have `erc721.roles.mint`
     * @dev Allows caller to mint NFTs (safeMint)
     * @param to address to
     */
    function safeMint(address to) external payable returns (uint256) {
        if (AccessControlRecursiveLib._hasRoleRecursive(ERC721MintableAutoIdLib.ERC721_MINTER_ROLE, msg.sender)) {
            // msg.sender has minter role, skip claim check
            return ERC721MintableAutoIdLib.__unsafe_safeMint(to);
        } else {
            // some other address, check claim
            ERC721ClaimLib._claim(0, msg.sender, 1);

            return ERC721MintableAutoIdLib.__unsafe_safeMint(to);
        }
    }

    function safeMintBatch(address[] memory to) external payable returns (uint256[] memory) {
        if (AccessControlRecursiveLib._hasRoleRecursive(ERC721MintableAutoIdLib.ERC721_MINTER_ROLE, msg.sender)) {
            // msg.sender has minter role, skip claim check
            return ERC721MintableAutoIdLib.__unsafe_safeMintBatch(to);
        } else {
            // some other address, check claim
            ERC721ClaimLib._claim(0, msg.sender, to.length);

            return ERC721MintableAutoIdLib.__unsafe_safeMintBatch(to);
        }
    }

    function totalSupply() external view returns (uint256) {
        return ERC721MintableAutoIdLib._totalSupply();
    }

    /**
     * @dev Sets or updates a claim condition.
     * Caller must have `ERC721_CLAIM_ROLE`.
     */
    function setClaimCondition(ERC721ClaimLib.ClaimCondition memory condition) external {
        ERC721ClaimLib._setClaimCondition(0, condition);
    }

    /**
     * @dev Returns the details of a claim condition.
     */
    function getClaimCondition() external view returns (ERC721ClaimLib.ClaimCondition memory) {
        return ERC721ClaimLib._getClaimCondition(0);
    }

    /**
     * @notice Get the number of claims for a given wallet address.
     * @param account The wallet address to check.
     */
    function getWalletClaims(address account) external view returns (uint256) {
        return ERC721ClaimLib._getWalletClaims(0, account);
    }
}
