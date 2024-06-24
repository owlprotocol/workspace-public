// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

//Originally from https://github.com/mudgen/diamond-1
//******************************************************************************\
//* Author: Nick Mudge <nick@perfectabstractions.com> (https://twitter.com/mudgen)
//* EIP-2535 Diamonds: https://eips.ethereum.org/EIPS/eip-2535
//******************************************************************************/

// The functions in DiamondLoupeFacet MUST be added to a diamond.
// The EIP-2535 Diamond standard requires these functions.

import {IDiamondLoupe} from "./IDiamondLoupe.sol";
import {DiamondLoupeLib} from "./DiamondLoupeLib.sol";

contract DiamondLoupeFacet is IDiamondLoupe {
    // Diamond Loupe Functions
    ////////////////////////////////////////////////////////////////////
    /// These functions are expected to be called frequently by tools.
    //
    // struct Facet {
    //     address facetAddress;
    //     bytes4[] functionSelectors;
    // }
    /// @notice Gets all facets and their selectors.
    /// @return facets_ Facet
    function facets() external view override returns (Facet[] memory) {
        return DiamondLoupeLib.facets();
    }

    /// @notice Gets all the function selectors supported by a specific facet.
    /// @param _facet The facet address.
    /// @return _facetFunctionSelectors The selectors associated with a facet address.
    function facetFunctionSelectors(address _facet) external view override returns (bytes4[] memory) {
        return DiamondLoupeLib.facetFunctionSelectors(_facet);
    }

    /// @notice Get all the facet addresses used by a diamond.
    /// @return facetAddresses_
    function facetAddresses() external view override returns (address[] memory) {
        return DiamondLoupeLib.facetAddresses();
    }

    /// @notice Gets the facet address that supports the given selector.
    /// @dev If facet is not found return address(0).
    /// @param _functionSelector The function selector.
    /// @return facetAddress_ The facet address.
    function facetAddress(bytes4 _functionSelector) external view override returns (address) {
        return DiamondLoupeLib.facetAddress(_functionSelector);
    }
}
