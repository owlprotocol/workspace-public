// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

//Originally from https://github.com/mudgen/diamond-1
//******************************************************************************\
//* Author: Nick Mudge <nick@perfectabstractions.com> (https://twitter.com/mudgen)
//* EIP-2535 Diamonds: https://eips.ethereum.org/EIPS/eip-2535
//******************************************************************************/

/**
 * We updated the DiamondLoupeFacet to be a library that can then be used in DiamondLoupeFacet
 */

import {IDiamondLoupe} from "./IDiamondLoupe.sol";
import {DiamondLib} from "./DiamondLib.sol";
import {EnumerableMapAddressToSetBytes4} from "../utils/structs/EnumerableMapAddressToSetBytes4.sol";
import {EnumerableSetBytes4} from "../utils/structs/EnumerableSetBytes4.sol";

// The functions in DiamondLoupeFacet MUST be added to a diamond.
// The EIP-2535 Diamond standard requires these functions.

library DiamondLoupeLib {
    using EnumerableMapAddressToSetBytes4 for EnumerableMapAddressToSetBytes4.AddressToSetBytes4Map;
    using EnumerableSetBytes4 for EnumerableSetBytes4.Bytes4Set;

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
    function facets() internal view returns (IDiamondLoupe.Facet[] memory) {
        DiamondLib.DiamondStorage storage ds = DiamondLib.diamondStorage();
        address[] memory facetAddresses_ = ds.facets.keys();
        IDiamondLoupe.Facet[] memory facets_ = new IDiamondLoupe.Facet[](facetAddresses_.length);
        for (uint256 i; i < facetAddresses_.length; i++) {
            address facetAddress_ = facetAddresses_[i];
            facets_[i] = IDiamondLoupe.Facet(facetAddress_, ds.facets._values[facetAddress_].values());
        }

        return facets_;
    }

    /// @notice Gets all the function selectors supported by a specific facet.
    /// @param _facet The facet address.
    /// @return _facetFunctionSelectors The selectors associated with a facet address.
    function facetFunctionSelectors(address _facet) internal view returns (bytes4[] memory _facetFunctionSelectors) {
        DiamondLib.DiamondStorage storage ds = DiamondLib.diamondStorage();
        return ds.facets._values[_facet].values();
    }

    /// @notice Get all the facet addresses used by a diamond.
    /// @return facetAddresses_
    function facetAddresses() internal view returns (address[] memory) {
        DiamondLib.DiamondStorage storage ds = DiamondLib.diamondStorage();
        return ds.facets.keys();
    }

    /// @notice Gets the facet address that supports the given selector.
    /// @dev If facet is not found return address(0).
    /// @param _functionSelector The function selector.
    /// @return facetAddress_ The facet address.
    function facetAddress(bytes4 _functionSelector) internal view returns (address) {
        DiamondLib.DiamondStorage storage ds = DiamondLib.diamondStorage();
        return ds.selectors[_functionSelector];
    }
}
