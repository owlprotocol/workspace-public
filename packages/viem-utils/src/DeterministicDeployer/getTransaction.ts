import {
    Account,
    Address,
    Chain,
    Client,
    Hash,
    Hex,
    TransactionRequest,
    Transport,
    concat,
    encodeAbiParameters,
    isHex,
} from "viem";
import { getAction } from "viem/utils";
import { getCode, prepareTransactionRequest, sendTransaction } from "viem/actions";
import { DETERMINISTIC_DEPLOYER_ADDRESS } from "./constants.js";
import { getDeployDeterministicAddress } from "./getAddress.js";

/**
 * Encode deploy deterministic fallback data
 * @param salt
 * @param bytecode
 * @returns
 */
export function getDeployDeterministicFunctionData({ salt, bytecode }: { salt: Hash; bytecode: Hex }): {
    to: Address;
    data: Hex;
} {
    const saltBytes32 = encodeAbiParameters([{ type: "bytes32" }], [salt]);
    if (!isHex(bytecode)) {
        throw new Error(`bytecode not hex: ${bytecode}`);
    }
    const data = concat([saltBytes32, bytecode]);

    return {
        to: DETERMINISTIC_DEPLOYER_ADDRESS,
        data,
    };
}

/**
 * Get or prepare contract deployment using DeterministicDeployer
 * @param client Client with chain & account
 * @param salt Hex
 * @param bytecode Hex
 * @returns deploy transaction hash
 */
export async function getOrPrepareDeterministicContract(
    client: Client<Transport, Chain, Account>,
    { salt, bytecode }: { salt: Hash; bytecode: Hex },
): Promise<{
    address: Address;
    request: TransactionRequest | undefined;
    existed: boolean;
}> {
    const address = getDeployDeterministicAddress({ salt, bytecode });
    //Check if contract exists
    const existingByteCode = await getAction(client, getCode, "getCode")({ address });
    if (existingByteCode != undefined) {
        return {
            address,
            request: undefined,
            existed: true,
        };
    }

    const { to, data } = getDeployDeterministicFunctionData({ salt, bytecode });
    const request = await getAction(
        client,
        prepareTransactionRequest,
        "prepareTransactionRequest",
    )({
        to,
        data,
        account: client.account,
        chain: client.chain,
        // Avoid computing nonce
        parameters: ["blobVersionedHashes", "chainId", "fees", "gas", "type"],
    });

    return {
        address,
        request,
        existed: false,
    };
}

/**
 * Get or deploy contract using DeterministicDeployer
 * @param client Client with chain & account
 * @param salt Hex
 * @param bytecode Hex
 * @returns deploy transaction hash
 */
export async function getOrDeployDeterministicContract(
    client: Client<Transport, Chain, Account>,
    { salt, bytecode }: { salt: Hash; bytecode: Hex },
): Promise<{
    address: Address;
    hash: Hash | undefined;
    existed: boolean;
}> {
    const { address, request, existed } = await getOrPrepareDeterministicContract(client, { salt, bytecode });

    let hash: Hash | undefined;
    if (request) {
        hash = await getAction(client, sendTransaction, "sendTransaction")(request as any);
    }

    return {
        address,
        hash,
        existed,
    };
}
