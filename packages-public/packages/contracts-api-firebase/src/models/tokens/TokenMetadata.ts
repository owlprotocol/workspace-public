import { TokenMetadataAttribute } from "./TokenMetadataAttribute.js";

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
     * Asset properties as recommended by ERC1155 standard https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema
     */
    readonly properties?: {
        [property: string]: TokenMetadataAttribute;
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
