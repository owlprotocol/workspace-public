// SPDX-License-Identifier: MIT

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/interfaces/IERC4906.sol

pragma solidity ^0.8.20;

/// @title EIP-721 Metadata Update Extension
interface IERC4906 {
    /// @dev This event emits when the metadata of a token is changed.
    /// So that the third-party platforms such as NFT market could
    /// timely update the images and related attributes of the NFT.
    event MetadataUpdate(uint256 tokenId);

    /// @dev This event emits when the metadata of a range of tokens is changed.
    /// So that the third-party platforms such as NFT market could
    /// timely update the images and related attributes of the NFTs.
    event BatchMetadataUpdate(uint256 fromTokenId, uint256 toTokenId);
}
