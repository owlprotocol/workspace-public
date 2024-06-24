// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IERC721BaseURI {
    /**
     * @dev Returns collection-wide URI-accessible metadata
     */
    function baseURI() external view returns (string memory);

    /**
     * @dev Set baseURI
     */
    function setBaseURI(string memory uri) external;
}
