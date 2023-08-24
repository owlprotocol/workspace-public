// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {StringsUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";

/**
 * @dev Contract module that allows nested role checks. If an address has a role (PARENT) that is the admin of another role (CHILD),
 * it is assumed to also have that role (CHILD) since it can at any time grant itself such role.
 */
contract AccessControlRecursive is AccessControlUpgradeable {
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
        _checkRoleRecursive(role);
        _;
    }

    /**
     * @dev Returns `true` if `account` has been granted `role`  or `role`'s admin.
     */
    function hasRoleRecursive(bytes32 role, address account) public view virtual returns (bool) {
        if (role == DEFAULT_ADMIN_ROLE) return hasRole(role, account);

        return hasRole(role, account) || hasRoleRecursive(getRoleAdmin(role), account);
    }

    /**
     * @dev Revert with a standard message if `_msgSender()` is missing `role`  or `role`'s admin.
     * Overriding this function changes the behavior of the {onlyRole} modifier.
     *
     * Format of the revert message is described in {_checkRole}.
     *
     * _Available since v4.6._
     */
    function _checkRoleRecursive(bytes32 role) internal view virtual {
        _checkRoleRecursive(role, _msgSender());
    }

    /**
     * @dev Revert with a standard message if `account` is missing `role` or `role`'s admin.
     *
     * The format of the revert reason is given by the following regular expression:
     *
     *  /^AccessControl: account (0x[0-9a-f]{40}) is missing role (0x[0-9a-f]{64})$/
     */
    function _checkRoleRecursive(bytes32 role, address account) internal view virtual {
        if (!hasRoleRecursive(role, account)) {
            revert(
                string(
                    abi.encodePacked(
                        "AccessControl: account ",
                        StringsUpgradeable.toHexString(account),
                        " is missing role ",
                        StringsUpgradeable.toHexString(uint256(role), 32)
                    )
                )
            );
        }
    }
}
