// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

//Originally from https://github.com/mudgen/diamond-1
//*****************************************************************************\
//* Author: Nick Mudge <nick@perfectabstractions.com> (https://twitter.com/mudgen)
//* EIP-2535 Diamonds: https://eips.ethereum.org/EIPS/eip-2535
//******************************************************************************/

interface IDiamond {
    enum FacetCutAction {
        Add,
        Replace,
        Remove,
        Set
    }
    // Change: We add the `Set` option to enum to simplify.
    // This does not change uint4 size of the enum
    // Add=0, Replace=1, Remove=2, Set=3

    struct FacetCut {
        address facetAddress;
        FacetCutAction action;
        bytes4[] functionSelectors;
    }

    event DiamondCut(FacetCut[] _diamondCut, address _init, bytes _calldata);
}
