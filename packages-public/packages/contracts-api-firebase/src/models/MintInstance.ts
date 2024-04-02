export interface MintInstanceData {
    networkId: string;
    address: string;
    lazyMintId?: string;
    projectId: string;
    receiver: string;
    receiverAddress: string;
    tokenId: string;
    amount?: string;
}

export interface MintInstance extends MintInstanceData {
    id: string;
}
