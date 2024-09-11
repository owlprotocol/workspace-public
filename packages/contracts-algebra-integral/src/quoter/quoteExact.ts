import { Address, Hex } from "viem";
import { PublicClient } from "viem";
import { encodeTradePath } from "./tradePath.js";
import {
    quoteExactInput as quoteExactInputAbi,
    quoteExactOutput as quoteExactOutputAbi,
} from "../artifacts/IQuoterV2.js";

export interface Quote {
    /** Output token amount */
    amountOut: bigint;
    /** Input token amount */
    amountIn: bigint;
    /** Price */
    sqrtPriceX96AfterList: readonly bigint[];
    /** Crossed ticks */
    initializedTicksCrossedList: readonly number[];
    /** Gas estimate */
    gasEstimate: bigint;
    /** Fee list of pools */
    feeList: readonly number[];
}

export type QuoteExactParams = {
    /** Network params */
    publicClient: PublicClient;
    quoterV2: Address;
    /** Trade Params */
    tokens: [Address, Address, ...Address[]];
} & ({ amountIn: bigint; amountOut?: undefined } | { amountIn?: undefined; amountOut: bigint });
/**
 * Call `quoteExactInput` or `quoteExactOutput` depending on `amountIn` or `amountOut` param
 * @param params network params and call params
 * @returns return values of `quoteExactInput`
 */
export async function quoteExact(params: QuoteExactParams): Promise<Quote> {
    if (typeof params.amountIn === "bigint")
        return quoteExactInput({ ...params, path: encodeTradePath(params.tokens) });
    else if (typeof params.amountOut === "bigint")
        return quoteExactOutput({ ...params, path: encodeTradePath([...params.tokens].reverse()) });

    throw new Error(`quoteExact: Invalid params amountIn === undefined && amountOut === undefined`);
}

export interface QuoteExactInputParams {
    /** Network params */
    publicClient: PublicClient;
    quoterV2: Address;
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
    const { publicClient, quoterV2, path } = params;

    const { result } = await publicClient.simulateContract({
        address: quoterV2,
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
    quoterV2: Address;
    /** Trade Params */
    path: Hex;
    amountOut: bigint;
}
/**
 * Simple wrapper around `quoteExactOutput` call
 * @dev path MUST be reverted from output -> input
 * @param params network params and call params
 * @returns return values of `quoteExactOutput`
 */
export async function quoteExactOutput(params: QuoteExactOutputParams): Promise<Quote> {
    const { publicClient, quoterV2, path } = params;

    const { result } = await publicClient.simulateContract({
        address: quoterV2,
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
