import { Address, Hash, concatHex, PartialBy, Hex, Client, Transport, LocalAccount, Chain } from "viem";
import { UserOperation } from "viem/account-abstraction";
import { getAction, encodeAbiParameters } from "viem/utils";
import { readContract } from "viem/actions";

import { VerifyingPaymaster } from "../../artifacts/VerifyingPaymaster.js";
import { toPackedUserOperation } from "../../models/PackedUserOperation.js";
import { dummySignature, encodeUserOp } from "../../models/UserOperation.js";
import { getSupportedEntryPoints } from "../bundler/getSupportedEntryPoints.js";

export type GetPaymasterDataParameters07 = PartialBy<
    Pick<
        UserOperation<"0.7">,
        | "callData"
        | "callGasLimit"
        | "factory"
        | "factoryData"
        | "maxFeePerGas"
        | "maxPriorityFeePerGas"
        | "nonce"
        | "sender"
        | "preVerificationGas"
        | "verificationGasLimit"
        | "paymasterPostOpGasLimit"
        | "paymasterVerificationGasLimit"
    >,
    | "callGasLimit"
    | "factory"
    | "factoryData"
    | "maxFeePerGas"
    | "maxPriorityFeePerGas"
    | "preVerificationGas"
    | "verificationGasLimit"
> & {
    context?: unknown | undefined;
    chainId: number;
    entryPointAddress: Address;
};

export type GetPaymasterDataReturnType07 = {
    paymaster: Address;
    paymasterData: Hex;
    paymasterVerificationGasLimit?: bigint | undefined;
    paymasterPostOpGasLimit?: bigint | undefined;
};

/**
 * Retrieves paymaster-related User Operation properties to be used for sending the User Operation.
 *
 * - Docs: https://viem.sh/account-abstraction/actions/paymaster/getPaymasterData
 *
 * @param client - Client to use
 * @param parameters - {@link GetPaymasterDataParameters}
 * @returns Paymaster-related User Operation properties. {@link GetPaymasterDataReturnType}
 *
 * @example
 * import { http } from 'viem'
 * import { createPaymasterClient, getPaymasterData } from 'viem/account-abstraction'
 *
 * const paymasterClient = createPaymasterClient({
 *   transport: http('https://...'),
 * })
 *
 * const userOperation = { ... }
 *
 * const values = await getPaymasterData(paymasterClient, {
 *   chainId: 1,
 *   entryPointAddress: '0x...',
 *   ...userOperation,
 * })
 */
export async function getPaymasterData(
    client: Client<Transport, Chain | undefined, LocalAccount> & {
        paymaster: Address;
    },
    parameters: GetPaymasterDataParameters07,
): Promise<GetPaymasterDataReturnType07> {
    const { entryPointAddress, ...userOperation } = parameters;
    const { paymaster } = client;

    const supportedEntryPoints = await getAction(
        client as unknown as Client<Transport>,
        getSupportedEntryPoints,
        "getSupportedEntryPoints",
    )({});

    if (!supportedEntryPoints.includes(entryPointAddress)) {
        //TODO: Viem error for this?
        throw new Error(`Unsupported entrypoint ${entryPointAddress}, expected one of ${supportedEntryPoints}`);
    }

    //Paymaster data
    const validUntil = Date.now() + 3600;
    const validAfter = 0;
    const paymasterDataUnsigned = encodeAbiParameters(
        [
            { name: "validUntil", type: "uint48" },
            { name: "validAfter", type: "uint48" },
        ],
        [validUntil, validAfter],
    );

    //Sign
    const userOpPaymasterPacked = toPackedUserOperation(
        encodeUserOp({
            ...userOperation,
            preVerificationGas: userOperation.preVerificationGas ?? 0n,
            verificationGasLimit: userOperation.verificationGasLimit ?? 0n,
            callGasLimit: userOperation.callGasLimit ?? 0n,
            maxFeePerGas: userOperation.maxFeePerGas ?? 0n,
            maxPriorityFeePerGas: userOperation.maxPriorityFeePerGas ?? 0n,
            signature: dummySignature,
            paymaster,
            paymasterData: concatHex([paymasterDataUnsigned, dummySignature]),
        }),
    );

    //TODO: Is this needed? Can be computed off-chain
    const userOpPaymasterHash = (await getAction(
        client,
        readContract,
        "readContract",
    )({
        address: paymaster,
        abi: VerifyingPaymaster.abi,
        functionName: "getHash",
        args: [userOpPaymasterPacked as any, validUntil, validAfter],
    })) as Hash;

    const paymasterSignature = await client.account.signMessage({
        message: {
            raw: userOpPaymasterHash,
        },
    });
    const paymasterDataSigned = concatHex([paymasterDataUnsigned, paymasterSignature]);

    return {
        paymaster,
        paymasterData: paymasterDataSigned,
        paymasterVerificationGasLimit: 100_000n,
        paymasterPostOpGasLimit: 100_000n,
    };
}
