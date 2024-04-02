import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import type { MetadataContract } from "../models/MetadataContract.js";

export const metadataContractZod = z
    .object({
        id: z.string().describe("id"),
        projectId: z.string().describe("project id"),
        name: z.string().describe("name"),
        metadataJson: z.record(z.string(), z.any()),
        ipfsHash: z.string().describe("IPFS hash").optional(),
        type: z.enum(["ipfs", "firebase"]),
    })
    .describe("contract metadata");

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//Check zod validator matches interface
type MetadataContractZodInferred = z.infer<typeof metadataContractZod>;
expectType<TypeEqual<MetadataContract, MetadataContractZodInferred>>(true);
