// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {ERC721MintableAutoIdBase} from './ERC721MintableAutoIdBase.sol';
import {ERC721TopDownBase} from './ERC721TopDownBase.sol';

/**
 * @dev Nested Top Down ERC721. Parents can own child tokens among fixed set of child contracts.
 */
contract ERC721TopDownMintableAutoId is ERC721MintableAutoIdBase, ERC721TopDownBase {
    constructor() {}

    /**
     * @dev Initializes an ERC721MintableAutoIdAutoId contract.
     *      Protected with `initializer` modifier.
     * @param _admin admin for contract
     * @param _initContractURI uri for contract metadata description
     * @param _gsnForwarder GSN Trusted forwarder
     * @param _name name for contract
     * @param _symbol symbol for contract
     * @param _initBaseURI base URI for contract
     * @param _feeReceiver address of receiver of royalty fees
     * @param _feeNumerator numerator of royalty fee percentage (numerator / 10000)
     * @param _childContracts721 child ERC721nDNA contracts
     * @param _childContracts1155 child ERC1155DNA contracts
     */
    function initialize(
        address _admin,
        string calldata _initContractURI,
        address _gsnForwarder,
        string calldata _name,
        string calldata _symbol,
        string calldata _initBaseURI,
        address _feeReceiver,
        uint96 _feeNumerator,
        address[] calldata _childContracts721,
        address[] calldata _childContracts1155
    ) external initializer {
        __ERC721TopDownMintableAutoId_init(
            _admin,
            _initContractURI,
            _gsnForwarder,
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
     * @dev Same as initialize but designed for usage with proxies.
     *      Protected with `onlyInitializing` modifier.
     */
    function proxyInitialize(
        address _admin,
        string calldata _initContractURI,
        address _gsnForwarder,
        string calldata _name,
        string calldata _symbol,
        string calldata _initBaseURI,
        address _feeReceiver,
        uint96 _feeNumerator,
        address[] calldata _childContracts721,
        address[] calldata _childContracts1155
    ) external onlyInitializing {
        __ERC721TopDownMintableAutoId_init(
            _admin,
            _initContractURI,
            _gsnForwarder,
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
        address _admin,
        string memory _initContractURI,
        address _gsnForwarder,
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI,
        address _feeReceiver,
        uint96 _feeNumerator,
        address[] memory _childContracts721,
        address[] memory _childContract1155
    ) internal {
        __ContractURI_init_unchained(_admin, _initContractURI);
        __RouterReceiver_init_unchained(_gsnForwarder);
        __OwlBase_init_unchained(_admin);

        __ERC721_init_unchained(_name, _symbol);
        __BaseURI_init_unchained(_admin, _initBaseURI);
        __ERC2981Setter_init_unchained(_admin, _feeReceiver, _feeNumerator);
        __ERC721Base_init_unchained();

        __ERC721MintableAutoIdBase_init_unchained(_admin);
        __ERC721TopDown_init_unchained(_childContracts721, _childContract1155);
    }

    /**
     * inheritdoc ERC721TopDown
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721MintableAutoIdBase, ERC721TopDownBase)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
