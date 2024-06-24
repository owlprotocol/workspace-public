// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

//Originally from https://github.com/mudgen/diamond-1
//******************************************************************************\
//* Author: Nick Mudge <nick@perfectabstractions.com> (https://twitter.com/mudgen)
//* EIP-2535 Diamonds: https://eips.ethereum.org/EIPS/eip-2535
//*
//* Implementation of a diamond.
//******************************************************************************/

import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {IDiamond} from "./IDiamond.sol";
import {IDiamondCut} from "./IDiamondCut.sol";
import {IDiamondLoupe} from "./IDiamondLoupe.sol";
import {DiamondLib} from "./DiamondLib.sol";
import {DiamondCutLib} from "./DiamondCutLib.sol";
import {AccessControlLib} from "../access/AccessControlLib.sol";

// When no function exists for function called
error FunctionNotFound(bytes4 _functionSelector);

contract Diamond is IDiamond {
    /**
     * @dev Diamond initialization
     * @param admin address to assign owner rights
     * @param diamondCut facets to update (recommend adding the DiamondCutFacet for upgradeability)
     * @param initAddress initial address to delegate call for optional initialization
     * @param initData initial data to for initialization
     */
    constructor(address admin, IDiamondCut.FacetCut[] memory diamondCut, address initAddress, bytes memory initData) {
        //Grant admin role
        AccessControlLib.__unsafe_grantRole(AccessControlLib.DEFAULT_ADMIN_ROLE, admin);
        DiamondCutLib.__unsafe_diamondCut(diamondCut, initAddress, initData);
    }

    // Find facet for function that is called and execute the
    // function if a facet is found and return any value.
    fallback(bytes calldata) external payable returns (bytes memory) {
        return DiamondLib._fallback(msg.data);

        // Execute external function from facet using delegatecall and return any value.
        /*
        assembly {
            // copy function selector and any arguments
            calldatacopy(0, 0, calldatasize())
            // execute function call using the facet
            let result := delegatecall(gas(), facet, 0, calldatasize(), 0, 0)
            // get any return value
            returndatacopy(0, 0, returndatasize())
            // return any return value or error back to the caller
            switch result
            case 0 {
                revert(0, returndatasize())
            }
            default {
                return(0, returndatasize())
            }
        }
        */
    }

    receive() external payable {}
}
