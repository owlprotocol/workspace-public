import { Address } from "viem";
import { PublicClient } from "viem";
import { zip } from "lodash-es";
import { quoteExactInput, quoteExactOutput } from "./quoteExact.js";
import { encodeTradePath, getTradePaths } from "./tradePath.js";

export type GetOptimalTradePathParams = {
    /** Network public client */
    publicClient: PublicClient;
    /** Algebra Integral quoter address */
    quoterV2Address: Address;
    /** Input token address */
    inputAddress: Address;
    /** Output token address */
    outputAddress: Address;
    /** Intermediate trading assets */
    intermediateAddresses?: Address[];
    /** Gas price override */
    gasPrice?: bigint;
    /** WETH address for gas valuation */
    wethAddress?: Address;
} & ({ amountIn: bigint; amountOut?: undefined } | { amountIn?: undefined; amountOut: bigint });

/**
 * Evaluate possible trade paths and return optimal trade
 * @param params network params, input, output, and intermediate tokens
 */
export async function getOptimalTrade(params: GetOptimalTradePathParams) {
    if (typeof params.amountIn === "bigint") return getOptimalTradeExactInput(params);
    else if (typeof params.amountOut === "bigint") return getOptimalTradeExactOutput(params);

    throw new Error(`getOptimalTrade: Invalid params amountIn === undefined && amountOut === undefined`);
}

export interface GetOptimalTradePathExactInputParams {
    /** Network public client */
    publicClient: PublicClient;
    /** Algebra Integral quoter address */
    quoterV2Address: Address;
    /** Input token amount */
    amountIn: bigint;
    /** Input token address */
    inputAddress: Address;
    /** Output token address */
    outputAddress: Address;
    /** Intermediate trading assets */
    intermediateAddresses?: Address[];
    /** Gas price override */
    gasPrice?: bigint | null;
    /** WETH address for gas valuation */
    wethAddress?: Address;
}

/**
 * Evaluate possible trade paths and return optimal trade
 * @param params network params, input, output, and intermediate tokens
 */
export async function getOptimalTradeExactInput(params: GetOptimalTradePathExactInputParams) {
    const { publicClient, quoterV2Address, amountIn, inputAddress, outputAddress, intermediateAddresses } = params;
    const paths = getTradePaths({ inputAddress, outputAddress, intermediateAddresses });

    //TODO: Should we use allSettled to handle when trade path is not supported (liquidity pool doesnt exist) ?
    const quotes = await Promise.all(
        paths.map((tokens) =>
            quoteExactInput({ publicClient, quoterV2Address, amountIn, path: encodeTradePath(tokens) }),
        ),
    );

    // Quotes that account for gas cost as opportunity cost of more output tokens
    let amountOutWithGas: bigint[];
    if (params.gasPrice === null || params.gasPrice === 0n) {
        //Skip gas price estimations
        amountOutWithGas = quotes.map((q) => q.amountOut);
    } else {
        const gasPrice = params.gasPrice ?? (await publicClient.getGasPrice());
        const wethAddress = params.wethAddress ?? "0x4200000000000000000000000000000000000006";
        amountOutWithGas = await Promise.all(
            quotes.map(async (q) => {
                const gasCostEth = q.gasEstimate * gasPrice;
                let gasCostAmountOut: bigint;

                if (outputAddress === wethAddress) {
                    gasCostAmountOut = gasCostEth; // Same
                } else {
                    const opportunityCost = await quoteExactInput({
                        publicClient,
                        quoterV2Address,
                        amountIn: gasCostEth,
                        path: encodeTradePath([wethAddress, outputAddress]),
                    });
                    gasCostAmountOut = opportunityCost.amountOut;
                }

                return q.amountOut - gasCostAmountOut;
            }),
        );
    }

    const trades = zip(paths, quotes, amountOutWithGas).map(([path, quote, amountOutWithGas]) => {
        return { path: path!, quote: quote!, amountOutWithGas: amountOutWithGas! };
    });

    // Sort trades by largest output
    //TODO: Ignores gas cost
    trades.sort((a, b) => bigIntPredicate(b.amountOutWithGas, a.amountOutWithGas));

    return {
        trades,
        optimalTrade: trades[0],
    };
}

export interface GetOptimalTradePathExactOutputParams {
    /** Network public client */
    publicClient: PublicClient;
    /** Algebra Integral quoter address */
    quoterV2Address: Address;
    /** Output token amount */
    amountOut: bigint;
    /** Input token address */
    inputAddress: Address;
    /** Output token address */
    outputAddress: Address;
    /** Intermediate trading assets */
    intermediateAddresses?: Address[];
    /** Gas price override */
    gasPrice?: bigint;
    /** WETH address for gas valuation */
    wethAddress?: Address;
}

/**
 * Evaluate possible trade paths and return optimal trade
 * @param params network params, input, output, and intermediate tokens
 */
export async function getOptimalTradeExactOutput(params: GetOptimalTradePathExactOutputParams) {
    const { publicClient, quoterV2Address, amountOut, inputAddress, outputAddress, intermediateAddresses } = params;
    const paths = getTradePaths({ inputAddress, outputAddress, intermediateAddresses });

    //TODO: Should we use allSettled to handle when trade path is not supported (liquidity pool doesnt exist) ?
    const quotes = await Promise.all(
        paths.map((tokens) =>
            quoteExactOutput({ publicClient, quoterV2Address, amountOut, path: encodeTradePath(tokens) }),
        ),
    );

    const trades = zip(paths, quotes).map(([path, quote]) => {
        return { path: path!, quote: quote! };
    });

    // Sort trades by smallest input
    //TODO: Ignores gas cost
    trades.sort((a, b) => bigIntPredicate(a.quote.amountIn, b.quote.amountIn));

    return {
        trades,
        optimalTrade: trades[0],
    };
}

/**
 * Predicate to sort in ascending order
 * @param a
 * @param b
 * @returns
 */
function bigIntPredicate(a: bigint, b: bigint): -1 | 0 | 1 {
    if (a < b) return -1;
    else if (a > b) return 1;
    else return 0;
}
