import { z } from "zod";
import {
    txHashZod,
    blockNumberZod,
    blockHashZod,
    timestampZod,
    confirmationsZod,
    fromZod,
    toZod,
    txIndexZod,
    gasUsedZod,
    cumulativeGasUsedZod,
    effectiveGasPriceZod,
} from "./common.js";
import { logZod } from "./log.js";
import { addressZod } from "../solidity/address.js";

//Raw tx
export const txRawZod = z.string().describe("raw transaction");
//State data
export const txLogsBloomZod = z.string().describe("transaction logs bloom filter");
//Tx Type
export const txTypeZod = z.number().describe("transaction type");

export const txResponseZod = z.object({
    hash: txHashZod,
    blockNumber: blockNumberZod.optional(),
    blockHash: blockHashZod.optional(),
    timestamp: timestampZod.optional(),
    confirmations: confirmationsZod.optional(),
    from: fromZod.optional(),
    raw: txRawZod.optional(),
});

export const txReceiptZod = z.object({
    to: toZod,
    from: fromZod,
    contractAddress: addressZod.optional(),
    transactionIndex: txIndexZod,
    root: z.string().describe("transaction root").optional(),
    gasUsed: gasUsedZod,
    logsBloom: txLogsBloomZod,
    blockHash: blockHashZod,
    transactionHash: txHashZod,
    logs: z.array(logZod).describe("receipt logs"),
    blockNumber: blockNumberZod,
    confirmations: confirmationsZod,
    cumulativeGasUsed: cumulativeGasUsedZod,
    effectiveGasPrice: effectiveGasPriceZod,
    type: txTypeZod,
});
