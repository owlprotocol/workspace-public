import { Address, encodeFunctionData, Hex, padHex, PublicClient } from "viem";
import {
    getRemoteInterchainAccount_address_address_address as getRemoteInterchainAccountAbi,
    getLocalInterchainAccount_uint32_bytes32_bytes32_address as getLocalInterchainAccountAbi,
    quoteGasPayment as quoteGasPaymentAbi,
    callRemoteWithOverrides as callRemoteWithOverridesAbi,
    callRemote_uint32__bytes32_uint256_bytes_array_bytes as callRemoteAbi,
} from "./artifacts/InterchainAccountRouter.js";

export interface GetRemoteInterchainAccountParams {
    publicClient: PublicClient;
    remoteRouter: Address;
    remoteIsm: Address;
    owner: Address;
    mainRouter: Address;
}

//TODO: Implement synchronous CREATE2 based version
export async function getRemoteInterchainAccount(params: GetRemoteInterchainAccountParams): Promise<Address> {
    const { publicClient, remoteRouter, remoteIsm, owner, mainRouter } = params;
    return publicClient.readContract({
        address: mainRouter,
        abi: [getRemoteInterchainAccountAbi],
        functionName: "getRemoteInterchainAccount",
        args: [owner, remoteRouter, remoteIsm],
    });
}

export interface GetLocalInterchainAccountParams {
    publicClient: PublicClient;
    origin: number;
    router: Address;
    owner: Address;
    ism: Address;
}

//TODO: Implement synchronous CREATE2 based version
/**
 * getLocalInterchainAccount uses parameters exlucsively of the remote chain
 */
export async function getLocalInterchainAccount(params: GetLocalInterchainAccountParams): Promise<Address> {
    const { publicClient, router, owner, ism, origin } = params;

    const ownerBytes32 = padHex(owner, { size: 32 });
    const routerBytes32 = padHex(router, { size: 32 });

    return publicClient.readContract({
        address: router,
        abi: [getLocalInterchainAccountAbi],
        functionName: "getLocalInterchainAccount",
        args: [origin, ownerBytes32, routerBytes32, ism],
    });
}

interface QuoteGasPaymentParams {
    publicClient: PublicClient;
    router: Address;
    destination: number;
    gasLimit: bigint;
}

export async function quoteGasPayment(params: QuoteGasPaymentParams) {
    const { publicClient, router, destination, gasLimit } = params;

    // Body does not matter
    const messageBody = "0x";

    return await publicClient.readContract({
        address: router,
        abi: [quoteGasPaymentAbi],
        functionName: "quoteGasPayment",
        args: [destination, messageBody, gasLimit],
    });
}

export interface EncodeCallRemoteParams {
    destination: number;
    hookMetadata: Hex;
    calls: { to: Address; value?: bigint; data: Hex }[];
}

/**
 * Encode `callRemote` call
 * @param params
 * @returns data
 */
export function encodeCallRemote(params: EncodeCallRemoteParams): Hex {
    const { destination, hookMetadata, calls } = params;

    return encodeFunctionData({
        abi: [callRemoteAbi],
        functionName: "callRemote",
        args: [
            destination,
            calls.map((c) => {
                return {
                    to: padHex(c.to, { size: 32 }),
                    value: c.value ?? 0n,
                    data: c.data,
                };
            }),
            hookMetadata,
        ],
    });
}

export interface EncodeCallRemoteWithOverridesParams {
    destination: number;
    router: Address;
    ism: Address;
    calls: readonly { to: Address; value?: bigint | undefined; data: Hex | undefined }[];
}

/**
 * Encode `callRemoteWithOverrides` call
 * @param params
 * @returns data
 */
export function encodeCallRemoteWithOverrides(params: EncodeCallRemoteWithOverridesParams): Hex {
    const { destination, router, ism, calls } = params;

    const routerBytes32 = padHex(router, { size: 32 });
    const ismBytes32 = padHex(ism, { size: 32 });

    return encodeFunctionData({
        abi: [callRemoteWithOverridesAbi],
        functionName: "callRemoteWithOverrides",
        args: [
            destination,
            routerBytes32,
            ismBytes32,
            calls.map((c) => {
                return {
                    to: padHex(c.to, { size: 32 }),
                    value: c.value ?? 0n,
                    data: c.data,
                };
            }) as any,
        ],
    });
}
