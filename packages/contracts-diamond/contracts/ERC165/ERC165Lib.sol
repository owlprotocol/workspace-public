//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AccessControlRecursiveLib} from "../access/AccessControlRecursiveLib.sol";
import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import {IERC165Register} from "./IERC165Register.sol";

library ERC165Lib {
    bytes32 internal constant ERC165_ROLE = bytes32(IERC165Register.registerInterface.selector);

    bytes32 constant ERC165_STORAGE =
        keccak256(abi.encode(uint256(keccak256("erc165.storage")) - 1)) & ~bytes32(uint256(0xff));

    /// @custom:storage-location erc7201:erc165.storage
    struct ERC165Storage {
        mapping(bytes32 interfaceId => bool) _supportedInterfaces;
    }

    function getData() internal pure returns (ERC165Storage storage ds) {
        bytes32 position = ERC165_STORAGE;
        assembly {
            ds.slot := position
        }
    }

    function _init() internal {
        __unsafe_registerInterface(type(IERC165).interfaceId, true);
    }

    function _registerInterface(bytes4 interfaceId, bool supported) internal {
        AccessControlRecursiveLib._checkRoleRecursive(ERC165Lib.ERC165_ROLE, msg.sender);
        __unsafe_registerInterface(interfaceId, supported);
    }

    function __unsafe_registerInterface(bytes4 interfaceId, bool supported) internal {
        getData()._supportedInterfaces[interfaceId] = supported;
    }

    function _supportsInterface(bytes4 interfaceId) internal view returns (bool) {
        return getData()._supportedInterfaces[interfaceId];
    }
}
