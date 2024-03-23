// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC721BaseURI} from "./IERC721BaseURI.sol";
import {ERC721Lib} from "./ERC721Lib.sol";
import {AccessControlRecursiveLib} from "../../access/AccessControlRecursiveLib.sol";

library ERC721BaseURILib {
    bytes32 internal constant ERC721_BASE_URI_ROLE = bytes32(IERC721BaseURI.setBaseURI.selector);

    bytes32 constant ERC721_BASE_URI_STORAGE =
        keccak256(abi.encode(uint256(keccak256("erc721.baseURI.storage")) - 1)) & ~bytes32(uint256(0xff));

    /// @custom:storage-location erc7201:erc721.baseURI.storage
    struct ERC721BaseURIStorage {
        string _baseURI;
    }

    function getData() internal pure returns (ERC721BaseURIStorage storage ds) {
        bytes32 position = ERC721_BASE_URI_STORAGE;
        assembly {
            ds.slot := position
        }
    }

    function _init(string memory uri) internal {
        __unsafe_setBaseURI(uri);
    }

    /**
     * @dev Returns collection-wide URI-accessible metadata
     */
    function _baseURI() internal view returns (string memory) {
        return getData()._baseURI;
    }

    /**
     * @dev Set baseURI
     */
    function _setBaseURI(string memory uri) internal {
        AccessControlRecursiveLib._checkRoleRecursive(ERC721_BASE_URI_ROLE, msg.sender);
        __unsafe_setBaseURI(uri);
    }

    /**
     * @dev Set baseURI
     */
    function __unsafe_setBaseURI(string memory uri) internal {
        getData()._baseURI = uri;
    }
}
