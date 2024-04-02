/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Block,
    BlockTag,
    BlockWithTransactions,
    EventType,
    Filter,
    Listener,
    Log,
    Provider,
    TransactionReceipt,
    TransactionRequest,
    TransactionResponse,
} from "@ethersproject/abstract-provider";

import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { Network } from "@ethersproject/networks";
import { Deferrable, defineReadOnly } from "@ethersproject/properties";
import { API_TRPC_BASE_URL } from "@owlprotocol/envvars";

/*
 * OwlProvider is a basic Provider that only holds the chainId.
 * This provider should exclusively be used with the OwlSigner.
 * For now it only sufficiently implements getNetwork to support the OwlSigner.
 */
export class OwlProvider extends Provider {
    // @ts-expect-error
    readonly chainId: number;
    // @ts-expect-error
    readonly apiUrl: string;

    constructor(chainId: number, apiUrl = API_TRPC_BASE_URL) {
        super();
        defineReadOnly(this, "chainId", chainId);
        defineReadOnly(this, "apiUrl", apiUrl);
    }

    async getNetwork(): Promise<Network> {
        return {
            name: "Not implemented",
            chainId: this.chainId,
        };
    }

    getBlockNumber(): Promise<number> {
        throw new Error("Method not implemented.");
    }
    getGasPrice(): Promise<BigNumber> {
        throw new Error("Method not implemented.");
    }
    getBalance(
        _addressOrName: string | Promise<string>,
        _blockTag?: BlockTag | Promise<BlockTag> | undefined,
    ): Promise<BigNumber> {
        throw new Error("Method not implemented.");
    }
    getTransactionCount(
        _addressOrName: string | Promise<string>,
        _blockTag?: BlockTag | Promise<BlockTag> | undefined,
    ): Promise<number> {
        throw new Error("Method not implemented.");
    }
    getCode(
        _addressOrName: string | Promise<string>,
        _blockTag?: BlockTag | Promise<BlockTag> | undefined,
    ): Promise<string> {
        throw new Error("Method not implemented.");
    }
    getStorageAt(
        _addressOrName: string | Promise<string>,
        _position: BigNumberish | Promise<BigNumberish>,
        _blockTag?: BlockTag | Promise<BlockTag> | undefined,
    ): Promise<string> {
        throw new Error("Method not implemented.");
    }
    sendTransaction(_signedTransaction: string | Promise<string>): Promise<TransactionResponse> {
        throw new Error("Method not implemented.");
    }
    call(
        _transaction: Deferrable<TransactionRequest>,
        _blockTag?: BlockTag | Promise<BlockTag> | undefined,
    ): Promise<string> {
        throw new Error("Method not implemented.");
    }
    estimateGas(_transaction: Deferrable<TransactionRequest>): Promise<BigNumber> {
        throw new Error("Method not implemented.");
    }
    getBlock(_blockHashOrBlockTag: BlockTag | Promise<BlockTag>): Promise<Block> {
        throw new Error("Method not implemented.");
    }
    getBlockWithTransactions(_blockHashOrBlockTag: BlockTag | Promise<BlockTag>): Promise<BlockWithTransactions> {
        throw new Error("Method not implemented.");
    }
    getTransaction(_transactionHash: string): Promise<TransactionResponse> {
        throw new Error("Method not implemented.");
    }
    getTransactionReceipt(_transactionHash: string): Promise<TransactionReceipt> {
        throw new Error("Method not implemented.");
    }
    getLogs(_filter: Filter): Promise<Log[]> {
        throw new Error("Method not implemented.");
    }
    resolveName(_name: string | Promise<string>): Promise<string | null> {
        throw new Error("Method not implemented.");
    }
    lookupAddress(_address: string | Promise<string>): Promise<string | null> {
        throw new Error("Method not implemented.");
    }
    on(_eventName: EventType, _listener: Listener): Provider {
        throw new Error("Method not implemented.");
    }
    once(_eventName: EventType, _listener: Listener): Provider {
        throw new Error("Method not implemented.");
    }
    emit(_eventName: EventType, ..._args: any[]): boolean {
        throw new Error("Method not implemented.");
    }
    listenerCount(_eventName?: EventType | undefined): number {
        throw new Error("Method not implemented.");
    }
    listeners(_eventName?: EventType | undefined): Listener[] {
        throw new Error("Method not implemented.");
    }
    off(_eventName: EventType, _listener?: Listener | undefined): Provider {
        throw new Error("Method not implemented.");
    }
    removeAllListeners(_eventName?: EventType | undefined): Provider {
        throw new Error("Method not implemented.");
    }
    waitForTransaction(
        _transactionHash: string,
        _confirmations?: number | undefined,
        _timeout?: number | undefined,
    ): Promise<TransactionReceipt> {
        throw new Error("Method not implemented.");
    }
}
