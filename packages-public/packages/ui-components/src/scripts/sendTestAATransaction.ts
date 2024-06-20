import { defineChain } from "viem";
import { sepolia } from "viem/chains";
import { API_REST_BASE_URL } from "@owlprotocol/envvars";
import { getAdminSimpleSmartAccountClient } from "@owlprotocol/core-provider";

const { API_KEY, PROJECT_ID, CHAIN_ID } = process.env;

const localChain = defineChain({
    id: 1337,
    name: "Localhost",
    nativeCurrency: sepolia.nativeCurrency,
    rpcUrls: {
        default: { http: ["http://localhost:3000/api/network/1337/rpc"] },
    },
});

const hedwigTestnetChain = defineChain({
    id: 150150,
    name: "Owl Hedwig Tesnet",
    nativeCurrency: sepolia.nativeCurrency,
    rpcUrls: {
        default: {
            http: [
                "https://contracts-api.owlprotocol.xyz/api/network/150150/rpc",
            ],
        },
    },
});

const chains = { 1337: localChain, 150150: hedwigTestnetChain };

const chain = chains[CHAIN_ID ?? 1337] ?? localChain;

const smartAccountClient = await getAdminSimpleSmartAccountClient(
    { apiKey: API_KEY! },
    PROJECT_ID!,
    chain,
    API_REST_BASE_URL
);

console.log(`Smart account address: ${smartAccountClient.account!.address}`);

// @ts-expect-error TODO: find out why there's a type mismatch
const txHash = await smartAccountClient.sendTransaction({
    to: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
    value: 0n,
    data: "0x1234",
});

console.log(`Transaction included: ${txHash}`);
