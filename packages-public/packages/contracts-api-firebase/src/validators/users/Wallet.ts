import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import { addressZod } from "@owlprotocol/zod-sol";
import { DfnsWalletStatus, type DfnsWalletReadOnly, type SafeWalletReadOnly } from "../../models/users/Wallet.js";

export const dfnsWalletReadOnlyZod = z
    .object({
        id: z.string().describe("id"),
        owner: z.string().describe("owner"),
        status: z.nativeEnum(DfnsWalletStatus),
        address: addressZod.describe("address").optional(),
        walletId: z.string().describe("wallet id"),
        externalId: z.string().describe("external id"),
    })
    .describe("dfns wallet");

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//Check zod validator matches interface
type DfnsWalletReadOnlyZodInferred = Readonly<z.infer<typeof dfnsWalletReadOnlyZod>>;
//@ts-expect-error
expectType<TypeEqual<DfnsWalletReadOnly, DfnsWalletReadOnlyZodInferred>>(true);

export const safeWalletReadOnlyZod = z
    .object({
        id: z.string().describe("id"),
        networkId: z.string().describe("networkId"),
        address: addressZod.describe("address"),
        owner: z.string().describe("owner"),
    })
    .describe("safe wallet");

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//Check zod validator matches interface
type SafeWalletReadOnlyZodInferred = Readonly<z.infer<typeof safeWalletReadOnlyZod>>;
expectType<TypeEqual<SafeWalletReadOnly, SafeWalletReadOnlyZodInferred>>(true);
