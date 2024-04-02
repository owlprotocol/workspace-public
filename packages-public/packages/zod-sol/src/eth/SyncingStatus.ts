import { z } from "zod";
import { TypeOf, expectType } from "ts-expect";
import { numberLikeToHexZod, numberLikeZod } from "./math.js";
import { NumberBigintAsHex } from "../utils/NumberBigintAsString.js";

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
            startingBlock: numberLikeZod
                .optional()
                .describe("Block at which the import started (will only be reset, after the sync reached his head)"),
            currentBlock: numberLikeZod.optional().describe("The current block, same as eth_blockNumber"),
            highestBlock: numberLikeZod.optional().describe("The estimated highest block"),
        }),
        z.boolean(),
    ])
    .describe("An object with sync status data");
expectType<TypeOf<SyncingStatus, z.output<typeof syncingStatusZod>>>(true);

export type SyncingStatusFromRpc = NumberBigintAsHex<SyncingStatus>;
export const syncingStatusFromRpcZod = z
    .union([
        z.object({
            startingBlock: numberLikeToHexZod
                .optional()
                .describe("Block at which the import started (will only be reset, after the sync reached his head)"),
            currentBlock: numberLikeToHexZod.optional().describe("The current block, same as eth_blockNumber"),
            highestBlock: numberLikeToHexZod.optional().describe("The estimated highest block"),
        }),
        z.boolean(),
    ])
    .describe("An object with sync status data");
expectType<TypeOf<SyncingStatusFromRpc, z.output<typeof syncingStatusFromRpcZod>>>(true);
