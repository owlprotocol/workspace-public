import { addressZod, uint256Zod } from "@owlprotocol/zod-sol";
import { z } from "zod";
import { TypeOf, expectType } from "ts-expect";
import { FirestoreSDK, FirebaseQueryResource, Query, FirebaseResource } from "@owlprotocol/crud-firebase";
import { Address } from "viem";
import { ProjectId } from "./Project.js";
import { chainIdZod } from "../Network.js";

/**
 * Token attributes as documented
 *  by OpenSea https://docs.opensea.io/docs/metadata-standards
 *  by Lens Protocol https://docs.lens.xyz/docs/metadata-standards
 */
export interface TokenMetadataAttribute {
    /** Name of attribute */
    readonly trait_type?: string;
    /** Description of attribute */
    readonly description?: string;
    /** Value of attribute */
    readonly value?: any;
    /** Max value of attribute */
    readonly max_value?: number;
    /** Display type on marketplace */
    readonly display_type?: "number" | "boost_number" | "boost_percentage" | "date" | string;
    /** Display value */
    readonly display_value?: string;
    /** Custom keys */
    readonly [key: string]: unknown;
}

/**
 * Token properties as documented
 *  by OpenSea https://docs.opensea.io/docs/metadata-standards
 *  by EIP1155 https://eips.ethereum.org/EIPS/eip-1155#metadata
 */
export interface TokenMetadataProperty {
    /** Name of attribute */
    readonly name?: string;
    /** Description of attribute */
    readonly description?: string;
    /** Value of attribute */
    readonly value?: any;
    /** Max value of attribute */
    readonly max_value?: number;
    /** Display type on marketplace */
    readonly display_type?: "number" | "boost_number" | "boost_percentage" | "date" | string;
    /** Display value */
    readonly display_value?: string;
    /** Custom keys */
    readonly [key: string]: unknown;
}

/**
 * Token attributes as documented
 *  by OpenSea https://docs.opensea.io/docs/metadata-standards
 *  by Lens Protocol https://docs.lens.xyz/docs/metadata-standards
 */
export const tokenMetadataAttributeZod = z
    .object({
        trait_type: z.string().describe("name of attribute").optional(),
        description: z.string().describe("description of attribute").optional(),
        value: z.any().describe("value of attribute").optional(),
        max_value: z.number().describe("max_value of attribute").optional(),
        display_type: z.string().describe("display type on marketplace").optional(),
        display_value: z.string().describe("display value of attribute").optional(),
    })
    .passthrough()
    .describe("token attribute metadata according to https://docs.opensea.io/docs/metadata-standards");

/**
 * Token properties as documented
 *  by EIP1155 https://eips.ethereum.org/EIPS/eip-1155#metadata
 *  by OpenSea https://docs.opensea.io/docs/metadata-standards
 */
export const tokenMetadataPropertyZod = z
    .object({
        name: z.string().describe("name of attribute").optional(),
        description: z.string().describe("description of attribute").optional(),
        value: z.any().describe("value of attribute").optional(),
        max_value: z.number().describe("max_value of attribute").optional(),
        display_type: z.string().describe("display type on marketplace").optional(),
        display_value: z.string().describe("display value of attribute").optional(),
    })
    .passthrough()
    .describe("token attribute metadata according to https://eips.ethereum.org/EIPS/eip-1155#metadata");

export interface TokenMetadataLocalization {
    //TODO: make read-only
    /** URI for localization info */
    uri?: string;
    /** Default localization (eg. "en") */
    default?: string;
    /** Supported locales (eg. ["en", "es"]) */
    locales?: string[];
    /** Custom keys */
    [key: string]: unknown;
}
export const tokenMetadataLocalizationZod = z
    .object({
        uri: z.string().describe("localization uri formattable string with {locale} parameter").optional(),
        default: z.string().describe("default localization").optional(),
        locales: z.array(z.string()).optional().describe("localization options"),
    })
    .describe("localization")
    .passthrough();

/**
 * TokenMetadata Interface describing an asset on a marketplace.
 * See https://docs.opensea.io/docs/metadata-standards
 * See https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema
 * See https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md#specification
 **/
