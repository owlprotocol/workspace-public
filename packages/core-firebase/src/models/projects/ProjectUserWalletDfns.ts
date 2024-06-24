import { z } from "zod";
import { addressZod } from "@owlprotocol/zod-sol";
import { TypeOf, expectType } from "ts-expect";
import { FirestoreSDK, FirebaseQueryResource, Query, FirebaseResource } from "@owlprotocol/crud-firebase";
import { Address } from "viem";
import { DfnsWalletStatus } from "./ProjectWalletDfns.js";
import { ProjectId } from "./Project.js";

export interface ProjectUserWalletDfnsId {
    readonly walletId: string;
}
export const projectUserWalletDfnsIdZod = z
    .union([z.string(), z.object({ walletId: z.string() })])
    .transform((arg) => (typeof arg === "string" ? arg : arg.walletId));
export const encodeProjectUserWalletDfnsId: (id: string | ProjectUserWalletDfnsId) => string =
    projectUserWalletDfnsIdZod.parse;
export const decodeProjectUserWalletDfnsId: (id: string) => ProjectUserWalletDfnsId = (id) => {
    return { walletId: id };
};

export interface ProjectUserWalletDfnsData {
    readonly userId: string;
    readonly address: Address;
    readonly status: DfnsWalletStatus;
}
export const projectUserWalletDfnsDataZod = z
    .object({
        userId: z.string().describe("userId"),
        status: z.nativeEnum(DfnsWalletStatus),
        address: addressZod.describe("address"),
    })
    .describe("dfns wallet");
export const encodeProjectUserWalletDfnsData: (data: ProjectUserWalletDfnsData) => ProjectUserWalletDfnsData =
    projectUserWalletDfnsDataZod.parse;
export const encodeProjectUserWalletDfnsDataPartial: (
    data: Partial<ProjectUserWalletDfnsData>,
) => Partial<ProjectUserWalletDfnsData> = projectUserWalletDfnsDataZod.partial().parse;

export type ProjectUserWalletDfns = ProjectUserWalletDfnsId & ProjectUserWalletDfnsData;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type ProjectUserWalletDfnsResource = FirebaseResource<
    FirestoreSDK,
    ProjectUserWalletDfnsData,
    ProjectUserWalletDfnsId
>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type ProjectUserWalletDfnsQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ProjectUserWalletDfnsData,
    ProjectUserWalletDfnsId
>;
export type ProjectUserWalletDfnsGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ProjectUserWalletDfnsData,
    ProjectUserWalletDfnsId,
    ProjectId,
    ProjectUserWalletDfnsData,
    ProjectUserWalletDfnsData,
    Query<FirestoreSDK, ProjectUserWalletDfnsData>
>;

//Check zod validator matches interface
expectType<TypeOf<ProjectUserWalletDfnsData, z.input<typeof projectUserWalletDfnsDataZod>>>(true);
expectType<TypeOf<ProjectUserWalletDfnsData, z.output<typeof projectUserWalletDfnsDataZod>>>(true);
