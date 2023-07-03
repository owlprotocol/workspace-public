/**
 * Typescript implementation of ERC1167 library pure functions
 */
import { utils } from "ethers";
import type { BytesLike, BaseContract } from "ethers";
import { PUBLIC_ADDRESS_FACTORY_DEPLOYER } from "@owlprotocol/envvars";

import { getInitData, GetInitDataArgs } from "./getInitData.js";
import { getSalt } from "./getSalt.js";
import * as Create2 from "../Create2.js";
import * as Clones from "../Clones.js";

//ERC1167FactoryAddress is computed based on the factory deployer address and nonce = 0
export const ERC1167FactoryAddress = utils.getContractAddress({ from: PUBLIC_ADDRESS_FACTORY_DEPLOYER, nonce: 0 });

export interface GetAddressArgs<
    ContractTyped extends BaseContract = BaseContract,
    InitSignature extends keyof ContractTyped | void = void,
> {
    cloneFactoryAddress?: string;
    salt?: string;
    msgSender?: string;
    contractInterface: ContractTyped["interface"];
    initOptions?: InitSignature extends keyof ContractTyped ? GetInitDataArgs<ContractTyped, InitSignature> : undefined;
}

export interface DeployDeterministicAddressArgs<
    ContractTyped extends BaseContract = BaseContract,
    InitSignature extends keyof ContractTyped | void = void,
> extends GetAddressArgs<ContractTyped, InitSignature> {
    bytecode: BytesLike;
}

export function deployDeterministicAddress<
    ContractTyped extends BaseContract = BaseContract,
    InitSignature extends keyof ContractTyped | void = void,
>(args: DeployDeterministicAddressArgs<ContractTyped, InitSignature>) {
    // Assign Config
    const { bytecode, salt, contractInterface, initOptions, msgSender } = args;
    const cloneFactoryAddress = args.cloneFactoryAddress ?? ERC1167FactoryAddress;

    // Setup Initializer Data
    //@ts-expect-error
    const initData = getInitData<ContractTyped, InitSignature>(contractInterface, initOptions);
    const initSalt = getSalt({ salt, initData, msgSender });

    // Setup Initializer Data
    const address = Create2.computeAddress(initSalt, utils.keccak256(bytecode), cloneFactoryAddress);
    return address;
}

export interface CloneDeterministicAddressArgs<
    ContractTyped extends BaseContract = BaseContract,
    InitSignature extends keyof ContractTyped | void = void,
> extends GetAddressArgs<ContractTyped, InitSignature> {
    implementationAddress: string;
}

export function cloneDeterministicAddress<
    ContractTyped extends BaseContract = BaseContract,
    InitSignature extends keyof ContractTyped | void = void,
>(args: CloneDeterministicAddressArgs<ContractTyped, InitSignature>): string {
    // Assign Config
    const { implementationAddress, salt, contractInterface, initOptions, msgSender } = args;
    const cloneFactoryAddress = args.cloneFactoryAddress ?? ERC1167FactoryAddress;

    // Setup Initializer Data
    //@ts-expect-error
    const initData = getInitData<ContractTyped, InitSignature>(contractInterface, initOptions);
    const initSalt = getSalt({ salt, initData, msgSender });

    return Clones.predictDeterministicAddress(implementationAddress, initSalt, cloneFactoryAddress);
}
