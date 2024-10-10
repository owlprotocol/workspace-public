// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";
import {Create2} from "@openzeppelin/contracts/utils/Create2.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";

import {ICreate2Factory} from "./ICreate2Factory.sol";

/**
 * @dev CREATE2 Factory
 * Deploys contracts deterministically with `msg.sender` checks and initData.
 * Salt is computed as keccak256 of:
 * - `salt`
 * - `msgSender` (address(0) or `msg.sender`)
 * - `initData` post-deploy init call
 */
contract Create2Factory is ICreate2Factory {
    error InvalidSender(address expected, address actual);

    /**
     * @dev Compute salt based keccak256(salt, msgSender, initData)
     * Pass msgSender = address(0) if contract can be deployed by anyone
     * Pass initData = 0x if contract has no initialization
     */
    function _salt(address msgSender, bytes32 salt, bytes memory initData) internal pure returns (bytes32) {
        return keccak256(abi.encode(msgSender, salt, initData));
    }

    /**
     * @inheritdoc ICreate2Factory
     */
    function create(address msgSender, Contract[] calldata contracts) external returns (address[] memory) {
        if (msgSender != address(0) && msgSender != msg.sender) revert InvalidSender(msgSender, msg.sender);

        address[] memory contractAddresses = new address[](contracts.length);

        for (uint256 i = 0; i < contracts.length; i++) {
            // Compute keccak256(abi.encode(msgSender, salt, initData));
            bytes32 salt = _salt(msgSender, contracts[i].salt, contracts[i].initData);
            bytes32 bytecodeHash = keccak256(contracts[i].bytecode);
            // Compute counterfactual address
            address contractAddress = Create2.computeAddress(salt, bytecodeHash, address(this));

            // If contract not deployed, we deploy it
            // Else we do NOT error, simply return address (to avoid race conditions)
            if (contractAddress.code.length == 0) {
                // Create contract
                Create2.deploy(0, salt, contracts[i].bytecode);

                // Emit ContractCreated event
                bool implementation = msgSender == address(0) &&
                    salt == bytes32(0) &&
                    contracts[i].initData.length == 0;
                emit ContractCreated(msgSender, bytecodeHash, implementation, contractAddress);

                //Initialize if needed
                if (contracts[i].initData.length > 0) {
                    // Initialize
                    Address.functionCall(contractAddress, contracts[i].initData);
                }
            }

            // Add contractAddress to return array
            contractAddresses[i] = contractAddress;
        }

        return contractAddresses;
    }
}
