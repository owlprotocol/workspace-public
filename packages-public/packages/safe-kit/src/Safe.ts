import { BigNumber, PopulatedTransaction } from "ethers";
import { Signer, TypedDataSigner } from "@ethersproject/abstract-signer";
import { Provider, TransactionReceipt, TransactionResponse } from "@ethersproject/providers";
import {
    CompatibilityFallbackHandler__factory,
    CreateCall__factory,
    MultiSendCallOnly__factory,
    MultiSend__factory,
    SafeL2__factory,
    SafeProxyFactory__factory,
    SignMessageLib__factory,
    SimulateTxAccessor__factory,
} from "@owlprotocol/contracts/typechain/ethers";
import type { SafeL2 } from "@owlprotocol/contracts/typechain/ethers";
import type { AddOwnerTxParams, RemoveOwnerTxParams, SafeAccountConfig, SwapOwnerTxParams } from "./types/Safe.js";
import {
    defaultSafeCoreContractAddresses,
    SafeCoreContractAddresses,
    SafeCoreContracts,
} from "./types/SafeCoreContracts.js";
import { createProxyWithNonceTransaction, deploySafe, predictSafeAddress } from "./utils/safe.js";
import {
    createRejectionTransactionDataPartial,
    createSafeTransaction,
    populateExecuteTransaction,
    signSafeTransaction,
} from "./utils/safeTransaction.js";
import {
    MetaTransactionData,
    SafeTransaction,
    SafeTransactionDataPartial,
    SafeTransactionOptionalProps,
} from "./types/SafeTransaction.js";
import { generateEIP712Signature, SafeTransactionEIP712Args } from "./utils/eip712.js";
import { SafeSignature } from "./types/SafeSignature.js";

/**
 * Extracts provider and signer from Provider or connected signer
 * @param providerOrSigner
 */
export function getProviderAndSigner(providerOrSigner: Provider | Signer) {
    let provider: Provider | undefined;
    let signer: Signer | undefined;
    if (Signer.isSigner(providerOrSigner)) {
        provider = providerOrSigner.provider;
        signer = providerOrSigner;
    } else {
        provider = providerOrSigner;
    }

    return { provider, signer };
}

export class Safe {
    /** Provider or signer */
    private readonly provider: Provider;
    /** Signer */
    private readonly signer?: Signer;
    /** Safe Address */
    private readonly safeAddress: string;
    /** Safe Contract */
    private readonly safeContract: SafeL2;
    /** Cached owners value */
    private readonly owners: string[] | undefined;
    /** Cached threshold value */
    private readonly threshold: number | undefined;
    /** Cached nonce value */
    private readonly nonce: number | undefined;
    /** Cached chain id */
    private readonly chainId: number | undefined;

    /** Core Safe Contract Addresseses */
    private readonly safeCoreContractAddresses: SafeCoreContractAddresses;

    /** Core Safe Contracts */
    private readonly safeCoreContracts: SafeCoreContracts | undefined;

    /** Cache isSafeDeployedd */
    private readonly _isSafeDeployed: boolean | undefined;

    /**
     * @dev Create Safe wrapper.
     * @param providerOrSigner provider (read-only), signer with no provider (signature-only), signer with provider (all operations)
     * @param safeAddress (required)
     * @param safeCoreContracts Core Safe contract implementations & ProxyFactory (default Owl Protocol deployed)
     * @param owners Cached value for safe owners to avoid rpc calls
     * @param threshold Cached value for safe threshold to avoid rpc calls
     * @param nonce Cached value for safe nonce to avoid rpc calls
     * @param chainId Cached value for provider chainId
     */
    constructor(
        providerOrSigner: Provider | Signer,
        safeAddress: string,
        safeCoreContracts: SafeCoreContractAddresses,
        owners?: string[] | undefined,
        threshold?: number | undefined,
        nonce?: number | undefined,
        chainId?: number | undefined,
    ) {
        const { provider, signer } = getProviderAndSigner(providerOrSigner);
        if (!provider) {
            throw new Error(`signer.provider === undefined, get new connected signer with signer.connect(provider)`);
        }

        this.safeAddress = safeAddress;
        /** Signing handled by util functinos, connect with provider only */
        this.safeContract = SafeL2__factory.connect(safeAddress, provider);
        this.safeCoreContractAddresses = safeCoreContracts;
        this.provider = provider;
        this.signer = signer;
        //For string-compare, fix addresses to lower case
        this.owners = owners?.map((owner) => owner.toLowerCase());
        this.threshold = threshold;
        this.nonce = nonce;
        this.chainId = chainId;

        /** Contracts are only connected to provider as not write operations are ever made */
        this.safeCoreContracts = {
            safeMasterCopy: SafeL2__factory.connect(this.safeCoreContractAddresses.safeMasterCopyAddress, provider),
            safeProxyFactory: SafeProxyFactory__factory.connect(
                this.safeCoreContractAddresses.safeProxyFactoryAddress,
                provider,
            ),
            simulateTxAccessContract: this.safeCoreContractAddresses.simulateTxAccessorAddress
                ? SimulateTxAccessor__factory.connect(
                      this.safeCoreContractAddresses.simulateTxAccessorAddress,
                      provider,
                  )
                : undefined,
            multisendContract: MultiSend__factory.connect(this.safeCoreContractAddresses.multiSendAddress, provider),
            multisendCallOnlyContract: MultiSendCallOnly__factory.connect(
                this.safeCoreContractAddresses.multiSendCallOnlyAddress,
                provider,
            ),
            fallbackHandlerContract: CompatibilityFallbackHandler__factory.connect(
                this.safeCoreContractAddresses.fallbackHandlerAddress,
                provider,
            ),
            signMessageContract: SignMessageLib__factory.connect(
                this.safeCoreContractAddresses.signMessageLibAddress,
                provider,
            ),
            createCallContract: CreateCall__factory.connect(this.safeCoreContractAddresses.createCallAddress, provider),
        };
    }

