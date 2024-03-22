// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

//Originally from https://github.com/mudgen/diamond-1
//******************************************************************************\
//* Author: Nick Mudge <nick@perfectabstractions.com> (https://twitter.com/mudgen)
//* EIP-2535 Diamonds: https://eips.ethereum.org/EIPS/eip-2535
//******************************************************************************/

/**
 * We look to implement the following changes to simplify the libraries logic
 * and improve usability:
 *  - Move storage to dedicatd DiamondLib, implement cut logic in DiamondCutLib
 *  - Using data structure libraries `EnumerableMap` & `EnumerableSet` to keep track
 *    of facets. This makes the code more readable for keeping track of the data.
 *  - Add a `FacetCutAction` for `Set` operation to simplify updating a diamond.
 *    This action is simple (but dangerouse) as it simply overwrites the facet the
 *    selector is assigned to. We keep the old actions for backwards compatibility
 *    but recommend using `Set` in general.
 *  - Extend `FacetCut` struct with `initData` for each specific facet. After updating
 *    each facet, we delegate call to each facet if `initData.length > 0`. Important to
 *    mention is that this `initData` can call ANY selector from the facet.
 *    This extension makes it simple to chain inits without having to deal with a
 *    more obscure proxy implementation (eg. `DiamondMultiInit`).
 *    We still keep the optional post upgrade init as well.
 *  - Replace ownership based permissions with accesscontrol based permissions.
 *    Admin role can do anything. Roles can be assigned per-selector.
 *  - Remove any facet freeze options or similar checks. We don't believe this to be
 *    very useful. Facets should be frozen using AccessControl.
 *  - Use Openzeppelin Libraries where possible for checking isContract,
 *    making delegatecalls, and other core EVM operations.
 */

import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {IDiamond} from "./IDiamond.sol";
import {IDiamondCut} from "./IDiamondCut.sol";
import {DiamondLib} from "./DiamondLib.sol";
import {checkHasBytecode} from "../utils/AddressUtils.sol";
import {EnumerableMapAddressToSetBytes4} from "../utils/structs/EnumerableMapAddressToSetBytes4.sol";
import {AccessControlRecursiveLib} from "../access/AccessControlRecursiveLib.sol";

// Remember to add the loupe functions from DiamondLoupeFacet to the diamond.
// The loupe functions are required by the EIP2535 Diamonds standard
error NoBytecodeAtAddress(address _contractAddress, string _message);

error IncorrectFacetCutAction(uint8 _action);

error NoSelectorsProvidedForFacetForCut(address _facetAddress);
error CannotSetSelectorsToDiamond(address _facetAddress);

error CannotAddSelectorsToZeroAddress(bytes4[] _selectors);
error CannotAddFunctionToDiamondThatAlreadyExists(bytes4 _selector);

error CannotReplaceFunctionsFromFacetWithZeroAddress(bytes4[] _selectors);
error CannotReplaceFunctionWithTheSameFunctionFromTheSameFacet(bytes4 _selector);
error CannotReplaceFunctionThatDoesNotExists(bytes4 _selector);

error RemoveFacetAddressMustBeZeroAddress(address _facetAddress);
error CannotRemoveFunctionThatDoesNotExist(bytes4 _selector);

