// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/**
 * @dev This is the interface of {BeaconProxy}
 */
interface IBeaconProxy {
    /**
     * @dev Returns the current beacon address.
     */
    function beacon() external view returns (address);

    /**
     * @dev Changes the proxy to use a new beacon. Deprecated: see {_upgradeBeaconToAndCall}.
     *
     * If `data` is nonempty, it's used as data in a delegate call to the implementation returned by the beacon.
     *
     * Requirements:
     *
     * - `beacon` must be a contract.
     * - The implementation returned by `beacon` must be a contract.
     */
    function setBeacon(address _beaconAddress, bytes memory data) external;
}
