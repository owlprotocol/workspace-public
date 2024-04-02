import { decodeErrorResult, Hex, Abi, DecodeErrorResultReturnType } from "viem";

export function isError<T extends { name: string }>(name: T["name"], err: Error): err is Error {
    return err.name === name;
}

//TODO: Improve this error handler
/**
 * Decode viem error
 * @param error
 * @param abi
 * @returns
 */
export function decodeViemError<const TAbi extends Abi | readonly unknown[]>(
    error: any,
    abi: TAbi,
): DecodeErrorResultReturnType<TAbi> | undefined {
    let data: Hex | undefined;

    //Iterate down error tree to get original VM revert data
    while (data === undefined) {
        if (error.data) {
            //Error has data field
            data = error.data;
        } else if (error.cause) {
            //Error has cause (another error)
            error = error.cause;
        } else {
            //No cause, return
            return;
        }
    }

    //Data is defined, attempt to decode using abi
    try {
        return decodeErrorResult<TAbi>({
            abi,
            data,
        });
    } catch {
        return;
    }

    /*
    if (isError<SendUserOperationErrorType>("SendUserOperationError", error)) {
        console.error(error.name);
        console.error((error.cause as any).name);
        console.error(error.data);
    }
    if (isError<ContractFunctionExecutionErrorType>("ContractFunctionExecutionError", error)) {
        error = error.cause as Error;
        if (isError<CallExecutionErrorType>("CallExecutionError", error)) {
            error = error.cause as Error;
            if (isError<InvalidInputRpcErrorType>("InvalidInputRpcError", error)) {
                error = error.cause as Error;
                if (isError<CallErrorType>("CallError", error)) {
                    console.error(error);
                    const errorAA31 = decodeErrorResult({
                        abi: EntryPointAbi,
                        data: (error as any).data,
                    });

                    const errorInvalidSignature = decodeErrorResult({
                        abi: VerifyingPaymasterAbi,
                        data: errorAA31.args[2],
                    });
                    console.error(errorInvalidSignature);
                }
            }
        }
    }
    */
}
