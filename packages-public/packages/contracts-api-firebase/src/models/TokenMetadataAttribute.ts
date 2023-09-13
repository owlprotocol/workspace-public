/**
 * Token attributes/properties as documented
 *  by OpenSea https://docs.opensea.io/docs/metadata-standards
 *  by EIP1155 https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema
 *  by Lens Protocol https://docs.lens.xyz/docs/metadata-standards
 */
export interface TokenMetadataAttribute {
    /** Name of attribute */
    readonly trait_type?: string;
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
}
