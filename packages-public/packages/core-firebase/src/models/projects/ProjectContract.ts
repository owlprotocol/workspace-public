import { addressZod } from "@owlprotocol/zod-sol";
import { z } from "zod";
import { TypeOf, expectType } from "ts-expect";
import { FirestoreSDK, FirebaseQueryResource, Query, FirebaseResource } from "@owlprotocol/crud-firebase";
import { Address } from "viem";
import { ProjectId } from "./Project.js";
import { chainIdZod } from "../Network.js";

export enum FeatureType {
    COLLECTION = "COLLECTION",
    LOYALTY = "LOYALTY",
    SAFE = "SAFE",
}
export const featureTypeZod = z.nativeEnum(FeatureType).describe("featureType");

export enum DeploymentMethod {
    /* Regular deterministic deployment */
    DETERMINISTIC = "DETERMINISTIC",
    /* Minimal proxy deployment, reduces upfront gas cost */
    ERC1167 = "ERC1167",
    /* Beacon proxy deployment, upgradeable, uses Owl Protocol default beacons */
    BEACON_OWL = "BEACON_OWL",
    /* Beacon proxy deployment, upgradeable, uses existing beacon */
    BEACON_EXISTING = "BEACON_EXISTING",
    /* Beacon proxy deployment, upgradeable, deploys new beacon */
    BEACON_NEW = "BEACON_NEW",
}
export const deploymentMethodZod = z.nativeEnum(DeploymentMethod).describe("deployment method");

export enum CollectionContractType {
    /** Default. ERC721 with auto id incrementer. */
    ERC721AutoId = "ERC721_AUTO_ID",
    /** ERC721 with id parameter given at mint. */
    //ERC721 = "ERC721",
    /** ERC1155 */
    ERC1155 = "ERC1155",
    /** Alias for ERC721AutoId */
    SINGLE = "SINGLE",
    /** Alias for ERC1155 */
    MULTIPLE = "MULTIPLE",
}
export const collectionContractTypeZod = z.nativeEnum(CollectionContractType).describe("collection contract type");

/** Type of contract to provide metadata */
export enum TokenURIContractType {
    /** Default. Can be used by ERC721/ERC1155. Metadata endpoint concatenated with token id. */
    TOKEN_URI_BASE = "TOKEN_URI_BASE",
    /* TokenDnaContractType != NONE */
    TOKEN_URI_DNA = "TOKEN_URI_DNA",
}
export const tokenURIContractTypeZod = z.nativeEnum(TokenURIContractType).describe("token URI contract type");

/** General enum config param. Sets default for all other enums. */
export enum TokenMetadataType {
    OFFCHAIN = "OFFCHAIN",
    ONCHAIN = "ONCHAIN",
}
export const tokenMetadataTypeZod = z.nativeEnum(TokenMetadataType).describe("token metadata type");

/** Type of contract to provide royalty info. Not necessarily enforced by marketplaces */
export enum TokenRoyaltyContractType {
    /** Regular ERC2981 compatible royalty contract */
    ERC2981 = "ERC2981",
    /** TODO: Requires implementation */
    //ERC2981DecliningTime = "ERC2981DecliningTimeGlobal",
    //ERC2981DecliningPostTransfer = "ERC2981DecliningPostTransfer",
    //ERC2981DecliningTimePostTransfer = "ERC2981DecliningTimePostTransfer",
}
export const tokenRoyaltyContractTypeZod = z
    .nativeEnum(TokenRoyaltyContractType)
    .describe("token royalty contract type");

/** Type of contract to store onchain data */
export enum TokenDNAContractType {
    /** Default. No on-chain data */
    NONE = "NONE",
    /** Stores on-chain data */
    TOKEN_DNA = "TOKEN_DNA",
    /** TODO: Requires implementation */
    //TOKEN_DNA_6651 = "TOKEN_DNA_6651",
}
export const tokenDNAContractTypeZod = z.nativeEnum(TokenDNAContractType).describe("token DNA contract type");

