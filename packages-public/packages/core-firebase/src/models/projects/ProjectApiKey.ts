import { TypeOf, expectType } from "ts-expect";
import { z } from "zod";
import {
    FirestoreSDK,
    FirebaseQueryResource,
    Query,
    FirebaseResource,
    FieldOverridesSchema,
} from "@owlprotocol/crud-firebase";
import { ProjectId } from "./Project.js";

export interface ProjectApiKeyId {
    readonly apiKey: string;
}
export const projectApiKeyIdZod = z
    .union([z.string(), z.object({ apiKey: z.string() })])
    .transform((arg) => (typeof arg === "string" ? arg : arg.apiKey));
export const encodeProjectApiKeyId: (id: string | ProjectApiKeyId) => string = projectApiKeyIdZod.parse;
export const decodeProjectApiKeyId: (id: string) => Required<ProjectApiKeyId> = (id) => {
    return { apiKey: id };
};

export interface ProjectApiKeyData {
    readonly apiKey: string;
    readonly role: "admin";
    readonly createdAt?: number;
    readonly expiresAt?: number;
}

export const projectApiKeyDataZod = z
    .object({
        apiKey: z.string(),
        role: z.enum(["admin"]).describe("role"),
        createdAt: z.number().int().positive().describe("timestamp of project api key creation").optional(),
        expiresAt: z.number().int().positive().describe("expiry").optional(),
    })
    .describe("project api key");
export const encodeProjectApiKeyData: (data: ProjectApiKeyData) => ProjectApiKeyData = projectApiKeyDataZod.parse;
export const encodeProjectApiKeyDataPartial: (data: Partial<ProjectApiKeyData>) => Partial<ProjectApiKeyData> =
    projectApiKeyDataZod.partial().parse;

export type ProjectApiKey = Required<ProjectApiKeyId> & ProjectApiKeyData;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type ProjectApiKeyResource = FirebaseResource<FirestoreSDK, ProjectApiKeyData, ProjectApiKeyId>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type ProjectApiKeyQueryResource = FirebaseQueryResource<FirestoreSDK, ProjectApiKeyData, ProjectApiKeyId>;
export type ProjectApiKeyGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ProjectApiKeyData,
    ProjectApiKeyId,
    ProjectId,
    ProjectApiKeyData,
    ProjectApiKeyData,
    Query<FirestoreSDK, ProjectApiKeyData>
>;

//Check zod validator matches interface
expectType<TypeOf<ProjectApiKeyData, z.input<typeof projectApiKeyDataZod>>>(true);
expectType<TypeOf<ProjectApiKeyData, z.output<typeof projectApiKeyDataZod>>>(true);

export const ProjectApiKeyFieldOverrides: FieldOverridesSchema<keyof ProjectApiKeyData> = {
    apiKey: "COLLECTION_GROUP",
    role: "IGNORE",
    expiresAt: "IGNORE",
    createdAt: "IGNORE",
};
