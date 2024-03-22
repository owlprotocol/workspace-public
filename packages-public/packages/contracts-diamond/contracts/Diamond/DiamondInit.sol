// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC165Lib} from "../ERC165/ERC165Lib.sol";
import {IDiamondCut} from "./IDiamondCut.sol";
import {IDiamondLoupe} from "./IDiamondLoupe.sol";
import {DiamondLib} from "./DiamondLib.sol";

contract DiamondInit {
    function initialize() external {
        ERC165Lib.__unsafe_registerInterface(type(IDiamondCut).interfaceId, true);
        ERC165Lib.__unsafe_registerInterface(type(IDiamondLoupe).interfaceId, true);
    }
}
