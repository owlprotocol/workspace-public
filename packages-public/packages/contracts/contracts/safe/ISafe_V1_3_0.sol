// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

/**
 * @dev Interface for Safe v1.3.0
 */
interface ISafe_V1_3_0 {
    event AddedOwner(address owner);
    event ApproveHash(bytes32 indexed approvedHash, address indexed owner);
    event ChangedFallbackHandler(address handler);
    event ChangedGuard(address guard);
    event ChangedThreshold(uint256 threshold);
    event DisabledModule(address module);
    event EnabledModule(address module);
    event ExecutionFailure(bytes32 txHash, uint256 payment);
    event ExecutionFromModuleFailure(address indexed module);
    event ExecutionFromModuleSuccess(address indexed module);
    event ExecutionSuccess(bytes32 txHash, uint256 payment);
    event RemovedOwner(address owner);
    event SafeReceived(address indexed sender, uint256 value);
    event SafeSetup(
        address indexed initiator,
        address[] owners,
        uint256 threshold,
        address initializer,
        address fallbackHandler
    );
    event SignMsg(bytes32 indexed msgHash);

    function VERSION() external view returns (string memory);

    function addOwnerWithThreshold(address owner, uint256 threshold) external;

    function approveHash(bytes32 hashToApprove) external;

    function approvedHashes(address, bytes32) external view returns (uint256);

    function changeThreshold(uint256 threshold) external;

    function checkNSignatures(
        bytes32 dataHash,
        bytes memory data,
        bytes memory signatures,
        uint256 requiredSignatures
    ) external view;

    function checkSignatures(bytes32 dataHash, bytes memory data, bytes memory signatures) external view;

    function disableModule(address prevModule, address module) external;

    function domainSeparator() external view returns (bytes32);

    function enableModule(address module) external;

    function encodeTransactionData(
        address to,
        uint256 value,
        bytes memory data,
        uint8 operation,
        uint256 safeTxGas,
        uint256 baseGas,
        uint256 gasPrice,
        address gasToken,
        address refundReceiver,
        uint256 nonce
    ) external view returns (bytes memory);

    function execTransaction(
        address to,
        uint256 value,
        bytes memory data,
        uint8 operation,
        uint256 safeTxGas,
        uint256 baseGas,
        uint256 gasPrice,
        address gasToken,
        address refundReceiver,
        bytes memory signatures
    ) external payable returns (bool success);

    function execTransactionFromModule(
        address to,
        uint256 value,
        bytes memory data,
        uint8 operation
    ) external returns (bool success);

    function execTransactionFromModuleReturnData(
        address to,
        uint256 value,
        bytes memory data,
        uint8 operation
    ) external returns (bool success, bytes memory returnData);

    function getChainId() external view returns (uint256);

    function getModulesPaginated(
        address start,
        uint256 pageSize
    ) external view returns (address[] memory array, address next);

    function getOwners() external view returns (address[] memory);

    function getStorageAt(uint256 offset, uint256 length) external view returns (bytes memory);

    function getThreshold() external view returns (uint256);

    function getTransactionHash(
        address to,
        uint256 value,
        bytes memory data,
        uint8 operation,
        uint256 safeTxGas,
        uint256 baseGas,
        uint256 gasPrice,
        address gasToken,
        address refundReceiver,
        uint256 nonce
    ) external view returns (bytes32);

    function isModuleEnabled(address module) external view returns (bool);

    function isOwner(address owner) external view returns (bool);

    function nonce() external view returns (uint256);

    function removeOwner(address prevOwner, address owner, uint256 threshold) external;

    function requiredTxGas(address to, uint256 value, bytes memory data, uint8 operation) external returns (uint256);

    function setFallbackHandler(address handler) external;

    function setGuard(address guard) external;

    function setup(
        address[] memory owners,
        uint256 threshold,
        address to,
        bytes memory data,
        address fallbackHandler,
        address paymentToken,
        uint256 payment,
        address paymentReceiver
    ) external;

    function signedMessages(bytes32) external view returns (uint256);

    function simulateAndRevert(address targetContract, bytes memory calldataPayload) external;

    function swapOwner(address prevOwner, address oldOwner, address newOwner) external;
}