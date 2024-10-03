// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library ERC721ClaimLib {
    //TODO: User a better role id that uses unique selector
    bytes32 internal constant ERC721_CLAIM_ROLE = bytes32(keccak256("ERC721_CLAIM_ROLE"));

    bytes32 constant ERC721_CLAIM_STORAGE =
        keccak256(abi.encode(uint256(keccak256("erc721.claim.storage")) - 1)) & ~bytes32(uint256(0xff));

    /// @custom:storage-location erc7201:erc721.claim.storage
    struct ERC721ClaimStorage {
        //TODO: Define struct
        uint256 _totalSupply;
    }

    function getData() internal pure returns (ERC721ClaimStorage storage ds) {
        bytes32 position = ERC721_CLAIM_STORAGE;
        assembly {
            ds.slot := position
        }
    }

    //TODO: Add library functions
    function _claim(address to) internal returns (uint256) {
        return 0;
    }
}
