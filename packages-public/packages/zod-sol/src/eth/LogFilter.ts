import { z } from "zod";
import { TypeOf, expectType } from "ts-expect";
import { numberLikeToHexZod, numberLikeZod } from "./math.js";
import { NumberBigintAsHex } from "../utils/NumberBigintAsString.js";
import { addressZod } from "../solidity/address.js";
import { bytes32Zod } from "../solidity/bytes.js";

export interface LogFilter {
    fromBlock?: number;
    toBlock?: number;
    address?: string | string[] | null;
    topics?: string | string[] | null;
}
export const logFilterZod = z
    .object({
        fromBlock: numberLikeZod.optional().describe("The block number to start filtering from"),
        toBlock: numberLikeZod.optional().describe("The block number to end filtering at"),
        address: z
            .union([addressZod, z.array(addressZod)])
            .optional()
            .nullable()
            .describe("The log emitting address(es) to filter"),
        topics: z
            .union([bytes32Zod, z.array(bytes32Zod)])
            .optional()
            .nullable()
            .describe("The log topic(s) to filter"),
    })
    .describe("An object with log filter data");
expectType<TypeOf<LogFilter, z.output<typeof logFilterZod>>>(true);

export type LogFilterFromRpc = NumberBigintAsHex<LogFilter>;
export const logFilterFromRpcZod = logFilterZod.extend({
    fromBlock: numberLikeToHexZod.optional().describe("The block number to start filtering from"),
    toBlock: numberLikeToHexZod.optional().describe("The block number to end filtering at"),
});
expectType<TypeOf<LogFilterFromRpc, z.output<typeof logFilterFromRpcZod>>>(true);
