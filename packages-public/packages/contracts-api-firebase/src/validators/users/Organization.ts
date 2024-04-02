import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import type { OrganizationReadOnly } from "../../models/users/Organization.js";

export const organizationReadOnlyZod = z
    .object({
        id: z.string().describe("id"),
        name: z.string().describe("name"),
        owner: z.string().describe("owner"),
        tier: z.enum(["personal", "growth", "enterprise"]).describe("tier"),
        seats: z.number().describe("seats"),
    })
    .describe("invite code");

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//Check zod validator matches interface
type OrganizationReadOnlyZodInferred = Readonly<z.infer<typeof organizationReadOnlyZod>>;
expectType<TypeEqual<OrganizationReadOnly, OrganizationReadOnlyZodInferred>>(true);
