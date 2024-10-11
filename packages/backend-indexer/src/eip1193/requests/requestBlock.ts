import { ethBlockResource, ethTransactionResource } from "@owlprotocol/eth-firebase/admin";
import { EIP1193Parameters, EIP1193RequestFn, hexToNumber, PublicRpcSchema, RpcBlock } from "viem";
import { uploadRpcBlock } from "../../controllers/uploadRpcBlock.js";
import { isBlockTag } from "../../controllers/isBlockTag.js";

export async function requestBlockByHash(
    request: EIP1193RequestFn<PublicRpcSchema>,
    args: EIP1193Parameters<PublicRpcSchema> & { method: "eth_getBlockByHash" },
    options?: any,
) {
    const chainId = hexToNumber(await request({ method: "eth_chainId" }));
    const [blockHash, includeTransactions] = args.params;

    const [blockIndexed, transactionsIndexed] = await Promise.all([
        ethBlockResource.getOrNullEncoded({ chainId, hash: blockHash }),
        //Fetch transaction objects if requested
        includeTransactions ? ethTransactionResource.getWhereEncoded({ chainId, blockHash }) : Promise.resolve([]),
    ]);

    if (blockIndexed && !includeTransactions) {
        //Block cached
        return blockIndexed;
    }

    if (blockIndexed && includeTransactions && blockIndexed.transactions.length === transactionsIndexed.length) {
        //Block cached & Transaction objects requested & Transactions cached
        return {
            ...blockIndexed,
            transactions: transactionsIndexed,
        };
    }

    const blockRpc = await request(args, options);

    if (blockRpc) {
        uploadRpcBlock(chainId, blockRpc as RpcBlock<"safe">);
    }
    return blockRpc;
}

export async function requestBlockByNumber(
    request: EIP1193RequestFn<PublicRpcSchema>,
    args: EIP1193Parameters<PublicRpcSchema> & { method: "eth_getBlockByNumber" },
    options?: any,
) {
    const [blockTagOrNumber, includeTransactions] = args.params;

    if (isBlockTag(blockTagOrNumber)) {
        return request(args, options);
    }

    const chainId = hexToNumber(await request({ method: "eth_chainId" }));

    const [blockIndexed, transactionsIndexed] = await Promise.all([
        ethBlockResource.getWhereFirstEncoded({ chainId, number: blockTagOrNumber }),
        //Fetch transaction objects if requested
        includeTransactions
            ? ethTransactionResource.getWhereEncoded({ chainId, blockNumber: blockTagOrNumber })
            : Promise.resolve([]),
    ]);

    if (blockIndexed && !includeTransactions) {
        //Block cached
        return blockIndexed;
    }

    if (blockIndexed && includeTransactions && blockIndexed.transactions.length === transactionsIndexed.length) {
        //Block cached & Transaction objects requested & Transactions cached
        return {
            ...blockIndexed,
            transactions: transactionsIndexed,
        };
    }

    const blockRpc = await request(args, options);

    if (blockRpc) {
        await uploadRpcBlock(chainId, blockRpc as RpcBlock<"safe">);
    }
    return blockRpc;
}
