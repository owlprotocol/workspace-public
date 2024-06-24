import { UserOperation } from "permissionless/types";
import * as chains from "viem/chains";

/**
 * Use executionResult of EntryPointSimulations to compute `verificationGas`
 * and `callGasLimit`
 * @param userOperation
 * @param executionResult
 * @param chainId
 * @param callDataResult
 * @returns `verificationGas` and `callGasLimit`
 */
export function calcVerificationGasAndCallGasLimit(
    userOperation: UserOperation<"v0.7">,
    executionResult: {
        preOpGas: bigint;
        paid: bigint;
    },
    chainId: number,
    callDataResult?: {
        gasUsed: bigint;
    },
) {
    const verificationGasLimit = ((executionResult.preOpGas - userOperation.preVerificationGas) * 3n) / 2n;

    let gasPrice: bigint;

    if (userOperation.maxPriorityFeePerGas === userOperation.maxFeePerGas) {
        gasPrice = userOperation.maxFeePerGas;
    } else {
        gasPrice = userOperation.maxFeePerGas;
    }

    const calculatedCallGasLimit =
        callDataResult?.gasUsed ?? executionResult.paid / gasPrice - executionResult.preOpGas;

    let callGasLimit = (calculatedCallGasLimit > 9000n ? calculatedCallGasLimit : 9000n) + 21000n + 50000n;

    if (chainId === chains.baseGoerli.id || chainId === chains.baseSepolia.id || chainId === chains.base.id) {
        callGasLimit = (110n * callGasLimit) / 100n;
    }

    return { verificationGasLimit, callGasLimit };
}
