import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import type { User } from "../models/User.js";

export const userZod = z
    .object({
        id: z.string().describe("id"),
        email: z.string().describe("email"),
        type: z.enum(["dev", "user"]).describe("user type").optional(),
        apiKey: z.string().describe("apiKey").optional(),
        dfnsAddress: z.string().describe("dfnsAddress").optional(),
        dfnsId: z.string().describe("dfnsId").optional(),
        gnosisAddress: z.record(z.string().describe("networkId"), z.string().describe("address")),
        topupTotals: z.record(
            z.string().describe("networkId"),
            z.record(z.string().describe("nativeOrERC20Address"), z.string().describe("value")),
        ),
        topupMax: z.record(
            z.string().describe("networkId"),
            z.record(z.string().describe("nativeOrERC20Address"), z.string().describe("value")),
        ),
    })
    .describe("user");

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//Check zod validator matches interface
type UserZodInferred = Readonly<z.infer<typeof userZod>>;
expectType<TypeEqual<User, UserZodInferred>>(true);
