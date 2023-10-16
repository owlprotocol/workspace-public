/** Public Address Book (ENS) */

import { addressZod } from "@owlprotocol/zod-sol";

export interface AddressPublicId {
    readonly networkId: string;
    readonly address: string;
}

export function getAddressPublicId({ networkId, address }: AddressPublicId): string {
    return [networkId, address].join("-");
}

export function getAddressPublicIdParams(id: string): AddressPublicId {
    const [networkId, address] = id.split("-");
    return { networkId, address };
}

export function validateAddressPublicId({ networkId, address }: AddressPublicId): AddressPublicId {
    return { networkId, address: addressZod.parse(address) };
}

export interface AddressPublic extends AddressPublicId {
    readonly ens?: string;
}

/** Personal Address Book for keeping track of addresses such as EOAs or Contracts */
export interface AddressPersonalId {
    readonly networkId: string;
    readonly address: string;
    readonly owner: string;
}

export function getAddressPersonalId({ networkId, address, owner }: AddressPersonalId): string {
    return [networkId, address, owner].join("-");
}

export function getAddressPersonalIdParams(id: string): AddressPersonalId {
    const [networkId, address, owner] = id.split("-");
    return { networkId, address, owner };
}

export function validateAddressPersonalId({ networkId, address, owner }: AddressPersonalId): AddressPersonalId {
    return { networkId, address: addressZod.parse(address), owner };
}

export interface AddressPersonal extends AddressPersonalId {
    /** User-friendly name */
    readonly name: string;
}
