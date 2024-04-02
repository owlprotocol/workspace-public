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
        isProjectWallet: z.boolean().describe("does wallet belong to a project"),
        projectId: z.string().describe("project id, if wallet belongs to a project").optional(),
    })
    .describe("dfns wallet");

type DfnsWalletReadOnlyZodInferred = Readonly<z.infer<typeof dfnsWalletReadOnlyZod>>;
expectType<TypeEqual<Omit<DfnsWalletReadOnly, "status">, Omit<DfnsWalletReadOnlyZodInferred, "status">>>(true);

export const safeWalletReadOnlyZod = z
    .object({
        networkId: z.string().describe("networkId"),
        address: addressZod.describe("address"),
        owner: z.string().describe("owner"),
        isProjectWallet: z.boolean().describe("does wallet belong to a project"),
        projectId: z.string().describe("project id, if wallet belongs to a project").optional(),
    })
    .describe("safe wallet");

type SafeWalletReadOnlyZodInferred = Readonly<z.infer<typeof safeWalletReadOnlyZod>>;
expectType<TypeEqual<SafeWalletReadOnly, SafeWalletReadOnlyZodInferred>>(true);
