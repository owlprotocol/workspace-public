import { Interface } from "@ethersproject/abi";
import { getInitData } from "./getInitData.js";
import { getCloneDeterministicBytecode } from "../Clones.js";
import { UpgradeableBeacon__factory } from "../../typechain/ethers/factories/contracts/Beacon/UpgradeableBeacon__factory.js";
import { BeaconProxy__factory } from "../../typechain/ethers/factories/contracts/Beacon/BeaconProxy__factory.js";

/**
 * Get codeData and init data of `ERC1167` contract deployed with Create2Factory with initArgs
 * Uses `initArgs` and calls `getInitData` to get `initData`
 * and then calls `getCloneDeterministicBytecode` to get `codeData`
 * @param contractInterface
 * @param implementation
 * @param initArgs
 * @returns codeData and initData
 */
export function getCloneCodeDataInitData<InitArgs>(
    contractInterface: Interface,
    implementation: string,
    initArgs: InitArgs,
) {
    // Get `initData`
    const initData = getInitData<InitArgs>(contractInterface, initArgs);
    const codeData = getCloneDeterministicBytecode(implementation);

    return {
        initData,
        codeData,
    };
}

/**
 * Get codeData and init data of `UpgradeableBeacon` contract deployed with Create2Factory
 * Uses `admin` and `implementation` and calls `getInitData` to get `initData`
 * @param admin
 * @param implementation
 * @returns codeData and initData
 */
export function getBeaconCodeDataInitData(admin: string, implementation: string) {
    // Get `initData`
    const initData = getInitData<[admin: string, implementation: string]>(
        UpgradeableBeacon__factory.createInterface(),
        [admin, implementation],
    );
    const codeData = UpgradeableBeacon__factory.bytecode;

    return {
        initData,
        codeData,
    };
}

/**
 * Get codeData and init data of `BeaconProxy` contract deployed with Create2Factory with initArgs
 * Uses `initArgs` and calls `getInitData` to get `initData`
 * and then calls `getCloneDeterministicBytecode` to get `codeData`
 * @param contractInterface
 * @param admin
 * @returns codeData and initData
 */
export function getProxyCodeDataInitData<InitArgs>(
    contractInterface: Interface,
    admin: string,
    beaconAddress: string,
    initArgs: InitArgs,
) {
    // Get `data`
    const data = getInitData<InitArgs>(contractInterface, initArgs);
    // Get `initData`
    // Get `initData`
    const initData = getInitData<[admin: string, beaconAddress: string, data: string]>(
        BeaconProxy__factory.createInterface(),
        [admin, beaconAddress, data],
    );
    const codeData = BeaconProxy__factory.bytecode;

    return {
        initData,
        codeData,
    };
}
