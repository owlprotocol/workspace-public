import { describe, test, beforeAll, expect } from "vitest";
import {
    createPublicClient,
    createWalletClient,
    http,
    Address,
    zeroAddress,
    padHex,
    bytesToHex,
    encodeDeployData,
    parseEventLogs,
    Account,
    Chain,
    PublicClient,
    Transport,
    WalletClient,
} from "viem";
import { getLocalAccount, numberToAddress, getOrDeployDeterministicContract } from "@owlprotocol/viem-utils";
import { localhost } from "viem/chains";
import { randomBytes } from "crypto";
import { port, port2, localhostRemote, chainId2 } from "./constants.js";
import { setupTestMailboxContracts } from "./mailboxTestHelpers.js";
import { getOrDeployHypERC20 } from "../token/getOrDeployHypERC20.js";
import { Router } from "../artifacts/Router.js";
import { TokenRouter, transferRemote_uint32_bytes32_uint256 as transferRemoteAbi } from "../artifacts/TokenRouter.js";
import { getOrDeployHypERC20Collateral } from "../token/getOrDeployHypERC20Collateral.js";
import { ERC20Test } from "../artifacts/ERC20Test.js";
import { IERC20 } from "../artifacts/IERC20.js";
import { getMessageFromReceipt } from "../mailbox/getMessageFromReceipt.js";
import { relayMessage } from "../relayer/relayMessage.js";
import { getTokenRouterDeployTransactions } from "../token/getTokenRouterDeployTransactions.js";
import { TokenTypeExtended } from "../types/TokenTypeExtended.js";

