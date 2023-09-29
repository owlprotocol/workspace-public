/**
 * Typescript implementation of ERC1167 library pure functions
 */
import type { BaseContract } from "ethers";

export const INIT_SIGNATURE = "initialize";
/**
 * Get init data for initializable contracts, should ONLY be called on an interface that supports initialize(...)
 * @param contractInterface
 * @param initArgs
 * @returns
 */
export function getInitData<ContractTyped extends BaseContract = BaseContract>(
    contractInterface: ContractTyped["interface"],
    //@ts-expect-error
    initArgs?: Parameters<ContractTyped["initialize"]>,
) {
    if (!initArgs) {
        return contractInterface.encodeFunctionData(INIT_SIGNATURE);
    } else {
        return contractInterface.encodeFunctionData(INIT_SIGNATURE, initArgs);
    }
}
