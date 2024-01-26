import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import type { StorePrivate } from "../../models/shopify/StorePrivate.js";

export const storePrivateZod = z
    .object({
        id: z.string().describe("id"),
        projectId: z.string().describe("project id"),
        shopifyTokenId: z.string().describe("shopify token id").optional(),
        shopifyToken: z.string().describe("shopify offline token").optional(),
        shopifyTokenState: z.string().describe("shopify token state").optional(),
        shopifyTokenScope: z.string().describe("shopify token scope").optional(),
        shopifyDomain: z.string().describe("shopify domain").optional(),
    })
    .describe("storePrivate");

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//Check zod validator matches interface
type StorePrivateZodInferred = Readonly<z.infer<typeof storePrivateZod>>;
expectType<TypeEqual<StorePrivate, StorePrivateZodInferred>>(true);
