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
import { Router } from "../artifacts/Router.js";
import { TokenRouter, transferRemote_uint32_bytes32_uint256 as transferRemoteAbi } from "../artifacts/TokenRouter.js";
import { getOrDeployHypERC20Collateral } from "../token/getOrDeployHypERC20Collateral.js";
import { ERC20Test } from "../artifacts/ERC20Test.js";
import { IERC20 } from "../artifacts/IERC20.js";
import { getMessageFromReceipt } from "../mailbox/getMessageFromReceipt.js";
import { relayMessage } from "../relayer/relayMessage.js";
import { TokenTypeExtended } from "../types/TokenTypeExtended.js";
import { getOrDeployTokenRouter } from "../token/getOrDeployTokenRouter.js";

describe("warpRoute.test.ts", function () {
    const chainIdOrigin = localhost.id;
    const chainIdRemote = chainId2;

    const testToken = { name: "Test Token", symbol: "TT", decimals: 18, totalSupply: 0n };

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
        const { tokenRouterProxyAddress } = await getOrDeployTokenRouter(clientsOrigin.walletClient, {
            tokenType: TokenTypeExtended.collateral,
            mailboxAddress: mailboxAddressOrigin,
            collateralAddress: zeroAddress,
            owner: clientsOrigin.walletClient.account.address,
        });

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

    test("Deploy HypERC20 token", async () => {
        const tokenType = TokenTypeExtended.synthetic;
        const { tokenRouterProxyAddress } = await getOrDeployTokenRouter(clientsRemote.walletClient, {
            tokenType,
            owner: clientsRemote.walletClient.account.address,
            mailboxAddress: mailboxAddressRemote,
            ...testToken,
        });

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
                args: [testToken.name, testToken.symbol, testToken.totalSupply, testToken.decimals],
            }),
        });
        await clientsOrigin.publicClient.waitForTransactionReceipt({ hash: erc20.hash! });

        const { tokenRouterProxyAddress: tokenRouterProxyAddressOrigin } = await getOrDeployTokenRouter(
            clientsOrigin.walletClient,
            {
                tokenType: TokenTypeExtended.collateral,
                owner: clientsOrigin.walletClient.account.address,
                mailboxAddress: mailboxAddressOrigin,
                collateralAddress: erc20.address,
                ...testToken,
                proxyDeploySalt: randomSalt,
            },
        );

        const { tokenRouterProxyAddress: tokenRouterProxyAddressRemote } = await getOrDeployTokenRouter(
            clientsRemote.walletClient,
            {
                tokenType: TokenTypeExtended.synthetic,
                owner: clientsRemote.walletClient.account.address,
                mailboxAddress: mailboxAddressRemote,
                ...testToken,
                proxyDeploySalt: randomSalt,
            },
        );

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
            args: [tokenRouterProxyAddressOrigin, amount],
        });
        await clientsOrigin.publicClient.waitForTransactionReceipt({ hash: approveHash });

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
            address: tokenRouterProxyAddressRemote,
            abi: IERC20.abi,
            functionName: "balanceOf",
            args: [recipient],
        });
        expect(balanceRecipientRemote2).toStrictEqual(amount);
    });

    test("Deploy HypNative", async () => {
        const { tokenRouterProxyAddress } = await getOrDeployTokenRouter(clientsOrigin.walletClient, {
            tokenType: TokenTypeExtended.native,
            owner: clientsOrigin.walletClient.account.address,
            mailboxAddress: mailboxAddressOrigin,
        });

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

        const { tokenRouterProxyAddress: tokenRouterProxyAddressOrigin } = await getOrDeployTokenRouter(
            clientsOrigin.walletClient,
            {
                tokenType: TokenTypeExtended.native,
                owner: clientsOrigin.walletClient.account.address,
                mailboxAddress: mailboxAddressOrigin,
                proxyDeploySalt: randomSalt,
            },
        );

        const { tokenRouterProxyAddress: tokenRouterProxyAddressRemote } = await getOrDeployTokenRouter(
            clientsRemote.walletClient,
            {
                tokenType: TokenTypeExtended.synthetic,
                owner: clientsRemote.walletClient.account.address,
                mailboxAddress: mailboxAddressRemote,
                ...testToken,
                proxyDeploySalt: randomSalt,
            },
        );

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

        const { tokenRouterProxyAddress: tokenRouterProxyAddressOrigin } = await getOrDeployTokenRouter(
            clientsOrigin.walletClient,
            {
                tokenType: TokenTypeExtended.native,
                owner: clientsOrigin.walletClient.account.address,
                mailboxAddress: mailboxAddressOrigin,
                ...testToken,
                proxyDeploySalt: randomSalt,
            },
        );

        const { tokenRouterProxyAddress: tokenRouterProxyAddressRemote } = await getOrDeployTokenRouter(
            clientsRemote.walletClient,
            {
                tokenType: TokenTypeExtended.native,
                owner: clientsRemote.walletClient.account.address,
                mailboxAddress: mailboxAddressRemote,
                ...testToken,
                proxyDeploySalt: randomSalt,
            },
        );

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
        const { tokenRouterProxyAddress } = await getOrDeployTokenRouter(clientsRemote.walletClient, {
            tokenType: TokenTypeExtended.fastSynthetic,
            mailboxAddress: mailboxAddressRemote,
            ...testToken,
            owner: clientsRemote.walletClient.account.address,
        });

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
