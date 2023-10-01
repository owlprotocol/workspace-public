/**
 * Typescript implementation of ERC1167 library pure functions
 */

import { Interface } from "@ethersproject/abi";

export const INIT_SIGNATURE = "initialize";
/**
 * Get init data for initializable contracts, should ONLY be called on an interface that supports initialize(...)
 * @param contractInterface
 * @param initArgs
 * @returns
 */
export function getInitData<InitArgs>(contractInterface: Interface, initArgs: InitArgs) {
    //@ts-expect-error tuple conversion fails
    return contractInterface.encodeFunctionData(INIT_SIGNATURE, initArgs);
}
