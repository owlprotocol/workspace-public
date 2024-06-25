import { z } from "zod";
import { addressZod } from "@owlprotocol/zod-sol";
import { TypeOf, expectType } from "ts-expect";
import { FirestoreSDK, FirebaseQueryResource, Query, FirebaseResource } from "@owlprotocol/crud-firebase";
import { Address } from "viem";
import { ProjectId } from "./Project.js";

export enum DfnsWalletStatus {
    Active = "Active",
    Creating = "Creating",
    Failed = "Failed",
}

export interface ProjectWalletDfnsId {
    readonly walletId: string;
}
export const projectWalletDfnsIdZod = z
    .union([z.string(), z.object({ walletId: z.string() })])
    .transform((arg) => (typeof arg === "string" ? arg : arg.walletId));
export const encodeProjectWalletDfnsId: (id: string | ProjectWalletDfnsId) => string = projectWalletDfnsIdZod.parse;
export const decodeProjectWalletDfnsId: (id: string) => ProjectWalletDfnsId = (id) => {
    return { walletId: id };
};

export interface ProjectWalletDfnsData {
    readonly address: Address;
    readonly status: DfnsWalletStatus;
}
export const projectWalletDfnsDataZod = z
    .object({
        status: z.nativeEnum(DfnsWalletStatus),
        address: addressZod.describe("address"),
    })
    .describe("dfns wallet");
export const encodeProjectWalletDfnsData: (data: ProjectWalletDfnsData) => ProjectWalletDfnsData =
    projectWalletDfnsDataZod.parse;
export const encodeProjectWalletDfnsDataPartial: (
    data: Partial<ProjectWalletDfnsData>,
) => Partial<ProjectWalletDfnsData> = projectWalletDfnsDataZod.partial().parse;

export type ProjectWalletDfns = ProjectWalletDfnsId & ProjectWalletDfnsData;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type ProjectWalletDfnsResource = FirebaseResource<FirestoreSDK, ProjectWalletDfnsData, ProjectWalletDfnsId>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type ProjectWalletDfnsQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ProjectWalletDfnsData,
    ProjectWalletDfnsId
>;
export type ProjectWalletDfnsGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ProjectWalletDfnsData,
    ProjectWalletDfnsId,
    ProjectId,
    ProjectWalletDfnsData,
    ProjectWalletDfnsData,
    Query<FirestoreSDK, ProjectWalletDfnsData>
>;

//Check zod validator matches interface
expectType<TypeOf<ProjectWalletDfnsData, z.input<typeof projectWalletDfnsDataZod>>>(true);
expectType<TypeOf<ProjectWalletDfnsData, z.output<typeof projectWalletDfnsDataZod>>>(true);
