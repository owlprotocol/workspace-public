import { z } from "zod";
import { addressZod } from "@owlprotocol/zod-sol";
import { TypeOf, expectType } from "ts-expect";
import { FirestoreSDK, FirebaseQueryResource, Query, FirebaseResource } from "@owlprotocol/crud-firebase";
import { Address } from "viem";
import { ProjectId } from "./Project.js";
import { chainIdZod } from "../Network.js";

export interface ProjectUserWalletSafeId {
    readonly chainId: number;
    readonly address: Address;
}
export const projectUserWalletSafeIdRegex = /(?<chainId>\d+)-(?<address>0x[a-fA-F0-9]{40})/;
export const projectUserWalletSafeIdZod = z
    .union([z.string().regex(projectUserWalletSafeIdRegex), z.object({ chainId: chainIdZod, address: addressZod })])
    .transform((arg) => {
        if (typeof arg === "string") {
            return arg;
        } else {
            return `${arg.chainId}-${arg.address}`;
        }
    });
export const encodeProjectUserWalletSafeId: (id: string | ProjectUserWalletSafeId) => string =
    projectUserWalletSafeIdZod.parse;
export const decodeProjectUserWalletSafeId: (id: string) => ProjectUserWalletSafeId = (id) => {
    const { chainId, address } = projectUserWalletSafeIdRegex.exec(id)!.groups! as unknown as {
        chainId: string;
        address: Address;
    };
    return { chainId: parseInt(chainId), address };
};

export interface ProjectUserWalletSafeData {
    readonly chainId: number;
    readonly address: string;
    readonly userId: string;
}
export const projectUserWalletSafeDataZod = z
    .object({
        chainId: chainIdZod,
        address: addressZod.describe("address"),
        userId: z.string().describe("userId"),
    })
    .describe("safe wallet");
export const encodeProjectUserWalletSafeData: (data: ProjectUserWalletSafeData) => ProjectUserWalletSafeData =
    projectUserWalletSafeDataZod.parse;
export const encodeProjectUserWalletSafeDataPartial: (
    data: Partial<ProjectUserWalletSafeData>,
) => Partial<ProjectUserWalletSafeData> = projectUserWalletSafeDataZod.partial().parse;

export type ProjectUserWalletSafe = ProjectUserWalletSafeId & ProjectUserWalletSafeData;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type ProjectUserWalletSafeResource = FirebaseResource<
    FirestoreSDK,
    ProjectUserWalletSafeData,
    ProjectUserWalletSafeId
>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type ProjectUserWalletSafeQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ProjectUserWalletSafeData,
    ProjectUserWalletSafeId
>;
export type ProjectUserWalletSafeGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ProjectUserWalletSafeData,
    ProjectUserWalletSafeId,
    ProjectId,
    ProjectUserWalletSafeData,
    ProjectUserWalletSafeData,
    Query<FirestoreSDK, ProjectUserWalletSafeData>
>;

//Check zod validator matches interface
expectType<TypeOf<ProjectUserWalletSafeData, z.input<typeof projectUserWalletSafeDataZod>>>(true);
expectType<TypeOf<ProjectUserWalletSafeData, z.output<typeof projectUserWalletSafeDataZod>>>(true);
