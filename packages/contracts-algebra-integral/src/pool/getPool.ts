import { Address, getCreate2Address, encodeAbiParameters, keccak256, hexToBigInt, Hex, PublicClient } from "viem";
import { safelyGetStateOfAMM } from "../artifacts/IAlgebraPool.js";

/**
 * Get the base/quote address pair for pool
 * Price is denominated in the quote currency
 * Follows the invariant that `token0 (base) < token1 (quote)`
 * when deploying pools which is also used for the price calculation
 * @see https://www.investopedia.com/terms/q/quotecurrency.asp
 * @param params token0, token1
 * @returns base, quote address
 */
export function getBaseQuotePair({ token0, token1 }: { token0: Address; token1: Address }) {
    // numerical comparison
    if (hexToBigInt(token0) < hexToBigInt(token1)) {
        return {
            base: token0,
            quote: token1,
        };
    }

    // reverse
    return {
        base: token1,
        quote: token0,
    };
}

/**
 * Compute liquidity pool address from tokens and deploy params
 * @see https://docs.algebra.finance/algebra-integral-documentation/algebra-integral-technical-reference/integration-process/interaction-with-pools/getting-data-from-pools#how-to-get-address-of-liquidity-pool
 * @param params token0, token1, poolDeployer, poolInitHash
 */
export function getPoolAddress({
    token0,
    token1,
    poolDeployer,
    poolInitCodeHash,
}: {
    token0: Address;
    token1: Address;
    poolDeployer: Address;
    poolInitCodeHash: Hex;
}) {
    const { base, quote } = getBaseQuotePair({ token0, token1 });
    const salt = keccak256(encodeAbiParameters([{ type: "address" }, { type: "address" }], [base, quote]));
    return getCreate2Address({
        bytecodeHash: poolInitCodeHash,
        from: poolDeployer,
        salt,
    });
}

/**
 * Get pool state using `safelyGetStateOfAMM` call
 * @see https://docs.algebra.finance/algebra-integral-documentation/algebra-integral-technical-reference/integration-process/interaction-with-pools/getting-data-from-pools#how-to-get-current-price-in-pool
 * @param params publicClient, address
 * @returns pool data
 */
export async function getPoolState({ publicClient, address }: { publicClient: PublicClient; address: Address }) {
    const [sqrtPrice, tick, lastFee, pluginConfig, activeLiquidity, nextTick, previousTick] =
        await publicClient.readContract({
            address,
            abi: [safelyGetStateOfAMM],
            functionName: "safelyGetStateOfAMM",
        });

    return {
        sqrtPrice,
        tick,
        lastFee,
        pluginConfig,
        activeLiquidity,
        nextTick,
        previousTick,
    };
}
