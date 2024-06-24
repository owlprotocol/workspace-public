import {
    OneOf,
    TransactionRequestEIP1559,
    TransactionRequestEIP2930,
    TransactionRequestEIP4844,
    TransactionRequestLegacy,
} from "viem";
import { z } from "zod";
import { indexDecodeZod, indexEncodeZod, quantityDecodeZod, quantityEncodeZod } from "./math.js";
import { acessListZod } from "./AccessList.js";
import { transactionTypeDecodeZod, transactionTypeEncodeZod } from "./Transaction.js";
import { addressZod } from "../solidity/address.js";
import { bytesZod } from "../solidity/bytes.js";

/***** Transaction Request (aka unsigned transaction) ******/
/**
 * Transaction request with mixed types
 * Matches both encoded RPC & decoded TS types.
 */
export type TransactionRequestInput = OneOf<
    | TransactionRequestLegacy<`0x${string}` | number | bigint, `0x${string}` | number, "0x0" | "legacy">
    | TransactionRequestEIP2930<`0x${string}` | number | bigint, `0x${string}` | number, "0x1" | "eip2930">
    | TransactionRequestEIP1559<`0x${string}` | number | bigint, `0x${string}` | number, "0x2" | "eip1559">
    | TransactionRequestEIP4844<`0x${string}` | number | bigint, `0x${string}` | number, "0x3" | "eip4844">
>;

/**
 * Transaction request with encoded types
 * Bigint/number converted to Hex to similar to in an RPC request.
 */
export type TransactionRequestRpc = OneOf<
    | TransactionRequestLegacy<`0x${string}`, `0x${string}`, "0x0">
    | TransactionRequestEIP2930<`0x${string}`, `0x${string}`, "0x1">
    | TransactionRequestEIP1559<`0x${string}`, `0x${string}`, "0x2">
    | TransactionRequestEIP4844<`0x${string}`, `0x${string}`, "0x3">
>;

/**
 * Transaction request with decoded types
 * Bigint/number used for quantity/index
 */
export type TransactionRequestDecoded = OneOf<
    | TransactionRequestLegacy<bigint, number, "legacy">
    | TransactionRequestEIP2930<bigint, number, "eip2930">
    | TransactionRequestEIP1559<bigint, number, "eip1559">
    | TransactionRequestEIP4844<bigint, number, "eip4844">
>;

const transactionRequestEncodeZodInternal = z.object({
    /** Transaction Request Base */
    from: addressZod.describe("Transaction sender"),
    to: addressZod.optional().nullable().describe("Transaction recipient or `null` if deploying a contract"),
    nonce: indexEncodeZod.optional().describe("Unique number identifying this transaction"),
    data: bytesZod.optional().describe("Contract code or a hashed method call with encoded args"),
    value: quantityEncodeZod.optional().describe("Value in wei sent with this transaction"),
    gas: quantityEncodeZod.optional().describe("Gas provided for transaction execution"),
    type: transactionTypeEncodeZod.optional(),
    /** EIP-2930 Access List. */
    accessList: acessListZod.optional().describe("EIP-2930 Access List."),
    /** EIP-4844 Blobs */
    blobs: z.array(bytesZod).optional().describe("The blobs associated with this transaction."),
    /** Fee Values */
    gasPrice: quantityEncodeZod.optional().describe("Base fee per gas."),
    maxPriorityFeePerGas: quantityEncodeZod
        .optional()
        .describe("EIP1559: Total fee per gas in wei (gasPrice/baseFeePerGas + maxPriorityFeePerGas)."),
    maxFeePerGas: quantityEncodeZod.optional().describe("EIP1559: Max priority fee per gas (in wei)."),
    maxFeePerBlobGas: quantityEncodeZod
        .optional()
        .describe("EIP4844: The maximum total fee per gas the sender is willing to pay for blob gas (in wei)."),
});
export const transactionRequestEncodeZod = transactionRequestEncodeZodInternal as Omit<
    typeof transactionRequestEncodeZodInternal,
    "_output" | "_input"
> & {
    _input: TransactionRequestInput;
    _output: TransactionRequestRpc;
};

const transactionRequestDecodeZodInternal = z.object({
    /** Transaction Request Base */
    from: addressZod.describe("Transaction sender"),
    to: addressZod.optional().nullable().describe("Transaction recipient or `null` if deploying a contract"),
    nonce: indexDecodeZod.optional().describe("Unique number identifying this transaction"),
    data: bytesZod.optional().describe("Contract code or a hashed method call with encoded args"),
    value: quantityDecodeZod.optional().describe("Value in wei sent with this transaction"),
    gas: quantityDecodeZod.optional().describe("Gas provided for transaction execution"),
    type: transactionTypeDecodeZod.optional(),
    /** EIP-2930 Access List. */
    accessList: acessListZod.optional().describe("EIP-2930 Access List."),
    /** EIP-4844 Blobs */
    blobs: z.array(bytesZod).optional().describe("The blobs associated with this transaction."),
    /** Fee Values */
    gasPrice: quantityDecodeZod.optional().describe("Base fee per gas."),
    maxPriorityFeePerGas: quantityDecodeZod
        .optional()
        .describe("EIP1559: Total fee per gas in wei (gasPrice/baseFeePerGas + maxPriorityFeePerGas)."),
    maxFeePerGas: quantityDecodeZod.optional().describe("EIP1559: Max priority fee per gas (in wei)."),
    maxFeePerBlobGas: quantityDecodeZod
        .optional()
        .describe("EIP4844: The maximum total fee per gas the sender is willing to pay for blob gas (in wei)."),
});
export const transactionRequestDecodeZod = transactionRequestDecodeZodInternal as Omit<
    typeof transactionRequestDecodeZodInternal,
    "_output" | "_input"
> & {
    _input: TransactionRequestInput;
    _output: TransactionRequestDecoded;
};
