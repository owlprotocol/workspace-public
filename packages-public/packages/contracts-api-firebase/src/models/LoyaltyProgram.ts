import {
    TokenDNAContractType,
    TokenMetadataType,
    TokenRoyaltyContractType,
    TokenURIContractType,
} from "./Collection.js";
import { TokenMetadata } from "./index.js";

export interface LoyaltyTier {
    metadata: TokenMetadata;
    pointsThreshold: number;
}

export interface LoyaltyProgramData {
    /** Blockchain Data */
    readonly networkId: string;
    readonly address: string;
    readonly contractTx?: string;
    /** User Data */
    readonly name: string;
    readonly projectId: string;
    readonly createdAt: number;
    readonly metadataType: TokenMetadataType;
    readonly uriType?: TokenURIContractType;
    readonly royaltyType?: TokenRoyaltyContractType;
    readonly dnaType?: TokenDNAContractType;
    readonly uriAddress?: string;
    readonly royaltyAddress?: string;
    readonly dnaAddress?: string;
    readonly tiers: Record<string, LoyaltyTier>;
}

export interface LoyaltyProgram extends LoyaltyProgramData {
    readonly id: string;
}
