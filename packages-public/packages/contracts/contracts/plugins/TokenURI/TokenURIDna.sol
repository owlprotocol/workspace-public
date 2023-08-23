//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ContextUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";

import {OwlBase} from "../../common/OwlBase.sol";
import {Base64UrlUpgradeable} from "../../utils/Base64UrlUpgradeable.sol";

import {TokenDnaConsumerAbstract} from "../TokenDna/TokenDnaConsumerAbstract.sol";
import {TokenURIBaseURIAbstract} from "./TokenURIBaseURIAbstract.sol";

/**
 * @dev TokenURI with a base uri that is concatenated with tokenId
 * Commonly used by ERC721 as it often generates uri as `api.com/id`
 * Most calls to tokenURI are read-only and not used by smart contracts so overhead of calling a
 * secondary smart contract is not important. Smart contracts wishing to get the raw dna should call
 * the dna provider directly.
 */
contract TokenURIDna is TokenURIBaseURIAbstract, TokenDnaConsumerAbstract, OwlBase {
    using Base64UrlUpgradeable for bytes;

    /**
     * @dev Initializes a TokenURIBaseURI contract.
     *      Protected with `initializer` modifier.
     */
    function initialize(
        address admin,
        string memory contractUri,
        address baseUriRole,
        string memory baseUri,
        address dnaProviderRole,
        address dnaProvider
    ) external initializer {
        __TokenURIDna_init(admin, contractUri, baseUriRole, baseUri, dnaProviderRole, dnaProvider);
    }

    /**
     * @dev TokenURIDna chained initialization
     */
    function __TokenURIDna_init(
        address admin,
        string memory contractUri,
        address baseUriRole,
        string memory baseUri,
        address dnaProviderRole,
        address dnaProvider
    ) internal {
        __ContractURI_init_unchained(admin, contractUri);
        __OwlBase_init_unchained(admin);

        __TokenURIBaseURIAbstract_init_unchained(baseUriRole, baseUri);
        __TokenDnaConsumerAbstract_init_unchained(dnaProviderRole, dnaProvider);
    }

    function tokenURI(uint256 tokenId) external view override returns (string memory) {
        string memory uri = baseURI();
        bytes memory dnaRaw = getDna(tokenId);
        string memory dnaString = dnaRaw.encode();

        return bytes(uri).length > 0 ? string(abi.encodePacked(uri, dnaString)) : dnaString;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(TokenURIBaseURIAbstract, TokenDnaConsumerAbstract, OwlBase) returns (bool) {
        return OwlBase.supportsInterface(interfaceId);
    }
}
