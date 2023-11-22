import { addressZod } from "@owlprotocol/zod-sol";

/** ERC721 id components */
export interface ERC721Id {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    readonly address: string;
    readonly tokenId: string;
}

export interface ERC721Metadata {
    readonly name?: string;
    readonly image?: string;
    [k: string]: any;
}
export interface ERC721 extends ERC721Id {
    readonly owner?: string;
    readonly approved?: string;
    readonly name?: string;
    readonly totalSupply?: string;
    readonly tokenURI?: string;
    readonly metadata?: ERC721Metadata;
    //Client-side computed
    readonly dna?: string;
    readonly dnaMetadata?: ERC721Metadata;
}

export function getERC721Id({ networkId, address, tokenId }: ERC721Id): string {
    return [networkId, address, tokenId].join("-");
}

export function getERC721IdParams(id: string): ERC721Id {
    const [networkId, address, tokenId] = id.split("-");
    return {
        networkId,
        address,
        tokenId,
    };
}

export function validateERC721Id({ networkId, address, tokenId }: ERC721Id): ERC721Id {
    return { networkId, tokenId, address: addressZod.parse(address) };
}
