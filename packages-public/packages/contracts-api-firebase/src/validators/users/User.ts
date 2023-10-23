import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import type { User } from "../../models/users/User.js";

const userZodInternal = z
    .object({
        id: z.string().describe("id"),
        email: z.string().describe("email"),
        type: z.enum(["dev", "user"]).describe("user type").optional(),
        topupTotals: z.record(
            z.string().describe("networkId"),
            z.record(z.string().describe("nativeOrERC20Address"), z.string().describe("value")),
        ),
        topupMax: z.record(
            z.string().describe("networkId"),
            z.record(z.string().describe("nativeOrERC20Address"), z.string().describe("value")),
        ),
        defaultProjectId: z.string().describe("defaultProjectId"),
    })
    .describe("user");

export const userZod = userZodInternal as Omit<typeof userZodInternal, "_output"> & { _output: User };

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//Check zod validator matches interface
type UserZodInferred = z.infer<typeof userZod>;
expectType<TypeEqual<User, UserZodInferred>>(true);
