// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {ERC721MintableAutoIdAbstract} from "./ERC721MintableAutoIdAbstract.sol";
import {ERC721TopDownBase} from "./ERC721TopDownBase.sol";

/**
 * @dev Nested Top Down ERC721. Parents can own child tokens among fixed set of child contracts.
 */
contract ERC721TopDownMintableAutoId is ERC721MintableAutoIdAbstract, ERC721TopDownBase {
    constructor() {}

    /**
     * @dev Initializes an ERC721MintableAutoIdAutoId contract.
     *      Protected with `initializer` modifier.
     * @param admin admin for contract
     * @param _initContractURI uri for contract metadata description
     * @param _name name for contract
     * @param _symbol symbol for contract
     * @param _initBaseURI base URI for contract
     * @param _feeReceiver address of receiver of royalty fees
     * @param _feeNumerator numerator of royalty fee percentage (numerator / 10000)
     * @param _childContracts721 child ERC721nDNA contracts
     * @param _childContracts1155 child ERC1155DNA contracts
     */
    function initialize(
        address admin,
        string calldata _initContractURI,
        string calldata _name,
        string calldata _symbol,
        string calldata _initBaseURI,
        address _feeReceiver,
        uint96 _feeNumerator,
        address[] calldata _childContracts721,
        address[] calldata _childContracts1155
    ) external initializer {
        __ERC721TopDownMintableAutoId_init(
            admin,
            _initContractURI,
            _name,
            _symbol,
            _initBaseURI,
            _feeReceiver,
            _feeNumerator,
            _childContracts721,
            _childContracts1155
        );
    }

    /**
     * @dev Initialize ERC721TopDownMintableAutoId + dependencies
     */
    function __ERC721TopDownMintableAutoId_init(
        address admin,
        string memory _initContractURI,
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI,
        address _feeReceiver,
        uint96 _feeNumerator,
        address[] memory _childContracts721,
        address[] memory _childContract1155
    ) internal {
        __ContractURI_init_unchained(admin, _initContractURI);
        __OwlBase_init_unchained(admin);

        __ERC721_init_unchained(_name, _symbol);
        __BaseURI_init_unchained(admin, _initBaseURI);
        __ERC2981Setter_init_unchained(admin, _feeReceiver, _feeNumerator);
        __ERC721Abstract_init_unchained();

        __ERC721MintableAutoIdAbstract_init_unchained(admin);
        __ERC721TopDown_init_unchained(_childContracts721, _childContract1155);
    }
}
