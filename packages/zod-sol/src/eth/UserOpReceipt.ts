/***** UserOpReceipt *****/

import { z } from "zod";
import { UserOperationReceipt } from "viem/account-abstraction";
import { quantityDecodeZod, quantityEncodeZod } from "./math.js";
import { logDecodeZod, logEncodeZod } from "./Log.js";
import { transactionReceiptDecodeZod, transactionReceiptEncodeZod } from "./TransactionReceipt.js";
import { addressZod } from "../solidity/address.js";
import { bytes32Zod } from "../solidity/bytes.js";

/**
 * UserOpReceipt with mixed types
 * Matches both encoded RPC & decoded TS types.
 */
export type UserOpReceiptInput = UserOperationReceipt<
    "0.7",
    `0x${string}` | number | bigint,
    `0x${string}` | number,
    "success" | "reverted" | "0x0" | "0x1"
>;

/**
 * UserOpReceipt with encoded types
 * Bigint converted to Hex to support Firebase.
 */
export type UserOpReceiptEncoded = UserOperationReceipt<"0.7", `0x${string}`, `0x${string}`, "0x0" | "0x1">;

/**
 * UserOpReceipt with decoded types
 * Bigint decoded from Hex stored on Firebase.
 */
export type UserOpReceiptDecoded = UserOperationReceipt<"0.7", bigint, number, "success" | "reverted">;

/**
 * Zod validator encoding UserOpReceiptInput => UserOpReceiptEncoded
 */
export const userOpReceiptEncodeZod = z
    .object({
        actualGasUsed: quantityEncodeZod.describe("UserOp gas used"),
        actualGasCost: quantityEncodeZod.describe("UserOp gas cost"),
        entryPoint: addressZod,
        logs: z.array(logEncodeZod),
        nonce: quantityEncodeZod,
        paymaster: addressZod,
        reason: z.string().optional(),
        receipt: transactionReceiptEncodeZod,
        sender: addressZod,
        success: z.boolean().describe("UserOp result"),
        userOpHash: bytes32Zod,
    })
    .describe("An ERC4337 v0.7 UserOpReceipt, Quantity/Index hex/number");

/**
 * Zod validator encoding UserOpReceiptEncoded => UserOpReceiptDecoded
 */
export const userOpReceiptDecodeZod = z
    .object({
        actualGasUsed: quantityDecodeZod.describe("UserOp gas used"),
        actualGasCost: quantityDecodeZod.describe("UserOp gas cost"),
        entryPoint: addressZod,
        logs: z.array(logDecodeZod),
        nonce: quantityDecodeZod,
        paymaster: addressZod,
        reason: z.string().optional(),
        receipt: transactionReceiptDecodeZod,
        sender: addressZod,
        success: z.boolean().describe("UserOp result"),
        userOpHash: bytes32Zod,
    })
    .describe("An ERC4337 v0.7 UserOpReceipt, Quantity/Index bigint/number");
