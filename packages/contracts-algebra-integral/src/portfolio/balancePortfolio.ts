import { Address, PublicClient } from "viem";
import { zip } from "lodash-es";
import { getPortfolioHoldings } from "./getPortfolioHoldings.js";
import { getBalancePortfolioAmounts } from "./getBalancePortfolioAmounts.js";
import { getBalancePortfolioTrades } from "./getBalancePortfolioTrades.js";

export interface BalancePortfolioParams {
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
    /** Account */
    account: Address;
    /** Portfolio tokens */
    assets: { address: Address; targetRatio: number }[];
    /** Unit of account (eg. WETH, USDC) */
    valueTokenAddress: Address;
}

/**
 * Get necessary trades to balance portfolio to target basis points
 */
export async function balancePortfolio(params: BalancePortfolioParams) {
    const holdings = await getPortfolioHoldings({ ...params, tokens: params.assets.map((a) => a.address) });
    const { targetBalances } = getBalancePortfolioAmounts({
        assets: zip(params.assets, holdings.assets).map(([a, b]) => {
            return { ...a!, ...b! };
        }),
    });
    const { trades, dust: delta } = await getBalancePortfolioTrades({
        ...params,
        assets: zip(params.assets, targetBalances).map(([a, b]) => {
            return { ...a!, ...b! };
        }),
    });

    return {
        ...holdings,
        targetBalances,
        trades,
        delta,
    };
}
