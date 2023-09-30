/* eslint-disable @typescript-eslint/no-unused-vars */
import { Signer, TypedDataDomain, TypedDataField } from "@ethersproject/abstract-signer";
import { BlockTag, FeeData, Provider, TransactionRequest, TransactionResponse } from "@ethersproject/abstract-provider";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { Bytes, BytesLike } from "@ethersproject/bytes";
import { Deferrable, defineReadOnly, resolveProperties, shallowCopy } from "@ethersproject/properties";
import { Logger } from "@ethersproject/logger";
import { isAddress } from "@ethersproject/address";
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

//TODO: Add Default API URL
const DEFAULT_OWL_API = "";

//TODO: Overrride remove unused fields
export type OwlTransactionRequest = Omit<
    TransactionRequest,
    "ccipReadEnabled" | "customData" | "gasLimit" | "gasPrice" | "maxFeePerGas" | "maxPriorityFeePerGas" | "type"
>;

/**
 * Owl Protocol Signer
 * Connected to Owl Protocol API
 *  - getAddress() returns user's safe wallet
 *  - sendTransaction() Sends transactions as meta transactions from user's safe wallet
 *  - signTransaction() => Errors (TODO: Safe Meta Transaction signature protocol)
 *  - signMessage()     => Errors (TODO: Safe Meta Transaction signature protocol)
 *  - _signTypedData()  => Errors (TODO: Safe Meta Transaction signature protocol)
 */
export class OwlSigner extends Signer {
    //@ts-expect-error
    readonly apiKey: string;
    //@ts-expect-error
    readonly apiUrl: string;
    readonly provider = undefined;

    constructor(apiKey: string, apiUrl = DEFAULT_OWL_API) {
        super();
        defineReadOnly(this, "apiKey", apiKey);
        defineReadOnly(this, "apiUrl", apiUrl);
    }

    /**
     * TODO: Get nonce of safe wallet
     * `blockTag` parameter ignored
     * @param blockTag
     * @returns
     */
    async getTransactionCount(blockTag?: BlockTag): Promise<number> {
        //TODO
        throw new Error("Unimplemented");
    }

    /**
     * Disabled as unsupported
     * @param transaction
     * @returns
     */
    async estimateGas(transaction: Deferrable<OwlTransactionRequest>): Promise<BigNumber> {
        return this._fail("OwlSigner cannot estimate gas for transacton", "estimateGas");
    }

    /**
     * Disabled as unsupported
     * @param transaction
     * @param blockTag
     * @returns
     */
    async call(transaction: Deferrable<OwlTransactionRequest>, blockTag?: BlockTag): Promise<string> {
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

        if (tx.from == null) {
            tx.from = this.getAddress();
        } else {
            // Make sure any provided address matches this signer
            tx.from = Promise.all([Promise.resolve(tx.from), this.getAddress()]).then((result) => {
                //@ts-expect-error
                if (result[0].toLowerCase() !== result[1].toLowerCase()) {
                    logger.throwArgumentError("from address mismatch", "transaction", transaction);
                }
                return result[0];
            });
        }

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
                if (!isAddress(to)) logger.throwArgumentError("provided address invalid", "tx.to", to);
            });

            // Prevent this error from causing an UnhandledPromiseException
            //@ts-expect-error
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            tx.to.catch((error) => {});
        }

        if (tx.nonce == null) {
            tx.nonce = this.getTransactionCount("pending");
        }

        if (tx.chainId == null) {
            tx.chainId = this.getChainId();
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
        //TODO:
        throw new Error("Unimplemented");
    }

    //Abstract unimplemented
    /**
     * Resolve promise and throw
     * @param message
     * @param operation
     * @returns
     */
    _fail(message: string, operation: string): Promise<any> {
        return Promise.resolve().then(() => {
            logger.throwError(message, Logger.errors.UNSUPPORTED_OPERATION, { operation: operation });
        });
    }

    /**
     * Get user Safe address
     */
    getAddress(): Promise<string> {
        throw new Error("Method not implemented.");
    }

    /**
     * Disabled as unsupported
     * @param message
     * @returns
     */
    signMessage(message: Bytes | string): Promise<string> {
        return this._fail("OwlSigner cannot sign messages", "signMessage");
    }

    /**
     * Disabled as unsupported
     * @param transaction
     * @returns
     */
    signTransaction(transaction: Deferrable<OwlTransactionRequest>): Promise<string> {
        return this._fail("OwlSigner cannot sign transactions", "signTransaction");
    }

    /**
     * Disabled as unsupported
     * @param domain
     * @param types
     * @param value
     * @returns
     */
    _signTypedData(
        domain: TypedDataDomain,
        types: Record<string, Array<TypedDataField>>,
        value: Record<string, any>,
    ): Promise<string> {
        return this._fail("OwlSigner cannot sign typed data", "signTypedData");
    }

    /**
     * Disabled as unsupported
     * @param provider
     */
    connect(provider: Provider): OwlSigner {
        throw logger.throwError("OwlSigner cannot connect to provider", Logger.errors.UNSUPPORTED_OPERATION, {
            operation: "connect",
        });
    }
}
