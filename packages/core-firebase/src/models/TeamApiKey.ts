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

export interface TeamApiKeyId {
    readonly apiKey: string;
}
export const teamApiKeyIdZod = z
    .union([z.string(), z.object({ apiKey: z.string() })])
    .transform((arg) => (typeof arg === "string" ? arg : arg.apiKey));
export const encodeTeamApiKeyId: (id: string | TeamApiKeyId) => string = teamApiKeyIdZod.parse;
export const decodeTeamApiKeyId: (id: string) => Required<TeamApiKeyId> = (id) => {
    return { apiKey: id };
};

export interface TeamApiKeyData {
    readonly apiKey: string;
    readonly createdAt?: number;
    readonly expiresAt?: number;
}

export const teamApiKeyDataZod = z
    .object({
        apiKey: z.string(),
        createdAt: z.number().int().positive().describe("timestamp of team api key creation").optional(),
        expiresAt: z.number().int().positive().describe("expiry").optional(),
    })
    .describe("team api key");
export const encodeTeamApiKeyData: (data: TeamApiKeyData) => TeamApiKeyData = teamApiKeyDataZod.parse;
export const encodeTeamApiKeyDataPartial: (data: Partial<TeamApiKeyData>) => Partial<TeamApiKeyData> =
    teamApiKeyDataZod.partial().parse;

export type TeamApiKey = Required<TeamApiKeyId> & TeamApiKeyData;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type TeamApiKeyResource = FirebaseResource<FirestoreSDK, TeamApiKeyData, TeamApiKeyId>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type TeamApiKeyQueryResource = FirebaseQueryResource<FirestoreSDK, TeamApiKeyData, TeamApiKeyId>;
export type TeamApiKeyGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    TeamApiKeyData,
    TeamApiKeyId,
    TeamId,
    TeamApiKeyData,
    TeamApiKeyData,
    Query<FirestoreSDK, TeamApiKeyData>
>;

//Check zod validator matches interface
expectType<TypeOf<TeamApiKeyData, z.input<typeof teamApiKeyDataZod>>>(true);
expectType<TypeOf<TeamApiKeyData, z.output<typeof teamApiKeyDataZod>>>(true);

export const TeamApiKeyFieldOverrides: FieldOverridesSchema<keyof TeamApiKeyData> = {
    apiKey: "COLLECTION_GROUP",
    expiresAt: "IGNORE",
    createdAt: "IGNORE",
};
