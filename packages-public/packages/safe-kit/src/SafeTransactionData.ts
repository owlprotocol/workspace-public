import { Interface } from "@ethersproject/abi";
import { arrayify } from "@ethersproject/bytes";
import { pack as solidityPack } from "@ethersproject/solidity";
//TODO: Remove web3-utils dependency
import { hexToNumber, hexToNumberString, toChecksumAddress } from "web3-utils";
import { constants } from "ethers";
import type { Provider } from "@ethersproject/providers";
import { estimateGas } from "./utils/gas.js";
import {
    MetaTransactionData,
    OperationType,
    SafeTransactionData,
    SafeTransactionDataPartial,
} from "./types/SafeTransactionData.js";

export function standardizeMetaTransactionData(tx: SafeTransactionDataPartial): MetaTransactionData {
    const standardizedTxs: MetaTransactionData = {
        ...tx,
        operation: tx.operation ?? OperationType.Call,
    };
    return standardizedTxs;
}

export type StandardizeSafeTransactionDataProps = {
    readonly provider: Provider;
    readonly safeAddress: string;
    readonly tx: SafeTransactionDataPartial;
    readonly nonce: number;
    /** Whether gas computation required (default: false).
     * If no gas value is specified & gasRequired, we use estimateGas to get gas expense of tx. */
    readonly gasRequired?: boolean;
    /** Gas estimator contract. Only required if gasRequired = true and tx.gas === 0 */
    readonly simulateTxAccessorAddress?: string;
};

/**
 * @dev Standardises partial tx data by estimating gas and getting current nonce if not specified
 * @param param0
 * @returns
 */
export async function standardizeSafeTransactionData({
    provider,
    safeAddress,
    tx,
    nonce,
    gasRequired,
    simulateTxAccessorAddress,
}: StandardizeSafeTransactionDataProps): Promise<SafeTransactionData> {
    const standardizedTxs = {
        to: tx.to,
        value: tx.value,
        data: tx.data,
        operation: tx.operation ?? OperationType.Call,
        baseGas: tx.baseGas ?? "0",
        gasPrice: tx.gasPrice ?? "0",
        gasToken: tx.gasToken || constants.AddressZero,
        refundReceiver: tx.refundReceiver || constants.AddressZero,
        nonce,
    };

    if (tx.safeTxGas !== undefined) {
        return {
            ...standardizedTxs,
            safeTxGas: tx.safeTxGas,
        };
    }

    //const hasSafeTxGasOptional = hasSafeFeature(SAFE_FEATURES.SAFE_TX_GAS_OPTIONAL, safeVersion);
    // >= v1.3.0 only => has optional gas
    if (!gasRequired && standardizedTxs.gasPrice === "0") {
        return {
            ...standardizedTxs,
            safeTxGas: "0",
        };
    }

    if (!simulateTxAccessorAddress) {
        throw new Error(`gasRequired ${gasRequired} but simulateTxAccessorAddress ${simulateTxAccessorAddress}`);
    }

    const safeTxGas = await estimateGas(
        provider,
        safeAddress,
        simulateTxAccessorAddress,
        standardizedTxs.to,
        standardizedTxs.value,
        standardizedTxs.data,
        standardizedTxs.operation,
    );

    return {
        ...standardizedTxs,
        safeTxGas,
    };
}

function encodeMetaTransaction(tx: MetaTransactionData): string {
    const data = arrayify(tx.data);
    const encoded = solidityPack(
        ["uint8", "address", "uint256", "uint256", "bytes"],
        [tx.operation, tx.to, tx.value, data.length, data],
    );
    return encoded.slice(2);
}

export function encodeMultiSendData(txs: MetaTransactionData[]): string {
    return "0x" + txs.map((tx) => encodeMetaTransaction(tx)).join("");
}

export function decodeMultiSendData(encodedData: string): MetaTransactionData[] {
    const multiSendInterface = new Interface(["function multiSend(bytes memory transactions) public payable"]);
    const [decodedData] = multiSendInterface.decodeFunctionData("multiSend", encodedData);

    const txs: MetaTransactionData[] = [];

    // Decode after 0x
    let index = 2;

    while (index < decodedData.length) {
        // As we are decoding hex encoded bytes calldata, each byte is represented by 2 chars
        // uint8 operation, address to, value uint256, dataLength uint256

        const operation = `0x${decodedData.slice(index, (index += 2))}`;
        const to = `0x${decodedData.slice(index, (index += 40))}`;
        const value = `0x${decodedData.slice(index, (index += 64))}`;
        const dataLength = parseInt(decodedData.slice(index, (index += 64)), 16) * 2;
        const data = `0x${decodedData.slice(index, (index += dataLength))}`;

        txs.push({
            operation: hexToNumber(operation) as OperationType,
            to: toChecksumAddress(to),
            value: hexToNumberString(value),
            data,
        });
    }

    return txs;
}
