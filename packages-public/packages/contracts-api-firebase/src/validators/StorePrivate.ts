import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import type { StorePrivate } from "../models/StorePrivate.js";

export const storePrivateZod = z
    .object({
        id: z.string().describe("id"),
        owner: z.string().describe("owner"),
        shopifyToken: z.string().describe("shopify token").optional(),
        shopifyDomain: z.string().describe("shopify domain").optional(),
    })
    .describe("storePrivate");

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//Check zod validator matches interface
type StorePrivateZodInferred = Readonly<z.infer<typeof storePrivateZod>>;
expectType<TypeEqual<StorePrivate, StorePrivateZodInferred>>(true);
