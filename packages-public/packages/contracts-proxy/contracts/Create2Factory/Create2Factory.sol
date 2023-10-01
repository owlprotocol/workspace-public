// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ClonesUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/ClonesUpgradeable.sol";
import {Create2Upgradeable} from "@openzeppelin/contracts-upgradeable/utils/Create2Upgradeable.sol";
import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

import {ICreate2Factory} from "./ICreate2Factory.sol";

/**
 * @dev CREATE2 Factory
 * Deploys contracts deterministically, adds optional salt that can be tied to msg.sender address
 */
contract Create2Factory is ICreate2Factory {
    error InvalidSender(address expected, address actual);
    error CodeDataInitDataUnequalLength(uint256 codeDataLength, uint256 initDataLength);

    /**
     * @dev Compute salt based keccak256(salt, msgSender, initData)
     * Pass msgSender = address(0) if contract can be deployed by anyone
     * Pass initData = 0x if contract has no initialization
     */
    function _salt(bytes32 salt, address msgSender, bytes calldata initData) internal pure returns (bytes32) {
        return keccak256(abi.encode(salt, msgSender, initData));
    }

    /**
     * @inheritdoc ICreate2Factory
     */
    function deployDeterministic(
        bytes32 salt,
        address msgSender,
        bytes[] calldata codeData,
        bytes[] calldata initData
    ) external returns (address[] memory) {
        if (msgSender != address(0) && msgSender != msg.sender) revert InvalidSender(msgSender, msg.sender);
        if (codeData.length != initData.length) revert CodeDataInitDataUnequalLength(codeData.length, initData.length);

        address[] memory contractAddresses = new address[](codeData.length);

        for (uint256 i = 0; i < codeData.length; i++) {
            bytes32 deploySalt = _salt(salt, msgSender, initData[i]);
            contractAddresses[i] = Create2Upgradeable.deploy(0, deploySalt, codeData[i]);

            if (initData[i].length > 0) {
                //Deploy and initialize
                AddressUpgradeable.functionCall(
                    contractAddresses[i],
                    initData[i],
                    "Create2Factory: Failed to call contract"
                );
            }
        }

        return contractAddresses;
    }
}
