// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IERC1155Mintable {
    /**
     * @notice Must have `erc1155.roles.mint`
     * @dev Allows `erc1155.roles.mint` to mint NFTs
     * @param to address to
     * @param id tokenId value
     * @param value to mint
     * @param data for hooks
     */
    function mint(address to, uint256 id, uint256 value, bytes memory data) external;

    /**
     * @notice Must have `erc1155.roles.mint`
     * @dev Allows caller to mint NFTs (safeMint)
     * @param to address to
     * @param ids id values
     * @param values to mint
     * @param data for hooks
     */
    function mintBatch(address to, uint256[] memory ids, uint256[] memory values, bytes memory data) external;
}
