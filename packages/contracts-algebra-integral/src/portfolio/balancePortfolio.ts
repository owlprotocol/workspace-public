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
import { bigIntFillBucket } from "../utils/bigIntFillBucket.js";

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
    // inputs, balance will decrease (valueDelta < 0)
    // sort descending (ascending absolute value)
    const inputs = filter(portfolio, (e) => e.valueDelta < 0n).sort((a, b) =>
        bigIntPredicate(b.valueDelta, a.valueDelta),
    );
    // outputs, balance will increase (valueDelta > 0)
    // sort ascending
    const outputs = filter(portfolio, (e) => e.valueDelta > 0n).sort((a, b) =>
        bigIntPredicate(a.valueDelta, b.valueDelta),
    );

    // prepare for trade matching algo
    const inputValues = inputs.map((e) => -1n * e.valueDelta);
    const outputValues = outputs.map((e) => e.valueDelta);
    const tradeIndices = bigIntFillBucket(inputValues, outputValues);
    const tradeData = tradeIndices.map(([inputIdx, outputIdx, value]) => {
        const input = inputs[inputIdx];
        const amountIn = (input.balanceDelta * value) / input.valueDelta;
        input.balanceDelta += amountIn;
        input.valueDelta += value;

        const output = outputs[outputIdx];
        const amountOut = (output.balanceDelta * value) / output.valueDelta;
        output.balanceDelta -= amountOut;
        output.valueDelta -= value;

        return {
            input,
            output,
            amountIn,
            amountOut,
        };
    });
    const trades: Trade[] = await Promise.all(
        tradeData.map(async (t) => {
            const estimate = await getOptimalTradeExactInput({
                publicClient,
                quoterV2Address,
                amountIn: t.amountIn,
                inputAddress: t.input.address,
                outputAddress: t.output.address,
                intermediateAddresses,
                gasPrice,
                wethAddress,
            });
            return estimate.optimalTrade;
        }),
    );

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
