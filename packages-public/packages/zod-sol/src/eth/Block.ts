//////////////////////
// Block

import { z } from "zod";
import { TypeOf, expectType } from "ts-expect";
import {
    TransactionResponse,
    TransactionResponseFromRpc,
    transactionResponseFromRpcZod,
    transactionResponseZod,
} from "./TransactionResponse.js";
import {
    bigIntLikeToBigIntZod,
    bigIntLikeToHexStringZod,
    numberLikeToHexStringZod,
    numberLikeToNumberZod,
} from "./math.js";
import { NumberBigintAsString } from "../utils/NumberBigintAsString.js";

import { bytes32Zod, bytesZod } from "../solidity/bytes.js";
import { addressZod } from "../solidity/address.js";

export const blockZod = z
    .object({
        hash: bytes32Zod.describe("The block hash."),
        number: numberLikeToNumberZod.describe("The block number."),
        timestamp: numberLikeToNumberZod.describe(
            "The timestamp for this block, which is the number of seconds since epoch that this block was included.",
        ),
        parentHash: bytes32Zod.describe(
            "The hash of the previous block in the blockchain. The genesis block has the parentHash of zero.",
        ),
        parentBeaconBlockRoot: bytes32Zod
            .optional()
            .nullable()
            .describe(
                "The hash tree root of the parent beacon block for the given execution block. See https://eips.ethereum.org/EIPS/eip-4788",
            ),
        nonce: bytesZod.describe("A random sequence provided during the mining process for proof-of-work networks."),
        difficulty: bigIntLikeToBigIntZod.describe(
            "For proof-of-work networks, the difficulty target is used to adjust the difficulty in mining to ensure a expected block rate.",
        ),
        gasLimit: bigIntLikeToBigIntZod.describe("The maximum amount of gas a block can consume."),
        gasUsed: bigIntLikeToBigIntZod.describe("The amount of gas a block consumed."),
        blobGasUsed: bigIntLikeToBigIntZod
            .optional()
            .nullable()
            .describe(
                "The total amount of BLOb gas consumed by transactions within the block. See https://eips.ethereum.org/EIPS/eip-4844.",
            ),
        excessBlobGas: bigIntLikeToBigIntZod
            .optional()
            .nullable()
            .describe(
                " The running total of BLOb gas consumed in excess of the target prior to the block. See https://eips.ethereum.org/EIPS/eip-4844.",
            ),
        miner: addressZod.describe("The miner (or author) of a block."),
        extraData: bytesZod.describe("Additional data the miner choose to include."),
        baseFeePerGas: bigIntLikeToBigIntZod
            .nullable()
            .default(null)
            .describe("The protocol-defined base fee per gas in an https://eips.ethereum.org/EIPS/eip-1559 block."),
        stateRoot: bytes32Zod
            .nullable()
            .default(null)
            .describe("The root hash for the global state after applying changes in this block."),
        receiptsRoot: bytes32Zod.nullable().default(null).describe("The hash of the transaction receipts trie."),
        transactions: z
            .union([z.array(z.string()), z.array(transactionResponseZod)])
            .describe("The list of transactions in the block."),
    })
    .passthrough()
    .describe("a **Block** encodes the minimal required properties for a formatted block.");
expectType<TypeOf<Block, z.output<typeof blockZod>>>(true);

export const blockFromRpcZod = blockZod.extend({
    number: numberLikeToHexStringZod.describe("The block number."),
    timestamp: numberLikeToHexStringZod.describe(
        "The timestamp for this block, which is the number of seconds since epoch that this block was included.",
    ),
    difficulty: bigIntLikeToHexStringZod.describe(
        "For proof-of-work networks, the difficulty target is used to adjust the difficulty in mining to ensure a expected block rate.",
    ),
    gasLimit: bigIntLikeToHexStringZod.describe("The maximum amount of gas a block can consume."),
    gasUsed: bigIntLikeToHexStringZod.describe("The amount of gas a block consumed."),
    blobGasUsed: bigIntLikeToHexStringZod
        .optional()
        .nullable()
        .describe(
            "The total amount of BLOb gas consumed by transactions within the block. See https://eips.ethereum.org/EIPS/eip-4844.",
        ),
    excessBlobGas: bigIntLikeToHexStringZod
        .optional()
        .nullable()
        .describe(
            " The running total of BLOb gas consumed in excess of the target prior to the block. See https://eips.ethereum.org/EIPS/eip-4844.",
        ),
    baseFeePerGas: bigIntLikeToHexStringZod
        .nullable()
        .default(null)
        .describe("The protocol-defined base fee per gas in an https://eips.ethereum.org/EIPS/eip-1559 block."),
    transactions: z
        .union([z.array(z.string()), z.array(transactionResponseFromRpcZod)])
        .describe("The list of transactions in the block."),
});
expectType<TypeOf<BlockFromRpc, z.output<typeof blockFromRpcZod>>>(true);

/**
 *  a **Block** encodes the minimal required properties for a
 *  formatted block.
 */
export interface Block {
    /**
     *  The block hash.
     */
    hash: string;

    /**
     *  The block number.
     */
    number: number;

    /**
     *  The timestamp for this block, which is the number of seconds
     *  since epoch that this block was included.
     */
    timestamp: number;

    /**
     *  The hash of the previous block in the blockchain. The genesis block
     *  has the parentHash of the [[ZeroHash.
     */
    parentHash: string;

    /**
     *  The hash tree root of the parent beacon block for the given
     *  execution block. See https://eips.ethereum.org/EIPS/eip-4788.
     */
    parentBeaconBlockRoot?: null | string;

    /**
     *  A random sequence provided during the mining process for
     *  proof-of-work networks.
     */
    nonce: string;

    /**
     *  For proof-of-work networks, the difficulty target is used to
     *  adjust the difficulty in mining to ensure a expected block rate.
     */
    difficulty: bigint;

    /**
     *  The maximum amount of gas a block can consume.
     */
    gasLimit: bigint;

    /**
     *  The amount of gas a block consumed.
     */
    gasUsed: bigint;

    /**
     *  The total amount of BLOb gas consumed by transactions within
     *  the block. See https://eips.ethereum.org/EIPS/eip4844].
     */
    blobGasUsed?: null | bigint;

    /**
     *  The running total of BLOb gas consumed in excess of the target
     *  prior to the block. See https://eips.ethereum.org/EIPS/eip-4844.
     */
    excessBlobGas?: null | bigint;

    /**
     *  The miner (or author) of a block.
     */
    miner: string;

    /**
     *  Additional data the miner choose to include.
     */
    extraData: string;

    /**
     *  The protocol-defined base fee per gas in an https://eips.ethereum.org/EIPS/eip-1559
     *  block.
     */
    baseFeePerGas: null | bigint;

    /**
     *  The root hash for the global state after applying changes
     *  in this block.
     */
    stateRoot: null | string;

    /**
     *  The hash of the transaction receipts trie.
     */
    receiptsRoot: null | string;

    /**
     *  The list of transactions in the block.
     */
    transactions: string[] | TransactionResponse[];
}

/** JSON-RPC encoded response */
export type BlockFromRpc = Omit<NumberBigintAsString<Block>, "transactions"> & {
    transactions: string[] | TransactionResponseFromRpc[];
};
