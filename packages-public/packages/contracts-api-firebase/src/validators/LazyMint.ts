import { addressZod, uint256Zod } from "@owlprotocol/zod-sol";
import { expectType, TypeEqual } from "ts-expect";
import { z } from "zod";
import { collectionContractTypeZod, LazyMint } from "../index.js";

export const lazyMintZod = z
    .object({
        id: z.string().describe("id"),
        /** Blockchain Data */
        networkId: z.string().describe("id of the network that the collection is deployed on"),
        address: addressZod.describe("address of the deployed collection"),
        /** User Data */
        owner: z.string().describe("owner's user id"),

        collectionContractType: collectionContractTypeZod,
        tokenId: z.string().describe("the tokenId to mint").optional(),
        amount: uint256Zod.describe("amount to mint").optional(),
        maxRedeemable: z.number().positive().describe("the maximum number of time this lazy mint can be redeemed"),
        totalRedeemed: z.number().positive().describe("the number of redemptions so far").default(0),
    })
    .describe("lazy mint");

type LazyMintZodInferred = z.infer<typeof lazyMintZod>;
expectType<TypeEqual<Omit<LazyMint, "collectionContractType">, Omit<LazyMintZodInferred, "collectionContractType">>>(
    true,
);
