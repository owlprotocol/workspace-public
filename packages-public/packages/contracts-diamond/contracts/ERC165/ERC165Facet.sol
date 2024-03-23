//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC165Register} from "./IERC165Register.sol";
import {ERC165Lib} from "./ERC165Lib.sol";
import {AccessControlRecursiveLib} from "../access/AccessControlRecursiveLib.sol";

contract ERC165Facet is IERC165Register {
    function supportsInterface(bytes4 interfaceId) external view returns (bool) {
        return ERC165Lib._supportsInterface(interfaceId);
    }

    function registerInterface(bytes4 interfaceId, bool supported) external {
        ERC165Lib._registerInterface(interfaceId, supported);
    }
}
