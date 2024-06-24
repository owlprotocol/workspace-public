import { TypeOf, expectType } from "ts-expect";
import { z } from "zod";
import {
    FirestoreSDK,
    FirebaseQueryResource,
    Query,
    FirebaseResource,
    FieldOverridesSchema,
} from "@owlprotocol/crud-firebase";
import { TeamId } from "./Team.js";

export interface TeamMemberId {
    userId: string;
}
export const teamMemberIdZod = z
    .union([z.string(), z.object({ userId: z.string() })])
    .transform((arg) => (typeof arg === "string" ? arg : arg.userId));
export const encodeTeamMemberId: (id: string | TeamMemberId) => string = teamMemberIdZod.parse;
export const decodeTeamMemberId: (id: string) => TeamMemberId = (id) => {
    return { userId: id };
};

export interface TeamMemberData {
    userId: string;
    role: string;
}
export const teamMemberDataZod = z
    .object({
        userId: z.string(),
        role: z.string().describe("name"),
    })
    .describe("team member");
export const encodeTeamMemberData: (data: TeamMemberData) => TeamMemberData = teamMemberDataZod.parse;
export const encodeTeamMemberDataPartial: (data: Partial<TeamMemberData>) => Partial<TeamMemberData> =
    teamMemberDataZod.partial().parse;

export type TeamMember = Required<TeamMemberId> & TeamMemberData;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type TeamMemberResource = FirebaseResource<FirestoreSDK, TeamMemberData, TeamMemberId, TeamId>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type TeamMemberQueryResource = FirebaseQueryResource<FirestoreSDK, TeamMemberData, TeamMemberId, TeamId>;
export type TeamMemberGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    TeamMemberData,
    TeamMemberId,
    TeamId,
    TeamMemberData,
    TeamMemberData,
    Query<FirestoreSDK, TeamMemberData>
>;

//Check zod validator matches interface
expectType<TypeOf<TeamMemberData, z.input<typeof teamMemberDataZod>>>(true);
expectType<TypeOf<TeamMemberData, z.output<typeof teamMemberDataZod>>>(true);

export const TeamMemberFieldOverrides: FieldOverridesSchema<keyof TeamMemberData> = {
    userId: "COLLECTION_GROUP",
    role: "IGNORE",
};
