//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IMulticall} from "./IMulticall.sol";
import {MulticallLib} from "./MulticallLib.sol";

contract MulticallFacet is IMulticall {
    /**
     * @inheritdoc IMulticall
     */
    function multicall(bytes[] calldata data) external returns (bytes[] memory results) {
        return MulticallLib._multicall(data);
    }
}
