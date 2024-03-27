/**
 *  About provider formatting?
 *
 *  @_section: api/providers/formatting:Formatting  [provider-formatting]
 */

import { z } from "zod";
import { TypeOf, expectType } from "ts-expect";
import { numberLikeToHexZod, numberLikeZod } from "./math.js";
import { NumberBigintAsHex } from "../utils/NumberBigintAsString.js";
import { bytes32Zod, bytesZod } from "../solidity/bytes.js";
import { addressZod } from "../solidity/address.js";

//////////////////////
// Log

export const logZod = z
    .object({
        transactionHash: bytes32Zod.describe("The transaction hash for the transaction the log occurred in."),
        blockHash: bytes32Zod.describe("The block hash of the block that included the transaction for this log."),
        blockNumber: numberLikeZod.describe(
            "The block number of the block that included the transaction for this log.",
        ),
        removed: z
            .boolean()
            .default(false)
            .describe(
                "Whether this log was removed due to the transaction it was included in being removed during to an orphaned block.",
            ),
        address: addressZod.describe("The address of the contract that emitted this log."),
        data: bytesZod.describe("The data emitted with this log."),
        topics: z.array(bytes32Zod.describe("topic")).describe("The topics emitted with this log."),
        index: numberLikeZod.describe("The index of this log."),
        transactionIndex: numberLikeZod.describe("The transaction index of this log."),
    })
    .describe("a **Log** encodes the minimal required properties for a formatted log.")
    .passthrough();
expectType<TypeOf<Log, z.output<typeof logZod>>>(true);

export const logFromRpcZod = logZod.extend({
    blockNumber: numberLikeToHexZod.describe(
        "The block number of the block that included the transaction for this log.",
    ),
    index: numberLikeToHexZod.describe("The index of this log."),
    transactionIndex: numberLikeToHexZod.describe("The transaction index of this log."),
});
expectType<TypeOf<LogFromRpc, z.output<typeof logFromRpcZod>>>(true);

/**
 *  a **Log** encodes the minimal required properties for a
 *  formatted log.
 */
export interface Log {
    /**
     *  The transaction hash for the transaction the log occurred in.
     */
    transactionHash: string;

    /**
     *  The block hash of the block that included the transaction for this
     *  log.
     */
    blockHash: string;

    /**
     *  The block number of the block that included the transaction for this
     *  log.
     */
    blockNumber: number;

    /**
     *  Whether this log was removed due to the transaction it was included
     *  in being removed during to an orphaned block.
     */
    removed: boolean;

    /**
     *  The address of the contract that emitted this log.
     */
    address: string;

    /**
     *  The data emitted with this log.
     */
    data: string;

    /**
     *  The topics emitted with this log.
     */
    topics: string[];

    /**
     *  The index of this log.
     */
    index: number;

    /**
     *  The transaction index of this log.
     */
    transactionIndex: number;
}

/** JSON-Rpc encoded response */
export type LogFromRpc = NumberBigintAsHex<Log>;
