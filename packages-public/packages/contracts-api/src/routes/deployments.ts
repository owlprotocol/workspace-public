import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
    getCollectionDependentsMeta,
    getCollectionMeta,
    postCollectionMeta,
} from "../procedureMeta/deployments.js";
import { t } from "../trpc.js";
import {
    addressParameter,
    networkIdAndAddressObject,
    networkIdParameter,
} from "./common.js";
import { Collection } from "@owlprotocol/contracts-sdk";

export enum NFTContractType {
    ERC721 = "ERC721",
    ERC721AutoId = "ERC721AutoId",
    ERC1155 = "ERC1155",
}

const nftContractTypeZ = z
    .nativeEnum(NFTContractType)
    .describe("The type of contract");

export enum DNAType {
    NONE = "NONE",
    DNA = "DNA",
    DNA_6651 = "DNA_6651",
}

const dnaTypeZ = z.nativeEnum(DNAType);

const collectionParameters = z.object({
    admin: addressParameter.describe("The admin address of the collection"),
    contractType: nftContractTypeZ.optional(),
    name: z.string().describe("The name of the contract. Required for ERC721"),
    symbol: z.string().describe("The token symbol"),
    royaltyAmount: z
        .number()
        .describe("ERC2981 royalty amount as a percentage (%)")
        .optional(),
    royaltyAddress: addressParameter
        .describe("ERC2981 Royalty receiver")
        .optional(),
    dnaType: dnaTypeZ.optional(),
    baseUri: z
        .string()
        .describe("Base URI for metadata")
        .optional(),
    dnaSchema: z
        .object({})
        .catchall(z.any())
        .describe("DNA schema. Required if using the DNA standard")
        .optional(),
});

const collectionObject = z.object({
    address: z.string(),
    contractType: z.string().optional(),
});

const dependentContractsObject = z.array(
    z.object({
        contractType: z.string(),
        address: addressParameter,
    })
);

const getCollectionProcedure = t.procedure
    .meta(getCollectionMeta)
    .input(networkIdAndAddressObject)
    .output(collectionObject)
    .query(({ input }) => {
        // TODO: look for contract
        if (input.address == "0xCHANGEME") {
            throw new TRPCError({
                message: "Collection not found",
                code: "NOT_FOUND",
            });
        }

        return { address: input.address };
    });

const postCollectionProcedure = t.procedure
    .meta(postCollectionMeta)
    .input(collectionParameters.extend(networkIdParameter))
    .output(collectionObject)
    .mutation(({ input }) => {
        // TODO: deploy collection
        //
        // Collection.deployNFTCollection(null, input);

        return {
            address: "0x7777777777777777777777777777777777777777",
            contractType: input.contractType,
        };
    });

const getCollectionDependentsProcedure = t.procedure
    .meta(getCollectionDependentsMeta)
    // TODO: address validation
    .input(networkIdAndAddressObject)
    .output(dependentContractsObject)
    .query(({ input }) => {
        // TODO: look for contract
        if (input.address == "0xCHANGEME") {
            throw new TRPCError({
                message: "Collection not found",
                code: "NOT_FOUND",
            });
        }

        return [
            {
                contractType: "ERC721Minter",
                address: "0x7777777777777777777777777777777777777777",
            },
        ];
    });

export const collectionRouter = t.router({
    getCollection: getCollectionProcedure,
    postCollection: postCollectionProcedure,
    getCollectionDependents: getCollectionDependentsProcedure,
});