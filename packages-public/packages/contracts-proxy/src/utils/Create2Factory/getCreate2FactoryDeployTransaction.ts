import { Provider } from "@ethersproject/providers";
import { CREATE2_FACTORY_ADDRESS } from "./Create2FactoryAddress.js";
import { DEFAULT_SALT, DEFAULT_MSG_SENDER, SaltArgs } from "./getSalt.js";
import { getDeployAddress } from "./getCreate2FactoryDeployAddress.js";
import { ICreate2Factory__factory } from "../../typechain/ethers/factories/contracts/Create2Factory/ICreate2Factory__factory.js";
import { zip } from "../../lodash.js";

/**
 * Get transaction data for deploying a batch of smart contracts
 * @param codeDataArray
 * @param initDataArray
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
 * @param codeDataArray
 * @param initDataArray
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
 * @param codeDataArray
 * @param initDataArray
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
        .filter(([, exists]) => exists)
        .map(([codeData]) => codeData!);
    const initDataNewArray = zip(initDataArray, addressExistsArray)
        .filter(([, exists]) => exists)
        .map(([initData]) => initData!);

    const transaction = getDeployTransaction(codeDataNewArray, initDataNewArray, saltArgs, create2FactoryAddress);

    return {
        addressArray,
        addressExistsArray,
        transaction,
    };
}
