// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {AccessControlRecursive} from "../../plugins/AccessControl/AccessControlRecursive.sol";
import {ERC1820RegistryConsumer} from "../../common/ERC1820/ERC1820RegistryConsumer.sol";
import {StorageSlotUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/StorageSlotUpgradeable.sol";

import {ITokenConsumer} from "./ITokenConsumer.sol";

/**
 * @dev Contract that stores a token address
 */
abstract contract TokenConsumerAbstract is AccessControlRecursive, ERC1820RegistryConsumer, ITokenConsumer {
    using StorageSlotUpgradeable for bytes32;

    bytes32 internal constant TOKEN_ROLE = keccak256("TOKEN_ROLE");
    bytes32 internal constant _TOKEN_SLOT = keccak256("TOKEN");

    function __TokenConsumerAbstract_init_unchained(address token) internal {
        _setToken(token);

        if (_registryExists()) {
            _registerInterface(type(ITokenConsumer).interfaceId);
        }
    }

    function token() public view returns (address) {
        return _TOKEN_SLOT.getAddressSlot().value;
    }

    function setToken(address token) external onlyRoleRecursive(TOKEN_ROLE) {
        _setToken(token);
    }

    function _setToken(address token) internal {
        _TOKEN_SLOT.getAddressSlot().value = token;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(AccessControlUpgradeable, ERC1820RegistryConsumer) returns (bool) {
        return ERC1820RegistryConsumer.supportsInterface(interfaceId);
    }
}
