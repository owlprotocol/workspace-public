import { addressZod, uint256Zod } from "@owlprotocol/zod-sol";
import { TypeEqual, expectType } from "ts-expect";
import { z } from "zod";
import { MintInstance } from "../models/index.js";

export const mintInstanceZod = z
    .object({
        id: z.string().describe("id"),
        /** Blockchain Data */
        networkId: z.string().describe("id of the network that the collection is deployed on"),
        address: addressZod.describe("address of the deployed collection"),
        /** User Data */
        lazyMintId: z.string().describe("id of the lazy mint").optional(),
        projectId: z.string().describe("owner's user id"),
        receiver: z.string().describe("receiver's user id"),
        receiverAddress: addressZod.describe("receiver address"),
        tokenId: z.string().describe("the tokenId to mint"),
        amount: uint256Zod.describe("amount to mint").optional(),
    })
    .describe("mint instance");

type MintInstanceZodInferred = z.infer<typeof mintInstanceZod>;
expectType<TypeEqual<MintInstance, MintInstanceZodInferred>>(true);
