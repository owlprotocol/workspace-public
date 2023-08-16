// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {OwlBase} from "../common/OwlBase.sol";
import {ERC721DnaHelperLib} from "../helpers/ERC721DnaHelperLib.sol";

contract ERC721DnaHelperExample is OwlBase {
    function __ERC721DnaHelperExample_init(address admin, string memory contractUri) internal {
        __ContractURI_init_unchained(admin, contractUri);

        __OwlBase_init_unchained(admin);
    }

    function getHelloWorld() external view returns (string memory str) {
        str = ERC721DnaHelperLib.getTest();
    }
}
