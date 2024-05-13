import { Address, PublicClient, StateOverride, Chain, Transport, zeroAddress } from "viem";
import * as chains from "viem/chains";
import { UserOperation } from "permissionless/types";
import { getExecutionResult } from "./simulateHandleOp.js";
import { calcVerificationGasAndCallGasLimit } from "./calcVerificationGasAndCallLimit.js";
import { calcPreVerificationGas } from "../calcPreVerificationGas/calcPreVerificationGas.js";
import { encodeUserOp } from "../models/UserOperation.js";
import { toPackedUserOperation } from "../models/PackedUserOperation.js";
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

//TODO: Rename. This is mock implementation with hard-coded values.
/**
 * Estimate UserOperation gas. Unlike Alto implementation, this does NOT mutate any parameters.
 * @param userOperationData `UserOperation` without any EXCLUDING gas fields
 * @param _entryPoint
 * @param _publicClient
 * @param _entryPointSimulationsAddress
 * @param _stateOverride
 * @returns gas parameters of UserOperation
 */
export async function estimateUserOperationGasMock(
    userOperationData: Omit<UserOperation<"v0.7">, UserOperationGasFields>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _entryPoint: Address,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _publicClient: PublicClient<Transport, Chain>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _entryPointSimulationsAddress: Address,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _stateOverride: StateOverride[number] | undefined = undefined,
): Promise<EstimateUserOperationGasResponseResult> {
    //Default values - 1 (so that tests pass)
    const userOpGas: EstimateUserOperationGasResponseResult = {
        preVerificationGas: 999_999n,
        verificationGasLimit: 9_999_999n,
        callGasLimit: 9_999_999n,
    };
    if (userOperationData.paymaster && userOperationData.paymaster != zeroAddress) {
        //This breaks why is it too high? Does this have to be added to `callGasLimit`?
        // userOpGas.paymasterVerificationGasLimit = 4_999_999n;
        // userOpGas.paymasterPostOpGasLimit = 1_999_999n;

        //This breaks when using core-trpc
        // userOpGas.paymasterVerificationGasLimit = 20_000n;
        // userOpGas.paymasterPostOpGasLimit = 20_000n;

        //This works when using core-trpc
        userOpGas.paymasterVerificationGasLimit = 100_000n;
        userOpGas.paymasterPostOpGasLimit = 100_000n;
    }
    return userOpGas;
}

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
        //TODO: Hard-coded to 20k.
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
