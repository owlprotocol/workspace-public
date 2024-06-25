//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {DiamondLib} from "../Diamond/DiamondLib.sol";

library MulticallLib {
    /**
     * @dev Implements multicall feature for diamonds, unlike other implementations that make
     * an external call to `address(this)`, we use DiamondLib._fallback, which reads the
     * facet address for the selector.
     */
    function _multicall(bytes[] calldata data) internal returns (bytes[] memory) {
        bytes[] memory results = new bytes[](data.length);

        for (uint256 i = 0; i < data.length; i++) {
            results[i] = DiamondLib._fallback(data[i]);
        }

        return results;
    }
}
