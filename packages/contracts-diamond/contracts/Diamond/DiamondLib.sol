// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {EnumerableMapAddressToSetBytes4} from "../utils/structs/EnumerableMapAddressToSetBytes4.sol";

error FunctionNotFound(bytes4 _functionSelector);

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

    function _fallback(bytes calldata data) internal returns (bytes memory) {
        DiamondLib.DiamondStorage storage ds = DiamondLib.diamondStorage();
        bytes4 sig = bytes4(data[:4]);
        // get facet from function selector
        address facet = ds.selectors[sig];
        if (facet == address(0)) {
            revert FunctionNotFound(sig);
        }

        return Address.functionDelegateCall(facet, data);
    }
}