    static predictSafeAddress(
        safeAccountConfig: SafeAccountConfig,
        saltNonce?: string,
        safeCoreContracts = defaultSafeCoreContractAddresses,
        proxyCreationCode?: string,
    ): string {
        const { safeProxyFactoryAddress, safeMasterCopyAddress, fallbackHandlerAddress } = safeCoreContracts;
        return predictSafeAddress(
            safeAccountConfig,
            saltNonce,
            { safeProxyFactoryAddress, safeMasterCopyAddress, fallbackHandlerAddress },
            proxyCreationCode,
        );
    }

    /**
     * @dev Connect to existing safe (see constructor docs)
     */
    static connect(
        providerOrSigner: Provider | Signer,
        safeAddress: string,
        safeCoreContracts = defaultSafeCoreContractAddresses,
        owners?: string[] | undefined,
        threshold?: number | undefined,
        nonce?: number | undefined,
        chainId?: number | undefined,
    ): Safe {
        return new Safe(providerOrSigner, safeAddress, safeCoreContracts, owners, threshold, nonce, chainId);
    }

    static async deployTransaction(
        providerOrSigner: Provider | Signer,
        safeAccountConfig: SafeAccountConfig,
        saltNonce?: string,
        safeCoreContracts = defaultSafeCoreContractAddresses,
        proxyCreationCode?: string,
    ): Promise<{
        readonly safe: Safe;
        readonly to: string;
        readonly data: string;
    }> {
        const { safeProxyFactoryAddress, safeMasterCopyAddress, fallbackHandlerAddress } = safeCoreContracts;
        const safeAddress = predictSafeAddress(
            safeAccountConfig,
            saltNonce,
            { safeProxyFactoryAddress, safeMasterCopyAddress, fallbackHandlerAddress },
            proxyCreationCode,
        );
        const { to, data } = createProxyWithNonceTransaction(safeAccountConfig, saltNonce, {
            safeProxyFactoryAddress,
            safeMasterCopyAddress,
            fallbackHandlerAddress,
        });

        const safe = Safe.connect(
            providerOrSigner,
            safeAddress,
            safeCoreContracts,
            safeAccountConfig.owners,
            safeAccountConfig.threshold,
            //TODO: Is init value of nonce 0?
            0,
        );

        return {
            safe,
            to,
            data,
        };
    }

    /**
     * Deploys safe, sends transaction using signer.
     * Note: Promise resolved when transaction is sent, NOT confirmed.
     * You should wait relevant confirmation time to make sure safe is deployed.
     * @param signer
     * @param safeAccountConfig
     * @param safeCoreContracts
     * @param saltNonce
     * @param txWait wait for receipt/confirmation (default: 0)
     * @returns
     */
    static async deploy(
        signer: Signer,
        safeAccountConfig: SafeAccountConfig,
        saltNonce?: string,
        safeCoreContracts = defaultSafeCoreContractAddresses,
        txWait?: number,
    ): Promise<{
        readonly safe: Safe;
        readonly txResponse: TransactionResponse;
        readonly txReceipt?: TransactionReceipt;
    }> {
        if (!signer.provider) {
            throw new Error(`signer.provider === undefined, get new connected signer with signer.connect(provider)`);
        }
        const { safeProxyFactoryAddress, safeMasterCopyAddress, fallbackHandlerAddress } = safeCoreContracts;

        const safeAddress = predictSafeAddress(safeAccountConfig, saltNonce, {
            safeProxyFactoryAddress,
            safeMasterCopyAddress,
            fallbackHandlerAddress,
        });
        const txResponse = await deploySafe(signer, safeAccountConfig, saltNonce, {
            safeProxyFactoryAddress,
            safeMasterCopyAddress,
            fallbackHandlerAddress,
        });
        const txReceipt = txWait !== undefined ? await txResponse.wait(txWait) : undefined;
        const safe = Safe.connect(
            signer,
            safeAddress,
            safeCoreContracts,
            safeAccountConfig.owners,
            safeAccountConfig.threshold,
        );

        return {
            safe,
            txResponse,
            txReceipt,
        };
    }
    /**
     * Returns the address of the current SafeProxy contract.
     *
     * @returns The address of the SafeProxy contract
     */
    getAddress(): string {
        return this.safeAddress;
    }

