import { Address } from "viem";
import { PublicClient } from "viem";
import { zip } from "lodash-es";
import { Quote, quoteExactInput, quoteExactOutput } from "./quoteExact.js";
import { encodeTradePath, getTradePaths } from "./tradePath.js";
import { bigIntPredicate } from "../utils/bigIntPredicate.js";

export type Trade = {
    path: [Address, Address] | [Address, Address, Address];
    quote: Quote;
};

export type GetOptimalTradePathParams = {
    /** Network public client */
    publicClient: PublicClient;
    /** Algebra Integral quoter address */
    quoterV2: Address;
    /** Input token address */
    inputAddress: Address;
    /** Output token address */
    outputAddress: Address;
    /** Liquidity trading assets */
    liquidityTokens?: Address[];
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
    quoterV2: Address;
    /** Input token amount */
    amountIn: bigint;
    /** Input token address */
    inputAddress: Address;
    /** Output token address */
    outputAddress: Address;
    /** Liquidity trading assets */
    liquidityTokens?: Address[];
}

/**
 * Evaluate possible trade paths and return optimal trade
 * @param params network params, input, output, and intermediate tokens
 */
export async function getOptimalTradeExactInput(params: GetOptimalTradePathExactInputParams): Promise<{
    trades: Trade[];
    optimalTrade: Trade;
}> {
    const { publicClient, quoterV2, amountIn, inputAddress, outputAddress, liquidityTokens } = params;
    const paths = getTradePaths({ inputAddress, outputAddress, liquidityTokens });

    //TODO: Should we use allSettled to handle when trade path is not supported (liquidity pool doesnt exist) ?
    const quotes = await Promise.all(
        paths.map((tokens) =>
            quoteExactInput({ publicClient, quoterV2, amountIn, path: encodeTradePath(tokens) }),
        ),
    );

    const trades = zip(paths, quotes).map(([path, quote]) => {
        return { path: path!, quote: quote! };
    });

    // Sort trades by largest output
    trades.sort((a, b) => bigIntPredicate(b.quote.amountOut, a.quote.amountOut));

    return {
        trades,
        optimalTrade: trades[0],
    };
}

export interface GetOptimalTradePathExactOutputParams {
    /** Network public client */
    publicClient: PublicClient;
    /** Algebra Integral quoter address */
    quoterV2: Address;
    /** Output token amount */
    amountOut: bigint;
    /** Input token address */
    inputAddress: Address;
    /** Output token address */
    outputAddress: Address;
    /** Liquidity trading assets */
    liquidityTokens?: Address[];
}

/**
 * Evaluate possible trade paths and return optimal trade
 * @param params network params, input, output, and intermediate tokens
 */
export async function getOptimalTradeExactOutput(params: GetOptimalTradePathExactOutputParams): Promise<{
    trades: Trade[];
    optimalTrade: Trade;
}> {
    const { publicClient, quoterV2, amountOut, inputAddress, outputAddress, liquidityTokens } = params;
    const paths = getTradePaths({ inputAddress, outputAddress, liquidityTokens });

    //TODO: Should we use allSettled to handle when trade path is not supported (liquidity pool doesnt exist) ?
    const quotes = await Promise.all(
        paths.map((tokens) =>
            quoteExactOutput({
                publicClient,
                quoterV2,
                amountOut,
                path: encodeTradePath([...tokens].reverse()),
            }),
        ),
    );

    const trades = zip(paths, quotes).map(([path, quote]) => {
        return { path: path!, quote: quote! };
    });

    // Sort trades by smallest input
    trades.sort((a, b) => bigIntPredicate(a.quote.amountIn, b.quote.amountIn));

    return {
        trades,
        optimalTrade: trades[0],
    };
}

/**
 * TODO: For more complex trade & more expensive chains can be relevant
 * Gas cost for optimal trade has low impact
 * INPUT
 * // Quotes that account for gas cost as opportunity cost of more output tokens
    let amountOutWithGas: bigint[];
    if (params.gasPrice === null || params.gasPrice === 0n) {
        //Skip gas price estimations
        amountOutWithGas = quotes.map((q) => q.amountOut);
    } else {
        const gasPrice = params.gasPrice ?? (await publicClient.getGasPrice());
        const weth = params.weth ?? "0x4200000000000000000000000000000000000006";
        amountOutWithGas = await Promise.all(
            quotes.map(async (q) => {
                const gasCostEth = q.gasEstimate * gasPrice;
                let gasCostAmountOut: bigint;

                if (outputAddress.toLowerCase() === weth.toLowerCase()) {
                    gasCostAmountOut = gasCostEth; // Same
                } else {
                    const opportunityCost = await quoteExactInput({
                        publicClient,
                        quoterV2,
                        amountIn: gasCostEth,
                        path: encodeTradePath([weth, outputAddress]),
                    });
                    gasCostAmountOut = opportunityCost.amountOut;
                }

                return q.amountOut - gasCostAmountOut;
            }),
        );
    }

    OUTPUT
    // Quotes that account for gas cost as opportunity cost of more output tokens
    let amountInWithGas: bigint[];
    if (params.gasPrice === null || params.gasPrice === 0n) {
        //Skip gas price estimations
        amountInWithGas = quotes.map((q) => q.amountOut);
    } else {
        const gasPrice = params.gasPrice ?? (await publicClient.getGasPrice());
        const weth = params.weth ?? "0x4200000000000000000000000000000000000006";
        amountInWithGas = await Promise.all(
            quotes.map(async (q) => {
                const gasCostEth = q.gasEstimate * gasPrice;
                let gasCostAmountIn: bigint;

                if (inputAddress.toLowerCase() === weth.toLowerCase()) {
                    gasCostAmountIn = gasCostEth; // Same
                } else {
                    const opportunityCost = await quoteExactOutput({
                        publicClient,
                        quoterV2,
                        amountOut: gasCostEth,
                        path: encodeTradePath([weth, inputAddress]),
                    });
                    gasCostAmountIn = opportunityCost.amountIn;
                }

                return q.amountIn + gasCostAmountIn;
            }),
        );
    }
 */
