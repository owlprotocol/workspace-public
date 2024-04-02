// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {ERC1155Abstract} from "./ERC1155Abstract.sol";
import {IERC1155Mintable} from "./IERC1155Mintable.sol";

contract ERC1155Mintable is ERC1155Abstract, IERC1155Mintable {
    bytes32 private constant MINTER_ROLE = keccak256("MINTER_ROLE");

    //https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
    uint256[50] private __gap;

    constructor() {}

    function initialize(
        address admin,
        string memory contractUri,
        address tokenUriProvider,
        address tokenRoyaltyProvider
    ) external virtual initializer {
        __ERC1155Mintable_init(admin, contractUri, tokenUriProvider, tokenRoyaltyProvider);
    }

    function __ERC1155Mintable_init(
        address admin,
        string memory contractUri,
        address tokenUriProvider,
        address tokenRoyaltyProvider
    ) internal {
        __ContractURI_init_unchained(contractUri);
        __OwlBase_init_unchained(admin);

        __TokenURIConsumerAbstract_init_unchained(tokenUriProvider);
        __ERC2981ConsumerAbstract_init_unchained(tokenRoyaltyProvider);
        __ERC1155Abstract_init_unchained();
        __ERC1155Mintable_init_unchained();
    }

    function __ERC1155Mintable_init_unchained() internal {
        if (_registryExists()) {
            _registerInterface(type(IERC1155Mintable).interfaceId);
        }
    }

    /***** MINTING *****/
    /**
     * @inheritdoc IERC1155Mintable
     */
    function mint(address to, uint256 id, uint256 amount, bytes memory data) external onlyRoleRecursive(MINTER_ROLE) {
        _mint(to, id, amount, data);
    }

    /**
     * @inheritdoc IERC1155Mintable
     */
    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) external onlyRoleRecursive(MINTER_ROLE) {
        _mintBatch(to, ids, amounts, data);
    }
}
