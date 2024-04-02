import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import { addressZod } from "@owlprotocol/zod-sol";
import { DfnsWalletStatus, type DfnsWalletReadOnly } from "../../models/users/Wallet.js";
import { ProjectSafeWalletReadOnly } from "../../index.js";

export const projectDfnsWalletReadOnlyZod = z
    .object({
        id: z.string().describe("id"),
        projectId: z.string().describe("project id"),
        status: z.nativeEnum(DfnsWalletStatus),
        address: addressZod.describe("address").optional(),
        walletId: z.string().describe("wallet id"),
        externalId: z.string().describe("external id"),
    })
    .describe("project dfns wallet");

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//Check zod validator matches interface
type ProjectDfnsWalletReadOnlyZodInferred = Readonly<z.infer<typeof projectDfnsWalletReadOnlyZod>>;
//@ts-expect-error
expectType<TypeEqual<DfnsWalletReadOnly, ProjectDfnsWalletReadOnlyZodInferred>>(true);

export const projectSafeWalletReadOnlyZod = z
    .object({
        networkId: z.string().describe("networkId"),
        address: addressZod.describe("address"),
        projectId: z.string().describe("project id"),
    })
    .describe("project safe wallet");

type ProjectSafeWalletReadOnlyZodInferred = Readonly<z.infer<typeof projectSafeWalletReadOnlyZod>>;
expectType<TypeEqual<ProjectSafeWalletReadOnly, ProjectSafeWalletReadOnlyZodInferred>>(true);
