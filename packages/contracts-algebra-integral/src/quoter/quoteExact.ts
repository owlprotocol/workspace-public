import { Address, Hex } from "viem";
import { PublicClient } from "viem";
import {
    quoteExactInput as quoteExactInputAbi,
    quoteExactOutput as quoteExactOutputAbi,
} from "../artifacts/IQuoterV2.js";

export interface Quote {
    amountOut: bigint;
    amountIn: bigint;
    sqrtPriceX96AfterList: readonly bigint[];
    initializedTicksCrossedList: readonly number[];
    gasEstimate: bigint;
    feeList: readonly number[];
}

export type QuoteExactParams = {
    /** Network params */
    publicClient: PublicClient;
    quoterV2Address: Address;
    /** Trade Params */
    path: Hex;
} & ({ amountIn: bigint; amountOut?: undefined } | { amountIn?: undefined; amountOut: bigint });
/**
 * Call `quoteExactInput` or `quoteExactOutput` depending on `amountIn` or `amountOut` param
 * @param params network params and call params
 * @returns return values of `quoteExactInput`
 */
export async function quoteExact(params: QuoteExactParams): Promise<Quote> {
    if (typeof params.amountIn === "bigint") return quoteExactInput(params);
    else if (typeof params.amountOut === "bigint") return quoteExactOutput(params);

    throw new Error(`quoteExact: Invalid params amountIn === undefined && amountOut === undefined`);
}

export interface QuoteExactInputParams {
    /** Network params */
    publicClient: PublicClient;
    quoterV2Address: Address;
    /** Trade Params */
    path: Hex;
    amountIn: bigint;
}
/**
 * Simple wrapper around `quoteExactInput` call
 * @param params network params and call params
 * @returns return values of `quoteExactInput`
 */
export async function quoteExactInput(params: QuoteExactInputParams): Promise<Quote> {
    const { publicClient, quoterV2Address, path } = params;

    const { result } = await publicClient.simulateContract({
        address: quoterV2Address,
        abi: [quoteExactInputAbi],
        functionName: "quoteExactInput",
        args: [path, params.amountIn],
    });
    const [amountOut, amountIn, sqrtPriceX96AfterList, initializedTicksCrossedList, gasEstimate, feeList] = result;

    return {
        amountOut,
        amountIn,
        sqrtPriceX96AfterList,
        initializedTicksCrossedList,
        gasEstimate,
        feeList,
    };
}

export interface QuoteExactOutputParams {
    /** Network params */
    publicClient: PublicClient;
    quoterV2Address: Address;
    /** Trade Params */
    path: Hex;
    amountOut: bigint;
}
/**
 * Simple wrapper around `quoteExactOutput` call
 * @param params network params and call params
 * @returns return values of `quoteExactOutput`
 */
export async function quoteExactOutput(params: QuoteExactOutputParams): Promise<Quote> {
    const { publicClient, quoterV2Address, path } = params;

    const { result } = await publicClient.simulateContract({
        address: quoterV2Address,
        abi: [quoteExactOutputAbi],
        functionName: "quoteExactOutput",
        args: [path, params.amountOut],
    });
    const [amountOut, amountIn, sqrtPriceX96AfterList, initializedTicksCrossedList, gasEstimate, feeList] = result;

    return {
        amountOut,
        amountIn,
        sqrtPriceX96AfterList,
        initializedTicksCrossedList,
        gasEstimate,
        feeList,
    };
}
