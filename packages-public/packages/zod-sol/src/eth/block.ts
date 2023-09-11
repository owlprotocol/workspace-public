import { z } from "zod";
import { blockHashZod, blockNumberZod, gasLimitZod, gasUsedZod, timestampZod } from "./common.js";
import { bytes32Zod } from "../solidity/bytes.js";
import { addressZod } from "../solidity/address.js";

export const blockZod = z.object({
    hash: blockHashZod,
    parentHash: bytes32Zod.describe("block parent hash"),
    number: blockNumberZod,
    timestamp: timestampZod,
    nonce: z.string().describe("block nonce"),
    //TODO: Can it be big number?
    //difficulty: z.number("block difficulty")
    gasLimit: gasLimitZod,
    gasUsedZod: gasUsedZod,
    miner: addressZod.describe("minter"),
    extraData: z.string().describe("block extra data"),
});
