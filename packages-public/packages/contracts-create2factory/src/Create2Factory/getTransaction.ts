import { fromPairs, zip } from "lodash-es";
import { Address, Hash, encodeFunctionData, zeroAddress, zeroHash } from "viem";
import { CREATE2_FACTORY_ADDRESS } from "./constants.js";
import { ContractCreateArgs, getDeployAddress } from "./getAddress.js";
import { ICreate2Factory } from "../artifacts/ICreate2Factory.js";
import { Clients } from "../clients.js";

/**
 * Get transaction data for deploying a batch of smart contracts
 * @param msgSender msg.sender or address(0)
 * @param contracts creation args for each contract
 * @param create2FactoryAddress
 * @returns transaction data
 */
export function getDeployFunctionData(
    msgSender: Address,
    contracts: ContractCreateArgs[],
    create2FactoryAddress = CREATE2_FACTORY_ADDRESS,
) {
    const data = encodeFunctionData({
        abi: ICreate2Factory.abi,
        functionName: "create",
        args: [msgSender, contracts],
    });

    return {
        to: create2FactoryAddress,
        data,
    };
}

/**
 * Compute deployed addresses for contracts
 * Check if they exist, if so omit them from transaction
 * @param publicClient
 * @param msgSender msg.sender or address(0)
 * @param contracts creation args for each contract
 * @param create2FactoryAddress
 * @returns creation args (for new contracts), addresses (for new contracts), addressesAll (includes existing)
 */
export async function getDeployContractsParams(
    { publicClient }: Pick<Clients, "publicClient">,
    msgSender: Address,
    contracts: ContractCreateArgs[],
    create2FactoryAddress = CREATE2_FACTORY_ADDRESS,
) {
    //console.debug("getTransaction, provider.getCode", address);
    /*
    //TODO: Errors when RPC req/s too low. Current fix execute sequentially.
    //TODO: Explore fix to handle HTTP 429 / other errors while still batching if possible
    const addressExists = await Promise.all(
        address.map(async (address) => {
            return (await provider.getCode(address)) != "0x";
        }),
    );
    */
    // Compute addresses and check bytecode
    const addressesAll: { address: Address; exists: boolean }[] = [];
    for (const contract of contracts) {
        const address = getDeployAddress(msgSender, contract, create2FactoryAddress);
        const bytecode = await publicClient.getBytecode({ address });
        addressesAll.push({ address, exists: bytecode != undefined });
    }
    //console.debug(address, addressExists);
    const contractsNew = zip(contracts, addressesAll)
        .filter(([, address]) => address!.exists == false)
        .map(([c]) => c!);
    const addressesNew = addressesAll.filter((a) => !a.exists).map((a) => a.address);

    return {
        contractsNew,
        addressesAll,
        addressesNew,
    };
}

/**
 * Deploy contracts, we recommend calling `getDeployContractsParams()` beforehand to
 * filter out contracts that are already deployed to save gas.
 * @param clients walletClient, publicClient
 * @param msgSender msg.sender or address(0)
 * @param contracts creation args for each contract
 * @param create2FactoryAddress
 * @returns deploy transaction hash
 */
export async function deployContracts(
    clients: Clients,
    msgSender: Address,
    contracts: ContractCreateArgs[],
    create2FactoryAddress = CREATE2_FACTORY_ADDRESS,
) {
    if (contracts.length === 0) throw new Error("contracts.length == 0");

    const { publicClient, walletClient } = clients;

    const { request } = await publicClient.simulateContract({
        address: create2FactoryAddress,
        abi: ICreate2Factory.abi,
        functionName: "create",
        //TODO: Type inference incorrect for some reason
        args: [msgSender, contracts as any],
        account: walletClient.account,
    });

    return walletClient.writeContract(request);
}

/**
 * Call `deployContracts(getDeployContractsParams(...))`
 * Deploys contracts that don't exist and computes addresses for all
 * @param clients walletClient, publicClient
 * @param msgSender msg.sender or address(0)
 * @param contracts creation args for each contract
 * @param create2FactoryAddress
 * @returns deploy transaction hash
 */
export async function getOrDeployContracts(
    clients: Clients,
    msgSender: Address,
    contracts: ContractCreateArgs[],
    create2FactoryAddress = CREATE2_FACTORY_ADDRESS,
) {
    const { contractsNew, addressesAll } = await getDeployContractsParams(
        clients,
        msgSender,
        contracts,
        create2FactoryAddress,
    );

    let hash: Hash | undefined;
    if (contractsNew.length > 0) {
        hash = await deployContracts(clients, msgSender, contractsNew, create2FactoryAddress);
    }

    return {
        hash,
        addresses: addressesAll,
    };
}

/**
 * Version of `getOrDeployContracts` for implementation contracts
 *   - msgSender is set to address(0)
 *   - salt is set to bytes32(0)
 *   - initData is set to 0x
 * @param clients walletClient, publicClient
 * @param msgSender msg.sender or address(0)
 * @param contracts creation args for each contract
 * @param create2FactoryAddress
 * @returns deploy transaction hash
 */
export async function getOrDeployImplementations(
    clients: Clients,
    contracts: Omit<ContractCreateArgs, "salt" | "initData">[],
    create2FactoryAddress = CREATE2_FACTORY_ADDRESS,
) {
    return getOrDeployContracts(
        clients,
        zeroAddress,
        contracts.map((c) => {
            return { salt: zeroHash, bytecode: c.bytecode, initData: "0x" };
        }),
        create2FactoryAddress,
    );
}

/**
 * Call `getOrDeployContracts` but return as keyvalue
 * @param clients walletClient, publicClient
 * @param msgSender msg.sender or address(0)
 * @param contracts creation args for each contract
 * @param create2FactoryAddress
 * @returns deploy transaction hash
 */
export async function getOrDeployContractsObj<
    T extends Record<string, ContractCreateArgs> = Record<string, ContractCreateArgs>,
>(clients: Clients, msgSender: Address, contracts: T, create2FactoryAddress = CREATE2_FACTORY_ADDRESS) {
    const resultDeploy = await getOrDeployContracts(
        clients,
        msgSender,
        Object.values(contracts),
        create2FactoryAddress,
    );

    const addresses = fromPairs(
        zip(
            Object.keys(contracts),
            resultDeploy.addresses.map((info) => {
                return { ...info };
            }),
        ),
    ) as Record<keyof T, { address: Address; exists: boolean }>;

    return {
        hash: resultDeploy.hash,
        addresses,
    };
}
