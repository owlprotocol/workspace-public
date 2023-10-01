import type { BaseContract } from "ethers";
import { BEACON_ADMIN } from "@owlprotocol/envvars";
import { Interface } from "@ethersproject/abi";
import { getInitData } from "./getInitData.js";
import {
    getDeployAddress,
    getCloneWithInitAddress,
    getDeployWithInitAddress,
    getBeaconAddress,
    getProxyWithInitAddress,
} from "./getAddress.js";
import { SaltArgs } from "./getSalt.js";
import {
    getBeaconCodeDataInitData,
    getCloneCodeDataInitData,
    getProxyCodeDataInitData,
} from "./getCodeDataInitData.js";
import { CREATE2_FACTORY_ADDRESS } from "./Create2FactoryAddress.js";
import { ContractFactoryClass } from "./ContractFactoryClass.js";

/**
 * Partial application of `getInitData` using interface
 * @param contractInterface
 * @returns
 */
export function getInitDataFromInterface<InitArgs>(contractInterface: Interface) {
    return function (initArgs: InitArgs) {
        return getInitData(contractInterface, initArgs);
    };
}

/**
 * Partial application of `getCreate2FactoryDeployWithInitAddress` using interfce
 * @param contractInterface
 * @returns
 */
export function getDeployWithInitAddressFromInterface<InitArgs>(contractInterface: Interface) {
    return function (
        codeData: string,
        initArgs: InitArgs,
        saltArgs?: Partial<Omit<SaltArgs, "initData">>,
        create2FactoryAddress = CREATE2_FACTORY_ADDRESS,
    ) {
        return getDeployWithInitAddress(contractInterface, codeData, initArgs, saltArgs, create2FactoryAddress);
    };
}

/**
 * Partial application of `getCloneWithInitAddress` using interface
 * @param contractInterface
 * @returns
 */
export function getCloneWithInitAddressFromInterface<InitArgs>(contractInterface: Interface) {
    return function (
        implementation: string,
        initArgs: InitArgs,
        saltArgs?: Partial<Omit<SaltArgs, "initData">>,
        create2FactoryAddress = CREATE2_FACTORY_ADDRESS,
    ) {
        return getCloneWithInitAddress(contractInterface, implementation, initArgs, saltArgs, create2FactoryAddress);
    };
}

/**
 * Partial application of `getCloneCodeDataInitData` using interface
 * @param contractInterface
 * @returns
 */
export function getCloneCodeDataInitDataFromInterface<InitArgs>(contractInterface: Interface) {
    return function (implementation: string, initArgs: InitArgs) {
        return getCloneCodeDataInitData(contractInterface, implementation, initArgs);
    };
}

/**
 * Partial application of `getProxyWithInitAddress` using interface
 * @param contractInterface
 * @returns
 */
export function getProxyWithInitAddressFromInterface<InitArgs>(contractInterface: Interface) {
    return function (
        admin: string,
        beaconAddress: string,
        initArgs: InitArgs,
        saltArgs?: Partial<Omit<SaltArgs, "initData">>,
        create2FactoryAddress = CREATE2_FACTORY_ADDRESS,
    ) {
        return getProxyWithInitAddress(
            contractInterface,
            admin,
            beaconAddress,
            initArgs,
            saltArgs,
            create2FactoryAddress,
        );
    };
}

/**
 * Partial application of `getProxyCodeDataInitData` using interface
 * @param contractInterface
 * @returns
 */
export function getProxyCodeDataInitDataFromInterface<InitArgs>(contractInterface: Interface) {
    return function (admin: string, beaconAddress: string, initArgs: InitArgs) {
        return getProxyCodeDataInitData(contractInterface, admin, beaconAddress, initArgs);
    };
}

/**
 * Create wrapper utils for 1 deployment method for non-initializable contracts (implementation only)
 *  1. Implementation: Implementation contract with no init data
 * //TODO: Support constructor deployment of deploy
 * @param factory
 * @param name name of factory wrapper (useful for debugging)
 * @returns
 */
export function getCreate2FactoryImplementationWrapper<C extends BaseContract>(
    factory: ContractFactoryClass<C>,
    name?: string,
) {
    const type = "Create2FactoryImplementationWrapper" as const;
    //Utils
    const contractInterface = factory.createInterface();

    //1. Implementation
    function getImplementationAddress(saltArgs?: Partial<SaltArgs>, create2FactoryAddress = CREATE2_FACTORY_ADDRESS) {
        const codeData = factory.bytecode;
        return getDeployAddress(codeData, saltArgs, create2FactoryAddress);
    }
    const defaultImplementation = getImplementationAddress();
    function getImplementationCodeDataInitData() {
        return {
            codeData: factory.bytecode,
            initData: "0x",
        };
    }

    return {
        type,
        name,
        //Utils
        contractInterface,
        //1. Implementation
        getImplementationAddress,
        getImplementationCodeDataInitData,
        defaultImplementation,
    } as const;
}
export type Create2FactoryImplementationWrapper = ReturnType<typeof getCreate2FactoryImplementationWrapper>;

