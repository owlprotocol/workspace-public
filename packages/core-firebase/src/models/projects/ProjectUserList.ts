import { FirestoreSDK, FirebaseQueryResource, Query, FirebaseResource } from "@owlprotocol/crud-firebase";
import { TypeOf, expectType } from "ts-expect";
import { z } from "zod";
import { ProjectId } from "./Project.js";

export interface ProjectUserListId {
    readonly projectUserListId: string;
}
export const projectUserListIdZod = z
    .union([z.string(), z.object({ projectUserListId: z.string() })])
    .transform((arg) => (typeof arg === "string" ? arg : arg.projectUserListId));
export const encodeProjectUserListId: (id: string | ProjectUserListId) => string = projectUserListIdZod.parse;
export const decodeProjectUserListId: (id: string) => Required<ProjectUserListId> = (id) => {
    return { projectUserListId: id };
};

export interface ProjectUserListData {
    readonly name: string;
}
export const projectUserListDataZod = z.object({
    name: z.string(),
});
export const encodeProjectUserListData: (data: ProjectUserListData) => ProjectUserListData =
    projectUserListDataZod.parse;
export const encodeProjectUserListDataPartial: (data: Partial<ProjectUserListData>) => Partial<ProjectUserListData> =
    projectUserListDataZod.partial().parse;

export type ProjectUserList = ProjectUserListId & ProjectUserListData;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type ProjectUserListResource = FirebaseResource<FirestoreSDK, ProjectUserListData, ProjectUserListId>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type ProjectUserListQueryResource = FirebaseQueryResource<FirestoreSDK, ProjectUserListData, ProjectUserListId>;
export type ProjectUserListGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ProjectUserListData,
    ProjectUserListId,
    ProjectId,
    ProjectUserListData,
    ProjectUserListData,
    Query<FirestoreSDK, ProjectUserListData>
>;

//Check zod validator matches interface
expectType<TypeOf<ProjectUserListData, z.input<typeof projectUserListDataZod>>>(true);
expectType<TypeOf<ProjectUserListData, z.output<typeof projectUserListDataZod>>>(true);
