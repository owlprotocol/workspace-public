// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @dev CREATE2 Factory.
 * Deploys contracts deterministically, adds optional salt that can be tied to msg.sender address
 */
interface ICreate2Factory {
    /**
     * @dev Deploy batch of contracts, with optional initialization
     * @param salt CREATE2 salt
     * @param msgSender added to salt if != address(0) to avoid other users to deploy clones on other chains
     * @param codeData CREATE2 contract bytecode
     * @param initData initialization data, sent atomically post deployment, used to re-compute salt if specified
     */
    function deployDeterministic(
        bytes32 salt,
        address msgSender,
        bytes[] calldata codeData,
        bytes[] calldata initData
    ) external returns (address[] memory);
}
