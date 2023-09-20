import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import { tokenMetadataAttributeZod } from "./TokenMetadataAttribute.js";
import type { TokenMetadataLocalization, TokenMetadata } from "../models/TokenMetadata.js";

export const tokenMetadataLocalizationZod = z
    .object({
        uri: z.string().describe("localization uri formattable string with {locale} parameter").optional(),
        default: z.string().describe("default localization").optional(),
        locales: z.array(z.string()).optional().describe("localization options"),
    })
    .describe("localization")
    .passthrough();

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//Check zod validator matches interface
type TokenMetadataLocalizationZodInferred = {
    [P in keyof z.infer<typeof tokenMetadataLocalizationZod>]: z.infer<typeof tokenMetadataLocalizationZod>[P];
};

expectType<TypeEqual<TokenMetadataLocalizationZodInferred, TokenMetadataLocalization>>(true);

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
        properties: z.record(tokenMetadataAttributeZod).describe("Item properties as key-value").optional(),
        localization: tokenMetadataLocalizationZod.optional(),
    })
    .describe("metadata of a single token")
    .passthrough();

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//Check zod validator matches interface
type TokenMetadataZodInferred = Readonly<z.infer<typeof tokenMetadataZod>>;
expectType<TypeEqual<Omit<TokenMetadata, "localization">, Omit<TokenMetadataZodInferred, "localization">>>(true);
