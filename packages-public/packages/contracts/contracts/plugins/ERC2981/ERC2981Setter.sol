// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {ContextUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";

import {OwlBase} from "../../common/OwlBase.sol";
import {ERC2981SetterAbstract} from "./ERC2981SetterAbstract.sol";

/**
 * @dev ERC2981 with access control public functions
 */
contract ERC2981Setter is OwlBase, ERC2981SetterAbstract {
    /**
     * @dev Initializes a TokenURIBaseURI contract.
     *      Protected with `initializer` modifier.
     */
    function initialize(
        address admin,
        string memory contractUri,
        address royaltyRole,
        address royaltyReceiver,
        uint96 feeNumerator
    ) external initializer {
        __ERC2981Setter_init(admin, contractUri, royaltyRole, royaltyReceiver, feeNumerator);
    }

    /**
     * @dev ERC2981Setter chained initialization
     */
    function __ERC2981Setter_init(
        address admin,
        string memory contractUri,
        address royaltyRole,
        address royaltyReceiver,
        uint96 feeNumerator
    ) internal {
        __ContractURI_init_unchained(admin, contractUri);
        __OwlBase_init_unchained(admin);

        __ERC2981SetterAbstract_init_unchained(royaltyRole, royaltyReceiver, feeNumerator);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC2981SetterAbstract, OwlBase) returns (bool) {
        return OwlBase.supportsInterface(interfaceId);
    }
}
