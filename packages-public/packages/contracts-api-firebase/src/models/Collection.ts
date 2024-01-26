import { addressZod } from "@owlprotocol/zod-sol";

export interface CollectionId {
    readonly networkId: string;
    readonly address: string;
}

export function getCollectionId({ networkId, address }: CollectionId): string {
    return [networkId, address].join("-");
}

export function getCollectionIdParams(id: string): CollectionId {
    const [networkId, address] = id.split("-");
    return { networkId, address };
}

export function validateCollectionId({ networkId, address }: CollectionId): CollectionId {
    return { networkId, address: addressZod.parse(address) };
}

export enum CollectionContractType {
    /** Default. ERC721 with auto id incrementer. */
    ERC721AutoId = "ERC721AutoId",
    /** ERC721 with id parameter given at mint. */
    //ERC721 = "ERC721",
    /** ERC1155 */
    ERC1155 = "ERC1155",
    /** Alias for ERC721AutoId */
    SINGLE = "SINGLE",
    /** Alias for ERC1155 */
    MULTIPLE = "MULTIPLE",
}

/** General enum config param. Sets default for all other enums. */
export enum TokenMetadataType {
    OFFCHAIN = "OFFCHAIN",
    ONCHAIN = "ONCHAIN",
}

/** Type of contract to provide metadata */
export enum TokenURIContractType {
    /** Default. Can be used by ERC721/ERC1155. Metadata endpoint concatenated with token id. */
    TOKEN_URI_BASE = "TOKEN_URI_BASE",
    /* TokenDnaContractType != NONE */
    TOKEN_URI_DNA = "TOKEN_URI_DNA",
}

/** Type of contract to provide royalty info. Not necessarily enforced by marketplaces */
export enum TokenRoyaltyContractType {
    /** Regular ERC2981 compatible royalty contract */
    ERC2981 = "ERC2981",
    /** TODO: Requires implementation */
    //ERC2981DecliningTime = "ERC2981DecliningTimeGlobal",
    //ERC2981DecliningPostTransfer = "ERC2981DecliningPostTransfer",
    //ERC2981DecliningTimePostTransfer = "ERC2981DecliningTimePostTransfer",
}

/** Type of contract to store onchain data */
export enum TokenDNAContractType {
    /** Default. No on-chain data */
    NONE = "NONE",
    /** Stores on-chain data */
    TOKEN_DNA = "TOKEN_DNA",
    /** TODO: Requires implementation */
    //TOKEN_DNA_6651 = "TOKEN_DNA_6651",
}

export interface Collection extends CollectionId {
    /** Blockchain Data */
    readonly contractTx?: string;
    /** User Data */
    readonly collectionName: string;
    readonly owner?: string;
    readonly projectId: string;
    readonly createdAt: number;
    readonly collectionContractType: CollectionContractType;
    readonly collectionMetadataType: TokenMetadataType;
    readonly uriType?: TokenURIContractType;
    readonly royaltyType?: TokenRoyaltyContractType;
    readonly dnaType?: TokenDNAContractType;
    readonly uriAddress?: string;
    readonly royaltyAddress?: string;
    readonly dnaAddress?: string;
}
