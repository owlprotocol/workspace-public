import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import type { Store } from "../models/Store.js";

export const storeZod = z
    .object({
        id: z.string().describe("id"),
        owner: z.string().describe("owner"),
        storeName: z.string().describe("store name").optional(),
        storeDomain: z.string().describe("store domain").optional(),
    })
    .describe("store");

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//Check zod validator matches interface
type StoreZodInferred = Readonly<z.infer<typeof storeZod>>;
expectType<TypeEqual<Store, StoreZodInferred>>(true);
