//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AccessControlRecursiveLib} from "../access/AccessControlRecursiveLib.sol";

import {IERC2981} from "./IERC2981.sol";
import {IERC2981Facet} from "./IERC2981Facet.sol";
import {ERC2981Lib} from "./ERC2981Lib.sol";

contract ERC2981Facet is IERC2981Facet {
    /**
     * @inheritdoc IERC2981
     */
    function royaltyInfo(
        uint256 tokenId,
        uint256 salePrice
    ) external view returns (address receiver, uint256 royaltyAmount) {
        return ERC2981Lib._royaltyInfo(tokenId, salePrice);
    }

    /**
     * @inheritdoc IERC2981Facet
     */
    function setDefaultRoyalty(address receiver, uint96 feeNumerator) external {
        return ERC2981Lib._setDefaultRoyalty(receiver, feeNumerator);
    }

    /**
     * @inheritdoc IERC2981Facet
     */
    function deleteDefaultRoyalty() external {
        return ERC2981Lib._deleteDefaultRoyalty();
    }

    /**
     * @inheritdoc IERC2981Facet
     */
    function setTokenRoyalty(uint256 tokenId, address receiver, uint96 feeNumerator) external {
        return ERC2981Lib._setTokenRoyalty(tokenId, receiver, feeNumerator);
    }

    /**
     * @inheritdoc IERC2981Facet
     */
    function resetTokenRoyalty(uint256 tokenId) external {
        return ERC2981Lib._resetTokenRoyalty(tokenId);
    }
}
