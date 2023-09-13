import { addressZod } from "@owlprotocol/zod-sol";
import { z } from "zod";

export enum RelayMethod {
    SAFE = "SAFE",
}

//Generate factories
export enum DeploymentMethod {
    /* Regular deterministic deployment */
    DETERMINISTIC = "DETERMINISTIC",
    /* Minimal proxy deployment, reduces upfront gas cost */
    ERC1167 = "ERC1167",
    /* Beacon proxy deployment, upgradeable, uses Owl Protocol default beacons */
    BEACON_OWL = "BEACON_OWL",
    /* Beacon proxy deployment, upgradeable, uses existing beacon */
    BEACON_EXISTING = "BEACON_EXISTING",
    /* Beacon proxy deployment, upgradeable, deploys new beacon */
    BEACON_NEW = "BEACON_NEW",
}

export interface Contract {
    readonly address: string;
    readonly contractName: string;
    readonly networkId: string;
    readonly contractParams?: any;
    readonly deployParams?: {
        readonly msgSender: string;
        readonly salt: string;
        readonly deploymentMethod: DeploymentMethod;
        readonly beaconAddress?: string;
    };
    readonly contractTx?: string;
    readonly relay?: RelayMethod;
    // A user's document id
    readonly owner: string;
}

export const contractZod = z.object({
    address: addressZod.describe("The address of the deployed contract"),
    contractName: z.string().describe("The name of the contract deployed"),
    networkId: z.string().describe("The id of the network that the contract is deployed on"),
    owner: z.string().describe("The owner's user id"),
});
