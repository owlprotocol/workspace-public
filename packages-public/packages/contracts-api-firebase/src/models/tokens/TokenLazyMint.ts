/** Lazy mint data, store Token (ERC721/ERC1155) mint information without minting on-chain */
export interface TokenLazyMintReadOnly {
    readonly id: string;
    readonly owner: string;
    readonly networkId: string;
    readonly tokenAddress: string;
    readonly tokenId: string;
    readonly tokenAmount: string;
    readonly to: string;
    readonly status: "created" | "mintPending" | "mintConfirmed";
}
