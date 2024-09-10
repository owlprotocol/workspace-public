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
import { cloneDeep, filter, pickBy, mapValues, map } from "lodash-es";
import { Prettify } from "@owlprotocol/utils/types";
import { Portfolio } from "./getPortfolio.js";
import { bigIntPredicate } from "../utils/bigIntPredicate.js";
import { getOptimalTradeExactInput, getOptimalTradeExactOutput, Trade } from "../quoter/getOptimalTrade.js";

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

export interface GetBalancePortfolioTradesAsset {
    address: Address;
    balanceDelta: bigint;
    valueDelta: bigint;
}

export interface GetBalancePortfolioTradesParams {
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
    /** Target asset values */
    assets: GetBalancePortfolioTradesAsset[];
}

/**
 * Get optimal trades to rebalance portfolio
 * @param params
 */
export async function getBalancePortfolioTrades(params: GetBalancePortfolioTradesParams): Promise<{
    trades: Trade[];
    delta: GetBalancePortfolioTradesAsset[];
}> {
    const { publicClient, quoterV2Address, intermediateAddresses, gasPrice, wethAddress } = params;

    const portfolio = cloneDeep(params.assets);
    // inputs, balance will decrease
    const inputs = filter(portfolio, (a) => a.balanceDelta < 0);
    // outputs, balance will increase
    const outputs = filter(portfolio, (a) => a.balanceDelta > 0);

    const trades: Trade[] = [];

    while (true) {
        console.debug(portfolio);
        if (inputs.length === 0 || outputs.length === 0) {
            // No more assets left to trade
            break;
        }

        // Greedy algorithm, match smallest input to smallest output
        // smallest input, values are negative so sort ascending
        const smallestInput = inputs.sort((a, b) => bigIntPredicate(a.valueDelta, b.valueDelta))[inputs.length - 1];
        // smallest output, values are positive so sort descending
        const smallestOutput = outputs.sort((a, b) => bigIntPredicate(b.valueDelta, a.valueDelta))[outputs.length - 1];

        const tradeExactInput = await getOptimalTradeExactInput({
            publicClient,
            quoterV2Address,
            amountIn: smallestInput.balanceDelta * -1n,
            inputAddress: smallestInput.address,
            outputAddress: smallestOutput.address,
            intermediateAddresses,
            gasPrice,
            wethAddress,
        });

        if (tradeExactInput.optimalTrade.quote.amountOut < smallestOutput.balanceDelta) {
            // Add trade
            trades.push(tradeExactInput.optimalTrade);
            // All inputs consumed
            smallestInput.valueDelta = 0n;
            smallestInput.balanceDelta = 0n;
            inputs.pop();
            // Update output value delta proportionally
            smallestOutput.valueDelta -=
                (smallestOutput.valueDelta * tradeExactInput.optimalTrade.quote.amountOut) /
                smallestOutput.balanceDelta;
            // Update output balance delta
            smallestOutput.balanceDelta -= tradeExactInput.optimalTrade.quote.amountOut;
            continue;
        }

        // Too large trade, use getOptimalTradeExactOutput
        const tradeExactOutput = await getOptimalTradeExactOutput({
            publicClient,
            quoterV2Address,
            amountOut: smallestOutput.balanceDelta,
            inputAddress: smallestInput.address,
            outputAddress: smallestOutput.address,
            intermediateAddresses,
            gasPrice,
            wethAddress,
        });

        // Add trade
        trades.push(tradeExactOutput.optimalTrade);
        // Update input balance delta proportionally
        smallestInput.valueDelta +=
            (smallestInput.valueDelta * tradeExactInput.optimalTrade.quote.amountIn) / smallestInput.balanceDelta;
        // Update input balance delta
        smallestInput.balanceDelta += tradeExactOutput.optimalTrade.quote.amountIn;
        // All outputs consumed
        smallestOutput.valueDelta = 0n;
        smallestOutput.balanceDelta = 0n;
        outputs.pop();
        continue;
    }

    return { trades, delta: portfolio };
}

export interface GetBalancePortfolioAmountsAssetParam {
    balance: bigint;
    value: bigint;
    targetRatio: number;
}

export interface GetBalancePortfolioAmountsAssetReturnType {
    balanceTarget: bigint;
    balanceDelta: bigint;
    valueTarget: bigint;
    valueDelta: bigint;
}

/**
 * Compute target balances
 * @param assets
 */
export function getBalancePortfolioAmounts<T extends GetBalancePortfolioAmountsAssetParam>({
    assets,
}: {
    assets: T[];
}): {
    totalValue: bigint;
    totalRatios: number;
    targetAssets: Prettify<T & GetBalancePortfolioAmountsAssetReturnType>[];
} {
    const totalValue = assets.reduce((acc, curr) => acc + curr.value, 0n);
    const totalRatios = assets.reduce((acc, curr) => acc + curr.targetRatio, 0);

    const targetAssets = map(assets, (asset) => {
        const { balance, value, targetRatio } = asset;
        const valueTarget = (totalValue * BigInt(targetRatio * 10_000)) / BigInt(totalRatios * 10_000);
        const valueDelta = valueTarget - value;
        // Scale balance
        const balanceTarget = (balance * valueTarget) / value;
        const balanceDelta = balanceTarget - balance;

        return { ...asset, balanceTarget, balanceDelta, valueTarget, valueDelta };
    });

    return {
        totalValue,
        totalRatios,
        targetAssets,
    };
}
