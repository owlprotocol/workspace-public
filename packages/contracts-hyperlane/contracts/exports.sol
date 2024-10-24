// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

//Re-export & recompile contracts with increased optimization

//interfaces
import {IInterchainSecurityModule} from "@hyperlane-xyz/core/contracts/interfaces/IInterchainSecurityModule.sol";
import {IMailbox} from "@hyperlane-xyz/core/contracts/interfaces/IMailbox.sol";
import {IMessageRecipient} from "@hyperlane-xyz/core/contracts/interfaces/IMessageRecipient.sol";
import {IRouter} from "@hyperlane-xyz/core/contracts/interfaces/IRouter.sol";
import {IRoutingIsm} from "@hyperlane-xyz/core/contracts/interfaces/isms/IRoutingIsm.sol";

//implementations
import {Mailbox} from "@hyperlane-xyz/core/contracts/Mailbox.sol";
import {MailboxClient} from "@hyperlane-xyz/core/contracts/client/MailboxClient.sol";
import {Router} from "@hyperlane-xyz/core/contracts/client/Router.sol";

import {InterchainAccountRouter} from "@hyperlane-xyz/core/contracts/middleware/InterchainAccountRouter.sol";
import {InterchainQueryRouter} from "@hyperlane-xyz/core/contracts/middleware/InterchainQueryRouter.sol";
import {OwnableMulticall} from "@hyperlane-xyz/core/contracts/middleware/libs/OwnableMulticall.sol";

import {TrustedRelayerIsm} from "@hyperlane-xyz/core/contracts/isms/TrustedRelayerIsm.sol";
import {NoopIsm} from "@hyperlane-xyz/core/contracts/isms/NoopIsm.sol";

import {TokenRouter} from "@hyperlane-xyz/core/contracts/token/libs/TokenRouter.sol";
import {HypERC20} from "@hyperlane-xyz/core/contracts/token/HypERC20.sol";
import {HypERC20Collateral} from "@hyperlane-xyz/core/contracts/token/HypERC20Collateral.sol";
import {HypNative} from "@hyperlane-xyz/core/contracts/token/HypNative.sol";

import {PausableHook} from "@hyperlane-xyz/core/contracts/hooks/PausableHook.sol";
import {TestRecipient} from "@hyperlane-xyz/core/contracts/test/TestRecipient.sol";
import {ERC20Test} from "@hyperlane-xyz/core/contracts/test/ERC20Test.sol";

import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";
