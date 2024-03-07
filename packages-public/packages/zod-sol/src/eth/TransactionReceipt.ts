//////////////////////
// Transaction Receipt

import { z } from "zod";
import { TypeOf, expectType } from "ts-expect";
import { Log, logZod, logFromRpcZod, LogFromRpc } from "./Log.js";
import {
    numberLikeToNumberZod,
    bigIntLikeToBigIntZod,
    bigIntLikeToHexStringZod,
    numberLikeToHexStringZod,
} from "./math.js";
import { NumberBigintAsString } from "../utils/NumberBigintAsString.js";
import { addressZod } from "../solidity/address.js";
import { bytes32Zod, bytesZod } from "../solidity/bytes.js";

export const transactionReceiptZod = z
    .object({
        to: addressZod
            .nullable()
            .describe(
                "The target of the transaction. If ``null``, the ``data`` is initcode and this transaction is a deployment transaction.",
            ),
        from: addressZod.describe("The sender of the transaction."),
        contractAddress: addressZod
            .nullable()
            .default(null)
            .describe(
                "If the transaction was directly deploying a contract, the [[to]] will be null, the ``data`` will be initcode and if successful, this will be the address of the contract deployed.",
            ),
        hash: bytes32Zod.describe("The transaction hash."),
        index: numberLikeToNumberZod.describe("The transaction index."),
        blockHash: bytes32Zod.describe("The block hash of the block that included this transaction."),
        blockNumber: numberLikeToNumberZod.describe("The block number of the block that included this transaction."),
        logsBloom: bytesZod.describe("The bloom filter for the logs emitted during execution of this transaction."),
        logs: z.array(logZod).describe("The logs emitted during the execution of this transaction."),
        gasUsed: bigIntLikeToBigIntZod.describe("The amount of gas consumed executing this transaction."),
        blobGasUsed: bigIntLikeToBigIntZod
            .optional()
            .nullable()
            .describe("The amount of BLOb gas used. See https://eips.ethereum.org/EIPS/eip-4844."),
        cumulativeGasUsed: bigIntLikeToBigIntZod.describe(
            "The total amount of gas consumed during the entire block up to and including this transaction.",
        ),
        gasPrice: bigIntLikeToBigIntZod
            .optional()
            .nullable()
            .describe("The actual gas price per gas charged for this transaction."),
        blobGasPrice: bigIntLikeToBigIntZod
            .optional()
            .nullable()
            .describe("The actual BLOb gas price that was charged. See https://eips.ethereum.org/EIPS/eip-4844."),
        effectiveGasPrice: bigIntLikeToBigIntZod
            .optional()
            .nullable()
            .describe("The actual gas price per gas charged for this transaction."),
        type: numberLikeToNumberZod.describe("The https://eips.ethereum.org/EIPS/eip-2718 transaction type."),
        status: numberLikeToNumberZod
            .nullable()
            .default(null)
            .describe(
                "The status of the transaction execution. If ``1`` then the the transaction returned success, if ``0`` then the transaction was reverted. For pre-byzantium blocks, this is usually null, but some nodes may have backfilled this data.",
            ),
        root: bytesZod
            .nullable()
            .default(null)
            .describe("The root of this transaction in a pre-bazatium block. In post-byzantium blocks this is null."),
    })
    .passthrough()
    .describe("a **TransactionReceipt** encodes the minimal required properties for a formatted transaction receipt.");
expectType<TypeOf<TransactionReceipt, z.output<typeof transactionReceiptZod>>>(true);

