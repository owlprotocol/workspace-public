import { FirestoreSDK, FirebaseQueryResource, Query, FirebaseResource } from "@owlprotocol/crud-firebase";
import { TypeOf, expectType } from "ts-expect";
import { z } from "zod";
import { ProjectId } from "./Project.js";

export interface ProjectUserManagedId {
    readonly userId: string;
}

export const projectUserManagedIdParamsZod = z.object({ userId: z.string() });
export const projectUserManagedIdZod = z
    .union([z.string(), projectUserManagedIdParamsZod])
    .transform((arg) => (typeof arg === "string" ? arg : arg.userId));
export const encodeProjectUserManagedId: (id: string | ProjectUserManagedId) => string = projectUserManagedIdZod.parse;
export const decodeProjectUserManagedId: (id: string) => ProjectUserManagedId = (id) => {
    return { userId: id };
};

/** Project User managed by API Secret */
export interface ProjectUserManagedData {
    readonly userId: string;
    externalId?: string;
}

export const projectUserManagedDataZod = z
    .object({
        userId: z.string(),
        externalId: z.string().describe("externalId").optional(),
    })
    .describe("project user managed");
export const encodeProjectUserManagedData: (data: ProjectUserManagedData) => ProjectUserManagedData =
    projectUserManagedDataZod.parse;
export const encodeProjectUserManagedDataPartial: (
    data: Partial<ProjectUserManagedData>,
) => Partial<ProjectUserManagedData> = projectUserManagedDataZod.partial().parse;

export type ProjectUserManaged = ProjectUserManagedId & ProjectUserManagedData;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type ProjectUserManagedResource = FirebaseResource<FirestoreSDK, ProjectUserManagedData, ProjectUserManagedId>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type ProjectUserManagedQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ProjectUserManagedData,
    ProjectUserManagedId
>;
export type ProjectUserManagedGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ProjectUserManagedData,
    ProjectUserManagedId,
    ProjectId,
    ProjectUserManagedData,
    ProjectUserManagedData,
    Query<FirestoreSDK, ProjectUserManagedData>
>;
//Check zod validator matches interface
expectType<TypeOf<ProjectUserManagedData, z.input<typeof projectUserManagedDataZod>>>(true);
expectType<TypeOf<ProjectUserManagedData, z.output<typeof projectUserManagedDataZod>>>(true);
