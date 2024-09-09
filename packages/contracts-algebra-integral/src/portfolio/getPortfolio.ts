import { mapValues, zip } from "lodash-es";
import { Address, erc20Abi, PublicClient } from "viem";
import { awaitAllObj } from "@owlprotocol/utils";
import { getOptimalTradeExactInput } from "../quoter/getOptimalTrade.js";

/**
 * Manage a portfolio of assets
 */
export interface Portfolio {
    /** Tokens */
    tokens: Address[];
    /** Unit of account (eg. WETH, USDC) */
    valueTokenAddress: Address;
    /** Assets */
    assets: Record<Address, { balance: bigint; value: bigint; basisPoints: number; percentage: number }>;
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
export async function getPortfolio(params: GetPortfolioParams): Promise<Portfolio> {
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
    const balanceOf = Object.fromEntries(zip(tokens, balances)) as Record<Address, bigint>;
    const balanceOfValue = await awaitAllObj(
        mapValues(balanceOf, async (balance, address) => {
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
    const { totalValue, balanceOfBasisPoints, balanceOfPercentage } = getPortfolioDistribution(balanceOfValue);

    const assets = mapValues(balanceOf, (balance: bigint, address: Address) => {
        return {
            balance,
            value: balanceOfValue[address],
            basisPoints: balanceOfBasisPoints[address],
            percentage: balanceOfPercentage[address],
        };
    }) as unknown as Record<Address, { balance: bigint; value: bigint; basisPoints: number; percentage: number }>;

    return {
        tokens,
        valueTokenAddress,
        assets,
        totalValue,
    };
}

/**
 * Compute portfolio distribution
 * @param balanceOfValue
 */
export function getPortfolioDistribution(balanceOfValue: Record<Address, bigint>) {
    const totalValue = Object.values(balanceOfValue).reduce((acc, curr) => acc + curr, 0n);

    const balanceOfBasisPoints = mapValues(balanceOfValue, (balance) => {
        return Number((balance * 10_000n) / totalValue);
    });
    const balanceOfPercentage = mapValues(balanceOfBasisPoints, (balance) => balance / 100);

    return {
        totalValue,
        balanceOfBasisPoints,
        balanceOfPercentage,
    };
}
