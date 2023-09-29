import { BaseContract } from "ethers";
import { getInitData } from "./getInitData.js";
import { getCloneDeterministicBytecode } from "../Clones.js";

/**
 * Get codeData and init data of `ERC1167` contract deployed with Create2Factory with initArgs
 * Uses `initArgs` and calls `getInitData` to get `initData`
 * and then calls `getCloneDeterministicBytecode` to get `codeData`
 * @param deployArgs
 * @returns codeData and initData
 */
export function getCloneCodeDataInitData<ContractTyped extends BaseContract = BaseContract>(
    contractInterface: ContractTyped["interface"],
    implementation: string,
    //@ts-expect-error
    initArgs?: Parameters<ContractTyped["initialize"]>,
) {
    // Get `initData`
    const initData = getInitData<ContractTyped>(contractInterface, initArgs);
    const codeData = getCloneDeterministicBytecode(implementation);

    return {
        initData,
        codeData,
    };
}
