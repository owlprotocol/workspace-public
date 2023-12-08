import { addressZod } from "@owlprotocol/zod-sol";
import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import {
    collectionDnaContractTypeZod,
    collectionMetadataTypeZod,
    collectionRoyaltyContractTypeZod,
    collectionUriContractTypeZod,
} from "./Collection.js";
import { LoyaltyProgram } from "../models/LoyaltyProgram.js";

export const loyaltyTierZod = z.object({
    metadata: z.record(z.string(), z.any()).describe("metadata of the tier"),
    pointsThreshold: z.number().describe("points threshold to obtain tier"),
});

export const loyaltyProgramZod = z
    .object({
        /** Blockchain Data */
        networkId: z.string().describe("id of the network that the loyalty program is deployed on"),
        address: addressZod.describe("address of the deployed loyalty program"),
        contractTx: z.string().describe("contract deploy transaction").optional(),
        /** User Data */
        owner: z.string().describe("owner's user id"),
        name: z.string().describe("name of the loyalty program deployed"),
        projectId: z.string().describe("projectId").optional(),
        createdAt: z.number().int().positive().describe("timestamp of loyalty program creation"),
        metadataType: collectionMetadataTypeZod,
        uriType: collectionUriContractTypeZod.optional(),
        royaltyType: collectionRoyaltyContractTypeZod.optional(),
        dnaType: collectionDnaContractTypeZod.optional(),
        uriAddress: addressZod.describe("URI contract address").optional(),
        royaltyAddress: addressZod.describe("royalty contract address").optional(),
        dnaAddress: addressZod.describe("DNA contract address").optional(),
        tiers: z.record(z.string(), loyaltyTierZod).default({}),
    })
    .describe("loyalty program");

type LoyaltyProgramZodInferred = Readonly<z.infer<typeof loyaltyProgramZod>>;
expectType<
    TypeEqual<Omit<LoyaltyProgram, "metadataType" | "tiers">, Omit<LoyaltyProgramZodInferred, "metadataType" | "tiers">>
>(true);
