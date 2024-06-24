//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IContractURI} from "./IContractURI.sol";
import {ContractURILib} from "./ContractURILib.sol";
import {AccessControlRecursiveLib} from "../access/AccessControlRecursiveLib.sol";

contract ContractURIFacet is IContractURI {
    /**
     * @dev Returns collection-wide URI-accessible metadata
     */
    function contractURI() external view returns (string memory) {
        return ContractURILib._contractURI();
    }

    /**
     * @dev Set contract uri
     */
    function setContractURI(string memory uri) external {
        ContractURILib._setContractURI(uri);
    }
}
