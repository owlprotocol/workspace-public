import { UserOperation } from "viem/account-abstraction";

export const getUserOperationTotalGas = (userOp: UserOperation<"0.7">) => {
    return (
        userOp.maxFeePerGas *
        (userOp.preVerificationGas +
            userOp.callGasLimit +
            userOp.verificationGasLimit +
            (userOp.paymasterVerificationGasLimit ?? 0n) +
            (userOp.paymasterPostOpGasLimit ?? 0n))
    );
};
