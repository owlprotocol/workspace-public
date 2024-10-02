//@ts-nocheck
import {
    Account,
    Address,
    Chain,
    createPublicClient,
    createWalletClient,
    encodeFunctionData,
    http,
    parseEventLogs,
    Transport,
    WalletClient,
    zeroAddress,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { bscTestnet, scrollSepolia } from "viem/chains";
import { GithubRegistry } from "@hyperlane-xyz/registry";
import { getLocalInterchainAccount, getRemoteInterchainAccount } from "../InterchainAccountRouter.js";
import { DispatchId as DispatchIdEvent } from "../artifacts/IMailbox.js";
import { domains } from "../artifacts/IRouter.js";
import "dotenv/config";
import { InterchainAccount } from "../accounts/interchainAccount.js";
import { sendTransaction } from "../actions/ica/sendTransaction.js";
import { writeContract } from "../actions/ica/writeContract.js";

const PRIVATE_KEY = process.env.PRIVATE_KEY;
if (!PRIVATE_KEY) throw new Error("Need PRIVATE_KEY");

interface InterchainAddresses {
    mailbox: Address;
    interchainAccountIsm: Address;
    interchainAccountRouter: Address;
}

const origin = bscTestnet;
const originChainName = "bsctestnet";

const remote = scrollSepolia;
const remoteChainName = "scrollsepolia";

const originClient = createPublicClient({
    chain: origin,
    transport: http(),
});

const remoteClient = createPublicClient({
    chain: remote,
    transport: http(),
});

const owner = privateKeyToAccount(PRIVATE_KEY as Address);
const originWalletClient = createWalletClient({
    chain: origin,
    transport: http(),
    //anvil
    account: owner,
});

const PROXY_DEPLOYED_URL = "https://proxy.hyperlane.xyz";
const registry = new GithubRegistry({
    proxyUrl: PROXY_DEPLOYED_URL,
});

export async function getInterchainChainAddresses(chainName: string) {
    const addresses = await registry.getChainAddresses(chainName);
    if (!addresses) throw new Error(`${chainName} addresses not found`);

    if (!addresses["mailbox"] || !addresses["interchainAccountIsm"] || !addresses["interchainAccountRouter"]) {
        console.log({ addresses });
        throw new Error(`${chainName} not supported`);
    }

    return addresses as any as InterchainAddresses;
}

async function main() {
    const originAddresses = await getInterchainChainAddresses(originChainName);
    const remoteAddresses = await getInterchainChainAddresses(remoteChainName);

    // Get the interchain account address from the main chain using its owner
    const interchainAccountFromMain = await getRemoteInterchainAccount({
        publicClient: originClient,
        remoteRouter: remoteAddresses.interchainAccountRouter,
        remoteIsm: remoteAddresses.interchainAccountIsm,
        mainRouter: originAddresses.interchainAccountRouter,
        owner: originWalletClient.account.address,
    });

    // Get interchain account address from the remote chain using the owner & origin
    const interchainAccountFromRemote = await getLocalInterchainAccount({
        publicClient: remoteClient,
        origin: origin.id,
        router: remoteAddresses.interchainAccountRouter,
        owner: originWalletClient.account.address,
        ism: remoteAddresses.interchainAccountIsm,
    });

    //should be the same
    console.debug({ interchainAccountFromMain, interchainAccountFromRemote });

    //TODO: Which one to use???
    const ica: InterchainAccount = {
        address: interchainAccountFromRemote,
        router: remoteAddresses.interchainAccountRouter,
        ism: zeroAddress,
        originClient: originWalletClient,
        originRouter: originAddresses.interchainAccountRouter,
    } as any;

    const remoteWalletClient = createWalletClient({
        chain: remote,
        transport: http(),
        account: ica,
    }).extend((client) => {
        return {
            sendTransaction: (params) => sendTransaction(client, params),
            writeContract: (params) => writeContract(client, params),
        };
    }) as unknown as WalletClient<Transport, Chain, Account>;

    const call = {
        to: remoteAddresses.interchainAccountRouter,
        data: encodeFunctionData({
            abi: [domains],
            functionName: "domains",
        }),
    };

    const hash = await remoteWalletClient.sendTransaction(call);

    console.debug({ hash });
    const receipt = await originClient.waitForTransactionReceipt({ hash });
    console.debug({ receipt });

    const dispatchIdEvent = parseEventLogs({
        abi: [DispatchIdEvent],
        logs: receipt.logs,
        eventName: "DispatchId",
    })[0];
    const messageId = dispatchIdEvent.args.messageId;
    console.log({ messageId });
}

main();
