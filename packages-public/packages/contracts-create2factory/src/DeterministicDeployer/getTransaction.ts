import { Address, Hash, Hex, concat, encodeAbiParameters, isHex } from "viem";
import { DETERMINISTIC_DEPLOYER_ADDRESS } from "./constants.js";
import { getDeployDeterministicAddress } from "./getAddress.js";
import { Clients } from "../clients.js";

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
 * Get or deploy contract using DeterministicDeployer
 * @param clients publicClient, walletClient
 * @param salt Hex
 * @param bytecode Hex
 * @returns deploy transaction hash
 */
export async function getOrDeployDeterministicContract(
    clients: Clients,
    { salt, bytecode }: { salt: Hash; bytecode: Hex },
): Promise<{
    address: Address;
    hash: Hash | undefined;
    existed: boolean;
}> {
    const { publicClient, walletClient } = clients;
    const address = getDeployDeterministicAddress({ salt, bytecode });
    //Check if contract exists
    const existingByteCode = await publicClient.getBytecode({ address });
    if (existingByteCode != undefined) {
        return {
            address,
            hash: undefined,
            existed: true,
        };
    }

    const { to, data } = getDeployDeterministicFunctionData({ salt, bytecode });
    const hash = await walletClient.sendTransaction({ to, data });

    return {
        address,
        hash,
        existed: false,
    };
}
