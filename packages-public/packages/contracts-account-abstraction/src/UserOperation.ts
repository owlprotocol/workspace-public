import { EntryPointVersion, UserOperation } from "permissionless/types";
import { Address, Hash, Hex, numberToHex, zeroAddress } from "viem";

export type UserOperationWithBigIntAsHex<entryPointVersion extends EntryPointVersion> = entryPointVersion extends "v0.6"
    ? {
          sender: Address;
          nonce: Hex;
          initCode: Hex;
          callData: Hex;
          callGasLimit: Hex;
          verificationGasLimit: Hex;
          preVerificationGas: Hex;
          maxFeePerGas: Hex;
          maxPriorityFeePerGas: Hex;
          paymasterAndData: Hex;
          signature: Hex;
          factory?: never;
          factoryData?: never;
          paymaster?: never;
          paymasterVerificationGasLimit?: never;
          paymasterPostOpGasLimit?: never;
          paymasterData?: never;
      }
    : {
          sender: Address;
          nonce: Hex;
          factory: Address;
          factoryData: Hex;
          callData: Hex;
          callGasLimit: Hex;
          verificationGasLimit: Hex;
          preVerificationGas: Hex;
          maxFeePerGas: Hex;
          maxPriorityFeePerGas: Hex;
          paymaster: Address;
          paymasterVerificationGasLimit: Hex;
          paymasterPostOpGasLimit: Hex;
          paymasterData: Hex;
          signature: Hex;
          initCode?: never;
          paymasterAndData?: never;
      };

//Not exported by permissionnless
export type UserOperationReceiptWithBigIntAsHex = {
    userOpHash: Hash;
    sender: Address;
    nonce: Hex;
    actualGasUsed: Hex;
    actualGasCost: Hex;
    success: boolean;
    receipt: {
        transactionHash: Hex;
        transactionIndex: Hex;
        blockHash: Hash;
        blockNumber: Hex;
        from: Address;
        to: Address | null;
        cumulativeGasUsed: Hex;
        status: "0x0" | "0x1";
        gasUsed: Hex;
        contractAddress: Address | null;
        logsBloom: Hex;
        effectiveGasPrice: Hex;
    };
    logs: {
        data: Hex;
        blockNumber: Hex;
        blockHash: Hash;
        transactionHash: Hash;
        logIndex: Hex;
        transactionIndex: Hex;
        address: Address;
        topics: Hex[];
    }[];
};

/**
 * Encode UserOp for RPC (BigInt as hex)
 * @param userOp
 * @returns
 */
export function encodeUserOp(userOp: UserOperation<"v0.7">): UserOperationWithBigIntAsHex<"v0.7"> {
    return {
        sender: userOp.sender,
        nonce: numberToHex(userOp.nonce),
        factory: userOp.factory ?? zeroAddress,
        factoryData: userOp.factoryData ?? "0x",
        signature: userOp.signature,
        callData: userOp.callData,
        callGasLimit: numberToHex(userOp.callGasLimit),
        verificationGasLimit: numberToHex(userOp.verificationGasLimit),
        preVerificationGas: numberToHex(userOp.preVerificationGas),
        maxFeePerGas: numberToHex(userOp.maxFeePerGas),
        maxPriorityFeePerGas: numberToHex(userOp.maxPriorityFeePerGas),
        paymaster: userOp.paymaster ?? zeroAddress,
        paymasterVerificationGasLimit: numberToHex(userOp.paymasterVerificationGasLimit ?? 0n),
        paymasterPostOpGasLimit: numberToHex(userOp.paymasterVerificationGasLimit ?? 0n),
        paymasterData: userOp.paymasterData ?? "0x",
    };
}

/**
 * Decode UserOp from RPC (Hex to BigInt)
 * @param userOp
 * @returns
 */
export function decodeUserOp(userOp: UserOperationWithBigIntAsHex<"v0.7">): UserOperation<"v0.7"> {
    return {
        sender: userOp.sender,
        nonce: BigInt(userOp.nonce),
        factory: userOp.factory != zeroAddress ? userOp.factory : undefined,
        factoryData: userOp.factory != zeroAddress && userOp.factoryData != "0x" ? userOp.factoryData : undefined,
        signature: userOp.signature,
        callData: userOp.callData,
        callGasLimit: BigInt(userOp.callGasLimit),
        verificationGasLimit: BigInt(userOp.verificationGasLimit),
        preVerificationGas: BigInt(userOp.preVerificationGas),
        maxFeePerGas: BigInt(userOp.maxFeePerGas),
        maxPriorityFeePerGas: BigInt(userOp.maxPriorityFeePerGas),
        paymaster: userOp.paymaster != zeroAddress ? userOp.paymaster : undefined,
        paymasterVerificationGasLimit: BigInt(userOp.paymasterVerificationGasLimit),
        paymasterPostOpGasLimit: BigInt(userOp.paymasterVerificationGasLimit),
        paymasterData: userOp.paymasterData != "0x" ? userOp.paymasterData : undefined,
    };
}
