import {
    RpcGetUserOperationReceiptReturnType07,
    createRequestGetUserOperationReceipt,
} from "@owlprotocol/contracts-account-abstraction/eip1193";
import { ethUserOpReceiptResource } from "@owlprotocol/eth-firebase/admin";
import { BundlerRpcSchema, EIP1193Parameters, EIP1193RequestFn, hexToNumber, PublicRpcSchema } from "viem";

export function createRequestGetUserOperationReceiptWithFirebase(request: EIP1193RequestFn<PublicRpcSchema>) {
    const requestGetUserOperationReceipt = createRequestGetUserOperationReceipt(request);

    return async function (
        args: EIP1193Parameters<BundlerRpcSchema> & { method: "eth_getUserOperationReceipt" },
    ): Promise<RpcGetUserOperationReceiptReturnType07> {
        const [hash] = args.params;
        const chainId = await request({ method: "eth_chainId" });

        const result = await requestGetUserOperationReceipt(args);
        if (!result) return result;

        const { receipt, logs } = result;

        const ethUserOpReceipt = {
            ...result,
            chainId: hexToNumber(chainId),
            transactionHash: receipt.transactionHash,
            blockNumber: receipt.blockNumber,
            blockHash: receipt.blockHash,
            logIds: logs.map((l) => {
                return { blockHash: l.blockHash, logIndex: hexToNumber(l.logIndex) };
            }),
            userOpHash: hash,
        };
        ethUserOpReceiptResource.set(ethUserOpReceipt);

        return result;
    };
}
