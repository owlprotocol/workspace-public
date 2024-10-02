//@ts-nocheck
import { Chain, createPublicClient, createWalletClient, encodeFunctionData, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { localhost } from "viem/chains";
import {
    encodeCallRemoteWithOverrides,
    getLocalInterchainAccount,
    getRemoteInterchainAccount,
    quoteGasPayment,
} from "../InterchainAccountRouter.js";
import { defaultIsm as defaultIsmAbi } from "../artifacts/IMailbox.js";
import { domains } from "../artifacts/IRouter.js";

// Constants for local setup
const MAILBOX_ADDRESS_LOCALHOST = "0x12975173B87F7595EE45dFFb2Ab812ECE596Bf84";
const INTERCHAIN_ACCOUNT_ROUTER_ADDRESS_LOCALHOST = "0x29a79095352a718B3D7Fe84E1F14E9F34A35598e";
const ISM_ADDRESS_LOCALHOST = "0x05B4CB126885fb10464fdD12666FEb25E2563B76";

const localMainChain = { ...localhost, id: 31337 };
const localRemoteChain = {
    ...localhost,
    id: 31338,
    rpcUrls: { default: { http: ["http://127.0.0.1:8546"] } },
} as Chain;

const localMainClient = createPublicClient({
    chain: localMainChain,
    transport: http(),
});

const localRemoteClient = createPublicClient({
    chain: localRemoteChain,
    transport: http(),
});

const localMainWalletClient = createWalletClient({
    chain: localMainChain,
    transport: http(),
    //anvil
    account: privateKeyToAccount("0x92db14e403b83dfe3df233f83dfa3a0d7096f21ca9b0d6d6b8d88b2b4ec1564e"),
});

// Uncomment if you need to set initialize the router
// import { pad } from "viem";
// import { enrollRemoteRouterAndIsm as enrollRemoteRouterAndIsmAbi } from "../artifacts/InterchainAccountRouter.js";
// const initializeMainRouter = async () => {
//     const localMainRelayerWalletClient = createWalletClient({
//         chain: localMainChain,
//         transport: http(),
//         //anvil
//         account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6"),
//     });
//
//     await localMainRelayerWalletClient.writeContract({
//         address: INTERCHAIN_ACCOUNT_ROUTER_ADDRESS_LOCALHOST,
//         abi: [enrollRemoteRouterAndIsmAbi],
//         functionName: "enrollRemoteRouterAndIsm",
//         args: [
//             localRemoteChain.id,
//             pad(INTERCHAIN_ACCOUNT_ROUTER_ADDRESS_LOCALHOST, { size: 32 }),
//             pad(ISM_ADDRESS_LOCALHOST, { size: 32 }),
//         ],
//     });
// };

async function main() {
    // Get the interchain account address from the main chain using its owner
    const interchainAccountFromMain = await getRemoteInterchainAccount({
        publicClient: localMainClient,
        remoteRouter: INTERCHAIN_ACCOUNT_ROUTER_ADDRESS_LOCALHOST,
        owner: localMainWalletClient.account.address,
        remoteIsm: ISM_ADDRESS_LOCALHOST,
        mainRouter: INTERCHAIN_ACCOUNT_ROUTER_ADDRESS_LOCALHOST,
    });

    // Get interchain account address from the remote chain using the owner & origin
    const interchainAccountFromRemote = await getLocalInterchainAccount({
        publicClient: localRemoteClient,
        origin: localMainChain.id,
        router: INTERCHAIN_ACCOUNT_ROUTER_ADDRESS_LOCALHOST,
        owner: localMainWalletClient.account.address,
        ism: ISM_ADDRESS_LOCALHOST,
    });

    // Uncomment if you need to set initialize the router
    // await initializeMainRouter();

    //should be the same
    console.debug({ interchainAccountFromMain, interchainAccountFromRemote });

    // get default ISM
    const defaultIsm = await localRemoteClient.readContract({
        address: MAILBOX_ADDRESS_LOCALHOST,
        abi: [defaultIsmAbi],
        functionName: "defaultIsm",
    });

    // we test out a simple read call from the interchain account
    const calls = [
        {
            to: INTERCHAIN_ACCOUNT_ROUTER_ADDRESS_LOCALHOST,
            data: encodeFunctionData({
                abi: [domains],
                functionName: "domains",
            }),
        } as const,
    ];

    // call remote data
    const callRemoteData = encodeCallRemoteWithOverrides({
        destination: localRemoteChain.id,
        router: INTERCHAIN_ACCOUNT_ROUTER_ADDRESS_LOCALHOST,
        ism: defaultIsm,
        calls,
    });

    //execute
    const hash = await localMainWalletClient.sendTransaction({
        to: INTERCHAIN_ACCOUNT_ROUTER_ADDRESS_LOCALHOST,
        data: callRemoteData,
    });

    console.debug({ hash });
    const receipt = await localMainClient.waitForTransactionReceipt({ hash });
    console.debug({ receipt });

    const quote = await quoteGasPayment({
        publicClient: localMainClient,
        destination: localRemoteChain.id,
        gasLimit: 100000000000000n,
        router: INTERCHAIN_ACCOUNT_ROUTER_ADDRESS_LOCALHOST,
    });
    console.log({ quote });
}

main();