export const transactionReceiptFromRpcZod = transactionReceiptZod.extend({
    index: numberLikeToHexStringZod.describe("The transaction index."),
    blockNumber: numberLikeToHexStringZod.describe("The block number of the block that included this transaction."),
    logs: z.array(logFromRpcZod).describe("The logs emitted during the execution of this transaction."),
    gasUsed: bigIntLikeToHexStringZod.describe("The amount of gas consumed executing this transaction."),
    blobGasUsed: bigIntLikeToHexStringZod
        .optional()
        .nullable()
        .describe("The amount of BLOb gas used. See https://eips.ethereum.org/EIPS/eip-4844."),
    cumulativeGasUsed: bigIntLikeToHexStringZod.describe(
        "The total amount of gas consumed during the entire block up to and including this transaction.",
    ),
    gasPrice: bigIntLikeToHexStringZod
        .optional()
        .nullable()
        .describe("The actual gas price per gas charged for this transaction."),
    blobGasPrice: bigIntLikeToHexStringZod
        .optional()
        .nullable()
        .describe("The actual BLOb gas price that was charged. See https://eips.ethereum.org/EIPS/eip-4844."),
    effectiveGasPrice: bigIntLikeToHexStringZod
        .optional()
        .nullable()
        .describe("The actual gas price per gas charged for this transaction."),
    type: numberLikeToHexStringZod.describe("The https://eips.ethereum.org/EIPS/eip-2718 transaction type."),
    status: numberLikeToHexStringZod
        .nullable()
        .default(null)
        .describe(
            "The status of the transaction execution. If ``1`` then the the transaction returned success, if ``0`` then the transaction was reverted. For pre-byzantium blocks, this is usually null, but some nodes may have backfilled this data.",
        ),
});
expectType<TypeOf<TransactionReceiptFromRpc, z.output<typeof transactionReceiptFromRpcZod>>>(true);

/**
 *  a **TransactionReceipt** encodes the minimal required properties
 *  for a formatted transaction receipt.
 */
export interface TransactionReceipt {
    /**
     *  The target of the transaction. If null, the transaction was trying
     *  to deploy a transaction with the ``data`` as the initi=code.
     */
    to: null | string;

    /**
     *  The sender of the transaction.
     */
    from: string;

    /**
     *  If the transaction was directly deploying a contract, the [[to]]
     *  will be null, the ``data`` will be initcode and if successful, this
     *  will be the address of the contract deployed.
     */
    contractAddress: null | string;

    /**
     *  The transaction hash.
     */
    hash: string;

    /**
     *  The transaction index.
     */
    index: number;

    /**
     *  The block hash of the block that included this transaction.
     */
    blockHash: string;

    /**
     *  The block number of the block that included this transaction.
     */
    blockNumber: number;

    /**
     *  The bloom filter for the logs emitted during execution of this
     *  transaction.
     */
    logsBloom: string;

    /**
     *  The logs emitted during the execution of this transaction.
     */
    logs: Log[];

    /**
     *  The amount of gas consumed executing this transaciton.
     */
    gasUsed: bigint;

    /**
     *  The amount of BLOb gas used. See [[link-eip-4844]].
     */
    blobGasUsed?: null | bigint;

    /**
     *  The total amount of gas consumed during the entire block up to
     *  and including this transaction.
     */
    cumulativeGasUsed: bigint;

    /**
     *  The actual gas price per gas charged for this transaction.
     */
    gasPrice?: null | bigint;

    /**
     *  The actual BLOb gas price that was charged. See [[link-eip-4844]].
     */
    blobGasPrice?: null | bigint;

    /**
     *  The actual gas price per gas charged for this transaction.
     */
    effectiveGasPrice?: null | bigint;

    /**
     *  The [[link-eip-2718]] envelope type.
     */
    type: number;
    //byzantium: boolean;

    /**
     *  The status of the transaction execution. If ``1`` then the
     *  the transaction returned success, if ``0`` then the transaction
     *  was reverted. For pre-byzantium blocks, this is usually null, but
     *  some nodes may have backfilled this data.
     */
    status: null | number;

    /**
     *  The root of this transaction in a pre-bazatium block. In
     *  post-byzantium blocks this is null.
     */
    root: null | string;
}

/** JSON-RPC encoded response */
export type TransactionReceiptFromRpc = Omit<NumberBigintAsString<TransactionReceipt>, "logs"> & { logs: LogFromRpc[] };
