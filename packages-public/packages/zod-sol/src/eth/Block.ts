import { z } from "zod";
import { Block as BlockViem } from "viem";
import { PartialBy, Prettify } from "viem/types/utils";
import { quantityEncodeZod, quantityDecodeZod } from "./math.js";
import { bytes32Zod, bytesZod } from "../solidity/bytes.js";
import { addressZod } from "../solidity/address.js";

/***** Block *****/
//TODO: Should we support pending blocks?

/**
 * Additional optional fields that are required in viem
 */
export type BlockInputOptionalFields =
    | "baseFeePerGas"
    | "blobGasUsed"
    | "excessBlobGas"
    | "sealFields"
    | "totalDifficulty";

/**
 * Block with mixed types
 * Matches both encoded RPC & decoded TS types.
 */
export type BlockInput = Prettify<
    PartialBy<BlockViem<`0x${string}` | number | bigint, false, "safe">, BlockInputOptionalFields>
>;

/**
 * Block with encoded types
 * Bigint converted to Hex to support Firebase.
 */
export type BlockEncoded = BlockViem<`0x${string}`, false, "safe">;

/**
 * Block with decoded types
 * Bigint decoded from Hex stored on Firebase.
 */
export type BlockDecoded = BlockViem<bigint, false, "safe">;

/**
 * Zod validator encoding BlockInput => BlockEncoded
 */
export const blockEncodeZod = z
    .object({
        /** Block Base  */
        hash: bytes32Zod.describe("Block hash or `null` if pending"),
        number: quantityEncodeZod.describe("Block number or `null` if pending "),
        parentHash: bytes32Zod.describe("Parent block hash"),
        nonce: bytesZod.describe("Proof-of-work hash or `null` if pending"),
        difficulty: quantityEncodeZod.describe("Difficulty for this block"),
        totalDifficulty: quantityEncodeZod
            .nullable()
            .default(null)
            .describe("Total difficulty of the chain until this block"),
        miner: addressZod.describe("Address that received this block’s mining rewards"),
        extraData: bytesZod.describe('"Extra data" field of this block'),
        mixHash: bytes32Zod.describe("Unique identifier for the block."),
        size: quantityEncodeZod.describe("Size of this block in bytes"),
        stateRoot: bytes32Zod.describe("Root of this block’s final state trie"),
        timestamp: quantityEncodeZod.describe("Unix timestamp of when this block was collated"),
        /** Uncles */
        uncles: z.array(bytes32Zod).describe("List of uncle hashes"),
        sha3Uncles: bytes32Zod.describe("SHA3 of the uncles data in this block"),
        /** Withdrawals */
        //TODO: Add Withdrawal zod
        withdrawals: z.array(z.any()).optional().describe("List of withdrawal objects"),
        withdrawalsRoot: bytes32Zod.optional().describe("Root of the this block’s withdrawals trie"),
        /** Gas & Fee Values */
        gasLimit: quantityEncodeZod.describe("Maximum gas allowed in this block"),
        gasUsed: quantityEncodeZod.describe("Total used gas by all transactions in this block"),
        baseFeePerGas: quantityEncodeZod
            .nullable()
            .default(null)
            .describe("The protocol-defined base fee per gas in an https://eips.ethereum.org/EIPS/eip-1559 block."),
        blobGasUsed: quantityEncodeZod.default("0x0").describe("Total used blob gas by all transactions in this block"),
        excessBlobGas: quantityEncodeZod.default("0x0").describe("Excess blob gas"),
        /** Receipts */
        receiptsRoot: bytes32Zod.describe("Root of the this block’s receipts trie"),
        sealFields: z.array(bytes32Zod).default([]),
        /** Logs */
        logsBloom: bytesZod.describe("Logs bloom filter or `null` if pending"),
        /** Transactions */
        transactions: z.array(bytes32Zod).describe("The list of transactions in the block."),
        transactionsRoot: bytes32Zod.describe("Root of this block’s transaction trie"),
    })
    .describe("An EVM Transaction, Quantity/Index hex/number");

/**
 * Zod validator encoding BlockEncoded => BlockDecoded
 */
export const blockDecodeZod = z
    .object({
        /** Block Base  */
        hash: bytes32Zod.describe("Block hash or `null` if pending"),
        number: quantityDecodeZod.describe("Block number or `null` if pending "),
        parentHash: bytes32Zod.describe("Parent block hash"),
        nonce: bytesZod.describe("Proof-of-work hash or `null` if pending"),
        difficulty: quantityDecodeZod.describe("Difficulty for this block"),
        totalDifficulty: quantityDecodeZod
            .nullable()
            .default(null)
            .describe("Total difficulty of the chain until this block"),
        miner: addressZod.describe("Address that received this block’s mining rewards"),
        extraData: bytesZod.describe('"Extra data" field of this block'),
        mixHash: bytes32Zod.describe("Unique identifier for the block."),
        size: quantityDecodeZod.describe("Size of this block in bytes"),
        stateRoot: bytes32Zod.describe("Root of this block’s final state trie"),
        timestamp: quantityDecodeZod.describe("Unix timestamp of when this block was collated"),
        /** Uncles */
        uncles: z.array(bytes32Zod).describe("List of uncle hashes"),
        sha3Uncles: bytes32Zod.describe("SHA3 of the uncles data in this block"),
        /** Withdrawals */
        //TODO: Add Withdrawal zod
        withdrawals: z.array(z.any()).optional().describe("List of withdrawal objects"),
        withdrawalsRoot: bytes32Zod.optional().describe("Root of the this block’s withdrawals trie"),
        /** Gas & Fee Values */
        gasLimit: quantityDecodeZod.describe("Maximum gas allowed in this block"),
        gasUsed: quantityDecodeZod.describe("Total used gas by all transactions in this block"),
        baseFeePerGas: quantityDecodeZod
            .nullable()
            .default(null)
            .describe("The protocol-defined base fee per gas in an https://eips.ethereum.org/EIPS/eip-1559 block."),
        blobGasUsed: quantityDecodeZod.default(0n).describe("Total used blob gas by all transactions in this block"),
        excessBlobGas: quantityDecodeZod.default(0n).describe("Excess blob gas"),
        /** Receipts */
        receiptsRoot: bytes32Zod.describe("Root of the this block’s receipts trie"),
        sealFields: z.array(bytes32Zod).default([]),
        /** Logs */
        logsBloom: bytesZod.describe("Logs bloom filter or `null` if pending"),
        /** Transactions */
        transactions: z.array(bytes32Zod).describe("The list of transactions in the block."),
        transactionsRoot: bytes32Zod.describe("Root of this block’s transaction trie"),
    })
    .describe("An EVM Transaction, Quantity/Index bigint/number");
