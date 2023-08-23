//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ContextUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";

import {OwlBase} from "../../common/OwlBase.sol";
import {TokenURIBaseURIAbstract} from "./TokenURIBaseURIAbstract.sol";

/**
 * @dev TokenURI with a base uri that is concatenated with tokenId
 * Commonly used by ERC721 as it often generates uri as `api.com/id`
 */
contract TokenURIBaseURI is TokenURIBaseURIAbstract, OwlBase {
    /**
     * @dev Initializes a TokenURIBaseURI contract.
     *      Protected with `initializer` modifier.
     */
    function initialize(
        address admin,
        string memory contractUri,
        address baseUriRole,
        string memory baseUri
    ) external initializer {
        __TokenURIBaseURI_init(admin, contractUri, baseUriRole, baseUri);
    }

    /**
     * @dev TokenURIBaseURI chained initialization
     */
    function __TokenURIBaseURI_init(
        address admin,
        string memory contractUri,
        address baseUriRole,
        string memory baseUri
    ) internal {
        __ContractURI_init_unchained(admin, contractUri);
        __OwlBase_init_unchained(admin);

        __TokenURIBaseURIAbstract_init_unchained(baseUriRole, baseUri);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(TokenURIBaseURIAbstract, OwlBase) returns (bool) {
        return OwlBase.supportsInterface(interfaceId);
    }
}
