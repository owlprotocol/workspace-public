import { z } from "zod";
import { TypeOf, expectType } from "ts-expect";
import { FirestoreSDK, FirebaseQueryResource, Query, FirebaseResource } from "@owlprotocol/crud-firebase";
import { v4 as uuidv4 } from "uuid";

import { addressZod } from "@owlprotocol/zod-sol";
import { Address } from "viem";
import { TokenMetadata, tokenMetadataZod } from "./ProjectToken.js";
import { ProjectId } from "./Project.js";
import { chainIdZod } from "../Network.js";

export interface ProjectTokenTemplateId {
    readonly id?: string;
}
export const projectTokenTemplateIdZod = z
    .union([z.string(), z.object({ id: z.string().optional() })])
    .transform((arg) => (typeof arg === "string" ? arg : arg.id ?? uuidv4()));
export const encodeProjectTokenTemplateId: (id: string | ProjectTokenTemplateId) => string =
    projectTokenTemplateIdZod.parse;
export const decodeProjectTokenTemplateId: (id: string) => Required<ProjectTokenTemplateId> = (id) => {
    return { id };
};

export interface ProjectTokenTemplateData {
    chainId?: number;
    address?: Address;
    externalId?: string;
    metadata: TokenMetadata;
}
export const projectTokenTemplateDataZod = z.object({
    chainId: chainIdZod.optional(),
    address: addressZod.optional(),
    externalId: z.string().max(36).optional(),
    metadata: tokenMetadataZod,
});
export const encodeProjectTokenTemplateData: (data: ProjectTokenTemplateData) => ProjectTokenTemplateData =
    projectTokenTemplateDataZod.parse;
export const encodeProjectTokenTemplateDataPartial: (
    data: Partial<ProjectTokenTemplateData>,
) => Partial<ProjectTokenTemplateData> = projectTokenTemplateDataZod.partial().parse;

export type ProjectTokenTemplate = ProjectTokenTemplateId & ProjectTokenTemplateData;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type ProjectTokenTemplateResource = FirebaseResource<
    FirestoreSDK,
    ProjectTokenTemplateData,
    ProjectTokenTemplateId
>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type ProjectTokenTemplateQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ProjectTokenTemplateData,
    ProjectTokenTemplateId
>;
export type ProjectTokenTemplateGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ProjectTokenTemplateData,
    ProjectTokenTemplateId,
    ProjectId,
    ProjectTokenTemplateData,
    ProjectTokenTemplateData,
    Query<FirestoreSDK, ProjectTokenTemplateData>
>;

//Check zod validator matches interface
expectType<TypeOf<ProjectTokenTemplateData, z.input<typeof projectTokenTemplateDataZod>>>(true);
expectType<TypeOf<ProjectTokenTemplateData, z.output<typeof projectTokenTemplateDataZod>>>(true);
