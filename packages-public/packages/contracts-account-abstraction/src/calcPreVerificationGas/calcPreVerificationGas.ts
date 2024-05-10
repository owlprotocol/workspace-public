import { Address, PublicClient, Chain, Transport } from "viem";
import * as chains from "viem/chains";
import { calcDefaultPreVerificationGas } from "./calcDefaultPreVerificationGas.js";
import { GasOverheads } from "./GasOverheads.js";
import { calcArbitrumPreVerificationGas } from "./calcArbitrumPreVerificationGas.js";
import { calcOptimismPreVerificationGas } from "./calcOptimismPreVerificationGas.js";
import { PackedUserOperation } from "../PackedUserOperation.js";

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
    publicClient: PublicClient<Transport, Chain>,
    packedUserOperation: PackedUserOperation,
    entryPoint: Address,
    overheads?: GasOverheads,
): Promise<bigint> {
    //TODO: Refactor this logic if possible to make it more modular as chainIds are hard-coded rn
    //TODO: Is default calculation required?
    let preVerificationGas = calcDefaultPreVerificationGas(packedUserOperation, overheads);
    const chainId = publicClient.chain.id;

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
        preVerificationGas = await calcOptimismPreVerificationGas(
            publicClient,
            packedUserOperation,
            entryPoint,
            preVerificationGas,
        );
    } else if (
        chainId === chains.arbitrum.id ||
        chainId === chains.arbitrumNova.id ||
        chainId === chains.arbitrumSepolia.id
    ) {
        preVerificationGas = await calcArbitrumPreVerificationGas(
            publicClient,
            packedUserOperation,
            entryPoint,
            preVerificationGas,
        );
    }

    return preVerificationGas;
}
