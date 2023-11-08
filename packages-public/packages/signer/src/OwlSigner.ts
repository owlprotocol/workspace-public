/* eslint-disable @typescript-eslint/no-unused-vars */
import { Signer, TypedDataDomain, TypedDataField } from "@ethersproject/abstract-signer";
import {
    BlockTag,
    Provider,
    TransactionReceipt,
    TransactionRequest,
    TransactionResponse,
} from "@ethersproject/abstract-provider";
import { BigNumber } from "@ethersproject/bignumber";
import { Bytes, hexlify } from "@ethersproject/bytes";
import { Deferrable, defineReadOnly, resolveProperties, shallowCopy } from "@ethersproject/properties";
import { Logger } from "@ethersproject/logger";
import { isAddress } from "@ethersproject/address";
import { AppClient, createClient } from "@owlprotocol/contracts-api-client-trpc/client";
import { API_TRPC_BASE_URL } from "@owlprotocol/envvars";
import { version } from "./_version.js";
const logger = new Logger(version);

const allowedTransactionKeys: Array<string> = [
    "accessList",
    //"ccipReadEnabled",
    "chainId",
    //"customData",
    "data",
    "from",
    //"gasLimit", Disabled handled by relayer
    //"gasPrice", Disabled handled by relayer
    //"maxFeePerGas", Disabled handled by relayer
    //"maxPriorityFeePerGas", Disabled handled by relayer
    "nonce",
    "to",
    //"type", Disabled, handled by relayer
    "value",
];

//TODO: Overrride remove unused fields
export type OwlTransactionRequest = Omit<
    TransactionRequest,
    "ccipReadEnabled" | "customData" | "gasLimit" | "gasPrice" | "maxFeePerGas" | "maxPriorityFeePerGas" | "type"
>;

/**
 * OwlSigner is the official Owl Protocol API Signer.
 * This signer is connected to the Owl Protocol API.
 * Given an API key, the signer will send gasless transactions using the user's safe wallet,
 * and the Owl Protocol relayer.
 * We recommend pairing it with the OwlProvider.
 *
 * The signer currently only supports sending transactions and getting your address.
 *  - getAddress(): returns user's safe wallet
 *  - sendTransaction(): Sends transactions as meta transactions from user's safe wallet
 *  - signTransaction() => Errors (TODO: Safe Meta Transaction signature protocol)
 *  - signMessage()     => Errors (TODO: Safe Meta Transaction signature protocol)
 *  - _signTypedData()  => Errors (TODO: Safe Meta Transaction signature protocol)
 */
export class OwlSigner extends Signer {
    // @ts-expect-error
    readonly apiKey: string;
    // @ts-expect-error
    readonly apiUrl: string;
    // @ts-expect-error
    readonly txWait: number;
    // @ts-expect-error
    readonly trpcClient: AppClient;

    constructor(apiKey: string, apiUrl = API_TRPC_BASE_URL, txWait = 1, provider?: Provider) {
        super();
        defineReadOnly(this, "apiKey", apiKey);
        defineReadOnly(this, "apiUrl", apiUrl);
        defineReadOnly(this, "trpcClient", createClient({ apiKey }));
        defineReadOnly(this, "txWait", txWait);
        defineReadOnly(this, "provider", provider);
    }

    /**
     * TODO: Get nonce of safe wallet
     * `blockTag` parameter ignored
     * @param _blockTag
     * @returns
     */
    async getTransactionCount(_blockTag?: BlockTag): Promise<number> {
        //TODO
        throw new Error("Unimplemented");
    }

    /**
     * Disabled as unsupported
     * @param transaction
     * @returns
     */
    async estimateGas(_transaction: Deferrable<OwlTransactionRequest>): Promise<BigNumber> {
        return this._fail("OwlSigner cannot estimate gas for transacton", "estimateGas");
    }

    /**
     * Disabled as unsupported
     * @param _transaction
     * @param _blockTag
     * @returns
     */
    async call(_transaction: Deferrable<OwlTransactionRequest>, _blockTag?: BlockTag): Promise<string> {
        return this._fail("OwlSigner cannot call transaction", "call");
    }

    /**
     * Overiden with custom `allowedTransactionKeys`
     *
     * Checks a transaction does not contain invalid keys and if
     * no "from" is provided, populates it.
     * - does NOT require a provider
     * - adds "from" is not present
     * - returns a COPY (safe to mutate the result)
     *
     * By default called from: (overriding these prevents it)
     *   - call
     *   - estimateGas
     *   - populateTransaction (and therefor sendTransaction)
     *
     * @param transaction
     * @returns
     */
    checkTransaction(transaction: Deferrable<OwlTransactionRequest>): Deferrable<OwlTransactionRequest> {
        for (const key in transaction) {
            if (allowedTransactionKeys.indexOf(key) === -1) {
                logger.throwArgumentError("invalid transaction key: " + key, "transaction", transaction);
            }
        }

        const tx = shallowCopy(transaction);

        // if (tx.from == null) {
        //     tx.from = this.getAddress();
        // } else {
        //     // Make sure any provided address matches this signer
        //     tx.from = Promise.all([Promise.resolve(tx.from), this.getAddress()]).then((result) => {
        //         //@ts-expect-error
        //         if (result[0].toLowerCase() !== result[1].toLowerCase()) {
        //             logger.throwArgumentError("from address mismatch", "transaction", transaction);
        //         }
        //         return result[0];
        //     });
        // }

        return tx;
    }

