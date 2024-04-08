/***** UserOp *****/

import { z } from "zod";
import { quantityDecodeZod, quantityEncodeZod } from "./math.js";
import { addressZod } from "../solidity/address.js";
import { bytesZod } from "../solidity/bytes.js";

/**
 * UserOp with mixed types
 * Matches both encoded RPC & decoded TS types.
 */
export interface UserOpInput {
    sender: `0x${string}`;
    nonce: `0x${string}` | number | bigint;
    factory?: `0x${string}`;
    factoryData?: `0x${string}`;
    callData: `0x${string}`;
    callGasLimit: `0x${string}` | number | bigint;
    verificationGasLimit: `0x${string}` | number | bigint;
    preVerificationGas: `0x${string}` | number | bigint;
    maxFeePerGas: `0x${string}` | number | bigint;
    maxPriorityFeePerGas: `0x${string}` | number | bigint;
    paymaster?: `0x${string}`;
    paymasterVerificationGasLimit?: `0x${string}` | number | bigint;
    paymasterPostOpGasLimit?: `0x${string}` | number | bigint;
    paymasterData?: `0x${string}`;
    signature: `0x${string}`;
}

/**
 * UserOp with encoded types
 * Bigint converted to Hex to support Firebase.
 */
export interface UserOpEncoded {
    sender: `0x${string}`;
    nonce: `0x${string}`;
    factory?: `0x${string}`;
    factoryData?: `0x${string}`;
    callData: `0x${string}`;
    callGasLimit: `0x${string}`;
    verificationGasLimit: `0x${string}`;
    preVerificationGas: `0x${string}`;
    maxFeePerGas: `0x${string}`;
    maxPriorityFeePerGas: `0x${string}`;
    paymaster?: `0x${string}`;
    paymasterVerificationGasLimit?: `0x${string}`;
    paymasterPostOpGasLimit?: `0x${string}`;
    paymasterData?: `0x${string}`;
    signature: `0x${string}`;
}

/**
 * UserOp with decoded types
 * Bigint decoded from Hex stored on Firebase.
 */
export interface UserOpDecoded {
    sender: `0x${string}`;
    nonce: bigint;
    factory?: `0x${string}`;
    factoryData?: `0x${string}`;
    callData: `0x${string}`;
    callGasLimit: bigint;
    verificationGasLimit: bigint;
    preVerificationGas: bigint;
    maxFeePerGas: bigint;
    maxPriorityFeePerGas: bigint;
    paymaster?: `0x${string}`;
    paymasterVerificationGasLimit?: bigint;
    paymasterPostOpGasLimit?: bigint;
    paymasterData?: `0x${string}`;
    signature: `0x${string}`;
}

/**
 * Zod validator encoding UserOpInput => UserOpEncoded
 */
export const userOpEncodeZod = z
    .object({
        sender: addressZod.describe("smart account address"),
        nonce: quantityEncodeZod.describe("smart account nonce"),
        factory: addressZod.optional().describe("smart account factory address"),
        factoryData: bytesZod.optional().describe("smart account factory data"),
        callData: bytesZod.describe("call data"),
        callGasLimit: quantityEncodeZod.describe("call gas limit"),
        verificationGasLimit: quantityEncodeZod.describe("verification gas limit"),
        preVerificationGas: quantityEncodeZod.describe("pre-verification gas limit"),
        maxFeePerGas: quantityEncodeZod.describe("max fee per gas"),
        paymaster: addressZod.optional().describe("paymaster address"),
        paymasterVerificationGasLimit: quantityEncodeZod.optional().describe("paymaster verification gas limit"),
        paymasterPostOpGasLimit: quantityEncodeZod.optional().describe("paymaster post-op gas limit"),
        paymasterData: bytesZod.optional().describe("paymaster data"),
        signature: bytesZod.describe("signature"),
    })
    .describe("An ERC4337 v0.7 UserOp, Quantity/Index hex/number");

/**
 * Zod validator encoding UserOpEncoded => UserOpDecoded
 */
export const userOpDecodeZod = z
    .object({
        sender: addressZod.describe("smart account address"),
        nonce: quantityDecodeZod.describe("smart account nonce"),
        factory: addressZod.optional().describe("smart account factory address"),
        factoryData: bytesZod.optional().describe("smart account factory data"),
        callData: bytesZod.describe("call data"),
        callGasLimit: quantityDecodeZod.describe("call gas limit"),
        verificationGasLimit: quantityDecodeZod.describe("verification gas limit"),
        preVerificationGas: quantityDecodeZod.describe("pre-verification gas limit"),
        maxFeePerGas: quantityDecodeZod.describe("max fee per gas"),
        paymaster: addressZod.optional().describe("paymaster address"),
        paymasterVerificationGasLimit: quantityDecodeZod.optional().describe("paymaster verification gas limit"),
        paymasterPostOpGasLimit: quantityDecodeZod.optional().describe("paymaster post-op gas limit"),
        paymasterData: bytesZod.optional().describe("paymaster data"),
        signature: bytesZod.describe("signature"),
    })
    .describe("An ERC4337 v0.7 UserOp, Quantity/Index bigint/number");
