import { Account, Chain, Client, Transport, zeroHash } from "viem";
import { getOrDeployDeterministicContract, getOrPrepareDeterministicContract } from "@owlprotocol/viem-utils";
import { Create2Factory } from "../artifacts/Create2Factory.js";

/**
 * Prepare Create2Factory deployment transaction
 * @param client Client with chain & account
 * @returns
 */
export async function getOrPrepareCreate2Factory(client: Client<Transport, Chain, Account>) {
    return getOrPrepareDeterministicContract(client, { salt: zeroHash, bytecode: Create2Factory.bytecode });
}

/**
 * Deploy Create2Factory
 * @param client Client with chain & account
 * @returns
 */
export async function getOrDeployCreate2Factory(client: Client<Transport, Chain, Account>) {
    return getOrDeployDeterministicContract(client, { salt: zeroHash, bytecode: Create2Factory.bytecode });
}
