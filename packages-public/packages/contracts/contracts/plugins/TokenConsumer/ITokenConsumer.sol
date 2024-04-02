// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface ITokenConsumer {
    function token() external view returns (address token);

    function setToken(address token) external;
}
