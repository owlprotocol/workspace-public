/** Public Address Book (ENS) */
export interface AddressPublic {
    readonly id: string;
    readonly networkId: string;
    readonly address: string;
    readonly ens?: string;
}

/** Personal Address Book for keeping track of addresses such as EOAs or Contracts */
export interface AddressPersonal {
    readonly id: string;
    readonly networkId: string;
    readonly address: string;
    readonly owner: string;
    /** User-friendly name */
    readonly name: string;
}
