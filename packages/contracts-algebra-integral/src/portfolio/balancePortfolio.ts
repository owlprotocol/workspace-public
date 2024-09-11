import { Address, PublicClient } from "viem";
import { uniqBy, zip } from "lodash-es";
import { getPortfolioHoldings } from "./getPortfolioHoldings.js";
import { getBalancePortfolioAmounts } from "./getBalancePortfolioAmounts.js";
import { getBalancePortfolioTrades } from "./getBalancePortfolioTrades.js";
import { getERC20ApprovalTransaction } from "../swaprouter/getERC20ApprovalTransaction.js";
import { getSwapExactInputTransaction } from "../swaprouter/getSwapTransaction.js";

export interface BalancePortfolioParams {
    /** Network public client */
    publicClient: PublicClient;
    /** Algebra Integral quoter address */
    quoterV2Address: Address;
    /** Algebra Integral swap router address */
    swapRouterAddress: Address;
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
    /** Swap expiry (defaults to 1hr) */
    deadline?: bigint;
}

/**
 * Get necessary trades to balance portfolio to target basis points
 */
export async function balancePortfolio(params: BalancePortfolioParams) {
    // unique addresses
    const assets = uniqBy(params.assets, (a) => a.address);

    const holdings = await getPortfolioHoldings({ ...params, tokens: assets.map((a) => a.address) });
    const { targetBalances } = getBalancePortfolioAmounts({
        assets: zip(assets, holdings.assets).map(([a, b]) => {
            return { ...a!, ...b! };
        }),
    });
    const totalTradeValue =
        -1n *
        targetBalances
            // filter outflows
            .filter(({ valueDelta }) => valueDelta < 0)
            .reduce((acc, { valueDelta }) => acc + valueDelta, 0n);

    const { trades, deficit } = await getBalancePortfolioTrades({
        ...params,
        assets: zip(assets, targetBalances).map(([a, b]) => {
            return { ...a!, ...b! };
        }),
    });

    const { publicClient, account, swapRouterAddress, wethAddress, deadline } = params;
    // Get approvals
    const approvals = await Promise.all(
        zip(assets, targetBalances)
            .map(([a, b]) => {
                return { ...a!, ...b! };
            })
            // filter outflows
            .filter(({ balanceDelta }) => balanceDelta < 0)
            // get approval transaction
            .map(({ address, balanceDelta }) =>
                getERC20ApprovalTransaction({
                    publicClient,
                    address,
                    owner: account,
                    spender: swapRouterAddress,
                    amount: -1n * balanceDelta,
                }),
            ),
    );
    const approvalTransactions = approvals.filter((e) => e.transaction).map((e) => e.transaction!);

    //TODO: Get swap transactions
    const swapTransactions = trades.map((t) =>
        getSwapExactInputTransaction({
            swapRouterAddress,
            path: t.path,
            amountIn: t.quote.amountIn,
            //TODO: Add slippage params
            amountOutMinimum: t.quote.amountOut,
            account,
            wethAddress,
            deadline,
        }),
    );

    const transactions = [...approvalTransactions, ...swapTransactions];

    return {
        ...holdings,
        targetBalances,
        trades,
        totalTradeValue,
        deficit,
        transactions,
    };
}