library DiamondCutLib {
    using EnumerableMapAddressToSetBytes4 for EnumerableMapAddressToSetBytes4.AddressToSetBytes4Map;

    event DiamondCut(IDiamondCut.FacetCut[] diamondCut, address initAddress, bytes initData);

    //General diamond cut admin
    bytes32 constant DIAMOND_CUT_ROLE = keccak256("DiamondCutLib.roles.diamondCut");

    // Internal function version of diamondCut
    function _diamondCut(
        IDiamondCut.FacetCut[] memory diamondCut,
        address initAddress,
        bytes memory initData
    ) internal {
        //msg.sender has diamond cut role
        AccessControlRecursiveLib._checkRoleRecursive(DIAMOND_CUT_ROLE, msg.sender);
        __unsafe_diamondCut(diamondCut, initAddress, initData);
    }

    function __unsafe_diamondCut(
        IDiamondCut.FacetCut[] memory diamondCut,
        address initAddress,
        bytes memory initData
    ) internal {
        _updateFunctions(diamondCut);

        emit DiamondCut(diamondCut, initAddress, initData);

        if (initAddress != address(0)) {
            Address.functionDelegateCall(initAddress, initData);
        }
    }

    // Update functions using diamond cut, no permission checks
    function _updateFunctions(IDiamondCut.FacetCut[] memory diamondCut) internal {
        for (uint256 facetIndex; facetIndex < diamondCut.length; facetIndex++) {
            bytes4[] memory functionSelectors = diamondCut[facetIndex].functionSelectors;
            address facetAddress = diamondCut[facetIndex].facetAddress;

            IDiamondCut.FacetCutAction action = diamondCut[facetIndex].action;

            //Disable "freeze" facets, facetAddress cannot be diamond's address
            if (facetAddress == address(this)) {
                revert CannotSetSelectorsToDiamond(facetAddress);
            }
            if (functionSelectors.length == 0) {
                revert NoSelectorsProvidedForFacetForCut(facetAddress);
            }

            if (action == IDiamond.FacetCutAction.Add) {
                _addFunctions(facetAddress, functionSelectors);
            } else if (action == IDiamond.FacetCutAction.Replace) {
                _replaceFunctions(facetAddress, functionSelectors);
            } else if (action == IDiamond.FacetCutAction.Remove) {
                _removeFunctions(facetAddress, functionSelectors);
            } else if (action == IDiamond.FacetCutAction.Set) {
                _setFunctions(facetAddress, functionSelectors);
            } else {
                revert IncorrectFacetCutAction(uint8(action));
            }
        }
    }

    function _addFunctions(address _facetAddress, bytes4[] memory _functionSelectors) internal {
        if (_facetAddress == address(0)) {
            revert CannotAddSelectorsToZeroAddress(_functionSelectors);
        }
        checkHasBytecode(_facetAddress, "LibDiamondCut: Add facet has no code");

        DiamondLib.DiamondStorage storage ds = DiamondLib.diamondStorage();
        for (uint256 selectorIndex; selectorIndex < _functionSelectors.length; selectorIndex++) {
            bytes4 selector = _functionSelectors[selectorIndex];
            address oldFacetAddress = ds.selectors[selector];
            if (oldFacetAddress != address(0)) {
                revert CannotAddFunctionToDiamondThatAlreadyExists(selector);
            }
            ds.selectors[selector] = _facetAddress;
            ds.facets.add(_facetAddress, selector);
        }
    }

    function _replaceFunctions(address _facetAddress, bytes4[] memory _functionSelectors) internal {
        if (_facetAddress == address(0)) {
            revert CannotReplaceFunctionsFromFacetWithZeroAddress(_functionSelectors);
        }
        checkHasBytecode(_facetAddress, "LibDiamondCut: Replace facet has no code");

        DiamondLib.DiamondStorage storage ds = DiamondLib.diamondStorage();
        for (uint256 selectorIndex; selectorIndex < _functionSelectors.length; selectorIndex++) {
            bytes4 selector = _functionSelectors[selectorIndex];
            address oldFacetAddress = ds.selectors[selector];
            if (oldFacetAddress == _facetAddress) {
                revert CannotReplaceFunctionWithTheSameFunctionFromTheSameFacet(selector);
            }
            if (oldFacetAddress == address(0)) {
                revert CannotReplaceFunctionThatDoesNotExists(selector);
            }
            // replace old facet address
            ds.selectors[selector] = _facetAddress;
            ds.facets.remove(oldFacetAddress, selector);
            ds.facets.add(_facetAddress, selector);
        }
    }

    function _removeFunctions(address _facetAddress, bytes4[] memory _functionSelectors) internal {
        if (_facetAddress != address(0)) {
            revert RemoveFacetAddressMustBeZeroAddress(_facetAddress);
        }
        DiamondLib.DiamondStorage storage ds = DiamondLib.diamondStorage();

        for (uint256 selectorIndex; selectorIndex < _functionSelectors.length; selectorIndex++) {
            bytes4 selector = _functionSelectors[selectorIndex];
            address oldFacetAddress = ds.selectors[selector];
            if (oldFacetAddress == address(0)) {
                revert CannotRemoveFunctionThatDoesNotExist(selector);
            }

            delete ds.selectors[selector];
            ds.facets.remove(oldFacetAddress, selector);
        }
    }

    function _setFunctions(address _facetAddress, bytes4[] memory _functionSelectors) internal {
        if (_facetAddress != address(0)) {
            //Facet non-zero, check bytecode
            checkHasBytecode(_facetAddress, "LibDiamondCut: Non-zero Set facet has no code");
        }

        DiamondLib.DiamondStorage storage ds = DiamondLib.diamondStorage();
        for (uint256 selectorIndex; selectorIndex < _functionSelectors.length; selectorIndex++) {
            bytes4 selector = _functionSelectors[selectorIndex];
            address oldFacetAddress = ds.selectors[selector];

            // replace old facet address
            ds.selectors[selector] = _facetAddress;
            ds.facets.remove(oldFacetAddress, selector);
            ds.facets.add(_facetAddress, selector);
        }
    }
}
