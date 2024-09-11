import { Address, Hex, PublicClient } from "viem";
import { map, uniqBy, zip } from "lodash-es";
import { getPortfolioHoldings, PortfolioAsset } from "./getPortfolioHoldings.js";
import { getBalancePortfolioAmounts } from "./getBalancePortfolioAmounts.js";
import { getBalancePortfolioTrades } from "./getBalancePortfolioTrades.js";
import { getERC20ApprovalTransaction } from "../swaprouter/getERC20ApprovalTransaction.js";
import { getSwapExactInputTransaction } from "../swaprouter/getSwapTransaction.js";

export interface BalancePortfolioParams {
    /** Network public client */
    publicClient: PublicClient;
    /** Algebra Integral pool deployer */
    poolDeployer: Address;
    /** Algebra Integral pool init code hash */
    poolInitCodeHash: Hex;
    /** Algebra Integral quoter address */
    quoterV2Address: Address;
    /** Algebra Integral swap router address */
    swapRouterAddress: Address;
    /** Intermediate trading assets */
    intermediateAddresses?: Address[];
    /** Gas price override */
    gasPrice?: bigint | null;
    /** WETH address for gas valuation */
    weth?: Address;
    /** Account */
    account: Address;
    /** Portfolio tokens */
    assets: { address: Address; weight: number }[];
    /** Unit of account (eg. WETH, USDC) */
    quoteToken: Address;
    /** Swap expiry (defaults to 1hr) */
    deadline?: bigint;
}

/**
 * Get necessary trades to balance portfolio to target basis points
 */
export async function balancePortfolio(params: BalancePortfolioParams) {
    const {
        publicClient,
        account,
        poolInitCodeHash,
        poolDeployer,
        swapRouterAddress,
        quoterV2Address,
        intermediateAddresses,
        quoteToken,
        gasPrice,
        deadline,
    } = params;
    const weth = params.weth ?? "0x4200000000000000000000000000000000000006";

    // unique addresses
    // portfolio weights
    const paramsAssetsUniq = uniqBy(params.assets, (a) => a.address);
    const tokens = paramsAssetsUniq.map((a) => a.address);
    const weights = paramsAssetsUniq.map((a) => a.weight);

    // portfolio holdings
    const holdings = await getPortfolioHoldings({
        publicClient,
        poolDeployer,
        poolInitCodeHash,
        account,
        quoteToken,
        tokens,
    });
    // portfolio target distribution
    const targets = getBalancePortfolioAmounts({
        totalValue: holdings.totalValue,
        assets: map(zip(holdings.assets, weights) as [PortfolioAsset, number][], ([{ price }, weight]) => {
            return { price, weight };
        }),
    });
    // portfolio change t1 (future) - t0 (current)
    // negative delta: outflow, sell (input)
    // positive delta: inflow, buy (output)
    const deltas = map(
        zip(holdings.assets, targets) as [PortfolioAsset, { targetValue: bigint; targetBalance: bigint }][],
        ([asset, { targetValue, targetBalance }]) => {
            return {
                balanceDelta: targetBalance - asset.balance,
                valueDelta: targetValue - asset.value,
            };
        },
    );

    const totalTradeValue =
        -1n *
        deltas
            // filter outflows
            .filter(({ valueDelta }) => valueDelta < 0)
            .reduce((acc, { valueDelta }) => acc + valueDelta, 0n);

    const trades = await getBalancePortfolioTrades({
        publicClient,
        quoterV2Address,
        intermediateAddresses,
        gasPrice,
        weth,
        assets: map(
            zip(holdings.assets, deltas) as [PortfolioAsset, { valueDelta: bigint }][],
            ([{ address, price }, { valueDelta }]) => {
                return { address, price, valueDelta };
            },
        ),
    });

    // Get approvals
    const approvals = await Promise.all(
        (zip(holdings.assets, deltas) as [PortfolioAsset, { balanceDelta: bigint }][])
            // outflows, skip WETH
            .filter(
                ([{ address }, { balanceDelta }]) => balanceDelta < 0 && address.toLowerCase() != weth.toLowerCase(),
            )
            // get approval transaction
            .map(([{ address }, { balanceDelta }]) =>
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

    // Get swap transactions
    const swapTransactions = trades.map((t) =>
        getSwapExactInputTransaction({
            swapRouterAddress,
            path: t.path,
            amountIn: t.quote.amountIn,
            //TODO: Add slippage params
            amountOutMinimum: t.quote.amountOut,
            account,
            weth,
            deadline,
        }),
    );

    const transactions = [...approvalTransactions, ...swapTransactions];

    return {
        ...holdings,
        targetBalances: deltas,
        trades,
        totalTradeValue,
        transactions,
    };
}
