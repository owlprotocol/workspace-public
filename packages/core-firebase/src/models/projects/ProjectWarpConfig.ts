import { TypeOf, expectType } from "ts-expect";
import { z } from "zod";
import { FirestoreSDK, FirebaseQueryResource, Query, FirebaseResource } from "@owlprotocol/crud-firebase";
import { ProjectId } from "./Project.js";

export interface ProjectWarpConfigId {
    readonly warpConfigId: string;
}

export const projectWarpConfigIdZod = z
    .union([z.string(), z.object({ warpConfigId: z.string() })])
    .transform((arg) => (typeof arg === "string" ? arg : arg.warpConfigId));
export const encodeProjectWarpConfigId: (id: string | ProjectWarpConfigId) => string = projectWarpConfigIdZod.parse;
export const decodeProjectWarpConfigId: (id: string) => Required<ProjectWarpConfigId> = (id) => {
    return { warpConfigId: id };
};

export interface WarpTokenConfig {
    readonly standard: string;
    readonly addressOrDenom: string;
    readonly collateralAddressOrDenom?: string;
    readonly chainName: string;
    readonly name: string;
    readonly symbol: string;
    readonly decimals: number;
    readonly connections: { token: string }[];
}

export interface ProjectWarpConfigData {
    readonly warpConfigId: string;
    readonly bridgeUrl?: string;
    readonly tokens: WarpTokenConfig[];
}

const tokenConnectionZod = z.object({ token: z.string() });

export const projectWarpConfigDataZod = z
    .object({
        warpConfigId: z.string(),
        bridgeUrl: z.string().optional(),
        tokens: z.array(
            z.object({
                standard: z.string(),
                addressOrDenom: z.string(),
                collateralAddressOrDenom: z.string().optional(),
                chainName: z.string(),
                name: z.string(),
                symbol: z.string(),
                decimals: z.number(),
                connections: z.array(tokenConnectionZod),
            }),
        ),
    })
    .describe("project warp config");
export const encodeProjectWarpConfigData: (data: ProjectWarpConfigData) => ProjectWarpConfigData =
    projectWarpConfigDataZod.parse;
export const encodeProjectWarpConfigDataPartial: (
    data: Partial<ProjectWarpConfigData>,
) => Partial<ProjectWarpConfigData> = projectWarpConfigDataZod.partial().parse;

export type ProjectWarpConfig = Required<ProjectWarpConfigId> & ProjectWarpConfigData;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type ProjectWarpConfigResource = FirebaseResource<FirestoreSDK, ProjectWarpConfigData, ProjectWarpConfigId>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type ProjectWarpConfigQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ProjectWarpConfigData,
    ProjectWarpConfigId
>;
export type ProjectWarpConfigGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ProjectWarpConfigData,
    ProjectWarpConfigId,
    ProjectId,
    ProjectWarpConfigData,
    ProjectWarpConfigData,
    Query<FirestoreSDK, ProjectWarpConfigData>
>;

//Check zod validator matches interface
expectType<TypeOf<ProjectWarpConfigData, z.input<typeof projectWarpConfigDataZod>>>(true);
expectType<TypeOf<ProjectWarpConfigData, z.output<typeof projectWarpConfigDataZod>>>(true);
