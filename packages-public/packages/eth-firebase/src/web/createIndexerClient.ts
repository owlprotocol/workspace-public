import { Transport, Chain, PublicClientConfig, PublicClient } from "viem";
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
} from "./resources.js";
import { createIndexerPublicClientForSdk } from "../createIndexerClient.js";

export function createIndexerPublicClient<transport extends Transport, chain extends Chain | undefined = undefined>(
    parameters: PublicClientConfig<transport, chain>,
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
