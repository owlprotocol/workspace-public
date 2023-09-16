import { Signer, TypedDataSigner } from "@ethersproject/abstract-signer";
import { MultiSend__factory } from "@owlprotocol/contracts/typechain/ethers";
import type { SafeL2 } from "@owlprotocol/contracts/typechain/ethers";
import { Provider } from "@ethersproject/providers";
import { PopulatedTransaction } from "ethers";
import { encodeMultiSendData, standardizeMetaTransactionData, standardizeSafeTransactionData } from "./transactions.js";
import { generateEIP712Signature, SafeTransactionEIP712Args } from "./eip712.js";
import {
    addSignature,
    encodedSignatures,
    isMetaTransactionArray,
    MetaTransactionData,
    OperationType,
    SafeTransaction,
    SafeTransactionDataPartial,
    SafeTransactionOptionalProps,
} from "../types/SafeTransaction.js";
import { defaultSafeCoreContractAddresses } from "../types/SafeCoreContracts.js";

export interface CreateSafeTransactionProps {
    /** safeTransactionData - The transaction or transaction array to process */
    readonly safeTransactionData: SafeTransactionDataPartial | MetaTransactionData[];
    /** options - The transaction array optional properties */
    readonly options?: SafeTransactionOptionalProps;
    /** multiSendAddress */
    readonly multiSendAddress: string;
    /** onlyCalls - Forces the execution of the transaction array with MultiSendCallOnly contract */
    readonly onlyCalls?: boolean;
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
 * @dev Returns a Safe transaction data ready to invalidate the pending Safe transaction/s with a specific nonce.
 *
 * @param nonce - The nonce of the transaction/s that are going to be rejected
 * @returns The Safe transaction that invalidates the pending Safe transaction/s
 */
export function createRejectionTransactionDataPartial(safeAddress: string, nonce: number): SafeTransactionDataPartial {
    const safeTransactionData: SafeTransactionDataPartial = {
        to: safeAddress,
        nonce,
        value: "0",
        data: "0x",
        safeTxGas: "0",
    };
    return safeTransactionData;
}

/**
 * @dev Create safe transaction from safe tx or meta transaction array
 * @param provider
 * @param safeContract
 * @param safeTransactionData tx or meta tx array
 * @param multiSendAddress multisend or multisendCallOnly contract
 */
export async function createSafeTransaction(
    provider: Provider,
    safeContract: SafeL2,
    safeTransactionData: SafeTransactionDataPartial | MetaTransactionData[],
    { multiSendAddress: multiSendAddress } = {
        multiSendAddress: defaultSafeCoreContractAddresses.multiSendAddress,
    },
    options?: SafeTransactionOptionalProps,
    gasRequired?: boolean,
): Promise<SafeTransaction> {
    const txDataPartial = createSafeTransactionDataPartial(safeTransactionData, { multiSendAddress }, options);
    const data = await standardizeSafeTransactionData({ provider, safeContract, tx: txDataPartial, gasRequired });

    return {
        data,
        signatures: {},
    };
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

export async function populateExecuteTransaction(
    safeContract: SafeL2,
    safeTransaction: SafeTransaction,
): Promise<PopulatedTransaction> {
    return safeContract.populateTransaction.execTransaction(
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
    );
}
