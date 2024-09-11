import { map, zip } from "lodash-es";
import { Address, erc20Abi, PublicClient } from "viem";
import { Prettify } from "@owlprotocol/utils/types";
import { getOptimalTradeExactInput } from "../quoter/getOptimalTrade.js";

/**
 * Manage a portfolio of assets
 */
export interface PortfolioHoldings {
    /** Unit of account (eg. WETH, USDC) */
    valueTokenAddress: Address;
    /** Assets */
    assets: { address: Address; balance: bigint; value: bigint; basisPoints: number; percentage: number }[];
    /** Total value of portfolio */
    totalValue: bigint;
}

export interface GetPortfolioParams {
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
    tokens: Address[];
    /** Unit of account (eg. WETH, USDC) */
    valueTokenAddress: Address;
}

/**
 * Get portfolio information for a list of tokens such as balances, valuations, and distribution
 * @param params
 * @returns portfolio data
 */
export async function getPortfolioHoldings(params: GetPortfolioParams): Promise<Prettify<PortfolioHoldings>> {
    const { publicClient, quoterV2Address, intermediateAddresses, gasPrice, account, tokens, valueTokenAddress } =
        params;
    const wethAddress = params.wethAddress ?? "0x4200000000000000000000000000000000000006";

    const balances = await Promise.all(
        tokens.map(async (address) => {
            let balance = await publicClient.readContract({
                address,
                abi: erc20Abi,
                functionName: "balanceOf",
                args: [account],
            });

            // Native token
            if (address.toLowerCase() === wethAddress.toLowerCase()) {
                balance += await publicClient.getBalance({ address: account });
            }

            return balance;
        }),
    );
    const values = await Promise.all(
        map(zip(tokens, balances) as [Address, bigint][], async ([address, balance]) => {
            // No need to convert
            if (address.toLowerCase() === valueTokenAddress.toLowerCase()) return balance;
            if (balance === 0n) return balance;

            const { optimalTrade } = await getOptimalTradeExactInput({
                publicClient,
                quoterV2Address,
                amountIn: balance,
                inputAddress: address as Address,
                outputAddress: valueTokenAddress,
                intermediateAddresses,
                gasPrice,
                wethAddress,
            });

            return optimalTrade.quote.amountOut;
        }),
    );
    const { totalValue, basisPoints, percentages } = getPortfolioDistribution(values);

    const assets = map(
        zip(tokens, balances, values, basisPoints, percentages) as [Address, bigint, bigint, number, number][],
        ([address, balance, value, basisPoints, percentage]) => {
            return {
                address,
                balance,
                value,
                basisPoints,
                percentage,
            };
        },
    );

    return {
        valueTokenAddress,
        assets,
        totalValue,
    };
}

/**
 * Compute portfolio distribution
 * @param values
 */
export function getPortfolioDistribution(values: bigint[]) {
    const totalValue = values.reduce((acc, curr) => acc + curr, 0n);

    const basisPoints = map(values, (balance) => {
        return Number((balance * 10_000n) / totalValue);
    });
    const percentages = map(basisPoints, (balance) => balance / 100);

    return {
        totalValue,
        basisPoints,
        percentages,
    };
}
