// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC1155Lib} from "./ERC1155Lib.sol";
import {AccessControlRecursiveLib} from "../../access/AccessControlRecursiveLib.sol";

library ERC1155MintableLib {
    bytes32 internal constant ERC1155_MINTER_ROLE = keccak256("erc1155.roles.mint");

    /**
     * @notice Must have `erc1155.roles.mint`
     * @dev Allows `erc1155.roles.mint` to mint NFTs
     * @param to address to
     * @param id tokenId value
     * @param value to mint
     * @param data for hooks
     */
    function _mint(address to, uint256 id, uint256 value, bytes memory data) internal {
        AccessControlRecursiveLib._checkRoleRecursive(ERC1155_MINTER_ROLE, msg.sender);
        __unsafe_mint(to, id, value, data);
    }

    function __unsafe_mint(address to, uint256 id, uint256 value, bytes memory data) internal {
        ERC1155Lib._mint(to, id, value, data);
    }

    /**
     * @notice Must have `erc1155.roles.mint`
     * @dev Allows caller to mint NFTs (safeMint)
     * @param to address to
     * @param ids id values
     * @param values to mint
     * @param data for hooks
     */
    function _mintBatch(address to, uint256[] memory ids, uint256[] memory values, bytes memory data) internal {
        AccessControlRecursiveLib._checkRoleRecursive(ERC1155_MINTER_ROLE, msg.sender);
        __unsafe_mintBatch(to, ids, values, data);
    }

    function __unsafe_mintBatch(address to, uint256[] memory ids, uint256[] memory values, bytes memory data) internal {
        ERC1155Lib._mintBatch(to, ids, values, data);
    }
}
