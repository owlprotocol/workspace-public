// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20Mintable} from "./IERC20Mintable.sol";
import {ERC20Lib} from "./ERC20Lib.sol";
import {AccessControlRecursiveLib} from "../../access/AccessControlRecursiveLib.sol";

library ERC20MintableLib {
    bytes32 internal constant ERC20_MINTER_ROLE = bytes32(IERC20Mintable.mint.selector);
    error ERC20InvalidArrayLength(uint256 accountsLength, uint256 valuesLength);

    function _mint(address account, uint256 value) internal {
        AccessControlRecursiveLib._checkRoleRecursive(ERC20_MINTER_ROLE, msg.sender);
        __unsafe_mint(account, value);
    }

    function __unsafe_mint(address account, uint256 value) internal {
        ERC20Lib._mint(account, value);
    }

    function _mintBatch(address[] memory accounts, uint256[] memory values) internal {
        AccessControlRecursiveLib._checkRoleRecursive(ERC20_MINTER_ROLE, msg.sender);
        __unsafe_mintBatch(accounts, values);
    }

    function __unsafe_mintBatch(address[] memory accounts, uint256[] memory values) internal {
        if (accounts.length != values.length) {
            revert ERC20InvalidArrayLength(accounts.length, values.length);
        }

        for (uint256 i = 0; i < accounts.length; i++) {
            ERC20Lib._mint(accounts[i], values[i]);
        }
    }
}
