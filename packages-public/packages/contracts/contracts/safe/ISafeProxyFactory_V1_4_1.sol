// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

/**
 * @dev Interface for SafeProxyFactory v1.4.1
 */

interface ISafeProxyFactory_V1_4_1 {
    event ProxyCreation(address indexed proxy, address singleton);

    function calculateCreateProxyWithNonceAddress(
        address _singleton,
        bytes memory initializer,
        uint256 saltNonce
    ) external returns (address proxy);

    function createProxy(address singleton, bytes memory data) external returns (address proxy);

    function createChainSpecificProxyWithNonce(
        address _singleton,
        bytes memory initializer,
        uint256 saltNonce
    ) external returns (address proxy);

    function createProxyWithCallback(
        address _singleton,
        bytes memory initializer,
        uint256 saltNonce,
        address callback
    ) external returns (address proxy);

    function createProxyWithNonce(
        address _singleton,
        bytes memory initializer,
        uint256 saltNonce
    ) external returns (address proxy);

    function proxyCreationCode() external pure returns (bytes memory);

    function getChainId() external view returns (uint256);
}
