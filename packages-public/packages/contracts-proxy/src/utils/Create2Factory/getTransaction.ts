import { Provider } from "@ethersproject/providers";
import { BEACON_ADMIN } from "@owlprotocol/envvars";
import { Signer } from "ethers";
import { CREATE2_FACTORY_ADDRESS } from "./Create2FactoryAddress.js";
import { DEFAULT_SALT, DEFAULT_MSG_SENDER, SaltArgs } from "./getSalt.js";
import { getDeployAddress } from "./getAddress.js";
import { Create2FactoryInitializableWrapper, Create2FactoryWrapper } from "./getFactory.js";
import { ICreate2Factory__factory } from "../../typechain/ethers/factories/contracts/Create2Factory/ICreate2Factory__factory.js";
import { zip } from "../../lodash.js";
import { logDeployment } from "../../utils.js";

/**
 * Get transaction data for deploying a batch of smart contracts
 * @param codeDataArray length MUST be > 0
 * @param initDataArray length MUST be equal to codeDataArray.length
 * @param saltArgs
 * @param create2FactoryAddress
 * @returns transaction data
 */
export function getDeployTransaction(
    codeDataArray: string[],
    initDataArray: string[],
    saltArgs?: Partial<Omit<SaltArgs, "initData">>,
    create2FactoryAddress = CREATE2_FACTORY_ADDRESS,
) {
    if (codeDataArray.length != initDataArray.length) {
        throw new Error(
            `CodeDataInitDataUnequalLength codeData.length (${codeDataArray.length}) != initData.length (${initDataArray.length})`,
        );
    }

    if (codeDataArray.length == 0) {
        throw new Error("codeDataArray.length === 0, would not deploy any contracts");
    }

    const { salt = DEFAULT_SALT, msgSender = DEFAULT_MSG_SENDER } = saltArgs ?? {};
    const data = ICreate2Factory__factory.createInterface().encodeFunctionData("deployDeterministic", [
        salt,
        msgSender,
        codeDataArray,
        initDataArray,
    ]);

    return {
        to: create2FactoryAddress,
        data,
    };
}

/**
 * Compute deployed addresses for batch contracts
 * @param codeDataArray length MUST be > 0
 * @param initDataArray length MUST be equal to codeDataArray.length
 * @param saltArgs
 * @param create2FactoryAddress
 * @returns predicted addresses for deployment
 */
export function getDeployContractAddresses(
    codeDataArray: string[],
    initDataArray: string[],
    saltArgs?: Partial<Omit<SaltArgs, "initData">>,
    create2FactoryAddress = CREATE2_FACTORY_ADDRESS,
) {
    if (codeDataArray.length != initDataArray.length) {
        throw new Error(
            `CodeDataInitDataUnequalLength codeData.length (${codeDataArray.length}) != initData.length (${initDataArray.length})`,
        );
    }

    if (codeDataArray.length == 0) {
        throw new Error("codeDataArray.length === 0, would not deploy any contracts");
    }

    const { salt = DEFAULT_SALT, msgSender = DEFAULT_MSG_SENDER } = saltArgs ?? {};
    const addresses = zip(codeDataArray, initDataArray).map(([codeData, initData]) => {
        return getDeployAddress(codeData!, { salt, msgSender, initData }, create2FactoryAddress);
    });

    return addresses;
}

/**
 * Compute deployed addresses for contracts
 * Check if they exist, if so omit them from transaction payload
 * Return transaction data, and wheter contracts exist or not
 * @param provider
 * @param codeDataArray length MUST be > 0
 * @param initDataArray length MUST be equal to codeDataArray.length
 * @param saltArgs
 * @param create2FactoryAddress
 * @returns predicted address for deployment
 */
