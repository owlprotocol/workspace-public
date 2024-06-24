// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC2981} from "./IERC2981.sol";

/**
 * @dev Extend IERC2981 with write functions.
 *
 */
interface IERC2981Facet is IERC2981 {
    /**
     * @dev Sets the royalty information that all ids in this contract will default to.
     *
     * Requirements:
     *
     * - `receiver` cannot be the zero address.
     * - `feeNumerator` cannot be greater than the fee denominator.
     */
    function setDefaultRoyalty(address receiver, uint96 feeNumerator) external;

    /**
     * @dev Removes default royalty information.
     */
    function deleteDefaultRoyalty() external;

    /**
     * @dev Sets the royalty information for a specific token id, overriding the global default.
     *
     * Requirements:
     *
     * - `receiver` cannot be the zero address.
     * - `feeNumerator` cannot be greater than the fee denominator.
     */
    function setTokenRoyalty(uint256 tokenId, address receiver, uint96 feeNumerator) external;

    /**
     * @dev Resets royalty information for the token id back to the global default.
     */
    function resetTokenRoyalty(uint256 tokenId) external;
}
