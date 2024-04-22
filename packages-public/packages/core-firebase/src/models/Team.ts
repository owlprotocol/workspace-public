import { FirebaseQueryResource, FirebaseResource, FirestoreSDK } from "@owlprotocol/crud-firebase";
import { TypeOf, expectType } from "ts-expect";
import { z } from "zod";
import { slugZod } from "./common.js";

export interface TeamId {
    readonly teamId: string;
}
export const teamIdZod = z
    .union([z.string(), z.object({ teamId: z.string() })])
    .transform((arg) => (typeof arg === "string" ? arg : arg.teamId));
export const encodeTeamId: (id: string | TeamId) => string = teamIdZod.parse;
export const decodeTeamId: (id: string) => Required<TeamId> = (id) => {
    return { teamId: id };
};

export interface TeamData {
    owner: string;
    name: string;
    slug: string;
}
export const teamDataZod = z
    .object({
        owner: z.string().describe("owner"),
        name: z.string().describe("name"),
        slug: slugZod,
    })
    .describe("team");
export const encodeTeamData: (data: TeamData) => TeamData = teamDataZod.parse;
export const encodeTeamDataPartial: (data: Partial<TeamData>) => Partial<TeamData> = teamDataZod.partial().parse;

export type Team = Required<TeamId> & TeamData;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type TeamResource = FirebaseResource<FirestoreSDK, TeamData, TeamId>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type TeamQueryResource = FirebaseQueryResource<FirestoreSDK, TeamData, TeamId>;

//Check zod validator matches interface
expectType<TypeOf<TeamData, z.input<typeof teamDataZod>>>(true);
expectType<TypeOf<TeamData, z.output<typeof teamDataZod>>>(true);
