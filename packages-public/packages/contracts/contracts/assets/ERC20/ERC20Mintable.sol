// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {ContextUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import {ERC20BurnableUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import {IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

import {OwlBase} from "../../common/OwlBase.sol";

import {IERC165Upgradeable} from "@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol";
import {IERC20Mintable} from "./IERC20Mintable.sol";
import {IAccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/IAccessControlUpgradeable.sol";
import {IContractURI} from "../../common/IContractURI.sol";

contract ERC20Mintable is OwlBase, ERC20BurnableUpgradeable, IERC20Mintable {
    bytes32 private constant MINTER_ROLE = keccak256("MINTER_ROLE");

    //https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
    uint256[50] private __gap;

    constructor() {}

    function initialize(
        address admin,
        string calldata contractUri,
        string calldata name,
        string calldata symbol
    ) external initializer {
        __ERC20Mintable_init(admin, contractUri, name, symbol);
    }

    function __ERC20Mintable_init(
        address admin,
        string memory contractUri,
        string calldata name,
        string calldata symbol
    ) internal {
        __ContractURI_init_unchained(admin, contractUri);
        __OwlBase_init_unchained(admin);

        __ERC20_init_unchained(name, symbol);
        __ERC20Mintable_init_unchained(admin);
    }

    function __ERC20Mintable_init_unchained(address minterRole) internal {
        _grantRole(MINTER_ROLE, minterRole);
        if (_registryExists()) {
            _registerInterface(type(IERC20Upgradeable).interfaceId);
            _registerInterface(type(IERC20Mintable).interfaceId);
        }
    }

    /***** MINTING *****/
    /**
     * @notice Must have MINTER_ROLE
     * @dev Allows MINTER_ROLE to mint NFTs
     * @param to address to
     * @param amount amount to mint
     */
    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }
}