    /**
     * Checks if the current Safe is deployed.
     *
     * @returns TRUE if the Safe contract is deployed
     */
    async isSafeDeployed(): Promise<boolean> {
        if (this._isSafeDeployed) return true;
        //Mutate here, error expected
        //@ts-expect-error
        this._isSafeDeployed = (await this.provider.getCode(this.safeAddress)) != "0x";

        return this._isSafeDeployed;
    }

    setOwners(owners: string[]) {
        //Mutate here, error expected
        //@ts-expect-error
        this.owners = owners?.map((owner) => owner.toLowerCase());
    }

    /**
     * Returns the list of Safe owner accounts.
     *
     * @returns The list of owners
     */
    async getOwners(fetch?: boolean): Promise<string[]> {
        if (!this.owners || fetch) {
            this.setOwners(await this.safeContract.getOwners());
        }

        return this.owners!;
    }

    /**
     * Returns the Safe nonce.
     *
     * @returns The Safe nonce
     */
    async getNonce(fetch?: boolean): Promise<number> {
        if (!this.nonce || fetch) {
            //Mutate here, error expected
            //@ts-expect-error
            this.nonce = (await this.safeContract.nonce()).toNumber();
        }

        return this.nonce;
    }

    /**
     * Returns the Safe threshold.
     *
     * @returns The Safe threshold
     */
    async getThreshold(fetch: boolean): Promise<number> {
        if (!this.threshold || fetch) {
            //Mutate here, error expected
            //@ts-expect-error
            this.threshold = (await this.safeContract.getThreshold()).toNumber();
        }

        return this.threshold;
    }

    /**
     * Returns the chainId of the connected network.
     *
     * @returns The chainId of the connected network
     */
    async getChainId(fetch?: boolean): Promise<number> {
        if (!this.chainId || fetch) {
            const network = await this.provider.getNetwork();
            //Mutate here, error expected
            //@ts-expect-error
            this.chainId = network.chainId;
        }

        return this.chainId;
    }

    /**
     * Returns the ETH balance of the Safe.
     *
     * @returns The ETH balance of the Safe
     */
    async getBalance(): Promise<BigNumber> {
        return this.provider.getBalance(await this.getAddress());
    }

    /**
     * Checks if a specific address is an owner of the current Safe.
     *
     * @param ownerAddress - The account address
     * @returns TRUE if the account is an owner
     */
    async isOwner(ownerAddress: string, refresh?: boolean): Promise<boolean> {
        const owners = await this.getOwners(refresh);
        return owners.includes(ownerAddress.toLowerCase());
    }

    /**
     * Returns a Safe transaction ready to be signed by the owners.
     *
     * @param createTransactionProps - The createTransaction props
     * @returns The Safe transaction
     * @throws "Invalid empty array of transactions"
     */
    async createTransaction(
        safeTransactionData: SafeTransactionDataPartial | MetaTransactionData[],
        nonce?: number,
        callOnly?: boolean,
    ): Promise<SafeTransaction> {
        const multiSendAddress = callOnly
            ? this.safeCoreContractAddresses.multiSendCallOnlyAddress
            : this.safeCoreContractAddresses.multiSendAddress;

        return createSafeTransaction(
            this.provider,
            this.safeContract,
            safeTransactionData,
            { multiSendAddress },
            {
                nonce: nonce ?? (await this.getNonce(true)),
            },
            false,
        );
    }

    /**
     * Returns a Safe transaction ready to be signed by the owners that invalidates the pending Safe transaction/s with a specific nonce.
     *
     * @param nonce - The nonce of the transaction/s that are going to be rejected
     * @returns The Safe transaction that invalidates the pending Safe transaction/s
     */
    async createRejectionTransaction(nonce: number): Promise<SafeTransaction> {
        const safeTransactionData = createRejectionTransactionDataPartial(this.safeAddress, nonce);
        return this.createTransaction(safeTransactionData);
    }

