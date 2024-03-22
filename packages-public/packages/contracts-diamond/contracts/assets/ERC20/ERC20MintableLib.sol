// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20Lib} from "./ERC20Lib.sol";
import {AccessControlRecursiveLib} from "../../access/AccessControlRecursiveLib.sol";

library ERC20MintableLib {
    bytes32 internal constant ERC20_MINTER_ROLE = keccak256("erc20.roles.mint");

    function _mint(address account, uint256 value) internal {
        AccessControlRecursiveLib._checkRoleRecursive(ERC20_MINTER_ROLE, msg.sender);
        __unsafe_mint(account, value);
    }

    function __unsafe_mint(address account, uint256 value) internal {
        ERC20Lib._mint(account, value);
    }
}
