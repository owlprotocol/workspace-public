//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {ContextUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";

import {OwlBase} from "../common/OwlBase.sol";
import {IChainlinkAnyApiConsumer} from "./IChainlinkAnyApiConsumer.sol";
import {ChainlinkAnyApiConsumerAbstract} from "./ChainlinkAnyApiConsumerAbstract.sol";

/**
 * @dev An example consumer contract that expects (uint256, string) for prefixData, and (uint256, string) for responseData
 */
contract ChainlinkApiConsumerMock is OwlBase, ChainlinkAnyApiConsumerAbstract {
    mapping(uint256 => ChainlinkResponse) public responses;

    event ChainlinkResponseFulfilled(uint256 prefixNo, string prefixString, uint256 responseNo, string responseString);

    struct ChainlinkResponse {
        uint256 prefixNo;
        string prefixString;
        uint256 responseNo;
        string responseString;
    }

    /**
     * @dev Initialize the consumer.
     * @param admin AccessControl admin
     * @param contractUri URI for storing metadata
     */
    function initialize(address admin, string calldata contractUri) external initializer {
        __ContractURI_init_unchained(contractUri);
        __OwlBase_init_unchained(admin);

        __ChainlinkAnyApiConsumerMock_init();
    }

    function __ChainlinkAnyApiConsumerMock_init() internal {
        __ChainlinkAnyApiConsumer_init_unchained();
        __ChainlinkAnyApiConsumerMock_init_unchained();
    }

    function __ChainlinkAnyApiConsumerMock_init_unchained() internal {}

    /**
     * inheritdoc IChainlinkAnyApiConsumer
     */
    function fulfill(
        bytes calldata fulfillPrefixData,
        bytes calldata fulfillResponseData
    ) external virtual onlyRoleRecursive(FULFILL_ROLE) {
        (uint256 prefixNo, string memory prefixString) = abi.decode(fulfillPrefixData, (uint256, string));
        (uint256 responseNo, string memory responseString) = abi.decode(fulfillResponseData, (uint256, string));

        responses[prefixNo] = ChainlinkResponse({
            prefixNo: prefixNo,
            prefixString: prefixString,
            responseNo: responseNo,
            responseString: responseString
        });

        emit ChainlinkResponseFulfilled(prefixNo, prefixString, responseNo, responseString);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ChainlinkAnyApiConsumerAbstract, OwlBase) returns (bool) {
        return OwlBase.supportsInterface(interfaceId);
    }
}
