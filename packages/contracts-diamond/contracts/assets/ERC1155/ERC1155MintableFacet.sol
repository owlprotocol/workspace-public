// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {IERC1155Mintable} from "./IERC1155Mintable.sol";
import {ERC1155MintableLib} from "./ERC1155MintableLib.sol";
import {ERC1155Facet} from "./ERC1155Facet.sol";

contract ERC1155MintableFacet is IERC1155Mintable, ERC1155Facet {
    /**
     * @notice Must have `erc1155.roles.mint`
     * @dev Allows `erc1155.roles.mint` to mint NFTs
     * @param to address to
     * @param id tokenId value
     * @param value to mint
     * @param data for hooks
     */
    function mint(address to, uint256 id, uint256 value, bytes memory data) external {
        return ERC1155MintableLib._mint(to, id, value, data);
    }

    /**
     * @notice Must have `erc1155.roles.mint`
     * @dev Allows caller to mint NFTs (safeMint)
     * @param to address to
     * @param ids id values
     * @param values to mint
     * @param data for hooks
     */
    function mintBatch(address to, uint256[] memory ids, uint256[] memory values, bytes memory data) external {
        return ERC1155MintableLib._mintBatch(to, ids, values, data);
    }
}
