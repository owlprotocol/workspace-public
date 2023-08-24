import { Signer, ethers } from "ethers";
import SafeSDK, {
    EthersAdapter,
    SafeAccountConfig,
    SafeFactory,
    encodeSetupCallData,
    getSafeContract,
} from "@safe-global/protocol-kit";
import { ContractNetworksConfig } from "@safe-global/protocol-kit/dist/src/types";
import {
    MetaTransactionData,
    SafeTransaction,
    SafeTransactionDataPartial,
    TransactionResult,
} from "@safe-global/safe-core-sdk-types";
import { Log, Provider, TransactionResponse } from "@ethersproject/providers";
import { factoryInterfaceClasses } from "./ethers/factories.js";
import { factoriesImplementations } from "./ethers/factories.js";

//hack for incorrect export depending on interop
const Safe = (SafeSDK as any).create ? SafeSDK : ((SafeSDK as any).default as typeof SafeSDK);

//Deployed using Gnosis Singleton Factory
const singletonFactoryContracts = {
    safeMasterCopyAddress: factoriesImplementations.SafeL2.getAddress(),
    safeProxyFactoryAddress: factoriesImplementations.SafeProxyFactory.getAddress(),
    multiSendAddress: factoriesImplementations.Multisend.getAddress(),
    multiSendCallOnlyAddress: factoriesImplementations.MultisendCallOnly.getAddress(),
    fallbackHandlerAddress: factoriesImplementations.CompatibilityFallbackHandler.getAddress(),
    signMessageLibAddress: factoriesImplementations.SignMessageLib.getAddress(),
    createCallAddress: factoriesImplementations.CreateCall.getAddress(),
};
//For custom networks that don't support them
const contractsByNetwork: ContractNetworksConfig = {};

/**
 * Predict safe address
 * @param config
 */
export async function predictSafeAddress(config: {
    provider: Provider;
    networkId: string;
    safeAccountConfig: { owners: string[]; threshold: number };
    saltNonce: string;
}): Promise<string> {
    const { provider, networkId, saltNonce } = config;
    const contracts = contractsByNetwork[networkId] ?? singletonFactoryContracts;
    //Initialized Eth Adapter
    const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: provider,
    });
    //Deploy Safe Config
    const safeAccountConfig: SafeAccountConfig = {
        ...config.safeAccountConfig,
        fallbackHandler: contracts.fallbackHandlerAddress,
    };
    //Deploy Safe Predict address
    const safeFactory = await SafeFactory.create({ ethAdapter, contractNetworks: { [networkId]: contracts } });
    const addressPredicted = await safeFactory.predictSafeAddress(safeAccountConfig, saltNonce);
    return addressPredicted;
}

/**
 * Generate deploy safe transaction, can be signed by any signer
 * Assumes Safe Core contracts are deployed
 * @param config
 */
export async function deploySafeTransaction(config: {
    provider: Provider;
    networkId: string;
    safeAccountConfig: { owners: string[]; threshold: number };
    saltNonce: string;
}): Promise<ethers.PopulatedTransaction> {
    const { provider, networkId, saltNonce } = config;
    const contracts = contractsByNetwork[networkId] ?? singletonFactoryContracts;
    //Initialized Eth Adapter
    const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: provider,
    });
    //Initialize Factory
    const safeContractHelper = await getSafeContract({
        ethAdapter,
        safeVersion: "1.3.0",
        isL1SafeMasterCopy: false,
        customContracts: contracts,
    });
    //Deploy Safe Config
    const safeAccountConfig: SafeAccountConfig = {
        ...config.safeAccountConfig,
        fallbackHandler: contracts.fallbackHandlerAddress,
    };
    const initializer = await encodeSetupCallData({
        safeAccountConfig,
        safeContract: safeContractHelper,
        customContracts: contracts,
        ethAdapter: undefined as any, //not requied as fallbackHandler specified
    });

    //Deploy Generate tx
    const safeProxyFactoryContract = factoryInterfaceClasses.ISafeProxyFactory.connect(
        contracts.safeProxyFactoryAddress,
        provider,
    );
    const params = [contracts.safeMasterCopyAddress, initializer, saltNonce] as const;
    const gasLimit = (await safeProxyFactoryContract.estimateGas.createProxyWithNonce(...params)).toString();
    const tx = await safeProxyFactoryContract.populateTransaction.createProxyWithNonce(...params, { gasLimit });
    return tx;
}

export async function deploySafe(config: {
    signer: Signer;
    networkId: string;
    safeAccountConfig: { owners: string[]; threshold: number };
    saltNonce: string;
}): Promise<TransactionResponse> {
    const { signer, networkId, safeAccountConfig, saltNonce } = config;
    if (!signer.provider) throw new Error(`signer.provider === undefined`);

    const txData = await deploySafeTransaction({ provider: signer.provider, networkId, safeAccountConfig, saltNonce });
    const tx = await signer.sendTransaction({ ...txData });
    return tx;
}

