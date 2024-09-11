import { Address, PublicClient } from "viem";
import { cloneDeep, filter } from "lodash-es";
import { bigIntPredicate } from "../utils/bigIntPredicate.js";
import { getOptimalTradeExactInput, Trade } from "../quoter/getOptimalTrade.js";
import { bigIntFillBucket } from "../utils/bigIntFillBucket.js";

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
    deficit: { balanceDeficit: bigint; valueDeficit: bigint }[];
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

    return {
        trades,
        deficit: portfolio.map((a) => {
            return { balanceDeficit: a.balanceDelta, valueDeficit: a.valueDelta };
        }),
    };
}
