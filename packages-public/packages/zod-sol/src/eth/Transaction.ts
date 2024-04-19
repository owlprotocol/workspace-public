import {
    OneOf,
    TransactionEIP1559,
    TransactionEIP2930,
    TransactionEIP4844,
    TransactionLegacy,
    UnionOmit,
    UnionPartialBy,
} from "viem";
import { z } from "zod";
import { Prettify } from "viem/types/utils";
import { acessListZod } from "./AccessList.js";
import { indexDecodeZod, indexEncodeZod, quantityDecodeZod, quantityEncodeZod } from "./math.js";
import { addressZod } from "../solidity/address.js";
import { bytes32Zod, bytesZod } from "../solidity/bytes.js";

//TODO: Remove this, kept here for core-trpc compatibility
export const txHashZod = bytes32Zod.describe("transaction hash");

/***** Transaction ******/
/**
 * Input Transaction Type, hex & string literal
 * - Main Ethereum transaction types `"legacy" | "eip2930" | "eip1559" | "eip4844"`
 * - OPStack transaction types `"deposit"`
 * - ZKSync transaction types `"eip712" | "priority"`
 */
export type TransactionTypeInput =
    | "0x0"
    | "legacy"
    | "0x1"
    | "eip2930"
    | "0x2"
    | "eip1559"
    | "0x3"
    | "eip4844"
    | "0x7e"
    | "deposit"
    | "eip721"
    | "priority";
/**
 * Encoded Transaction Type, string literal
 * - Main Ethereum transaction types `"0x0" | "0x1" | "0x2" | "0x3"`
 * - OPStack transaction types `"0x7e"`
 * - ZKSync transaction types `"0x71" | "0xff"`
 */
export type TransactionTypeEncoded = "0x0" | "0x1" | "0x2" | "0x3" | "0x7e" | "0x71" | "0xff";
/**
 * Decode Transaction Type, string literal
 * - Main Ethereum transaction types `"legacy" | "eip2930" | "eip1559" | "eip4844"`
 * - OPStack transaction types `"deposit"`
 * - ZKSync transaction types `"eip712" | "priority"`
 */
export type TransactionTypeDecoded = "legacy" | "eip2930" | "eip1559" | "eip4844" | "deposit" | "eip712" | "priority";

/**
 * Transaction type zod, supports both hex & string literal
 * We use z.string() to support all transaction types
 */
export const transactionTypeZod = z.string().describe("Transaction type");
/**
 * Encode transaction type to hex
 * - Main Ethereum transaction types `"0x0" | "0x1" | "0x2" | "0x3"`
 * - OPStack transaction types `"0x7e"`
 * - ZKSync transaction types `"0x71" | "0xff"`
 */
export const transactionTypeEncodeZod = transactionTypeZod.transform((type) => {
    if (type === "legacy") return "0x0";
    if (type === "eip2930") return "0x1";
    if (type === "eip1559") return "0x2";
    if (type === "eip4844") return "0x3";
    if (type === "deposit") return "0x7e";
    if (type === "eip712") return "0x71";
    if (type === "priority") return "0xff";
    if (type) return type;
}) as unknown as z.ZodLiteral<TransactionTypeEncoded>;

/**
 * Decode transaction type to string literal
 * - Main Ethereum transaction types `"legacy" | "eip2930" | "eip1559" | "eip4844"`
 * - OPStack transaction types `"deposit"`
 * - ZKSync transaction types `"eip712" | "priority"`
 */
export const transactionTypeDecodeZod = transactionTypeZod.transform((type) => {
    if (type === "0x0") return "legacy";
    if (type === "0x1") return "eip2930";
    if (type === "0x2") return "eip1559";
    if (type === "0x3") return "eip4844";
    if (type.toLowerCase() === "0x7e") return "deposit";
    if (type === "0x71") return "eip712";
    if (type.toLowerCase() === "0xff") return "priority";
    return type;
}) as unknown as z.ZodLiteral<TransactionTypeDecoded>;

//TODO: Should we support pending transactions?
/**
 * Transaction with mixed types
 * Matches both encoded RPC & decoded TS types.
 */
export type TransactionInput = Prettify<
    UnionOmit<
        UnionPartialBy<
            OneOf<
                | TransactionLegacy<`0x${string}` | number | bigint, `0x${string}` | number, false, "0x0" | "legacy">
                | TransactionEIP2930<`0x${string}` | number | bigint, `0x${string}` | number, false, "0x1" | "eip2930">
                | TransactionEIP1559<`0x${string}` | number | bigint, `0x${string}` | number, false, "0x2" | "eip1559">
                | TransactionEIP4844<`0x${string}` | number | bigint, `0x${string}` | number, false, "0x3" | "eip4844">
            >,
            // `yParity` is optional on the RPC type as some nodes do not return it
            // for 1559 & 2930 transactions (they should!).
            "yParity"
        >,
        "typeHex"
    >
>;

//TODO: Add OpStack & ZKSync transaction type fields
/**
 * Transaction with encoded types
 * Bigint converted to Hex to support Firebase.
 */
export type TransactionEncoded = Prettify<
    UnionOmit<
        UnionPartialBy<
            OneOf<
                | TransactionLegacy<`0x${string}`, `0x${string}`, false, "0x0">
                | TransactionEIP2930<`0x${string}`, `0x${string}`, false, "0x1">
                | TransactionEIP1559<`0x${string}`, `0x${string}`, false, "0x2">
                | TransactionEIP4844<`0x${string}`, `0x${string}`, false, "0x3">
            >,
            // `yParity` is optional on the RPC type as some nodes do not return it
            // for 1559 & 2930 transactions (they should!).
            "yParity"
        >,
        "typeHex"
    >
