// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

//Re-export & recompile contracts with increased optimization
import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import {SimpleAccount} from "@account-abstraction/contracts/samples/SimpleAccount.sol";
import {SimpleAccountFactory} from "@account-abstraction/contracts/samples/SimpleAccountFactory.sol";
import {VerifyingPaymaster} from "@account-abstraction/contracts/samples/VerifyingPaymaster.sol";
