//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {OwlBase} from "../../common/OwlBase.sol";
import {StorageSlotString} from "../../utils/StorageSlotString.sol";

import {ITokenURI} from "./ITokenURI.sol";

/**
 * @dev TokenURI with hard-coded uri that returns same uri for all token ids.
 * Commonly used by ERC1155 as it uses a string template `api.com/{id}`
 */
contract TokenURI is OwlBase, ITokenURI {
    bytes32 internal constant TOKEN_URI_ROLE = keccak256("TOKEN_URI_ROLE");
    bytes32 internal constant _TOKEN_URI_SLOT = keccak256("TOKEN_URI");

    /**
     * @dev Initializes a TokenURI contract.
     *      Protected with `initializer` modifier.
     */
    function initialize(address admin, string memory contractUri, string memory uri) external initializer {
        __TokenURI_init(admin, contractUri, uri);
    }

    /**
     * @dev TokenURI chained initialization
     */
    function __TokenURI_init(address admin, string memory contractUri, string memory uri) internal {
        __ContractURI_init_unchained(contractUri);
        __OwlBase_init_unchained(admin);

        __TokenURI_init_unchained(uri);
    }

    function __TokenURI_init_unchained(string memory uri) internal {
        StorageSlotString.getStringSlot(_TOKEN_URI_SLOT).value = uri;

        if (_registryExists()) {
            _registerInterface(type(ITokenURI).interfaceId);
        }
    }

    /**
     * @dev Set contract uri
     */
    function setTokenURI(string memory uri) external onlyRoleRecursive(TOKEN_URI_ROLE) {
        StorageSlotString.getStringSlot(_TOKEN_URI_SLOT).value = uri;
    }

    function tokenURI(uint256 tokenId) public view returns (string memory) {
        return StorageSlotString.getStringSlot(_TOKEN_URI_SLOT).value;
    }
}
