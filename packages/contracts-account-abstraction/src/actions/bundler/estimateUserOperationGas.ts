import { Address, Client, StateOverride } from "viem";
import * as chains from "viem/chains";
import { UserOperation } from "viem/account-abstraction";
import { getChainId } from "viem/actions";
import { getAction } from "viem/utils";

import { getExecutionResult } from "./simulateHandleOp.js";
import { calcPreVerificationGas } from "./calcPreVerificationGas.js";
import { calcVerificationGasAndCallGasLimit } from "../../gasestimation/calcVerificationGasAndCallGasLimit.js";
import { encodeUserOp } from "../../models/UserOperation.js";
import { toPackedUserOperation } from "../../models/PackedUserOperation.js";
import { maxBigInt } from "../../utils/bigint.js";

export interface EstimateUserOperationGasResponseResult {
    callGasLimit: bigint;
    preVerificationGas: bigint;
    verificationGasLimit: bigint;
    paymasterVerificationGasLimit?: bigint;
    paymasterPostOpGasLimit?: bigint;
}

export type UserOperationGasFields =
    | "preVerificationGas"
    | "verificationGasLimit"
    | "callGasLimit"
    | "paymasterPostOpGasLimit"
    | "paymasterVerificationGasLimit";

/**
 * Estimate UserOperation gas. Unlike Alto implementation, this does NOT mutate any parameters.
 * @param userOperationData `UserOperation` without any EXCLUDING gas fields
 * @param entryPoint
 * @param client
 * @param entryPointSimulationsAddress
 * @param stateOverride
 * @returns gas parameters of UserOperation
 */
export async function estimateUserOperationGas(
    //TODO: Omit gas fields
    client: Client,
    parameters: {
        userOperationData: Omit<UserOperation<"0.7">, UserOperationGasFields>;
        entryPoint: Address;
        entryPointSimulationsAddress: Address;
        stateOverride?: StateOverride[number] | undefined;
    },
): Promise<EstimateUserOperationGasResponseResult> {
    const { userOperationData, entryPoint, entryPointSimulationsAddress, stateOverride } = parameters;

    if (userOperationData.maxFeePerGas === 0n) {
        throw new Error("user operation max fee per gas must be larger than 0 during gas estimation");
    }

    //TODO: This defines minimum paymaster balance required for initial gas estimation
    const userOperation: UserOperation<"0.7"> = {
        ...userOperationData,
        preVerificationGas: 1_000_000n,
        verificationGasLimit: 10_000_000n,
        callGasLimit: 10_000_000n,
        // This is necessary because entryPoint pays
        // min(maxFeePerGas, baseFee + maxPriorityFeePerGas) for the verification
        // Since we don't want our estimations to depend upon baseFee, we set
        // maxFeePerGas to maxPriorityFeePerGas
        maxPriorityFeePerGas: userOperationData.maxFeePerGas,
    };
    if (userOperationData.paymaster) {
        userOperation.paymasterVerificationGasLimit = 5_000_000n;
        userOperation.paymasterPostOpGasLimit = 2_000_000n;
    }

    const chainId = client.chain?.id ?? (await getAction(client, getChainId, "getChainId")({}));

    //Additional 10% added
    userOperation.preVerificationGas =
        ((await calcPreVerificationGas(client, {
            packedUserOperation: toPackedUserOperation(encodeUserOp(userOperation)),
            entryPoint,
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
        entryPoint,
        entryPointSimulationsAddress,
        stateOverride,
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

    const userOpGas: EstimateUserOperationGasResponseResult = {
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
