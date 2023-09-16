import { BigNumber } from "@ethersproject/bignumber";
import { generateAddress2, keccak256, toBuffer } from "ethereumjs-util";
import {
    SafeL2__factory,
    SafeProxyFactory__factory,
    SafeProxy__factory,
} from "@owlprotocol/contracts/typechain/ethers";
import type { Log, TransactionResponse } from "@ethersproject/providers";
import { constants, Signer, utils } from "ethers";
import { EMPTY_DATA } from "./constants.js";
import type { SafeAccountConfig } from "../types/Safe.js";
import { defaultSafeCoreContractAddresses } from "../types/SafeCoreContracts.js";

// keccak256(toUtf8Bytes('Safe Account Abstraction'))
export const PREDETERMINED_SALT_NONCE = "0xb1073742015cbcf5a3a4d9d1ae33ecf619439710b89475f92e2abd2117e90f90";

export function validateSafeAccountConfig({ owners, threshold }: SafeAccountConfig): void {
    if (owners.length <= 0) throw new Error(`Owner list (length: ${owners.length}) must have at least one owner`);
    if (threshold <= 0) throw new Error(`Threshold (${threshold}) must be greater than or equal to 1`);
    if (threshold > owners.length)
        throw new Error(`Threshold ${threshold} must be lower than or equal to owners length (${owners.length})`);
}

export const validateSaltNonce = (saltNonce: string): void => {
    if (saltNonce && BigNumber.from(saltNonce).lt(0))
        throw new Error(`saltNonce ${saltNonce} must be greater than or equal to 0`);
};

/**
 * Encode SafeProxyFactory.setup
 * @param safeAccountConfig
 * @param safeCoreContracts
 * @returns
 */
export function encodeSetupCallData(
    safeAccountConfig: SafeAccountConfig,
    { fallbackHandlerAddress } = {
        fallbackHandlerAddress: defaultSafeCoreContractAddresses.fallbackHandlerAddress,
    },
): string {
    const {
        owners,
        threshold,
        to = constants.AddressZero,
        data = EMPTY_DATA,
        paymentToken = constants.AddressZero,
        payment = 0,
        paymentReceiver = constants.AddressZero,
    } = safeAccountConfig;

    return SafeL2__factory.createInterface().encodeFunctionData("setup", [
        owners,
        threshold,
        to,
        data,
        fallbackHandlerAddress,
        paymentToken,
        payment,
        paymentReceiver,
    ]);
}

/**
 * Encode SafeProxyFactory.createProxyWithNonce
 * @param initializer
 * @param saltNonce
 * @param safeCoreContracts
 * @returns
 */
export function encodeCreateProxyWithNonce(
    initializer: string,
    saltNonce = PREDETERMINED_SALT_NONCE,
    { safeMasterCopyAddress } = {
        safeMasterCopyAddress: defaultSafeCoreContractAddresses.safeMasterCopyAddress,
    },
) {
    return SafeProxyFactory__factory.createInterface().encodeFunctionData("createProxyWithNonce", [
        safeMasterCopyAddress,
        initializer,
        saltNonce,
    ]);
}

/**
 * Encode SafeProxyFactory.createProxyWithNonce with safeAccountConfig
 * @param safeAccountConfig
 * @param saltNonce
 * @param safeCoreContracts
 * @returns
 */
export function encodeCreateProxyWithNonceTransactionData(
    safeAccountConfig: SafeAccountConfig,
    saltNonce?: string,
    { safeMasterCopyAddress, fallbackHandlerAddress } = {
        safeMasterCopyAddress: defaultSafeCoreContractAddresses.safeMasterCopyAddress,
        fallbackHandlerAddress: defaultSafeCoreContractAddresses.fallbackHandlerAddress,
    },
) {
    const initializer = encodeSetupCallData(safeAccountConfig, { fallbackHandlerAddress });
    return encodeCreateProxyWithNonce(initializer, saltNonce, { safeMasterCopyAddress });
}

/**
 * Populate transaction for SafeProxyFactory.createProxyWithNonce with safeAccountConig
 * @param safeAccountConfig
 * @param saltNonce (default PREDETERMINED_SALT)
 * @param safeCoreContracts
 * @returns
 */
