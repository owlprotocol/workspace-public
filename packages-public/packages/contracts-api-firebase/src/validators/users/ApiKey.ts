import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import type { ApiKeyPersonal } from "../../models/users/ApiKey.js";

export const apiKeyPersonalZod = z
    .object({
        id: z.string().describe("id"),
        owner: z.string().describe("owner"),
        apiKey: z.string().describe("api key"),
        expiry: z.number().describe("expiry").optional(),
    })
    .describe("api key");

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//Check zod validator matches interface
type ApiKeyPersonalZodInferred = Readonly<z.infer<typeof apiKeyPersonalZod>>;
expectType<TypeEqual<ApiKeyPersonal, ApiKeyPersonalZodInferred>>(true);
