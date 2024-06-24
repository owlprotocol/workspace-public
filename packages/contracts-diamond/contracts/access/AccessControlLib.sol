// SPDX-License-Identifier: MIT
// Originally from
// OpenZeppelin Contracts (last updated v5.0.0) (access/AccessControl.sol)

/**
 * We updated the AccessControl to be a library that can then be used in AccessControlFacet
 */

pragma solidity ^0.8.20;
import {IAccessControl} from "./IAccessControl.sol";

/**
 * @dev Library module that allows children to implement role-based access
 * control mechanisms. This is a lightweight version that doesn't allow enumerating role
 * members except through off-chain means by accessing the contract event logs. Some
 * applications may benefit from on-chain enumerability, for those cases see
 * {AccessControlEnumerable}.
 *
 * Roles are referred to by their `bytes32` identifier. These should be exposed
 * in the external API and be unique. The best way to achieve this is by
 * using `public constant` hash digests:
 *
 * ```solidity
 * bytes32 public constant MY_ROLE = keccak256("MY_ROLE");
 * ```
 *
 * Roles can be used to represent a set of permissions. To restrict access to a
 * function call, use {hasRole}:
 *
 * ```solidity
 * function foo() public {
 *     require(hasRole(MY_ROLE, msg.sender));
 *     ...
 * }
 * ```
 *
 * Roles can be granted and revoked dynamically via the {grantRole} and
 * {revokeRole} functions. Each role has an associated admin role, and only
 * accounts that have a role's admin role can call {grantRole} and {revokeRole}.
 *
 * By default, the admin role for all roles is `DEFAULT_ADMIN_ROLE`, which means
 * that only accounts with this role will be able to grant or revoke other
 * roles. More complex role relationships can be created by using
 * {_setRoleAdmin}.
 *
 * WARNING: The `DEFAULT_ADMIN_ROLE` is also its own admin: it has permission to
 * grant and revoke this role. Extra precautions should be taken to secure
 * accounts that have been granted it. We recommend using {AccessControlDefaultAdminRules}
 * to enforce additional security measures for this role.
 */