/**
 * Take an arbitrary event log and parse out if it is ProxyCreation(address proxy, address singleton) or ProxyCreation(address indexed proxy, address singleton)
 * @param log
 * @returns address/singleton kv or undefined
 */
export function parseProxyCreationEvent(log: Log): { proxy: string; singleton: string } | undefined {
    if (log.topics[0] != "0x4f51faf6c4561ff95f067657e43439f0f856d97c04d9ec9070a6199ad418e235") return undefined;

    if (log.topics.length == 1) {
        const ifaceNonIndexedProxyAddress = new ethers.utils.Interface([
            "event ProxyCreation(address proxy, address singleton)",
        ]);
        return ifaceNonIndexedProxyAddress.decodeEventLog("ProxyCreation", log.data, log.topics) as any;
    } else if (log.topics.length == 2) {
        const ifaceIndexedProxyAddress = new ethers.utils.Interface([
            "event ProxyCreation(address indexed proxy, address singleton)",
        ]);
        return ifaceIndexedProxyAddress.decodeEventLog("ProxyCreation", log.data, log.topics) as any;
    }
}

/**
 * Generate safe transaction.
 * @param config
 * @returns Safe Transaction
 */
export async function createSafeTransaction(config: {
    provider: Provider;
    networkId: string;
    safeAddress: string;
    data: SafeTransactionDataPartial | MetaTransactionData[];
}): Promise<SafeTransaction> {
    const { provider, networkId, safeAddress } = config;
    const contracts = contractsByNetwork[networkId] ?? singletonFactoryContracts;
    //Initialized Eth Adapter
    const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: provider,
    });
    //Initialize Safe SDK
    const safeSDK = await Safe.create({
        ethAdapter,
        safeAddress,
        contractNetworks: { [networkId]: contracts },
        isL1SafeMasterCopy: false,
    });

    //Generate transaction
    const safeTransactionDataPartial = config.data;
    const safeTransaction = await safeSDK.createTransaction({ safeTransactionData: safeTransactionDataPartial });
    return safeTransaction;
}

/**
 * Sign safe transaction. MUST be signed by an owner
 * @param config
 * @returns Safe Transaction (with added signature)
 */
export async function signSafeTransaction(config: {
    signer: Signer;
    networkId: string;
    safeAddress: string;
    safeTransaction: SafeTransaction;
}) {
    const { signer, networkId, safeAddress, safeTransaction } = config;
    const contracts = contractsByNetwork[networkId] ?? singletonFactoryContracts;
    //Initialized Eth Adapter
    const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: signer,
    });
    //Initialize Safe SDK
    const safeSDK = await Safe.create({
        ethAdapter,
        safeAddress,
        contractNetworks: { [networkId]: contracts },
        isL1SafeMasterCopy: false,
    });
    //Sign transaction
    const safeTransactionSigned = await safeSDK.signTransaction(safeTransaction);
    return safeTransactionSigned;
}

/**
 * Get Safe transaction hash
 * @param config
 * @returns Safe Transaction and Safe Transaction hash (to be signed by relayer)
 */
export async function getSafeTransactionHash(config: {
    provider: Provider;
    safeAddress: string;
    safeTransaction: SafeTransaction;
}): Promise<string> {
    const { provider, safeTransaction, safeAddress } = config;
    //Compute transaction hash
    const safeContract = factoryInterfaceClasses.ISafe.connect(safeAddress, provider);
    const safeTransactionData = safeTransaction.data;
    const safeTransactionHash = await safeContract.getTransactionHash(
        safeTransactionData.to,
        safeTransactionData.value,
        safeTransactionData.data,
        safeTransactionData.operation,
        safeTransactionData.safeTxGas,
        safeTransactionData.baseGas,
        safeTransactionData.gasPrice,
        safeTransactionData.gasToken,
        safeTransactionData.refundReceiver,
        safeTransactionData.nonce,
    );
    return safeTransactionHash;
}

/**
 * Execute Safe transaction. Relay Signer does not have to be same as original signer.
 * @param config
 * @returns
 */
export async function executeSafeTransaction(config: {
    signer: Signer;
    networkId: string;
    safeAddress: string;
    safeTransaction: SafeTransaction;
}): Promise<TransactionResult> {
    const { signer, networkId, safeAddress, safeTransaction } = config;
    const contracts = contractsByNetwork[networkId] ?? singletonFactoryContracts;
    //Initialized Eth Adapter
    const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: signer,
    });
    //Initialize Safe SDK
    const safeSDK = await Safe.create({
        ethAdapter,
        safeAddress,
        contractNetworks: { [networkId]: contracts },
        isL1SafeMasterCopy: false,
    });
    //Execute Transaction
    const executeTxResponse = await safeSDK.executeTransaction(safeTransaction);
    return executeTxResponse;
}
