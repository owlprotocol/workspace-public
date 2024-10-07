import { describe, test, expect, beforeAll } from "vitest";
import {
    PublicClient,
    Transport,
    Chain,
    WalletClient,
    Account,
    createPublicClient,
    createWalletClient,
    http,
    encodeDeployData,
    encodeFunctionData,
    zeroHash,
    zeroAddress,
    bytesToHex,
} from "viem";
import {
    getLocalAccount,
    getOrDeployDeterministicContract,
    getOrDeployDeterministicDeployer,
} from "@owlprotocol/viem-utils";
import {
    getOrDeployContracts,
    getOrDeployCreate2Factory,
    getCloneDeterministicBytecode,
} from "@owlprotocol/contracts-create2factory";
import { localhost } from "viem/chains";
import { port, port2, chainId2 } from "./constants.js";
import { Mailbox, initialize as initializeAbi } from "../artifacts/Mailbox.js";
import { randomBytes } from "crypto";

const localhostRemote = { ...localhost, id: chainId2 } as Chain;

describe("index.test.ts", function () {
    let publicClientOrigin: PublicClient<Transport, Chain>;
    let walletClientOrigin: WalletClient<Transport, Chain, Account>;

    let publicClientRemote: PublicClient<Transport, Chain>;
    let walletClientRemote: WalletClient<Transport, Chain, Account>;

    beforeAll(async () => {
        const transport = http(`http://127.0.0.1:${port}`);
        const transportRemote = http(`http://127.0.0.1:${port2}`);

        publicClientOrigin = createPublicClient({
            chain: localhost,
            transport,
        });
        walletClientOrigin = createWalletClient({
            account: getLocalAccount(0),
            chain: localhost,
            transport,
        });

        publicClientRemote = createPublicClient({
            chain: localhostRemote,
            transport: transportRemote,
        });
        walletClientRemote = createWalletClient({
            account: getLocalAccount(0),
            chain: localhostRemote,
            transport: transportRemote,
        });

        //Deploy DeterministicDeployer
        const { hash: hashDeployerOrigin } = await getOrDeployDeterministicDeployer({
            publicClient: publicClientOrigin,
            walletClient: walletClientOrigin,
        });
        if (hashDeployerOrigin) {
            await publicClientOrigin.waitForTransactionReceipt({ hash: hashDeployerOrigin });
        }

        const { hash: hashDeployerRemote } = await getOrDeployDeterministicDeployer({
            publicClient: publicClientRemote,
            walletClient: walletClientRemote,
        });
        if (hashDeployerRemote) {
            await publicClientRemote.waitForTransactionReceipt({ hash: hashDeployerRemote });
        }

        const { hash: hashCreate2Factory } = await getOrDeployCreate2Factory({
            publicClient: publicClientOrigin,
            walletClient: walletClientOrigin,
        });
        if (hashCreate2Factory) {
            await publicClientOrigin.waitForTransactionReceipt({ hash: hashCreate2Factory });
        }

        const { hash: hashCreate2FactoryRemote } = await getOrDeployCreate2Factory({
            publicClient: publicClientRemote,
            walletClient: walletClientRemote,
        });
        if (hashCreate2FactoryRemote) {
            await publicClientRemote.waitForTransactionReceipt({ hash: hashCreate2FactoryRemote });
        }
    });

    test("Pass a message with mailboxes", async () => {
        const { address: mailboxImplAddressOrigin } = await getOrDeployDeterministicContract(
            { publicClient: publicClientOrigin, walletClient: walletClientOrigin },
            {
                salt: zeroHash,
                bytecode: encodeDeployData({
                    abi: Mailbox.abi,
                    bytecode: Mailbox.bytecode,
                    args: [localhost.id],
                }),
            },
        );

        const { address: mailboxImplAddressRemote } = await getOrDeployDeterministicContract(
            { publicClient: publicClientRemote, walletClient: walletClientRemote },
            {
                salt: zeroHash,
                bytecode: encodeDeployData({
                    abi: Mailbox.abi,
                    bytecode: Mailbox.bytecode,
                    args: [localhostRemote.id],
                }),
            },
        );

        // TODO: deploy ism and hooks, replace with proper values
        const noopIsm = zeroAddress;
        const defaultHook = zeroAddress;

        await getOrDeployContracts(
            { publicClient: publicClientOrigin, walletClient: walletClientOrigin },
            zeroAddress,
            [
                {
                    bytecode: getCloneDeterministicBytecode(mailboxImplAddressOrigin),
                    initData: encodeFunctionData({
                        abi: [initializeAbi],
                        functionName: "initialize",
                        args: [walletClientOrigin.account.address, noopIsm, defaultHook, defaultHook],
                    }),
                    salt: bytesToHex(randomBytes(32)),
                },
            ],
        );
    });
});
