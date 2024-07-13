import { FirestoreSDK, FirebaseQueryResource, Query, FirebaseResource } from "@owlprotocol/crud-firebase";
import { TypeOf, expectType } from "ts-expect";
import { z } from "zod";
import { ProjectId } from "./Project.js";

export interface ProjectUserCustodialId {
    readonly userId: string;
}

export const projectUserCustodialIdParamsZod = z.object({ userId: z.string() });
export const projectUserCustodialIdZod = z
    .union([z.string(), projectUserCustodialIdParamsZod])
    .transform((arg) => (typeof arg === "string" ? arg : arg.userId));
export const encodeProjectUserCustodialId: (id: string | ProjectUserCustodialId) => string =
    projectUserCustodialIdZod.parse;
export const decodeProjectUserCustodialId: (id: string) => ProjectUserCustodialId = (id) => {
    return { userId: id };
};

/** Project User managed by API Secret */
export interface ProjectUserCustodialData {
    readonly userId: string;
    externalId?: string;
}

export const projectUserCustodialDataZod = z
    .object({
        userId: z.string(),
        externalId: z.string().describe("externalId").optional(),
    })
    .describe("project user custodial");
export const encodeProjectUserCustodialData: (data: ProjectUserCustodialData) => ProjectUserCustodialData =
    projectUserCustodialDataZod.parse;
export const encodeProjectUserCustodialDataPartial: (
    data: Partial<ProjectUserCustodialData>,
) => Partial<ProjectUserCustodialData> = projectUserCustodialDataZod.partial().parse;

export type ProjectUserCustodial = ProjectUserCustodialId & ProjectUserCustodialData;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type ProjectUserCustodialResource = FirebaseResource<
    FirestoreSDK,
    ProjectUserCustodialData,
    ProjectUserCustodialId
>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type ProjectUserCustodialQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ProjectUserCustodialData,
    ProjectUserCustodialId
>;
export type ProjectUserCustodialGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ProjectUserCustodialData,
    ProjectUserCustodialId,
    ProjectId,
    ProjectUserCustodialData,
    ProjectUserCustodialData,
    Query<FirestoreSDK, ProjectUserCustodialData>
>;
//Check zod validator matches interface
expectType<TypeOf<ProjectUserCustodialData, z.input<typeof projectUserCustodialDataZod>>>(true);
expectType<TypeOf<ProjectUserCustodialData, z.output<typeof projectUserCustodialDataZod>>>(true);
