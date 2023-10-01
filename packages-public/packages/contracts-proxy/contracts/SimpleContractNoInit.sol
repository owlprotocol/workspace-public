// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 * Simple Contract to test proxy deployment
 */
contract SimpleContractNoInit {
    uint256 private value;
    event NewValue(uint256 indexed value);

    //TODO: Create2Factory add support for constructor
    /*
    constructor(uint256 _value) {
        value = _value;
    }
    */

    /**
     * Set value
     */
    function setValue(uint256 v) public {
        value = v;
        emit NewValue(v);
    }

    /**
     * Get value
     */
    function getValue() public view returns (uint256) {
        return value;
    }

    /*
     * Get pure function value
     */
    function getPure(uint256 x) public pure returns (uint256) {
        return x;
    }

    /**
     * Get block number
     */
    function blockNumber() public view returns (uint256) {
        return block.number;
    }

    /**
     * Message value
     */
    function msgValue() public payable returns (uint256) {
        return msg.value;
    }

    /**
     * Message sender
     */
    function msgSender() public payable returns (address) {
        return msg.sender;
    }

    /**
     * Revert transaction
     */
    function revertTx() public pure {
        revert("Transaction reverted");
    }
}