library AccessControlLib {
    /**
     * @dev The `account` is missing a role.
     */
    error AccessControlUnauthorizedAccount(address account, bytes32 neededRole);

    /**
     * @dev The caller of a function is not the expected one.
     *
     * NOTE: Don't confuse with {AccessControlUnauthorizedAccount}.
     */
    error AccessControlBadConfirmation();

    /**
     * @dev Cannot assign `NULL_ROLE`
     */
    error AccessControlCannotSetNullRole();

    /**
     * @dev Emitted when `newAdminRole` is set as ``role``'s admin role, replacing `previousAdminRole`
     *
     * `DEFAULT_ADMIN_ROLE` is the starting admin for all roles, despite
     * {RoleAdminChanged} not being emitted signaling this.
     */
    event RoleAdminChanged(bytes32 indexed role, bytes32 indexed previousAdminRole, bytes32 indexed newAdminRole);

    /**
     * @dev Emitted when `account` is granted `role`.
     *
     * `sender` is the account that originated the contract call. This account bears the admin role (for the granted role).
     * Expected in cases where the role was granted using the internal {AccessControl-_grantRole}.
     */
    event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender);

    /**
     * @dev Emitted when `account` is revoked `role`.
     *
     * `sender` is the account that originated the contract call:
     *   - if using `revokeRole`, it is the admin role bearer
     *   - if using `renounceRole`, it is the role bearer (i.e. `account`)
     */
    event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender);

    bytes32 constant DEFAULT_ADMIN_ROLE = 0x00;
    /**
     * The original OpenZeppelin AccessControl contract defines roles that each have an
     * `adminRole`. This is useful as a common pattern is to have the `grantRole` function
     * gated to addresses that have the `adminRole` of the role that is being currently granted.
     *
     * By default, roles have `adminRole` of `0x00` (since the storage is just empty). This is
     * also the `DEFAULT_ADMIN_ROLE`. In general, this is quite practical since we can assign
     * `DEFAULT_ADMIN_ROLE` to one address which can then distribute required roles. If we
     * visualize the relationship between roles and their `adminRole` as a tree structure we
     * realize that the root of this tree is ALWAYS the `adminRole`.
     *
     *          DEFAULT_ADMIN_ROLE
     *              /       \
     *            RoleA     RoleB
     *            /
     *          RoleC
     *
     * In other words, `DEFAULT_ADMIN_ROLE` is the indirect admin of ALL roles since it can
     * always assign itself the required roles. In this example, admin could
     * `grantRole(RoleA, msg.sender)`. The AccessControlRecursive module implements similar
     * recursive logic to support the same business logic in more scalable fashion.
     *
     * Having the admin be able to manage roles is usually good but we have a problem however.
     * How can we assign roles and freeze them, making sure that no one can re-assign the role
     * to other addresses? Only two solutions are possible:
     * 1. Renouce the `DEFAULT_ADMIN_ROLE`
     * 2. Add a `NULL_ROLE`, make it never assignable, and set that as the roles new `adminRole`
     *
     * Solution 1 is the simplest, but has the main drawback that by relinquishing the
     * `DEFAULT_ADMIN_ROLE` (forever), we lose the flexibility of being able to assign new roles,
     * especially roles with new identifiers.
     * We define `NULL_ROLE` as the `0xFF..F` (bytes32), in contrast with `0x00`.
     *
     */
    bytes32 constant NULL_ROLE = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF;

    //https://eips.ethereum.org/EIPS/eip-7201
    bytes32 constant ACCESS_CONTROL_STORAGE =
        keccak256(abi.encode(uint256(keccak256("owlprotocol.storage.AccessControl")) - 1)) & ~bytes32(uint256(0xff));

    struct RoleData {
        mapping(address account => bool) hasRole;
        bytes32 adminRole;
    }

    /// @custom:storage-location erc7201:owlprotocol.storage.AccessControl
    struct AccessControlStorage {
        mapping(bytes32 role => RoleData) roles;
    }

    function getData() internal pure returns (AccessControlStorage storage ds) {
        bytes32 position = ACCESS_CONTROL_STORAGE;
        assembly {
            ds.slot := position
        }
    }

    /**
     * @dev Returns `true` if `account` has been granted `role`.
     */
    function _hasRole(bytes32 role, address account) internal view returns (bool) {
        return getData().roles[role].hasRole[account];
    }

    /**
     * @dev Reverts with an {AccessControlUnauthorizedAccount} error if `_msgSender()`
     * is missing `role`. Overriding this function changes the behavior of the {onlyRole} modifier.
     */
    function _checkRole(bytes32 role) internal view {
        _checkRole(role, msg.sender);
    }

    /**
     * @dev Reverts with an {AccessControlUnauthorizedAccount} error if `account`
     * is missing `role`.
     */
    function _checkRole(bytes32 role, address account) internal view {
        if (!_hasRole(role, account)) {
            revert IAccessControl.AccessControlUnauthorizedAccount(account, role);
        }
    }

    /**
     * @dev Returns the admin role that controls `role`. See {grantRole} and
     * {revokeRole}.
     *
     * To change a role's admin, use {_setRoleAdmin}.
     */
    function _getRoleAdmin(bytes32 role) internal view returns (bytes32) {
        //`NULL_ROLE`'s adminRole is always itself
        if (role == NULL_ROLE) {
            return NULL_ROLE;
        }

        return getData().roles[role].adminRole;
    }

    /**
     * @dev Revokes `role` from the calling account.
     *
     * Roles are often managed via {grantRole} and {revokeRole}: this function's
     * purpose is to provide a mechanism for accounts to lose their privileges
     * if they are compromised (such as when a trusted device is misplaced).
     *
     * If the calling account had been revoked `role`, emits a {RoleRevoked}
     * event.
     *
     * Requirements:
     *
     * - the caller must be `callerConfirmation`.
     *
     * May emit a {RoleRevoked} event.
     */
    function _renounceRole(bytes32 role, address callerConfirmation) internal {
        if (callerConfirmation != msg.sender) {
            revert IAccessControl.AccessControlBadConfirmation();
        }

        //use __unsafe here, no permissions check as removing self from role
        __unsafe_revokeRole(role, callerConfirmation);
    }

    function _setRoleAdmin(bytes32 role, bytes32 adminRole) internal {
        _checkRole(AccessControlLib._getRoleAdmin(role), msg.sender);
        __unsafe_setRoleAdmin(role, adminRole);
    }

    /**
     * @dev Sets `adminRole` as ``role``'s admin role.
     *
     * Emits a {RoleAdminChanged} event.
     */
    function __unsafe_setRoleAdmin(bytes32 role, bytes32 adminRole) internal {
        //Cannot set `NULL_ROLE` adminRole (it is always itself)
        if (role == NULL_ROLE) {
            revert AccessControlCannotSetNullRole();
        }

        //You MAY set `NULL_ROLE` as a role's `adminRole` however
        bytes32 previousAdminRole = _getRoleAdmin(role);
        getData().roles[role].adminRole = adminRole;
        emit RoleAdminChanged(role, previousAdminRole, adminRole);
    }

    function _grantRole(bytes32 role, address account) internal returns (bool) {
        _checkRole(AccessControlLib._getRoleAdmin(role), msg.sender);
        return __unsafe_grantRole(role, account);
    }

    /**
     * @dev Attempts to grant `role` to `account` and returns a boolean indicating if `role` was granted.
     *
     * Internal function without access restriction.
     *
     * May emit a {RoleGranted} event.
     */
    function __unsafe_grantRole(bytes32 role, address account) internal returns (bool) {
        //Cannot assign `NULL_ROLE` to ANY address
        if (role == NULL_ROLE) {
            revert AccessControlCannotSetNullRole();
        }

        if (!_hasRole(role, account)) {
            getData().roles[role].hasRole[account] = true;
            emit RoleGranted(role, account, msg.sender);
            return true;
        } else {
            return false;
        }
    }

    function _revokeRole(bytes32 role, address account) internal returns (bool) {
        _checkRole(AccessControlLib._getRoleAdmin(role), msg.sender);
        return __unsafe_revokeRole(role, account);
    }

    /**
     * @dev Attempts to revoke `role` to `account` and returns a boolean indicating if `role` was revoked.
     *
     * Internal function without access restriction.
     *
     * May emit a {RoleRevoked} event.
     */
    function __unsafe_revokeRole(bytes32 role, address account) internal returns (bool) {
        if (_hasRole(role, account)) {
            getData().roles[role].hasRole[account] = false;
            emit RoleRevoked(role, account, msg.sender);
            return true;
        } else {
            return false;
        }
    }
}