>;

//TODO: Add OpStack & ZKSync transaction type fields
/**
 * Transaction with decoded types
 * Bigint decoded from Hex stored on Firebase.
 */
export type TransactionDecoded = Prettify<
    UnionOmit<
        UnionPartialBy<
            OneOf<
                | TransactionLegacy<bigint, number, false, "legacy">
                | TransactionEIP2930<bigint, number, false, "eip2930">
                | TransactionEIP1559<bigint, number, false, "eip1559">
                | TransactionEIP4844<bigint, number, false, "eip4844">
            >,
            // `yParity` is optional on the RPC type as some nodes do not return it
            // for 1559 & 2930 transactions (they should!).
            "yParity"
        >,
        "typeHex"
    >
>;

//TODO: Add OpStack & ZKSync transaction type fields
/**
 * Zod validator encoding TransactionInput => TransactionEncoded
 */
export const transactionEncodeZod = z
    .object({
        /** Transaction Base  */
        hash: bytes32Zod.describe("Hash of this transaction"),
        blockNumber: quantityEncodeZod.describe("Number of block containing this transaction or `null` if pending"),
        blockHash: bytes32Zod.nullable().describe("Hash of block containing this transaction or `null` if pending"),
        transactionIndex: indexEncodeZod.describe("Index of this transaction in the block or `null` if pending"),
        from: addressZod.describe("Transaction sender"),
        to: addressZod.nullable().describe("Transaction recipient or `null` if deploying a contract"),
        nonce: indexEncodeZod.describe("Unique number identifying this transaction"),
        input: bytesZod.describe("Contract code or a hashed method call"),
        value: quantityEncodeZod.describe("Value in wei sent with this transaction"),
        gas: quantityEncodeZod.describe("Gas provided for transaction execution"),
        r: bytesZod.describe("ECDSA signature r"),
        s: bytesZod.describe("ECDSA signature s"),
        v: quantityEncodeZod.describe("ECDSA recovery ID"),
        yParity: indexEncodeZod.optional().describe("The parity of the y-value of the secp256k1 signature."),
        type: transactionTypeEncodeZod,
        chainId: indexEncodeZod.optional().describe("Chain ID that this transaction is valid on."),
        /** EIP-2930 Access List. */
        accessList: acessListZod.optional().describe("EIP-2930 Access List."),
        /** EIP-4844 Blobs */
        blobVersionedHashes: z
            .array(bytesZod)
            .optional()
            .describe("List of versioned blob hashes associated with the transaction's blobs."),
        /** Fee Values */
        gasPrice: quantityEncodeZod.optional().describe("Base fee per gas."),
        maxPriorityFeePerGas: quantityEncodeZod
            .optional()
            .describe("EIP1559: Total fee per gas in wei (gasPrice/baseFeePerGas + maxPriorityFeePerGas)."),
        maxFeePerGas: quantityEncodeZod.optional().describe("EIP1559: Max priority fee per gas (in wei)."),
        maxFeePerBlobGas: quantityEncodeZod
            .optional()
            .describe("EIP4844: The maximum total fee per gas the sender is willing to pay for blob gas (in wei)."),
    })
    .describe("An EVM Transaction, Quantity/Index hex/number");

//TODO: Add OpStack & ZKSync transaction type fields
/**
 * Zod validator encoding TransactionEncoded => TransactionDecoded
 */
export const transactionDecodeZod = z
    .object({
        /** Transaction Base  */
        blockNumber: z
            .union([z.null(), quantityDecodeZod])
            .describe("Number of block containing this transaction or `null` if pending"),
        blockHash: bytes32Zod.nullable().describe("Hash of block containing this transaction or `null` if pending"),
        hash: bytes32Zod.describe("Hash of this transaction"),
        transactionIndex: indexDecodeZod.describe("Index of this transaction in the block or `null` if pending"),
        from: addressZod.describe("Transaction sender"),
        to: addressZod.nullable().describe("Transaction recipient or `null` if deploying a contract"),
        nonce: indexDecodeZod.describe("Unique number identifying this transaction"),
        input: bytesZod.describe("Contract code or a hashed method call"),
        value: quantityDecodeZod.describe("Value in wei sent with this transaction"),
        gas: quantityDecodeZod.describe("Gas provided for transaction execution"),
        r: bytesZod.describe("ECDSA signature r"),
        s: bytesZod.describe("ECDSA signature s"),
        v: quantityDecodeZod.describe("ECDSA recovery ID"),
        yParity: indexDecodeZod.optional().describe("The parity of the y-value of the secp256k1 signature."),
        type: transactionTypeDecodeZod,
        chainId: indexDecodeZod.optional().describe("Chain ID that this transaction is valid on."),
        /** EIP-2930 Access List. */
        accessList: acessListZod.optional().describe("EIP-2930 Access List."),
        /** EIP-4844 Blobs */
        blobVersionedHashes: z
            .array(bytesZod)
            .optional()
            .describe("List of versioned blob hashes associated with the transaction's blobs."),
        /** Fee Values */
        gasPrice: quantityDecodeZod.optional().describe("Base fee per gas."),
        maxPriorityFeePerGas: quantityDecodeZod
            .optional()
            .describe("EIP1559: Total fee per gas in wei (gasPrice/baseFeePerGas + maxPriorityFeePerGas)."),
        maxFeePerGas: quantityDecodeZod.optional().describe("EIP1559: Max priority fee per gas (in wei)."),
        maxFeePerBlobGas: quantityDecodeZod
            .optional()
            .describe("EIP4844: The maximum total fee per gas the sender is willing to pay for blob gas (in wei)."),
    })
    .describe("An EVM Transaction, Quantity/Index bigint/number");