    /**
     * Signs a transaction according to the EIP-712 using the current signer account.
     *
     * @param safeTransaction - The Safe transaction to be signed
     * @returns The Safe signature
     */
    async signTypedData(safeTransaction: SafeTransaction): Promise<SafeSignature> {
        if (!this.signer) throw new Error("this.signer === undefined");

        const safeTransactionEIP712Args: SafeTransactionEIP712Args = {
            safeAddress: this.safeAddress,
            chainId: await this.getChainId(),
            safeTransactionData: safeTransaction.data,
        };
        return generateEIP712Signature(this.signer as Signer & TypedDataSigner, safeTransactionEIP712Args);
    }

    /**
     * Adds the signature of the current signer to the Safe transaction object.
     *
     * @param safeTransaction - The Safe transaction to be signed
     * @returns The signed Safe transaction
     * @throws "Transactions can only be signed by Safe owners"
     */
    async signTransaction(safeTransaction: SafeTransaction): Promise<SafeTransaction> {
        if (!this.signer) throw new Error("this.signer === undefined");

        return signSafeTransaction(
            await this.getChainId(),
            this.safeAddress,
            safeTransaction,
            this.signer as Signer & TypedDataSigner,
        );
    }

    /**
     * Returns the Safe transaction to add an owner and optionally change the threshold.
     *
     * @param params - The transaction params
     * @param options - The transaction optional properties
     * @returns The Safe transaction ready to be signed
     * @throws "Invalid owner address provided"
     * @throws "Address provided is already an owner"
     * @throws "Threshold needs to be greater than 0"
     * @throws "Threshold cannot exceed owner count"
     */
    async createAddOwnerTx(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        { ownerAddress, threshold }: AddOwnerTxParams,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        options?: SafeTransactionOptionalProps,
    ): Promise<SafeTransaction> {
        throw new Error("Unimplemented");
    }

    /**
     * Returns the Safe transaction to remove an owner and optionally change the threshold.
     *
     * @param params - The transaction params
     * @param options - The transaction optional properties
     * @returns The Safe transaction ready to be signed
     * @throws "Invalid owner address provided"
     * @throws "Address provided is not an owner"
     * @throws "Threshold needs to be greater than 0"
     * @throws "Threshold cannot exceed owner count"
     */
    async createRemoveOwnerTx(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        { ownerAddress, threshold }: RemoveOwnerTxParams,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        options?: SafeTransactionOptionalProps,
    ): Promise<SafeTransaction> {
        throw new Error("Unimplemented");
    }

    /**
     * Returns the Safe transaction to replace an owner of the Safe with a new one.
     *
     * @param params - The transaction params
     * @param options - The transaction optional properties
     * @returns The Safe transaction ready to be signed
     * @throws "Invalid new owner address provided"
     * @throws "Invalid old owner address provided"
     * @throws "New address provided is already an owner"
     * @throws "Old address provided is not an owner"
     */
    async createSwapOwnerTx(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        { oldOwnerAddress, newOwnerAddress }: SwapOwnerTxParams,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        options?: SafeTransactionOptionalProps,
    ): Promise<SafeTransaction> {
        throw new Error("Unimplemented");
    }

    /**
     * Returns the Safe transaction to change the threshold.
     *
     * @param threshold - The new threshold
     * @param options - The transaction optional properties
     * @returns The Safe transaction ready to be signed
     * @throws "Threshold needs to be greater than 0"
     * @throws "Threshold cannot exceed owner count"
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async createChangeThresholdTx(threshold: number, options?: SafeTransactionOptionalProps): Promise<SafeTransaction> {
        throw new Error("Unimplemented");
    }

    /**
     * Checks if a Safe transaction can be executed successfully with no errors.
     *
     * @param safeTransaction - The Safe transaction to check
     * @param options - The Safe transaction execution options. Optional
     * @returns TRUE if the Safe transaction can be executed successfully with no errors
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async isValidTransaction(safeTransaction: SafeTransaction): Promise<boolean> {
        if (!(await this.isSafeDeployed())) {
            throw new Error("Safe is not deployed");
        }

        throw new Error("Unimplemented");
    }

    /**
     * Populates a Safe transaction.
     *
     * @param safeTransaction - The Safe transaction to execute
     * @param options - The Safe transaction execution options. Optional
     * @returns The Safe transaction response
     * @throws "No signer provided"
     * @throws "There are X signatures missing"
     * @throws "Cannot specify gas and gasLimit together in transaction options"
     */
    async populateExecuteTransaction(safeTransaction: SafeTransaction): Promise<PopulatedTransaction> {
        if (!(await this.isSafeDeployed())) {
            throw new Error("Safe is not deployed");
        }

        return populateExecuteTransaction(this.safeContract, safeTransaction);
    }
}
