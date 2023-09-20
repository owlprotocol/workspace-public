import { z } from "zod";
import { TypeEqual, expectType } from "ts-expect";
import { TokenMetadataAttribute } from "../models/TokenMetadataAttribute.js";

/**
 * Token attributes/properties as documented
 *  by OpenSea https://docs.opensea.io/docs/metadata-standards
 *  by EIP1155 https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema
 *  by Lens Protocol https://docs.lens.xyz/docs/metadata-standards
 */
export const tokenMetadataAttributeZod = z
    .object({
        name: z.string().describe("name of attribute").optional(),
        trait_type: z.string().describe("name of attribute").optional(),
        description: z.string().describe("description of attribute").optional(),
        value: z.any().describe("value of attribute").optional(),
        max_value: z.number().describe("max_value of attribute").optional(),
        display_type: z.string().describe("display type on marketplace").optional(),
        display_value: z.string().describe("display value of attribute").optional(),
    })
    .passthrough()
    .describe("token attribute metadata according to https://docs.opensea.io/docs/metadata-standards ");

//TODO: Explore using https://zod.dev/?id=readonly (enforces read-only with Object.freeze)
//Check zod validator matches interface
type TokenMetadataAttributeZodInferred = Readonly<z.infer<typeof tokenMetadataAttributeZod>>;
expectType<TypeEqual<TokenMetadataAttributeZodInferred, TokenMetadataAttribute>>(true);
