// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {IERC721BaseURI} from "./IERC721BaseURI.sol";
import {IERC721Metadata} from "./IERC721Metadata.sol";
import {ERC721Lib} from "./ERC721Lib.sol";
import {ERC721BaseURILib} from "./ERC721BaseURILib.sol";
import {ERC721Facet} from "./ERC721Facet.sol";

contract ERC721BaseURIFacet is IERC721Metadata, IERC721BaseURI, ERC721Facet {
    /**
     * @dev Returns the token collection name.
     */
    function name() external view returns (string memory) {
        return ERC721Lib._name();
    }

    /**
     * @dev Returns the token collection symbol.
     */
    function symbol() external view returns (string memory) {
        return ERC721Lib._symbol();
    }

    /**
     * @dev Returns the Uniform Resource Identifier (URI) for `tokenId` token.
     */
    function tokenURI(uint256 tokenId) external view returns (string memory) {
        return ERC721Lib._tokenURI(tokenId, ERC721BaseURILib._baseURI());
    }

    /**
     * @dev Returns collection-wide URI-accessible metadata
     */
    function baseURI() external view returns (string memory) {
        return ERC721BaseURILib._baseURI();
    }

    /**
     * @dev Set baseURI
     */
    function setBaseURI(string memory uri) external {
        return ERC721BaseURILib._setBaseURI(uri);
    }
}