/**
 * Create wrapper utils for 5 deployment methods for initializable contracts
 *  1. Implementation: Implementation contract with no init data
 *  2. Deploy: CREATE2 deploy with no proxies
 *  3. Clone: EIP1167 proxy pointing to implementation
 *  4. Beacon: UpgradeableBeacon contract storing implementation
 *  5. Proxy: Proxy contract pointing to beacon
 * @param factory
 * @param name name of factory wrapper (useful for debugging)
 * @param defaultBeaconAdmin used for computing default admin for beacon (NOT for proxies)
 * @returns
 */
export function getCreate2FactoryInitializableWrapper<InitArgs, C extends BaseContract>(
    factory: ContractFactoryClass<C>,
    name?: string,
    defaultBeaconAdmin = BEACON_ADMIN,
) {
    const type = "Create2FactoryInitializableWrapper" as const;
    //1. Implementation
    const { contractInterface, getImplementationAddress, defaultImplementation, getImplementationCodeDataInitData } =
        getCreate2FactoryImplementationWrapper(factory, name);

    const getInitData = getInitDataFromInterface<InitArgs>(contractInterface);
    //2. Deploy
    const getDeployWithInitAddressForInterface = getDeployWithInitAddressFromInterface<InitArgs>(contractInterface);
    function getDeployWithInitAddressForFactory(
        initArgs: InitArgs,
        saltArgs?: Partial<Omit<SaltArgs, "initData">>,
        create2FactoryAddress = CREATE2_FACTORY_ADDRESS,
    ) {
        return getDeployWithInitAddressForInterface(factory.bytecode, initArgs, saltArgs, create2FactoryAddress);
    }
    function getDeployCodeDataInitData(initArgs: InitArgs) {
        return {
            codeData: factory.bytecode,
            initData: getInitData(initArgs),
        };
    }

    //3. Clone
    const getCloneWithInitAddressForInterface = getCloneWithInitAddressFromInterface<InitArgs>(contractInterface);
    function getCloneWithInitAddressForFactory(initArgs: InitArgs, implementation = defaultImplementation) {
        return getCloneWithInitAddressForInterface(implementation, initArgs);
    }
    const getCloneCodeDataInitDataForInterface = getCloneCodeDataInitDataFromInterface<InitArgs>(contractInterface);
    function getCloneCodeDataInitDataForFactory(initArgs: InitArgs, implementation = defaultImplementation) {
        return getCloneCodeDataInitDataForInterface(implementation, initArgs);
    }

    //4. Beacon
    /**
     * Same as getBeaconAddress but with default `admin` and `implementation`
     * @param admin
     * @param implementation
     * @param saltArgs
     * @param create2FactoryAddress
     */
    function getBeaconAddressForFactory(
        admin = defaultBeaconAdmin,
        implementation = defaultImplementation,
        saltArgs?: Partial<Omit<SaltArgs, "initData">>,
        create2FactoryAddress = CREATE2_FACTORY_ADDRESS,
    ) {
        return getBeaconAddress(admin, implementation, saltArgs, create2FactoryAddress);
    }

    /**
     * Same as getBeaconCodeDataInitData but with default `admin` and `implementation`
     * @returns
     */
    function getBeaconCodeDataInitDataForFactory(admin = defaultBeaconAdmin, implementation = defaultImplementation) {
        return getBeaconCodeDataInitData(admin, implementation);
    }
    const defaultBeacon = getBeaconAddressForFactory();

    //5. Proxy
    const getProxyWithInitAddressForInterface = getProxyWithInitAddressFromInterface<InitArgs>(contractInterface);
    function getProxyWithInitAddressForFactory(
        admin: string,
        initArgs: InitArgs,
        beaconAddress = defaultBeacon,
        saltArgs?: Partial<Omit<SaltArgs, "initData">>,
        create2FactoryAddress = CREATE2_FACTORY_ADDRESS,
    ) {
        return getProxyWithInitAddressForInterface(admin, beaconAddress, initArgs, saltArgs, create2FactoryAddress);
    }
    const getProxyCodeDataInitDataForInterface = getProxyCodeDataInitDataFromInterface<InitArgs>(contractInterface);
    function getProxyCodeDataInitDataForFactory(admin: string, initArgs: InitArgs, beaconAddress = defaultBeacon) {
        return getProxyCodeDataInitDataForInterface(admin, beaconAddress, initArgs);
    }

    return {
        type,
        name,
        //Utils
        contractInterface,
        getInitData,
        //1. Implementation
        getImplementationAddress,
        getImplementationCodeDataInitData,
        defaultImplementation,
        //2. Deploy
        getDeployAddress: getDeployWithInitAddressForFactory,
        getDeployCodeDataInitData,
        //3. Clone
        getCloneAddress: getCloneWithInitAddressForFactory,
        getCloneCodeDataInitData: getCloneCodeDataInitDataForFactory,
        //4. Beacon
        getBeaconAddress: getBeaconAddressForFactory,
        getBeaconCodeDataInitData: getBeaconCodeDataInitDataForFactory,
        defaultBeacon,
        //5. Proxy
        getProxyAddress: getProxyWithInitAddressForFactory,
        getProxyCodeDataInitData: getProxyCodeDataInitDataForFactory,
    } as const;
}

export type Create2FactoryInitializableWrapper = ReturnType<typeof getCreate2FactoryInitializableWrapper>;
export type Create2FactoryWrapper = Create2FactoryImplementationWrapper | Create2FactoryInitializableWrapper;
