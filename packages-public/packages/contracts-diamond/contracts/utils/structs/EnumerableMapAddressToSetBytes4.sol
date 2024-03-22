// SPDX-License-Identifier: MIT
// Originally from
// OpenZeppelin Contracts (last updated v5.0.0) (utils/structs/EnumerableMap.sol)
pragma solidity ^0.8.20;

import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import {EnumerableSetBytes4} from "./EnumerableSetBytes4.sol";

/**
 * @dev Library for managing an enumerable variant of Solidity's
 * https://solidity.readthedocs.io/en/latest/types.html#mapping-types[`mapping`]
 * type.
 *
 * Maps with sets as values have the following properties:
 *
 * - Entries are added, removed, and checked for existence in constant time
 * (O(1)).
 * - Entries are enumerated in O(n). No guarantees are made on the ordering.
 * - When all items of set are removed, key is removed.
 *
 * ```solidity
 * contract Example {
 *     // Add the library methods
 *     using EnumerableMapAddressToSetBytes4 for EnumerableMapAddressToSetBytes4.AddressToSetBytes4Map;
 *
 *     // Declare a set state variable
 *     EnumerableMapAddressToSetBytes4.AddressToSetBytes4Map private myMap;
 * }
 * ```
 *
 * The following map types are supported:
 *
 * - `address -> Set<bytes4>` (`AddressToSetBytes4Map`)
 *
 * [WARNING]
 * ====
 * Trying to delete such a structure from storage will likely result in data corruption, rendering the structure
 * unusable.
 * See https://github.com/ethereum/solidity/pull/11843[ethereum/solidity#11843] for more info.
 *
 * In order to clean an EnumerableMap, you can either remove all elements one by one or create a fresh instance using an
 * array of EnumerableMap.
 * ====
 */
library EnumerableMapAddressToSetBytes4 {
    using EnumerableSet for EnumerableSet.AddressSet;
    using EnumerableSetBytes4 for EnumerableSetBytes4.Bytes4Set;

    // To implement this library for multiple types with as little code repetition as possible, we write it in
    // terms of a generic Map type with bytes32 keys and values. The Map implementation uses private functions,
    // and user-facing implementations such as `UintToAddressMap` are just wrappers around the underlying Map.
    // This means that we can only create new EnumerableMaps for types that fit in bytes32.

    /**
     * @dev Query for a nonexistent map key.
     */
    error EnumerableMapNonexistentKey(address key);

    struct AddressToSetBytes4Map {
        // Storage of keys
        EnumerableSet.AddressSet _keys;
        mapping(address key => EnumerableSetBytes4.Bytes4Set) _values;
    }

    /**
     * @dev Add a value to a set at `key`. O(1).
     *
     * Returns true if the value was added to the set, that is if it was not
     * already present.
     */
    function add(AddressToSetBytes4Map storage map, address key, bytes4 value) internal returns (bool) {
        //Add value to set
        bool added = map._values[key].add(value);

        if (added) {
            //Value was added, add key if non-existent
            map._keys.add(key);
        }

        return added;
    }

    /**
     * @dev Removes a value from a set at `key`. O(1).
     *
     * Returns true if the value was removed from the set, that is if it was present.
     */
    function remove(AddressToSetBytes4Map storage map, address key, bytes4 value) internal returns (bool) {
        //Remove value from set
        bool removed = map._values[key].remove(value);
        if (removed) {
            //Value was removed, remove key if size zero
            if (map._values[key].length() == 0) {
                map._keys.remove(key);
            }
        }

        return removed;
    }

    /**
     * @dev Returns true if the key is in the map. O(1).
     */
    function contains(AddressToSetBytes4Map storage map, address key) internal view returns (bool) {
        return map._keys.contains(key);
    }

    /**
     * @dev Returns the number of key-value pairs in the map. O(1).
     */
    function length(AddressToSetBytes4Map storage map) internal view returns (uint256) {
        return map._keys.length();
    }

    /**
     * @dev Returns the key-value pair stored at position `index` in the map. O(1).
     *
     * Note that there are no guarantees on the ordering of entries inside the
     * array, and it may change when more entries are added or removed.
     *
     * Requirements:
     *
     * - `index` must be strictly less than {length}.
     */
    function at(
        AddressToSetBytes4Map storage map,
        uint256 index
    ) internal view returns (address, EnumerableSetBytes4.Bytes4Set storage) {
        address key = map._keys.at(index);
        return (key, map._values[key]);
    }

    /**
     * @dev Tries to returns the value associated with `key`. O(1).
     * Does not revert if `key` is not in the map.
     */
    function tryGet(
        AddressToSetBytes4Map storage map,
        address key
    ) internal view returns (bool, EnumerableSetBytes4.Bytes4Set storage) {
        return (contains(map, key), map._values[key]);
    }

    /**
     * @dev Returns the value associated with `key`. O(1).
     *
     * Requirements:
     *
     * - `key` must be in the map.
     */
    function get(
        AddressToSetBytes4Map storage map,
        address key
    ) internal view returns (EnumerableSetBytes4.Bytes4Set storage) {
        if (!contains(map, key)) {
            revert EnumerableMapNonexistentKey(key);
        }
        return map._values[key];
    }

    /**
     * @dev Return the an array containing all the keys
     *
     * WARNING: This operation will copy the entire storage to memory, which can be quite expensive. This is designed
     * to mostly be used by view accessors that are queried without any gas fees. Developers should keep in mind that
     * this function has an unbounded cost, and using it as part of a state-changing function may render the function
     * uncallable if the map grows to a point where copying to memory consumes too much gas to fit in a block.
     */
    function keys(AddressToSetBytes4Map storage map) internal view returns (address[] memory) {
        return map._keys.values();
    }
}
