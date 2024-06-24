import { addressZod } from "@owlprotocol/zod-sol";
import { z } from "zod";
import { TypeOf, expectType } from "ts-expect";
import { FirestoreSDK, FirebaseQueryResource, Query, FirebaseResource } from "@owlprotocol/crud-firebase";

import { Address } from "viem";
import { ProjectId } from "./Project.js";
import { ProjectContractId } from "./ProjectContract.js";

/**
 * Generic Contract-level metadata. See https://docs.opensea.io/docs/contract-level-metadata
 **/
export interface ProjectContractMetadataData {
    metadata: {
        /** Contract name */
        name?: string;
        /** Contract description */
        description?: string;
        /** Image url */
        image?: string;
        /** Relevant url to read contract information */
        external_url?: string;

        /***** Collections *****/
        /** Indicates a 1/10000 seller fee 100 = 1%. */
        seller_fee_basis_points?: number;
        /** Where seller fees will be paid to. */
        fee_recipient?: Address;
    };
}

export const projectContractMetadataAttributesZod = z.object({
    name: z.string().describe("name").optional(),
    description: z.string().describe("description").optional(),
    image: z.string().describe("image").optional(),
    external_url: z.string().describe("external url").optional(),
    seller_fee_basis_points: z.number().describe("Indicates a 1/10000 seller fee 100 = 1%. ").optional(),
    fee_recipient: addressZod.describe("fee recipient").optional(),
});

export const projectContractMetadataDataZod = z
    .object({
        metadata: projectContractMetadataAttributesZod,
    })
    .describe("contract metadata");

export const encodeProjectContractMetadataData: (data: ProjectContractMetadataData) => ProjectContractMetadataData =
    projectContractMetadataDataZod.parse;
export const encodeProjectContractMetadataDataPartial: (
    data: Partial<ProjectContractMetadataData>,
) => Partial<ProjectContractMetadataData> = projectContractMetadataDataZod.partial().parse;

export type ProjectContractMetadata = ProjectContractId & ProjectContractMetadataData;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type ProjectContractMetadataResource = FirebaseResource<
    FirestoreSDK,
    ProjectContractMetadataData,
    ProjectContractId
>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type ProjectContractMetadataQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ProjectContractMetadataData,
    ProjectContractId
>;
export type ProjectContractMetadataGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ProjectContractMetadataData,
    ProjectContractId,
    ProjectId,
    ProjectContractMetadataData,
    ProjectContractMetadataData,
    Query<FirestoreSDK, ProjectContractMetadataData>
>;

//Check zod validator matches interface
expectType<TypeOf<ProjectContractMetadataData, z.input<typeof projectContractMetadataDataZod>>>(true);
expectType<TypeOf<ProjectContractMetadataData, z.output<typeof projectContractMetadataDataZod>>>(true);
