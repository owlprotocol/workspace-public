import { getDeployDeterministicAddress, getOrPrepareDeterministicContract } from "@owlprotocol/viem-utils";
import { Chain, Transport, Account, zeroHash, Client, TransactionRequest } from "viem";
import { Create2Factory } from "./artifacts/index.js";

export function getCreate2FactoryAddresses() {
    const create2Factory = getDeployDeterministicAddress({
        salt: zeroHash,
        bytecode: Create2Factory.bytecode,
    });

    return {
        create2Factory,
    };
}

export async function prepareCreate2FactoryContracts(client: Client<Transport, Chain, Account>) {
    const requests: TransactionRequest[] = [];

    const [create2Factory] = await Promise.all([
        getOrPrepareDeterministicContract(client, {
            salt: zeroHash,
            bytecode: Create2Factory.bytecode,
        }),
    ]);

    if (create2Factory.request) requests.push(create2Factory.request);

    return {
        requests,
        create2Factory,
    };
}
