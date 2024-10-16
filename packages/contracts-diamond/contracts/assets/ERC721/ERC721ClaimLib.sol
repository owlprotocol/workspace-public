// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {AccessControlRecursiveLib} from "../../access/AccessControlRecursiveLib.sol";
import {IERC721ClaimSinglePhase} from "./IERC721ClaimSinglePhase.sol";

library ERC721ClaimLib {
    bytes32 internal constant ERC721_CLAIM_ROLE = bytes32(IERC721ClaimSinglePhase.setClaimCondition.selector);

    bytes32 constant ERC721_CLAIM_STORAGE =
        keccak256(abi.encode(uint256(keccak256("erc721.claim.storage")) - 1)) & ~bytes32(uint256(0xff));

    /// @custom:storage-location erc7201:erc721.claim.storage
    struct ClaimCondition {
        uint256 startTimestamp;
        uint256 endTimestamp;
        uint256 maxClaimableSupply;
        uint256 quantityLimitPerWallet;
        uint256 pricePerToken;
        address currency;
    }

    struct ClaimConditionState {
        uint256 supplyClaimed;
        mapping(address => uint256) accountClaims;
    }

    struct ERC721ClaimStorage {
        mapping(bytes32 => ClaimCondition) claimConditions;
        mapping(bytes32 => ClaimConditionState) claimConditionStates;
    }

    // Errors
    error ClaimPeriodNotActive(uint256 currentTimestamp, uint256 startTimestamp, uint256 endTimestamp);
    error ExceedsMaxClaimableSupply(uint256 requested, uint256 maxClaimableSupply);
    error ExceedsWalletLimit(uint256 requested, uint256 remainingLimit);
    error InsufficientPayment(uint256 required, uint256 provided);
    error InvalidClaimCondition(string reason);

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
        if (newCondition.maxClaimableSupply == 0) {
            revert InvalidClaimCondition("maxClaimableSupply cannot be zero.");
        }

        ds.claimConditions[conditionId] = newCondition;
        emit ClaimConditionSet(conditionId, newCondition);
    }

    function _getClaimCondition(bytes32 conditionId) internal view returns (ClaimCondition memory) {
        ERC721ClaimStorage storage ds = getData();
        return ds.claimConditions[conditionId];
    }

    function _getAccountClaims(bytes32 conditionId, address account) internal view returns (uint256) {
        ERC721ClaimStorage storage ds = getData();
        return ds.claimConditionStates[conditionId].accountClaims[account];
    }

    function _checkClaim(
        ClaimCondition memory condition,
        ClaimConditionState storage state,
        uint256 quantity,
        address account
    ) internal view {
        if (!_isWithinClaimPeriod(condition)) {
            revert ClaimPeriodNotActive(block.timestamp, condition.startTimestamp, condition.endTimestamp);
        }
        if (!_hasSufficientSupply(state, condition, quantity)) {
            revert ExceedsMaxClaimableSupply(state.supplyClaimed + quantity, condition.maxClaimableSupply);
        }
        if (!_isWithinUserLimit(condition, quantity, state.accountClaims[account])) {
            uint256 remainingLimit = condition.quantityLimitPerWallet - state.accountClaims[account];
            revert ExceedsWalletLimit(quantity, remainingLimit);
        }
    }

    function _isWithinClaimPeriod(ClaimCondition memory condition) internal view returns (bool) {
        return block.timestamp >= condition.startTimestamp && block.timestamp <= condition.endTimestamp;
    }

    function _hasSufficientSupply(
        ClaimConditionState storage state,
        ClaimCondition memory condition,
        uint256 quantity
    ) internal view returns (bool) {
        return state.supplyClaimed + quantity <= condition.maxClaimableSupply;
    }

    function _isWithinUserLimit(
        ClaimCondition memory condition,
        uint256 quantity,
        uint256 userClaimed
    ) internal pure returns (bool) {
        return userClaimed + quantity <= condition.quantityLimitPerWallet;
    }

    function _updateClaim(ClaimConditionState storage state, address account, uint256 quantity) internal {
        state.accountClaims[account] += quantity;
        state.supplyClaimed += quantity;
    }

    function _payClaim(ClaimCondition memory condition, address account, uint256 quantity) internal {
        if (condition.pricePerToken > 0) {
            uint256 totalPayment = condition.pricePerToken * quantity;

            require(msg.value == totalPayment, "Incorrect payment value sent.");

            if (condition.currency == address(0)) {
                if (msg.value < totalPayment) {
                    revert InsufficientPayment(totalPayment, msg.value);
                }
            } else {
                IERC20(condition.currency).transferFrom(account, address(this), totalPayment);
            }
        }
    }

    function _claim(bytes32 conditionId, address account, uint256 quantity) internal returns (uint256) {
        ERC721ClaimStorage storage ds = getData();
        ClaimCondition memory condition = ds.claimConditions[conditionId];
        ClaimConditionState storage state = ds.claimConditionStates[conditionId];

        _checkClaim(condition, state, quantity, account);
        _updateClaim(state, account, quantity);
        _payClaim(condition, account, quantity);

        emit TokensClaimed(account, conditionId, quantity);
        return state.accountClaims[account];
    }
}
