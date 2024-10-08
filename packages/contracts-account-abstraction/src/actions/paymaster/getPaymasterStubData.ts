import { Address, concatHex, PartialBy, Hex } from "viem";
import { UserOperation, entryPoint07Address } from "viem/account-abstraction";
import { encodeAbiParameters } from "viem/utils";

import { dummySignature } from "../../models/UserOperation.js";

export type GetPaymasterStubDataParameters07 = PartialBy<
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

export type GetPaymasterStubDataReturnType07 = {
    paymaster: Address;
    paymasterData: Hex;
    paymasterVerificationGasLimit?: bigint | undefined;
    paymasterPostOpGasLimit: bigint;
    sponsor?: { name: string; icon?: string | undefined } | undefined;
    isFinal?: boolean | undefined;
};

/**
 * Retrieves paymaster-related User Operation properties to be used for gas estimation.
 *
 * - Docs: https://viem.sh/account-abstraction/actions/paymaster/getPaymasterStubData
 *
 * @param client - Client to use
 * @param parameters - {@link GetPaymasterStubDataParameters}
 * @returns Paymaster-related User Operation properties. {@link GetPaymasterStubDataReturnType}
 *
 * @example
 * import { http } from 'viem'
 * import { createPaymasterClient, getPaymasterStubData } from 'viem/account-abstraction'
 *
 * const paymasterClient = createPaymasterClient({
 *   transport: http('https://...'),
 * })
 *
 * const userOperation = { ... }
 *
 * const values = await getPaymasterStubData(paymasterClient, {
 *   chainId: 1,
 *   entryPointAddress: '0x...',
 *   ...userOperation,
 * })
 */
export async function getPaymasterStubData(
    client: {
        paymaster: Address;
    },
    parameters: GetPaymasterStubDataParameters07,
): Promise<GetPaymasterStubDataReturnType07> {
    const { entryPointAddress } = parameters;
    const { paymaster } = client;

    if (entryPointAddress != entryPoint07Address) {
        //TODO: Viem error for this?
        throw new Error(`Unsupported entrypoint ${entryPointAddress}`);
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

    const paymasterDataSigned = concatHex([paymasterDataUnsigned, dummySignature]);

    const sponsor = {
        name: "Owl Protocol",
        icon: "https://example.com",
    };

    return {
        paymaster,
        paymasterData: paymasterDataSigned,
        paymasterVerificationGasLimit: 100_000n,
        paymasterPostOpGasLimit: 100_000n,
        sponsor,
        isFinal: false,
    };
}
