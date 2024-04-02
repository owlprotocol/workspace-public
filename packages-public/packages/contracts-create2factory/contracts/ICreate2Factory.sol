// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @dev CREATE2 Factory.
 * Create contracts deterministically, adds optional salt that can be tied to msg.sender address
 */
interface ICreate2Factory {
    /**
     * Event emitted on contract creation, indexed fields enable filtering.
     * This enables advanced fields for finding contracts with specific behaviour.
     * Salt and initData are not included because initData would make the cost of the event variable, and salt would not
     * be useful to filter by. We recommend fetching the original transaction if this data is needed.
     *
     * Event fields
     *  - msgSender:        Filter for initialized contracts from a specific sender.
     *  - bytecodeHash:     Filter by bytecodeHash (eg. Find all specific ERC20 implementations).
     *                      This will include constructor data if provided, reducing the ability to filter.
     *  - implementation:   Filter for implementation contracts. True if msgSender == address(0) && salt == 0 && initData == 0.
     *                      Contracts with constructor data, may still show up as true and should NOT be used as proxy implementations.
     *  - contractAddress:  Contract address. Not indexed.
     */
    event ContractCreated(
        address indexed msgSender,
        bytes32 indexed bytecodeHash,
        bool indexed implementation,
        address contractAddress
    );

    /**
     * Contract creation struct includes core parameters for CREATE2 contract creation
     *  - salt: A unique salt. This is rehashed with the msgSender and initData parameters.
     *  - bytecode: Contract deployment bytecode. MUST include constructor data if needed.
     *  - initData: Post-creation initData. A call is immediately made to the contract post-creation. Useful for proxies.
     */
    struct Contract {
        bytes32 salt;
        bytes bytecode;
        bytes initData;
    }

    /**
     * @dev Create batch of contracts with CREATE, with optional initialization
     * @param msgSender enforce `msg.sender === msgSender` if non-zero. Added to salt to prevent different users from deploying at same address on other chains.
     * @param contracts CREATE2 contract creation data
     */
    function create(address msgSender, Contract[] calldata contracts) external returns (address[] memory);
}
