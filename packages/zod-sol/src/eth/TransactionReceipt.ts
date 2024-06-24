import { z } from "zod";
import { TransactionReceipt as TransactionReceiptViem } from "viem";
import { quantityEncodeZod, indexEncodeZod, quantityDecodeZod, indexDecodeZod } from "./math.js";
import {
    TransactionTypeEncoded,
    TransactionTypeInput,
    transactionTypeDecodeZod,
    transactionTypeEncodeZod,
} from "./Transaction.js";
import { addressZod } from "../solidity/address.js";
import { bytes32Zod, bytesZod } from "../solidity/bytes.js";

/***** Transaction Status *****/
/**
 * Transaction Status, hex & string literal
 */
export type TransactionStatusInput = "0x1" | "success" | "0x0" | "reverted";
/**
 * Transaction Status, string literal
 */
export type TransactionStatusEncoded = "0x1" | "0x0";
/**
 * Transaction Status, string literal
 */
export type TransactionStatusDecoded = "success" | "reverted";

/**
 * Transaction status zod, supports both hex & string literal
 */
export const transactionStatusZod = z
    .union([z.literal("0x1"), z.literal("success"), z.literal("0x0"), z.literal("reverted")])
    .describe("`success|0x1` if this transaction was successful or `reverted|0x0` if it failed");
/**
 * Encode transaction status to `"0x1" | "0x0"`
 */
export const transactionStatusEncodeZod = transactionStatusZod.transform((type) => {
    if (type === "success") return "0x1";
    if (type === "reverted") return "0x0";
    return type;
}) as unknown as z.ZodLiteral<TransactionStatusEncoded>;
/**
 * Decode transaction status to `"success" | "reverted"`
 */
export const transactionStatusDecodeZod = transactionStatusZod.transform((type) => {
    if (type === "0x1") return "success";
    if (type === "0x0") return "reverted";
    return type;
}) as unknown as z.ZodLiteral<TransactionStatusDecoded>;

/***** Transaction Receipt *****/
/**
 * Omit these fields from viem model
 */
type TransactionReceiptOmitFields = "logs";

/**
 * Transaction receipt with mixed types
 * Matches both encoded RPC & decoded TS types.
 */
export type TransactionReceiptInput = Omit<
    TransactionReceiptViem<
        `0x${string}` | number | bigint,
        `0x${string}` | number,
        TransactionStatusInput,
        TransactionTypeInput
    >,
    TransactionReceiptOmitFields
>;

/**
 * Transaction receipt with encoded types
 * Bigint converted to Hex to support Firebase.
 */
export type TransactionReceiptEncoded = Omit<
    TransactionReceiptViem<`0x${string}`, `0x${string}`, TransactionStatusEncoded, TransactionTypeEncoded>,
    TransactionReceiptOmitFields
>;

/**
 * Transaction receipt with decoded types
 * Bigint decoded from Hex stored on Firebase.
 */
export type TransactionReceiptDecoded = Omit<
    TransactionReceiptViem<bigint, number, TransactionStatusDecoded, TransactionTypeEncoded>,
    TransactionReceiptOmitFields
>;

/**
 * Zod validator encoding TransactionReceiptInput => TransactionReceiptEncoded
 */
export const transactionReceiptEncodeZod = z
    .object({
        /** Receipt Base  */
        transactionHash: bytes32Zod.describe("Hash of this transaction"),
        blockNumber: quantityEncodeZod.describe("Number of block containing this transaction or `null` if pending"),
        blockHash: bytes32Zod.describe("Hash of block containing this transaction or `null` if pending"),
        transactionIndex: indexEncodeZod.describe("Index of this transaction in the block or `null` if pending"),
        from: addressZod.describe("Transaction sender"),
        to: addressZod.nullable().describe("Transaction recipient or `null` if deploying a contract"),
        contractAddress: addressZod
            .nullable()
            .default(null)
            .describe(
                "If the transaction was directly deploying a contract, the [[to]] will be null, the ``data`` will be initcode and if successful, this will be the address of the contract deployed.",
            ),
        type: transactionTypeEncodeZod,
        status: transactionStatusEncodeZod,
        root: bytesZod
            .optional()
            .describe(
                "The post-transaction state root. Only specified for transactions included before the Byzantium upgrade.",
            ),
        /** Gas & Fee Values */
        gasUsed: quantityEncodeZod.describe("The amount of gas consumed executing this transaction."),
        cumulativeGasUsed: quantityEncodeZod.describe("Gas used by this and all preceding transactions in this block"),
        effectiveGasPrice: quantityEncodeZod.describe(
            "Pre-London, it is equal to the transaction's gasPrice. Post-London, it is equal to the actual gas price paid for inclusion.",
        ),
        blobGasUsed: quantityEncodeZod
            .optional()
            .nullable()
            .describe("The amount of blob gas used. Only specified for blob transactions as defined by EIP-4844. "),
        blobGasPrice: quantityEncodeZod
            .optional()
            .describe(
                "The actual value per gas deducted from the sender's account for blob gas. Only specified for blob transactions as defined by EIP-4844. ",
            ),
        /** Logs */
        logsBloom: bytesZod.describe("Logs bloom filter"),
    })
    .describe("An EVM Transaction, Quantity/Index hex/number");

/**
 * Zod validator encoding TransactionReceiptEncoded => TransactionReceiptDecoded
 */
export const transactionReceiptDecodeZod = z
    .object({
        /** Receipt Base  */
        transactionHash: bytes32Zod.describe("Hash of this transaction"),
        blockNumber: quantityDecodeZod.describe("Number of block containing this transaction or `null` if pending"),
        blockHash: bytes32Zod.describe("Hash of block containing this transaction or `null` if pending"),
        transactionIndex: indexDecodeZod.describe("Index of this transaction in the block or `null` if pending"),
        from: addressZod.describe("Transaction sender"),
        to: addressZod.nullable().describe("Transaction recipient or `null` if deploying a contract"),
        contractAddress: addressZod
            .nullable()
            .default(null)
            .describe(
                "If the transaction was directly deploying a contract, the [[to]] will be null, the ``data`` will be initcode and if successful, this will be the address of the contract deployed.",
            ),
        type: transactionTypeDecodeZod,
        status: transactionStatusDecodeZod,
        root: bytesZod
            .optional()
            .describe(
                "The post-transaction state root. Only specified for transactions included before the Byzantium upgrade.",
            ),
        /** Gas & Fee Values */
        gasUsed: quantityDecodeZod.describe("The amount of gas consumed executing this transaction."),
        cumulativeGasUsed: quantityDecodeZod.describe("Gas used by this and all preceding transactions in this block"),
        effectiveGasPrice: quantityDecodeZod.describe(
            "Pre-London, it is equal to the transaction's gasPrice. Post-London, it is equal to the actual gas price paid for inclusion.",
        ),
        blobGasUsed: quantityDecodeZod
            .optional()
            .nullable()
            .describe("The amount of blob gas used. Only specified for blob transactions as defined by EIP-4844. "),
        blobGasPrice: quantityDecodeZod
            .optional()
            .describe(
                "The actual value per gas deducted from the sender's account for blob gas. Only specified for blob transactions as defined by EIP-4844. ",
            ),
        /** Logs */
        logsBloom: bytesZod.describe("Logs bloom filter"),
    })
    .describe("An EVM Transaction, Quantity/Index bigint/number");
