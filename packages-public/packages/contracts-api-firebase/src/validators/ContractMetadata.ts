import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import { addressZod } from "@owlprotocol/zod-sol";
import type { CollectionMetadata, ContractMetadata } from "../models/ContractMetadata.js";

export const contractMetadataZod = z
    .object({
        id: z.string().describe("id"),
        name: z.string().describe("name").optional(),
        description: z.string().describe("description").optional(),
        image: z.string().describe("image").optional(),
        external_url: z.string().describe("external url").optional(),
    })
    .describe("contract metadata");

export const collectionMetadataZod = contractMetadataZod.extend({
    seller_fee_basis_points: z.number().describe("Indicates a 1/10000 seller fee 100 = 1%. ").optional(),
    fee_recipient: addressZod.describe("fee recipient").optional(),
});

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//Check zod validator matches interface
type ContractMetadataZodInferred = Readonly<z.infer<typeof contractMetadataZod>>;
expectType<TypeEqual<ContractMetadata, ContractMetadataZodInferred>>(true);

//Check zod validator matches interface
type CollectionMetadataZodInferred = Readonly<z.infer<typeof collectionMetadataZod>>;
expectType<TypeEqual<CollectionMetadata, CollectionMetadataZodInferred>>(true);
