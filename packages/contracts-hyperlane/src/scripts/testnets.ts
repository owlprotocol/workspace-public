//@ts-nocheck
import {
    Address,
    createPublicClient,
    createWalletClient,
    encodeFunctionData,
    http,
    parseEther,
    parseEventLogs,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { bscTestnet, scrollSepolia } from "viem/chains";
import { GithubRegistry } from "@hyperlane-xyz/registry";
import {
    encodeCallRemoteWithOverrides,
    getLocalInterchainAccount,
    getRemoteInterchainAccount,
} from "../InterchainAccountRouter.js";
import { defaultIsm as defaultIsmAbi, DispatchId as DispatchIdEvent } from "../artifacts/IMailbox.js";
import { domains } from "../artifacts/IRouter.js";
import "dotenv/config";

const PRIVATE_KEY = process.env.PRIVATE_KEY;
if (!PRIVATE_KEY) throw new Error("Need PRIVATE_KEY");

interface InterchainAddresses {
    mailbox: Address;
    interchainAccountIsm: Address;
    interchainAccountRouter: Address;
}

const bscTestnetClient = createPublicClient({
    chain: bscTestnet,
    transport: http(),
});

const scrollSepoliaClient = createPublicClient({
    chain: scrollSepolia,
    transport: http(),
});

const bscTestnetWalletClient = createWalletClient({
    chain: bscTestnet,
    transport: http(),
    //anvil
    account: privateKeyToAccount(PRIVATE_KEY as Address),
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
    const bscTestnetAddresses = await getInterchainChainAddresses("bsctestnet");
    const scrollSepoliaAddresses = await getInterchainChainAddresses("scrollsepolia");

    // Get the interchain account address from the main chain using its owner
    const interchainAccountFromMain = await getRemoteInterchainAccount({
        publicClient: bscTestnetClient,
        remoteRouter: scrollSepoliaAddresses.interchainAccountRouter,
        remoteIsm: scrollSepoliaAddresses.interchainAccountIsm,
        mainRouter: bscTestnetAddresses.interchainAccountRouter,
        owner: bscTestnetWalletClient.account.address,
    });

    // Get interchain account address from the remote chain using the owner & origin
    const interchainAccountFromRemote = await getLocalInterchainAccount({
        publicClient: scrollSepoliaClient,
        origin: bscTestnet.id,
        router: scrollSepoliaAddresses.interchainAccountRouter,
        owner: bscTestnetWalletClient.account.address,
        ism: scrollSepoliaAddresses.interchainAccountIsm,
    });

    //should be the same
    console.debug({ interchainAccountFromMain, interchainAccountFromRemote });

    // get default ISM
    const defaultIsm = await scrollSepoliaClient.readContract({
        address: scrollSepoliaAddresses.mailbox,
        abi: [defaultIsmAbi],
        functionName: "defaultIsm",
    });

    // we test out a simple read call from the interchain account
    const calls = [
        {
            to: scrollSepoliaAddresses.interchainAccountRouter,
            data: encodeFunctionData({
                abi: [domains],
                functionName: "domains",
            }),
        } as const,
    ];

    // call remote data
    // const callRemoteData = encodeCallRemote({
    //     destination: scrollSepolia.id,
    //     calls,
    //     hookMetadata: "0x",
    // });

    const callRemoteData = encodeCallRemoteWithOverrides({
        destination: scrollSepolia.id,
        router: scrollSepoliaAddresses.interchainAccountRouter,
        ism: defaultIsm,
        calls,
    });

    const remoteGasEstimate = await scrollSepoliaClient.estimateGas(calls[0]);

    console.log({ remoteGasEstimate });

    // const gasQuote = await quoteGasPayment({
    //     publicClient: bscTestnetClient,
    //     destination: scrollSepolia.id,
    //     gasLimit: remoteGasEstimate,
    //     router: bscTestnetAddresses.interchainAccountRouter,
    // });
    //
    // console.log({ gasQuote });
    //
    // // 130%
    // const gasQuoteOverestimate = (gasQuote * 13n) / 10n;
    // console.log({gasQuoteOverestimate})

    //execute
    const hash = await bscTestnetWalletClient.sendTransaction({
        to: bscTestnetAddresses.interchainAccountRouter,
        data: callRemoteData,
        value: parseEther("0.001"),
    });

    console.debug({ hash });
    const receipt = await bscTestnetClient.waitForTransactionReceipt({ hash });
    console.debug({ receipt });

    // const remoteCallReceipt = await bscTestnetClient.waitForTransactionReceipt({
    //     hash: "0x7341b7be338e459352bc2173c2842748abad58f9df2a65f201c155f9d44875c9",
    // });
    //
    const remoteCallReceipt = receipt;

    const dispatchIdEvent = parseEventLogs({
        abi: [DispatchIdEvent],
        logs: remoteCallReceipt.logs,
        eventName: "DispatchId",
    })[0];
    const messageId = dispatchIdEvent.args.messageId;
    console.log({ messageId });
}

main();
