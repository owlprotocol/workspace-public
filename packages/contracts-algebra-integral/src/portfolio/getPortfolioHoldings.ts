import { map, zip } from "lodash-es";
import { Address, erc20Abi, Hex, PublicClient } from "viem";
import { Prettify } from "@owlprotocol/utils/types";
import { BigNumber } from "bignumber.js";
import { getPoolAddress, getPoolState } from "../pool/getPool.js";
import { quoteWithPrice, sqrtPriceToInstantPrice } from "../pool/getPoolPrice.js";

/**
 * Manage a portfolio of assets
 */
export interface PortfolioHoldings {
    /**
     * Unit of account (WETH recommended)
     * NOTE: All assets MUST have a liquidity pool with `quoteToken`
     **/
    quoteToken: Address;
    /** Assets */
    assets: {
        /** Address */
        address: Address;
        /** Balance */
        balance: bigint;
        /** Value denomicated in `quoteToken` */
        value: bigint;
        /** Price address/quoteToken */
        price: BigNumber;
        /** Basis points of portfolio */
        bips: number;
    }[];
    /** Total value of portfolio */
    totalValue: bigint;
}

export interface GetPortfolioParams {
    /** Network public client */
    publicClient: PublicClient;
    /** Algebra Integral pool deployer */
    poolDeployer: Address;
    /** Algebra Integral pool init code hash */
    poolInitCodeHash: Hex;
    /** WETH address for gas valuation */
    weth?: Address;
    /** Account */
    account: Address;
    /** Portfolio tokens */
    tokens: Address[];
    /** Unit of account (eg. WETH, USDC) */
    quoteToken: Address;
}

/**
 * Get portfolio information for a list of tokens such as balances, valuations, and distribution
 * @warning Valuations use pool prices and do not account for transaction costs (price impact, fees etc...)
 * @param params
 * @returns portfolio data
 */
export async function getPortfolioHoldings(params: GetPortfolioParams): Promise<Prettify<PortfolioHoldings>> {
    const { publicClient, poolDeployer, poolInitCodeHash, account, tokens, quoteToken } = params;
    const weth = params.weth ?? "0x4200000000000000000000000000000000000006";

    const balances = await Promise.all(
        tokens.map(async (address) => {
            let balance = await publicClient.readContract({
                address,
                abi: erc20Abi,
                functionName: "balanceOf",
                args: [account],
            });

            // Native token
            if (address.toLowerCase() === weth.toLowerCase()) {
                balance += await publicClient.getBalance({ address: account });
            }

            return balance;
        }),
    );

    //TODO: This could be made a generic param for modular pricing strategies (address) => price
    const prices = await Promise.all(
        map(tokens, async (address) => {
            // No need to convert
            if (address.toLowerCase() === quoteToken.toLowerCase()) return BigNumber(1);

            const poolAddress = getPoolAddress({ token0: address, token1: quoteToken, poolDeployer, poolInitCodeHash });
            const pool = await getPoolState({ publicClient, address: poolAddress });
            const price = sqrtPriceToInstantPrice({ sqrtPrice: pool.sqrtPrice, base: address, quote: quoteToken });

            return price;
        }),
    );
    const values = await Promise.all(
        map(zip(prices, balances) as [BigNumber, bigint][], async ([price, balance]) => {
            return quoteWithPrice({ amount: balance, price });
        }),
    );
    const { totalValue, basisPoints } = getPortfolioDistribution(values);

    const assets = map(
        zip(tokens, balances, prices, values, basisPoints) as [Address, bigint, BigNumber, bigint, number][],
        ([address, balance, price, value, bips]) => {
            return {
                address,
                balance,
                price,
                value,
                bips,
            };
        },
    );

    return {
        quoteToken,
        assets,
        totalValue,
    };
}

/**
 * Compute portfolio distribution
 * @param values
 */
export function getPortfolioDistribution(values: bigint[]): {
    totalValue: bigint;
    basisPoints: number[];
} {
    const totalValue = values.reduce((acc, curr) => acc + curr, 0n);
    if (totalValue === 0n) {
        // no value, portfolio empty
        return {
            totalValue,
            basisPoints: map(values, () => 0),
        };
    }

    const basisPoints = map(values, (value) => {
        return Number((value * 10_000n) / totalValue);
    });

    return {
        totalValue,
        basisPoints,
    };
}
