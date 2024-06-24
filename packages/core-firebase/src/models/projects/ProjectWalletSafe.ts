import { z } from "zod";
import { addressZod } from "@owlprotocol/zod-sol";
import { TypeOf, expectType } from "ts-expect";
import { FirestoreSDK, FirebaseQueryResource, Query, FirebaseResource } from "@owlprotocol/crud-firebase";
import { Address } from "viem";
import { ProjectId } from "./Project.js";
import { chainIdZod } from "../Network.js";

export interface ProjectWalletSafeId {
    readonly chainId: number;
    readonly address: Address;
}
export const projectWalletSafeIdRegex = /(?<chainId>\d+)-(?<address>0x[a-fA-F0-9]{40})/;
export const projectWalletSafeIdZod = z
    .union([z.string().regex(projectWalletSafeIdRegex), z.object({ chainId: chainIdZod, address: addressZod })])
    .transform((arg) => {
        if (typeof arg === "string") {
            return arg;
        } else {
            return `${arg.chainId}-${arg.address}`;
        }
    });
export const encodeProjectWalletSafeId: (id: string | ProjectWalletSafeId) => string = projectWalletSafeIdZod.parse;
export const decodeProjectWalletSafeId: (id: string) => ProjectWalletSafeId = (id) => {
    const { chainId, address } = projectWalletSafeIdRegex.exec(id)!.groups! as unknown as {
        chainId: string;
        address: Address;
    };
    return { chainId: parseInt(chainId), address };
};

export interface ProjectWalletSafeData {
    readonly chainId: number;
    readonly address: string;
}
export const projectWalletSafeDataZod = z
    .object({
        chainId: chainIdZod,
        address: addressZod.describe("address"),
    })
    .describe("safe wallet");
export const encodeProjectWalletSafeData: (data: ProjectWalletSafeData) => ProjectWalletSafeData =
    projectWalletSafeDataZod.parse;
export const encodeProjectWalletSafeDataPartial: (
    data: Partial<ProjectWalletSafeData>,
) => Partial<ProjectWalletSafeData> = projectWalletSafeDataZod.partial().parse;

export type ProjectWalletSafe = ProjectWalletSafeId & ProjectWalletSafeData;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type ProjectWalletSafeResource = FirebaseResource<FirestoreSDK, ProjectWalletSafeData, ProjectWalletSafeId>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type ProjectWalletSafeQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ProjectWalletSafeData,
    ProjectWalletSafeId
>;
export type ProjectWalletSafeGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ProjectWalletSafeData,
    ProjectWalletSafeId,
    ProjectId,
    ProjectWalletSafeData,
    ProjectWalletSafeData,
    Query<FirestoreSDK, ProjectWalletSafeData>
>;

//Check zod validator matches interface
expectType<TypeOf<ProjectWalletSafeData, z.input<typeof projectWalletSafeDataZod>>>(true);
expectType<TypeOf<ProjectWalletSafeData, z.output<typeof projectWalletSafeDataZod>>>(true);
