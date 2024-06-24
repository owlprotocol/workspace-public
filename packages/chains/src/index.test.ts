import { describe, test, expect } from "vitest";
import { Address, Chain, createPublicClient, custom, http, numberToHex, padHex } from "viem";
import ganache from "ganache";
import { localhost, mainnet } from "./chains/index.js";
import { MyContract } from "./artifacts/MyContract.js";

const DEFAULT_GANACHE_CONFIG = {
    // wallet: { mnemonic: ANVIL_MNEMONIC },
    //Instamine set to "strict" to better simulate real-world conditions.
    //This mining mode forces us to account for the fact that once a hash is returned, this does NOT mean the transaction is confirmed
    //Transaction is only mined once we request the receipt. This is better then just setting a block time as that would be non-deterministic
    //Also see https://github.com/trufflesuite/ganache/discussions/2111
    miner: { instamine: "strict" },
    logging: { quiet: false },
} as const;

/**
 * Convert number to address
 * @param n
 * @returns address
 */
export function numberToAddress(n: number | bigint): Address {
    return padHex(numberToHex(n), { size: 20 });
}

//Test out state overrides
//https://viem.sh/docs/contract/simulateContract#stateoverride-optional
//https://viem.sh/docs/contract/readContract#stateoverride-optional
//https://geth.ethereum.org/docs/interacting-with-geth/rpc/ns-eth#eth-call
//TODO: Replace HelloWorld with contract that can read balance/view/write/blockNumber etc...
//TODO: Manage smart account nonces with this too? => Not required while we have channels
//Note: State code overrides no NOT work with low-value addresses (1-10)
describe("State Overrides", function () {
    const address = numberToAddress(1_000_000);

    test("state override - ganache", async () => {
        const provider = ganache.provider(DEFAULT_GANACHE_CONFIG);
        const transport = custom(provider);
        const publicClient = createPublicClient({
            chain: { ...localhost, id: localhost.chainId } as Chain,
            transport,
        });

        const result = await publicClient.readContract({
            address,
            abi: MyContract.abi,
            functionName: "helloWorld",
            stateOverride: [
                {
                    address,
                    code: MyContract.deployedBytecode,
                },
            ],
        });
        expect(result).toBe("Hello World");
    });
    test.skip("state override - localhost", async () => {
        const transport = http("http://127.0.0.1:8545");
        const publicClient = createPublicClient({
            chain: { ...localhost, id: localhost.chainId } as Chain,
            transport,
        });

        const result = await publicClient.readContract({
            address,
            abi: MyContract.abi,
            functionName: "helloWorld",
            stateOverride: [
                {
                    address,
                    code: MyContract.deployedBytecode,
                },
            ],
        });
        expect(result).toBe("Hello World");
    });
    test.skip("state override - DRPC Public", async () => {
        const transport = http(mainnet.rpcUrls.drpcPublic?.http[0]);
        const publicClient = createPublicClient({
            chain: { ...mainnet, id: mainnet.chainId } as Chain,
            transport,
        });

        console.debug(MyContract.deployedBytecode.length);

        const result = await publicClient.readContract({
            address,
            abi: MyContract.abi,
            functionName: "helloWorld",
            stateOverride: [
                {
                    address,
                    code: MyContract.deployedBytecode,
                },
            ],
        });
        expect(result).toBe("Hello World");
    });
    test.skip("state override - Ankr Public", async () => {
        const transport = http(mainnet.rpcUrls.ankrPublic?.http[0]);
        const publicClient = createPublicClient({
            chain: { ...mainnet, id: mainnet.chainId } as Chain,
            transport,
        });

        const result = await publicClient.readContract({
            address,
            abi: MyContract.abi,
            functionName: "helloWorld",
            stateOverride: [
                {
                    address,
                    code: MyContract.deployedBytecode,
                },
            ],
        });
        expect(result).toBe("Hello World");
    });
});
