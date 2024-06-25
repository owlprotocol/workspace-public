import { FirestoreSDK, FirebaseQueryResource, Query, FirebaseResource } from "@owlprotocol/crud-firebase";
import { TypeOf, expectType } from "ts-expect";
import { z } from "zod";
import { ProjectId } from "./Project.js";

export interface ProjectUserId {
    readonly userId: string;
}

export const projectUserIdParamsZod = z.object({ userId: z.string() });
export const projectUserIdZod = z
    .union([z.string(), projectUserIdParamsZod])
    .transform((arg) => (typeof arg === "string" ? arg : arg.userId));
export const encodeProjectUserId: (id: string | ProjectUserId) => string = projectUserIdZod.parse;
export const decodeProjectUserId: (id: string) => ProjectUserId = (id) => {
    return { userId: id };
};

export interface ProjectUserData {
    readonly userId: string;
    readonly email: string;
    fullName?: string;
    externalId?: string;
}

export const projectUserDataZod = z
    .object({
        userId: z.string(),
        email: z.string().email(),
        fullName: z.string().optional(),
        externalId: z.string().describe("externalId").optional(),
    })
    .describe("project user");
export const encodeProjectUserData: (data: ProjectUserData) => ProjectUserData = projectUserDataZod.parse;
export const encodeProjectUserDataPartial: (data: Partial<ProjectUserData>) => Partial<ProjectUserData> =
    projectUserDataZod.partial().parse;

export type ProjectUser = ProjectUserId & ProjectUserData;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type ProjectUserResource = FirebaseResource<FirestoreSDK, ProjectUserData, ProjectUserId>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type ProjectUserQueryResource = FirebaseQueryResource<FirestoreSDK, ProjectUserData, ProjectUserId>;
export type ProjectUserGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ProjectUserData,
    ProjectUserId,
    ProjectId,
    ProjectUserData,
    ProjectUserData,
    Query<FirestoreSDK, ProjectUserData>
>;
//Check zod validator matches interface
expectType<TypeOf<ProjectUserData, z.input<typeof projectUserDataZod>>>(true);
expectType<TypeOf<ProjectUserData, z.output<typeof projectUserDataZod>>>(true);
