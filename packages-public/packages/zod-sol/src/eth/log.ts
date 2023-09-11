import { z } from "zod";
import { blockHashZod, blockNumberZod, txHashZod, txIndexZod } from "./common.js";
import { bytes32Zod } from "../solidity/bytes.js";
import { addressZod } from "../solidity/address.js";

export const logZod = z.object({
    blockNumber: blockNumberZod,
    blockHash: blockHashZod,
    transactionIndex: txIndexZod,
    address: addressZod,
    data: z.string().describe("log data"),
    topics: z.array(bytes32Zod.describe("topic")).describe("log topics"),
    transactionHash: txHashZod,
    logIndex: z.number().describe("log index"),
});
