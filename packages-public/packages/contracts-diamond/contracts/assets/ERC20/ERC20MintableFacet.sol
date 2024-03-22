// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {IERC20Mintable} from "./IERC20Mintable.sol";
import {ERC20MintableLib} from "./ERC20MintableLib.sol";
import {ERC20Facet} from "./ERC20Facet.sol";

contract ERC20MintableFacet is IERC20Mintable, ERC20Facet {
    /***** MINTING *****/
    /**
     * @notice Must have `erc20.roles.mint`
     * @dev Allows `erc20.roles.mint` to mint tokens
     * @param to address to
     * @param value value to mint
     */
    function mint(address to, uint256 value) external {
        ERC20MintableLib._mint(to, value);
    }
}
