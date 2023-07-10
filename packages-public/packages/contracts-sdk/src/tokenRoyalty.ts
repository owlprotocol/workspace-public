import { UnsignedTransaction, providers } from "ethers";
import { Ethers } from "@owlprotocol/contracts"

export enum TokenRoyaltyContractType {
    ERC2981 = "ERC2981",
}

export enum DeploymentMethod {
    REGULAR = "REGULAR",
    BEACON_OWL = "BEACON_OWL",
    BEACON_EXISTING = "BEACON_EXISTING",
    BEACON_NEW = "BEACON_NEW"
}

export interface DeployTokenRoyaltyContractArgs {
    /** Deployment Method (default to BEACON_OWL) */
    readonly deploymentMethod?: DeploymentMethod
    /** Beacon Address (required if BEACON_EXISTING) */
    readonly beaconAddress?: string
    /** Admin address */
    readonly admin: string
    /** TokenRoyalty Contract Type (default: ERC2981) */
    readonly tokenRoyaltyContractType?: TokenRoyaltyContractType
    /** ERC2981 TokenRoyalty amount as % */
    readonly royaltyAmount?: number,
    /** ERC2981 TokenRoyalty receiver */
    readonly royaltyAddress?: string,
    /** NFT Contract to configure */
    readonly nftContractAddress?: string,
}

export async function deployTokenRoyaltyContract(provider: providers.Provider, {
    admin,
    tokenRoyaltyContractType,
    royaltyAmount,
    royaltyAddress,
    nftContractAddress,
}: DeployTokenRoyaltyContractArgs): Promise<UnsignedTransaction[]> {

    Ethers.factories
    Ethers.ERC2981SetterFactory.getDeployTransaction

    throw new Error("Unimplemented")

    return []
}
