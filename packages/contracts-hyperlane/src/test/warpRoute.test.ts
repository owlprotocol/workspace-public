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
} from "viem";
import { getLocalAccount, Clients, numberToAddress, getOrDeployDeterministicContract } from "@owlprotocol/viem-utils";
import { localhost } from "viem/chains";
import { randomBytes } from "crypto";
import { port, port2, localhostRemote, chainId2 } from "./constants.js";
import { setupTestMailboxContractsWithProxy } from "./mailboxTestHelpers.js";
import { getOrDeployHypERC20Proxy } from "../token/getOrDeployHypERC20Proxy.js";
import { getOrDeployHypERC20Impl } from "../token/getOrDeployHypERC20Impl.js";
import { Router } from "../artifacts/Router.js";
import { TokenRouter, transferRemote_uint32_bytes32_uint256 as transferRemoteAbi } from "../artifacts/TokenRouter.js";
import { getOrDeployHypERC20CollateralImpl } from "../token/getOrDeployHypERC20CollateralImpl.js";
import { getOrDeployHypERC20CollateralProxy } from "../token/getOrDeployHypERC20CollateralProxy.js";
import { ERC20Test } from "../artifacts/ERC20Test.js";
import { IERC20 } from "../artifacts/IERC20.js";
import { getMessageFromReceipt } from "../mailbox/getMessageFromReceipt.js";
import { relayMessage } from "../relayer/relayMessage.js";

describe("warpRoute.test.ts", function () {
    const chainIdOrigin = localhost.id;
    const chainIdRemote = chainId2;

    const testToken = { name: "Test Token", totalSupply: 0n, symbol: "TT", decimals: 18 };

    let clientsOrigin: Clients;
    let clientsRemote: Clients;

    let mailboxAddressOrigin: Address;
    let mailboxAddressRemote: Address;

    let hypERC20ImplAddressRemote: Address;

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

        const mailboxContractsOrigin = await setupTestMailboxContractsWithProxy(clientsOrigin);
        mailboxAddressOrigin = mailboxContractsOrigin.mailbox.address;

        const mailboxContractsRemote = await setupTestMailboxContractsWithProxy(clientsRemote);
        mailboxAddressRemote = mailboxContractsRemote.mailbox.address;

        const hypERC20ImplRemote = await getOrDeployHypERC20Impl({
            ...clientsRemote,
            mailboxAddress: mailboxAddressRemote,
        });
        if (hypERC20ImplRemote.hash) {
            clientsRemote.publicClient.waitForTransactionReceipt({ hash: hypERC20ImplRemote.hash });
        }
        hypERC20ImplAddressRemote = hypERC20ImplRemote.address;
    });

    test("Deploy HypERC20Collateral token", async () => {
        const hypERC20CollateralImplOrigin = await getOrDeployHypERC20CollateralImpl({
            ...clientsOrigin,
            mailboxAddress: mailboxAddressOrigin,
            erc20Address: zeroAddress,
        });
        if (hypERC20CollateralImplOrigin.hash) {
            clientsOrigin.publicClient.waitForTransactionReceipt({ hash: hypERC20CollateralImplOrigin.hash });
        }

        const hypERC20CollateralOrigin = await getOrDeployHypERC20CollateralProxy({
            ...clientsOrigin,
            hypERC20CollateralImplAddress: hypERC20CollateralImplOrigin.address,
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

    test("Deploy HypERC20token", async () => {
        const hypERC20Remote = await getOrDeployHypERC20Proxy({
            ...clientsRemote,
            ...testToken,
            hypERC20ImplAddress: hypERC20ImplAddressRemote,
            owner: clientsRemote.walletClient.account.address,
        });
        if (hypERC20Remote.hash) {
            clientsRemote.publicClient.waitForTransactionReceipt({ hash: hypERC20Remote.hash });
        }

        const fakeRouterAddressPadded = padHex(zeroAddress, { size: 32 });
        const fakeChainId = 150150;
        const enrollHash = await clientsRemote.walletClient.writeContract({
            address: hypERC20Remote.address,
            abi: Router.abi,
            functionName: "enrollRemoteRouter",
            args: [fakeChainId, fakeRouterAddressPadded],
        });
        await clientsRemote.publicClient.waitForTransactionReceipt({ hash: enrollHash });

        const routerDomains = await clientsRemote.publicClient.readContract({
            address: hypERC20Remote.address,
            abi: Router.abi,
            functionName: "domains",
        });
        expect(routerDomains).toContain(fakeChainId);
    });

    test("Mint a HypERC20 and transfer to remote chain", async () => {
        const randomSalt = bytesToHex(randomBytes(32));
        const erc20 = await getOrDeployDeterministicContract(clientsOrigin, {
            salt: randomSalt,
            bytecode: encodeDeployData({
                abi: ERC20Test.abi,
                bytecode: ERC20Test.bytecode,
                args: [testToken.name, testToken.symbol, testToken.totalSupply, testToken.decimals],
            }),
        });
        await clientsOrigin.publicClient.waitForTransactionReceipt({ hash: erc20.hash! });

        const hypERC20CollateralImplOrigin = await getOrDeployHypERC20CollateralImpl({
            ...clientsOrigin,
            mailboxAddress: mailboxAddressOrigin,
            erc20Address: erc20.address,
            salt: randomSalt,
        });
        await clientsOrigin.publicClient.waitForTransactionReceipt({ hash: hypERC20CollateralImplOrigin.hash! });

        const hypERC20CollateralOrigin = await getOrDeployHypERC20CollateralProxy({
            ...clientsOrigin,
            hypERC20CollateralImplAddress: hypERC20CollateralImplOrigin.address,
            owner: clientsOrigin.walletClient.account.address,
            salt: randomSalt,
        });
        await clientsOrigin.publicClient.waitForTransactionReceipt({ hash: hypERC20CollateralOrigin.hash! });

        const hypERC20Remote = await getOrDeployHypERC20Proxy({
            ...clientsRemote,
            ...testToken,
            hypERC20ImplAddress: hypERC20ImplAddressRemote,
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
});
