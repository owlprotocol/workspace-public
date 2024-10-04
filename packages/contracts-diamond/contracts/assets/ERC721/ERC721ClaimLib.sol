// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {AccessControlRecursiveLib} from "../../access/AccessControlRecursiveLib.sol";
import {IERC721Claim} from "./IERC721Claim.sol";

library ERC721ClaimLib {
    bytes32 internal constant ERC721_CLAIM_ROLE = bytes32(IERC721Claim.setClaimCondition.selector);

    bytes32 constant ERC721_CLAIM_STORAGE =
        keccak256(abi.encode(uint256(keccak256("erc721.claim.storage")) - 1)) & ~bytes32(uint256(0xff));

    struct ClaimCondition {
        uint256 startTimestamp;
        uint256 endTimestamp;
        uint256 maxClaimableSupply;
        uint256 supplyClaimed;
        uint256 quantityLimitPerWallet;
        uint256 pricePerToken;
        address currency;
    }

    struct ERC721ClaimStorage {
        mapping(bytes32 => ClaimCondition) claimConditions;
        mapping(bytes32 => mapping(address => uint256)) walletClaims;
        uint256 totalClaims;
    }

    // Errors
    error ConditionDoesNotExist(bytes32 conditionId);
    error ClaimPeriodNotActive(uint256 currentTimestamp, uint256 startTimestamp, uint256 endTimestamp);
    error ExceedsMaxClaimableSupply(uint256 requested, uint256 maxClaimableSupply);
    error ExceedsWalletLimit(uint256 requested, uint256 remainingLimit);
    error InsufficientPayment(uint256 required, uint256 provided);
    error InvalidCurrencyTransfer(address currency, uint256 required, uint256 provided);

    // Events
    event ClaimConditionSet(bytes32 indexed conditionId, ClaimCondition condition);
    event TokensClaimed(address indexed claimant, bytes32 indexed conditionId, uint256 quantity);

    function getData() internal pure returns (ERC721ClaimStorage storage ds) {
        bytes32 position = ERC721_CLAIM_STORAGE;
        assembly {
            ds.slot := position
        }
    }

    function _setClaimCondition(bytes32 conditionId, ClaimCondition memory newCondition) internal {
        AccessControlRecursiveLib._checkRoleRecursive(ERC721_CLAIM_ROLE, msg.sender);
        ERC721ClaimStorage storage ds = getData();

        if (_conditionExists(conditionId, ds)) {
            ClaimCondition storage existingCondition = ds.claimConditions[conditionId];
            newCondition.supplyClaimed = existingCondition.supplyClaimed;
        }

        ds.claimConditions[conditionId] = newCondition;
        emit ClaimConditionSet(conditionId, newCondition);
    }

    function _removeClaimCondition(bytes32 conditionId) internal {
        AccessControlRecursiveLib._checkRoleRecursive(ERC721_CLAIM_ROLE, msg.sender);
        ERC721ClaimStorage storage ds = getData();

        if (!_conditionExists(conditionId, ds)) {
            revert ConditionDoesNotExist(conditionId);
        }

        delete ds.claimConditions[conditionId];
    }

    function _getClaimCondition(bytes32 conditionId) internal view returns (ClaimCondition memory) {
        ERC721ClaimStorage storage ds = getData();

        if (!_conditionExists(conditionId, ds)) {
            revert ConditionDoesNotExist(conditionId);
        }

        return ds.claimConditions[conditionId];
    }

    function _conditionExists(bytes32 conditionId, ERC721ClaimStorage storage ds) internal view returns (bool) {
        return ds.claimConditions[conditionId].startTimestamp != 0;
    }

    function _verifyClaim(ClaimCondition memory condition, uint256 quantity, uint256 userClaimed) internal view {
        if (!_isWithinClaimPeriod(condition)) {
            revert ClaimPeriodNotActive(block.timestamp, condition.startTimestamp, condition.endTimestamp);
        }
        if (!_hasSufficientSupply(condition, quantity)) {
            revert ExceedsMaxClaimableSupply(condition.supplyClaimed + quantity, condition.maxClaimableSupply);
        }
        if (!_isWithinUserLimit(condition, quantity, userClaimed)) {
            uint256 remainingLimit = condition.quantityLimitPerWallet - userClaimed;
            revert ExceedsWalletLimit(quantity, remainingLimit);
        }
    }

    function _isWithinClaimPeriod(ClaimCondition memory condition) internal view returns (bool) {
        return block.timestamp >= condition.startTimestamp && block.timestamp <= condition.endTimestamp;
    }

    function _hasSufficientSupply(ClaimCondition memory condition, uint256 quantity) internal pure returns (bool) {
        return condition.supplyClaimed + quantity <= condition.maxClaimableSupply;
    }

    function _isWithinUserLimit(
        ClaimCondition memory condition,
        uint256 quantity,
        uint256 userClaimed
    ) internal pure returns (bool) {
        return userClaimed + quantity <= condition.quantityLimitPerWallet;
    }

    function _preClaim(
        ClaimCondition storage condition,
        ERC721ClaimStorage storage ds,
        bytes32 conditionId,
        address to,
        uint256 quantity
    ) internal {
        _verifyClaim(condition, quantity, ds.walletClaims[conditionId][to]);

        ds.walletClaims[conditionId][to] += quantity;
        condition.supplyClaimed += quantity;
        ds.totalClaims += quantity;
    }

    function _processPayment(ClaimCondition memory condition, uint256 quantity) internal {
        uint256 totalPayment = condition.pricePerToken * quantity;

        if (condition.currency == address(0)) {
            if (msg.value < totalPayment) {
                revert InsufficientPayment(totalPayment, msg.value);
            }

            if (msg.value > totalPayment) {
                payable(msg.sender).transfer(msg.value - totalPayment);
            }
        } else {
            IERC20(condition.currency).transferFrom(msg.sender, address(this), totalPayment);
        }
    }

    function _claim(bytes32 conditionId, address to, uint256 quantity) internal returns (uint256) {
        ERC721ClaimStorage storage ds = getData();
        ClaimCondition storage condition = ds.claimConditions[conditionId];

        _preClaim(condition, ds, conditionId, to, quantity);
        _processPayment(condition, quantity);

        emit TokensClaimed(to, conditionId, quantity);
        return ds.walletClaims[conditionId][to];
    }
}
