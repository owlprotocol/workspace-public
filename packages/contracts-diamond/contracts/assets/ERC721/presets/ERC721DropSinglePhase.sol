// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC165Facet} from "../../../ERC165/ERC165Facet.sol";
import {ERC165Lib} from "../../../ERC165/ERC165Lib.sol";

import {IAccessControl} from "../../../access/IAccessControl.sol";
import {IAccessControlRecursive} from "../../../access/IAccessControlRecursive.sol";
import {AccessControlRecursiveFacet} from "../../../access/AccessControlRecursiveFacet.sol";

import {AccessControlLib} from "../../../access/AccessControlLib.sol";

import {IContractURI} from "../../../ContractURI/IContractURI.sol";
import {ContractURILib} from "../../../ContractURI/ContractURILib.sol";
import {ContractURIFacet} from "../../../ContractURI/ContractURIFacet.sol";

import {IERC721} from "../IERC721.sol";
import {ERC721Lib} from "../ERC721Lib.sol";

import {IERC721MintableAutoId} from "../IERC721MintableAutoId.sol";
import {IERC721DropSinglePhase} from "../IERC721DropSinglePhase.sol";
import {ERC721DropSinglePhaseFacet} from "../ERC721DropSinglePhaseFacet.sol";
import {ERC721DropLib} from "../ERC721DropLib.sol";

import {IERC721Metadata} from "../IERC721Metadata.sol";
import {IERC721BaseURI} from "../IERC721BaseURI.sol";
import {ERC721BaseURILib} from "../ERC721BaseURILib.sol";
import {ERC721BaseURIFacet} from "../ERC721BaseURIFacet.sol";

import {IERC2981} from "../../../ERC2981/IERC2981.sol";
import {ERC2981Lib} from "../../../ERC2981/ERC2981Lib.sol";
import {ERC2981Facet} from "../../../ERC2981/ERC2981Facet.sol";

contract ERC721DropPreset is ERC165Facet, AccessControlRecursiveFacet, ERC721DropSinglePhaseFacet, ERC721BaseURIFacet {
    constructor(
        address admin,
        string memory contractUri,
        string memory name,
        string memory symbol,
        string memory baseUri,
        address royaltyReceiver,
        uint96 feeNumerator,
        bytes32 merkleRoot
    ) {
        AccessControlLib.__unsafe_grantRole(AccessControlLib.DEFAULT_ADMIN_ROLE, admin);

        ERC165Lib._init();
        ERC165Lib.__unsafe_registerInterface(type(IAccessControl).interfaceId, true);
        ERC165Lib.__unsafe_registerInterface(type(IAccessControlRecursive).interfaceId, true);
        ERC165Lib.__unsafe_registerInterface(type(IContractURI).interfaceId, true);
        ERC165Lib.__unsafe_registerInterface(type(IERC721).interfaceId, true);
        ERC165Lib.__unsafe_registerInterface(type(IERC721MintableAutoId).interfaceId, true);
        ERC165Lib.__unsafe_registerInterface(type(IERC721DropSinglePhase).interfaceId, true);
        ERC165Lib.__unsafe_registerInterface(type(IERC721Metadata).interfaceId, true);
        ERC165Lib.__unsafe_registerInterface(type(IERC721BaseURI).interfaceId, true);
        ERC165Lib.__unsafe_registerInterface(type(IERC2981).interfaceId, true);

        ContractURILib._init(contractUri);
        ERC721Lib._init(name, symbol);
        ERC721BaseURILib._init(baseUri);
        ERC2981Lib._init(royaltyReceiver, feeNumerator);

        ERC721DropLib._setDropCondition(0, merkleRoot);
    }
}
