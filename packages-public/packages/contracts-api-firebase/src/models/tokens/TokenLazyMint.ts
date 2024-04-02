/** Lazy mint data, store Token (ERC721/ERC1155) mint information without minting on-chain */
export interface TokenLazyMintReadOnlyData {
    readonly owner: string;
    readonly networkId: string;
    readonly tokenAddress: string;
    readonly tokenId: string;
    readonly tokenAmount: string;
    readonly to: string;
    readonly status: "created" | "mintPending" | "mintConfirmed";
}

export interface TokenLazyMintReadOnly extends TokenLazyMintReadOnlyData {
    readonly id: string;
}
