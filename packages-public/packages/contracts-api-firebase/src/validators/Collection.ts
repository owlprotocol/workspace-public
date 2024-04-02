import { addressZod } from "@owlprotocol/zod-sol";
import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import {
    Collection,
    CollectionContractType,
    TokenDNAContractType,
    TokenMetadataType,
    TokenRoyaltyContractType,
    TokenURIContractType,
} from "../models/Collection.js";

export const collectionContractTypeZod = z.nativeEnum(CollectionContractType);
export const collectionMetadataTypeZod = z.nativeEnum(TokenMetadataType);
export const collectionUriContractTypeZod = z.nativeEnum(TokenURIContractType);
export const collectionRoyaltyContractTypeZod = z.nativeEnum(TokenRoyaltyContractType);
export const collectionDnaContractTypeZod = z.nativeEnum(TokenDNAContractType);

export const collectionZod = z
    .object({
        /** Blockchain Data */
        networkId: z.string().describe("id of the network that the collection is deployed on"),
        address: addressZod.describe("address of the deployed collection"),
        contractTx: z.string().describe("contract deploy transaction").optional(),
        /** User Data */
        owner: z.string().describe("owner's user id").optional(),
        collectionName: z.string().describe("name of the collection deployed"),
        projectId: z.string().describe("projectId"),
        createdAt: z.number().int().positive().describe("timestamp of collection creation"),
        collectionContractType: collectionContractTypeZod,
        collectionMetadataType: collectionMetadataTypeZod,
        uriType: collectionUriContractTypeZod.optional(),
        royaltyType: collectionRoyaltyContractTypeZod.optional(),
        dnaType: collectionDnaContractTypeZod.optional(),
        uriAddress: addressZod.describe("URI contract address").optional(),
        royaltyAddress: addressZod.describe("royalty contract address").optional(),
        dnaAddress: addressZod.describe("DNA contract address").optional(),
    })
    .describe("collection");

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//TODO: Typecheck fails on deployParams
//Check zod validator matches interface
type CollectionZodInferred = Readonly<z.infer<typeof collectionZod>>;
// TODO: investigate why these two attributes need to be omitted
expectType<
    TypeEqual<
        Omit<Collection, "collectionContractType" | "collectionMetadataType">,
        Omit<CollectionZodInferred, "collectionContractType" | "collectionMetadataType">
    >
>(true);
