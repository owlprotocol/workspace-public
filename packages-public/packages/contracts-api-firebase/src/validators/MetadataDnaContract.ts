import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import type { MetadataDnaContract } from "../models/MetadataDnaContract.js";

export const metadataDnaContractZod = z
    .object({
        id: z.string().describe("id"),
        owner: z.string().describe("owner"),
        name: z.string().describe("name"),
        metadataJson: z
            .object({
                traits: z.array(z.record(z.string(), z.any())).describe("traits"),
                children: z.record(z.string(), z.any()).describe("children").optional(),
                generatedImageType: z.enum(["png", "svg"]).describe("generated image type").optional(),
                name: z.string().describe("name"),
            })
            .passthrough(),
        ipfsHash: z.string().describe("IPFS hash").optional(),
        type: z.enum(["ipfs", "firebase"]),
    })
    .describe("dna contract metadata");

//Check zod validator matches interface
type MetadataDnaContractZodInferred = z.infer<typeof metadataDnaContractZod>;
expectType<TypeEqual<Omit<MetadataDnaContract, "metadataJson">, Omit<MetadataDnaContractZodInferred, "metadataJson">>>(
    true,
);

type MetadataJsonInferred = MetadataDnaContractZodInferred["metadataJson"];
type MetadataJson = MetadataDnaContract["metadataJson"];

// TODO: rework traits validation
// expectType<TypeEqual<MetadataJson["traits"], MetadataJsonInferred["traits"]>>(true);
expectType<TypeEqual<MetadataJson["children"], MetadataJsonInferred["children"]>>(true);
expectType<TypeEqual<MetadataJson["generatedImageType"], MetadataJsonInferred["generatedImageType"]>>(true);
expectType<TypeEqual<MetadataJson["name"], MetadataJsonInferred["name"]>>(true);
