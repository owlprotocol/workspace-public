import { Address, StateOverride, Client, Hex, encodeFunctionData, decodeErrorResult, decodeFunctionResult } from "viem";

import { simulateEntryPoint } from "./simulateEntryPoint.js";
import { parseFailedOpWithRevert } from "../../gasestimation/parseFailedOpWithRevert.js";
import { abi as EntryPointV07SimulationsAbi } from "../../artifacts/EntryPointSimulations.js";
import {
    PackedUserOperation,
    ExecutionResult,
    TargetCallResult,
    targetCallResultSchema,
    ExecutionError,
    ExecutionErrors,
    ValidationErrors,
} from "../../models/index.js";

export type SimulateHandleOpResult<TypeResult extends "failed" | "execution" = "failed" | "execution"> = {
    result: TypeResult;
    data: TypeResult extends "failed"
        ? string
        : {
              callDataResult?: TargetCallResult;
              executionResult: ExecutionResult;
          };
    code?: TypeResult extends "failed" ? number : undefined;
};

/**
 * Similar to `simulateHandleOpV07` but reverts on error.
 * Also a higher-level abstraction as:
 * - targetAddress = userOp.sender
 * - targetCallData = userOp.callData
 * @param packedUserOperation
 * @param entryPoint
 * @param client
 * @param entryPointSimulationsAddress
 * @param stateOverride
 * @returns
 */
export async function getExecutionResult(
    client: Client,
    parameters: {
        packedUserOperation: PackedUserOperation;
        entryPoint: Address;
        entryPointSimulationsAddress: Address;
        stateOverride?: StateOverride[number] | undefined;
    },
): Promise<SimulateHandleOpResult<"execution">> {
    const { packedUserOperation, entryPoint, entryPointSimulationsAddress, stateOverride } = parameters;

    const error = await simulateHandleOpV07(client, {
        packedUserOperation,
        entryPoint,
        targetAddress: packedUserOperation.sender,
        targetCallData: packedUserOperation.callData,
        entryPointSimulationsAddress,
        stateOverride,
    });

    if (error.result === "failed") {
        throw new ExecutionError(
            `UserOperation reverted during simulation with reason: ${error.data}`,
            ExecutionErrors.UserOperationReverted,
        );
    }

    return error as SimulateHandleOpResult<"execution">;
}

/**
 * Simulate UserOpV7. Low level function meant to align with Solidity interface and
 * decode revert data.
 * @param packedUserOperation
 * @param entryPoint
 * @param client
 * @param targetAddress currently all calls use userOp.sender but this is here to align with the interface
 * @param targetCallData currently all calls use userOp.callData but this is here to align with the interface
 * @param entryPointSimulationsAddress
 * @param stateOverride
 * @returns
 */
export async function simulateHandleOpV07(
    client: Client,
    parameters: {
        packedUserOperation: PackedUserOperation;
        entryPoint: Address;
        targetAddress: Address;
        targetCallData: Hex;
        entryPointSimulationsAddress: Address;
        stateOverride?: StateOverride[number] | undefined;
    },
): Promise<SimulateHandleOpResult> {
    const {
        packedUserOperation,
        entryPoint,
        targetAddress,
        targetCallData,
        entryPointSimulationsAddress,
        stateOverride,
    } = parameters;

    const entryPointSimulationsSimulateHandleOpCallData = encodeFunctionData({
        abi: EntryPointV07SimulationsAbi,
        functionName: "simulateHandleOp",
        args: [packedUserOperation],
    });

    const entryPointSimulationsSimulateTargetCallData = encodeFunctionData({
        abi: EntryPointV07SimulationsAbi,
        functionName: "simulateCallData",
        args: [packedUserOperation, targetAddress, targetCallData],
    });

    const cause = await simulateEntryPoint(client, {
        entryPoint,
        entryPointSimulationsCallData: [
            entryPointSimulationsSimulateHandleOpCallData,
            entryPointSimulationsSimulateTargetCallData,
        ],
        entryPointSimulationsAddress,
        stateOverride,
    });

    try {
        const executionResult = getSimulateHandleOpResult(cause[0]);

        if (executionResult.result === "failed") {
            return executionResult;
        }

        const targetCallValidationResult = validateTargetCallDataResult(cause[1]);

        if (targetCallValidationResult.result === "failed") {
            return targetCallValidationResult;
        }

        return {
            result: "execution",
            data: {
                callDataResult: targetCallValidationResult.data,
                executionResult: (executionResult as SimulateHandleOpResult<"execution">).data.executionResult,
            },
        };
    } catch (e) {
        return {
            result: "failed",
            data: "Unknown error, could not parse simulate handle op result.",
            code: ValidationErrors.SimulateValidation,
        };
    }
}

function getSimulateHandleOpResult(data: Hex): SimulateHandleOpResult {
    try {
        const decodedError = decodeErrorResult({
            abi: EntryPointV07SimulationsAbi,
            data: data,
        });

        if (decodedError && decodedError.errorName === "FailedOp" && decodedError.args) {
            return {
                result: "failed",
                data: decodedError.args[1] as string,
                code: ValidationErrors.SimulateValidation,
            } as const;
        }

        if (decodedError && decodedError.errorName === "FailedOpWithRevert" && decodedError.args) {
            return {
                result: "failed",
                data: parseFailedOpWithRevert(decodedError.args?.[2] as Hex),
                code: ValidationErrors.SimulateValidation,
            } as const;
        }
    } catch {
        // no error we go the result
        const decodedResult: ExecutionResult = decodeFunctionResult({
            abi: EntryPointV07SimulationsAbi,
            functionName: "simulateHandleOp",
            data,
        }) as unknown as ExecutionResult;

        return {
            result: "execution",
            data: {
                executionResult: decodedResult,
            } as const,
        };
    }
    throw new Error("Unexpected error");
}

function validateTargetCallDataResult(data: Hex):
    | {
          result: "success";
          data: TargetCallResult;
      }
    | {
          result: "failed";
          data: string;
          code: number;
      } {
    try {
        const targetCallResult = decodeFunctionResult({
            abi: EntryPointV07SimulationsAbi,
            functionName: "simulateCallData",
            data: data,
        });

        const parsedTargetCallResult = targetCallResultSchema.parse(targetCallResult);

        if (parsedTargetCallResult.success) {
            return {
                result: "success",
                data: parsedTargetCallResult,
            } as const;
        }

        return {
            result: "failed",
            data: parsedTargetCallResult.returnData,
            code: ExecutionErrors.UserOperationReverted,
        } as const;
    } catch (_e) {
        // no error we go the result
        return {
            result: "failed",
            data: "Unknown error, could not parse target call data result.",
            code: ExecutionErrors.UserOperationReverted,
        } as const;
    }
}
