import { addSignature, encodedSignatures } from "./SafeTransaction.js";
import { SafeSignature } from "./types/SafeSignature.js";
import { SafeTransaction } from "./types/SafeTransaction.js";

/**
 * @dev Eth Safe Transaction that uses factory patter to create new safe transactions
 */
export class EthSafeTransaction implements SafeTransaction {
    readonly data: SafeTransaction["data"];
    readonly signatures: SafeTransaction["signatures"];

    private constructor(safeTransaction: SafeTransaction) {
        this.data = safeTransaction.data;
        this.signatures = safeTransaction.signatures;
    }

    static create(safeTransaction: SafeTransaction) {
        return new EthSafeTransaction(safeTransaction);
    }

    /**
     * No mutation! Returns a new EthSafeTransaction
     * @param signature
     * @returns
     */
    addSignature(signature: SafeSignature): EthSafeTransaction {
        return EthSafeTransaction.create(addSignature(this, signature));
    }

    encodedSignatures(): string {
        return encodedSignatures(this);
    }
}