describe("warpRoute.test.ts", function () {
    const chainIdOrigin = localhost.id;
    const chainIdRemote = chainId2;

    const testToken = { name: "Test Token", symbol: "TT", decimals: 18 };
    const testTotalSupply = 0n;

    let clientsOrigin: {
        publicClient: PublicClient<Transport, Chain>;
        walletClient: WalletClient<Transport, Chain, Account>;
    };
    let clientsRemote: {
        publicClient: PublicClient<Transport, Chain>;
        walletClient: WalletClient<Transport, Chain, Account>;
    };

    let mailboxAddressOrigin: Address;
    let mailboxAddressRemote: Address;

    beforeAll(async () => {
        const transport = http(`http://127.0.0.1:${port}`);
        const transportRemote = http(`http://127.0.0.1:${port2}`);

        clientsOrigin = {
            publicClient: createPublicClient({ chain: localhost, transport }),
            walletClient: createWalletClient({ account: getLocalAccount(0), chain: localhost, transport }),
        };
        clientsRemote = {
            publicClient: createPublicClient({ chain: localhostRemote, transport: transportRemote }),
            walletClient: createWalletClient({
                account: getLocalAccount(0),
                chain: localhostRemote,
                transport: transportRemote,
            }),
        };

        const mailboxContractsOrigin = await setupTestMailboxContracts(clientsOrigin.walletClient);
        mailboxAddressOrigin = mailboxContractsOrigin.mailbox.address;

        const mailboxContractsRemote = await setupTestMailboxContracts(clientsRemote.walletClient);
        mailboxAddressRemote = mailboxContractsRemote.mailbox.address;
    });

    test("Deploy HypERC20Collateral", async () => {
        const hypERC20CollateralOrigin = await getOrDeployHypERC20Collateral(clientsOrigin.walletClient, {
            mailboxAddress: mailboxAddressOrigin,
            erc20Address: zeroAddress,
            owner: clientsOrigin.walletClient.account.address,
        });
        if (hypERC20CollateralOrigin.hash) {
            clientsOrigin.publicClient.waitForTransactionReceipt({ hash: hypERC20CollateralOrigin.hash });
        }

        const fakeRouterAddressPadded = padHex(zeroAddress, { size: 32 });
        const fakeChainId = 150150;

        await clientsOrigin.walletClient.writeContract({
            address: hypERC20CollateralOrigin.address,
            abi: Router.abi,
            functionName: "enrollRemoteRouter",
            args: [fakeChainId, fakeRouterAddressPadded],
        });

        const routerDomains = await clientsOrigin.publicClient.readContract({
            address: hypERC20CollateralOrigin.address,
            abi: Router.abi,
            functionName: "domains",
        });
        expect(routerDomains).toContain(fakeChainId);
    });

    test("Deploy HypERC20 token", async () => {
        const tokenType = TokenTypeExtended.synthetic;
        const { transactions, tokenRouterProxyAddress } = await getTokenRouterDeployTransactions(
            clientsRemote.walletClient,
            {
                tokenType,
                owner: clientsRemote.walletClient.account.address,
                mailboxAddress: mailboxAddressRemote,
                tokenMetadata: testToken,
            },
        );

        if (transactions.length > 0) {
            for (const tx of transactions) {
                const hash = await clientsRemote.walletClient.sendTransaction(tx);
                await clientsRemote.publicClient.waitForTransactionReceipt({ hash });
            }
        }

        const fakeRouterAddressPadded = padHex(zeroAddress, { size: 32 });
        const fakeChainId = 150150;
        const enrollHash = await clientsRemote.walletClient.writeContract({
            address: tokenRouterProxyAddress,
            abi: Router.abi,
            functionName: "enrollRemoteRouter",
            args: [fakeChainId, fakeRouterAddressPadded],
        });
        await clientsRemote.publicClient.waitForTransactionReceipt({ hash: enrollHash });

        const routerDomains = await clientsRemote.publicClient.readContract({
            address: tokenRouterProxyAddress,
            abi: Router.abi,
            functionName: "domains",
        });
        expect(routerDomains).toContain(fakeChainId);
    });

    test("Mint a HypERC20 and transfer to remote chain", async () => {
        const randomSalt = bytesToHex(randomBytes(32));
        const erc20 = await getOrDeployDeterministicContract(clientsOrigin.walletClient, {
            salt: randomSalt,
            bytecode: encodeDeployData({
                abi: ERC20Test.abi,
                bytecode: ERC20Test.bytecode,
                args: [testToken.name, testToken.symbol, testTotalSupply, testToken.decimals],
            }),
        });
        await clientsOrigin.publicClient.waitForTransactionReceipt({ hash: erc20.hash! });

        const hypERC20CollateralOrigin = await getOrDeployHypERC20Collateral(clientsOrigin.walletClient, {
            mailboxAddress: mailboxAddressOrigin,
            erc20Address: erc20.address,
            owner: clientsOrigin.walletClient.account.address,
            salt: randomSalt,
        });
        await clientsOrigin.publicClient.waitForTransactionReceipt({ hash: hypERC20CollateralOrigin.hash! });

        const hypERC20Remote = await getOrDeployHypERC20(clientsRemote.walletClient, {
            mailboxAddress: mailboxAddressRemote,
            ...testToken,
            totalSupply: testTotalSupply,
            owner: clientsRemote.walletClient.account.address,
            salt: randomSalt,
        });
        if (hypERC20Remote.hash) {
            clientsRemote.publicClient.waitForTransactionReceipt({ hash: hypERC20Remote.hash });
        }

        const enrollRemoteRouterHashOrigin = await clientsOrigin.walletClient.writeContract({
            address: hypERC20CollateralOrigin.address,
            abi: Router.abi,
            functionName: "enrollRemoteRouter",
            args: [chainIdRemote, padHex(hypERC20Remote.address, { size: 32 })],
        });
        await clientsOrigin.publicClient.waitForTransactionReceipt({ hash: enrollRemoteRouterHashOrigin });

        const enrollRemoteRouterHashRemote = await clientsRemote.walletClient.writeContract({
            address: hypERC20Remote.address,
            abi: Router.abi,
            functionName: "enrollRemoteRouter",
            args: [chainIdOrigin, padHex(hypERC20CollateralOrigin.address, { size: 32 })],
        });
        await clientsRemote.publicClient.waitForTransactionReceipt({ hash: enrollRemoteRouterHashRemote });

        const amount = 10_000n;
        const mintHash = await clientsOrigin.walletClient.writeContract({
            address: erc20.address,
            abi: ERC20Test.abi,
            functionName: "mint",
            args: [amount],
        });
        await clientsOrigin.publicClient.waitForTransactionReceipt({ hash: mintHash });

        const approveHash = await clientsOrigin.walletClient.writeContract({
            address: erc20.address,
            abi: IERC20.abi,
            functionName: "approve",
            args: [hypERC20CollateralOrigin.address, amount],
        });
        await clientsOrigin.publicClient.waitForTransactionReceipt({ hash: approveHash });

        const recipient = numberToAddress(1);

        const balanceRecipientRemote = await clientsRemote.publicClient.readContract({
            address: hypERC20Remote.address,
            abi: IERC20.abi,
            functionName: "balanceOf",
            args: [recipient],
        });
        expect(balanceRecipientRemote).toStrictEqual(0n);

        const transferRemoteHash = await clientsOrigin.walletClient.writeContract({
            address: hypERC20CollateralOrigin.address,
            abi: [transferRemoteAbi],
            functionName: "transferRemote",
            args: [chainIdRemote, padHex(recipient, { size: 32 }), amount],
        });

        const transferRemoteReceipt = await clientsOrigin.publicClient.waitForTransactionReceipt({
            hash: transferRemoteHash,
        });
        const message = getMessageFromReceipt(transferRemoteReceipt);

        const emptyMetadata = "0x0";

        const relayHash = await relayMessage({
            walletClient: clientsRemote.walletClient,
            message,
            metadata: emptyMetadata,
            mailboxAddress: mailboxAddressRemote,
        });
        const relayReceipt = await clientsRemote.publicClient.waitForTransactionReceipt({ hash: relayHash });

        const receivedTransferRemoteLogs = parseEventLogs({
            abi: TokenRouter.abi,
            eventName: "ReceivedTransferRemote",
            logs: relayReceipt.logs,
        })[0];

        expect(receivedTransferRemoteLogs.args).toEqual({
            origin: clientsOrigin.publicClient.chain.id,
            recipient: padHex(recipient, { size: 32 }),
            amount,
        });

        const balanceRecipientRemote2 = await clientsRemote.publicClient.readContract({
            address: hypERC20Remote.address,
            abi: IERC20.abi,
            functionName: "balanceOf",
            args: [recipient],
        });
        expect(balanceRecipientRemote2).toStrictEqual(amount);
    });

    test("Deploy HypNative", async () => {
        const tokenType = TokenTypeExtended.native;
        const { transactions, tokenRouterProxyAddress } = await getTokenRouterDeployTransactions(
            clientsOrigin.walletClient,
            {
                tokenType,
                owner: clientsOrigin.walletClient.account.address,
                mailboxAddress: mailboxAddressOrigin,
            },
        );

        if (transactions.length > 0) {
            for (const tx of transactions) {
                const hash = await clientsOrigin.walletClient.sendTransaction(tx);
                await clientsOrigin.publicClient.waitForTransactionReceipt({ hash });
            }
        }

        const fakeRouterAddressPadded = padHex(zeroAddress, { size: 32 });
        const fakeChainId = 150150;

        await clientsOrigin.walletClient.writeContract({
            address: tokenRouterProxyAddress,
            abi: Router.abi,
            functionName: "enrollRemoteRouter",
            args: [fakeChainId, fakeRouterAddressPadded],
        });

        const routerDomains = await clientsOrigin.publicClient.readContract({
            address: tokenRouterProxyAddress,
            abi: Router.abi,
            functionName: "domains",
        });
        expect(routerDomains).toContain(fakeChainId);
    });

    test("Transfer native to remote HypERC20", async () => {
        const randomSalt = bytesToHex(randomBytes(32));

        const { transactions: transactionsOrigin, tokenRouterProxyAddress: tokenRouterProxyAddressOrigin } =
            await getTokenRouterDeployTransactions(clientsOrigin.walletClient, {
                tokenType: TokenTypeExtended.native,
                owner: clientsOrigin.walletClient.account.address,
                mailboxAddress: mailboxAddressOrigin,
                proxyDeploySalt: randomSalt,
            });

        if (transactionsOrigin.length > 0) {
            for (const tx of transactionsOrigin) {
                const hash = await clientsOrigin.walletClient.sendTransaction(tx);
                await clientsOrigin.publicClient.waitForTransactionReceipt({ hash });
            }
        }

        const { transactions: transactionsRemote, tokenRouterProxyAddress: tokenRouterProxyAddressRemote } =
            await getTokenRouterDeployTransactions(clientsRemote.walletClient, {
                tokenType: TokenTypeExtended.synthetic,
                owner: clientsRemote.walletClient.account.address,
                mailboxAddress: mailboxAddressRemote,
                tokenMetadata: testToken,
                proxyDeploySalt: randomSalt,
            });

        if (transactionsRemote.length > 0) {
            for (const tx of transactionsRemote) {
                const hash = await clientsRemote.walletClient.sendTransaction(tx);
                await clientsRemote.publicClient.waitForTransactionReceipt({ hash });
            }
        }

        const enrollRemoteRouterHashOrigin = await clientsOrigin.walletClient.writeContract({
            address: tokenRouterProxyAddressOrigin,
            abi: Router.abi,
            functionName: "enrollRemoteRouter",
            args: [chainIdRemote, padHex(tokenRouterProxyAddressRemote, { size: 32 })],
        });
        await clientsOrigin.publicClient.waitForTransactionReceipt({ hash: enrollRemoteRouterHashOrigin });

        const enrollRemoteRouterHashRemote = await clientsRemote.walletClient.writeContract({
            address: tokenRouterProxyAddressRemote,
            abi: Router.abi,
            functionName: "enrollRemoteRouter",
            args: [chainIdOrigin, padHex(tokenRouterProxyAddressOrigin, { size: 32 })],
        });
        await clientsRemote.publicClient.waitForTransactionReceipt({ hash: enrollRemoteRouterHashRemote });

        const amount = 10_000n;

        const recipient = numberToAddress(1);

        const balanceRecipientRemote = await clientsRemote.publicClient.readContract({
            address: tokenRouterProxyAddressRemote,
            abi: IERC20.abi,
            functionName: "balanceOf",
            args: [recipient],
        });
        expect(balanceRecipientRemote).toStrictEqual(0n);

        const transferRemoteHash = await clientsOrigin.walletClient.writeContract({
            address: tokenRouterProxyAddressOrigin,
            abi: [transferRemoteAbi],
            functionName: "transferRemote",
            args: [chainIdRemote, padHex(recipient, { size: 32 }), amount],
            value: amount,
        });

        const transferRemoteReceipt = await clientsOrigin.publicClient.waitForTransactionReceipt({
            hash: transferRemoteHash,
        });
        const message = getMessageFromReceipt(transferRemoteReceipt);

        const emptyMetadata = "0x0";

        const relayHash = await relayMessage({
            walletClient: clientsRemote.walletClient,
            message,
            metadata: emptyMetadata,
            mailboxAddress: mailboxAddressRemote,
            value: amount,
        });
        const relayReceipt = await clientsRemote.publicClient.waitForTransactionReceipt({ hash: relayHash });

        const receivedTransferRemoteLogs = parseEventLogs({
            abi: TokenRouter.abi,
            eventName: "ReceivedTransferRemote",
            logs: relayReceipt.logs,
        })[0];

        expect(receivedTransferRemoteLogs.args).toEqual({
            origin: clientsOrigin.publicClient.chain.id,
            recipient: padHex(recipient, { size: 32 }),
            amount,
        });

        const balanceRecipientRemote2 = await clientsRemote.publicClient.readContract({
            address: tokenRouterProxyAddressRemote,
            abi: IERC20.abi,
            functionName: "balanceOf",
            args: [recipient],
        });
        expect(balanceRecipientRemote2).toStrictEqual(amount);
    });

    test("Transfer native to native", async () => {
        const randomSalt = bytesToHex(randomBytes(32));

        const { transactions: transactionsOrigin, tokenRouterProxyAddress: tokenRouterProxyAddressOrigin } =
            await getTokenRouterDeployTransactions(clientsOrigin.walletClient, {
                tokenType: TokenTypeExtended.native,
                owner: clientsOrigin.walletClient.account.address,
                mailboxAddress: mailboxAddressOrigin,
                tokenMetadata: testToken,
                proxyDeploySalt: randomSalt,
            });

        if (transactionsOrigin.length > 0) {
            for (const tx of transactionsOrigin) {
                const hash = await clientsOrigin.walletClient.sendTransaction(tx);
                await clientsOrigin.publicClient.waitForTransactionReceipt({ hash });
            }
        }

        const { transactions: transactionsRemote, tokenRouterProxyAddress: tokenRouterProxyAddressRemote } =
            await getTokenRouterDeployTransactions(clientsRemote.walletClient, {
                tokenType: TokenTypeExtended.native,
                owner: clientsRemote.walletClient.account.address,
                mailboxAddress: mailboxAddressRemote,
                tokenMetadata: testToken,
                proxyDeploySalt: randomSalt,
            });

        if (transactionsRemote.length > 0) {
            for (const tx of transactionsRemote) {
                const hash = await clientsRemote.walletClient.sendTransaction(tx);
                await clientsRemote.publicClient.waitForTransactionReceipt({ hash });
            }
        }

        const enrollRemoteRouterHashOrigin = await clientsOrigin.walletClient.writeContract({
            address: tokenRouterProxyAddressOrigin,
            abi: Router.abi,
            functionName: "enrollRemoteRouter",
            args: [chainIdRemote, padHex(tokenRouterProxyAddressRemote, { size: 32 })],
        });
        await clientsOrigin.publicClient.waitForTransactionReceipt({ hash: enrollRemoteRouterHashOrigin });

        const enrollRemoteRouterHashRemote = await clientsRemote.walletClient.writeContract({
            address: tokenRouterProxyAddressRemote,
            abi: Router.abi,
            functionName: "enrollRemoteRouter",
            args: [chainIdOrigin, padHex(tokenRouterProxyAddressOrigin, { size: 32 })],
        });
        await clientsRemote.publicClient.waitForTransactionReceipt({ hash: enrollRemoteRouterHashRemote });

        const amount = 10_000n;

        const recipient = numberToAddress(1);

        const balanceRecipientRemote1 = await clientsRemote.publicClient.getBalance({
            address: recipient,
        });

        const transferRemoteHash = await clientsOrigin.walletClient.writeContract({
            address: tokenRouterProxyAddressOrigin,
            abi: [transferRemoteAbi],
            functionName: "transferRemote",
            args: [chainIdRemote, padHex(recipient, { size: 32 }), amount],
            value: amount,
        });

        const transferRemoteReceipt = await clientsOrigin.publicClient.waitForTransactionReceipt({
            hash: transferRemoteHash,
        });
        const message = getMessageFromReceipt(transferRemoteReceipt);

        const emptyMetadata = "0x0";

        const relayHash = await relayMessage({
            walletClient: clientsRemote.walletClient,
            message,
            metadata: emptyMetadata,
            mailboxAddress: mailboxAddressRemote,
            value: amount,
        });
        const relayReceipt = await clientsRemote.publicClient.waitForTransactionReceipt({ hash: relayHash });

        const receivedTransferRemoteLogs = parseEventLogs({
            abi: TokenRouter.abi,
            eventName: "ReceivedTransferRemote",
            logs: relayReceipt.logs,
        })[0];

        expect(receivedTransferRemoteLogs.args).toEqual({
            origin: clientsOrigin.publicClient.chain.id,
            recipient: padHex(recipient, { size: 32 }),
            amount,
        });

        const balanceRecipientRemote2 = await clientsRemote.publicClient.getBalance({
            address: recipient,
        });
        expect(balanceRecipientRemote2 - balanceRecipientRemote1).toStrictEqual(amount);
    });

    test("Deploy FastHypERC20 token", async () => {
        const fastHypERC20Remote = await getOrDeployHypERC20(clientsRemote.walletClient, {
            mailboxAddress: mailboxAddressRemote,
            ...testToken,
            owner: clientsRemote.walletClient.account.address,
            extension: "fastSynthetic",
        });
        if (fastHypERC20Remote.hash) {
            clientsRemote.publicClient.waitForTransactionReceipt({ hash: fastHypERC20Remote.hash });
        }

        const fakeRouterAddressPadded = padHex(zeroAddress, { size: 32 });
        const fakeChainId = 150150;
        const enrollHash = await clientsRemote.walletClient.writeContract({
            address: fastHypERC20Remote.address,
            abi: Router.abi,
            functionName: "enrollRemoteRouter",
            args: [fakeChainId, fakeRouterAddressPadded],
        });
        await clientsRemote.publicClient.waitForTransactionReceipt({ hash: enrollHash });

        const routerDomains = await clientsRemote.publicClient.readContract({
            address: fastHypERC20Remote.address,
            abi: Router.abi,
            functionName: "domains",
        });
        expect(routerDomains).toContain(fakeChainId);
    });

    test("Deploy FastHypERC20Collateral", async () => {
        const fastHypERC20CollateralOrigin = await getOrDeployHypERC20Collateral(clientsOrigin.walletClient, {
            mailboxAddress: mailboxAddressOrigin,
            erc20Address: zeroAddress,
            owner: clientsOrigin.walletClient.account.address,
            extension: "fastCollateral",
        });
        if (fastHypERC20CollateralOrigin.hash) {
            clientsOrigin.publicClient.waitForTransactionReceipt({ hash: fastHypERC20CollateralOrigin.hash });
        }

        const fakeRouterAddressPadded = padHex(zeroAddress, { size: 32 });
        const fakeChainId = 150150;

        await clientsOrigin.walletClient.writeContract({
            address: fastHypERC20CollateralOrigin.address,
            abi: Router.abi,
            functionName: "enrollRemoteRouter",
            args: [fakeChainId, fakeRouterAddressPadded],
        });

        const routerDomains = await clientsOrigin.publicClient.readContract({
            address: fastHypERC20CollateralOrigin.address,
            abi: Router.abi,
            functionName: "domains",
        });
        expect(routerDomains).toContain(fakeChainId);
    });
    test("Deploy HypFiatToken", async () => {
        const hypFiatTokenOrigin = await getOrDeployHypERC20Collateral(clientsOrigin.walletClient, {
            mailboxAddress: mailboxAddressOrigin,
            erc20Address: zeroAddress,
            owner: clientsOrigin.walletClient.account.address,
            extension: "collateralFiat",
        });
        if (hypFiatTokenOrigin.hash) {
            clientsOrigin.publicClient.waitForTransactionReceipt({ hash: hypFiatTokenOrigin.hash });
        }

        const fakeRouterAddressPadded = padHex(zeroAddress, { size: 32 });
        const fakeChainId = 150150;

        await clientsOrigin.walletClient.writeContract({
            address: hypFiatTokenOrigin.address,
            abi: Router.abi,
            functionName: "enrollRemoteRouter",
            args: [fakeChainId, fakeRouterAddressPadded],
        });

        const routerDomains = await clientsOrigin.publicClient.readContract({
            address: hypFiatTokenOrigin.address,
            abi: Router.abi,
            functionName: "domains",
        });
        expect(routerDomains).toContain(fakeChainId);
    });
});
