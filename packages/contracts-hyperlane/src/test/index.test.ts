import { describe, test, beforeAll, expect } from "vitest";
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
    Address,
    padHex,
    parseEventLogs,
    Hash,
    Hex,
} from "viem";
import {
    getLocalAccount,
    getOrDeployDeterministicContract,
    getOrDeployDeterministicDeployer,
} from "@owlprotocol/viem-utils";
import {
    getOrDeployCreate2Factory,
    getCloneDeterministicBytecode,
    getOrDeployContracts,
} from "@owlprotocol/contracts-create2factory";
import { localhost } from "viem/chains";
import { randomBytes } from "crypto";
import { port, port2, chainId2 } from "./constants.js";
import { Mailbox, initialize as initializeAbi, DispatchId as dispatchIdEvent } from "../artifacts/Mailbox.js";
import { NoopIsm } from "../artifacts/NoopIsm.js";
import { PausableHook } from "../artifacts/PausableHook.js";
import { Router } from "../artifacts/Router.js";
import { MailboxClient } from "../artifacts/MailboxClient.js";

const localhostRemote = { ...localhost, id: chainId2 } as Chain;

export async function getOrDeployTestIsmAndHook(params: {
    walletClient: WalletClient<Transport, Chain, Account>;
    publicClient: PublicClient<Transport, Chain>;
}): Promise<{ ismAddress: Address; hookAddress: Address }> {
    const { walletClient, publicClient } = params;
    const { address: ismAddress, hash: ismHash } = await getOrDeployDeterministicContract(
        { publicClient, walletClient },
        { salt: zeroHash, bytecode: NoopIsm.bytecode },
    );

    if (ismHash) {
        await publicClient.waitForTransactionReceipt({ hash: ismHash });
    }

    const { address: hookAddress, hash: hookHash } = await getOrDeployDeterministicContract(
        { publicClient, walletClient },
        {
            salt: zeroHash,
            bytecode: PausableHook.bytecode,
        },
    );

    if (hookHash) {
        await publicClient.waitForTransactionReceipt({ hash: hookHash });
    }

    return { ismAddress, hookAddress };
}

export async function getOrDeployDeployers(params: {
    walletClient: WalletClient<Transport, Chain, Account>;
    publicClient: PublicClient<Transport, Chain>;
}) {
    const { walletClient, publicClient } = params;

    const { hash: hashDeployer } = await getOrDeployDeterministicDeployer({ publicClient, walletClient });
    if (hashDeployer) {
        await publicClient.waitForTransactionReceipt({ hash: hashDeployer });
    }

    const { hash: hashCreate2Factory } = await getOrDeployCreate2Factory({ publicClient, walletClient });
    if (hashCreate2Factory) {
        await publicClient.waitForTransactionReceipt({ hash: hashCreate2Factory });
    }
}

async function getOrDeployMailboxImpl({
    publicClient,
    walletClient,
    salt = zeroHash,
}: {
    publicClient: PublicClient<Transport, Chain>;
    walletClient: WalletClient<Transport, Chain, Account>;
    salt?: Hash;
}): Promise<{ hash?: Hash; address: Address }> {
    const { address, hash } = await getOrDeployDeterministicContract(
        { publicClient, walletClient },
        {
            salt,
            bytecode: encodeDeployData({
                abi: Mailbox.abi,
                bytecode: Mailbox.bytecode,
                args: [publicClient.chain.id],
            }),
        },
    );

    if (hash) {
        await publicClient.waitForTransactionReceipt({ hash });
    }

    return { hash, address };
}

async function getOrDeployMailboxProxy({
    publicClient,
    walletClient,
    mailboxImplAddress,
    ismAddress,
    defaultHookAddress,
    requiredHookAddress,
    salt = zeroHash,
}: {
    publicClient: PublicClient<Transport, Chain>;
    walletClient: WalletClient<Transport, Chain, Account>;
    mailboxImplAddress: Address;
    ismAddress: Address;
    defaultHookAddress: Address;
    requiredHookAddress: Address;
    salt?: Hash;
}): Promise<{ hash?: Hash; address: Address }> {
    const deployMailbox = await getOrDeployContracts({ publicClient, walletClient }, zeroAddress, [
        {
            bytecode: getCloneDeterministicBytecode(mailboxImplAddress),
            initData: encodeFunctionData({
                abi: [initializeAbi],
                functionName: "initialize",
                args: [walletClient.account.address, ismAddress, defaultHookAddress, requiredHookAddress],
            }),
            salt,
        },
    ]);
    const mailboxAddress = deployMailbox.addresses[0].address;

    const hash = deployMailbox.hash;

    if (hash) {
        await publicClient.waitForTransactionReceipt({ hash });
    }

    return { hash, address: mailboxAddress };
}

