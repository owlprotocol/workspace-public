//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @dev Provides a function to batch together multiple calls in a single external call.
 */
interface IMulticall {
    /**
     *  @notice Receives and executes a batch of function calls on this contract.
     *  @dev Receives and executes a batch of function calls on this contract. You should be aware
     *  of the risk enabling such a facet entails, notably with ERC2771 context (which we don't recommend using).
     *
     *  @param data The bytes data that makes up the batch of function calls to execute.
     *  @return results The bytes data that makes up the result of the batch of function calls executed.
     */
    function multicall(bytes[] calldata data) external returns (bytes[] memory results);
}