export interface TokenMetadata {
    /** Identifies the asset to which this token represents */
    readonly name?: string;
    /** Describes the asset to which this token represents */
    readonly description?: string;
    /**
     * A URI pointing to a resource with mime type image representing
     * the asset to which this token represents.
     * Consider making any images at a width between 320 and 1080 pixels
     * and aspect ratio between 1.91:1 and 4:5 inclusive.
     *
     * ^(http|https|ipfs)://",
     * */
    readonly image?: string;
    /**
     * Raw SVG image data, if you want to generate images on the fly (not recommended).
     * Only use this if you're not including the image parameter.
     */
    readonly image_data?: string;
    /**
     * Background color of the item on Marketplace. Must be a six-character hexadecimal without a pre-pended #.
     */
    readonly background_color?: string;
    /**
     * A URL to a multi-media attachment for the item.
     * The file extensions GLTF, GLB, WEBM, MP4, M4V, OGV, and OGG are supported,
     * along with the audio-only extensions MP3, WAV, and OGA.
     * Animation_url also supports HTML pages, allowing you to build rich experiences
     * and interactive NFTs using JavaScript canvas, WebGL, and more.
     * Scripts and relative paths within the HTML page are now supported.
     * However, access to browser extensions is not supported.
     *
     * ^(http|https|ipfs)://
     */
    readonly animation_url?: string;
    /**
     * A URL to a YouTube video.
     *
     * ^(http|https|ipfs)://
     */
    readonly youtube_url?: string;
    /**
     * Allow users to leave marketplace and view the item on your site.
     *
     * ^(http|https|ipfs)://
     */
    readonly external_url?: string;
    /**
     * Asset attributes as supported by OpenSea https://docs.opensea.io/docs/metadata-standards
     */
    readonly attributes?: TokenMetadataAttribute[];
    /**
     * Asset properties as recommended by ERC1155 standard https://eips.ethereum.org/EIPS/eip-1155#metadata
     */
    readonly properties?: {
        [property: string]: TokenMetadataProperty;
    };
    /** Localization info https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#localization */
    readonly localization?: TokenMetadataLocalization;
    /**
     * The number of decimal places that the token amount should display (ERC1155)
     * e.g. 18, means to divide the token amount by 1000000000000000000 to get its user representation.
     */
    readonly decimals?: number;
    /** Custom keys */
    readonly [key: string]: unknown;
}
export const tokenMetadataZod = z
    .object({
        name: z.string().describe("name of token").optional(),
        description: z.string().describe("description of token").optional(),
        image: z.string().describe("image uri for token").optional(),
        image_data: z.string().describe("raw image data for token (not recommended)").optional(),
        //TODO: Validate six character hex color encoding?
        background_color: z.string().describe("background color of item in marketplace").optional(),
        animation_url: z.string().describe("url to multimedia attachment").optional(),
        youtube_url: z.string().describe("YouTube url").optional(),
        external_url: z.string().describe("Custom link to view item").optional(),
        decimals: z.number().describe("Decimals of token for ERC1155").optional(),
        attributes: z.array(tokenMetadataAttributeZod).describe("Item attributes as array").optional(),
        properties: z.record(tokenMetadataPropertyZod).describe("Item properties as key-value").optional(),
        localization: tokenMetadataLocalizationZod.optional(),
    })
    .describe("metadata of a single token")
    .passthrough();

/** Model */
export interface ProjectTokenId {
    readonly chainId: number;
    readonly address: Address;
    readonly tokenId: string;
}
export const projectTokenIdRegex = /(?<chainId>\d+)-(?<address>0x[a-fA-F0-9]{40})-(?<tokenId>\d+)/;
export const projectTokenIdParamsZod = z.object({ chainId: chainIdZod, address: addressZod, tokenId: uint256Zod });

export const projectTokenIdZod = z
    .union([z.string().regex(projectTokenIdRegex), projectTokenIdParamsZod])
    .transform((arg) => {
        if (typeof arg === "string") {
            return arg;
        } else {
            return `${arg.chainId}-${arg.address}-${arg.tokenId}`;
        }
    });

export const encodeProjectTokenId: (id: string | ProjectTokenId) => string = projectTokenIdZod.parse;
export const decodeProjectTokenId: (id: string) => ProjectTokenId = (id) => {
    const { chainId, address, tokenId } = projectTokenIdRegex.exec(id)!.groups! as unknown as {
        chainId: string;
        address: Address;
        tokenId: string;
    };
    return { chainId: parseInt(chainId), address, tokenId };
};

export interface ProjectTokenData {
    readonly chainId: number;
    readonly address: Address;
    readonly tokenId: string;
    metadata?: TokenMetadata;
}
export const projectTokenDataZod = z.object({
    chainId: chainIdZod,
    address: addressZod,
    tokenId: uint256Zod,
    metadata: tokenMetadataZod.optional(),
});
export const projectTokenZod = projectTokenDataZod.merge(projectTokenIdParamsZod);

export const encodeProjectTokenData: (data: ProjectTokenData) => ProjectTokenData = projectTokenDataZod.parse;
export const encodeProjectTokenDataPartial: (data: Partial<ProjectTokenData>) => Partial<ProjectTokenData> =
    projectTokenDataZod.partial().parse;

export type ProjectToken = ProjectTokenId & ProjectTokenData;
//Generic interfaces for resource, useful for writing logic that works both in firebase admin/web
export type ProjectTokenResource = FirebaseResource<FirestoreSDK, ProjectTokenData, ProjectTokenId>;
//Generic interfaces for read resource, and group read resource (for subcollections)
export type ProjectTokenQueryResource = FirebaseQueryResource<FirestoreSDK, ProjectTokenData, ProjectTokenId>;
export type ProjectTokenGroupQueryResource = FirebaseQueryResource<
    FirestoreSDK,
    ProjectTokenData,
    ProjectTokenId,
    ProjectId,
    ProjectTokenData,
    ProjectTokenData,
    Query<FirestoreSDK, ProjectTokenData>
>;

//Check zod validator matches interface
expectType<TypeOf<ProjectTokenData, z.input<typeof projectTokenDataZod>>>(true);
expectType<TypeOf<ProjectTokenData, z.output<typeof projectTokenDataZod>>>(true);
