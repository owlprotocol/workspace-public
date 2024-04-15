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
} from "@owlprotocol/eth-firebase/web";
import { createIndexerPublicClientForSdk, createIndexeEIP1193RequestForSdk } from "../createIndexerClient.js";

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
