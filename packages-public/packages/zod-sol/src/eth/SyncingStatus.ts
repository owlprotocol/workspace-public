import { z } from "zod";
import { TypeOf, expectType } from "ts-expect";
import { numberLikeToHexStringZod, numberLikeToNumberZod } from "./math.js";
import { NumberBigintAsString } from "../utils/NumberBigintAsString.js";

export type SyncingStatus =
    | {
          startingBlock?: number;
          currentBlock?: number;
          highestBlock?: number;
      }
    | boolean;
export const syncingStatusZod = z
    .union([
        z.object({
            startingBlock: numberLikeToNumberZod
                .optional()
                .describe("Block at which the import started (will only be reset, after the sync reached his head)"),
            currentBlock: numberLikeToNumberZod.optional().describe("The current block, same as eth_blockNumber"),
            highestBlock: numberLikeToNumberZod.optional().describe("The estimated highest block"),
        }),
        z.boolean(),
    ])
    .describe("An object with sync status data");
expectType<TypeOf<SyncingStatus, z.output<typeof syncingStatusZod>>>(true);

export type SyncingStatusFromRpc = NumberBigintAsString<SyncingStatus>;
export const syncingStatusFromRpcZod = z
    .union([
        z.object({
            startingBlock: numberLikeToHexStringZod
                .optional()
                .describe("Block at which the import started (will only be reset, after the sync reached his head)"),
            currentBlock: numberLikeToHexStringZod.optional().describe("The current block, same as eth_blockNumber"),
            highestBlock: numberLikeToHexStringZod.optional().describe("The estimated highest block"),
        }),
        z.boolean(),
    ])
    .describe("An object with sync status data");
expectType<TypeOf<SyncingStatusFromRpc, z.output<typeof syncingStatusFromRpcZod>>>(true);
