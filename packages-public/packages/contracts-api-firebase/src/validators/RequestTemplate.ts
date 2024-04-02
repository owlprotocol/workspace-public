import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import { onlineTraitZod } from "./OnlineTrait.js";
import type { RequestTemplate } from "../models/RequestTemplate.js";

export const requestTemplateZod = z
    .object({
        id: z.string().describe("id"),
        owner: z.string().describe("owner"),
        onlineTraits: z.array(onlineTraitZod),
    })
    .describe("oracle request template");

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//Check zod validator matches interface
type RequestTemplateZodInferred = Readonly<z.infer<typeof requestTemplateZod>>;
expectType<TypeEqual<RequestTemplate, RequestTemplateZodInferred>>(true);
