import { Address, getCreate2Address, Hash, Hex } from "viem";
import { CREATE2_FACTORY_ADDRESS } from "./constants.js";
import { getSalt, SaltArgs } from "./getSalt.js";
import { getCloneDeterministicBytecode } from "../Clones.js";

export interface ContractCreateArgs {
    readonly salt: Hash;
    readonly bytecode: Hex;
    readonly initData: Hex;
}

/**
 * Compute address of contract deployed with Creat2Factory
 * @param msgSender msg.sender or address(0)
 * @param contract creation args
 * @param create2FactoryAddress
 * @returns predicted address for deployment
 */
export function getDeployAddress(
    msgSender: Address,
    contract: ContractCreateArgs,
    create2FactoryAddress = CREATE2_FACTORY_ADDRESS,
) {
    const deploySalt = getSalt({ msgSender, salt: contract.salt, initData: contract.initData });
    return getCreate2Address({ bytecode: contract.bytecode, from: create2FactoryAddress, salt: deploySalt });
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
    implementation: Address,
    saltArgs: SaltArgs,
    create2FactoryAddress = CREATE2_FACTORY_ADDRESS,
) {
    const deploySalt = getSalt(saltArgs);
    const bytecode = getCloneDeterministicBytecode(implementation);
    return getCreate2Address({ bytecode, from: create2FactoryAddress, salt: deploySalt });
}
