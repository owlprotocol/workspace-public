// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

//Originally from:
//******************************************************************************\
//* Author: Nick Mudge <nick@perfectabstractions.com> (https://twitter.com/mudgen)
//* EIP-2535 Diamonds: https://eips.ethereum.org/EIPS/eip-2535
//*
//* Implementation of a diamond.
//******************************************************************************/

import {Address} from "@openzeppelin/contracts/utils/Address.sol";

error AddressAndCalldataLengthDoNotMatch(uint256 initAddressListLength, uint256 initDataListLength);

contract DiamondInitMulti {
    // This function is provided in the third parameter of the `diamondCut` function.
    // The `diamondCut` function executes this function to execute multiple initializer functions for a single upgrade.

    function initialize(address[] calldata initAddressList, bytes[] calldata initDataList) external {
        if (initAddressList.length != initDataList.length) {
            revert AddressAndCalldataLengthDoNotMatch(initAddressList.length, initDataList.length);
        }
        for (uint i; i < initAddressList.length; i++) {
            if (initAddressList[i] != address(0)) {
                Address.functionDelegateCall(initAddressList[i], initDataList[i]);
            }
        }
    }
}
