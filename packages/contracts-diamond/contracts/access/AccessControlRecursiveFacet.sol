// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {IAccessControlRecursive} from "./IAccessControlRecursive.sol";
import {AccessControlFacet} from "./AccessControlFacet.sol";
import {AccessControlLib} from "./AccessControlLib.sol";
import {AccessControlRecursiveLib} from "./AccessControlRecursiveLib.sol";

/**
 * @dev Contract module that allows nested role checks. If an address has a role (PARENT) that is the admin of another role (CHILD),
 * it is assumed to also have that role (CHILD) since it can at any time grant itself such role.
 */
contract AccessControlRecursiveFacet is IAccessControlRecursive, AccessControlFacet {
    /** Recursive Role Checks */
    /**
     * @dev Modifier that checks that an account has a specific role  or role's admin. Reverts
     * with a standardized message including the required role.
     *
     * The format of the revert reason is given by the following regular expression:
     *
     *  /^AccessControl: account (0x[0-9a-f]{40}) is missing role (0x[0-9a-f]{64})$/
     *
     */
    modifier onlyRoleRecursive(bytes32 role) {
        AccessControlRecursiveLib._checkRoleRecursive(role);
        _;
    }

    /**
     * @dev Returns `true` if `account` has been granted `role`  or `role`'s admin.
     */
    function hasRoleRecursive(bytes32 role, address account) external view returns (bool) {
        return AccessControlRecursiveLib._hasRoleRecursive(role, account);
    }

    /**
     * @dev Sets `adminRole` as ``role``'s admin role.
     *
     * Emits a {RoleAdminChanged} event.

     * Requirements:
     *
     * - the caller must have ``role``'s admin role (or any recursive admin).
     */
    function setRoleAdminRecursive(bytes32 role, bytes32 adminRole) external {
        AccessControlRecursiveLib._setRoleAdminRecursive(role, adminRole);
    }

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
    function grantRoleRecursive(bytes32 role, address account) external returns (bool) {
        return AccessControlRecursiveLib._grantRoleRecursive(role, account);
    }

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
    function revokeRoleRecursive(bytes32 role, address account) external returns (bool) {
        return AccessControlRecursiveLib._revokeRoleRecursive(role, account);
    }
}
