import type { BaseContract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import { getInitData } from "./getInitData.js";
import {
    getDeployAddress,
    getCloneWithInitAddress,
    getDeployWithInitAddress,
} from "./getCreate2FactoryDeployAddress.js";
import { SaltArgs } from "./getSalt.js";
import { getCloneCodeDataInitData } from "./getCreate2FactoryCodeDataInitData.js";
import { CREATE2_FACTORY_ADDRESS } from "./Create2FactoryAddress.js";

export interface ContractFactoryClass<C extends BaseContract> {
    connect(address: string, signerOrProvider: Signer | Provider): C;
    createInterface(): C["interface"];
    bytecode: string;
}
/**
 * Partial application of `getInitData` using interface
 * @param factory
 * @returns
 */
export function getInitDataFromInterface<C extends BaseContract>(contractInterface: C["interface"]) {
    //@ts-expect-error
    return function (initArgs?: Parameters<C["initialize"]>) {
        return getInitData(contractInterface, initArgs);
    };
}

/**
 * Partial application of `getCreate2FactoryDeployWithInitAddress` using interfce
 * @param factory
 * @returns
 */
export function getDeployWithInitAddressFromInterface<C extends BaseContract>(contractInterface: C["interface"]) {
    return function (
        codeData: string,
        //@ts-expect-error
        initArgs?: Parameters<C["initialize"]>,
        saltArgs?: Partial<Omit<SaltArgs, "initData">>,
        create2FactoryAddress = CREATE2_FACTORY_ADDRESS,
    ) {
        return getDeployWithInitAddress(contractInterface, codeData, initArgs, saltArgs, create2FactoryAddress);
    };
}

/**
 * Partial application of `getCreate2FactoryDeployCloneWithInitAddress` using interface
 * @param factory
 * @returns
 */
export function getCloneWithInitAddressFromInterface<C extends BaseContract>(contractInterface: C["interface"]) {
    return function (
        implementation: string,
        //@ts-expect-error
        initArgs?: Parameters<C["initialize"]>,
        saltArgs?: Partial<Omit<SaltArgs, "initData">>,
        create2FactoryAddress = CREATE2_FACTORY_ADDRESS,
    ) {
        return getCloneWithInitAddress(contractInterface, implementation, initArgs, saltArgs, create2FactoryAddress);
    };
}

/**
 * Partial application of `getCreate2FactoryDeployCloneCodeDataInitData` using interface
 * @param factory
 * @returns
 */
export function getCloneCodeDataInitDataFromInterface<C extends BaseContract>(contractInterface: C["interface"]) {
    return function (
        implementation: string,
        //@ts-expect-error
        initArgs?: Parameters<C["initialize"]>,
    ) {
        return getCloneCodeDataInitData(contractInterface, implementation, initArgs);
    };
}

export function getCreate2Factory<C extends BaseContract>(factory: ContractFactoryClass<C>) {
    const contractInterface = factory.createInterface();
    const getInitData = getInitDataFromInterface<C>(contractInterface);

    //Get Address
    function getCreate2FactoryImplementationAddress(
        saltArgs?: Partial<SaltArgs>,
        create2FactoryAddress = CREATE2_FACTORY_ADDRESS,
    ) {
        const codeData = factory.bytecode;
        return getDeployAddress(codeData, saltArgs, create2FactoryAddress);
    }

    //Default implementation, not init data
    const defaultImplementation = getCreate2FactoryImplementationAddress();

    const getDeployWithInitAddressForInterface = getDeployWithInitAddressFromInterface<C>(contractInterface);
    const getCloneWithInitAddressForInterface = getCloneWithInitAddressFromInterface<C>(contractInterface);
    const getCloneCodeDataInitDataForInterface = getCloneCodeDataInitDataFromInterface<C>(contractInterface);

    //Get codeData, initData
    function getImplementationCodeDataInitData() {
        return {
            codeData: factory.bytecode,
            initData: "0x",
        };
    }

    //@ts-expect-error
    function getDeployCodeDataInitData(initArgs?: Parameters<C["initialize"]>) {
        return {
            codeData: factory.bytecode,
            initData: getInitData(initArgs),
        };
    }

    function getCloneCodeDataInitDataForFactory(
        implementation = defaultImplementation,
        //@ts-expect-error
        initArgs?: Parameters<C["initialize"]>,
    ) {
        return getCloneCodeDataInitDataForInterface(implementation, initArgs);
    }

    //TODO
    //Beacon
    //Proxy

    return {
        contractInterface,
        getInitData,
        //Get Address
        getCreate2FactoryImplementationAddress,
        defaultImplementation,
        getDeployWithInitAddress: getDeployWithInitAddressForInterface,
        getCloneWithInitAddress: getCloneWithInitAddressForInterface,
        //Get codeData, initData
        getImplementationCodeDataInitData,
        getCloneCodeDataInitData: getCloneCodeDataInitDataForFactory,
        getDeployCodeDataInitData,
    } as const;
}
