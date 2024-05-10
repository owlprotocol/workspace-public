import { Address, PublicClient, StateOverride, Chain, Transport } from "viem";
import * as chains from "viem/chains";
import { UserOperation } from "permissionless/types";
import { getExecutionResult } from "./simulateHandleOp.js";
import { calcVerificationGasAndCallGasLimit } from "./calcVerificationGasAndCallLimit.js";
import { calcPreVerificationGas } from "../calcPreVerificationGas/calcPreVerificationGas.js";
import { encodeUserOp } from "../UserOperation.js";
import { toPackedUserOperation } from "../PackedUserOperation.js";
import { maxBigInt } from "../utils/bigint.js";

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
 * @param publicClient
 * @param entryPointSimulationsAddress
 * @param stateOverride
 * @returns gas parameters of UserOperation
 */
export async function estimateUserOperationGas(
    //TODO: Omit gas fields
    userOperationData: Omit<UserOperation<"v0.7">, UserOperationGasFields>,
    entryPoint: Address,
    publicClient: PublicClient<Transport, Chain>,
    entryPointSimulationsAddress: Address,
    stateOverride: StateOverride[number] | undefined = undefined,
): Promise<EstimateUserOperationGasResponseResult> {
    if (userOperationData.maxFeePerGas === 0n) {
        throw new Error("user operation max fee per gas must be larger than 0 during gas estimation");
    }

    const userOperation: UserOperation<"v0.7"> = {
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

    const chainId = publicClient.chain.id;

    //Additional 10% added
    userOperation.preVerificationGas =
        ((await calcPreVerificationGas(publicClient, toPackedUserOperation(encodeUserOp(userOperation)), entryPoint)) *
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

    const executionResult = await getExecutionResult(
        toPackedUserOperation(encodeUserOp(userOperation)),
        entryPoint,
        publicClient,
        entryPointSimulationsAddress,
        stateOverride,
    );

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
        // VerifyingPaymaster does NOT have a postOp call so lower is better
        //TODO: Hard-coded to 100k.
        // Does this scale with tx data? => No. All contract does is verify signature.
        userOperation.paymasterVerificationGasLimit = 20_000n;
        userOperation.paymasterPostOpGasLimit = 20_000n;
    }

    return {
        preVerificationGas: userOperation.preVerificationGas,
        verificationGasLimit: userOperation.verificationGasLimit,
        callGasLimit: userOperation.callGasLimit,
        paymasterVerificationGasLimit: userOperation.paymasterVerificationGasLimit,
        paymasterPostOpGasLimit: userOperation.paymasterPostOpGasLimit,
    };
}
