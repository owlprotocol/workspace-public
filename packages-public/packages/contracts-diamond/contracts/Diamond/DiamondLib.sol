// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {EnumerableMapAddressToSetBytes4} from "../utils/structs/EnumerableMapAddressToSetBytes4.sol";

library DiamondLib {
    bytes32 constant DIAMOND_STORAGE =
        keccak256(abi.encode(uint256(keccak256("diamond.standard.diamond.storage")) - 1)) & ~bytes32(uint256(0xff));

    /// @custom:storage-location erc7201:diamond.standard.diamond.storage
    struct DiamondStorage {
        EnumerableMapAddressToSetBytes4.AddressToSetBytes4Map facets;
        mapping(bytes4 selector => address) selectors;
    }

    function diamondStorage() internal pure returns (DiamondStorage storage ds) {
        bytes32 position = DIAMOND_STORAGE;
        assembly {
            ds.slot := position
        }
    }
}
