// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {IERC721MintableAutoId} from "./IERC721MintableAutoId.sol";
import {ERC721MintableAutoIdLib} from "./ERC721MintableAutoIdLib.sol";

contract ERC721MintableAutoIdFacet is IERC721MintableAutoId {
    /**
     * @notice Must have `erc721.roles.mint`
     * @dev Allows `erc721.roles.mint` to mint NFTs
     * @param to address to
     */
    function mint(address to) external returns (uint256) {
        return ERC721MintableAutoIdLib._mint(to);
    }

    function mintBatch(address[] memory to) external returns (uint256[] memory) {
        return ERC721MintableAutoIdLib._mintBatch(to);
    }

    /**
     * @notice Must have `erc721.roles.mint`
     * @dev Allows caller to mint NFTs (safeMint)
     * @param to address to
     */
    function safeMint(address to) external returns (uint256) {
        return ERC721MintableAutoIdLib._safeMint(to);
    }

    function safeMintBatch(address[] memory to) external returns (uint256[] memory) {
        return ERC721MintableAutoIdLib._safeMintBatch(to);
    }

    function totalSupply() external view returns (uint256) {
        return ERC721MintableAutoIdLib._totalSupply();
    }
}
