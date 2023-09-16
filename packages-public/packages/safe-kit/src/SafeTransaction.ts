import { Signer, TypedDataSigner } from "@ethersproject/abstract-signer";
import { MultiSend__factory, SafeL2__factory } from "@owlprotocol/contracts/typechain/ethers";
import { Provider } from "@ethersproject/providers";
import {
    encodeMultiSendData,
    standardizeMetaTransactionData,
    standardizeSafeTransactionData,
} from "./SafeTransactionData.js";
import { generateEIP712Signature, SafeTransactionEIP712Args } from "./utils/eip712.js";
import { MetaTransactionData, OperationType, SafeTransactionDataPartial } from "./types/SafeTransactionData.js";
import { defaultSafeCoreContractAddresses } from "./types/SafeCoreContracts.js";
import { SafeSignature } from "./types/SafeSignature.js";
import { SafeTransaction, SafeTransactionOptionalProps, isMetaTransactionArray } from "./types/SafeTransaction.js";

/**
 * Returns new safe transaction with added signature
 * @param tx
 * @param signature
 * @returns
 */
export function addSignature(tx: SafeTransaction, signature: SafeSignature): SafeTransaction {
    return {
        data: tx.data,
        signatures: {
            ...tx.signatures,
            [signature.signer.toLowerCase()]: signature.data,
        },
    };
}

/**
 * Concatenates all signatures as one, signers addresses are sorted
 * @param tx
 * @returns
 */
export function encodedSignatures(tx: SafeTransaction): string {
    const signers = Array.from(Object.keys(tx.signatures)).sort();
    return (
        "0x" +
        signers
            .map((signerAddress) => {
                //slice(2) to remove 0x prefix
                return tx.signatures[signerAddress].slice(2);
            })
            .join("")
    );
}

/**
 * @dev Create partial safe transaction data from safe tx or meta transaction array
 * @param safeTransactionData tx or meta tx array
 * @param multiSendAddress multisend or multisendCallOnly contract
 * @param options additional options override transaction (eg. nonce, gas)
 * @throws "Invalid empty array of transactions"
 */
export function createSafeTransactionDataPartial(
    safeTransactionData: SafeTransactionDataPartial | MetaTransactionData[],
    { multiSendAddress } = {
        multiSendAddress: defaultSafeCoreContractAddresses.multiSendAddress,
    },
    options?: SafeTransactionOptionalProps,
): SafeTransactionDataPartial {
    //Check if empty meta transaction array
    if (isMetaTransactionArray(safeTransactionData) && safeTransactionData.length === 0) {
        throw new Error("Invalid empty array of transactions");
    }

    if (isMetaTransactionArray(safeTransactionData) && safeTransactionData.length > 1) {
        //Meta transaction with > 1 tx, encode batch of transactions
        const multiSendData = encodeMultiSendData(safeTransactionData.map(standardizeMetaTransactionData));
        return {
            to: multiSendAddress,
            value: "0",
            data: MultiSend__factory.createInterface().encodeFunctionData("multiSend", [multiSendData]),
            operation: OperationType.DelegateCall,
            ...options,
        };
    } else if (isMetaTransactionArray(safeTransactionData)) {
        //Meta transaction array with 1
        return { ...safeTransactionData[0], ...options };
    } else {
        return { ...safeTransactionData, ...options };
    }
}

/**
 * @dev Create safe transaction from safe tx or meta transaction array
 * @param provider
 * @param safeAddress
 * @param safeTransactionData tx or meta tx array
 * @param multiSendAddress multisend or multisendCallOnly contract
 */
export async function createSafeTransaction(
    provider: Provider,
    safeAddress: string,
    safeTransactionData: SafeTransactionDataPartial | MetaTransactionData[],
    nonce: number,
    { multiSendAddress: multiSendAddress } = {
        multiSendAddress: defaultSafeCoreContractAddresses.multiSendAddress,
    },
    options?: SafeTransactionOptionalProps,
    gasRequired?: boolean,
): Promise<SafeTransaction> {
    const txDataPartial = createSafeTransactionDataPartial(safeTransactionData, { multiSendAddress }, options);
    const data = await standardizeSafeTransactionData({
        provider,
        safeAddress,
        tx: txDataPartial,
        nonce,
        gasRequired,
    });

    return {
        data,
        signatures: {},
    };
}

/**
 * @dev Returns a Safe transaction data ready to invalidate the pending Safe transaction/s with a specific nonce.
 *
 * @param nonce - The nonce of the transaction/s that are going to be rejected
 * @returns The Safe transaction that invalidates the pending Safe transaction/s
 */
export async function createRejectionTransaction(
    provider: Provider,
    safeAddress: string,
    nonce: number,
    { multiSendAddress: multiSendAddress } = {
        multiSendAddress: defaultSafeCoreContractAddresses.multiSendAddress,
    },
    options?: SafeTransactionOptionalProps,
    gasRequired?: boolean,
): Promise<SafeTransaction> {
    const safeTransactionData: SafeTransactionDataPartial = {
        to: safeAddress,
        value: "0",
        data: "0x",
        safeTxGas: "0",
    };
    return createSafeTransaction(
        provider,
        safeAddress,
        safeTransactionData,
        nonce,
        { multiSendAddress },
        options,
        gasRequired,
    );
}

/**
 * //TODO: Seems like some hacks for Metamask with Ledger needed adjustVInSignature
 * @dev Sign safe transaction with eth_signTypedData_v4. No checks on if owners are correct
 * @param chainId
 * @param safeAddress
 * @param safeTransaction
 * @param signer
 */
export async function signSafeTransaction(
    chainId: number,
    safeAddress: string,
    safeTransaction: SafeTransaction,
    signer: Signer & TypedDataSigner,
): Promise<SafeTransaction> {
    const safeTransactionEIP712Args: SafeTransactionEIP712Args = {
        safeAddress: safeAddress,
        chainId,
        safeTransactionData: safeTransaction.data,
    };

    const signature = await generateEIP712Signature(signer, safeTransactionEIP712Args);

    return addSignature(safeTransaction, signature);
}

export async function validateSafeTransactionSignatureThreshold(
    safeTransaction: SafeTransaction,
    owners: string[],
    threshold: number,
) {
    const signers = Object.keys(safeTransaction.signatures);
    signers.forEach((s) => {
        if (!owners.includes(s)) throw new Error(`Signature from ${s} not in owners ${JSON.stringify(owners)}`);
    });

    //TODO: Check threshold
    if (threshold > signers.length) {
        const signaturesMissing = threshold - signers.length;
        throw new Error(
            `There ${signaturesMissing > 1 ? "are" : "is"} ${signaturesMissing} signature${
                signaturesMissing > 1 ? "s" : ""
            } missing`,
        );
    }

    //TODO: Validate signatures?
}

export function encodeExecuteTransaction(safeTransaction: SafeTransaction): string {
    return SafeL2__factory.createInterface().encodeFunctionData("execTransaction", [
        safeTransaction.data.to,
        safeTransaction.data.value,
        safeTransaction.data.data,
        safeTransaction.data.operation,
        safeTransaction.data.safeTxGas,
        safeTransaction.data.baseGas,
        safeTransaction.data.gasPrice,
        safeTransaction.data.gasToken,
        safeTransaction.data.refundReceiver,
        encodedSignatures(safeTransaction),
    ]);
}

export function createExecuteTransaction(
    safeAddress: string,
    safeTransaction: SafeTransaction,
): { to: string; data: string } {
    const data = encodeExecuteTransaction(safeTransaction);
    return { to: safeAddress, data };
}
