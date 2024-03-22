//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AccessControlRecursiveLib} from "../access/AccessControlRecursiveLib.sol";

/**
 * @dev Implements contract uri getter/setter
 */
library ContractURILib {
    bytes32 internal constant CONTRACT_URI_ROLE = keccak256("owlprotocol.roles.ContractURI.setContractURI");

    bytes32 constant CONTRACT_URI_STORAGE =
        keccak256(abi.encode(uint256(keccak256("owlprotocol.storage.ContractURI")) - 1)) & ~bytes32(uint256(0xff));

    /// @custom:storage-location erc7201:owlprotocol.storage.ContractURI
    struct ContractURIStorage {
        string value;
    }

    function getData() internal pure returns (ContractURIStorage storage ds) {
        bytes32 position = CONTRACT_URI_STORAGE;
        assembly {
            ds.slot := position
        }
    }

    function _init(string memory uri) internal {
        __unsafe_setContractURI(uri);
    }

    /**
     * @dev Returns collection-wide URI-accessible metadata
     */
    function _contractURI() internal view returns (string memory) {
        return getData().value;
    }

    function _setContractURI(string memory uri) internal {
        AccessControlRecursiveLib._checkRoleRecursive(CONTRACT_URI_ROLE, msg.sender);
        __unsafe_setContractURI(uri);
    }

    function __unsafe_setContractURI(string memory uri) internal {
        getData().value = uri;
    }
}
