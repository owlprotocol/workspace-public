import { CollectionContractType } from "./Collection.js";

export interface LazyMintInstanceData {
    networkId: string;
    address: string;
    lazyMintId: string;
    projectId: string;
    receiver: string;
    receiverAddress: string;
    tokenId: string;
    amount?: string;
    collectionContractType: CollectionContractType;
}

export interface LazyMintInstance extends LazyMintInstanceData {
    id: string;
}