    /**
     * Overrides: no gas logic, tx.to MUST be address, no ENS
     *
     * Populates ALL keys for a transaction and checks that "from" matches
     * this Signer. Should be used by sendTransaction but NOT by signTransaction.
     * By default called from: (overriding these prevents it)
     *   - sendTransaction
     * @param transaction
     * @returns
     */
    async populateTransaction(transaction: Deferrable<OwlTransactionRequest>): Promise<OwlTransactionRequest> {
        const tx: Deferrable<OwlTransactionRequest> = await resolveProperties(this.checkTransaction(transaction));

        if (tx.to != null) {
            //@ts-expect-error
            tx.to = Promise.resolve(tx.to).then(async (to) => {
                if (to == null) {
                    return null;
                }
                // TODO: resolve ENS addresses
                if (!isAddress(to)) logger.throwArgumentError("provided address invalid", "tx.to", to);

                return to;
            });

            // Prevent this error from causing an UnhandledPromiseException
            //@ts-expect-error
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            tx.to.catch((_error) => {});
        }

        // if (!tx.nonce) {
        console.log({ txto: tx.to, transactionto: transaction.to });
        //     tx.nonce = this.getTransactionCount("pending");
        // }

        if (!tx.chainId) {
            tx.chainId = await this.getChainId();
        } else {
            tx.chainId = Promise.all([Promise.resolve(tx.chainId), this.getChainId()]).then((results) => {
                if (results[1] !== 0 && results[0] !== results[1]) {
                    logger.throwArgumentError("chainId address mismatch", "transaction", transaction);
                }
                return results[0];
            });
        }

        return await resolveProperties(tx);
    }

    /**
     * Populates all fields in a transaction, signs it and sends it to the network
     * @param transaction
     */
    async sendTransaction(transaction: Deferrable<OwlTransactionRequest>): Promise<TransactionResponse> {
        const tx = await this.populateTransaction(transaction);
        if (!tx.to) {
            return this._fail("Transaction 'to' required", "sendTransaction");
        }

        if (!tx.data) {
            return this._fail("Transaction 'data' required", "sendTransaction");
        }

        const result = await this.trpcClient.safe.signTransaction.mutate({
            networkId: tx.chainId!.toString(),
            to: tx.to,
            data: hexlify(tx.data),
            value: tx.value?.toString(),
            txWait: this.txWait,
        });

        const wait = async () => result.txReceipt as TransactionReceipt;
        const txResponse = { ...result.txResponse, wait };
        return txResponse;
    }

    //Abstract unimplemented
    /**
     * Resolve promise and throw
     * @param message
     * @param operation
     * @returns
     */
    async _fail(message: string, operation: string): Promise<any> {
        return Promise.resolve().then(() => {
            logger.throwError(message, Logger.errors.UNSUPPORTED_OPERATION, { operation: operation });
        });
    }

    /**
     * Get user Safe address
     */
    async getAddress(): Promise<string> {
        const chainId: number = await this.getChainId();
        const result = await this.trpcClient.safe.safeInfo.safeAddress.query({ networkId: chainId.toString() });
        return result.address;
    }

    /**
     * Disabled as unsupported
     * @param _message
     * @returns
     */
    signMessage(_message: Bytes | string): Promise<string> {
        return this._fail("OwlSigner cannot sign messages", "signMessage");
    }

    /**
     * signTransaction signs a transaction using the user's Safe
     * TODO: handle cusotm nonce
     * @param transaction
        V


     * @returns
     */
    signTransaction(_transaction: Deferrable<OwlTransactionRequest>): Promise<string> {
        return this._fail("OwlSigner cannot only send transactions, not sign them", "signTransaction");
    }

    /**
     * Disabled as unsupported
     * @param domain
     * @param types
     * @param value
     * @returns
     */
    async _signTypedData(
        _domain: TypedDataDomain,
        _types: Record<string, Array<TypedDataField>>,
        _value: Record<string, any>,
    ): Promise<string> {
        return this._fail("OwlSigner cannot sign typed data", "signTypedData");
    }

    /**
     * Disabled as unsupported
     * @param provider
     */
    connect(provider: Provider): OwlSigner {
        return new OwlSigner(this.apiKey, this.apiUrl, this.txWait, provider);
    }
}
