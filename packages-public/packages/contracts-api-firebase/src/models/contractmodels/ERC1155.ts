/** ERC1155 id components */
export interface ERC1155Id {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    readonly address: string;
    readonly id: string;
}
export interface ERC1155Metadata {
    readonly name?: string;
    readonly image?: string;
    [k: string]: any;
}

export interface ERC1155 extends ERC1155Id {
    readonly name?: string;
    readonly totalSupply?: string;
    readonly uri?: string;
    readonly metadata?: ERC1155Metadata;
    readonly dna?: string;
    //Client-side computed
    readonly dnaMetadata?: ERC1155Metadata;
}

export function getERC1155Id({ networkId, address, id }: ERC1155Id): string {
    return [networkId, address, id].join("-");
}

export function getERC1155IdParams(id: string): ERC1155Id {
    const [networkId, address, tokenId] = id.split("-");
    return {
        networkId,
        address,
        id: tokenId,
    };
}
