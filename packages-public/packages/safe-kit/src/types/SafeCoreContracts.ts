import type {
    SimulateTxAccessor,
    SafeL2,
    SafeProxyFactory,
    MultiSend,
    MultiSendCallOnly,
    CompatibilityFallbackHandler,
    SignMessageLib,
    CreateCall,
} from "@owlprotocol/contracts/typechain/ethers";

import { factoriesImplementations } from "@owlprotocol/contracts";

export interface SafeCoreContractAddresses {
    /** safeMasterCopyAddress - Address of the Safe Master Copy contract deployed on a specific network */
    readonly safeMasterCopyAddress: string;
    /** safeProxyFactoryAddress - Address of the SafeProxyFactory contract deployed on a specific network */
    readonly safeProxyFactoryAddress: string;
    /** multiSendAddress - Address of the MultiSend contract deployed on a specific network */
    readonly multiSendAddress: string;
    /** multiSendCallOnlyAddress - Address of the MultiSendCallOnly contract deployed on a specific network */
    readonly multiSendCallOnlyAddress: string;
    /** fallbackHandlerAddress - Address of the Fallback Handler contract deployed on a specific network */
    readonly fallbackHandlerAddress: string;
    /** signMessageLibAddress - Address of the SignMessageLib contract deployed on a specific network */
    readonly signMessageLibAddress: string;
    /** createCallAddress - Address of the CreateCall contract deployed on a specific network */
    readonly createCallAddress: string;
    /** simulateTxAccessorAddress - Address of the SimulateTxAccessor contract deployed on a specific network */
    readonly simulateTxAccessorAddress?: string;
}

export const defaultSafeCoreContractAddresses: SafeCoreContractAddresses = {
    safeMasterCopyAddress: factoriesImplementations.SafeL2.getAddress(),
    safeProxyFactoryAddress: factoriesImplementations.SafeProxyFactory.getAddress(),
    multiSendAddress: factoriesImplementations.Multisend.getAddress(),
    multiSendCallOnlyAddress: factoriesImplementations.MultisendCallOnly.getAddress(),
    fallbackHandlerAddress: factoriesImplementations.CompatibilityFallbackHandler.getAddress(),
    signMessageLibAddress: factoriesImplementations.SignMessageLib.getAddress(),
    createCallAddress: factoriesImplementations.CreateCall.getAddress(),
};

/**
 * Provider-connected core Safe infra contracts
 */
export interface SafeCoreContracts {
    readonly safeMasterCopy: SafeL2;
    readonly safeProxyFactory: SafeProxyFactory;
    readonly simulateTxAccessContract?: SimulateTxAccessor;
    readonly multisendContract: MultiSend;
    readonly multisendCallOnlyContract: MultiSendCallOnly;
    readonly fallbackHandlerContract: CompatibilityFallbackHandler;
    readonly signMessageContract: SignMessageLib;
    readonly createCallContract: CreateCall;
}
