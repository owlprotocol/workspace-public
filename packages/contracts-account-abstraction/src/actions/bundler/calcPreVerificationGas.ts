import { Address, Client } from "viem";
import * as chains from "viem/chains";
import { getAction } from "viem/utils";
import { getChainId } from "viem/actions";
import { calcArbitrumPreVerificationGas } from "./calcArbitrumPreVerificationGas.js";
import { calcOptimismPreVerificationGas } from "./calcOptimismPreVerificationGas.js";
import { calcDefaultPreVerificationGas } from "../../gasestimation/calcDefaultPreVerificationGas.js";
import { GasOverheads } from "../../models/GasOverheads.js";
import { PackedUserOperation } from "../../models/PackedUserOperation.js";

/**
 * Calculates `preVerificationGas` using the following
 * - calcDefaultPreVerificationGas get initial `preVerificationGas` estimation
 * - calcOptimismPreVerificationGas if OPStack chain
 * - calcArbitrumPreVerificationGas if Arbitrum Orbit chain
 * TODO: What are these? Is the calculation just greedy?
 * - Additional estimations for custom chainIds
 * @param publicClient
 * @param packedUserOperation
 * @param entryPoint
 * @param chainId
 * @param overheads
 * @returns
 */
export async function calcPreVerificationGas(
    client: Client,
    parameters: {
        packedUserOperation: PackedUserOperation;
        entryPoint: Address;
        overheads?: GasOverheads;
    },
): Promise<bigint> {
    const { packedUserOperation, entryPoint, overheads } = parameters;

    const chainId = client.chain?.id ?? (await getAction(client, getChainId, "getChainId")({}));

    //TODO: Refactor this logic if possible to make it more modular as chainIds are hard-coded rn
    //TODO: Is default calculation required?
    let preVerificationGas = calcDefaultPreVerificationGas(packedUserOperation, overheads);

    if (chainId === 59140 || chainId === 59142) {
        preVerificationGas *= 2n;
    } else if (
        chainId === chains.optimism.id ||
        chainId === chains.optimismSepolia.id ||
        chainId === chains.optimismGoerli.id ||
        chainId === chains.base.id ||
        chainId === chains.baseGoerli.id ||
        chainId === chains.baseSepolia.id ||
        chainId === chains.opBNB.id ||
        chainId === chains.opBNBTestnet.id ||
        chainId === 957 // Lyra chain
    ) {
        preVerificationGas = await calcOptimismPreVerificationGas(client, {
            packedUserOperation,
            entryPoint,
            staticFee: preVerificationGas,
        });
    } else if (
        chainId === chains.arbitrum.id ||
        chainId === chains.arbitrumNova.id ||
        chainId === chains.arbitrumSepolia.id
    ) {
        preVerificationGas = await calcArbitrumPreVerificationGas(client, {
            packedUserOperation,
            entryPoint,
            staticFee: preVerificationGas,
        });
    }

    return preVerificationGas;
}
