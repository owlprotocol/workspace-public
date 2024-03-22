// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {AccessControlLib} from "./AccessControlLib.sol";

/**
 * @dev Library module that allows nested role checks. If an address has a role (PARENT) that is the admin of another role (CHILD),
 * it is assumed to also have that role (CHILD) since it can at any time grant itself such role.
 */
library AccessControlRecursiveLib {
    /** Recursive Role Checks */
    /**
     * @dev Returns `true` if `account` has been granted `role`  or `role`'s admin.
     */
    function _hasRoleRecursive(bytes32 role, address account) internal view returns (bool) {
        //This terminates early and avoids gas overflow with infinite recursion
        if (role == AccessControlLib.NULL_ROLE) return false;
        if (role == AccessControlLib.DEFAULT_ADMIN_ROLE) return AccessControlLib._hasRole(role, account);

        return
            AccessControlLib._hasRole(role, account) ||
            _hasRoleRecursive(AccessControlLib._getRoleAdmin(role), account);
    }

    /**
     * @dev Revert with a standard message if `_msgSender()` is missing `role`  or `role`'s admin.
     * Overriding this function changes the behavior of the {onlyRole} modifier.
     *
     * Format of the revert message is described in {_checkRole}.
     *
     * _Available since v4.6._
     */
    function _checkRoleRecursive(bytes32 role) internal view {
        _checkRoleRecursive(role, msg.sender);
    }

    /**
     * @dev Revert with a standard message if `account` is missing `role` or `role`'s admin.
     *
     * The format of the revert reason is given by the following regular expression:
     *
     *  /^AccessControl: account (0x[0-9a-f]{40}) is missing role (0x[0-9a-f]{64})$/
     */
    function _checkRoleRecursive(bytes32 role, address account) internal view {
        if (!_hasRoleRecursive(role, account)) {
            revert(
                string(
                    abi.encodePacked(
                        "AccessControlRecursive: account ",
                        Strings.toHexString(account),
                        " is missing role (or recursive adminRole of)",
                        Strings.toHexString(uint256(role), 32)
                    )
                )
            );
        }
    }

    function _setRoleAdminRecursive(bytes32 role, bytes32 adminRole) internal {
        _checkRoleRecursive(AccessControlLib._getRoleAdmin(role), msg.sender);
        AccessControlLib.__unsafe_setRoleAdmin(role, adminRole);
    }

    function _grantRoleRecursive(bytes32 role, address account) internal returns (bool) {
        _checkRoleRecursive(AccessControlLib._getRoleAdmin(role), msg.sender);
        return AccessControlLib.__unsafe_grantRole(role, account);
    }

    function _revokeRoleRecursive(bytes32 role, address account) internal returns (bool) {
        _checkRoleRecursive(AccessControlLib._getRoleAdmin(role), msg.sender);
        return AccessControlLib.__unsafe_revokeRole(role, account);
    }
}
