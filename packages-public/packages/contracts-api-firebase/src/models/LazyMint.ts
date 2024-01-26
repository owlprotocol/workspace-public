import { CollectionContractType } from "./Collection.js";

export interface LazyMintData {
    networkId: string;
    address: string;
    projectId: string;
    sponsor?: string;
    collectionContractType: CollectionContractType;
    tokenId?: string;
    amount?: string;
    maxRedeemable?: number;
    totalRedeemed: number;
}

export interface LazyMint extends LazyMintData {
    id: string;
}
