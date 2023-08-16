//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {OwlBase} from "./OwlBase.sol";

/**
 * @dev Example contract that inherits from OwlBase
 */
contract OwlBaseExample is OwlBase {
    /**
     * @dev Initializes a OwlBaseExample
     *      Protected with `initializer` modifier.
     * Edit this if new initialization variables are added
     */
    function initialize(address admin, string memory _contractUri) external initializer {
        __OwlBaseExample_init(admin, _contractUri);
    }

    /**
     * @dev OwlBaseExample chained initialization
     * Edit this if new initialization variables are added
     */
    function __OwlBaseExample_init(address admin, string memory _contractUri) internal {
        __ContractURI_init_unchained(admin, _contractUri);
        __OwlBase_init_unchained(admin);

        __OwlBaseExample_init_unchained();
    }

    /**
     * @dev OwlBaseExample unchained initialization
     * Customize this based on initialization variables
     */
    function __OwlBaseExample_init_unchained() internal {}
}
