// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title Mock Hyperlane Token Router for simple event log testing
 * @author Leo Vigna
 */
contract MockTokenRouterEvents {
    /**
     * @dev Emitted on `transferRemote` when a transfer message is dispatched.
     * @param destination The identifier of the destination chain.
     * @param recipient The address of the recipient on the destination chain.
     * @param amount The amount of tokens burnt on the origin chain.
     */
    event SentTransferRemote(uint32 indexed destination, bytes32 indexed recipient, uint256 amount);

    /**
     * @dev Emitted on `_handle` when a transfer message is processed.
     * @param origin The identifier of the origin chain.
     * @param recipient The address of the recipient on the destination chain.
     * @param amount The amount of tokens minted on the destination chain.
     */
    event ReceivedTransferRemote(uint32 indexed origin, bytes32 indexed recipient, uint256 amount);

    function sentTransferRemote(uint32 destination, bytes32 recipient, uint256 amountOrId) public {
        emit SentTransferRemote(destination, recipient, amountOrId);
    }

    function receivedTransferRemote(uint32 origin, bytes32 recipient, uint256 amountOrId) public {
        emit ReceivedTransferRemote(origin, recipient, amountOrId);
    }
}
