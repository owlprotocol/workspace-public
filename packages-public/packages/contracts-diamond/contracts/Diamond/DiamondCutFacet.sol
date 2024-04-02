// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

//Originally from https://github.com/mudgen/diamond-1
//******************************************************************************\
//* Author: Nick Mudge <nick@perfectabstractions.com> (https://twitter.com/mudgen)
//* EIP-2535 Diamonds: https://eips.ethereum.org/EIPS/eip-2535
//******************************************************************************/

import {IDiamondCut} from "./IDiamondCut.sol";
import {DiamondCutLib} from "./DiamondCutLib.sol";

// Remember to add the loupe functions from DiamondLoupeFacet to the diamond.
// The loupe functions are required by the EIP2535 Diamonds standard

contract DiamondCutFacet is IDiamondCut {
    /// @notice Add/replace/remove any number of functions and optionally execute
    ///         a function with delegatecall
    /// @param _diamondCut Contains the facet addresses and function selectors
    /// @param initAddress The address of the contract or facet to execute _calldata
    /// @param initData A function call, including function selector and arguments
    ///                  _calldata is executed with delegatecall on _init
    function diamondCut(FacetCut[] calldata _diamondCut, address initAddress, bytes calldata initData) external {
        //TODO: Add Access Control module
        DiamondCutLib._diamondCut(_diamondCut, initAddress, initData);
    }
}
