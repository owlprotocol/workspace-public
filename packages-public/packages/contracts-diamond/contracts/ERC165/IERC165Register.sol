//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";

/**
 * @dev IERC165 contract that stores its interface id support data. This is usually not
 * recommended due to gas overhead but is required when using an upgradeable Diamond contract.
 */
interface IERC165Register is IERC165 {
    function registerInterface(bytes4 interfaceId, bool supported) external;
}