async function getDispatchIdFromHash(params: {
    publicClient: PublicClient<Transport, Chain>;
    hash: Hash;
}): Promise<Hex | undefined> {
    const { publicClient, hash } = params;
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    const logsDecoded = parseEventLogs({ logs: receipt.logs, abi: [dispatchIdEvent], eventName: "DispatchId" });

    return logsDecoded[0].args.messageId;
}

type Clients = {
    publicClient: PublicClient<Transport, Chain>;
    walletClient: WalletClient<Transport, Chain, Account>;
};

describe("index.test.ts", function () {
    let clientsOrigin: Clients;
    let clientsRemote: Clients;

    let noopIsmAddressOrigin: Address;
    let pausableHookAddressOrigin: Address;

    let noopIsmAddressRemote: Address;
    let pausableHookAddressRemote: Address;

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

        await getOrDeployDeployers(clientsOrigin);
        await getOrDeployDeployers(clientsRemote);

        const ismAndHookOrigin = await getOrDeployTestIsmAndHook(clientsOrigin);
        noopIsmAddressOrigin = ismAndHookOrigin.ismAddress;
        pausableHookAddressOrigin = ismAndHookOrigin.hookAddress;

        const ismAndHookRemote = await getOrDeployTestIsmAndHook(clientsRemote);
        noopIsmAddressRemote = ismAndHookRemote.ismAddress;
        pausableHookAddressRemote = ismAndHookRemote.hookAddress;
    });

    test("Deploy Mailbox and dispatch a mesasge", async () => {
        const randomSalt = bytesToHex(randomBytes(32));

        const { address: mailboxImplAddressOrigin } = await getOrDeployMailboxImpl(clientsOrigin);

        const { address: mailboxAddressOrigin } = await getOrDeployMailboxProxy({
            ...clientsOrigin,
            mailboxImplAddress: mailboxImplAddressOrigin,
            ismAddress: noopIsmAddressOrigin,
            defaultHookAddress: pausableHookAddressOrigin,
            requiredHookAddress: pausableHookAddressOrigin,
            salt: randomSalt,
        });

        const mailboxOwner = await clientsOrigin.publicClient.readContract({
            address: mailboxAddressOrigin,
            abi: MailboxClient.abi,
            functionName: "owner",
        });
        expect(mailboxOwner).toEqual(clientsOrigin.walletClient.account.address);

        const hash = await clientsOrigin.walletClient.writeContract({
            address: mailboxAddressOrigin,
            abi: Mailbox.abi,
            functionName: "dispatch",
            args: [localhostRemote.id, padHex(clientsRemote.walletClient.account.address, { size: 32 }), "0x"],
        });

        const messageId = await getDispatchIdFromHash({ publicClient: clientsOrigin.publicClient, hash });

        expect(messageId).toBeDefined();
    });

    test("Pass a message with mailboxes", async () => {
        const randomSalt = bytesToHex(randomBytes(32));

        const { address: mailboxImplAddressOrigin } = await getOrDeployMailboxImpl(clientsOrigin);

        const { address: mailboxImplAddressRemote } = await getOrDeployMailboxImpl(clientsRemote);

        const { address: mailboxAddressOrigin } = await getOrDeployMailboxProxy({
            ...clientsOrigin,
            mailboxImplAddress: mailboxImplAddressOrigin,
            ismAddress: noopIsmAddressOrigin,
            defaultHookAddress: pausableHookAddressOrigin,
            requiredHookAddress: pausableHookAddressOrigin,
            salt: randomSalt,
        });

        const { address: mailboxAddressRemote } = await getOrDeployMailboxProxy({
            ...clientsRemote,
            mailboxImplAddress: mailboxImplAddressRemote,
            ismAddress: noopIsmAddressRemote,
            defaultHookAddress: pausableHookAddressRemote,
            requiredHookAddress: pausableHookAddressRemote,
            salt: randomSalt,
        });

        // TODO: dispatch a message

        // TODO: relay message

        // TODO: check mailbox on remote

        // TODO: check message is "processed" on origin
    });
});
