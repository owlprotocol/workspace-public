import { addressZod, uint256Zod } from "@owlprotocol/zod-sol";
import { expectType, TypeEqual } from "ts-expect";
import { z } from "zod";
import { collectionContractTypeZod, LazyMintInstance } from "../index.js";

export const lazyMintInstanceZod = z
    .object({
        id: z.string().describe("id"),
        /** Blockchain Data */
        networkId: z.string().describe("id of the network that the collection is deployed on"),
        address: addressZod.describe("address of the deployed collection"),
        /** User Data */
        owner: z.string().describe("owner's user id"),
        receiver: z.string().describe("receiver's user id"),
        receiverAddress: addressZod.describe("receiver address"),
        collectionId: z.string().describe("id of the collection"),

        // collectionContractType: collectionContractTypeZod,
        tokenId: z.string().describe("the tokenId to mint"),
        amount: uint256Zod.describe("amount to mint").optional(),
    })
    .passthrough()
    .describe("lazy mint instance");

// TODO: figure out enum issue
// type LazyMintInstanceZodInferred = z.infer<typeof lazyMintInstanceZod>;
// expectType<
//     TypeEqual<
//         Omit<LazyMintInstance, "collectionContractType">,
//         LazyMintInstanceZodInferred
//         // Omit<LazyMintInstanceZodInferred, "collectionContractType">
//     >
// >(true);
