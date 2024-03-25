import {
    ContractFunctionExecutionErrorType,
    CallExecutionErrorType,
    CallErrorType,
    InvalidInputRpcErrorType,
    decodeErrorResult,
} from "viem";
import { abi as EntryPointAbi } from "./artifacts/EntryPoint.js";
import { abi as VerifyingPaymasterAbi } from "./artifacts/VerifyingPaymaster.js";

export function isError<T extends { name: string }>(name: T["name"], err: Error): err is Error {
    return err.name === name;
}

export function handleViemError(error: Error) {
    // console.debug(error.name);
    if (isError<ContractFunctionExecutionErrorType>("ContractFunctionExecutionError", error)) {
        error = error.cause as Error;
        // console.debug(error.name);
        if (isError<CallExecutionErrorType>("CallExecutionError", error)) {
            error = error.cause as Error;
            // console.debug(error.name);
            if (isError<InvalidInputRpcErrorType>("InvalidInputRpcError", error)) {
                error = error.cause as Error;
                // console.debug(error.name);
                //@ts-expect-error
                if (isError<CallErrorType>("CallError", error)) {
                    const errorAA31 = decodeErrorResult({
                        abi: EntryPointAbi,
                        data: (error as any).data,
                    });
                    console.debug(errorAA31);

                    const errorInvalidSignature = decodeErrorResult({
                        abi: VerifyingPaymasterAbi,
                        //@ts-expect-error
                        data: errorAA31.args[2],
                    });
                    console.debug(errorInvalidSignature);
                }
            }
        }
    }
    throw error;
}
