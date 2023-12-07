import { addressZod } from "@owlprotocol/zod-sol";
import {
    TokenDNAContractType,
    TokenMetadataType,
    TokenRoyaltyContractType,
    TokenURIContractType,
} from "./Collection.js";
import { TokenMetadata } from "./index.js";

export interface LoyaltyProgramId {
    readonly networkId: string;
    readonly address: string;
}

export function getLoyaltyProgramId({ networkId, address }: LoyaltyProgramId): string {
    return [networkId, address].join("-");
}

export function getLoyaltyProgramIdParams(id: string): LoyaltyProgramId {
    const [networkId, address] = id.split("-");
    return { networkId, address };
}

export function validateLoyaltyProgramId({ networkId, address }: LoyaltyProgramId): LoyaltyProgramId {
    return { networkId, address: addressZod.parse(address) };
}

export interface LoyaltyTier {
    name: string;
    metadata: TokenMetadata;
    pointsThreshold: number;
}

export interface LoyaltyProgram extends LoyaltyProgramId {
    /** Blockchain Data */
    readonly contractTx?: string;
    /** User Data */
    readonly name: string;
    readonly owner: string;
    readonly projectId?: string;
    readonly createdAt: number;
    readonly metadataType: TokenMetadataType;
    readonly uriType?: TokenURIContractType;
    readonly royaltyType?: TokenRoyaltyContractType;
    readonly dnaType?: TokenDNAContractType;
    readonly uriAddress?: string;
    readonly royaltyAddress?: string;
    readonly dnaAddress?: string;
    readonly tiers: LoyaltyTier[];
}
