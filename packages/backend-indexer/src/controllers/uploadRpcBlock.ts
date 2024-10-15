import {
    ethTransactionResource,
    ethBlockResource,
    TransactionEncoded,
    BlockEncoded,
} from "@owlprotocol/eth-firebase/admin";
import { Hash, RpcBlock } from "viem";

export function rpcBlockToIndexedModel(blockRpc: RpcBlock<"safe">) {
    const transactions: TransactionEncoded[] = [];
    let block: BlockEncoded;

    if (blockRpc.transactions.length > 0) {
        if (typeof blockRpc.transactions[0] === "string") {
            //no transaction objects
            block = blockRpc as RpcBlock<"safe", false>;
        } else {
            block = {
                ...(blockRpc as RpcBlock<"safe", true>),
                transactions: (blockRpc as RpcBlock<"safe", true>).transactions.map((t: { hash: Hash }) => t.hash),
            };
        }
    } else {
        block = blockRpc as RpcBlock<"safe", false>;
    }

    return { block, transactions };
}

export function uploadRpcBlock(chainId: number, blockRpc: RpcBlock<"safe">) {
    const { block, transactions } = rpcBlockToIndexedModel(blockRpc);
    if (transactions.length > 0) {
        return Promise.all([
            ethTransactionResource.upsertBatch(
                transactions.map((t) => {
                    return { ...t, chainId } as any;
                }),
            ),
            ethBlockResource.upsert({
                ...block,
                chainId,
            }),
        ]);
    } else {
        return ethBlockResource.upsert({
            ...block,
            chainId,
        });
    }
}
