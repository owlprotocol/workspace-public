import { AbiParameter, decodeAbiParameters, encodeAbiParameters, keccak256, sliceHex } from "viem";
import { PackedUserOperation } from "viem/account-abstraction";

export type GetVerifyingPaymasterHashParameters = {
    chainId: number;
    userOperation: PackedUserOperation;
};
/**
 * Compute UserOperation hash for Verifying Paymaster signer
 */
export function getVerifyingPaymasterHash(params: GetVerifyingPaymasterHashParameters) {
    const { chainId, userOperation } = params;
    const abi: AbiParameter[] = [
        { type: "address", name: "sender" },
        { type: "uint256", name: "nonce" },
        { type: "bytes32", name: "initCodeHash" },
        { type: "bytes32", name: "callDataHash" },
        { type: "bytes32", name: "accountGasLimits" },
        { type: "uint256", name: "paymasterAndData" },
        { type: "uint256", name: "preVerificationGas" },
        { type: "bytes32", name: "gasFees" },
        { type: "uint256", name: "chainId" },
        { type: "address", name: "paymaster" },
        { type: "uint48", name: "validUntil" },
        { type: "uint48", name: "validAfter" },
    ];

    // Decode params from data offset
    const [validUntil, validAfter] = decodeAbiParameters(
        [
            { name: "validUntil", type: "uint48" },
            { name: "validAfter", type: "uint48" },
        ],
        sliceHex(userOperation.paymasterAndData, 52),
    );

    return keccak256(
        encodeAbiParameters(abi, [
            userOperation.sender,
            userOperation.nonce,
            keccak256(userOperation.initCode),
            keccak256(userOperation.callData),
            userOperation.accountGasLimits,
            sliceHex(userOperation.paymasterAndData, 20, 52), //paymaster gas
            userOperation.preVerificationGas,
            userOperation.gasFees,
            chainId,
            sliceHex(userOperation.paymasterAndData, 0, 20), // paymaster address
            validUntil,
            validAfter,
        ]),
    );
}
