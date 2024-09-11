import { BigNumber } from "bignumber.js";
import { Address, hexToBigInt } from "viem";

/***** Pool Pricing *****/
/**
 * Granular pricing calculations require using the bignumber.js library
 * To avoid having the rest of the library juggle `bigint/BigNumber`
 * we provide simple utility functions for common operations
 */

/**
 * Convert `sqrtPrice` to an instant price as a `BigNumber` (native bigint won't work).
 * Instant price is the quote price of base/quote currency pair
 * Useful for off-chain financial modelling (eg. portfolio rebalancing) but **NOT** for trade execution
 *
 * @warning **NOT** reliable for trade execution as multiple factors such as liquidity, fees, on-chain activity can
 * vary **actual** execution price. Use `quoter` functions for accurate trade quoting.
 * @see https://docs.algebra.finance/algebra-integral-documentation/algebra-integral-technical-reference/integration-process/interaction-with-pools/getting-data-from-pools#how-to-get-current-price-in-pool
 * @param sqrtPrice
 * @returns instantPrice as a `BigNumber`
 */
export function sqrtPriceToInstantPrice(sqrtPrice: bigint): BigNumber {
    return BigNumber(sqrtPrice as any)
        .div(BigNumber(2).pow(96))
        .pow(2);
}

/**
 * Quote converting `amount` `base` tokens into `quote`
 * Internally we check the pool invariant `token0 (base) < token1 (quote)` and adjust the calculation accordingly
 * @param param tokens, amount, price
 * @returns quote token amount
 */
export function quoteWithPrice({
    base,
    quote,
    amount,
    sqrtPrice,
}: {
    base: Address;
    quote: Address;
    amount: bigint;
    sqrtPrice: bigint;
}): bigint {
    const instantPrice = sqrtPriceToInstantPrice(sqrtPrice);

    if (hexToBigInt(base) < hexToBigInt(quote)) {
        return BigInt(
            BigNumber(amount as any)
                .times(instantPrice)
                .integerValue()
                .toString(),
        );
    }

    // reverse
    return BigInt(
        BigNumber(amount as any)
            .div(instantPrice)
            .integerValue()
            .toString(),
    );
}
