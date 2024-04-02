import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import type { OnlineTrait } from "../models/OnlineTrait.js";

export const onlineTraitZod = z
    .object({
        trait: z.string().describe("trait"),
        url: z.string().describe("url"),
        jsonPath: z.string().describe("jsonPath"),
    })
    .describe("dna trait");

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//Check zod validator matches interface
type OnlineTraitZodInferred = z.infer<typeof onlineTraitZod>;
expectType<TypeEqual<OnlineTrait, OnlineTraitZodInferred>>(true);
