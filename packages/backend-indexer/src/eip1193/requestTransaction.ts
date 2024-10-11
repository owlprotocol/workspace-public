import { ethTransactionResource, TransactionEncoded } from "@owlprotocol/eth-firebase/admin";
import { EIP1193Parameters, EIP1193RequestFn, hexToNumber, PublicRpcSchema } from "viem";
import { isBlockTag } from "../controllers/isBlockTag.js";

export async function requestTransactionByHash(
    request: EIP1193RequestFn<PublicRpcSchema>,
    args: EIP1193Parameters<PublicRpcSchema> & { method: "eth_getTransactionByHash" },
    options?: any,
) {
    const chainId = hexToNumber(await request({ method: "eth_chainId" }));
    const [hash] = args.params;

    const transactionIndexed = await ethTransactionResource.getOrNullEncoded({ chainId, hash });
    if (transactionIndexed) {
        return transactionIndexed;
    }

    const transactionRpc = await request(args, options);

    if (transactionRpc && transactionRpc.blockHash) {
        //Update cache with confirmed tx only
        //TODO: Seems like need to await for write to confirm?
        await ethTransactionResource.upsert({ ...(transactionRpc as TransactionEncoded), chainId });
    }

    return transactionRpc;
}

export async function requestTransactionByBlockHashAndIndex(
    request: EIP1193RequestFn<PublicRpcSchema>,
    args: EIP1193Parameters<PublicRpcSchema> & { method: "eth_getTransactionByBlockHashAndIndex" },
    options?: any,
) {
    const chainId = hexToNumber(await request({ method: "eth_chainId" }));
    const [blockHash, transactionIndex] = args.params;

    const transactionIndexed = await ethTransactionResource.getWhereFirstEncoded({
        chainId,
        blockHash,
        transactionIndex,
    });
    if (transactionIndexed) {
        return transactionIndexed;
    }

    const transactionRpc = await request(args, options);

    if (transactionRpc && transactionRpc.blockHash) {
        //Update cache with confirmed tx only
        //TODO: Seems like need to await for write to confirm?
        await ethTransactionResource.upsert({ ...(transactionRpc as TransactionEncoded), chainId });
    }

    return transactionRpc;
}

export async function requestTransactionByBlockNumberAndIndex(
    request: EIP1193RequestFn<PublicRpcSchema>,
    args: EIP1193Parameters<PublicRpcSchema> & { method: "eth_getTransactionByBlockNumberAndIndex" },
    options?: any,
) {
    const chainId = hexToNumber(await request({ method: "eth_chainId" }));
    const [blockTagOrNumber, transactionIndex] = args.params;
    if (isBlockTag(blockTagOrNumber)) {
        return request(args, options);
    }

    const transactionIndexed = await ethTransactionResource.getWhereFirstEncoded({
        chainId,
        blockNumber: blockTagOrNumber,
        transactionIndex,
    });
    if (transactionIndexed) {
        return transactionIndexed;
    }

    const transactionRpc = await request(args, options);

    if (transactionRpc && transactionRpc.blockHash) {
        //Update cache with confirmed tx only
        //TODO: Seems like need to await for write to confirm?
        await ethTransactionResource.upsert({ ...(transactionRpc as TransactionEncoded), chainId });
    }

    return transactionRpc;
}
