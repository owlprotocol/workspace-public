import { DeploymentMethod } from "./DeploymentMethod.js";
import { RelayMethod } from "./RelayMethod.js";

export interface Contract {
    readonly id: string;
    /** Blockchain Data */
    readonly networkId: string;
    readonly address: string;
    readonly contractTx?: string;
    readonly relay?: RelayMethod;
    readonly contractParams?: any;
    readonly deployParams?: {
        msgSender: string;
        salt: string;
        deploymentMethod: DeploymentMethod;
        beaconAddress?: string | undefined;
    };
    /** User Data */
    readonly contractName: string;
    readonly owner: string;
    readonly projectId?: string;
}
