import { map } from "lodash-es";
import { Prettify } from "@owlprotocol/utils/types";

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
export function getBalancePortfolioAmounts({ assets }: { assets: GetBalancePortfolioAmountsAssetParam[] }): {
    totalValue: bigint;
    totalRatios: number;
    targetBalances: Prettify<GetBalancePortfolioAmountsAssetReturnType>[];
} {
    const totalValue = assets.reduce((acc, curr) => acc + curr.value, 0n);
    const totalRatios = assets.reduce((acc, curr) => acc + curr.targetRatio, 0);
    if (totalRatios === 0) throw new Error("getBalancePortfolioAmounts: sum of ratios MUST be > 0");

    const targetBalances = map(assets, (asset) => {
        const { balance, value, targetRatio } = asset;
        const valueTarget = (totalValue * BigInt(targetRatio * 10_000)) / BigInt(totalRatios * 10_000);
        const valueDelta = valueTarget - value;
        // Scale balance
        //TODO: Fix division by zero
        const balanceTarget = (balance * valueTarget) / value;
        const balanceDelta = balanceTarget - balance;

        return { balanceTarget, balanceDelta, valueTarget, valueDelta };
    });

    return {
        totalValue,
        totalRatios,
        targetBalances,
    };
}
