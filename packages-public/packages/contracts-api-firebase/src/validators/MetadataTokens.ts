import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import type { MetadataTokens } from "../models/MetadataTokens.js";

export const metadataTokensZod = z
    .object({
        id: z.string().describe("id"),
        owner: z.string().describe("owner"),
        name: z.string().describe("name"),
        tokenMap: z.record(z.string(), z.record(z.string(), z.any())),
        ipfsHash: z.string().describe("IPFS hash").optional(),
        type: z.enum(["ipfs", "firebase"]),
    })
    .describe("tokens metadata");

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//Check zod validator matches interface
type MetadataTokensZodInferred = z.infer<typeof metadataTokensZod>;
expectType<TypeEqual<MetadataTokens, MetadataTokensZodInferred>>(true);
