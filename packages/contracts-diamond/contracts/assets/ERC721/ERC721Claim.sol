// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721ClaimLib} from "./ERC721ClaimLib.sol";
import {IERC721Claim} from "./IERC721Claim.sol";
import {AccessControlRecursiveLib} from "../../access/AccessControlRecursiveLib.sol";

/**
 * @dev Manage and claim ERC-721 tokens.
 */
contract ERC721Claim is IERC721Claim {
    bytes32 internal constant ERC721_CLAIM_ROLE = bytes32(IERC721Claim.setClaimCondition.selector);

    /**
     * @dev Sets or updates a claim condition.
     * Caller must have `ERC721_CLAIM_ROLE`.
     */
    function setClaimCondition(
        bytes32 conditionId,
        uint256 startTimestamp,
        uint256 endTimestamp,
        uint256 maxClaimableSupply,
        uint256 quantityLimitPerWallet,
        uint256 pricePerToken,
        address currency
    ) external {
        AccessControlRecursiveLib._checkRoleRecursive(ERC721_CLAIM_ROLE, msg.sender);

        ERC721ClaimLib.ClaimCondition memory condition = ERC721ClaimLib.ClaimCondition({
            startTimestamp: startTimestamp,
            endTimestamp: endTimestamp,
            maxClaimableSupply: maxClaimableSupply,
            supplyClaimed: 0,
            quantityLimitPerWallet: quantityLimitPerWallet,
            pricePerToken: pricePerToken,
            currency: currency
        });

        ERC721ClaimLib._setClaimCondition(conditionId, condition);
    }

    /**
     * @dev Removes a claim condition.
     */
    function removeClaimCondition(bytes32 conditionId) external {
        AccessControlRecursiveLib._checkRoleRecursive(ERC721_CLAIM_ROLE, msg.sender);
        ERC721ClaimLib._removeClaimCondition(conditionId);
    }

    /**
     * @dev Claims `quantity` tokens for `to` under `conditionId`.
     */
    function claimTokens(bytes32 conditionId, address to, uint256 quantity) external payable returns (uint256) {
        return ERC721ClaimLib._claim(conditionId, to, quantity);
    }

    /**
     * @dev Returns the details of a claim condition.
     */
    function getClaimCondition(bytes32 conditionId) external view returns (ERC721ClaimLib.ClaimCondition memory) {
        return ERC721ClaimLib._getClaimCondition(conditionId);
    }
}
