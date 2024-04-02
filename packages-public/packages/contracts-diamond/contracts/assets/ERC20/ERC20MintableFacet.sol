// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {IERC20Mintable} from "./IERC20Mintable.sol";
import {ERC20MintableLib} from "./ERC20MintableLib.sol";
import {ERC20Facet} from "./ERC20Facet.sol";

contract ERC20MintableFacet is IERC20Mintable, ERC20Facet {
    /**
     * @inheritdoc IERC20Mintable
     */
    function mint(address account, uint256 value) external {
        ERC20MintableLib._mint(account, value);
    }

    /**
     * @inheritdoc IERC20Mintable
     */
    function mintBatch(address[] memory accounts, uint256[] memory values) external {
        ERC20MintableLib._mintBatch(accounts, values);
    }
}
