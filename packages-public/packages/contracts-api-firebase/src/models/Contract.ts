import { addressZod } from "@owlprotocol/zod-sol";
import { DeploymentMethod } from "./DeploymentMethod.js";
import { RelayMethod } from "./RelayMethod.js";

export interface ContractId {
    readonly networkId: string;
    readonly address: string;
}

export function getContractId({ networkId, address }: ContractId): string {
    return [networkId, address].join("-");
}

export function getContractIdParams(id: string): ContractId {
    const [networkId, address] = id.split("-");
    return { networkId, address };
}

export function validateContractId({ networkId, address }: ContractId): ContractId {
    return { networkId, address: addressZod.parse(address) };
}

export interface Contract extends ContractId {
    /** Blockchain Data */
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
    readonly createdAt: number;
}
