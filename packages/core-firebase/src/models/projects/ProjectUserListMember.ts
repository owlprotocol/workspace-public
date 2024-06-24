import { FirestoreSDK, FirebaseQueryResource, FirebaseResource } from "@owlprotocol/crud-firebase";
import { TypeOf, expectType } from "ts-expect";
import { z } from "zod";
export interface ProjectUserListMemberId {
    readonly userId: string;
}
export const projectUserListMemberIdZod = z
    .union([z.string(), z.object({ id: z.string() })])
    .transform((arg) => (typeof arg === "string" ? arg : arg.id));
export const encodeProjectUserListMemberId: (id: string | ProjectUserListMemberId) => string =
    projectUserListMemberIdZod.parse;
export const decodeProjectUserListMemberId: (id: string) => ProjectUserListMemberId = (id) => {
    return { userId: id };
};

export interface ProjectUserListMemberData {
    readonly role: string;
}
export const projectUserListMemberDataZod = z.object({
    role: z.string(),
});
export const encodeProjectUserListMemberData: (data: ProjectUserListMemberData) => ProjectUserListMemberData =
    projectUserListMemberDataZod.parse;
export const encodeProjectUserListMemberDataPartial: (
    data: Partial<ProjectUserListMemberData>,
) => Partial<ProjectUserListMemberData> = projectUserListMemberDataZod.partial().parse;

export type ProjectUserListMember = ProjectUserListMemberId & ProjectUserListMemberData;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type ProjectUserListMemberResource = FirebaseResource<
    FirestoreSDK,
    ProjectUserListMemberData,
    ProjectUserListMemberId
>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type ProjectUserListMemberQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ProjectUserListMemberData,
    ProjectUserListMemberId
>;

//Check zod validator matches interface
expectType<TypeOf<ProjectUserListMemberData, z.input<typeof projectUserListMemberDataZod>>>(true);
expectType<TypeOf<ProjectUserListMemberData, z.output<typeof projectUserListMemberDataZod>>>(true);
