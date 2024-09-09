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

import { mapValues, zip } from "lodash-es";
import { Address, erc20Abi, PublicClient } from "viem";
import { awaitAllObj } from "@owlprotocol/utils";
import { getOptimalTradeExactInput } from "./getOptimalTrade.js";

/**
 * Manage a portfolio of assets
 */
export interface Portfolio {
    /** Tokens */
    tokens: Address[];
    /** Unit of account (eg. WETH, USDC) */
    valueTokenAddress: Address;
    /** Balance of tokens */
    balanceOf: Record<Address, bigint>;
    /** Balance of tokens normalized to value token */
    balanceOfValue: Record<Address, bigint>;
    /** Total value of portfolio */
    totalValue: bigint;
    /** Balance of token as basis points of total portfolio (1/10,000) */
    balanceOfBasisPoints: Record<Address, number>;
    /** Balance of token as percentage of total portfolio (1/100) */
    balanceOfPercentage: Record<Address, number>;
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
    const totalValue = Object.values(balanceOfValue).reduce((acc, curr) => acc + curr, 0n);

    const balanceOfBasisPoints = mapValues(balanceOfValue, (balance) => {
        return Number((balance * 10_000n) / totalValue);
    });
    const balanceOfPercentage = mapValues(balanceOfBasisPoints, (balance) => balance / 100);

    return {
        tokens,
        valueTokenAddress,
        balanceOf,
        balanceOfValue,
        totalValue,
        balanceOfBasisPoints,
        balanceOfPercentage,
    };
}
