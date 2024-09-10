import { Address, Hex } from "viem";

/**
 * Get trade paths params
 */
export interface GetTradePathsParams {
    /** Input token address */
    inputAddress: Address;
    /** Output token address */
    outputAddress: Address;
    /** Intermediate token addresses for multi-hop swaps */
    intermediateAddresses?: Address[];
}
/**
 * Compute permutations of trade paths
 * @param params input, output, and intermediate tokens
 * @returns list of potential trade paths as tokens array (only with 1 intermediate token)
 */
export function getTradePaths(params: GetTradePathsParams): [[Address, Address], ...[Address, Address, Address][]] {
    const { inputAddress, outputAddress } = params;

    // Filter out input/output address from intermediateAddresses
    const intermediateAddresses = (params.intermediateAddresses ?? []).filter(
        (address) => address != inputAddress && address != outputAddress,
    );

    // Direct path
    const paths = [[inputAddress, outputAddress]] as Address[][];

    // Add intermediate paths
    intermediateAddresses.forEach((c) => {
        paths.push([inputAddress, c, outputAddress]);
    });

    return paths as [[Address, Address], ...[Address, Address, Address][]];
}

/**
 * Take list of token addresses and return trade path
 * @dev Concatenates the addresses as a compact byte array
 * @param tokens
 * @returns encoded trade path
 */
export function encodeTradePath(tokens: Address[]): Hex {
    return ("0x" + tokens.map((t) => t.replace("0x", "")).join("")) as Hex;
}

/**
 * Take an encoded trade paht and return list of token addresses
 * @dev Split path by 20-byte addresses
 * @param path
 * @returns list of token addresses
 */
export function decodeTradePath(path: Hex): Address[] {
    const pathClean = path.replace("0x", ""); //strip leading 0x
    if (pathClean.length % 40 != 0) throw new Error(`Invalid path should have length % 40 === 0 ${path}`);

    const tokens: Address[] = [];
    for (let i = 0; i < pathClean.length; i += 40) {
        tokens.push(("0x" + pathClean.substring(i, i + 40)) as Address);
    }

    return tokens;
}
