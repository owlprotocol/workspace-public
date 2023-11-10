import { bytes32Zod } from "@owlprotocol/zod-sol";
import { TypeEqual, expectType } from "ts-expect";
import { z } from "zod";
import { EthLogAbi } from "../../models/ethmodels/EthLogAbi.js";

export const ethLogAbiZod = z
    .object({
        eventSighash: bytes32Zod.describe("event signature"),
        eventName: z.string().describe("event name"),
        eventFormat: z.string().describe("event format"),
        indexedFieldsCount: z.number(),
    })
    .describe("eth log abi");

type EthLogAbiZodInferred = Readonly<z.infer<typeof ethLogAbiZod>>;
expectType<TypeEqual<EthLogAbi, EthLogAbiZodInferred>>(true);
