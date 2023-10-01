// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ClonesUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/ClonesUpgradeable.sol";
import {Create2Upgradeable} from "@openzeppelin/contracts-upgradeable/utils/Create2Upgradeable.sol";
import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

/**
 * @dev CREATE2 Factory Library
 * Helper functions to get deployed addresses of Create2 Factory
 */
contract Create2FactoryLib {
    using AddressUpgradeable for address;

    /**
     * @dev Compute salt based keccak256(salt, msgSender, initData)
     * Pass msgSender = address(0) if contract can be deployed by anyone
     * Pass initData = 0x if contract has no initialization
     */
    function _salt(bytes32 salt, address msgSender, bytes memory initData) internal pure returns (bytes32) {
        return keccak256(abi.encode(salt, msgSender, initData));
    }

    /**
     * @dev Get deployed implementation contract address, with optional initialization
     * @param create2FactoryAddress Address of Create2Factory
     * @param salt CREATE2 salt
     * @param msgSender added to salt if != address(0) to avoid other users to deploy clones on other chains
     * @param codeData CREATE2 contract bytecode
     * @param initData initialization data, sent atomically post deployment, used to re-compute salt if specified
     */
    function deployDeterministicAddress(
        address create2FactoryAddress,
        bytes32 salt,
        address msgSender,
        bytes memory codeData,
        bytes memory initData
    ) internal pure returns (address) {
        salt = _salt(salt, msgSender, initData);
        return Create2Upgradeable.computeAddress(salt, keccak256(codeData), create2FactoryAddress);
    }

    /**
     * @dev Get deployed clone contract address
     * @param create2FactoryAddress Address of Create2Factory
     * @param implementation implementation contract to DELEGATECALL to,, used to compute salt
     * @param salt CREATE2 salt
     * @param initData initialization data, sent atomically post deployment, used to compute salt
     * @param msgSender added to salt if != address(0) to avoid other users to deploy clones on other chains
     */
    function cloneDeterministicAddress(
        address create2FactoryAddress,
        address implementation,
        bytes32 salt,
        address msgSender,
        bytes memory initData
    ) internal pure returns (address) {
        salt = _salt(salt, msgSender, initData);
        return ClonesUpgradeable.predictDeterministicAddress(implementation, salt, create2FactoryAddress);
    }
}
