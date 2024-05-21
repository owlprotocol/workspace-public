import { FirebaseQueryResource, FirebaseResource, FirestoreSDK } from "@owlprotocol/crud-firebase";
import { TypeOf, expectType } from "ts-expect";
import { z } from "zod";
import { slugZod } from "../common.js";

export interface ProjectId {
    readonly projectId: string;
}
export const projectIdZod = z
    .union([z.string(), z.object({ projectId: z.string() })])
    .transform((arg) => (typeof arg === "string" ? arg : arg.projectId));
export const encodeProjectId: (id: string | ProjectId) => string = projectIdZod.parse;
export const decodeProjectId: (id: string) => Required<ProjectId> = (id) => {
    return { projectId: id };
};

export enum ProjectType {
    DEMO = "DEMO",
}
export interface ProjectData {
    teamId: string;
    name: string;
    description?: string;
    slug: string;
    authorizedDomains?: string[];
    defaultChainId: number;
    coverImage?: string;
    projectType?: ProjectType;
}
export const projectDataZod = z
    .object({
        teamId: z.string().describe("teamId"),
        name: z.string().describe("name"),
        description: z.string().describe("description").optional(),
        slug: slugZod.max(100),
        authorizedDomains: z.array(z.string()).describe("authorized domains").optional(),
        defaultChainId: z.number().describe("defaultChainId"),
        coverImage: z.string().describe("URL for cover image").optional(),
        projectType: z.nativeEnum(ProjectType).describe("only used for DEMO projects, DEFAULT = undefined").optional(),
    })
    .describe("project");
export const encodeProjectData: (data: ProjectData) => ProjectData = projectDataZod.parse;
export const encodeProjectDataPartial: (data: Partial<ProjectData>) => Partial<ProjectData> =
    projectDataZod.partial().parse;

export type Project = Required<ProjectId> & ProjectData;

//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type ProjectResource = FirebaseResource<FirestoreSDK, ProjectData, ProjectId>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type ProjectQueryResource = FirebaseQueryResource<FirestoreSDK, ProjectData, ProjectId>;

//Check zod validator matches interface
expectType<TypeOf<ProjectData, z.input<typeof projectDataZod>>>(true);
expectType<TypeOf<ProjectData, z.output<typeof projectDataZod>>>(true);
