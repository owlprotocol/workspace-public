// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v5.0.0) (access/IAccessControl.sol)

pragma solidity ^0.8.20;

/**
 * @dev External interface of AccessControlRecursive declared to support ERC-165 detection.
 */
interface IAccessControlRecursive {
    /**
     * @dev Returns `true` if `account` has been granted `role`.
     */
    function hasRoleRecursive(bytes32 role, address account) external view returns (bool);

    /**
     * @dev Sets `adminRole` as ``role``'s admin role.
     *
     * Emits a {RoleAdminChanged} event.

     * Requirements:
     *
     * - the caller must have ``role``'s admin role (or any recursive admin).
     */
    function setRoleAdminRecursive(bytes32 role, bytes32 adminRole) external;

    /**
     * @dev Grants `role` to `account`.
     *
     * If `account` had not been already granted `role`, emits a {RoleGranted}
     * event.
     *
     * Requirements:
     *
     * - the caller must have ``role``'s admin role (or any recursive admin).
     *
     * May emit a {RoleGranted} event.
     */
    function grantRoleRecursive(bytes32 role, address account) external returns (bool);

    /**
     * @dev Revokes `role` from `account`.
     *
     * If `account` had been granted `role`, emits a {RoleRevoked} event.
     *
     * Requirements:
     *
     * - the caller must have ``role``'s admin role (or any recursive admin).
     *
     * May emit a {RoleRevoked} event.
     */
    function revokeRoleRecursive(bytes32 role, address account) external returns (bool);
}
