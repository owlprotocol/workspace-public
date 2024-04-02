/** Safe setup configuration */
export interface SafeAccountConfig {
    /** Safe owners */
    readonly owners: string[];
    /** Safe signing threshold */
    readonly threshold: number;
    /**TODO: Is this the init callback address? */
    readonly to?: string;
    /**TODO: Is this the init call back data?  */
    readonly data?: string;
    /** For token based payment configuration? */
    readonly paymentToken?: string;
    readonly payment?: number;
    readonly paymentReceiver?: string;
}

export interface AddOwnerTxParams {
    /** ownerAddress - The address of the new owner */
    readonly ownerAddress: string;
    /** threshold - The new threshold */
    readonly threshold?: number;
}

export interface RemoveOwnerTxParams {
    /** ownerAddress - The address of the owner that will be removed */
    readonly ownerAddress: string;
    /** threshold - The new threshold */
    readonly threshold?: number;
}

export interface SwapOwnerTxParams {
    /** oldOwnerAddress - The old owner address */
    readonly oldOwnerAddress: string;
    /** newOwnerAddress - The new owner address */
    readonly newOwnerAddress: string;
}
