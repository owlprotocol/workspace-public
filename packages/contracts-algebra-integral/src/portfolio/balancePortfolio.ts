/**
 * Get path Address[] => bytes
 *
 * Get trade logic
 * inputAmount / outputAmount
 * input address
 * output address
 * intermediate addresses[]
 * => compute paths for all, call estimate for all
 * **no gas estimation in consideration for now???**
 * gasPrice
 * if output === WETH auto convert
 * else get price using DEX as oracle
 *
 * Get portfolio values (use get trade logic)
 * tokens Address[]
 * unitToken Address
 * Get balances
 * Get unit values
 * Get portfolio rebalance
 */
/** Defaults to 0x4200000000000000000000000000000000000006 */
// wethAddress?: Address;
//0x7c5aaa464f736740156fd69171505d344855d1e5 (QuoterV2 Mode)

import { Address, PublicClient } from "viem";
import { mapValues } from "lodash-es";
import { Portfolio } from "./getPortfolio.js";

export interface BalancePortfolioParams extends Portfolio {
    /** Network public client */
    publicClient: PublicClient;
    /** Algebra Integral quoter address */
    quoterV2Address: Address;
    /** Intermediate trading assets */
    intermediateAddresses?: Address[];
    /** Gas price override */
    gasPrice?: bigint | null;
    /** WETH address for gas valuation */
    wethAddress?: Address;
    /** Target basis point distribution of portfolio */
    targetBasisPoints: Record<Address, number>;
}

/**
 * Get necessary trades to balance portfolio to target basis points
 */
export function balancePortfolio(params: BalancePortfolioParams) {}

export interface GetBalancePortfolioAmounts {
    /** Assets */
    assets: Record<Address, { balance: bigint; value: bigint }>;
    /** Target Ratios, up to 4 decimals, ideally sum up to 100 (percentage), 10_000 (basis points) */
    targetRatios: Record<Address, number>;
}

/**
 * Compute target balances
 * @param params
 */
export function getBalancePortfolioAmounts(params: GetBalancePortfolioAmounts) {
    const { assets, targetRatios } = params;

    const totalValue = Object.values(assets).reduce((acc, curr) => acc + curr.value, 0n);
    const totalRatios = Object.values(targetRatios).reduce((acc, curr) => acc + curr, 0);

    const targetAssets = mapValues(assets, (asset: { balance: bigint; value: bigint }, address: Address) => {
        const value = (asset.value * BigInt(targetRatios[address] * 10_000)) / BigInt(totalRatios * 10_000);
        // Scale balance
        const balance = (asset.balance * value) / asset.value;

        return { balance, value };
    }) as unknown as Record<Address, { balance: bigint; value: bigint }>;

    return {
        totalValue,
        totalRatios,
        targetAssets,
    };
}
