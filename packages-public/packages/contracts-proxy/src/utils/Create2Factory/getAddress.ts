import { utils } from "ethers";
import { Interface } from "@ethersproject/abi";
import { CREATE2_FACTORY_ADDRESS } from "./Create2FactoryAddress.js";
import { getSalt } from "./getSalt.js";
import { getInitData } from "./getInitData.js";
import { getBeaconCodeDataInitData, getProxyCodeDataInitData } from "./getCodeDataInitData.js";
import { SaltArgs } from "./getSalt.js";
import { computeAddress } from "../Create2.js";
import { getCloneDeterministicBytecode } from "../Clones.js";
import { BeaconProxy__factory } from "../../typechain/ethers/factories/contracts/Beacon/BeaconProxy__factory.js";

/**
 * Compute address of contract deployed with Creat2Factory
 * @param codeData
 * @param saltArgs
 * @param create2FactoryAddress
 * @returns predicted address for deployment
 */
export function getDeployAddress(
    codeData: string,
    saltArgs?: Partial<SaltArgs>,
    create2FactoryAddress = CREATE2_FACTORY_ADDRESS,
) {
    const deploySalt = getSalt(saltArgs);
    const bytecodeHash = utils.keccak256(codeData);
    return computeAddress(deploySalt, bytecodeHash, create2FactoryAddress);
}

/**
 * Compute address of `ERC1167` contract deployed with Create2Factory
 * Uses `implementation` and calls `getCloneDeterministicBytecode` to get `codeData`
 * and then call regular `getDeployAddres`
 * @param implementation
 * @param saltArgs
 * @param create2FactoryAddress
 * @returns predicted address for deployment
 */
export function getCloneAddress(
    implementation: string,
    saltArgs: Partial<SaltArgs>,
    create2FactoryAddress = CREATE2_FACTORY_ADDRESS,
) {
    const deploySalt = getSalt(saltArgs);
    const codeData = getCloneDeterministicBytecode(implementation);
    const bytecodeHash = utils.keccak256(codeData);
    return computeAddress(deploySalt, bytecodeHash, create2FactoryAddress);
}

/**
 * Compute address of contract deployed with Create2Factory with initArgs
 * Uses `initArgs` and calls `getInitData` to get `initData`
 * and then call regular getDeployAddres
 * @param contractInterface
 * @param codeData
 * @param saltArgs
 * @param create2FactoryAddress
 * @param initArgs
 * @returns predicted address for deployment
 */
export function getDeployWithInitAddress<InitArgs>(
    contractInterface: Interface,
    codeData: string,
    initArgs: InitArgs,
    saltArgs?: Partial<Omit<SaltArgs, "initData">>,
    create2FactoryAddress = CREATE2_FACTORY_ADDRESS,
) {
    // Setup Initializer Data
    const initData = getInitData<InitArgs>(contractInterface, initArgs);
    return getDeployAddress(codeData, { ...(saltArgs ?? {}), initData }, create2FactoryAddress);
}

/**
 * Compute address of `ERC1167` contract deployed with Create2Factory with initArgs
 * Uses `initArgs` and calls `getInitData` to get `initData`
 * and then calls getCloneAddress
 * @param contractInterface
 * @param implementation
 * @param saltArgs
 * @param create2FactoryAddress
 * @param initArgs
 * @returns predicted address for deployment
 */
export function getCloneWithInitAddress<InitArgs>(
    contractInterface: Interface,
    implementation: string,
    initArgs: InitArgs,
    saltArgs?: Partial<Omit<SaltArgs, "initData">>,
    create2FactoryAddress = CREATE2_FACTORY_ADDRESS,
) {
    // Get `initData`
    const initData = getInitData<InitArgs>(contractInterface, initArgs);

    return getCloneAddress(implementation, { ...(saltArgs ?? {}), initData }, create2FactoryAddress);
}

/**
 * Compute address of `UpgradeableBeacon` contract deployed with Create2Factory
 * Uses `admin` and `implementation` and calls `getInitData` to get `initData`
 * and then calls `getDeployAddress`
 * @param admin
 * @param implementation
 * @param saltArgs
 * @param create2FactoryAddress
 * @returns predicted address for deployment
 */
export function getBeaconAddress(
    admin: string,
    implementation: string,
    saltArgs?: Partial<Omit<SaltArgs, "initData">>,
    create2FactoryAddress = CREATE2_FACTORY_ADDRESS,
) {
    const { codeData, initData } = getBeaconCodeDataInitData(admin, implementation);

    return getDeployAddress(codeData, { ...(saltArgs ?? {}), initData }, create2FactoryAddress);
}

/**
 * Compute address of `BeaconProxy` contract deployed with Create2Factory
 * Uses `admin`, `beaconAddress`, `data` (proxy init data),  and calls `getInitData` to get `initData`
 * and then calls `getDeployAddress`
 * Note: `data` parameter is actually encoded initData depending on implementation and is used in
 *  `_upgradeBeaconToAndCall` call by `BeaconProxy`
 *
 * @param admin
 * @param beaconAddress
 * @param data
 * @param saltArgs
 * @param create2FactoryAddress
 * @returns predicted address for deployment
 */
export function getProxyAddress(
    admin: string,
    beaconAddress: string,
    data: string,
    saltArgs?: Partial<Omit<SaltArgs, "initData">>,
    create2FactoryAddress = CREATE2_FACTORY_ADDRESS,
) {
    // Get `initData`
    const initData = getInitData<[admin: string, beaconAddress: string, data: string]>(
        BeaconProxy__factory.createInterface(),
        [admin, beaconAddress, data],
    );
    const codeData = BeaconProxy__factory.bytecode;

    return getDeployAddress(codeData, { ...(saltArgs ?? {}), initData }, create2FactoryAddress);
}

/**
 * Compute address of `BeaconProxy` contract deployed with Create2Factory
 * Uses `contractInterface` and `initArgs` to compute `data` then calls `getDeployAddress`
 *
 * @param contractInterface
 * @param admin
 * @param beaconAddress
 * @param initArgs
 * @param saltArgs
 * @param create2FactoryAddress
 * @returns predicted address for deployment
 */
export function getProxyWithInitAddress<InitArgs>(
    contractInterface: Interface,
    admin: string,
    beaconAddress: string,
    initArgs: InitArgs,
    saltArgs?: Partial<Omit<SaltArgs, "initData">>,
    create2FactoryAddress = CREATE2_FACTORY_ADDRESS,
) {
    const { codeData, initData } = getProxyCodeDataInitData<InitArgs>(
        contractInterface,
        admin,
        beaconAddress,
        initArgs,
    );
    return getDeployAddress(codeData, { ...(saltArgs ?? {}), initData }, create2FactoryAddress);
}
