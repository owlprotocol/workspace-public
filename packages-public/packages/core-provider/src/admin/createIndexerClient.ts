import { Transport, Chain, PublicClientConfig, PublicClient, EIP1193RequestFn, PublicRpcSchema } from "viem";
import {
    erc1155BalanceResource,
    erc20AllowanceResource,
    erc20BalanceResource,
    erc721Resource,
    ethBlockResource,
    ethBytecodeResource,
    ethLogAbiResource,
    ethLogResource,
    ethTransactionReceiptResource,
    ethTransactionResource,
} from "@owlprotocol/eth-firebase/admin";
import { createIndexerPublicClientForSdk, createIndexeEIP1193RequestForSdk } from "../createIndexerClient.js";

export type PublicRpcMethod = Parameters<(typeof publicRpcMethods)["has"]>[0];

export const publicRpcMethods = new Set([
    "web3_clientVersion",
    "web3_sha3",
    "net_listening",
    "net_peerCount",
    "net_version",
    "eth_blobBaseFee",
    "eth_blockNumber",
    "eth_call",
    "eth_chainId",
    "eth_coinbase",
    "eth_estimateGas",
    "eth_feeHistory",
    "eth_gasPrice",
    "eth_getBalance",
    "eth_getBlockByHash",
    "eth_getBlockByNumber",
    "eth_getBlockTransactionCountByHash",
    "eth_getBlockTransactionCountByNumber",
    "eth_getCode",
    "eth_getFilterChanges",
    "eth_getFilterLogs",
    "eth_getLogs",
    "eth_getProof",
    "eth_getStorageAt",
    "eth_getTransactionByBlockHashAndIndex",
    "eth_getTransactionByBlockNumberAndIndex",
    "eth_getTransactionByHash",
    "eth_getTransactionCount",
    "eth_getTransactionReceipt",
    "eth_getUncleByBlockHashAndIndex",
    "eth_getUncleByBlockNumberAndIndex",
    "eth_getUncleCountByBlockHash",
    "eth_getUncleCountByBlockNumber",
    "eth_maxPriorityFeePerGas",
    "eth_newBlockFilter",
    "eth_newFilter",
    "eth_newPendingTransactionFilter",
    "eth_protocolVersion",
    "eth_sendRawTransaction",
    "eth_uninstallFilter",
] as const);

/**
 * Check if RPC method is for public client.
 * @param method
 * @returns true if public rpc method
 */
export function isPublicRpcMethod(method: string): method is PublicRpcMethod {
    return publicRpcMethods.has(method as any);
}

export function createIndexerPublicClient<transport extends Transport, chain extends Chain | undefined = undefined>(
    parameters: PublicClientConfig<transport, chain> & { chainId?: number },
): Promise<PublicClient<transport, chain>> {
    return createIndexerPublicClientForSdk(parameters, {
        block: ethBlockResource,
        transaction: ethTransactionResource,
        transactionReceipt: ethTransactionReceiptResource,
        log: ethLogResource,
        logAbi: ethLogAbiResource,
        bytecode: ethBytecodeResource,
        erc20Balance: erc20BalanceResource,
        erc20Allowance: erc20AllowanceResource,
        erc721: erc721Resource,
        erc1155Balance: erc1155BalanceResource,
    });
}

export function createIndexeEIP1193Request(parameters: {
    request: EIP1193RequestFn<PublicRpcSchema>;
    chain?: Chain;
    chainId?: number;
}): Promise<EIP1193RequestFn<PublicRpcSchema>> {
    return createIndexeEIP1193RequestForSdk(parameters, {
        block: ethBlockResource,
        transaction: ethTransactionResource,
        transactionReceipt: ethTransactionReceiptResource,
        log: ethLogResource,
        logAbi: ethLogAbiResource,
        bytecode: ethBytecodeResource,
        erc20Balance: erc20BalanceResource,
        erc20Allowance: erc20AllowanceResource,
        erc721: erc721Resource,
        erc1155Balance: erc1155BalanceResource,
    });
}
