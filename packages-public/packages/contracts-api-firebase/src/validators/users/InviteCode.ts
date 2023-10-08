import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import type { InviteCodeReadOnly } from "../../models/users/InviteCode.js";

export const inviteCodeReadOnlyZod = z
    .object({
        id: z.string().describe("id"),
        owner: z.string().describe("owner"),
        code: z.string().describe("code"),
        usageMax: z.number().describe("usage max"),
        usageRemaining: z.number().describe("usage remaining"),
        usageTotal: z.number().describe("usage total"),
    })
    .describe("invite code");

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//Check zod validator matches interface
type InviteCodeReadOnlyZodInferred = Readonly<z.infer<typeof inviteCodeReadOnlyZod>>;
expectType<TypeEqual<InviteCodeReadOnly, InviteCodeReadOnlyZodInferred>>(true);
