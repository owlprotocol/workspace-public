/** Represents signature by one of owners */
export interface SafeSignature {
    /** Signer address */
    readonly signer: string;
    /** Signature data */
    readonly data: string;
}
