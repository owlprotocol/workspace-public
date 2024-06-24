// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @dev Returns `true` if `_contract` has some bytecode
 */
function hasBytecode(address _contract) view returns (bool) {
    // This method relies on extcodesize/address.code.length, which returns 0
    // for contracts in construction, since the code is only stored at the end
    // of the constructor execution.
    return _contract.code.length > 0;
}

error NoBytecodeAtAddress(address _contractAddress, string _message);

/**
 * @dev Reverts with an {NoBytecodeAtAddress} error if `_contract` has no bytecode
 */
function checkHasBytecode(address _contract, string memory _errorMessage) view {
    uint256 contractSize = _contract.code.length;
    if (contractSize == 0) {
        revert NoBytecodeAtAddress(_contract, _errorMessage);
    }
}
