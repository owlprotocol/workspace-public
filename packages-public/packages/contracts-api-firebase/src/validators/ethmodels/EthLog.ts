import { addressZod, bytes32Zod } from "@owlprotocol/zod-sol";
import { TypeEqual, expectType } from "ts-expect";
import { z } from "zod";
import { EthLog } from "../../models/ethmodels/EthLog.js";

export const ethLogZod = z
    .object({
        networkId: z.string().describe("networkId"),
        blockNumber: z.number().describe("blockNumber"),
        logIndex: z.number().describe("logIndex"),
        blockHash: bytes32Zod.describe("blockHash"),
        transactionIndex: z.number().describe("transactionIndex"),
        transactionHash: bytes32Zod.describe("transactionHash"),
        address: addressZod.describe("address"),
        data: z.string().describe("data"),
        topics: z.array(bytes32Zod).describe("topics"),
        topic0: bytes32Zod.describe("topic0").optional(),
        topic1: bytes32Zod.describe("topic1").optional(),
        topic2: bytes32Zod.describe("topic2").optional(),
        topic3: bytes32Zod.describe("topic3").optional(),
        eventName: z.string().describe("event name").optional(),
        eventFormat: z.string().describe("event format").optional(),
        dataDecoded: z.any(),
    })
    .describe("eth log");

type EthLogZodInferred = Readonly<z.infer<typeof ethLogZod>>;
expectType<TypeEqual<EthLog, EthLogZodInferred>>(true);