export async function getDeployContractsTransaction(
    provider: Provider,
    codeDataArray: string[],
    initDataArray: string[],
    saltArgs?: Partial<Omit<SaltArgs, "initData">>,
    create2FactoryAddress = CREATE2_FACTORY_ADDRESS,
) {
    if (codeDataArray.length != initDataArray.length) {
        throw new Error(
            `CodeDataInitDataUnequalLength codeData.length (${codeDataArray.length}) != initData.length (${initDataArray.length})`,
        );
    }

    if (codeDataArray.length == 0) {
        throw new Error("codeDataArray.length === 0, would not deploy any contracts");
    }

    const { salt = DEFAULT_SALT, msgSender = DEFAULT_MSG_SENDER } = saltArgs ?? {};
    const addressArray = zip(codeDataArray, initDataArray).map(([codeData, initData]) => {
        return getDeployAddress(codeData!, { salt, msgSender, initData }, create2FactoryAddress);
    });

    const addressExistsArray = await Promise.all(
        addressArray.map(async (address) => {
            return (await provider.getCode(address)) != "0x";
        }),
    );

    const codeDataNewArray = zip(codeDataArray, addressExistsArray)
        .filter(([, exists]) => !exists)
        .map(([codeData]) => codeData!);
    const initDataNewArray = zip(initDataArray, addressExistsArray)
        .filter(([, exists]) => !exists)
        .map(([initData]) => initData!);

    if (codeDataNewArray.length === 0) {
        //All exist, not transaction
        return {
            addressArray,
            addressExistsArray,
        };
    }

    const transaction = getDeployTransaction(codeDataNewArray, initDataNewArray, saltArgs, create2FactoryAddress);

    return {
        addressArray,
        addressExistsArray,
        transaction,
    };
}

/**
 * Deploys implementation contracts and beacon contracts for array of Create2Factory wrappers
 * @param factories
 * @param beaconAdmin
 */
export function getDeployImplementationsAndBeaconsTransaction(
    provider: Provider,
    factories: Create2FactoryWrapper[],
    beaconAdmin = BEACON_ADMIN,
    saltArgs?: Partial<Omit<SaltArgs, "initData">>,
    create2FactoryAddress = CREATE2_FACTORY_ADDRESS,
) {
    const implementationsCodeDataInitDataArray = factories.map((f) => f.getImplementationCodeDataInitData());
    const beaconsCodeDataInitDataArray = factories
        .filter((f) => f.type === "Create2FactoryInitializableWrapper")
        .map((f) => (f as Create2FactoryInitializableWrapper).getBeaconCodeDataInitData(beaconAdmin));
    const codeDataInitDataArray = [...implementationsCodeDataInitDataArray, ...beaconsCodeDataInitDataArray];
    const codeDataArray = codeDataInitDataArray.map((c) => c.codeData);
    const initDataArray = codeDataInitDataArray.map((c) => c.initData);

    return getDeployContractsTransaction(provider, codeDataArray, initDataArray, saltArgs, create2FactoryAddress);
}

export async function deployImplementationsAndBeacons(
    signer: Signer,
    networkName: string,
    factories: Record<string, Create2FactoryWrapper>,
    nonce?: number,
) {
    const provider = signer.provider;
    if (!provider) throw new Error("signer.provider undefined");

    const implementationNames = Object.keys(factories).map(
        (k) => `${k.replace("__factory__create2", "")}Implementation`,
    );
    const beaconNames = Object.entries(factories)
        .filter(([, f]) => f.type === "Create2FactoryInitializableWrapper")
        .map(([k]) => `${k.replace("__factory__create2", "")}Beacon`);
    const factoriesArray = Object.values(factories) as unknown as Create2FactoryWrapper[];

    const { addressArray, addressExistsArray, transaction } = await getDeployImplementationsAndBeaconsTransaction(
        provider,
        factoriesArray,
    );

    //lay out is [...implementation, ...beacon] (beacons are only for initializable)
    const addressNames = [...implementationNames, ...beaconNames];
    const contracts = zip(addressArray, addressExistsArray, addressNames).map(([address, exists, name]) => {
        const label = name?.endsWith("Implementation") ? "implementation" : "beacon";
        logDeployment(networkName, name!, address!, label, exists ? "exists" : "deploying");

        return {
            address,
            exists,
            name,
        };
    });

    if (!transaction) {
        return { contracts };
    }

    const txResponse = await signer.sendTransaction({ ...transaction, nonce });

    return {
        contracts,
        tx: transaction,
        txResponse,
    };
}
