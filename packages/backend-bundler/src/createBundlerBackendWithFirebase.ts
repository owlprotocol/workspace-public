import { ethUserOpResource } from "@owlprotocol/eth-firebase/admin";
import { numberToHex } from "viem";
import {
    OnSendUserOperation,
    OnGetUserOperationByHash,
    OnGetUserOperationReceipt,
    BundlerBackendConfig,
    createBundlerBackend,
} from "./createBundlerBackend.js";

export function createBundlerBackendWithFirebase(parameters: BundlerBackendConfig) {
    return createBundlerBackend({
        ...parameters,
        onSendUserOperation,
        onGetUserOperationByHash,
        onGetUserOperationReceipt,
    });
}

export const onSendUserOperation: OnSendUserOperation = ({ chainId, userOpHash, userOp }) => {
    return ethUserOpResource.upsert({
        chainId,
        userOpHash,
        ...userOp,
    });
};

export const onGetUserOperationByHash: OnGetUserOperationByHash = ({ chainId, userOpHash, userOp, transaction }) => {
    return ethUserOpResource.upsert({
        chainId,
        userOpHash,
        transactionHash: transaction.hash,
        blockHash: transaction.blockHash ?? "0x",
        blockNumber: numberToHex(transaction.blockNumber ?? 0n),
        ...userOp,
    });
};

export const onGetUserOperationReceipt: OnGetUserOperationReceipt = ({
    chainId,
    userOpHash,
    userOpEvent,
    logs,
    receipt,
}) => {
    return ethUserOpResource.set(
        {
            chainId,
            userOpHash,
            transactionHash: receipt.transactionHash,
            actualGasUsed: numberToHex(userOpEvent.args.actualGasUsed),
            actualGasCost: numberToHex(userOpEvent.args.actualGasCost),
            success: userOpEvent.args.success,
            logIds: logs.map((l) => {
                return { blockHash: l.blockHash, logIndex: parseInt(l.logIndex) };
            }),
        },
        { merge: true },
    );
};