export function createProxyWithNonceTransaction(
    safeAccountConfig: SafeAccountConfig,
    saltNonce = PREDETERMINED_SALT_NONCE,
    { safeProxyFactoryAddress, safeMasterCopyAddress, fallbackHandlerAddress } = {
        safeProxyFactoryAddress: defaultSafeCoreContractAddresses.safeProxyFactoryAddress,
        safeMasterCopyAddress: defaultSafeCoreContractAddresses.safeMasterCopyAddress,
        fallbackHandlerAddress: defaultSafeCoreContractAddresses.fallbackHandlerAddress,
    },
): { readonly to: string; readonly data: string } {
    const initializer = encodeSetupCallData(safeAccountConfig, { fallbackHandlerAddress });
    const data = encodeCreateProxyWithNonce(initializer, saltNonce, { safeMasterCopyAddress });

    return {
        to: safeProxyFactoryAddress,
        data,
    };
}

/**
 * Send transaction for SafeProxyFactory.createProxyWithNonce with safeAccountConig
 * @param signer
 * @param safeAccountConfig
 * @param saltNonce
 * @param safeCoreContracts
 * @returns
 */
export async function deploySafe(
    signer: Signer,
    safeAccountConfig: SafeAccountConfig,
    saltNonce = PREDETERMINED_SALT_NONCE,
    { safeProxyFactoryAddress, safeMasterCopyAddress, fallbackHandlerAddress } = {
        safeProxyFactoryAddress: defaultSafeCoreContractAddresses.safeProxyFactoryAddress,
        safeMasterCopyAddress: defaultSafeCoreContractAddresses.safeMasterCopyAddress,
        fallbackHandlerAddress: defaultSafeCoreContractAddresses.fallbackHandlerAddress,
    },
): Promise<TransactionResponse> {
    if (!signer.provider) throw new Error(`signer.provider === undefined`);

    const txData = createProxyWithNonceTransaction(safeAccountConfig, saltNonce, {
        safeProxyFactoryAddress,
        safeMasterCopyAddress,
        fallbackHandlerAddress,
    });
    const tx = await signer.sendTransaction({ ...txData });
    return tx;
}

/**
 * @dev Predict Safe Address
 * @param safeAccountConfig
 * @param saltNonce
 * @param safeCoreContracts
 * @param proxyCreationCode
 * @returns
 */
export function predictSafeAddress(
    safeAccountConfig: SafeAccountConfig,
    saltNonce = PREDETERMINED_SALT_NONCE,
    { safeProxyFactoryAddress, safeMasterCopyAddress, fallbackHandlerAddress } = {
        safeProxyFactoryAddress: defaultSafeCoreContractAddresses.safeProxyFactoryAddress,
        safeMasterCopyAddress: defaultSafeCoreContractAddresses.safeMasterCopyAddress,
        fallbackHandlerAddress: defaultSafeCoreContractAddresses.fallbackHandlerAddress,
    },
    proxyCreationCode = SafeProxy__factory.bytecode,
): string {
    validateSafeAccountConfig(safeAccountConfig);
    validateSaltNonce(saltNonce);

    const initializer = encodeSetupCallData(safeAccountConfig, { fallbackHandlerAddress });

    //TODO: Remove dependency on ethereum-js-utils
    const encodedNonce = toBuffer(utils.defaultAbiCoder.encode(["uint256"], [saltNonce])).toString("hex");
    const salt = keccak256(toBuffer("0x" + keccak256(toBuffer(initializer)).toString("hex") + encodedNonce));
    const constructorData = toBuffer(utils.defaultAbiCoder.encode(["address"], [safeMasterCopyAddress])).toString(
        "hex",
    );
    const initCode = proxyCreationCode + constructorData;

    const proxyAddress =
        "0x" + generateAddress2(toBuffer(safeProxyFactoryAddress), toBuffer(salt), toBuffer(initCode)).toString("hex");

    return utils.getAddress(proxyAddress);
}

/**
 * Take an arbitrary event log and parse out if it is ProxyCreation(address proxy, address singleton) or ProxyCreation(address indexed proxy, address singleton)
 * @param log
 * @returns address/singleton kv or undefined
 */
export function parseProxyCreationEvent(log: Log): { proxy: string; singleton: string } | undefined {
    if (log.topics[0] != "0x4f51faf6c4561ff95f067657e43439f0f856d97c04d9ec9070a6199ad418e235") return undefined;

    if (log.topics.length == 1) {
        const ifaceNonIndexedProxyAddress = new utils.Interface([
            "event ProxyCreation(address proxy, address singleton)",
        ]);
        return ifaceNonIndexedProxyAddress.decodeEventLog("ProxyCreation", log.data, log.topics) as any;
    } else if (log.topics.length == 2) {
        const ifaceIndexedProxyAddress = new utils.Interface([
            "event ProxyCreation(address indexed proxy, address singleton)",
        ]);
        return ifaceIndexedProxyAddress.decodeEventLog("ProxyCreation", log.data, log.topics) as any;
    }
}
