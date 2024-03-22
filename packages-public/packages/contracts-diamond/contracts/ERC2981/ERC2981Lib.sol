// SPDX-License-Identifier: MIT
// Originally from
// OpenZeppelin Contracts (last updated v5.0.0) (token/common/ERC2981.sol)
// Updated as library

pragma solidity ^0.8.20;

import {AccessControlRecursiveLib} from "../access/AccessControlRecursiveLib.sol";

/**
 * @dev Implementation of the NFT Royalty Standard, a standardized way to retrieve royalty payment information.
 *
 * Royalty information can be specified globally for all token ids via {_setDefaultRoyalty}, and/or individually for
 * specific token ids via {_setTokenRoyalty}. The latter takes precedence over the first.
 *
 * Royalty is specified as a fraction of sale price. {_feeDenominator} is overridable but defaults to 10000, meaning the
 * fee is specified in basis points by default.
 *
 * IMPORTANT: ERC-2981 only specifies a way to signal royalty information and does not enforce its payment. See
 * https://eips.ethereum.org/EIPS/eip-2981#optional-royalty-payments[Rationale] in the ERC. Marketplaces are expected to
 * voluntarily pay royalties together with sales, but note that this standard is not yet widely supported.
 */
library ERC2981Lib {
    /**
     * @dev The default royalty set is invalid (eg. (numerator / denominator) >= 1).
     */
    error ERC2981InvalidDefaultRoyalty(uint256 numerator, uint256 denominator);

    /**
     * @dev The default royalty receiver is invalid.
     */
    error ERC2981InvalidDefaultRoyaltyReceiver(address receiver);

    /**
     * @dev The royalty set for an specific `tokenId` is invalid (eg. (numerator / denominator) >= 1).
     */
    error ERC2981InvalidTokenRoyalty(uint256 tokenId, uint256 numerator, uint256 denominator);

    /**
     * @dev The royalty receiver for `tokenId` is invalid.
     */
    error ERC2981InvalidTokenRoyaltyReceiver(uint256 tokenId, address receiver);

    bytes32 internal constant ERC2981_ROLE = keccak256("erc2981.roles.setRoyalty");

    bytes32 constant ERC2981_STORAGE =
        keccak256(abi.encode(uint256(keccak256("erc2981.storage")) - 1)) & ~bytes32(uint256(0xff));

    struct RoyaltyInfo {
        address receiver;
        uint96 royaltyFraction;
    }

    /// @custom:storage-location erc7201:erc2981.storage
    struct ERC2981Storage {
        RoyaltyInfo _defaultRoyaltyInfo;
        mapping(uint256 tokenId => RoyaltyInfo) _tokenRoyaltyInfo;
    }

    function getData() internal pure returns (ERC2981Storage storage ds) {
        bytes32 position = ERC2981_STORAGE;
        assembly {
            ds.slot := position
        }
    }

    function _init(address receiver, uint96 feeNumerator) internal {
        __unsafe_setDefaultRoyalty(receiver, feeNumerator);
    }

    function _royaltyInfo(uint256 tokenId, uint256 salePrice) internal view returns (address, uint256) {
        RoyaltyInfo memory royalty = getData()._tokenRoyaltyInfo[tokenId];

        if (royalty.receiver == address(0)) {
            royalty = getData()._defaultRoyaltyInfo;
        }

        uint256 royaltyAmount = (salePrice * royalty.royaltyFraction) / _feeDenominator();

        return (royalty.receiver, royaltyAmount);
    }

    /**
     * @dev The denominator with which to interpret the fee set in {_setTokenRoyalty} and {_setDefaultRoyalty} as a
     * fraction of the sale price. Defaults to 10000 so fees are expressed in basis points, but may be customized by an
     * override.
     */
    function _feeDenominator() internal pure returns (uint96) {
        return 10000;
    }

    /**
     * @dev Sets the royalty information that all ids in this contract will default to.
     *
     * Requirements:
     *
     * - `receiver` cannot be the zero address.
     * - `feeNumerator` cannot be greater than the fee denominator.
     * - `msg.sender` has role ERC2981Role
     */
    function _setDefaultRoyalty(address receiver, uint96 feeNumerator) internal {
        AccessControlRecursiveLib._checkRoleRecursive(ERC2981_ROLE, msg.sender);
        __unsafe_setDefaultRoyalty(receiver, feeNumerator);
    }

    /**
     * @dev Sets the royalty information that all ids in this contract will default to.
     *
     * Requirements:
     *
     * - `receiver` cannot be the zero address.
     * - `feeNumerator` cannot be greater than the fee denominator.
     */
    function __unsafe_setDefaultRoyalty(address receiver, uint96 feeNumerator) internal {
        uint256 denominator = _feeDenominator();
        if (feeNumerator > denominator) {
            // Royalty fee will exceed the sale price
            revert ERC2981InvalidDefaultRoyalty(feeNumerator, denominator);
        }
        if (receiver == address(0)) {
            revert ERC2981InvalidDefaultRoyaltyReceiver(address(0));
        }

        getData()._defaultRoyaltyInfo = RoyaltyInfo(receiver, feeNumerator);
    }

    /**
     * @dev Removes default royalty information.
     */
    function _deleteDefaultRoyalty() internal {
        AccessControlRecursiveLib._checkRoleRecursive(ERC2981_ROLE, msg.sender);
        __unsafe_deleteDefaultRoyalty();
    }

    /**
     * @dev Removes default royalty information.
     */
    function __unsafe_deleteDefaultRoyalty() internal {
        delete getData()._defaultRoyaltyInfo;
    }

    /**
     * @dev Sets the royalty information for a specific token id, overriding the global default.
     *
     * Requirements:
     *
     * - `receiver` cannot be the zero address.
     * - `feeNumerator` cannot be greater than the fee denominator.
     * - `msg.sender` has role ERC2981Role
     */
    function _setTokenRoyalty(uint256 tokenId, address receiver, uint96 feeNumerator) internal {
        AccessControlRecursiveLib._checkRoleRecursive(ERC2981_ROLE, msg.sender);
        __unsafe_setTokenRoyalty(tokenId, receiver, feeNumerator);
    }

    /**
     * @dev Sets the royalty information for a specific token id, overriding the global default.
     *
     * Requirements:
     *
     * - `receiver` cannot be the zero address.
     * - `feeNumerator` cannot be greater than the fee denominator.
     */
    function __unsafe_setTokenRoyalty(uint256 tokenId, address receiver, uint96 feeNumerator) internal {
        uint256 denominator = _feeDenominator();
        if (feeNumerator > denominator) {
            // Royalty fee will exceed the sale price
            revert ERC2981InvalidTokenRoyalty(tokenId, feeNumerator, denominator);
        }
        if (receiver == address(0)) {
            revert ERC2981InvalidTokenRoyaltyReceiver(tokenId, address(0));
        }

        getData()._tokenRoyaltyInfo[tokenId] = RoyaltyInfo(receiver, feeNumerator);
    }

    /**
     * @dev Resets royalty information for the token id back to the global default.
     *
     * Requirements:
     *
     * - `msg.sender` has role ERC2981Role
     */
    function _resetTokenRoyalty(uint256 tokenId) internal {
        AccessControlRecursiveLib._checkRoleRecursive(ERC2981_ROLE, msg.sender);
        __unsafe_resetTokenRoyalty(tokenId);
    }

    function __unsafe_resetTokenRoyalty(uint256 tokenId) internal {
        delete getData()._tokenRoyaltyInfo[tokenId];
    }
}
