import { Address, Chain, Client, PartialBy, Transport } from "viem";
import * as chains from "viem/chains";
import { EstimateUserOperationGasReturnType, UserOperation } from "viem/account-abstraction";
import { getChainId } from "viem/actions";
import { getAction } from "viem/utils";

import { getExecutionResult } from "./simulateHandleOp.js";
import { calcPreVerificationGas } from "./calcPreVerificationGas.js";
import { getSupportedEntryPoints } from "./getSupportedEntryPoints.js";
import { calcVerificationGasAndCallGasLimit } from "../../gasestimation/calcVerificationGasAndCallGasLimit.js";
import { dummySignature, encodeUserOp } from "../../models/UserOperation.js";
import { toPackedUserOperation } from "../../models/PackedUserOperation.js";
import { maxBigInt } from "../../utils/bigint.js";

export type UserOperationGasLimitFields =
    | "preVerificationGas"
    | "verificationGasLimit"
    | "callGasLimit"
    | "paymasterPostOpGasLimit"
    | "paymasterVerificationGasLimit";

export type EstimateUserOperationGasParameters07 = PartialBy<
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
    // | "maxFeePerGas"
    | "maxPriorityFeePerGas"
    | "preVerificationGas"
    | "verificationGasLimit"
>;

/**
 * Returns an estimate of gas values necessary to execute the User Operation.
 *
 * - Docs: https://viem.sh/actions/bundler/estimateUserOperationGas
 *
 * @param client - Client to use
 * @param parameters - {@link EstimateUserOperationGasParameters}
 * @returns The gas estimate (in wei). {@link EstimateUserOperationGasReturnType}
 *
 * @example
 * import { createBundlerClient, http, parseEther } from 'viem'
 * import { toSmartAccount } from 'viem/accounts'
 * import { mainnet } from 'viem/chains'
 * import { estimateUserOperationGas } from 'viem/actions'
 *
 * const account = await toSmartAccount({ ... })
 *
 * const bundlerClient = createBundlerClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const values = await estimateUserOperationGas(bundlerClient, {
 *   account,
 *   calls: [{ to: '0x...', value: parseEther('1') }],
 * })
 */
export async function estimateUserOperationGas(
    client: Client<Transport, Chain | undefined, undefined> & {
        entryPointSimulationsAddress: Address;
    },
    parameters: EstimateUserOperationGasParameters07,
): Promise<EstimateUserOperationGasReturnType<undefined, undefined, undefined, "0.7">> {
    const { entryPointSimulationsAddress } = client;

    // Default entryPoint
    const supportedEntryPoints = await getAction(client, getSupportedEntryPoints, "getSupportedEntryPoints")({});
    const entryPointAddress = supportedEntryPoints[0];

    //TODO: Get fee per gas if undefined???
    if (parameters.maxFeePerGas === 0n) {
        throw new Error("user operation max fee per gas must be larger than 0 during gas estimation");
    }

    //TODO: This defines minimum paymaster balance required for initial gas estimation
    const userOperation: UserOperation<"0.7"> = {
        ...parameters,
        signature: dummySignature,
        preVerificationGas: 1_000_000n,
        verificationGasLimit: 10_000_000n,
        callGasLimit: 10_000_000n,
        // This is necessary because entryPoint pays
        // min(maxFeePerGas, baseFee + maxPriorityFeePerGas) for the verification
        // Since we don't want our estimations to depend upon baseFee, we set
        // maxFeePerGas to maxPriorityFeePerGas
        maxPriorityFeePerGas: parameters.maxFeePerGas,
    };
    if (userOperation.paymaster) {
        userOperation.paymasterVerificationGasLimit = 5_000_000n;
        userOperation.paymasterPostOpGasLimit = 2_000_000n;
    }

    const chainId = client.chain?.id ?? (await getAction(client, getChainId, "getChainId")({}));

    //Additional 10% added
    userOperation.preVerificationGas =
        ((await calcPreVerificationGas(client, {
            packedUserOperation: toPackedUserOperation(encodeUserOp(userOperation)),
            //TODO: Rename to entryPointAddress
            entryPoint: entryPointAddress,
        })) *
            110n) /
        100n;

    //TODO: Make more modular for chain overrides
    if (chainId === chains.base.id) {
        userOperation.verificationGasLimit = 5_000_000n;
    }

    if (chainId === chains.celoAlfajores.id || chainId === chains.celo.id) {
        userOperation.verificationGasLimit = 1_000_000n;
        userOperation.callGasLimit = 1_000_000n;
    }

    const executionResult = await getExecutionResult(client, {
        packedUserOperation: toPackedUserOperation(encodeUserOp(userOperation)),
        entryPoint: entryPointAddress,
        entryPointSimulationsAddress,
    });

    const verificationGasAndCallGasLimit = calcVerificationGasAndCallGasLimit(
        userOperation,
        executionResult.data.executionResult,
        chainId,
        executionResult.data.callDataResult,
    );
    userOperation.verificationGasLimit = verificationGasAndCallGasLimit.verificationGasLimit;
    userOperation.callGasLimit = verificationGasAndCallGasLimit.callGasLimit;

    if (chainId === chains.base.id || chainId === chains.baseSepolia.id) {
        userOperation.callGasLimit += 10_000n;
    }

    if (chainId === chains.base.id || chainId === chains.optimism.id) {
        userOperation.callGasLimit = maxBigInt(userOperation.callGasLimit, 120_000n);
    }

    if (userOperation.callData === "0x") {
        userOperation.callGasLimit = 0n;
    }

    if (
        userOperation.paymaster !== null &&
        "paymasterVerificationGasLimit" in executionResult.data.executionResult &&
        "paymasterPostOpGasLimit" in executionResult.data.executionResult
    ) {
        // Paymaster enabled
        userOperation.paymasterVerificationGasLimit =
            executionResult.data.executionResult.paymasterVerificationGasLimit || 1n;
        userOperation.paymasterPostOpGasLimit = executionResult.data.executionResult.paymasterPostOpGasLimit || 1n;
    } else if (userOperation.paymaster) {
        // Paymaster enabled, default to UserOp gas limits
        // VerifyingPaymaster has constant verification cost so lower is better
        // VerifyingPaymaster does NOT have a postOp call (unlike ERC20Paymaster) so lower is better
        //TODO: Hard-coded to 100k for now as that's what got tests passing
        // Does this scale with tx data? => No. All contract does is verify signature.
        userOperation.paymasterVerificationGasLimit = 100_000n;
        userOperation.paymasterPostOpGasLimit = 100_000n;
    }

    const userOpGas: EstimateUserOperationGasReturnType<undefined, undefined, undefined, "0.7"> = {
        preVerificationGas: userOperation.preVerificationGas,
        verificationGasLimit: userOperation.verificationGasLimit,
        callGasLimit: userOperation.callGasLimit,
    };
    if (userOperation.paymasterVerificationGasLimit) {
        userOpGas.paymasterVerificationGasLimit = userOperation.paymasterVerificationGasLimit;
    }
    if (userOperation.paymasterPostOpGasLimit) {
        userOpGas.paymasterPostOpGasLimit = userOperation.paymasterPostOpGasLimit;
    }

    return userOpGas;
}
