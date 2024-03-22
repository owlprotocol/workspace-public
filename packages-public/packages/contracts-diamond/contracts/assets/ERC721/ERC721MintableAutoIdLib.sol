// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721Lib} from "./ERC721Lib.sol";
import {AccessControlRecursiveLib} from "../../access/AccessControlRecursiveLib.sol";

library ERC721MintableAutoIdLib {
    bytes32 internal constant ERC721_MINTER_ROLE = keccak256("erc721.roles.mint");

    bytes32 constant ERC721_MINTABLE_AUTOID_STORAGE =
        keccak256(abi.encode(uint256(keccak256("erc721.mintableAutoId.storage")) - 1)) & ~bytes32(uint256(0xff));

    /// @custom:storage-location erc7201:erc721.mintableAutoId.storage
    struct ERC721MintableStorage {
        uint256 _totalSupply;
    }

    function getData() internal pure returns (ERC721MintableStorage storage ds) {
        bytes32 position = ERC721_MINTABLE_AUTOID_STORAGE;
        assembly {
            ds.slot := position
        }
    }

    function _mint(address to) internal returns (uint256) {
        AccessControlRecursiveLib._checkRoleRecursive(ERC721_MINTER_ROLE, msg.sender);
        return __unsafe_mint(to);
    }

    function __unsafe_mint(address to) internal returns (uint256) {
        //Increment totalSupply and cache tokenId
        uint256 tokenId;
        unchecked {
            tokenId = getData()._totalSupply + 1;
        }
        getData()._totalSupply = tokenId;

        ERC721Lib._mint(to, tokenId);

        return tokenId;
    }

    function _mintBatch(address[] memory to) internal returns (uint256[] memory) {
        AccessControlRecursiveLib._checkRoleRecursive(ERC721_MINTER_ROLE, msg.sender);
        return __unsafe_mintBatch(to);
    }

    function __unsafe_mintBatch(address[] memory to) internal returns (uint256[] memory) {
        //Increment totalSupply and cache start tokenId
        uint256 startId;
        unchecked {
            startId = getData()._totalSupply + 1;
        }

        uint256[] memory tokenIds = new uint256[](to.length);
        for (uint256 i; i < to.length; i++) {
            uint256 tokenId = startId + i;
            tokenIds[i] = tokenId;
            ERC721Lib._mint(to[i], tokenId);
        }

        return tokenIds;
    }

    function _safeMint(address to) internal returns (uint256) {
        AccessControlRecursiveLib._checkRoleRecursive(ERC721_MINTER_ROLE, msg.sender);
        return __unsafe_safeMint(to);
    }

    function __unsafe_safeMint(address to) internal returns (uint256) {
        //Increment totalSupply and cache tokenId
        uint256 tokenId;
        unchecked {
            tokenId = getData()._totalSupply + 1;
        }
        getData()._totalSupply = tokenId;

        ERC721Lib._safeMint(to, tokenId, "");

        return tokenId;
    }

    function _safeMintBatch(address[] memory to) internal returns (uint256[] memory) {
        AccessControlRecursiveLib._checkRoleRecursive(ERC721_MINTER_ROLE, msg.sender);
        return __unsafe_safeMintBatch(to);
    }

    function __unsafe_safeMintBatch(address[] memory to) internal returns (uint256[] memory) {
        //Increment totalSupply and cache start tokenId
        uint256 startId;
        unchecked {
            startId = getData()._totalSupply + 1;
        }

        uint256[] memory tokenIds = new uint256[](to.length);
        for (uint256 i; i < to.length; i++) {
            uint256 tokenId = startId + i;
            tokenIds[i] = tokenId;
            ERC721Lib._safeMint(to[i], tokenId, "");
        }

        return tokenIds;
    }

    function _totalSupply() internal view returns (uint256) {
        return getData()._totalSupply;
    }
}