//Project Contract
export interface ProjectContractId {
    readonly chainId: number;
    readonly address: Address;
}
export const projectContractIdRegex = /(?<chainId>\d+)-(?<address>0x[a-fA-F0-9]{40})/;
export const projectContractIdParamsZod = z.object({ chainId: chainIdZod, address: addressZod });
export const projectContractIdZod = z
    .union([z.string().regex(projectContractIdRegex), projectContractIdParamsZod])
    .transform((arg) => {
        if (typeof arg === "string") {
            return arg;
        } else {
            return `${arg.chainId}-${arg.address}`;
        }
    });
export const encodeProjectContractId: (id: string | ProjectContractId) => string = projectContractIdZod.parse;
export const decodeProjectContractId: (id: string) => ProjectContractId = (id) => {
    const { chainId, address } = projectContractIdRegex.exec(id)!.groups! as unknown as {
        chainId: string;
        address: Address;
    };
    return { chainId: parseInt(chainId), address };
};

export interface CollectionData {
    readonly featureType: FeatureType.COLLECTION;
    readonly collectionContractType: CollectionContractType;
    readonly collectionMetadataType: TokenMetadataType;
    readonly uriType?: TokenURIContractType;
    readonly royaltyType?: TokenRoyaltyContractType;
    readonly dnaType?: TokenDNAContractType;
}

export const collectionDataZod = z.object({
    featureType: z.literal("COLLECTION").describe("featureType"),
    collectionContractType: collectionContractTypeZod,
    collectionMetadataType: tokenMetadataTypeZod,
    uriType: tokenURIContractTypeZod.optional(),
    royaltyType: tokenRoyaltyContractTypeZod.optional(),
    dnaType: tokenDNAContractTypeZod.optional(),
});

export interface ProjectContractData extends Omit<Partial<CollectionData>, "featureType"> {
    readonly chainId: number;
    readonly address: Address;

    readonly featureType?: FeatureType;
    /** Blockchain Data */
    readonly contractTx?: string;
    //readonly relay?: RelayMethod;
    readonly contractParams?: any;
    readonly deployParams?: {
        msgSender: Address;
        salt: string;
        deploymentMethod: DeploymentMethod;
        beaconAddress?: Address | undefined;
    };
    /** User Data */
    readonly contractName: string;
    readonly createdAt?: number;
}

export const projectContractDataZod = z
    .object({
        /** Blockchain Data */
        chainId: chainIdZod,
        address: addressZod.describe("address of the deployed contract"),
        featureType: featureTypeZod.optional(),
        contractTx: z.string().describe("contract deploy transaction").optional(),
        //relay: relayMethodZod.optional(),
        contractParams: z.any().describe("contract deploy params").optional(),
        deployParams: z
            .object({
                msgSender: addressZod.describe("deploy message sender"),
                salt: z.string(),
                deploymentMethod: deploymentMethodZod,
                beaconAddress: addressZod.describe("beacon address").optional(),
            })
            .describe("deploy params")
            .optional(),
        /** User Data */
        contractName: z.string().describe("name of the contract deployed"),
        projectId: z.string().describe("projectId").optional(),
        createdAt: z.number().int().positive().optional().describe("timestamp of contract creation"),
    })
    .merge(collectionDataZod.partial().omit({ featureType: true }))
    .describe("contract");
export const encodeProjectContractData: (data: ProjectContractData) => ProjectContractData =
    projectContractDataZod.parse;
export const encodeProjectContractDataPartial: (data: Partial<ProjectContractData>) => Partial<ProjectContractData> =
    projectContractDataZod.partial().parse;

export type ProjectContract = ProjectContractId & ProjectContractData;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type ProjectContractResource = FirebaseResource<FirestoreSDK, ProjectContractData, ProjectContractId>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type ProjectContractQueryResource = FirebaseQueryResource<FirestoreSDK, ProjectContractData, ProjectContractId>;
export type ProjectContractGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ProjectContractData,
    ProjectContractId,
    ProjectId,
    ProjectContractData,
    ProjectContractData,
    Query<FirestoreSDK, ProjectContractData>
>;

export type ProjectContractCollection = ProjectContractId & ProjectContractData & CollectionData;

//Check zod validator matches interface
expectType<TypeOf<ProjectContractData, z.input<typeof projectContractDataZod>>>(true);
expectType<TypeOf<ProjectContractData, z.output<typeof projectContractDataZod>>>(true);
