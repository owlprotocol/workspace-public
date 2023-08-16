// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {CountersUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

import {IERC721MintableAutoId} from "./IERC721MintableAutoId.sol";
import {ERC721Abstract} from "./ERC721Abstract.sol";

/**
 * @dev This implements the standard OwlProtocol `ERC721` contract that is an
 * extension of Openzeppelin's `ERC721BurnableUpgradeable`. Initializations
 * happens through initializers for compatibility with a EIP1167 minimal-proxy
 * deployment strategy.
 */
contract ERC721MintableAutoId is ERC721Abstract, IERC721MintableAutoId {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    bytes32 internal constant MINTER_ROLE = keccak256("MINTER_ROLE");

    // Auto-incrementing tokenIds
    CountersUpgradeable.Counter private nextId; //1 slot

    /**********************
        Initialization
    **********************/

    function initialize(
        address admin,
        string memory contractUri,
        string memory name,
        string memory symbol,
        address tokenUriProvider,
        address tokenRoyaltyProvider
    ) external virtual initializer {
        __ERC721MintableAutoId_init(admin, contractUri, name, symbol, tokenUriProvider, tokenRoyaltyProvider);
    }

    function __ERC721MintableAutoId_init(
        address admin,
        string memory contractUri,
        string memory name,
        string memory symbol,
        address tokenUriProvider,
        address tokenRoyaltyProvider
    ) internal {
        __ContractURI_init_unchained(admin, contractUri);
        __OwlBase_init_unchained(admin);

        __ERC721_init_unchained(name, symbol);
        __TokenURIConsumerAbstract_init_unchained(admin, tokenUriProvider);
        __ERC2981ConsumerAbstract_init_unchained(admin, tokenRoyaltyProvider);
        __ERC721Abstract_init_unchained();
        __ERC721MintableAutoIdAbstract_init_unchained(admin);
    }

    function __ERC721MintableAutoIdAbstract_init_unchained(address minterRole) internal {
        _grantRole(MINTER_ROLE, minterRole);
        if (_registryExists()) {
            _registerInterface(type(IERC721MintableAutoId).interfaceId);
        }

        //Start at 1
        nextId.increment();
    }

    /**
     * @inheritdoc IERC721MintableAutoId
     */
    function mint(address to) external virtual onlyRole(MINTER_ROLE) returns (uint256) {
        uint256 tokenId = nextId.current();
        nextId.increment();

        _mint(to, tokenId);

        return tokenId;
    }

    /**
     * @inheritdoc IERC721MintableAutoId
     */
    function mintBatch(address[] memory to) external virtual onlyRole(MINTER_ROLE) returns (uint256[] memory) {
        uint256 startId = nextId.current();
        unchecked {
            nextId._value += to.length;
        }

        uint256[] memory tokenIds = new uint256[](to.length);
        for (uint256 i; i < to.length; i++) {
            uint256 tokenId = startId + i;
            tokenIds[i] = tokenId;
            _mint(to[i], tokenId);
        }

        return tokenIds;
    }

    /**
     * @inheritdoc IERC721MintableAutoId
     */
    function safeMint(address to) external virtual onlyRole(MINTER_ROLE) returns (uint256) {
        uint256 tokenId = nextId.current();
        nextId.increment();

        _safeMint(to, tokenId, "");

        return tokenId;
    }

    /**
     * @inheritdoc IERC721MintableAutoId
     */
    function safeMintBatch(address[] memory to) external virtual onlyRole(MINTER_ROLE) returns (uint256[] memory) {
        uint256 startId = nextId.current();
        unchecked {
            nextId._value += to.length;
        }

        uint256[] memory tokenIds = new uint256[](to.length);
        for (uint256 i; i < to.length; i++) {
            uint256 tokenId = startId + i;
            tokenIds[i] = tokenId;
            _safeMint(to[i], tokenId);
        }

        return tokenIds;
    }
}
