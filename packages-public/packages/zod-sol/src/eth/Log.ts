import { z } from "zod";
import { Log as LogViem } from "viem";
import { PartialBy, Prettify } from "viem/types/utils";
import { indexDecodeZod, indexEncodeZod, quantityDecodeZod, quantityEncodeZod } from "./math.js";
import { bytes32Zod, bytesZod } from "../solidity/bytes.js";
import { addressZod } from "../solidity/address.js";

/***** Log *****/
/** logIndex ALWAYS number because it is part of id */

//TODO: Support typed args/eventName
//TODO: Encode/Decode bigint for decoded data
export type LogDecodedData = {
    eventName?: string;
    args?: any[] | Record<string, any>;
};

/**
 * Transaction receipt with mixed types
 * Matches both encoded RPC & decoded TS types.
 */
export type LogInput = Prettify<
    PartialBy<LogViem<`0x${string}` | number | bigint, `0x${string}` | number, false>, "removed"> & {
        logIndex: number;
    } & LogDecodedData
>;

/**
 * Transaction receipt with encoded types
 * Bigint converted to Hex to support Firebase.
 */
export type LogEncoded = Prettify<
    Omit<LogViem<`0x${string}`, `0x${string}`, false>, "logIndex"> & {
        logIndex: number;
    } & LogDecodedData
>;

/**
 * Transaction receipt with decoded types
 * Bigint decoded from Hex stored on Firebase.
 */
export type LogDecoded = Prettify<LogViem<bigint, number, false> & LogDecodedData>;

/**
 * Zod validator encoding LogInput => LogEncoded
 */
export const logEncodeZod = z
    .object({
        /** Log Base */
        transactionHash: bytes32Zod.describe("Hash of the transaction that created this log or `null` if pending"),
        logIndex: indexDecodeZod.describe("Index of this log within its block or `null` if pending"),
        blockNumber: quantityEncodeZod.describe("Number of block containing this log or `null` if pending"),
        blockHash: bytes32Zod.describe("Hash of block containing this log or `null` if pending"),
        transactionIndex: indexEncodeZod.describe("Index of this transaction in the block or `null` if pending"),
        address: addressZod.describe("The address from which this log originated"),
        removed: z
            .boolean()
            .default(false)
            .describe(
                "Whether this log was removed due to the transaction it was included in being removed during to an orphaned block.",
            ),
        /** Log Data */
        topics: z.array(bytes32Zod.describe("topic")).describe("List of order-dependent topics"),
        data: bytesZod.describe("The data emitted with this log."),
        eventName: z.string().optional().describe("decoded log name"),
        //TODO: Recursive encode bigint as hex
        args: z.record(z.string(), z.any()).optional().describe("decoded log data"),
    })
    .describe("An EVM log, Quantity/Index hex/number");

/**
 * Zod validator encoding LogEncoded => LogDecoded
 */
export const logDecodeZod = z
    .object({
        /** Log Base */
        transactionHash: bytes32Zod.describe("Hash of the transaction that created this log or `null` if pending"),
        logIndex: indexDecodeZod.describe("Index of this log within its block or `null` if pending"),
        blockNumber: quantityDecodeZod.describe("Number of block containing this log or `null` if pending"),
        blockHash: bytes32Zod.describe("Hash of block containing this log or `null` if pending"),
        transactionIndex: indexDecodeZod.describe("Index of this transaction in the block or `null` if pending"),
        address: addressZod.describe("The address from which this log originated"),
        removed: z
            .boolean()
            .default(false)
            .describe(
                "Whether this log was removed due to the transaction it was included in being removed during to an orphaned block.",
            ),
        /** Log Data */
        topics: z.array(bytes32Zod.describe("topic")).describe("List of order-dependent topics"),
        data: bytesZod.describe("The data emitted with this log."),
        eventName: z.string().optional().describe("decoded log name"),
        //TODO: Recursive decode hex as bigint
        args: z.record(z.string(), z.any()).optional().describe("decoded log data"),
    })
    .describe("An EVM log, Quantity/Index bigint/number");
